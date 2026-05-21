<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { DadsDatePickerEmits, DadsDatePickerProps } from './DadsDatePicker.types'

const props = withDefaults(defineProps<DadsDatePickerProps>(), {
  modelValue: '',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  variant: 'consolidated',
  locale: 'gregorian',
  requiredLabel: '必須',
  yearLabel: '年',
  monthLabel: '月',
  dayLabel: '日',
  openCalendarAriaLabel: 'カレンダーを開く',
  prevMonthAriaLabel: '前の月',
  nextMonthAriaLabel: '次の月',
})

/**
 * Map a gregorian year to the matching Japanese era + era-year. Covers
 * eras that overlap modern web usage (Meiji onward). Returns `null` for
 * years that fall outside the table so the caller can render a fallback.
 */
const toWareki = (year: number): { era: string; year: number } | null => {
  if (!Number.isFinite(year)) return null
  if (year >= 2019) return { era: '令和', year: year - 2018 }
  if (year >= 1989) return { era: '平成', year: year - 1988 }
  if (year >= 1926) return { era: '昭和', year: year - 1925 }
  if (year >= 1912) return { era: '大正', year: year - 1911 }
  if (year >= 1868) return { era: '明治', year: year - 1867 }
  return null
}

const emit = defineEmits<DadsDatePickerEmits>()

// One id per instance so label `for`, listbox/popover and aria-describedby
// references stay stable across renders.
const generatedId = useId()
const baseId = computed(() => props.id ?? `dads-date-picker-${generatedId}`)
const yearId = computed(() => `${baseId.value}-year`)
const monthId = computed(() => `${baseId.value}-month`)
const dayId = computed(() => `${baseId.value}-day`)
const popoverId = computed(() => `${baseId.value}-popover`)
const hintId = computed(() => `${baseId.value}-hint`)
const errorId = computed(() => `${baseId.value}-error`)

const isError = computed(() => props.error || !!props.errorMessage)

const describedBy = computed(() => {
  const ids: string[] = []
  if (isError.value && props.errorMessage) ids.push(errorId.value)
  else if (props.hint) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const hasFooter = computed(() => (isError.value && !!props.errorMessage) || !!props.hint)

// -------------------- helpers --------------------------------------------

// Parse an ISO `YYYY-MM-DD` string into 1-based month parts. Returns null
// parts when the input is empty / malformed; keeps the picker forgiving so
// callers don't need to validate before binding.
const parseIso = (
  iso: string | undefined,
): { year: number | null; month: number | null; day: number | null } => {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return { year: null, month: null, day: null }
  }
  const [y, m, d] = iso.split('-').map((s) => Number.parseInt(s, 10))
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
    return { year: null, month: null, day: null }
  }
  return { year: y, month: m, day: d }
}

const pad = (n: number, w = 2) => String(n).padStart(w, '0')

