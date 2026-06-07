import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import DadsFileUpload from '../DadsFileUpload.vue'
import type { DadsFileUploadProps } from '../DadsFileUpload.types'

enableAutoUnmount(afterEach)

const createWrapper = (props: DadsFileUploadProps = {}) =>
  mount(DadsFileUpload, { props, attachTo: document.body })

const makeFile = (name: string, size: number, type = 'text/plain'): File => {
  const file = new File(['x'], name, { type })
  // happy-dom honours the constructor blob's byte length, so override `size`
  // explicitly when tests need a specific value (e.g. for maxSize checks).
  Object.defineProperty(file, 'size', { value: size, configurable: true })
  return file
}

const setInputFiles = (input: HTMLInputElement, files: File[]) => {
  Object.defineProperty(input, 'files', {
    value: {
      length: files.length,
      item: (i: number) => files[i] ?? null,
      ...files,
    },
    configurable: true,
  })
}

const dropOnZone = async (dropzone: HTMLElement, files: File[]): Promise<void> => {
  const event = new Event('drop', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'dataTransfer', {
    value: {
      files: {
        length: files.length,
        item: (i: number) => files[i] ?? null,
        ...files,
      },
    },
    configurable: true,
  })
  dropzone.dispatchEvent(event)
}

describe('DadsFileUpload', () => {
  describe('rendering', () => {
    it('renders the dropzone wrapper', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-file-upload__dropzone').exists()).toBe(true)
    })

    it('renders the trigger button with default text', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.dads-file-upload__button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('ファイルを選択')
    })

    it('hides the native file input visually but keeps it in the DOM', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input[type="file"]')
      expect(input.exists()).toBe(true)
    })

    it('does not render the file list when no files are selected', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-file-upload__file-list').exists()).toBe(false)
    })

    it('renders custom button and dropzone text', () => {
      const wrapper = createWrapper({
        buttonText: 'CSV を選択',
        dropzoneText: 'またはドロップ',
      })
      expect(wrapper.find('.dads-file-upload__button').text()).toBe('CSV を選択')
      expect(wrapper.find('.dads-file-upload__dropzone-text').text()).toBe('またはドロップ')
    })
  })

  describe('size (official single uniform size)', () => {
    it('does not emit any size modifier class', () => {
      const wrapper = createWrapper()
      const sizeClass = wrapper.classes().find((c) => /^dads-file-upload--(sm|md|lg)$/.test(c))
      expect(sizeClass).toBeUndefined()
    })
  })

  describe('label and id wiring', () => {
    it('uses the explicit id when provided', () => {
      const wrapper = createWrapper({ label: 'CSV', id: 'my-upload' })
      expect(wrapper.find('input[type="file"]').attributes('id')).toBe('my-upload')
      expect(wrapper.find('label').attributes('for')).toBe('my-upload')
    })

    it('auto-generates a unique id and links the label', () => {
      const wrapper = mount({
        components: { DadsFileUpload },
        template: `
          <div>
            <DadsFileUpload label="A" />
            <DadsFileUpload label="B" />
          </div>
        `,
      })
      const inputs = wrapper.findAll('input[type="file"]')
      const labels = wrapper.findAll('label')
      const idA = inputs[0].attributes('id')
      const idB = inputs[1].attributes('id')
      expect(idA).toBeTruthy()
      expect(idB).toBeTruthy()
      expect(idA).not.toBe(idB)
      expect(labels[0].attributes('for')).toBe(idA)
      expect(labels[1].attributes('for')).toBe(idB)
    })
  })

  describe('required', () => {
    it('renders a required marker', () => {
      const wrapper = createWrapper({ label: 'CSV', required: true })
      expect(wrapper.find('.dads-file-upload__required').exists()).toBe(true)
    })

    it('sets aria-required on the input', () => {
      const wrapper = createWrapper({ required: true })
      expect(wrapper.find('input[type="file"]').attributes('aria-required')).toBe('true')
    })

    it('renders the default 必須 label when required is true', () => {
      const wrapper = createWrapper({ label: 'CSV', required: true })
      expect(wrapper.find('.dads-file-upload__required').text()).toBe('必須')
    })

    it('renders a custom requiredLabel when provided (i18n override)', () => {
      const wrapper = createWrapper({
        label: 'CSV',
        required: true,
        requiredLabel: 'Required',
      })
      expect(wrapper.find('.dads-file-upload__required').text()).toBe('Required')
    })
  })

  describe('formatRemoveLabel (i18n)', () => {
    it('uses the default `${name} を削除` aria-label on the remove button', () => {
      const wrapper = createWrapper({ modelValue: makeFile('only.txt', 10) })
      const removeBtn = wrapper.find('.dads-file-upload__remove')
      expect(removeBtn.attributes('aria-label')).toBe('only.txt を削除')
    })

    it('applies a custom formatRemoveLabel for i18n', () => {
      const wrapper = createWrapper({
        modelValue: makeFile('only.txt', 10),
        formatRemoveLabel: (name: string) => `Remove ${name}`,
      })
      const removeBtn = wrapper.find('.dads-file-upload__remove')
      expect(removeBtn.attributes('aria-label')).toBe('Remove only.txt')
    })
  })

  describe('disabled', () => {
    it('disables the trigger button', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('.dads-file-upload__button').attributes('disabled')).toBeDefined()
    })

    it('applies the disabled modifier class', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.classes()).toContain('dads-file-upload--disabled')
    })
  })

  describe('readonly', () => {
    it('applies the readonly modifier class', () => {
      const wrapper = createWrapper({ readonly: true })
      expect(wrapper.classes()).toContain('dads-file-upload--readonly')
    })

    it('does not accept dropped files when readonly', async () => {
      const wrapper = createWrapper({ readonly: true })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('a.txt', 10)])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('v-model (single)', () => {
    it('emits a single File via update:modelValue when not multiple', () => {
      const wrapper = createWrapper({ multiple: false })
      const file = makeFile('a.txt', 10)
      const input = wrapper.find('input[type="file"]').element as HTMLInputElement
      setInputFiles(input, [file])
      input.dispatchEvent(new Event('change', { bubbles: true }))

      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toBe(file)
    })

    it('renders the selected file in the list when modelValue is a single File', () => {
      const file = makeFile('only.txt', 10)
      const wrapper = createWrapper({ modelValue: file })
      const items = wrapper.findAll('.dads-file-upload__file-item')
      expect(items).toHaveLength(1)
      expect(items[0].text()).toContain('only.txt')
    })
  })

  describe('v-model (multiple)', () => {
    it('emits a File[] via update:modelValue when multiple', () => {
      const wrapper = createWrapper({ multiple: true })
      const a = makeFile('a.txt', 10)
      const b = makeFile('b.txt', 20)
      const input = wrapper.find('input[type="file"]').element as HTMLInputElement
      setInputFiles(input, [a, b])
      input.dispatchEvent(new Event('change', { bubbles: true }))

      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toEqual([a, b])
    })

    it('renders all selected files when modelValue is an array', () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: [makeFile('a.txt', 10), makeFile('b.txt', 20)],
      })
      expect(wrapper.findAll('.dads-file-upload__file-item')).toHaveLength(2)
    })
  })

  describe('click trigger', () => {
    it('calls input.click() when the trigger button is clicked', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input[type="file"]').element as HTMLInputElement
      const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {})
      await wrapper.find('.dads-file-upload__button').trigger('click')
      expect(clickSpy).toHaveBeenCalledTimes(1)
      clickSpy.mockRestore()
    })
  })

  describe('drag and drop', () => {
    it('processes files dropped onto the dropzone', async () => {
      const wrapper = createWrapper({ multiple: true })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('dropped.txt', 10)])
      const events = wrapper.emitted('update:modelValue')
      expect(events).toHaveLength(1)
      expect((events?.[0]?.[0] as File[])[0].name).toBe('dropped.txt')
    })

    it('toggles the dragover modifier on dragover/dragleave', async () => {
      const wrapper = createWrapper()
      const dropzone = wrapper.find('.dads-file-upload__dropzone')
      await dropzone.trigger('dragover')
      expect(dropzone.classes()).toContain('dads-file-upload__dropzone--dragover')
      await dropzone.trigger('dragleave')
      expect(dropzone.classes()).not.toContain('dads-file-upload__dropzone--dragover')
    })
  })

  describe('accept validation', () => {
    it('rejects files that do not match the extension pattern', async () => {
      const wrapper = createWrapper({ accept: '.csv' })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('a.txt', 10, 'text/plain')])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.find('.dads-file-upload__error').text()).toContain('a.txt')
    })

    it('accepts MIME wildcard patterns like image/*', async () => {
      const wrapper = createWrapper({ accept: 'image/*' })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('p.png', 10, 'image/png')])
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  describe('maxSize validation', () => {
    it('rejects files larger than maxSize', async () => {
      const wrapper = createWrapper({ maxSize: 100 })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('big.txt', 999)])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      const err = wrapper.find('.dads-file-upload__error')
      expect(err.exists()).toBe(true)
      expect(err.text()).toContain('big.txt')
    })
  })

  describe('error precedence', () => {
    it('prefers the internal validation message over the parent errorMessage', async () => {
      const wrapper = createWrapper({
        maxSize: 100,
        errorMessage: '親エラー',
      })
      const dropzone = wrapper.find('.dads-file-upload__dropzone').element as HTMLElement
      await dropOnZone(dropzone, [makeFile('big.txt', 999)])
      expect(wrapper.find('.dads-file-upload__error').text()).toContain('big.txt')
    })

    it('falls back to the parent errorMessage when no internal error is set', () => {
      const wrapper = createWrapper({ errorMessage: '親エラー' })
      expect(wrapper.find('.dads-file-upload__error').text()).toBe('親エラー')
      expect(wrapper.classes()).toContain('dads-file-upload--error')
    })
  })

  describe('remove button', () => {
    it('emits remove and update:modelValue when removing a file (multiple)', async () => {
      const a = makeFile('a.txt', 10)
      const b = makeFile('b.txt', 20)
      const wrapper = createWrapper({ multiple: true, modelValue: [a, b] })
      await wrapper.findAll('.dads-file-upload__remove')[0].trigger('click')

      // Compare by identifying field rather than reference, because Vue's prop
      // reactivity proxy can yield a wrapper object that fails Object.is even
      // when the underlying File is the same one passed in.
      expect((wrapper.emitted('remove')?.[0]?.[0] as File).name).toBe('a.txt')
      const remaining = wrapper.emitted('update:modelValue')?.[0]?.[0] as File[]
      expect(remaining).toHaveLength(1)
      expect(remaining[0].name).toBe('b.txt')
    })

    it('emits update:modelValue=null when removing the only file (single)', async () => {
      const a = makeFile('a.txt', 10)
      const wrapper = createWrapper({ modelValue: a })
      await wrapper.find('.dads-file-upload__remove').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeNull()
    })
  })

  describe('progress', () => {
    it('renders the progress bar when progress is provided', () => {
      const wrapper = createWrapper({ progress: 50 })
      const bar = wrapper.find('.dads-file-upload__progress')
      expect(bar.exists()).toBe(true)
      expect(bar.attributes('aria-valuenow')).toBe('50')
    })

    it('hides the progress bar when progress is undefined', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-file-upload__progress').exists()).toBe(false)
    })

    it('reflects the progress value via inline style width', () => {
      const wrapper = createWrapper({ progress: 75 })
      const fill = wrapper.find('.dads-file-upload__progress-bar')
      expect(fill.attributes('style')).toContain('width: 75%')
    })
  })

  describe('events', () => {
    it('emits change with the accepted files', () => {
      const wrapper = createWrapper({ multiple: true })
      const file = makeFile('a.txt', 10)
      const input = wrapper.find('input[type="file"]').element as HTMLInputElement
      setInputFiles(input, [file])
      input.dispatchEvent(new Event('change', { bubbles: true }))
      const events = wrapper.emitted('change')
      expect(events).toHaveLength(1)
      expect(events?.[0]?.[0]).toEqual([file])
    })

    it('emits focus', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input[type="file"]').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('input[type="file"]').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('forwarded attributes', () => {
    it('forwards accept, multiple, name to the native input', () => {
      const wrapper = createWrapper({
        accept: '.csv,text/csv',
        multiple: true,
        name: 'csv',
      })
      const input = wrapper.find('input[type="file"]')
      expect(input.attributes('accept')).toBe('.csv,text/csv')
      expect(input.attributes('multiple')).toBeDefined()
      expect(input.attributes('name')).toBe('csv')
    })
  })

  describe('aria wiring', () => {
    it('sets aria-invalid when an error message is present', () => {
      const wrapper = createWrapper({ errorMessage: 'bad' })
      expect(wrapper.find('input[type="file"]').attributes('aria-invalid')).toBe('true')
    })

    it('points aria-describedby at the hint id when only hint is set', () => {
      const wrapper = createWrapper({ hint: 'CSV のみ' })
      const hintId = wrapper.find('.dads-file-upload__hint').attributes('id')
      expect(wrapper.find('input[type="file"]').attributes('aria-describedby')).toBe(hintId)
    })
  })

  describe('expandDropArea + showFileSize', () => {
    it('applies the expand-drop modifier when expandDropArea=true', () => {
      const wrapper = createWrapper({ expandDropArea: true })
      expect(wrapper.find('.dads-file-upload').classes()).toContain('dads-file-upload--expand-drop')
    })

    it('does not apply expand-drop modifier by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.dads-file-upload').classes()).not.toContain(
        'dads-file-upload--expand-drop',
      )
    })

    it('shows file size by default in the preview list', () => {
      const file = makeFile('a.txt', 100)
      const wrapper = createWrapper({ modelValue: file })
      expect(wrapper.find('.dads-file-upload__file-size').exists()).toBe(true)
    })

    it('hides file size when showFileSize=false', () => {
      const file = makeFile('a.txt', 100)
      const wrapper = createWrapper({ modelValue: file, showFileSize: false })
      expect(wrapper.find('.dads-file-upload__file-size').exists()).toBe(false)
    })
  })

  describe('a11y (vitest-axe)', () => {
    it('has no violations with a visible label', async () => {
      const wrapper = createWrapper({ label: '添付ファイル' })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a hint message', async () => {
      const wrapper = createWrapper({
        label: '添付ファイル',
        hint: 'PDF または画像をアップロードしてください (10MB まで)',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations when required', async () => {
      const wrapper = createWrapper({ label: '添付ファイル', required: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in error state with a message', async () => {
      const wrapper = createWrapper({
        label: '添付ファイル',
        errorMessage: 'ファイルを選択してください',
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations in disabled state', async () => {
      const wrapper = createWrapper({ label: '添付ファイル', disabled: true })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('has no violations with a selected file preview', async () => {
      const file = makeFile('report.txt', 1024)
      const wrapper = createWrapper({ label: '添付ファイル', modelValue: file })
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })
})