// Compose an ISO date from year/month/day parts; only returns a string when
// all three are present and form a real calendar date.
const composeIso = (year: number | null, month: number | null, day: number | null): string => {
  if (year === null || month === null || day === null) return ''
  if (month < 1 || month > 12 || day < 1 || day > 31) return ''
  // Reject impossible dates like 2025-02-30 by round-tripping through Date.
  const d = new Date(year, month - 1, day)
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return ''
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}`
}

// -------------------- input field state ----------------------------------

// Each field is mirrored as a string so users can type partial values
// (e.g. just '2025') without the picker fighting the cursor. We commit to
// modelValue only when all three parse to a valid date.
const yearText = ref('')
const monthText = ref('')
const dayText = ref('')

// Sync from external modelValue.
watch(
  () => props.modelValue,
  (next) => {
    const parts = parseIso(next)
    yearText.value = parts.year !== null ? String(parts.year).padStart(4, '0') : ''
    monthText.value = parts.month !== null ? pad(parts.month) : ''
    dayText.value = parts.day !== null ? pad(parts.day) : ''
  },
  { immediate: true },
)

const tryCommit = () => {
  const y = yearText.value ? Number.parseInt(yearText.value, 10) : null
  const m = monthText.value ? Number.parseInt(monthText.value, 10) : null
  const d = dayText.value ? Number.parseInt(dayText.value, 10) : null
  const iso = composeIso(
    Number.isNaN(y as number) ? null : y,
    Number.isNaN(m as number) ? null : m,
    Number.isNaN(d as number) ? null : d,
  )
  // Always emit — empty string represents "no date" so the parent stays in
  // sync when the user clears a field.
  if (iso !== props.modelValue) {
    emit('update:modelValue', iso)
    emit('change', iso)
  }
}

const onYearInput = (event: Event) => {
  yearText.value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4)
  tryCommit()
}
const onMonthInput = (event: Event) => {
  monthText.value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2)
  tryCommit()
}
const onDayInput = (event: Event) => {
  dayText.value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2)
  tryCommit()
}

// -------------------- calendar popover -----------------------------------

const yearInputRef = ref<HTMLInputElement | null>(null)
const monthInputRef = ref<HTMLInputElement | null>(null)
const dayInputRef = ref<HTMLInputElement | null>(null)
const calendarButtonRef = ref<HTMLButtonElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

const isOpen = ref(false)

// Display month for the grid (1-based month for parity with composeIso).
const displayYear = ref(new Date().getFullYear())
const displayMonth = ref(new Date().getMonth() + 1)

// Reset the calendar display to either the current value or today when the
// popover opens, so the user lands somewhere relevant.
const syncDisplayMonth = () => {
  const parts = parseIso(props.modelValue)
  if (parts.year !== null && parts.month !== null) {
    displayYear.value = parts.year
    displayMonth.value = parts.month
    return
  }
  const today = new Date()
  displayYear.value = today.getFullYear()
  displayMonth.value = today.getMonth() + 1
}

const openCalendar = () => {
  if (props.disabled || props.readonly) return
  syncDisplayMonth()
  isOpen.value = true
}
const closeCalendar = () => {
  if (!isOpen.value) return
  isOpen.value = false
  // Restore focus to the trigger so keyboard users don't get stranded.
  calendarButtonRef.value?.focus()
}
const toggleCalendar = () => {
  if (isOpen.value) closeCalendar()
  else openCalendar()
}

const navigateMonth = (direction: 1 | -1) => {
  let m = displayMonth.value + direction
  let y = displayYear.value
  if (m < 1) {
    m = 12
    y -= 1
  } else if (m > 12) {
    m = 1
    y += 1
  }
  displayYear.value = y
  displayMonth.value = m
}

// -------------------- min / max ------------------------------------------

const minParts = computed(() => parseIso(props.min))
const maxParts = computed(() => parseIso(props.max))

// Compare two date triples; -1 if a<b, 1 if a>b, 0 if equal.
const cmp = (
  a: { y: number; m: number; d: number },
  b: { y: number; m: number; d: number },
): number => {
  if (a.y !== b.y) return a.y < b.y ? -1 : 1
  if (a.m !== b.m) return a.m < b.m ? -1 : 1
  if (a.d !== b.d) return a.d < b.d ? -1 : 1
  return 0
}

const isWithinRange = (year: number, month: number, day: number): boolean => {
  const here = { y: year, m: month, d: day }
  if (minParts.value.year !== null) {
    const lo = {
      y: minParts.value.year,
      m: minParts.value.month as number,
      d: minParts.value.day as number,
    }
    if (cmp(here, lo) < 0) return false
  }
  if (maxParts.value.year !== null) {
    const hi = {
      y: maxParts.value.year,
      m: maxParts.value.month as number,
      d: maxParts.value.day as number,
    }
    if (cmp(here, hi) > 0) return false
  }
  return true
}

// -------------------- grid cells -----------------------------------------

interface DayCell {
  year: number
  month: number
  day: number
  inMonth: boolean
  disabled: boolean
  selected: boolean
  isToday: boolean
  iso: string
}

const today = new Date()
const todayIso = composeIso(today.getFullYear(), today.getMonth() + 1, today.getDate())

const weeks = computed<DayCell[][]>(() => {
  const year = displayYear.value
  const month = displayMonth.value // 1-based
  const firstOfMonth = new Date(year, month - 1, 1)
  const startDayOfWeek = firstOfMonth.getDay() // 0 = Sunday
  const lastDay = new Date(year, month, 0).getDate()

  // Walk backwards to fill the first row from the previous month, then
  // forward through `lastDay`, then forward into the next month until we
  // complete the last row (up to 6 rows total).
  const cells: DayCell[] = []
  const cursor = new Date(year, month - 1, 1 - startDayOfWeek)
  for (let i = 0; i < 42; i++) {
    const y = cursor.getFullYear()
    const m = cursor.getMonth() + 1
    const d = cursor.getDate()
    const inMonth = m === month
    const iso = composeIso(y, m, d)
    const selected = !!iso && iso === props.modelValue
    cells.push({
      year: y,
      month: m,
      day: d,
      inMonth,
      disabled: !inMonth || !isWithinRange(y, m, d),
      selected,
      isToday: !!iso && iso === todayIso,
      iso,
    })
    cursor.setDate(cursor.getDate() + 1)
    // Stop after we close the week that contains the last day of this month.
    if (i >= 27 && cells[cells.length - 1].day === lastDay && cells[cells.length - 1].inMonth) {
      // Finish the current row.
      const remainder = 7 - (cells.length % 7)
      if (remainder !== 7) {
        for (let r = 0; r < remainder; r++) {
          const ry = cursor.getFullYear()
          const rm = cursor.getMonth() + 1
          const rd = cursor.getDate()
          cells.push({
            year: ry,
            month: rm,
            day: rd,
            inMonth: false,
            disabled: true,
            selected: false,
            isToday: false,
            iso: composeIso(ry, rm, rd),
          })
          cursor.setDate(cursor.getDate() + 1)
        }
      }
      break
    }
  }

  const rows: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
})

const selectCell = (cell: DayCell) => {
  if (cell.disabled) return
  if (cell.iso === props.modelValue) {
    closeCalendar()
    return
  }
  emit('update:modelValue', cell.iso)
  emit('change', cell.iso)
  closeCalendar()
}

const isPrevMonthAvailable = computed(() => {
  if (minParts.value.year === null) return true
  const prevYear = displayMonth.value === 1 ? displayYear.value - 1 : displayYear.value
  const prevMonth = displayMonth.value === 1 ? 12 : displayMonth.value - 1
  // Last day of previous month
  const lastDay = new Date(prevYear, prevMonth, 0).getDate()
  return isWithinRange(prevYear, prevMonth, lastDay)
})
const isNextMonthAvailable = computed(() => {
  if (maxParts.value.year === null) return true
  const nextYear = displayMonth.value === 12 ? displayYear.value + 1 : displayYear.value
  const nextMonth = displayMonth.value === 12 ? 1 : displayMonth.value + 1
  return isWithinRange(nextYear, nextMonth, 1)
})

const displayMonthLabel = computed(() => {
  const date = new Date(displayYear.value, displayMonth.value - 1, 1)
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long' }).format(date)
})

const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土']

// -------------------- key handling on popover ----------------------------

const onPopoverKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeCalendar()
  }
}

// -------------------- outside click closes -------------------------------

const onDocumentPointerDown = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (target && popoverRef.value?.contains(target)) return
  if (target && calendarButtonRef.value?.contains(target)) return
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

// Close when disabled flips on so the popover cannot stay open with a
// non-interactive control.
watch(
  () => props.disabled,
  (next) => {
    if (next) isOpen.value = false
  },
)

// -------------------- focus / blur passthroughs --------------------------

const onFieldFocus = (event: FocusEvent) => emit('focus', event)
const onFieldBlur = (event: FocusEvent) => emit('blur', event)

// -------------------- root classes ---------------------------------------

const rootClasses = computed(() => [
  'dads-date-picker',
  `dads-date-picker--${props.size}`,
  `dads-date-picker--variant-${props.variant}`,
  `dads-date-picker--locale-${props.locale}`,
  {
    'dads-date-picker--disabled': props.disabled,
    'dads-date-picker--readonly': props.readonly,
    'dads-date-picker--error': isError.value,
    'dads-date-picker--open': isOpen.value,
  },
])

// Japanese era hint for the displayed year (locale='japanese' only). Returns
// the empty string when the year is empty/invalid or locale is gregorian.
const warekiHint = computed(() => {
  if (props.locale !== 'japanese') return ''
  const yr = Number(yearText.value)
  if (!Number.isFinite(yr) || yr === 0) return ''
  const w = toWareki(yr)
  return w ? `${w.era}${w.year}年` : ''
})
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label" :for="yearId" class="dads-date-picker__label-text">
      {{ label }}
      <span v-if="required" class="dads-date-picker__required" aria-hidden="true">{{
        requiredLabel
      }}</span>
    </label>

    <div class="dads-date-picker__controls" :data-size="size">
      <div
        class="dads-date-picker__inputs"
        :data-error="isError || undefined"
        :data-disabled="disabled || undefined"
        :data-readonly="readonly || undefined"
      >
        <label class="dads-date-picker__year">
          <span class="dads-date-picker__label">{{ yearLabel }}</span>
          <input
            :id="yearId"
            ref="yearInputRef"
            class="dads-date-picker__input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]+"
            autocomplete="off"
            :name="name ? `${name}-year` : undefined"
            :value="yearText"
            :placeholder="placeholder"
            :disabled="disabled || undefined"
            :readonly="readonly || undefined"
            :aria-invalid="isError || undefined"
            :aria-required="required || undefined"
            :aria-describedby="describedBy"
            data-js-year-input
            @input="onYearInput"
            @focus="onFieldFocus"
            @blur="onFieldBlur"
          />
          <span v-if="warekiHint" class="dads-date-picker__wareki" aria-live="polite">
            {{ warekiHint }}
          </span>
        </label>
        <label class="dads-date-picker__month">
          <span class="dads-date-picker__label">{{ monthLabel }}</span>
          <input
            :id="monthId"
            ref="monthInputRef"
            class="dads-date-picker__input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]+"
            autocomplete="off"
            :name="name ? `${name}-month` : undefined"
            :value="monthText"
            :disabled="disabled || undefined"
            :readonly="readonly || undefined"
            :aria-invalid="isError || undefined"
            :aria-describedby="describedBy"
            data-js-month-input
            @input="onMonthInput"
            @focus="onFieldFocus"
            @blur="onFieldBlur"
          />
        </label>
        <label class="dads-date-picker__day">
          <span class="dads-date-picker__label">{{ dayLabel }}</span>
          <input
            :id="dayId"
            ref="dayInputRef"
            class="dads-date-picker__input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]+"
            autocomplete="off"
            :name="name ? `${name}-day` : undefined"
            :value="dayText"
            :disabled="disabled || undefined"
            :readonly="readonly || undefined"
            :aria-invalid="isError || undefined"
            :aria-describedby="describedBy"
            data-js-day-input
            @input="onDayInput"
            @focus="onFieldFocus"
            @blur="onFieldBlur"
          />
        </label>
      </div>

      <button
        ref="calendarButtonRef"
        type="button"
        class="dads-date-picker__calendar-button"
        :aria-expanded="isOpen"
        :aria-controls="popoverId"
        aria-haspopup="dialog"
        :aria-label="openCalendarAriaLabel"
        :disabled="disabled || readonly || undefined"
        data-js-calendar-button
        @click="toggleCalendar"
      >
        <i class="mdi mdi-calendar dads-date-picker__calendar-icon" aria-hidden="true" />
        <i class="mdi mdi-chevron-down dads-date-picker__calendar-chevron" aria-hidden="true" />
      </button>

      <div
        v-show="isOpen"
        :id="popoverId"
        ref="popoverRef"
        class="dads-date-picker__calendar-popover"
        role="dialog"
        :aria-label="displayMonthLabel"
        @keydown="onPopoverKeydown"
      >
        <div class="dads-date-picker__calendar-header">
          <button
            type="button"
            class="dads-date-picker__nav-button"
            :disabled="!isPrevMonthAvailable || undefined"
            :aria-label="prevMonthAriaLabel"
            @click="navigateMonth(-1)"
          >
            <i class="mdi mdi-chevron-left" aria-hidden="true" />
          </button>
          <span class="dads-date-picker__current-month" aria-live="polite">
            {{ displayMonthLabel }}
          </span>
          <button
            type="button"
            class="dads-date-picker__nav-button"
            :disabled="!isNextMonthAvailable || undefined"
            :aria-label="nextMonthAriaLabel"
            @click="navigateMonth(1)"
          >
            <i class="mdi mdi-chevron-right" aria-hidden="true" />
          </button>
        </div>
        <table class="dads-date-picker__calendar-table" role="grid" :aria-label="displayMonthLabel">
          <thead>
            <tr>
              <th v-for="w in weekdayLabels" :key="w" scope="col" class="dads-date-picker__weekday">
                {{ w }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in weeks" :key="ri">
              <td
                v-for="cell in row"
                :key="`${cell.year}-${cell.month}-${cell.day}`"
                class="dads-date-picker__date-cell"
              >
                <button
                  v-if="cell.inMonth"
                  type="button"
                  class="dads-date-picker__date"
                  :data-selected="cell.selected || undefined"
                  :data-today="cell.isToday || undefined"
                  :disabled="cell.disabled || undefined"
                  :aria-selected="cell.selected || undefined"
                  @click="selectCell(cell)"
                >
                  {{ cell.day }}
                </button>
                <span v-else aria-hidden="true" class="dads-date-picker__date-placeholder" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="hasFooter" class="dads-date-picker__footer">
      <span
        v-if="isError && errorMessage"
        :id="errorId"
        class="dads-date-picker__error-text"
        role="alert"
        >{{ errorMessage }}</span
      >
      <span v-else-if="hint" :id="hintId" class="dads-date-picker__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/base' as base;
@use '../../styles/focus-ring' as ring;

.dads-date-picker {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 0.25rem);
  font-family: var(--font-family-sans, 'Noto Sans JP', sans-serif);
  color: var(--color-text-primary, #1a1a1a);

  // -------------------- external label & required marker -----------------
  &__label-text {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-16, 1rem);
    font-weight: 500;
    line-height: var(--line-height-150, 1.5);
  }

  &__required {
    background-color: var(--color-error, #ec0000);
    color: var(--color-text-on-primary, #fff);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--border-radius-4, 0.25rem);
    line-height: 1.2;
  }

  // -------------------- controls wrapper ---------------------------------
  &__controls {
    position: relative;
    display: flex;
    align-items: end;
    column-gap: var(--spacing-16, 1rem);
  }

  // -------------------- year/month/day box -------------------------------
  &__inputs {
    --_bg: var(--color-neutral-white, #fff);

    display: inline-flex;
    box-sizing: border-box;
    border-radius: 0.5rem;
    border: 1px solid var(--color-neutral-solid-gray-600, #595959);
    background-color: var(--_bg);
    padding: 2px 0 2px 2px;
  }

  // -------------------- variant: separated -------------------------------
  // separated: drop the unifying border around the trio of fields so each
  // field reads as an independent input. The calendar button sits beside
  // them as before. Year / month / day get their own narrow underline.
  &--variant-separated &__inputs {
    border: 0;
    background-color: transparent;
    padding: 0;
    gap: var(--spacing-8, 0.5rem);
  }

  &--variant-separated &__year,
  &--variant-separated &__month,
  &--variant-separated &__day {
    border: 1px solid var(--color-neutral-solid-gray-600, #595959);
    border-radius: 0.25rem;
    padding: 0 0.25rem;
  }

  // -------------------- locale: japanese (wareki hint) ------------------
  &__wareki {
    display: inline-block;
    margin-inline-start: 0.25rem;
    font-size: var(--font-size-12, 0.75rem);
    color: var(--color-text-secondary, #4d4d4d);
  }

  &__controls[data-size='sm'] &__inputs {
    height: 2.5rem;
  }
  &__controls[data-size='md'] &__inputs {
    height: 3rem;
  }
  &__controls[data-size='lg'] &__inputs {
    height: 3.5rem;
  }

  &__inputs:focus-within {
    border-color: var(--color-neutral-black, #000);
  }

  @media (hover: hover) {
    &__inputs:hover {
      border-color: var(--color-neutral-solid-gray-900, #1a1a1a);
    }
  }

  &__inputs[data-error] {
    border-color: var(--color-error, #ec0000);
  }

  &__inputs[data-disabled] {
    --_bg: var(--color-neutral-solid-gray-50, #f0f0f0);
    border-color: var(--color-neutral-solid-gray-300, #b3b3b3);
    color: var(--color-neutral-solid-gray-420, #808080);
  }

  &__inputs[data-readonly] {
    border-style: dashed;
  }

  &__year,
  &__month,
  &__day {
    position: relative;
    display: inline-flex;
    flex-direction: row-reverse;
  }

  &__month,
  &__day {
    margin-left: -4px;
  }
  &__day {
    padding-right: 1rem;
  }

  &__label {
    position: relative;
    z-index: 1;
    align-self: center;
    background-color: var(--_bg);
    padding: 0.25rem;
    line-height: 1;
    font-size: var(--font-size-14, 0.875rem);
  }

  &__input {
    @include base.dads-reset-input;
    margin-right: -4px;
    box-sizing: border-box;
    width: 4rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    background-color: transparent;
    padding-right: 0.75rem;
    color: inherit;
    text-align: right;
    font: inherit;

    &:focus-visible {
      outline: 2px solid var(--color-neutral-black, #000) !important;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px var(--color-primitive-yellow-300, #ffd43d);
      border-radius: 0.5rem;
    }
  }

  :is(.dads-date-picker__month, .dads-date-picker__day) .dads-date-picker__input {
    width: 2.75rem;
  }

  // -------------------- calendar button ---------------------------------
  &__calendar-button {
    @include base.dads-reset-button;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.25rem;
    border-radius: 6px;
    border: 1px solid currentColor;
    background-color: var(--color-neutral-white, #fff);
    padding: 0 0.75rem;
    color: var(--color-primitive-blue-900, #0017c1);
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-neutral-black, #000);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px var(--color-primitive-yellow-300, #ffd43d);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--color-neutral-solid-gray-300, #b3b3b3);
    }
  }

  &__controls[data-size='sm'] &__calendar-button {
    height: 2.5rem;
  }
  &__controls[data-size='md'] &__calendar-button {
    height: 3rem;
  }
  &__controls[data-size='lg'] &__calendar-button {
    height: 3.5rem;
  }

  &__calendar-icon {
    font-size: 1.5rem;
  }

  &__calendar-chevron {
    font-size: 1rem;
  }

  &__calendar-button[aria-expanded='true'] &__calendar-chevron {
    rotate: 180deg;
  }

  // -------------------- popover -----------------------------------------
  &__calendar-popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 10;
    border-radius: 8px;
    border: 1px solid var(--color-neutral-solid-gray-420, #808080);
    background-color: var(--color-neutral-white, #fff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    padding: 0.5rem;
  }

  &__calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem 0.75rem;
  }

  &__nav-button {
    @include base.dads-reset-button;
    width: 2.5rem;
    height: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--color-primitive-blue-900, #0017c1);
    cursor: pointer;
    font-size: 1.25rem;

    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, #f0f0f0);
    }
    &:disabled {
      cursor: not-allowed;
      color: var(--color-neutral-solid-gray-300, #b3b3b3);
    }
    &:focus-visible {
      outline: 2px solid var(--color-neutral-black, #000);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px var(--color-primitive-yellow-300, #ffd43d);
    }
  }

  &__current-month {
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: var(--font-size-16, 1rem);
  }

  &__calendar-table {
    border-collapse: collapse;
    margin: 0 auto;
  }

  &__weekday {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    text-align: center;
    color: var(--color-neutral-solid-gray-700, #4d4d4d);
    font-weight: 700;
    font-size: var(--font-size-14, 0.875rem);
  }

  &__date-cell {
    padding: 0;
  }

  &__date {
    @include base.dads-reset-button;
    width: 2.5rem;
    height: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: inherit;
    cursor: pointer;
    margin: 2px;
    box-sizing: border-box;

    &:hover:not(:disabled) {
      background-color: var(--color-neutral-solid-gray-50, #f0f0f0);
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--color-neutral-black, #000);
      outline-offset: 2px;
      background-color: var(--color-primitive-yellow-300, #ffd43d);
      box-shadow: 0 0 0 4px var(--color-primitive-yellow-300, #ffd43d);
    }

    &[data-selected] {
      background-color: var(--color-primitive-blue-900, #0017c1);
      color: var(--color-neutral-white, #fff);
    }

    &[data-today]:not([data-selected]) {
      outline: 1px solid var(--color-primitive-blue-900, #0017c1);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--color-neutral-solid-gray-300, #b3b3b3);
    }
  }

  &__date-placeholder {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
  }

  // -------------------- footer -------------------------------------------
  &__footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-8, 0.5rem);
    font-size: var(--font-size-14, 0.875rem);
    line-height: var(--line-height-150, 1.5);
  }

  &__hint {
    color: var(--color-text-secondary, #4d4d4d);
  }

  &__error-text {
    color: var(--color-error, #ec0000);
    font-weight: 500;
    margin: 0;
  }

  // -------------------- disabled -----------------------------------------
  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  // -------------------- forced colors ------------------------------------
  @include base.dads-forced-colors {
    &__inputs {
      border: 1px solid CanvasText;
    }
    &__inputs:focus-within {
      border-color: Highlight;
    }
    &__inputs[data-disabled] {
      --_bg: ButtonFace;
      border-color: GrayText;
      color: GrayText;
    }
    &__inputs[data-readonly] {
      border-color: currentcolor;
    }
    &__calendar-popover {
      border: 1px solid CanvasText;
    }
    &__date[data-selected] {
      background-color: Highlight;
      color: HighlightText;
    }
  }
}
</style>
