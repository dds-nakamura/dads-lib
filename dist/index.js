import { defineComponent as R, computed as d, openBlock as t, createBlock as ae, resolveDynamicComponent as ue, mergeProps as be, withCtx as se, createElementBlock as l, createCommentVNode as v, normalizeClass as w, createElementVNode as s, renderSlot as j, useId as le, createTextVNode as Q, toDisplayString as _, ref as P, onMounted as ve, onBeforeUnmount as _e, watch as re, Fragment as H, renderList as U, withModifiers as we, withDirectives as ye, vShow as ke, useAttrs as ia, normalizeStyle as Le, createVNode as Ie, useSlots as Te, resolveComponent as Ke, nextTick as Ce, Teleport as Fe, Transition as Ae, withKeys as Be, unref as Ve } from "vue";
const oa = {
  key: 0,
  class: "dads-button__spinner",
  "aria-hidden": "true"
}, na = { class: "dads-button__label" }, ra = /* @__PURE__ */ R({
  __name: "DadsButton",
  props: {
    variant: { default: "solid-fill" },
    size: { default: "md" },
    color: { default: "primary" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    prependIcon: {},
    appendIcon: {},
    block: { type: Boolean, default: !1 },
    type: { default: "button" },
    href: {},
    ariaLabel: {}
  },
  emits: ["click"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => a.href !== void 0), m = d(() => a.disabled || a.loading), b = d(() => h.value ? "a" : "button"), c = d(() => [
      "dads-button",
      `dads-button--${a.variant}`,
      `dads-button--${a.size}`,
      `dads-button--${a.color}`,
      {
        "dads-button--block": a.block,
        "dads-button--loading": a.loading
      }
    ]), n = d(() => h.value ? {
      role: "button",
      href: m.value ? void 0 : a.href,
      "aria-disabled": m.value ? "true" : void 0,
      "aria-busy": a.loading ? "true" : void 0,
      "aria-label": a.ariaLabel,
      tabindex: m.value ? -1 : void 0
    } : {
      type: a.type,
      disabled: a.disabled,
      "aria-busy": a.loading ? "true" : void 0,
      "aria-label": a.ariaLabel
    }), i = (o) => {
      if (m.value) {
        o.preventDefault();
        return;
      }
      r("click", o);
    };
    return (o, y) => (t(), ae(ue(b.value), be({ class: c.value }, n.value, { onClick: i }), {
      default: se(() => [
        e.loading ? (t(), l("span", oa)) : v("", !0),
        e.prependIcon && !e.loading ? (t(), l("i", {
          key: 1,
          class: w(["mdi", e.prependIcon, "dads-button__icon", "dads-button__icon--prepend"]),
          "aria-hidden": "true"
        }, null, 2)) : v("", !0),
        s("span", na, [
          j(o.$slots, "default", {}, void 0, !0)
        ]),
        e.appendIcon && !e.loading ? (t(), l("i", {
          key: 2,
          class: w(["mdi", e.appendIcon, "dads-button__icon", "dads-button__icon--append"]),
          "aria-hidden": "true"
        }, null, 2)) : v("", !0)
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), N = (e, g) => {
  const a = e.__vccOpts || e;
  for (const [r, h] of g)
    a[r] = h;
  return a;
}, ua = /* @__PURE__ */ N(ra, [["__scopeId", "data-v-3778c8eb"]]), ca = ["for"], ba = {
  key: 0,
  class: "dads-input-text__required",
  "aria-hidden": "true"
}, va = { class: "dads-input-text__control" }, fa = ["id", "type", "value"], ha = {
  key: 1,
  class: "dads-input-text__footer"
}, ma = ["id"], _a = ["id"], ga = ["id"], pa = /* @__PURE__ */ R({
  __name: "DadsInputText",
  props: {
    modelValue: {},
    type: { default: "text" },
    placeholder: {},
    name: {},
    id: {},
    autocomplete: {},
    maxlength: {},
    inputmode: {},
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    prependIcon: {},
    appendIcon: {},
    counter: {},
    align: { default: "vertical" },
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-input-text-${h}`), b = d(() => `${m.value}-hint`), c = d(() => `${m.value}-error`), n = d(() => `${m.value}-counter`), i = d(() => a.error || !!a.errorMessage), o = d(() => String(a.modelValue ?? "").length), y = d(() => {
      const x = [];
      return i.value && a.errorMessage ? x.push(c.value) : a.hint && x.push(b.value), a.counter !== void 0 && x.push(n.value), x.length > 0 ? x.join(" ") : void 0;
    }), p = d(() => [
      "dads-input-text",
      `dads-input-text--${a.size}`,
      `dads-input-text--align-${a.align}`,
      {
        "dads-input-text--disabled": a.disabled,
        "dads-input-text--readonly": a.readonly,
        "dads-input-text--error": i.value
      }
    ]), u = d(() => ({
      name: a.name,
      placeholder: a.placeholder,
      autocomplete: a.autocomplete,
      maxlength: a.maxlength,
      inputmode: a.inputmode,
      disabled: a.disabled || void 0,
      readonly: a.readonly || void 0,
      "aria-invalid": i.value || void 0,
      "aria-required": a.required || void 0,
      "aria-describedby": y.value
    })), f = d(
      () => i.value && !!a.errorMessage || !!a.hint || a.counter !== void 0
    ), $ = (x) => {
      const C = x.target, B = a.type === "number" ? C.valueAsNumber : C.value;
      r("update:modelValue", Number.isNaN(B) ? "" : B);
    }, k = (x) => r("change", x), L = (x) => r("focus", x), I = (x) => r("blur", x);
    return (x, C) => (t(), l("div", {
      class: w(p.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-input-text__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", ba, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, ca)) : v("", !0),
      s("div", va, [
        e.prependIcon ? (t(), l("i", {
          key: 0,
          class: w(["mdi", e.prependIcon, "dads-input-text__icon", "dads-input-text__icon--prepend"]),
          "aria-hidden": "true"
        }, null, 2)) : v("", !0),
        s("input", be({
          id: m.value,
          class: "dads-input-text__input",
          type: e.type,
          value: e.modelValue
        }, u.value, {
          onInput: $,
          onChange: k,
          onFocus: L,
          onBlur: I
        }), null, 16, fa),
        e.appendIcon ? (t(), l("i", {
          key: 1,
          class: w(["mdi", e.appendIcon, "dads-input-text__icon", "dads-input-text__icon--append"]),
          "aria-hidden": "true"
        }, null, 2)) : v("", !0)
      ]),
      f.value ? (t(), l("div", ha, [
        i.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: c.value,
          class: "dads-input-text__error",
          role: "alert"
        }, _(e.errorMessage), 9, ma)) : e.hint ? (t(), l("span", {
          key: 1,
          id: b.value,
          class: "dads-input-text__hint"
        }, _(e.hint), 9, _a)) : v("", !0),
        e.counter !== void 0 ? (t(), l("span", {
          key: 2,
          id: n.value,
          class: "dads-input-text__counter"
        }, _(o.value) + " / " + _(e.counter), 9, ga)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), Kr = /* @__PURE__ */ N(pa, [["__scopeId", "data-v-12e47078"]]), ya = ["for"], ka = {
  key: 0,
  class: "dads-textarea__required",
  "aria-hidden": "true"
}, $a = { class: "dads-textarea__control" }, xa = ["id", "value", "rows"], wa = {
  key: 1,
  class: "dads-textarea__footer"
}, La = ["id"], Ia = ["id"], Ca = ["id"], Da = /* @__PURE__ */ R({
  __name: "DadsTextarea",
  props: {
    modelValue: {},
    placeholder: {},
    name: {},
    id: {},
    autocomplete: {},
    maxlength: {},
    rows: { default: 3 },
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    counter: {},
    resize: { default: "vertical" },
    autoResize: { type: Boolean, default: !1 },
    minRows: { default: 2 },
    maxRows: {},
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null), m = le(), b = d(() => a.id ?? `dads-textarea-${m}`), c = d(() => `${b.value}-hint`), n = d(() => `${b.value}-error`), i = d(() => `${b.value}-counter`), o = d(() => a.error || !!a.errorMessage), y = d(() => String(a.modelValue ?? "").length), p = d(() => a.autoResize ? a.minRows : a.rows), u = d(() => a.autoResize ? "none" : a.resize), f = d(() => {
      const E = [];
      return o.value && a.errorMessage ? E.push(n.value) : a.hint && E.push(c.value), a.counter !== void 0 && E.push(i.value), E.length > 0 ? E.join(" ") : void 0;
    }), $ = d(() => [
      "dads-textarea",
      `dads-textarea--${a.size}`,
      {
        "dads-textarea--disabled": a.disabled,
        "dads-textarea--readonly": a.readonly,
        "dads-textarea--error": o.value
      }
    ]), k = d(() => ({
      name: a.name,
      placeholder: a.placeholder,
      autocomplete: a.autocomplete,
      maxlength: a.maxlength,
      disabled: a.disabled || void 0,
      readonly: a.readonly || void 0,
      "aria-invalid": o.value || void 0,
      "aria-required": a.required || void 0,
      "aria-describedby": f.value
    })), L = d(
      () => o.value && !!a.errorMessage || !!a.hint || a.counter !== void 0
    );
    let I = null;
    const x = () => {
      I = null;
      const E = h.value;
      if (!E || !a.autoResize) return;
      E.style.height = "auto";
      const W = window.getComputedStyle(E), X = Number.parseFloat(W.lineHeight) || 20, de = (Number.parseFloat(W.paddingTop) || 0) + (Number.parseFloat(W.paddingBottom) || 0), Z = (Number.parseFloat(W.borderTopWidth) || 0) + (Number.parseFloat(W.borderBottomWidth) || 0), M = a.minRows * X + de + Z, K = a.maxRows !== void 0 ? a.maxRows * X + de + Z : Number.POSITIVE_INFINITY, A = Math.min(K, Math.max(M, E.scrollHeight));
      E.style.height = `${A}px`;
    }, C = () => {
      a.autoResize && (I !== null && cancelAnimationFrame(I), I = requestAnimationFrame(x));
    };
    ve(C), _e(() => {
      I !== null && cancelAnimationFrame(I);
    }), re(() => a.modelValue, C, { flush: "post" });
    const B = (E) => {
      const W = E.target;
      r("update:modelValue", W.value);
    }, q = (E) => r("change", E), te = (E) => r("focus", E), G = (E) => r("blur", E);
    return (E, W) => (t(), l("div", {
      class: w($.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: b.value,
        class: "dads-textarea__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", ka, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, ya)) : v("", !0),
      s("div", $a, [
        s("textarea", be({
          id: b.value,
          ref_key: "textareaRef",
          ref: h,
          class: "dads-textarea__input",
          value: e.modelValue,
          rows: p.value,
          style: { resize: u.value }
        }, k.value, {
          onInput: B,
          onChange: q,
          onFocus: te,
          onBlur: G
        }), null, 16, xa)
      ]),
      L.value ? (t(), l("div", wa, [
        o.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-textarea__error",
          role: "alert"
        }, _(e.errorMessage), 9, La)) : e.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-textarea__hint"
        }, _(e.hint), 9, Ia)) : v("", !0),
        e.counter !== void 0 ? (t(), l("span", {
          key: 2,
          id: i.value,
          class: "dads-textarea__counter"
        }, _(y.value) + " / " + _(e.counter), 9, Ca)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), jr = /* @__PURE__ */ N(Da, [["__scopeId", "data-v-cff4d920"]]), Ba = ["for"], Va = {
  key: 0,
  class: "dads-select__required",
  "aria-hidden": "true"
}, Aa = { class: "dads-select__control" }, Ma = ["id", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid", "aria-required", "aria-describedby", "disabled", "data-readonly"], Sa = { class: "dads-select__value-wrap" }, za = {
  key: 0,
  class: "dads-select__tags"
}, Ta = { class: "dads-select__tag-text" }, Fa = ["aria-label", "disabled", "onClick"], Ea = {
  key: 1,
  class: "dads-select__value"
}, qa = {
  key: 2,
  class: "dads-select__value"
}, Ra = {
  key: 3,
  class: "dads-select__placeholder"
}, Na = ["id", "aria-multiselectable"], Pa = ["id", "aria-selected", "aria-disabled", "onClick", "onMouseenter"], Ha = {
  key: 0,
  class: "dads-select__option dads-select__option--empty",
  "aria-disabled": "true"
}, Oa = {
  key: 1,
  class: "dads-select__footer"
}, Ka = ["id"], ja = ["id"], Ua = 500, Za = /* @__PURE__ */ R({
  __name: "DadsSelect",
  props: {
    modelValue: { type: [String, Number, Boolean, Array, null] },
    items: { default: () => [] },
    itemValue: { default: "value" },
    itemTitle: { default: "title" },
    multiple: { type: Boolean, default: !1 },
    placeholder: {},
    id: {},
    name: {},
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    prefixIcon: {},
    chips: { type: Boolean, default: !0 },
    formatRemoveAriaLabel: { type: Function, default: (e) => `${e} を削除` },
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur", "open", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-select-${h}`), b = d(() => `${m.value}-listbox`), c = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), i = (z) => `${m.value}-option-${z}`, o = d(() => a.error || !!a.errorMessage), y = P(!1), p = P(-1), u = P(null), f = P(null), $ = (z) => z[a.itemValue], k = (z) => String(z[a.itemTitle] ?? ""), L = (z) => {
      const D = $(z);
      return a.multiple ? Array.isArray(a.modelValue) && a.modelValue.includes(D) : a.modelValue === D;
    }, I = d(() => !a.multiple || !Array.isArray(a.modelValue) ? [] : a.modelValue.map((z) => a.items.find((D) => $(D) === z)).filter((z) => z !== void 0)), x = d(() => a.multiple || a.modelValue === null || a.modelValue === void 0 ? null : a.items.find((z) => $(z) === a.modelValue) ?? null), C = d(
      () => y.value && p.value >= 0 ? i(p.value) : void 0
    ), B = d(() => {
      const z = [];
      return o.value && a.errorMessage ? z.push(n.value) : a.hint && z.push(c.value), z.length > 0 ? z.join(" ") : void 0;
    }), q = d(() => o.value && !!a.errorMessage || !!a.hint), te = d(() => [
      "dads-select",
      `dads-select--${a.size}`,
      {
        "dads-select--disabled": a.disabled,
        "dads-select--readonly": a.readonly,
        "dads-select--error": o.value,
        "dads-select--open": y.value
      }
    ]), G = () => {
      for (let z = 0; z < a.items.length; z++)
        if (L(a.items[z])) return z;
      return -1;
    }, E = () => a.items.findIndex((z) => !z.disabled), W = () => {
      if (a.disabled || a.readonly || y.value) return;
      y.value = !0;
      const z = G();
      p.value = z >= 0 ? z : E(), r("open");
    }, X = (z = !1) => {
      y.value && (y.value = !1, p.value = -1, r("close"), z && f.value?.focus());
    }, de = () => {
      a.disabled || a.readonly || (y.value ? X() : W());
    }, Z = (z) => {
      r("update:modelValue", z), r("change", z);
    }, M = (z) => {
      if (z.disabled) return;
      const D = $(z);
      if (a.multiple) {
        const S = Array.isArray(a.modelValue) ? [...a.modelValue] : [], Y = S.indexOf(D);
        Y >= 0 ? S.splice(Y, 1) : S.push(D), Z(S);
      } else
        Z(D), X(!0);
    }, K = (z) => {
      if (!a.multiple) return;
      const D = $(z), S = Array.isArray(a.modelValue) ? a.modelValue.filter((Y) => Y !== D) : [];
      Z(S);
    }, A = (z) => {
      if (a.items.length === 0) return;
      let S = p.value;
      for (let Y = 0; Y < a.items.length; Y++)
        if (S = (S + z + a.items.length) % a.items.length, !a.items[S].disabled) {
          p.value = S;
          return;
        }
    }, F = (z) => {
      const D = z === "first" ? a.items.keys() : [...a.items.keys()].reverse();
      for (const S of D)
        if (!a.items[S].disabled) {
          p.value = S;
          return;
        }
    };
    let O = "", J = null;
    const fe = (z) => {
      J !== null && clearTimeout(J), O += z.toLowerCase(), J = setTimeout(() => {
        O = "", J = null;
      }, Ua);
      const D = a.items.findIndex(
        (S) => !S.disabled && k(S).toLowerCase().startsWith(O)
      );
      D >= 0 && (p.value = D);
    }, Me = (z) => {
      if (a.disabled || a.readonly) return;
      const { key: D } = z;
      if (!y.value) {
        if (D === "ArrowDown" || D === "ArrowUp" || D === "Enter" || D === " ") {
          z.preventDefault(), W();
          return;
        }
        D.length === 1 && /\S/.test(D) && (z.preventDefault(), W(), fe(D));
        return;
      }
      switch (D) {
        case "Escape":
          z.preventDefault(), X(!0);
          break;
        case "Tab":
          X();
          break;
        case "ArrowDown":
          z.preventDefault(), A(1);
          break;
        case "ArrowUp":
          z.preventDefault(), A(-1);
          break;
        case "Home":
          z.preventDefault(), F("first");
          break;
        case "End":
          z.preventDefault(), F("last");
          break;
        case "Enter":
        case " ":
          z.preventDefault(), p.value >= 0 && M(a.items[p.value]);
          break;
        default:
          D.length === 1 && /\S/.test(D) && (z.preventDefault(), fe(D));
      }
    }, De = (z) => {
      if (!y.value) return;
      const D = z.target;
      D && u.value && u.value.contains(D) || X();
    };
    ve(() => {
      document.addEventListener("pointerdown", De, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", De, !0), J !== null && clearTimeout(J);
    }), re(
      () => a.disabled,
      (z) => {
        z && X();
      }
    );
    const ge = (z) => r("focus", z), pe = (z) => r("blur", z);
    return (z, D) => (t(), l("div", {
      ref_key: "rootRef",
      ref: u,
      class: w(te.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-select__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", Va, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, Ba)) : v("", !0),
      s("div", Aa, [
        s("button", {
          id: m.value,
          ref_key: "triggerRef",
          ref: f,
          type: "button",
          class: "dads-select__trigger",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": y.value,
          "aria-controls": b.value,
          "aria-activedescendant": C.value,
          "aria-invalid": o.value || void 0,
          "aria-required": e.required || void 0,
          "aria-describedby": B.value,
          disabled: e.disabled || void 0,
          "data-readonly": e.readonly || void 0,
          onClick: de,
          onKeydown: Me,
          onFocus: ge,
          onBlur: pe
        }, [
          e.prefixIcon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", e.prefixIcon, "dads-select__prefix-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : v("", !0),
          s("span", Sa, [
            e.multiple && I.value.length > 0 && e.chips ? (t(), l("span", za, [
              (t(!0), l(H, null, U(I.value, (S) => (t(), l("span", {
                key: String($(S)),
                class: "dads-select__tag"
              }, [
                s("span", Ta, _(k(S)), 1),
                s("button", {
                  type: "button",
                  class: "dads-select__tag-remove",
                  "aria-label": e.formatRemoveAriaLabel(k(S)),
                  disabled: e.disabled || e.readonly || void 0,
                  onClick: we((Y) => K(S), ["stop"]),
                  onKeydown: D[0] || (D[0] = we(() => {
                  }, ["stop"]))
                }, " × ", 40, Fa)
              ]))), 128))
            ])) : e.multiple && I.value.length > 0 ? (t(), l("span", Ea, _(I.value.map((S) => k(S)).join(", ")), 1)) : !e.multiple && x.value ? (t(), l("span", qa, _(k(x.value)), 1)) : (t(), l("span", Ra, _(e.placeholder), 1))
          ]),
          s("i", {
            class: w(["mdi mdi-chevron-down dads-select__icon", { "dads-select__icon--open": y.value }]),
            "aria-hidden": "true"
          }, null, 2)
        ], 40, Ma),
        ye(s("ul", {
          id: b.value,
          class: "dads-select__listbox",
          role: "listbox",
          "aria-multiselectable": e.multiple || void 0,
          tabindex: "-1"
        }, [
          (t(!0), l(H, null, U(e.items, (S, Y) => (t(), l("li", {
            id: i(Y),
            key: String($(S)),
            role: "option",
            "aria-selected": L(S),
            "aria-disabled": S.disabled || void 0,
            class: w([
              "dads-select__option",
              {
                "dads-select__option--active": Y === p.value,
                "dads-select__option--selected": L(S),
                "dads-select__option--disabled": S.disabled
              }
            ]),
            onClick: (ie) => M(S),
            onMouseenter: (ie) => !S.disabled && (p.value = Y)
          }, _(k(S)), 43, Pa))), 128)),
          e.items.length === 0 ? (t(), l("li", Ha, " 選択肢がありません ")) : v("", !0)
        ], 8, Na), [
          [ke, y.value]
        ])
      ]),
      q.value ? (t(), l("div", Oa, [
        o.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-select__error",
          role: "alert"
        }, _(e.errorMessage), 9, Ka)) : e.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-select__hint"
        }, _(e.hint), 9, ja)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), Ur = /* @__PURE__ */ N(Za, [["__scopeId", "data-v-49d82779"]]), Ya = ["for"], Ga = ["id", "checked", "value"], Wa = {
  key: 0,
  class: "dads-checkbox__text"
}, Qa = {
  key: 0,
  class: "dads-checkbox__required",
  "aria-hidden": "true"
}, Ja = {
  key: 0,
  class: "dads-checkbox__footer"
}, Xa = ["id"], et = ["id"], at = /* @__PURE__ */ R({
  inheritAttrs: !1,
  __name: "DadsCheckbox",
  props: {
    modelValue: { type: Boolean, default: !1 },
    indeterminate: { type: Boolean, default: !1 },
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    name: {},
    id: {},
    value: { type: [String, Number, Boolean] },
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = ia(), m = d(() => {
      const B = {};
      for (const q of Object.keys(h))
        q === "class" || q === "style" || q === "id" || q.startsWith("on") || (B[q] = h[q]);
      return B;
    }), b = d(() => {
      const B = {};
      return h.class !== void 0 && (B.class = h.class), h.style !== void 0 && (B.style = h.style), B;
    }), c = P(null), n = le(), i = d(() => a.id ?? `dads-checkbox-${n}`), o = d(() => `${i.value}-hint`), y = d(() => `${i.value}-error`), p = d(() => a.error || !!a.errorMessage), u = d(() => {
      if (p.value && a.errorMessage) return y.value;
      if (a.hint) return o.value;
    }), f = d(() => [
      "dads-checkbox",
      `dads-checkbox--${a.size}`,
      {
        "dads-checkbox--checked": a.modelValue && !a.indeterminate,
        "dads-checkbox--indeterminate": a.indeterminate,
        "dads-checkbox--disabled": a.disabled,
        "dads-checkbox--readonly": a.readonly,
        "dads-checkbox--error": p.value
      }
    ]), $ = d(() => ({
      name: a.name,
      disabled: a.disabled || void 0,
      // `aria-checked="mixed"` overrides the native checked state announcement so
      // screen readers report the third "indeterminate" state correctly.
      "aria-checked": a.indeterminate ? "mixed" : void 0,
      "aria-invalid": p.value || void 0,
      "aria-required": a.required || void 0,
      "aria-describedby": u.value
    })), k = d(() => p.value && !!a.errorMessage || !!a.hint), L = () => {
      c.value && (c.value.indeterminate = a.indeterminate);
    };
    ve(L), re(() => a.indeterminate, L);
    const I = (B) => {
      if (a.readonly) {
        c.value && (c.value.checked = a.modelValue);
        return;
      }
      const q = B.target;
      r("update:modelValue", q.checked), r("change", B);
    }, x = (B) => r("focus", B), C = (B) => r("blur", B);
    return (B, q) => (t(), l("div", be({ class: f.value }, b.value), [
      s("label", {
        class: "dads-checkbox__label",
        for: i.value
      }, [
        s("input", be({
          id: i.value,
          ref_key: "inputRef",
          ref: c,
          type: "checkbox",
          class: "dads-checkbox__input",
          checked: e.modelValue,
          value: e.value
        }, { ...$.value, ...m.value }, {
          onChange: I,
          onFocus: x,
          onBlur: C
        }), null, 16, Ga),
        q[0] || (q[0] = s("span", {
          class: "dads-checkbox__indicator",
          "aria-hidden": "true"
        }, null, -1)),
        e.label ? (t(), l("span", Wa, [
          Q(_(e.label) + " ", 1),
          e.required ? (t(), l("span", Qa, _(e.requiredLabel), 1)) : v("", !0)
        ])) : v("", !0)
      ], 8, Ya),
      k.value ? (t(), l("div", Ja, [
        p.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: y.value,
          class: "dads-checkbox__error",
          role: "alert"
        }, _(e.errorMessage), 9, Xa)) : e.hint ? (t(), l("span", {
          key: 1,
          id: o.value,
          class: "dads-checkbox__hint"
        }, _(e.hint), 9, et)) : v("", !0)
      ])) : v("", !0)
    ], 16));
  }
}), tt = /* @__PURE__ */ N(at, [["__scopeId", "data-v-53c03b99"]]), lt = ["id", "disabled", "aria-invalid", "aria-describedby"], st = {
  key: 0,
  class: "dads-checkbox-group__legend"
}, dt = {
  key: 0,
  class: "dads-checkbox-group__required",
  "aria-hidden": "true"
}, it = { class: "dads-checkbox-group__items" }, ot = {
  key: 1,
  class: "dads-checkbox-group__footer"
}, nt = ["id"], rt = ["id"], ut = /* @__PURE__ */ R({
  __name: "DadsCheckboxGroup",
  props: {
    modelValue: {},
    items: {},
    legend: {},
    direction: { default: "vertical" },
    size: { default: "md" },
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    name: {},
    id: {},
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-checkbox-group-${h}`), b = d(() => `${m.value}-hint`), c = d(() => `${m.value}-error`), n = d(() => a.error || !!a.errorMessage), i = d(() => {
      if (n.value && a.errorMessage) return c.value;
      if (a.hint) return b.value;
    }), o = d(() => [
      "dads-checkbox-group",
      `dads-checkbox-group--${a.direction}`,
      {
        "dads-checkbox-group--error": n.value,
        "dads-checkbox-group--disabled": a.disabled
      }
    ]), y = d(() => n.value && !!a.errorMessage || !!a.hint), p = ($) => a.modelValue?.includes($) ?? !1, u = ($, k, L) => L ? $.includes(k) ? [...$] : [...$, k] : $.filter((I) => I !== k), f = ($, k) => {
      const L = u(a.modelValue ?? [], $, k);
      r("update:modelValue", L), r("change", L);
    };
    return ($, k) => (t(), l("fieldset", {
      id: m.value,
      class: w(o.value),
      disabled: e.disabled || void 0,
      "aria-invalid": n.value || void 0,
      "aria-describedby": i.value
    }, [
      e.legend ? (t(), l("legend", st, [
        Q(_(e.legend) + " ", 1),
        e.required ? (t(), l("span", dt, _(e.requiredLabel), 1)) : v("", !0)
      ])) : v("", !0),
      s("div", it, [
        (t(!0), l(H, null, U(e.items, (L) => (t(), ae(tt, {
          key: String(L.value),
          "model-value": p(L.value),
          label: L.label,
          hint: L.hint,
          disabled: L.disabled || e.disabled,
          size: e.size,
          name: e.name,
          value: L.value,
          error: n.value,
          "onUpdate:modelValue": (I) => f(L.value, I)
        }, null, 8, ["model-value", "label", "hint", "disabled", "size", "name", "value", "error", "onUpdate:modelValue"]))), 128))
      ]),
      y.value ? (t(), l("div", ot, [
        n.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: c.value,
          class: "dads-checkbox-group__error",
          role: "alert"
        }, _(e.errorMessage), 9, nt)) : e.hint ? (t(), l("span", {
          key: 1,
          id: b.value,
          class: "dads-checkbox-group__hint"
        }, _(e.hint), 9, rt)) : v("", !0)
      ])) : v("", !0)
    ], 10, lt));
  }
}), Zr = /* @__PURE__ */ N(ut, [["__scopeId", "data-v-ed4d09d6"]]), ct = ["for"], bt = ["id", "name", "value", "checked"], vt = {
  key: 0,
  class: "dads-radio__text"
}, ft = { class: "dads-radio__title" }, ht = {
  key: 1,
  class: "dads-radio__required",
  "aria-hidden": "true"
}, mt = ["id"], _t = {
  key: 0,
  class: "dads-radio__footer"
}, gt = ["id"], pt = ["id"], yt = /* @__PURE__ */ R({
  __name: "DadsRadio",
  props: {
    modelValue: { type: [String, Number, Boolean, null] },
    value: { type: [String, Number, Boolean] },
    size: { default: "md" },
    label: {},
    description: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    name: {},
    id: {},
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-radio-${h}`), b = d(() => `${m.value}-hint`), c = d(() => `${m.value}-error`), n = d(() => `${m.value}-description`), i = d(() => a.error || !!a.errorMessage), o = d(() => a.modelValue === a.value), y = d(() => {
      const I = [];
      return a.description && I.push(n.value), i.value && a.errorMessage ? I.push(c.value) : a.hint && I.push(b.value), I.length > 0 ? I.join(" ") : void 0;
    }), p = d(() => [
      "dads-radio",
      `dads-radio--${a.size}`,
      {
        "dads-radio--checked": o.value,
        "dads-radio--disabled": a.disabled,
        "dads-radio--error": i.value
      }
    ]), u = d(() => ({
      disabled: a.disabled || void 0,
      "aria-invalid": i.value || void 0,
      "aria-required": a.required || void 0,
      "aria-describedby": y.value
    })), f = d(() => i.value && !!a.errorMessage || !!a.hint), $ = (I) => {
      r("update:modelValue", a.value), r("change", I);
    }, k = (I) => r("focus", I), L = (I) => r("blur", I);
    return (I, x) => (t(), l("div", {
      class: w(p.value)
    }, [
      s("label", {
        class: "dads-radio__label",
        for: m.value
      }, [
        s("input", be({
          id: m.value,
          type: "radio",
          class: "dads-radio__input",
          name: e.name,
          value: e.value,
          checked: o.value
        }, u.value, {
          onChange: $,
          onFocus: k,
          onBlur: L
        }), null, 16, bt),
        x[0] || (x[0] = s("span", {
          class: "dads-radio__indicator",
          "aria-hidden": "true"
        }, null, -1)),
        e.label || e.required || e.description ? (t(), l("span", vt, [
          s("span", ft, [
            e.label ? (t(), l(H, { key: 0 }, [
              Q(_(e.label), 1)
            ], 64)) : v("", !0),
            e.required ? (t(), l("span", ht, _(e.requiredLabel), 1)) : v("", !0)
          ]),
          e.description ? (t(), l("span", {
            key: 0,
            id: n.value,
            class: "dads-radio__description"
          }, _(e.description), 9, mt)) : v("", !0)
        ])) : v("", !0)
      ], 8, ct),
      f.value ? (t(), l("div", _t, [
        i.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: c.value,
          class: "dads-radio__error",
          role: "alert"
        }, _(e.errorMessage), 9, gt)) : e.hint ? (t(), l("span", {
          key: 1,
          id: b.value,
          class: "dads-radio__hint"
        }, _(e.hint), 9, pt)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), kt = /* @__PURE__ */ N(yt, [["__scopeId", "data-v-4388c269"]]), $t = ["id", "disabled", "aria-invalid", "aria-describedby"], xt = {
  key: 0,
  class: "dads-radio-group__required",
  "aria-hidden": "true"
}, wt = { class: "dads-radio-group__items" }, Lt = {
  key: 1,
  class: "dads-radio-group__footer"
}, It = ["id"], Ct = ["id"], Dt = /* @__PURE__ */ R({
  __name: "DadsRadioGroup",
  props: {
    modelValue: { type: [String, Number, Boolean, null] },
    items: {},
    legend: {},
    legendVisuallyHidden: { type: Boolean, default: !1 },
    direction: { default: "vertical" },
    size: { default: "md" },
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    name: {},
    id: {},
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-radio-group-${h}`), b = d(() => a.name ?? `dads-radio-group-name-${h}`), c = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), i = d(() => a.error || !!a.errorMessage), o = d(() => {
      if (i.value && a.errorMessage) return n.value;
      if (a.hint) return c.value;
    }), y = d(() => [
      "dads-radio-group",
      `dads-radio-group--${a.direction}`,
      {
        "dads-radio-group--error": i.value,
        "dads-radio-group--disabled": a.disabled
      }
    ]), p = d(() => i.value && !!a.errorMessage || !!a.hint), u = (f) => {
      r("update:modelValue", f), r("change", f);
    };
    return (f, $) => (t(), l("fieldset", {
      id: m.value,
      class: w(y.value),
      disabled: e.disabled,
      "aria-invalid": i.value || void 0,
      "aria-describedby": o.value
    }, [
      e.legend ? (t(), l("legend", {
        key: 0,
        class: w(["dads-radio-group__legend", { "dads-radio-group__legend--visually-hidden": e.legendVisuallyHidden }])
      }, [
        Q(_(e.legend) + " ", 1),
        e.required ? (t(), l("span", xt, _(e.requiredLabel), 1)) : v("", !0)
      ], 2)) : v("", !0),
      s("div", wt, [
        (t(!0), l(H, null, U(e.items, (k) => (t(), ae(kt, {
          key: String(k.value),
          "model-value": e.modelValue ?? null,
          value: k.value,
          label: k.label,
          hint: k.hint,
          description: k.description,
          disabled: k.disabled || e.disabled,
          size: e.size,
          name: b.value,
          error: i.value,
          "onUpdate:modelValue": u
        }, null, 8, ["model-value", "value", "label", "hint", "description", "disabled", "size", "name", "error"]))), 128))
      ]),
      p.value ? (t(), l("div", Lt, [
        i.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-radio-group__error",
          role: "alert"
        }, _(e.errorMessage), 9, It)) : e.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-radio-group__hint"
        }, _(e.hint), 9, Ct)) : v("", !0)
      ])) : v("", !0)
    ], 10, $t));
  }
}), Yr = /* @__PURE__ */ N(Dt, [["__scopeId", "data-v-bdfa4690"]]), Bt = ["for"], Vt = {
  key: 0,
  class: "dads-file-upload__required",
  "aria-hidden": "true"
}, At = ["disabled"], Mt = { class: "dads-file-upload__dropzone-text" }, St = ["id"], zt = {
  key: 1,
  class: "dads-file-upload__file-list"
}, Tt = { class: "dads-file-upload__file-name" }, Ft = {
  key: 0,
  class: "dads-file-upload__file-size"
}, Et = ["aria-label", "disabled", "onClick"], qt = ["aria-valuenow"], Rt = {
  key: 3,
  class: "dads-file-upload__footer"
}, Nt = ["id"], Pt = ["id"], Ht = /* @__PURE__ */ R({
  __name: "DadsFileUpload",
  props: {
    modelValue: {},
    accept: {},
    multiple: { type: Boolean, default: !1 },
    maxSize: {},
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    progress: {},
    name: {},
    id: {},
    buttonText: { default: "ファイルを選択" },
    dropzoneText: { default: "またはここにファイルをドロップ" },
    expandDropArea: { type: Boolean, default: !1 },
    showFileSize: { type: Boolean, default: !0 },
    requiredLabel: { default: "必須" },
    formatRemoveLabel: { type: Function, default: (e) => `${e} を削除` }
  },
  emits: ["update:modelValue", "change", "remove", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null), m = le(), b = d(() => a.id ?? `dads-file-upload-${m}`), c = d(() => `${b.value}-hint`), n = d(() => `${b.value}-error`), i = P(!1), o = P(null), y = d(() => o.value ?? a.errorMessage), p = d(() => a.error || !!y.value), u = d(() => a.disabled || a.readonly), f = d(() => {
      const A = a.modelValue;
      return A == null ? [] : Array.isArray(A) ? A : [A];
    }), $ = d(() => [
      "dads-file-upload",
      `dads-file-upload--${a.size}`,
      {
        "dads-file-upload--disabled": a.disabled,
        "dads-file-upload--readonly": a.readonly,
        "dads-file-upload--error": p.value,
        "dads-file-upload--expand-drop": a.expandDropArea,
        "dads-file-upload--dragover": i.value && a.expandDropArea
      }
    ]), k = d(() => {
      if (p.value && y.value) return n.value;
      if (a.hint) return c.value;
    }), L = d(() => ({
      name: a.name,
      accept: a.accept,
      multiple: a.multiple || void 0,
      disabled: u.value || void 0,
      required: a.required || void 0,
      "aria-invalid": p.value || void 0,
      "aria-required": a.required || void 0,
      "aria-describedby": k.value
    })), I = d(() => p.value && !!y.value || !!a.hint), x = (A, F) => F.length === 0 ? !0 : F.some((O) => O.startsWith(".") ? A.name.toLowerCase().endsWith(O.toLowerCase()) : O.endsWith("/*") ? A.type.startsWith(O.slice(0, -1)) : A.type === O), C = (A) => {
      if (a.maxSize !== void 0) {
        const F = A.find((O) => O.size > a.maxSize);
        if (F) return `${F.name} はサイズ上限を超えています`;
      }
      if (a.accept) {
        const F = a.accept.split(",").map((J) => J.trim()).filter(Boolean), O = A.find((J) => !x(J, F));
        if (O) return `${O.name} は許可された形式ではありません`;
      }
      return null;
    }, B = (A) => {
      a.multiple ? r("update:modelValue", A) : r("update:modelValue", A[0] ?? null);
    }, q = (A) => {
      if (u.value || A.length === 0) return;
      const F = C(A);
      if (F) {
        o.value = F;
        return;
      }
      o.value = null;
      const O = a.multiple ? A : A.slice(0, 1);
      r("change", O), B(O);
    }, te = () => {
      u.value || h.value?.click();
    }, G = (A) => {
      const F = A.target, O = F.files;
      O && (q(Array.from(O)), F.value = "");
    }, E = () => {
      u.value || (i.value = !0);
    }, W = () => {
      i.value = !1;
    }, X = (A) => {
      if (i.value = !1, u.value) return;
      const F = A.dataTransfer?.files;
      F && q(Array.from(F));
    }, de = (A) => {
      u.value || (r("remove", A), B(f.value.filter((F) => F !== A)), o.value = null);
    }, Z = (A) => A < 1024 ? `${A} B` : A < 1024 * 1024 ? `${(A / 1024).toFixed(1)} KB` : A < 1024 * 1024 * 1024 ? `${(A / 1024 / 1024).toFixed(1)} MB` : `${(A / 1024 / 1024 / 1024).toFixed(1)} GB`, M = (A) => r("focus", A), K = (A) => r("blur", A);
    return (A, F) => (t(), l("div", {
      class: w($.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: b.value,
        class: "dads-file-upload__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", Vt, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, Bt)) : v("", !0),
      s("div", {
        class: w(["dads-file-upload__dropzone", { "dads-file-upload__dropzone--dragover": i.value }]),
        onDragover: we(E, ["prevent"]),
        onDragleave: we(W, ["prevent"]),
        onDrop: we(X, ["prevent"])
      }, [
        s("button", {
          type: "button",
          class: "dads-file-upload__button",
          disabled: u.value,
          onClick: te
        }, _(e.buttonText), 9, At),
        s("span", Mt, _(e.dropzoneText), 1),
        s("input", be({
          id: b.value,
          ref_key: "inputRef",
          ref: h,
          type: "file",
          class: "dads-file-upload__input"
        }, L.value, {
          onChange: G,
          onFocus: M,
          onBlur: K
        }), null, 16, St)
      ], 34),
      f.value.length > 0 ? (t(), l("ul", zt, [
        (t(!0), l(H, null, U(f.value, (O) => (t(), l("li", {
          key: `${O.name}-${O.size}-${O.lastModified}`,
          class: "dads-file-upload__file-item"
        }, [
          s("span", Tt, _(O.name), 1),
          e.showFileSize ? (t(), l("span", Ft, _(Z(O.size)), 1)) : v("", !0),
          s("button", {
            type: "button",
            class: "dads-file-upload__remove",
            "aria-label": e.formatRemoveLabel(O.name),
            disabled: u.value,
            onClick: (J) => de(O)
          }, " × ", 8, Et)
        ]))), 128))
      ])) : v("", !0),
      e.progress !== void 0 ? (t(), l("div", {
        key: 2,
        class: "dads-file-upload__progress",
        role: "progressbar",
        "aria-valuenow": e.progress,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        s("div", {
          class: "dads-file-upload__progress-bar",
          style: Le({ width: `${e.progress}%` })
        }, null, 4)
      ], 8, qt)) : v("", !0),
      I.value ? (t(), l("div", Rt, [
        p.value && y.value ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-file-upload__error",
          role: "alert"
        }, _(y.value), 9, Nt)) : e.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-file-upload__hint"
        }, _(e.hint), 9, Pt)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), Gr = /* @__PURE__ */ N(Ht, [["__scopeId", "data-v-78aada56"]]), Ot = {
  key: 0,
  class: "dads-chip__prepend",
  "aria-hidden": "true"
}, Kt = { class: "dads-chip__label" }, jt = {
  key: 1,
  class: "dads-chip__append",
  "aria-hidden": "true"
}, Ut = ["aria-label", "disabled"], Zt = /* @__PURE__ */ R({
  __name: "DadsChip",
  props: {
    size: { default: "md" },
    color: { default: "primary" },
    closable: { type: Boolean, default: !1 },
    clickable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    closeLabel: { default: "削除" },
    ariaLabel: {}
  },
  emits: ["click", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => [
      "dads-chip",
      `dads-chip--${a.size}`,
      `dads-chip--${a.color}`,
      {
        "dads-chip--clickable": a.clickable
      }
    ]), m = d(() => !a.clickable && a.disabled ? "true" : void 0), b = (i) => {
      !a.clickable || a.disabled || r("click", i);
    }, c = (i) => {
      !a.clickable || a.disabled || (i.key === "Enter" || i.key === " ") && (i.preventDefault(), r("click", i));
    }, n = (i) => {
      a.disabled || r("close", i);
    };
    return (i, o) => (t(), ae(ue(e.clickable ? "button" : "span"), {
      type: e.clickable ? "button" : void 0,
      class: w(h.value),
      role: e.clickable ? "button" : void 0,
      tabindex: e.clickable && !e.disabled ? 0 : void 0,
      disabled: e.clickable && e.disabled || void 0,
      "aria-disabled": m.value,
      "aria-label": e.ariaLabel,
      onClick: b,
      onKeydown: c
    }, {
      default: se(() => [
        i.$slots.prepend ? (t(), l("span", Ot, [
          j(i.$slots, "prepend", {}, void 0, !0)
        ])) : v("", !0),
        s("span", Kt, [
          j(i.$slots, "default", {}, void 0, !0)
        ]),
        i.$slots.append && !e.closable ? (t(), l("span", jt, [
          j(i.$slots, "append", {}, void 0, !0)
        ])) : v("", !0),
        e.closable ? (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-chip__close",
          "aria-label": e.closeLabel,
          disabled: e.disabled,
          onClick: we(n, ["stop"])
        }, [...o[0] || (o[0] = [
          s("i", {
            class: "mdi mdi-close",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, Ut)) : v("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "role", "tabindex", "disabled", "aria-disabled", "aria-label"]));
  }
}), Yt = /* @__PURE__ */ N(Zt, [["__scopeId", "data-v-19bf65af"]]), Gt = ["for"], Wt = {
  key: 0,
  class: "dads-combobox__required",
  "aria-hidden": "true"
}, Qt = {
  key: 0,
  class: "dads-combobox__chip-list"
}, Jt = ["id", "name", "value", "placeholder", "disabled", "readonly", "aria-invalid", "aria-required", "aria-describedby", "aria-expanded", "aria-controls", "aria-activedescendant"], Xt = ["id", "aria-multiselectable"], el = ["id", "aria-selected", "aria-disabled", "onMousedown", "onMouseenter"], al = {
  key: 1,
  class: "dads-combobox__footer"
}, tl = ["id"], ll = ["id"], sl = /* @__PURE__ */ R({
  __name: "DadsCombobox",
  props: {
    modelValue: {},
    items: { default: () => [] },
    itemValue: { default: "value" },
    itemTitle: { default: "title" },
    multiple: { type: Boolean, default: !1 },
    filter: {},
    placeholder: {},
    id: {},
    name: {},
    size: { default: "md" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => a.id ?? `dads-combobox-${h}`), b = d(() => `${m.value}-listbox`), c = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), i = (D) => `${m.value}-option-${D}`, o = d(() => a.error || !!a.errorMessage), y = P(null), p = P(null), u = P(!1), f = P(-1), $ = P(""), k = (D) => D[a.itemValue], L = (D) => String(D[a.itemTitle] ?? ""), I = (D, S) => S ? L(D).toLowerCase().includes(S.toLowerCase()) : !0, x = d(() => {
      const D = a.filter ?? I;
      return a.items.filter((S) => D(S, $.value));
    }), C = () => Array.isArray(a.modelValue) ? a.modelValue : [], B = d(() => a.multiple ? C() : []), q = d(() => a.multiple || a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? null : a.items.find((D) => k(D) === a.modelValue) ?? null), te = (D) => {
      const S = a.items.find((Y) => k(Y) === D);
      return S ? L(S) : String(D);
    }, G = d(
      () => u.value && f.value >= 0 ? i(f.value) : void 0
    ), E = d(() => {
      const D = [];
      return o.value && a.errorMessage ? D.push(n.value) : a.hint && D.push(c.value), D.length > 0 ? D.join(" ") : void 0;
    }), W = d(() => o.value && !!a.errorMessage || !!a.hint), X = d(() => [
      "dads-combobox",
      `dads-combobox--${a.size}`,
      {
        "dads-combobox--disabled": a.disabled,
        "dads-combobox--readonly": a.readonly,
        "dads-combobox--error": o.value,
        "dads-combobox--open": u.value,
        "dads-combobox--multiple": a.multiple
      }
    ]);
    re(
      () => [a.modelValue, a.items, a.multiple],
      () => {
        a.multiple || (q.value ? $.value = L(q.value) : a.modelValue === null || a.modelValue === void 0 ? $.value = "" : $.value = String(a.modelValue));
      },
      { immediate: !0 }
    );
    const de = () => x.value.findIndex((D) => !D.disabled), Z = () => {
      a.disabled || a.readonly || u.value || (u.value = !0, x.value.length === 0 ? f.value = -1 : f.value = de());
    }, M = () => {
      u.value && (u.value = !1, f.value = -1);
    }, K = (D) => {
      r("update:modelValue", D), r("change", D);
    }, A = (D) => {
      const S = x.value;
      if (S.length === 0) {
        f.value = -1;
        return;
      }
      let ie = f.value < 0 ? D === 1 ? -1 : 0 : f.value;
      for (let ce = 0; ce < S.length; ce++)
        if (ie = (ie + D + S.length) % S.length, !S[ie].disabled) {
          f.value = ie;
          return;
        }
    }, F = (D) => {
      const S = D.trim();
      if (!S) return;
      const Y = a.items.find(
        (ce) => String(k(ce)) === S || L(ce) === S
      );
      if (Y && Y.disabled) return;
      const ie = Y ? k(Y) : S;
      if (a.multiple) {
        const ce = C();
        ce.some((Ee) => Ee === ie) || K([...ce, ie]), $.value = "", f.value = x.value.length > 0 ? de() : -1;
      } else
        K(ie), $.value = Y ? L(Y) : String(ie), M();
    }, O = (D) => {
      a.multiple && K(C().filter((S) => S !== D));
    }, J = (D) => {
      const S = D.target;
      $.value = S.value, u.value || (u.value = !0), f.value = x.value.length > 0 ? de() : -1;
    }, fe = (D) => {
      if (a.disabled || a.readonly) return;
      const { key: S } = D;
      switch (S) {
        case "ArrowDown":
          D.preventDefault(), u.value ? A(1) : Z();
          break;
        case "ArrowUp":
          D.preventDefault(), u.value ? A(-1) : Z();
          break;
        case "Enter": {
          D.preventDefault();
          const Y = x.value;
          u.value && f.value >= 0 && Y[f.value] ? F(String(k(Y[f.value]))) : $.value.trim() && F($.value);
          break;
        }
        case "Escape":
          u.value && (D.preventDefault(), M());
          break;
        case "Tab":
          M();
          break;
        case "Backspace": {
          if (!a.multiple || $.value !== "") break;
          const Y = C();
          Y.length > 0 && K(Y.slice(0, -1));
          break;
        }
      }
    }, Me = (D) => {
      !a.disabled && !a.readonly && Z(), r("focus", D);
    }, De = (D) => {
      r("blur", D);
    }, ge = (D) => {
      const S = D.target;
      S && S === y.value || S?.closest(".dads-chip__close") || (D.preventDefault(), y.value?.focus());
    }, pe = (D, S) => {
      D.preventDefault(), !S.disabled && F(String(k(S)));
    }, z = (D) => {
      if (!u.value) return;
      const S = D.target;
      S && p.value && p.value.contains(S) || M();
    };
    return ve(() => {
      document.addEventListener("pointerdown", z, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", z, !0);
    }), re(
      () => a.disabled,
      (D) => {
        D && M();
      }
    ), (D, S) => (t(), l("div", {
      ref_key: "rootRef",
      ref: p,
      class: w(X.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-combobox__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", Wt, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, Gt)) : v("", !0),
      s("div", {
        class: "dads-combobox__control",
        onMousedown: ge
      }, [
        e.multiple && B.value.length > 0 ? (t(), l("ul", Qt, [
          (t(!0), l(H, null, U(B.value, (Y) => (t(), l("li", {
            key: String(Y),
            class: "dads-combobox__chip-item"
          }, [
            Ie(Yt, {
              size: "sm",
              closable: !e.disabled && !e.readonly,
              disabled: e.disabled,
              onClose: (ie) => O(Y)
            }, {
              default: se(() => [
                Q(_(te(Y)), 1)
              ]),
              _: 2
            }, 1032, ["closable", "disabled", "onClose"])
          ]))), 128))
        ])) : v("", !0),
        s("input", {
          id: m.value,
          ref_key: "inputRef",
          ref: y,
          class: "dads-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          name: e.name,
          value: $.value,
          placeholder: e.multiple && B.value.length > 0 ? "" : e.placeholder,
          disabled: e.disabled || void 0,
          readonly: e.readonly || void 0,
          "aria-invalid": o.value || void 0,
          "aria-required": e.required || void 0,
          "aria-describedby": E.value,
          "aria-expanded": u.value,
          "aria-controls": b.value,
          "aria-activedescendant": G.value,
          "aria-autocomplete": "list",
          onInput: J,
          onKeydown: fe,
          onFocus: Me,
          onBlur: De
        }, null, 40, Jt)
      ], 32),
      ye(s("ul", {
        id: b.value,
        class: "dads-combobox__suggestions",
        role: "listbox",
        "aria-multiselectable": e.multiple || void 0
      }, [
        (t(!0), l(H, null, U(x.value, (Y, ie) => (t(), l("li", {
          id: i(ie),
          key: String(k(Y)),
          role: "option",
          "aria-selected": ie === f.value,
          "aria-disabled": Y.disabled || void 0,
          class: w([
            "dads-combobox__suggestion",
            {
              "dads-combobox__suggestion--active": ie === f.value,
              "dads-combobox__suggestion--disabled": Y.disabled
            }
          ]),
          onMousedown: (ce) => pe(ce, Y),
          onMouseenter: (ce) => !Y.disabled && (f.value = ie)
        }, _(L(Y)), 43, el))), 128))
      ], 8, Xt), [
        [ke, u.value && x.value.length > 0]
      ]),
      W.value ? (t(), l("div", al, [
        o.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-combobox__error",
          role: "alert"
        }, _(e.errorMessage), 9, tl)) : e.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-combobox__hint"
        }, _(e.hint), 9, ll)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), Wr = /* @__PURE__ */ N(sl, [["__scopeId", "data-v-fc794643"]]), dl = { class: "dads-header-container__inner" }, il = ["aria-label"], ol = {
  key: 1,
  class: "dads-header-container__logo"
}, nl = ["aria-label"], rl = {
  key: 3,
  class: "dads-header-container__utility"
}, ul = {
  key: 4,
  class: "dads-header-container__actions"
}, cl = /* @__PURE__ */ R({
  __name: "DadsHeaderContainer",
  props: {
    sticky: { type: Boolean, default: !0 },
    showMenuToggle: { type: Boolean, default: !0 },
    menuToggleLabel: { default: "メニューを開く" },
    navAriaLabel: { default: "メインナビゲーション" },
    variant: { default: "wide-full" },
    logoLabel: {},
    logoHref: {}
  },
  emits: ["click:menu"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = Te(), m = d(() => [
      "dads-header-container",
      `dads-header-container--${a.variant}`,
      { "dads-header-container--sticky": a.sticky }
    ]), b = d(() => !!h.logo || !!a.logoLabel), c = (n) => r("click:menu", n);
    return (n, i) => (t(), l("header", {
      class: w(m.value)
    }, [
      s("div", dl, [
        e.showMenuToggle ? (t(), l("button", {
          key: 0,
          type: "button",
          class: "dads-header-container__menu-toggle",
          "aria-label": e.menuToggleLabel,
          onClick: c
        }, [...i[0] || (i[0] = [
          s("i", {
            class: "mdi mdi-menu",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, il)) : v("", !0),
        b.value ? (t(), l("div", ol, [
          j(n.$slots, "logo", {}, () => [
            (t(), ae(ue(e.logoHref ? "a" : "strong"), {
              href: e.logoHref,
              class: "dads-header-container__logo-text"
            }, {
              default: se(() => [
                Q(_(e.logoLabel), 1)
              ]),
              _: 1
            }, 8, ["href"]))
          ], !0)
        ])) : v("", !0),
        n.$slots.nav ? (t(), l("nav", {
          key: 2,
          class: "dads-header-container__nav",
          "aria-label": e.navAriaLabel
        }, [
          j(n.$slots, "nav", {}, void 0, !0)
        ], 8, nl)) : v("", !0),
        n.$slots.utility ? (t(), l("div", rl, [
          j(n.$slots, "utility", {}, void 0, !0)
        ])) : v("", !0),
        n.$slots.actions ? (t(), l("div", ul, [
          j(n.$slots, "actions", {}, void 0, !0)
        ])) : v("", !0)
      ])
    ], 2));
  }
}), Qr = /* @__PURE__ */ N(cl, [["__scopeId", "data-v-9f2f95af"]]), bl = {
  key: 0,
  class: "dads-drawer__item-details"
}, vl = { class: "dads-drawer__item-button" }, fl = { class: "dads-drawer__item-label" }, hl = { class: "dads-drawer__item-children" }, ml = ["href", "aria-disabled", "tabindex"], _l = { class: "dads-drawer__item-label" }, gl = ["disabled"], pl = { class: "dads-drawer__item-label" }, yl = /* @__PURE__ */ R({
  __name: "DadsDrawerItem",
  props: {
    item: {}
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(
      () => Array.isArray(a.item.children) && a.item.children.length > 0
    ), m = d(() => !h.value && !!a.item.href), b = d(() => [
      "dads-drawer__item",
      {
        "dads-drawer__item--with-children": h.value,
        "dads-drawer__item--disabled": a.item.disabled
      }
    ]), c = (i) => {
      if (a.item.disabled) {
        i.preventDefault();
        return;
      }
      r("click:item", a.item, i);
    }, n = (i, o) => {
      r("click:item", i, o);
    };
    return (i, o) => {
      const y = Ke("DadsDrawerItem", !0);
      return t(), l("li", {
        class: w(b.value)
      }, [
        h.value ? (t(), l("details", bl, [
          s("summary", vl, [
            e.item.icon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", e.item.icon, "dads-drawer__item-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0),
            s("span", fl, _(e.item.label), 1),
            o[0] || (o[0] = s("i", {
              class: "mdi mdi-chevron-down dads-drawer__item-chevron",
              "aria-hidden": "true"
            }, null, -1))
          ]),
          s("ul", hl, [
            (t(!0), l(H, null, U(e.item.children, (p, u) => (t(), ae(y, {
              key: u,
              item: p,
              "onClick:item": n
            }, null, 8, ["item"]))), 128))
          ])
        ])) : m.value ? (t(), l("a", {
          key: 1,
          href: e.item.disabled ? void 0 : e.item.href,
          class: "dads-drawer__item-button",
          "aria-disabled": e.item.disabled || void 0,
          tabindex: e.item.disabled ? -1 : void 0,
          onClick: c
        }, [
          e.item.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", e.item.icon, "dads-drawer__item-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : v("", !0),
          s("span", _l, _(e.item.label), 1)
        ], 8, ml)) : (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-drawer__item-button",
          disabled: e.item.disabled,
          onClick: c
        }, [
          e.item.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", e.item.icon, "dads-drawer__item-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : v("", !0),
          s("span", pl, _(e.item.label), 1)
        ], 8, gl))
      ], 2);
    };
  }
}), kl = ["aria-label"], $l = { class: "dads-drawer__header" }, xl = {
  key: 0,
  class: "dads-drawer__title"
}, wl = ["aria-label"], Ll = ["aria-label"], Il = { class: "dads-drawer__list" }, Cl = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', Dl = /* @__PURE__ */ R({
  __name: "DadsDrawer",
  props: {
    modelValue: { type: Boolean, default: !1 },
    items: {},
    title: {},
    closeLabel: { default: "閉じる" },
    defaultAriaLabel: { default: "ナビゲーション" },
    navAriaLabel: { default: "ドロワーナビゲーション" },
    placement: { default: "left" }
  },
  emits: ["update:modelValue", "click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null);
    let m = null;
    const b = () => {
      r("update:modelValue", !1);
    }, c = (o, y) => {
      r("click:item", o, y), o.onClick && o.onClick(y), o.children || b();
    }, n = () => h.value ? Array.from(h.value.querySelectorAll(Cl)) : [], i = (o) => {
      const y = n();
      if (y.length === 0) return;
      const p = y[0], u = y[y.length - 1], f = document.activeElement;
      o.shiftKey ? (f === p || f === h.value) && (o.preventDefault(), u.focus()) : f === u && (o.preventDefault(), p.focus());
    };
    return re(
      () => a.modelValue,
      async (o) => {
        o ? (m = document.activeElement, await Ce(), h.value?.focus()) : m && (m.focus(), m = null);
      }
    ), (o, y) => (t(), ae(Fe, { to: "body" }, [
      Ie(Ae, {
        name: `dads-drawer-${e.placement}`
      }, {
        default: se(() => [
          e.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-drawer", `dads-drawer--${e.placement}`]),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": e.title || e.defaultAriaLabel,
            onKeydown: [
              Be(b, ["esc"]),
              Be(i, ["tab"])
            ]
          }, [
            s("div", {
              class: "dads-drawer__overlay",
              "aria-hidden": "true",
              onClick: b
            }),
            s("aside", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-drawer__panel",
              tabindex: "-1"
            }, [
              s("header", $l, [
                e.title ? (t(), l("h2", xl, _(e.title), 1)) : v("", !0),
                s("button", {
                  type: "button",
                  class: "dads-drawer__close",
                  "aria-label": e.closeLabel,
                  onClick: b
                }, [...y[0] || (y[0] = [
                  s("i", {
                    class: "mdi mdi-close",
                    "aria-hidden": "true"
                  }, null, -1)
                ])], 8, wl)
              ]),
              s("nav", {
                class: "dads-drawer__nav",
                "aria-label": e.navAriaLabel
              }, [
                s("ul", Il, [
                  (t(!0), l(H, null, U(e.items, (p, u) => (t(), ae(yl, {
                    key: u,
                    item: p,
                    "onClick:item": c
                  }, null, 8, ["item"]))), 128))
                ])
              ], 8, Ll)
            ], 512)
          ], 42, kl)) : v("", !0)
        ]),
        _: 1
      }, 8, ["name"])
    ]));
  }
}), Jr = /* @__PURE__ */ N(Dl, [["__scopeId", "data-v-04f146d2"]]), Bl = ["aria-label"], Vl = { class: "dads-breadcrumb__list" }, Al = ["href", "onClick"], Ml = ["aria-current", "aria-disabled"], Sl = {
  key: 2,
  class: "dads-breadcrumb__separator",
  "aria-hidden": "true"
}, zl = /* @__PURE__ */ R({
  __name: "DadsBreadcrumb",
  props: {
    items: {},
    separator: { default: "》" },
    ariaLabel: { default: "パンくずリスト" }
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(
      () => a.items.map((b, c) => {
        const n = c === a.items.length - 1, i = !n && !!b.disabled, o = !n && !!b.href && !b.disabled;
        return { item: b, index: c, isLast: n, isDisabled: i, isLink: o };
      })
    ), m = (b, c, n) => {
      r("click:item", b, c, n);
    };
    return (b, c) => (t(), l("nav", {
      class: "dads-breadcrumb",
      "aria-label": e.ariaLabel
    }, [
      s("ol", Vl, [
        (t(!0), l(H, null, U(h.value, (n) => (t(), l("li", {
          key: n.index,
          class: "dads-breadcrumb__item"
        }, [
          n.isLink ? (t(), l("a", {
            key: 0,
            href: n.item.href,
            class: "dads-breadcrumb__link",
            onClick: (i) => m(n.item, n.index, i)
          }, _(n.item.title), 9, Al)) : (t(), l("span", {
            key: 1,
            class: w([
              "dads-breadcrumb__current",
              { "dads-breadcrumb__current--disabled": n.isDisabled }
            ]),
            "aria-current": n.isLast ? "page" : void 0,
            "aria-disabled": n.isDisabled ? "true" : void 0
          }, _(n.item.title), 11, Ml)),
          n.isLast ? v("", !0) : (t(), l("span", Sl, _(e.separator), 1))
        ]))), 128))
      ])
    ], 8, Bl));
  }
}), Xr = /* @__PURE__ */ N(zl, [["__scopeId", "data-v-99f8e0f7"]]), Tl = ["aria-label"], Fl = { class: "dads-step-navigation__list" }, El = ["aria-current"], ql = {
  class: "dads-step-navigation__indicator",
  "aria-hidden": "true"
}, Rl = {
  key: 0,
  class: "mdi mdi-check"
}, Nl = {
  key: 1,
  class: "mdi mdi-close"
}, Pl = { key: 2 }, Hl = { class: "dads-step-navigation__title" }, Ol = {
  key: 0,
  class: "dads-step-navigation__connector",
  "aria-hidden": "true"
}, Kl = /* @__PURE__ */ R({
  __name: "DadsStepNavigation",
  props: {
    steps: {},
    orientation: { default: "horizontal" },
    clickable: { type: Boolean, default: !0 },
    ariaLabel: { default: "ステップ" }
  },
  emits: ["click:step"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => [
      "dads-step-navigation",
      `dads-step-navigation--${a.orientation}`
    ]), m = (n) => n.status ?? "pending", b = (n) => [
      `dads-step-navigation__item--${m(n)}`
    ], c = (n, i, o) => {
      r("click:step", n, i, o);
    };
    return (n, i) => (t(), l("nav", {
      class: w(h.value),
      "aria-label": e.ariaLabel
    }, [
      s("ol", Fl, [
        (t(!0), l(H, null, U(e.steps, (o, y) => (t(), l("li", {
          key: y,
          class: w(["dads-step-navigation__item", b(o)]),
          "aria-current": m(o) === "current" ? "step" : void 0
        }, [
          (t(), ae(ue(e.clickable ? "button" : "div"), {
            type: e.clickable ? "button" : void 0,
            class: w(e.clickable ? "dads-step-navigation__button" : "dads-step-navigation__static"),
            onClick: (p) => e.clickable ? c(o, y, p) : void 0
          }, {
            default: se(() => [
              s("span", ql, [
                m(o) === "done" ? (t(), l("i", Rl)) : m(o) === "error" ? (t(), l("i", Nl)) : (t(), l("span", Pl, _(y + 1), 1))
              ]),
              s("span", Hl, _(o.title), 1)
            ]),
            _: 2
          }, 1032, ["type", "class", "onClick"])),
          y < e.steps.length - 1 ? (t(), l("span", Ol)) : v("", !0)
        ], 10, El))), 128))
      ])
    ], 10, Tl));
  }
}), eu = /* @__PURE__ */ N(Kl, [["__scopeId", "data-v-d096fd65"]]), jl = ["aria-label", "aria-orientation"], Ul = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], Zl = { class: "dads-tab__label" }, Yl = { class: "dads-tab__panels" }, Gl = ["id", "aria-labelledby", "hidden"], Wl = /* @__PURE__ */ R({
  __name: "DadsTab",
  props: {
    modelValue: {},
    items: {},
    orientation: { default: "horizontal" },
    keepAlive: { type: Boolean, default: !1 },
    ariaLabel: { default: "タブ" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-tab-${h}`), b = P([]), c = (f) => f.value === a.modelValue, n = (f) => {
      f.disabled || c(f) || (r("update:modelValue", f.value), r("change", f.value));
    }, i = (f) => {
      Ce(() => {
        b.value[f]?.focus();
      });
    }, o = (f) => {
      const $ = a.items.map((G, E) => G.disabled ? -1 : E).filter((G) => G >= 0);
      if ($.length === 0) return;
      const k = a.items.findIndex((G) => G.value === a.modelValue), L = $.indexOf(k), I = L === -1 ? 0 : L, x = $.length - 1;
      let C = null;
      const B = a.orientation === "vertical" ? "ArrowDown" : "ArrowRight", q = a.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      switch (f.key) {
        case B:
          C = $[(I + 1) % $.length];
          break;
        case q:
          C = $[(I - 1 + $.length) % $.length];
          break;
        case "Home":
          C = $[0];
          break;
        case "End":
          C = $[x];
          break;
        case "Enter":
        case " ":
          return;
        default:
          return;
      }
      if (C === k) return;
      f.preventDefault();
      const te = a.items[C];
      r("update:modelValue", te.value), r("change", te.value), i(C);
    }, y = (f) => [
      "dads-tab__tab",
      {
        "dads-tab__tab--active": c(f),
        "dads-tab__tab--disabled": f.disabled
      }
    ], p = (f) => `${m.value}-tab-${f}`, u = (f) => `${m.value}-panel-${f}`;
    return (f, $) => (t(), l("div", {
      class: w(["dads-tab", `dads-tab--${e.orientation}`])
    }, [
      s("div", {
        role: "tablist",
        class: "dads-tab__list",
        "aria-label": e.ariaLabel,
        "aria-orientation": e.orientation,
        onKeydown: o
      }, [
        (t(!0), l(H, null, U(e.items, (k) => (t(), l("button", {
          id: p(k.value),
          key: String(k.value),
          ref_for: !0,
          ref_key: "tabRefs",
          ref: b,
          type: "button",
          role: "tab",
          "aria-selected": c(k),
          "aria-controls": u(k.value),
          tabindex: c(k) ? 0 : -1,
          disabled: k.disabled || void 0,
          class: w(y(k)),
          onClick: (L) => n(k)
        }, [
          k.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", k.icon, "dads-tab__icon"]),
            "aria-hidden": "true"
          }, null, 2)) : v("", !0),
          s("span", Zl, _(k.label), 1)
        ], 10, Ul))), 128))
      ], 40, jl),
      s("div", Yl, [
        (t(!0), l(H, null, U(e.items, (k) => ye((t(), l("div", {
          id: u(k.value),
          key: String(k.value),
          role: "tabpanel",
          "aria-labelledby": p(k.value),
          hidden: !e.keepAlive && !c(k) ? !0 : void 0,
          class: "dads-tab__panel",
          tabindex: 0
        }, [
          e.keepAlive || c(k) ? j(f.$slots, `panel-${k.value}`, { key: 0 }, void 0, !0) : v("", !0)
        ], 8, Gl)), [
          [ke, c(k)]
        ])), 128))
      ])
    ], 2));
  }
}), au = /* @__PURE__ */ N(Wl, [["__scopeId", "data-v-4689cd84"]]), Ql = ["role", "aria-live"], Jl = {
  class: "dads-notification-banner__icon",
  "aria-hidden": "true"
}, Xl = { class: "dads-notification-banner__content" }, es = {
  key: 0,
  class: "dads-notification-banner__title"
}, as = {
  key: 1,
  class: "dads-notification-banner__message"
}, ts = {
  key: 2,
  class: "dads-notification-banner__timestamp"
}, ls = ["datetime"], ss = {
  key: 0,
  class: "dads-notification-banner__action"
}, ds = ["aria-label"], is = /* @__PURE__ */ R({
  __name: "DadsNotificationBanner",
  props: {
    modelValue: { type: Boolean, default: !0 },
    color: { default: "info" },
    style: { default: "standard" },
    title: {},
    message: {},
    closable: { type: Boolean, default: !0 },
    closeLabel: { default: "閉じる" },
    timestamp: {},
    persistKey: {}
  },
  emits: ["update:modelValue", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = {
      success: "mdi-check-circle",
      error: "mdi-alert-circle",
      warning: "mdi-alert",
      info: "mdi-information",
      neutral: "mdi-bell"
    }, m = d(() => h[a.color]), b = d(() => [
      "dads-notification-banner",
      `dads-notification-banner--${a.color}`,
      `dads-notification-banner--style-${a.style}`
    ]), c = d(
      () => a.color === "error" || a.color === "warning" ? "alert" : "status"
    ), n = d(() => a.color === "error" ? "assertive" : "polite"), i = d(() => a.timestamp === void 0 ? null : a.timestamp instanceof Date ? {
      iso: a.timestamp.toISOString(),
      display: a.timestamp.toLocaleString()
    } : { iso: a.timestamp, display: a.timestamp });
    ve(() => {
      if (a.persistKey && !(typeof window > "u"))
        try {
          window.localStorage.getItem(a.persistKey) === "closed" && r("update:modelValue", !1);
        } catch {
        }
    });
    const o = () => {
      if (r("update:modelValue", !1), r("close"), a.persistKey && typeof window < "u")
        try {
          window.localStorage.setItem(a.persistKey, "closed");
        } catch {
        }
    };
    return (y, p) => (t(), ae(Ae, { name: "dads-notification-banner" }, {
      default: se(() => [
        e.modelValue ? (t(), l("div", {
          key: 0,
          class: w(b.value),
          role: c.value,
          "aria-live": n.value
        }, [
          s("span", Jl, [
            j(y.$slots, "icon", {}, () => [
              s("i", {
                class: w(["mdi", m.value])
              }, null, 2)
            ], !0)
          ]),
          s("div", Xl, [
            e.title ? (t(), l("p", es, _(e.title), 1)) : v("", !0),
            e.message || y.$slots.default ? (t(), l("p", as, [
              j(y.$slots, "default", {}, () => [
                Q(_(e.message), 1)
              ], !0)
            ])) : v("", !0),
            i.value ? (t(), l("p", ts, [
              s("time", {
                datetime: i.value.iso
              }, _(i.value.display), 9, ls)
            ])) : v("", !0)
          ]),
          y.$slots.action ? (t(), l("div", ss, [
            j(y.$slots, "action", {}, void 0, !0)
          ])) : v("", !0),
          e.closable ? (t(), l("button", {
            key: 1,
            type: "button",
            class: "dads-notification-banner__close",
            "aria-label": e.closeLabel,
            onClick: o
          }, [...p[0] || (p[0] = [
            s("i", {
              class: "mdi mdi-close",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, ds)) : v("", !0)
        ], 10, Ql)) : v("", !0)
      ]),
      _: 3
    }));
  }
}), tu = /* @__PURE__ */ N(is, [["__scopeId", "data-v-cae094ba"]]), os = ["aria-modal", "aria-labelledby"], ns = {
  key: 0,
  class: "dads-dialog__header"
}, rs = ["id"], us = ["aria-label"], cs = { class: "dads-dialog__body" }, bs = {
  key: 1,
  class: "dads-dialog__footer"
}, vs = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', fs = /* @__PURE__ */ R({
  __name: "DadsDialog",
  props: {
    modelValue: { type: Boolean, default: !1 },
    size: { default: "md" },
    variant: { default: "modal" },
    title: {},
    persistent: { type: Boolean, default: !1 },
    closable: { type: Boolean, default: !0 },
    closeLabel: { default: "閉じる" },
    initialFocus: {},
    returnFocusTo: {}
  },
  emits: ["update:modelValue", "close", "open"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null), m = d(() => a.variant === "modal");
    let b = null;
    const c = le(), n = () => {
      r("update:modelValue", !1), r("close");
    }, i = () => {
      a.persistent || n();
    }, o = () => {
      m.value && (a.persistent || n());
    }, y = () => h.value ? Array.from(h.value.querySelectorAll(vs)) : [], p = (f) => f ? typeof f == "string" ? document.querySelector(f) : f : null, u = (f) => {
      if (!m.value || f.key !== "Tab") return;
      const $ = y();
      if ($.length === 0) {
        f.preventDefault(), h.value?.focus();
        return;
      }
      const k = $[0], L = $[$.length - 1], I = document.activeElement;
      f.shiftKey ? (I === k || I === h.value) && (f.preventDefault(), L.focus()) : I === L && (f.preventDefault(), k.focus());
    };
    return re(
      () => a.modelValue,
      async (f) => {
        if (f)
          b = document.activeElement, await Ce(), (p(a.initialFocus) ?? h.value)?.focus(), r("open");
        else {
          const $ = p(a.returnFocusTo);
          $ ? $.focus() : b && b.focus(), b = null;
        }
      }
    ), (f, $) => (t(), ae(Fe, { to: "body" }, [
      Ie(Ae, { name: "dads-dialog" }, {
        default: se(() => [
          e.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-dialog", [`dads-dialog--${e.size}`, `dads-dialog--${e.variant}`]]),
            role: "dialog",
            "aria-modal": m.value ? "true" : void 0,
            "aria-labelledby": e.title ? Ve(c) : void 0,
            onKeydown: [
              Be(i, ["esc"]),
              u
            ]
          }, [
            m.value ? (t(), l("div", {
              key: 0,
              class: "dads-dialog__overlay",
              "aria-hidden": "true",
              onClick: o
            })) : v("", !0),
            s("div", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-dialog__panel",
              tabindex: "-1"
            }, [
              e.title || f.$slots.header || e.closable ? (t(), l("header", ns, [
                j(f.$slots, "header", {}, () => [
                  e.title ? (t(), l("h2", {
                    key: 0,
                    id: Ve(c),
                    class: "dads-dialog__title"
                  }, _(e.title), 9, rs)) : v("", !0)
                ], !0),
                e.closable ? (t(), l("button", {
                  key: 0,
                  type: "button",
                  class: "dads-dialog__close",
                  "aria-label": e.closeLabel,
                  onClick: n
                }, [...$[0] || ($[0] = [
                  s("i", {
                    class: "mdi mdi-close",
                    "aria-hidden": "true"
                  }, null, -1)
                ])], 8, us)) : v("", !0)
              ])) : v("", !0),
              s("div", cs, [
                j(f.$slots, "default", {}, void 0, !0)
              ]),
              f.$slots.footer ? (t(), l("footer", bs, [
                j(f.$slots, "footer", {}, void 0, !0)
              ])) : v("", !0)
            ], 512)
          ], 42, os)) : v("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), lu = /* @__PURE__ */ N(fs, [["__scopeId", "data-v-a08c675d"]]), hs = ["aria-describedby"], ms = ["id"], _s = { class: "dads-tooltip__content" }, xe = 8, gs = /* @__PURE__ */ R({
  __name: "DadsTooltip",
  props: {
    text: {},
    position: { default: "top" },
    openDelay: { default: 0 },
    closeDelay: { default: 0 },
    disabled: { type: Boolean, default: !1 },
    id: {}
  },
  setup(e) {
    const g = e, a = le(), r = d(() => g.id ?? `dads-tooltip-${a}`), h = P(null), m = P(null), b = P(!1), c = P({});
    let n = null, i = null;
    const o = () => {
      n !== null && (clearTimeout(n), n = null), i !== null && (clearTimeout(i), i = null);
    }, y = () => {
      g.disabled || (b.value = !0);
    }, p = () => {
      b.value = !1;
    }, u = () => {
      g.disabled || (i !== null && (clearTimeout(i), i = null), !b.value && (g.openDelay > 0 ? n = setTimeout(() => {
        n = null, y();
      }, g.openDelay) : y()));
    }, f = () => {
      n !== null && (clearTimeout(n), n = null), b.value && (g.closeDelay > 0 ? i = setTimeout(() => {
        i = null, p();
      }, g.closeDelay) : p());
    }, $ = () => {
      const I = h.value, x = m.value;
      if (!I || !x) return;
      const C = I.getBoundingClientRect(), B = x.getBoundingClientRect(), q = window.scrollX, te = window.scrollY;
      let G = 0, E = 0;
      switch (g.position) {
        case "top":
          G = C.top - B.height - xe, E = C.left + C.width / 2 - B.width / 2;
          break;
        case "top-start":
          G = C.top - B.height - xe, E = C.left;
          break;
        case "top-end":
          G = C.top - B.height - xe, E = C.right - B.width;
          break;
        case "bottom":
          G = C.bottom + xe, E = C.left + C.width / 2 - B.width / 2;
          break;
        case "bottom-start":
          G = C.bottom + xe, E = C.left;
          break;
        case "bottom-end":
          G = C.bottom + xe, E = C.right - B.width;
          break;
        case "left":
          G = C.top + C.height / 2 - B.height / 2, E = C.left - B.width - xe;
          break;
        case "right":
          G = C.top + C.height / 2 - B.height / 2, E = C.right + xe;
          break;
      }
      c.value = {
        top: `${G + te}px`,
        left: `${E + q}px`
      };
    };
    re(b, async (I) => {
      I && (await Ce(), $());
    });
    const k = d(() => [`dads-tooltip--${g.position}`]), L = d(() => b.value && !g.disabled ? r.value : void 0);
    return _e(() => {
      o();
    }), (I, x) => (t(), l("span", {
      ref_key: "wrapRef",
      ref: h,
      class: "dads-tooltip__trigger-wrap",
      "aria-describedby": L.value,
      onMouseenter: u,
      onMouseleave: f,
      onFocusin: u,
      onFocusout: f
    }, [
      j(I.$slots, "trigger", {}, void 0, !0),
      (t(), ae(Fe, { to: "body" }, [
        Ie(Ae, { name: "dads-tooltip" }, {
          default: se(() => [
            b.value && !e.disabled ? (t(), l("div", {
              key: 0,
              id: r.value,
              ref_key: "tipRef",
              ref: m,
              class: w(["dads-tooltip", k.value]),
              role: "tooltip",
              style: Le(c.value)
            }, [
              s("div", _s, [
                j(I.$slots, "default", {}, () => [
                  Q(_(e.text), 1)
                ], !0)
              ]),
              x[0] || (x[0] = s("span", {
                class: "dads-tooltip__arrow",
                "aria-hidden": "true"
              }, null, -1))
            ], 14, ms)) : v("", !0)
          ]),
          _: 3
        })
      ]))
    ], 40, hs));
  }
}), su = /* @__PURE__ */ N(gs, [["__scopeId", "data-v-c8c0469d"]]), ps = ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-label"], ys = {
  key: 0,
  class: "dads-progress-indicator__bar"
}, ks = {
  key: 1,
  class: "dads-progress-indicator__circle-svg",
  viewBox: "0 0 36 36",
  "aria-hidden": "true"
}, $s = ["stroke-dashoffset"], xs = {
  key: 2,
  class: "dads-progress-indicator__label"
}, Oe = 16, ws = /* @__PURE__ */ R({
  __name: "DadsProgressIndicator",
  props: {
    variant: { default: "linear" },
    value: {},
    size: { default: "md" },
    color: { default: "primary" },
    label: {},
    showLabel: { type: Boolean, default: !1 },
    ariaLabel: {}
  },
  setup(e) {
    const g = e, a = 2 * Math.PI * Oe, r = d(() => g.value === void 0), h = d(() => {
      if (g.value !== void 0)
        return Math.max(0, Math.min(100, g.value));
    }), m = d(() => {
      if (h.value !== void 0)
        return a * (1 - h.value / 100);
    }), b = d(() => [
      "dads-progress-indicator",
      `dads-progress-indicator--${g.variant}`,
      `dads-progress-indicator--${g.size}`,
      `dads-progress-indicator--color-${g.color}`,
      {
        "dads-progress-indicator--indeterminate": r.value
      }
    ]), c = d(() => g.label !== void 0 ? g.label : r.value ? "" : `${h.value}%`);
    return (n, i) => (t(), l("div", {
      class: w(b.value),
      role: "progressbar",
      "aria-valuemin": r.value ? void 0 : 0,
      "aria-valuemax": r.value ? void 0 : 100,
      "aria-valuenow": r.value ? void 0 : h.value,
      "aria-label": e.ariaLabel
    }, [
      e.variant === "linear" ? (t(), l("div", ys, [
        s("div", {
          class: "dads-progress-indicator__bar-fill",
          style: Le(r.value ? void 0 : { width: `${h.value}%` })
        }, null, 4)
      ])) : (t(), l("svg", ks, [
        s("circle", {
          class: "dads-progress-indicator__circle-track",
          cx: "18",
          cy: "18",
          r: Oe,
          fill: "none",
          "stroke-width": "3"
        }),
        s("circle", {
          class: "dads-progress-indicator__circle-fill",
          cx: "18",
          cy: "18",
          r: Oe,
          fill: "none",
          "stroke-width": "3",
          "stroke-dasharray": a,
          "stroke-dashoffset": r.value ? void 0 : m.value
        }, null, 8, $s)
      ])),
      e.showLabel && c.value ? (t(), l("span", xs, _(c.value), 1)) : v("", !0)
    ], 10, ps));
  }
}), du = /* @__PURE__ */ N(ws, [["__scopeId", "data-v-c7e52e14"]]), Ls = {
  key: 0,
  class: "dads-card__image"
}, Is = {
  key: 1,
  class: "dads-card__header"
}, Cs = { class: "dads-card__body" }, Ds = {
  key: 2,
  class: "dads-card__sub"
}, Bs = {
  key: 3,
  class: "dads-card__footer"
}, Vs = /* @__PURE__ */ R({
  __name: "DadsCard",
  props: {
    variant: { default: "outlined" },
    elevation: { default: 1 },
    clickable: { type: Boolean, default: !1 },
    ariaLabel: {}
  },
  emits: ["click"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => [
      "dads-card",
      `dads-card--${a.variant}`,
      a.variant === "elevated" && `dads-card--elevation-${a.elevation}`,
      a.clickable && "dads-card--clickable"
    ]), m = (c) => {
      a.clickable && r("click", c);
    }, b = (c) => {
      a.clickable && (c.key === "Enter" || c.key === " " || c.key === "Spacebar") && (c.preventDefault(), m(c));
    };
    return (c, n) => (t(), ae(ue(e.clickable ? "button" : "div"), {
      type: e.clickable ? "button" : void 0,
      class: w(h.value),
      "aria-label": e.clickable ? e.ariaLabel : void 0,
      onClick: m,
      onKeydown: b
    }, {
      default: se(() => [
        c.$slots.image ? (t(), l("div", Ls, [
          j(c.$slots, "image", {}, void 0, !0)
        ])) : v("", !0),
        c.$slots.header ? (t(), l("header", Is, [
          j(c.$slots, "header", {}, void 0, !0)
        ])) : v("", !0),
        s("div", Cs, [
          j(c.$slots, "default", {}, void 0, !0)
        ]),
        c.$slots.sub ? (t(), l("div", Ds, [
          j(c.$slots, "sub", {}, void 0, !0)
        ])) : v("", !0),
        c.$slots.footer ? (t(), l("footer", Bs, [
          j(c.$slots, "footer", {}, void 0, !0)
        ])) : v("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "aria-label"]));
  }
}), iu = /* @__PURE__ */ N(Vs, [["__scopeId", "data-v-14ea26ab"]]), As = {
  key: 0,
  class: "dads-heading__shoulder"
}, Ms = {
  key: 0,
  class: "dads-heading__icon",
  "aria-hidden": "true"
}, Ss = { class: "dads-heading__text" }, zs = {
  key: 1,
  class: "dads-heading__chip"
}, Ts = {
  key: 1,
  class: "dads-heading__subtitle"
}, Fs = /* @__PURE__ */ R({
  __name: "DadsHeading",
  props: {
    as: { default: "h2" },
    level: {},
    size: {},
    shoulder: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const g = e, a = Te(), r = d(() => g.level !== void 0 ? g.level : Number(g.as.charAt(1))), h = d(() => !!g.shoulder || !!a.shoulder), m = d(() => !!g.subtitle || !!a.subtitle), b = d(() => !!a.chip), c = d(() => h.value || m.value ? "hgroup" : "div"), n = d(() => {
      const i = [
        "dads-heading",
        `dads-heading--level-${r.value}`
      ];
      return g.size && i.push(`dads-heading--size-${g.size}`), i;
    });
    return (i, o) => (t(), ae(ue(c.value), {
      class: w(n.value)
    }, {
      default: se(() => [
        h.value ? (t(), l("p", As, [
          j(i.$slots, "shoulder", {}, () => [
            Q(_(e.shoulder), 1)
          ], !0)
        ])) : v("", !0),
        (t(), ae(ue(e.as), { class: "dads-heading__title" }, {
          default: se(() => [
            i.$slots["prepend-icon"] || e.icon ? (t(), l("span", Ms, [
              j(i.$slots, "prepend-icon", {}, () => [
                e.icon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", e.icon])
                }, null, 2)) : v("", !0)
              ], !0)
            ])) : v("", !0),
            s("span", Ss, [
              j(i.$slots, "default", {}, void 0, !0)
            ]),
            b.value ? (t(), l("span", zs, [
              j(i.$slots, "chip", {}, void 0, !0)
            ])) : v("", !0)
          ]),
          _: 3
        })),
        m.value ? (t(), l("p", Ts, [
          j(i.$slots, "subtitle", {}, () => [
            Q(_(e.subtitle), 1)
          ], !0)
        ])) : v("", !0)
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ou = /* @__PURE__ */ N(Fs, [["__scopeId", "data-v-6c1fa5cf"]]), Es = ["aria-orientation", "aria-label"], qs = { class: "dads-divider__label" }, Rs = {
  key: 1,
  class: "dads-divider__line",
  "aria-hidden": "true"
}, Ns = /* @__PURE__ */ R({
  __name: "DadsDivider",
  props: {
    orientation: { default: "horizontal" },
    color: { default: "default" },
    variant: { default: "full-width" },
    thickness: { default: 1 },
    lineStyle: { default: "solid" },
    ariaLabel: {}
  },
  setup(e) {
    const g = e, a = Te(), r = d(() => !!a.default && g.orientation === "horizontal"), h = d(() => [
      `dads-divider--${g.orientation}`,
      `dads-divider--${g.color}`,
      `dads-divider--${g.variant}`,
      `dads-divider--thickness-${g.thickness}`,
      `dads-divider--style-${g.lineStyle}`,
      {
        "dads-divider--with-label": r.value
      }
    ]);
    return (m, b) => (t(), l("div", {
      class: w(["dads-divider", h.value]),
      role: "separator",
      "aria-orientation": e.orientation,
      "aria-label": e.ariaLabel
    }, [
      r.value ? (t(), l(H, { key: 0 }, [
        b[0] || (b[0] = s("span", {
          class: "dads-divider__line",
          "aria-hidden": "true"
        }, null, -1)),
        s("span", qs, [
          j(m.$slots, "default", {}, void 0, !0)
        ]),
        b[1] || (b[1] = s("span", {
          class: "dads-divider__line",
          "aria-hidden": "true"
        }, null, -1))
      ], 64)) : (t(), l("span", Rs))
    ], 10, Es));
  }
}), nu = /* @__PURE__ */ N(Ns, [["__scopeId", "data-v-ff448fdb"]]), Ps = {
  key: 0,
  class: "dads-table__caption"
}, Hs = {
  key: 2,
  class: "dads-table__skeleton-body",
  "aria-busy": "true",
  "aria-live": "polite"
}, Os = { class: "dads-table__sr-only" }, Ks = /* @__PURE__ */ R({
  __name: "DadsTable",
  props: {
    stickyHeader: { type: Boolean, default: !1 },
    density: { default: "comfortable" },
    bordered: { type: Boolean, default: !1 },
    striped: { type: Boolean, default: !1 },
    caption: {},
    loading: { type: Boolean, default: !1 },
    skeletonRowCount: { default: 3 },
    skeletonColumnCount: { default: 4 },
    loadingLabel: { default: "読み込み中" }
  },
  setup(e) {
    const g = e, a = d(() => Array.from({ length: g.skeletonRowCount }, (b, c) => c)), r = d(() => Array.from({ length: g.skeletonColumnCount }, (b, c) => c)), h = d(() => ({
      "dads-table-wrapper--sticky-header": g.stickyHeader
    })), m = d(() => [
      `dads-table--${g.density}`,
      {
        "dads-table--sticky-header": g.stickyHeader,
        "dads-table--bordered": g.bordered,
        "dads-table--striped": g.striped,
        "dads-table--loading": g.loading
      }
    ]);
    return (b, c) => (t(), l("div", {
      class: w(["dads-table-wrapper", h.value])
    }, [
      s("table", {
        class: w(["dads-table", m.value])
      }, [
        e.caption || b.$slots.caption ? (t(), l("caption", Ps, [
          j(b.$slots, "caption", {}, () => [
            Q(_(e.caption), 1)
          ], !0)
        ])) : v("", !0),
        e.loading ? (t(), l("tbody", Hs, [
          (t(!0), l(H, null, U(a.value, (n) => (t(), l("tr", {
            key: n,
            class: "dads-table__skeleton-row"
          }, [
            (t(!0), l(H, null, U(r.value, (i) => (t(), l("td", {
              key: i,
              class: "dads-table__skeleton-cell"
            }, [
              c[0] || (c[0] = s("span", {
                class: "dads-table__skeleton-bar",
                "aria-hidden": "true"
              }, null, -1)),
              s("span", Os, _(e.loadingLabel), 1)
            ]))), 128))
          ]))), 128))
        ])) : j(b.$slots, "default", { key: 1 }, void 0, !0)
      ], 2)
    ], 2));
  }
}), ru = /* @__PURE__ */ N(Ks, [["__scopeId", "data-v-3a4df01a"]]), js = { class: "dads-accordion__heading" }, Us = ["id", "aria-expanded", "aria-controls", "disabled", "onClick", "onKeydown"], Zs = { class: "dads-accordion__title" }, Ys = {
  class: "dads-accordion__icon",
  "aria-hidden": "true"
}, Gs = ["id", "aria-labelledby"], Ws = {
  key: 0,
  class: "dads-accordion__return-link"
}, Qs = ["href"], Js = /* @__PURE__ */ R({
  __name: "DadsAccordion",
  props: {
    modelValue: { default: () => "" },
    items: {},
    type: { default: "single" },
    size: { default: "m" },
    returnLink: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-accordion-${h}`), b = P([]), c = (f) => a.type === "multiple" ? Array.isArray(a.modelValue) && a.modelValue.includes(f) : a.modelValue === f, n = (f) => {
      if (!f.disabled) {
        if (a.type === "multiple") {
          const $ = Array.isArray(a.modelValue) ? a.modelValue : [], k = $.includes(f.id) ? $.filter((L) => L !== f.id) : [...$, f.id];
          r("update:modelValue", k);
          return;
        }
        r("update:modelValue", a.modelValue === f.id ? "" : f.id);
      }
    }, i = (f) => {
      Ce(() => {
        b.value[f]?.focus();
      });
    }, o = (f, $) => {
      const k = a.items.map((B, q) => B.disabled ? -1 : q).filter((B) => B >= 0);
      if (k.length === 0) return;
      const L = k.indexOf($), I = L === -1 ? 0 : L, x = k.length;
      let C;
      switch (f.key) {
        case "ArrowDown":
          C = k[(I + 1) % x];
          break;
        case "ArrowUp":
          C = k[(I - 1 + x) % x];
          break;
        case "Home":
          C = k[0];
          break;
        case "End":
          C = k[x - 1];
          break;
        default:
          return;
      }
      f.preventDefault(), i(C);
    }, y = (f) => `${m.value}-header-${f}`, p = (f) => `${m.value}-panel-${f}`, u = (f) => [
      "dads-accordion__item",
      {
        "dads-accordion__item--open": c(f.id),
        "dads-accordion__item--disabled": f.disabled
      }
    ];
    return (f, $) => (t(), l("div", {
      class: w(["dads-accordion", `dads-accordion--size-${e.size}`])
    }, [
      (t(!0), l(H, null, U(e.items, (k, L) => (t(), l("div", {
        key: k.id,
        class: w(u(k))
      }, [
        s("h3", js, [
          s("button", {
            id: y(k.id),
            ref_for: !0,
            ref_key: "headerRefs",
            ref: b,
            type: "button",
            class: "dads-accordion__header",
            "aria-expanded": c(k.id),
            "aria-controls": p(k.id),
            disabled: k.disabled || void 0,
            onClick: (I) => n(k),
            onKeydown: (I) => o(I, L)
          }, [
            s("span", Zs, _(k.title), 1),
            s("span", Ys, [
              s("i", {
                class: w(["mdi", c(k.id) ? "mdi-chevron-up" : "mdi-chevron-down"])
              }, null, 2)
            ])
          ], 40, Us)
        ]),
        ye(s("div", {
          id: p(k.id),
          role: "region",
          class: "dads-accordion__panel",
          "aria-labelledby": y(k.id)
        }, [
          j(f.$slots, `panel-${k.id}`, {}, void 0, !0),
          e.returnLink ? (t(), l("p", Ws, [
            s("a", {
              href: e.returnLink.href
            }, _(e.returnLink.label), 9, Qs)
          ])) : v("", !0)
        ], 8, Gs), [
          [ke, c(k.id)]
        ])
      ], 2))), 128))
    ], 2));
  }
}), uu = /* @__PURE__ */ N(Js, [["__scopeId", "data-v-01e324ac"]]), Xs = {
  key: 0,
  class: "dads-chip-label__prepend",
  "aria-hidden": "true"
}, ed = { class: "dads-chip-label__text" }, ad = {
  key: 1,
  class: "dads-chip-label__append",
  "aria-hidden": "true"
}, td = /* @__PURE__ */ R({
  __name: "DadsChipLabel",
  props: {
    size: { default: "md" },
    color: { default: "primary" },
    appearance: { default: "filled" }
  },
  setup(e) {
    const g = e, a = d(() => [
      "dads-chip-label",
      `dads-chip-label--${g.size}`,
      `dads-chip-label--${g.color}`,
      `dads-chip-label--appearance-${g.appearance}`
    ]);
    return (r, h) => (t(), l("span", {
      class: w(a.value)
    }, [
      r.$slots.prepend ? (t(), l("span", Xs, [
        j(r.$slots, "prepend", {}, void 0, !0)
      ])) : v("", !0),
      s("span", ed, [
        j(r.$slots, "default", {}, void 0, !0)
      ]),
      r.$slots.append ? (t(), l("span", ad, [
        j(r.$slots, "append", {}, void 0, !0)
      ])) : v("", !0)
    ], 2));
  }
}), cu = /* @__PURE__ */ N(td, [["__scopeId", "data-v-d13a89ef"]]), ld = {
  key: 0,
  class: "dads-chip-tag__prepend",
  "aria-hidden": "true"
}, sd = { class: "dads-chip-tag__label" }, dd = {
  key: 1,
  class: "dads-chip-tag__append",
  "aria-hidden": "true"
}, id = ["aria-label", "disabled"], od = /* @__PURE__ */ R({
  __name: "DadsChipTag",
  props: {
    size: { default: "md" },
    color: { default: "primary" },
    closable: { type: Boolean, default: !1 },
    clickable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    closeLabel: { default: "削除" },
    ariaLabel: {},
    appearance: { default: "filled" }
  },
  emits: ["click", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => [
      "dads-chip-tag",
      `dads-chip-tag--${a.size}`,
      `dads-chip-tag--${a.color}`,
      `dads-chip-tag--appearance-${a.appearance}`,
      {
        "dads-chip-tag--clickable": a.clickable
      }
    ]), m = d(() => !a.clickable && a.disabled ? "true" : void 0), b = (i) => {
      !a.clickable || a.disabled || r("click", i);
    }, c = (i) => {
      !a.clickable || a.disabled || (i.key === "Enter" || i.key === " ") && (i.preventDefault(), r("click", i));
    }, n = (i) => {
      a.disabled || r("close", i);
    };
    return (i, o) => (t(), ae(ue(e.clickable ? "button" : "span"), {
      type: e.clickable ? "button" : void 0,
      class: w(h.value),
      role: e.clickable ? "button" : void 0,
      tabindex: e.clickable && !e.disabled ? 0 : void 0,
      disabled: e.clickable && e.disabled || void 0,
      "aria-disabled": m.value,
      "aria-label": e.ariaLabel,
      onClick: b,
      onKeydown: c
    }, {
      default: se(() => [
        i.$slots.prepend ? (t(), l("span", ld, [
          j(i.$slots, "prepend", {}, void 0, !0)
        ])) : v("", !0),
        s("span", sd, [
          j(i.$slots, "default", {}, void 0, !0)
        ]),
        i.$slots.append && !e.closable ? (t(), l("span", dd, [
          j(i.$slots, "append", {}, void 0, !0)
        ])) : v("", !0),
        e.closable ? (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-chip-tag__close",
          "aria-label": e.closeLabel,
          disabled: e.disabled,
          onClick: we(n, ["stop"])
        }, [...o[0] || (o[0] = [
          s("i", {
            class: "mdi mdi-close",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, id)) : v("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "role", "tabindex", "disabled", "aria-disabled", "aria-label"]));
  }
}), bu = /* @__PURE__ */ N(od, [["__scopeId", "data-v-dda0e07b"]]), nd = [
  "#000000",
  "#FFFFFF",
  "#F44336",
  "#FF9800",
  "#FFEB3B",
  "#4CAF50",
  "#00BCD4",
  "#2196F3",
  "#9C27B0",
  "#E91E63",
  "#795548",
  "#9E9E9E"
], rd = { class: "dads-color-picker__main" }, ud = ["value", "disabled", "aria-label"], cd = ["value", "disabled", "aria-label"], bd = {
  class: "dads-color-picker__swatches",
  role: "list"
}, vd = ["disabled", "aria-label", "aria-pressed", "onClick"], fd = /* @__PURE__ */ R({
  __name: "DadsColorPicker",
  props: {
    modelValue: {},
    swatches: { default: () => [...nd] },
    disabled: { type: Boolean, default: !1 },
    label: {},
    defaultAriaLabel: { default: "色を選択" },
    hexInputAriaLabel: { default: "HEXカラーコード" },
    formatSwatchAriaLabel: { type: Function, default: (e) => `${e} を選択` }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: g }) {
    const a = e, r = g, m = `dads-color-picker-${le()}`, b = `${m}-hex`, c = (u) => {
      if (!u) return "#000000";
      const f = u.trim().toLowerCase();
      return f.startsWith("#") ? f : `#${f}`;
    }, n = d(() => c(a.modelValue)), i = (u) => /^#[0-9a-f]{6}$/i.test(u.trim()), o = (u) => {
      const f = u.target;
      r("update:modelValue", c(f.value));
    }, y = (u) => {
      const f = u.target;
      i(f.value) && r("update:modelValue", c(f.value));
    }, p = (u) => {
      a.disabled || r("update:modelValue", c(u));
    };
    return (u, f) => (t(), l("div", {
      class: w(["dads-color-picker", { "dads-color-picker--disabled": e.disabled }])
    }, [
      s("div", rd, [
        s("label", {
          for: m,
          class: "dads-color-picker__swatch-label"
        }, [
          s("input", {
            id: m,
            class: "dads-color-picker__color-input",
            type: "color",
            value: n.value,
            disabled: e.disabled,
            "aria-label": e.label ?? e.defaultAriaLabel,
            onInput: o
          }, null, 40, ud),
          s("span", {
            class: "dads-color-picker__swatch-preview",
            style: Le({ backgroundColor: n.value }),
            "aria-hidden": "true"
          }, null, 4)
        ]),
        s("input", {
          id: b,
          class: "dads-color-picker__hex-input",
          type: "text",
          value: e.modelValue,
          disabled: e.disabled,
          maxlength: "7",
          spellcheck: "false",
          autocomplete: "off",
          "aria-label": e.hexInputAriaLabel,
          onInput: y
        }, null, 40, cd)
      ]),
      s("ul", bd, [
        (t(!0), l(H, null, U(e.swatches, ($) => (t(), l("li", { key: $ }, [
          s("button", {
            type: "button",
            class: "dads-color-picker__swatch",
            style: Le({ backgroundColor: $ }),
            disabled: e.disabled,
            "aria-label": e.formatSwatchAriaLabel($),
            "aria-pressed": c($) === n.value,
            onClick: (k) => p($)
          }, null, 12, vd)
        ]))), 128))
      ])
    ], 2));
  }
}), vu = /* @__PURE__ */ N(fd, [["__scopeId", "data-v-5cc3a708"]]), hd = ["for"], md = {
  key: 0,
  class: "dads-date-picker__required",
  "aria-hidden": "true"
}, _d = ["data-size"], gd = ["data-error", "data-disabled", "data-readonly"], pd = { class: "dads-date-picker__year" }, yd = { class: "dads-date-picker__label" }, kd = ["id", "name", "value", "placeholder", "disabled", "readonly", "aria-invalid", "aria-required", "aria-describedby"], $d = {
  key: 0,
  class: "dads-date-picker__wareki",
  "aria-live": "polite"
}, xd = { class: "dads-date-picker__month" }, wd = { class: "dads-date-picker__label" }, Ld = ["id", "name", "value", "disabled", "readonly", "aria-invalid", "aria-describedby"], Id = { class: "dads-date-picker__day" }, Cd = { class: "dads-date-picker__label" }, Dd = ["id", "name", "value", "disabled", "readonly", "aria-invalid", "aria-describedby"], Bd = ["aria-expanded", "aria-controls", "aria-label", "disabled"], Vd = ["id", "aria-label"], Ad = { class: "dads-date-picker__calendar-header" }, Md = ["disabled", "aria-label"], Sd = {
  class: "dads-date-picker__current-month",
  "aria-live": "polite"
}, zd = ["disabled", "aria-label"], Td = ["aria-label"], Fd = ["data-selected", "data-today", "disabled", "aria-selected", "onClick"], Ed = {
  key: 1,
  "aria-hidden": "true",
  class: "dads-date-picker__date-placeholder"
}, qd = {
  key: 1,
  class: "dads-date-picker__footer"
}, Rd = ["id"], Nd = ["id"], Pd = /* @__PURE__ */ R({
  __name: "DadsDatePicker",
  props: {
    modelValue: { default: "" },
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    size: { default: "md" },
    min: {},
    max: {},
    placeholder: {},
    name: {},
    id: {},
    variant: { default: "consolidated" },
    locale: { default: "gregorian" },
    requiredLabel: { default: "必須" },
    yearLabel: { default: "年" },
    monthLabel: { default: "月" },
    dayLabel: { default: "日" },
    openCalendarAriaLabel: { default: "カレンダーを開く" },
    prevMonthAriaLabel: { default: "前の月" },
    nextMonthAriaLabel: { default: "次の月" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { emit: g }) {
    const a = e, r = (V) => Number.isFinite(V) ? V >= 2019 ? { era: "令和", year: V - 2018 } : V >= 1989 ? { era: "平成", year: V - 1988 } : V >= 1926 ? { era: "昭和", year: V - 1925 } : V >= 1912 ? { era: "大正", year: V - 1911 } : V >= 1868 ? { era: "明治", year: V - 1867 } : null : null, h = g, m = le(), b = d(() => a.id ?? `dads-date-picker-${m}`), c = d(() => `${b.value}-year`), n = d(() => `${b.value}-month`), i = d(() => `${b.value}-day`), o = d(() => `${b.value}-popover`), y = d(() => `${b.value}-hint`), p = d(() => `${b.value}-error`), u = d(() => a.error || !!a.errorMessage), f = d(() => {
      const V = [];
      return u.value && a.errorMessage ? V.push(p.value) : a.hint && V.push(y.value), V.length > 0 ? V.join(" ") : void 0;
    }), $ = d(() => u.value && !!a.errorMessage || !!a.hint), k = (V) => {
      if (!V || !/^\d{4}-\d{2}-\d{2}$/.test(V))
        return { year: null, month: null, day: null };
      const [T, ee, ne] = V.split("-").map((oe) => Number.parseInt(oe, 10));
      return Number.isNaN(T) || Number.isNaN(ee) || Number.isNaN(ne) ? { year: null, month: null, day: null } : { year: T, month: ee, day: ne };
    }, L = (V, T = 2) => String(V).padStart(T, "0"), I = (V, T, ee) => {
      if (V === null || T === null || ee === null || T < 1 || T > 12 || ee < 1 || ee > 31) return "";
      const ne = new Date(V, T - 1, ee);
      return ne.getFullYear() !== V || ne.getMonth() !== T - 1 || ne.getDate() !== ee ? "" : `${L(V, 4)}-${L(T)}-${L(ee)}`;
    }, x = P(""), C = P(""), B = P("");
    re(
      () => a.modelValue,
      (V) => {
        const T = k(V);
        x.value = T.year !== null ? String(T.year).padStart(4, "0") : "", C.value = T.month !== null ? L(T.month) : "", B.value = T.day !== null ? L(T.day) : "";
      },
      { immediate: !0 }
    );
    const q = () => {
      const V = x.value ? Number.parseInt(x.value, 10) : null, T = C.value ? Number.parseInt(C.value, 10) : null, ee = B.value ? Number.parseInt(B.value, 10) : null, ne = I(
        Number.isNaN(V) ? null : V,
        Number.isNaN(T) ? null : T,
        Number.isNaN(ee) ? null : ee
      );
      ne !== a.modelValue && (h("update:modelValue", ne), h("change", ne));
    }, te = (V) => {
      x.value = V.target.value.replace(/\D/g, "").slice(0, 4), q();
    }, G = (V) => {
      C.value = V.target.value.replace(/\D/g, "").slice(0, 2), q();
    }, E = (V) => {
      B.value = V.target.value.replace(/\D/g, "").slice(0, 2), q();
    }, W = P(null), X = P(null), de = P(null), Z = P(null), M = P(null), K = P(!1), A = P((/* @__PURE__ */ new Date()).getFullYear()), F = P((/* @__PURE__ */ new Date()).getMonth() + 1), O = () => {
      const V = k(a.modelValue);
      if (V.year !== null && V.month !== null) {
        A.value = V.year, F.value = V.month;
        return;
      }
      const T = /* @__PURE__ */ new Date();
      A.value = T.getFullYear(), F.value = T.getMonth() + 1;
    }, J = () => {
      a.disabled || a.readonly || (O(), K.value = !0);
    }, fe = () => {
      K.value && (K.value = !1, Z.value?.focus());
    }, Me = () => {
      K.value ? fe() : J();
    }, De = (V) => {
      let T = F.value + V, ee = A.value;
      T < 1 ? (T = 12, ee -= 1) : T > 12 && (T = 1, ee += 1), A.value = ee, F.value = T;
    }, ge = d(() => k(a.min)), pe = d(() => k(a.max)), z = (V, T) => V.y !== T.y ? V.y < T.y ? -1 : 1 : V.m !== T.m ? V.m < T.m ? -1 : 1 : V.d !== T.d ? V.d < T.d ? -1 : 1 : 0, D = (V, T, ee) => {
      const ne = { y: V, m: T, d: ee };
      if (ge.value.year !== null) {
        const oe = {
          y: ge.value.year,
          m: ge.value.month,
          d: ge.value.day
        };
        if (z(ne, oe) < 0) return !1;
      }
      if (pe.value.year !== null) {
        const oe = {
          y: pe.value.year,
          m: pe.value.month,
          d: pe.value.day
        };
        if (z(ne, oe) > 0) return !1;
      }
      return !0;
    }, S = /* @__PURE__ */ new Date(), Y = I(S.getFullYear(), S.getMonth() + 1, S.getDate()), ie = d(() => {
      const V = A.value, T = F.value, ne = new Date(V, T - 1, 1).getDay(), oe = new Date(V, T, 0).getDate(), he = [], me = new Date(V, T - 1, 1 - ne);
      for (let $e = 0; $e < 42; $e++) {
        const Pe = me.getFullYear(), ze = me.getMonth() + 1, He = me.getDate(), Ye = ze === T, Se = I(Pe, ze, He), da = !!Se && Se === a.modelValue;
        if (he.push({
          year: Pe,
          month: ze,
          day: He,
          inMonth: Ye,
          disabled: !Ye || !D(Pe, ze, He),
          selected: da,
          isToday: !!Se && Se === Y,
          iso: Se
        }), me.setDate(me.getDate() + 1), $e >= 27 && he[he.length - 1].day === oe && he[he.length - 1].inMonth) {
          const Ge = 7 - he.length % 7;
          if (Ge !== 7)
            for (let We = 0; We < Ge; We++) {
              const Qe = me.getFullYear(), Je = me.getMonth() + 1, Xe = me.getDate();
              he.push({
                year: Qe,
                month: Je,
                day: Xe,
                inMonth: !1,
                disabled: !0,
                selected: !1,
                isToday: !1,
                iso: I(Qe, Je, Xe)
              }), me.setDate(me.getDate() + 1);
            }
          break;
        }
      }
      const Ze = [];
      for (let $e = 0; $e < he.length; $e += 7)
        Ze.push(he.slice($e, $e + 7));
      return Ze;
    }), ce = (V) => {
      if (!V.disabled) {
        if (V.iso === a.modelValue) {
          fe();
          return;
        }
        h("update:modelValue", V.iso), h("change", V.iso), fe();
      }
    }, Ee = d(() => {
      if (ge.value.year === null) return !0;
      const V = F.value === 1 ? A.value - 1 : A.value, T = F.value === 1 ? 12 : F.value - 1, ee = new Date(V, T, 0).getDate();
      return D(V, T, ee);
    }), aa = d(() => {
      if (pe.value.year === null) return !0;
      const V = F.value === 12 ? A.value + 1 : A.value, T = F.value === 12 ? 1 : F.value + 1;
      return D(V, T, 1);
    }), qe = d(() => {
      const V = new Date(A.value, F.value - 1, 1);
      return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long" }).format(V);
    }), ta = ["日", "月", "火", "水", "木", "金", "土"], la = (V) => {
      V.key === "Escape" && (V.preventDefault(), fe());
    }, je = (V) => {
      if (!K.value) return;
      const T = V.target;
      T && M.value?.contains(T) || T && Z.value?.contains(T) || (K.value = !1);
    };
    ve(() => {
      document.addEventListener("pointerdown", je, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", je, !0);
    }), re(
      () => a.disabled,
      (V) => {
        V && (K.value = !1);
      }
    );
    const Re = (V) => h("focus", V), Ne = (V) => h("blur", V), sa = d(() => [
      "dads-date-picker",
      `dads-date-picker--${a.size}`,
      `dads-date-picker--variant-${a.variant}`,
      `dads-date-picker--locale-${a.locale}`,
      {
        "dads-date-picker--disabled": a.disabled,
        "dads-date-picker--readonly": a.readonly,
        "dads-date-picker--error": u.value,
        "dads-date-picker--open": K.value
      }
    ]), Ue = d(() => {
      if (a.locale !== "japanese") return "";
      const V = Number(x.value);
      if (!Number.isFinite(V) || V === 0) return "";
      const T = r(V);
      return T ? `${T.era}${T.year}年` : "";
    });
    return (V, T) => (t(), l("div", {
      class: w(sa.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: c.value,
        class: "dads-date-picker__label-text"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", md, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, hd)) : v("", !0),
      s("div", {
        class: "dads-date-picker__controls",
        "data-size": e.size
      }, [
        s("div", {
          class: "dads-date-picker__inputs",
          "data-error": u.value || void 0,
          "data-disabled": e.disabled || void 0,
          "data-readonly": e.readonly || void 0
        }, [
          s("label", pd, [
            s("span", yd, _(e.yearLabel), 1),
            s("input", {
              id: c.value,
              ref_key: "yearInputRef",
              ref: W,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: e.name ? `${e.name}-year` : void 0,
              value: x.value,
              placeholder: e.placeholder,
              disabled: e.disabled || void 0,
              readonly: e.readonly || void 0,
              "aria-invalid": u.value || void 0,
              "aria-required": e.required || void 0,
              "aria-describedby": f.value,
              "data-js-year-input": "",
              onInput: te,
              onFocus: Re,
              onBlur: Ne
            }, null, 40, kd),
            Ue.value ? (t(), l("span", $d, _(Ue.value), 1)) : v("", !0)
          ]),
          s("label", xd, [
            s("span", wd, _(e.monthLabel), 1),
            s("input", {
              id: n.value,
              ref_key: "monthInputRef",
              ref: X,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: e.name ? `${e.name}-month` : void 0,
              value: C.value,
              disabled: e.disabled || void 0,
              readonly: e.readonly || void 0,
              "aria-invalid": u.value || void 0,
              "aria-describedby": f.value,
              "data-js-month-input": "",
              onInput: G,
              onFocus: Re,
              onBlur: Ne
            }, null, 40, Ld)
          ]),
          s("label", Id, [
            s("span", Cd, _(e.dayLabel), 1),
            s("input", {
              id: i.value,
              ref_key: "dayInputRef",
              ref: de,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: e.name ? `${e.name}-day` : void 0,
              value: B.value,
              disabled: e.disabled || void 0,
              readonly: e.readonly || void 0,
              "aria-invalid": u.value || void 0,
              "aria-describedby": f.value,
              "data-js-day-input": "",
              onInput: E,
              onFocus: Re,
              onBlur: Ne
            }, null, 40, Dd)
          ])
        ], 8, gd),
        s("button", {
          ref_key: "calendarButtonRef",
          ref: Z,
          type: "button",
          class: "dads-date-picker__calendar-button",
          "aria-expanded": K.value,
          "aria-controls": o.value,
          "aria-haspopup": "dialog",
          "aria-label": e.openCalendarAriaLabel,
          disabled: e.disabled || e.readonly || void 0,
          "data-js-calendar-button": "",
          onClick: Me
        }, [...T[2] || (T[2] = [
          s("i", {
            class: "mdi mdi-calendar dads-date-picker__calendar-icon",
            "aria-hidden": "true"
          }, null, -1),
          s("i", {
            class: "mdi mdi-chevron-down dads-date-picker__calendar-chevron",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, Bd),
        ye(s("div", {
          id: o.value,
          ref_key: "popoverRef",
          ref: M,
          class: "dads-date-picker__calendar-popover",
          role: "dialog",
          "aria-label": qe.value,
          onKeydown: la
        }, [
          s("div", Ad, [
            s("button", {
              type: "button",
              class: "dads-date-picker__nav-button",
              disabled: !Ee.value || void 0,
              "aria-label": e.prevMonthAriaLabel,
              onClick: T[0] || (T[0] = (ee) => De(-1))
            }, [...T[3] || (T[3] = [
              s("i", {
                class: "mdi mdi-chevron-left",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, Md),
            s("span", Sd, _(qe.value), 1),
            s("button", {
              type: "button",
              class: "dads-date-picker__nav-button",
              disabled: !aa.value || void 0,
              "aria-label": e.nextMonthAriaLabel,
              onClick: T[1] || (T[1] = (ee) => De(1))
            }, [...T[4] || (T[4] = [
              s("i", {
                class: "mdi mdi-chevron-right",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, zd)
          ]),
          s("table", {
            class: "dads-date-picker__calendar-table",
            role: "grid",
            "aria-label": qe.value
          }, [
            s("thead", null, [
              s("tr", null, [
                (t(), l(H, null, U(ta, (ee) => s("th", {
                  key: ee,
                  scope: "col",
                  class: "dads-date-picker__weekday"
                }, _(ee), 1)), 64))
              ])
            ]),
            s("tbody", null, [
              (t(!0), l(H, null, U(ie.value, (ee, ne) => (t(), l("tr", { key: ne }, [
                (t(!0), l(H, null, U(ee, (oe) => (t(), l("td", {
                  key: `${oe.year}-${oe.month}-${oe.day}`,
                  class: "dads-date-picker__date-cell"
                }, [
                  oe.inMonth ? (t(), l("button", {
                    key: 0,
                    type: "button",
                    class: "dads-date-picker__date",
                    "data-selected": oe.selected || void 0,
                    "data-today": oe.isToday || void 0,
                    disabled: oe.disabled || void 0,
                    "aria-selected": oe.selected || void 0,
                    onClick: (he) => ce(oe)
                  }, _(oe.day), 9, Fd)) : (t(), l("span", Ed))
                ]))), 128))
              ]))), 128))
            ])
          ], 8, Td)
        ], 40, Vd), [
          [ke, K.value]
        ])
      ], 8, _d),
      $.value ? (t(), l("div", qd, [
        u.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: p.value,
          class: "dads-date-picker__error-text",
          role: "alert"
        }, _(e.errorMessage), 9, Rd)) : e.hint ? (t(), l("span", {
          key: 1,
          id: y.value,
          class: "dads-date-picker__hint"
        }, _(e.hint), 9, Nd)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), fu = /* @__PURE__ */ N(Pd, [["__scopeId", "data-v-f5021a0b"]]), Hd = ["for"], Od = {
  key: 0,
  class: "dads-search-box__required",
  "aria-hidden": "true"
}, Kd = { class: "dads-search-box__row" }, jd = ["value", "disabled", "aria-label"], Ud = {
  value: "",
  disabled: "",
  hidden: ""
}, Zd = ["value"], Yd = { class: "dads-search-box__fields" }, Gd = { class: "dads-search-box__input" }, Wd = {
  key: 0,
  class: "dads-u-visually-hidden"
}, Qd = ["id", "name", "value", "placeholder", "disabled", "readonly", "aria-invalid", "aria-required", "aria-describedby"], Jd = ["aria-label"], Xd = {
  key: 0,
  class: "dads-search-box__suggestions",
  role: "listbox"
}, ei = ["onMousedown"], ai = {
  key: 1,
  class: "dads-search-box__footer"
}, ti = ["id"], li = ["id"], si = /* @__PURE__ */ R({
  __name: "DadsSearchBox",
  props: {
    modelValue: { default: "" },
    placeholder: {},
    label: {},
    hint: {},
    errorMessage: {},
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    size: { default: "md" },
    name: {},
    id: {},
    buttonLabel: { default: "検索" },
    clearable: { type: Boolean, default: !1 },
    clearLabel: { default: "クリア" },
    suggestions: {},
    categories: {},
    category: { default: "" },
    categoryPlaceholder: { default: "カテゴリ" },
    requiredLabel: { default: "必須" }
  },
  emits: ["update:modelValue", "search", "focus", "blur", "update:category", "select:suggestion"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null), m = d(
      () => Array.isArray(a.suggestions) && a.suggestions.length > 0
    ), b = d(() => Array.isArray(a.categories) && a.categories.length > 0), c = d(
      () => a.clearable && !!a.modelValue && !a.disabled && !a.readonly
    ), n = (E) => {
      const W = E.target.value;
      r("update:category", W);
    }, i = (E) => {
      r("update:modelValue", E), r("select:suggestion", E), r("search", E);
    }, o = () => {
      r("update:modelValue", ""), h.value?.focus();
    }, y = le(), p = d(() => a.id ?? `dads-search-box-${y}`), u = d(() => `${p.value}-hint`), f = d(() => `${p.value}-error`), $ = d(() => a.error || !!a.errorMessage), k = d(() => {
      if ($.value && a.errorMessage) return f.value;
      if (a.hint) return u.value;
    }), L = d(() => [
      "dads-search-box",
      `dads-search-box--${a.size}`,
      {
        "dads-search-box--disabled": a.disabled,
        "dads-search-box--readonly": a.readonly,
        "dads-search-box--error": $.value
      }
    ]), I = d(() => a.size), x = d(() => $.value && !!a.errorMessage || !!a.hint), C = (E) => {
      const W = E.target;
      r("update:modelValue", W.value);
    }, B = (E) => {
      E.key !== "Enter" || E.isComposing || a.disabled || (E.preventDefault(), r("search", a.modelValue ?? ""));
    }, q = () => {
      a.disabled || r("search", a.modelValue ?? "");
    }, te = (E) => r("focus", E), G = (E) => r("blur", E);
    return (E, W) => (t(), l("div", {
      class: w(L.value)
    }, [
      e.label ? (t(), l("label", {
        key: 0,
        for: p.value,
        class: "dads-search-box__label"
      }, [
        Q(_(e.label) + " ", 1),
        e.required ? (t(), l("span", Od, _(e.requiredLabel), 1)) : v("", !0)
      ], 8, Hd)) : v("", !0),
      s("div", Kd, [
        b.value ? (t(), l("select", {
          key: 0,
          class: "dads-search-box__category",
          value: e.category,
          disabled: e.disabled || void 0,
          "aria-label": e.categoryPlaceholder,
          onChange: n
        }, [
          s("option", Ud, _(e.categoryPlaceholder), 1),
          (t(!0), l(H, null, U(e.categories, (X) => (t(), l("option", {
            key: X,
            value: X
          }, _(X), 9, Zd))), 128))
        ], 40, jd)) : v("", !0),
        s("div", Yd, [
          s("label", Gd, [
            W[0] || (W[0] = s("svg", {
              class: "dads-search-box__icon",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              "aria-hidden": "true"
            }, [
              s("path", {
                d: "m21 20.5-6-6a7.4 7.4 0 0 0 1.9-5A7.4 7.4 0 0 0 9.5 2 7.5 7.5 0 1 0 14 15.5l6 6 1-1ZM3.5 9.5a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6Z",
                fill: "currentcolor"
              })
            ], -1)),
            e.label ? v("", !0) : (t(), l("span", Wd, _(e.buttonLabel), 1)),
            s("input", {
              id: p.value,
              ref_key: "inputRef",
              ref: h,
              type: "search",
              class: "dads-search-box__field",
              name: e.name,
              value: e.modelValue,
              placeholder: e.placeholder,
              disabled: e.disabled || void 0,
              readonly: e.readonly || void 0,
              "aria-invalid": $.value || void 0,
              "aria-required": e.required || void 0,
              "aria-describedby": k.value,
              onInput: C,
              onKeydown: B,
              onFocus: te,
              onBlur: G
            }, null, 40, Qd),
            c.value ? (t(), l("button", {
              key: 1,
              type: "button",
              class: "dads-search-box__clear",
              "aria-label": e.clearLabel,
              onClick: o
            }, " × ", 8, Jd)) : v("", !0)
          ]),
          m.value ? (t(), l("ul", Xd, [
            (t(!0), l(H, null, U(e.suggestions, (X, de) => (t(), l("li", {
              key: de,
              class: "dads-search-box__suggestion",
              role: "option",
              tabindex: "-1",
              onMousedown: we((Z) => i(X), ["prevent"])
            }, _(X), 41, ei))), 128))
          ])) : v("", !0)
        ]),
        Ie(ua, {
          type: "submit",
          variant: "solid-fill",
          size: I.value,
          disabled: e.disabled,
          onClick: q
        }, {
          default: se(() => [
            Q(_(e.buttonLabel), 1)
          ]),
          _: 1
        }, 8, ["size", "disabled"])
      ]),
      x.value ? (t(), l("div", ai, [
        $.value && e.errorMessage ? (t(), l("span", {
          key: 0,
          id: f.value,
          class: "dads-search-box__error",
          role: "alert"
        }, _(e.errorMessage), 9, ti)) : e.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-search-box__hint"
        }, _(e.hint), 9, li)) : v("", !0)
      ])) : v("", !0)
    ], 2));
  }
}), hu = /* @__PURE__ */ N(si, [["__scopeId", "data-v-56839662"]]), di = ["open", "aria-disabled"], ii = ["id", "aria-expanded", "aria-controls", "aria-disabled", "tabindex"], oi = { class: "dads-disclosure__title" }, ni = ["id", "aria-labelledby"], ri = /* @__PURE__ */ R({
  __name: "DadsDisclosure",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    title: {},
    disabled: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-disclosure-${h}`), b = d(() => `${m.value}-summary`), c = d(() => `${m.value}-content`), n = d(() => a.modelValue !== void 0), i = P(a.defaultOpen), o = d(
      () => n.value ? !!a.modelValue : i.value
    ), y = P(null);
    re(o, (k) => {
      y.value && y.value.open !== k && (y.value.open = k);
    });
    const p = (k) => {
      n.value || (i.value = k), r("update:modelValue", k), r("toggle", k);
    }, u = (k) => {
      k.preventDefault(), !a.disabled && p(!o.value);
    }, f = (k) => {
      k.key !== "Enter" && k.key !== " " || (k.preventDefault(), !a.disabled && p(!o.value));
    }, $ = d(() => [
      "dads-disclosure",
      {
        "dads-disclosure--open": o.value,
        "dads-disclosure--disabled": a.disabled
      }
    ]);
    return (k, L) => (t(), l("details", {
      ref_key: "detailsRef",
      ref: y,
      class: w($.value),
      open: o.value,
      "aria-disabled": e.disabled || void 0
    }, [
      s("summary", {
        id: b.value,
        class: "dads-disclosure__summary",
        "aria-expanded": o.value,
        "aria-controls": c.value,
        "aria-disabled": e.disabled || void 0,
        tabindex: e.disabled ? -1 : 0,
        onClick: u,
        onKeydown: f
      }, [
        L[0] || (L[0] = s("svg", {
          class: "dads-disclosure__icon",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [
          s("circle", {
            cx: "12",
            cy: "12",
            r: "11",
            fill: "currentcolor"
          }),
          s("circle", {
            class: "dads-disclosure__icon-circle",
            cx: "12",
            cy: "12",
            r: "8",
            fill: "currentcolor"
          }),
          s("path", {
            class: "dads-disclosure__icon-triangle",
            d: "M17 10H7L12 15L17 10Z",
            fill: "Canvas"
          })
        ], -1)),
        s("span", oi, _(e.title), 1)
      ], 40, ii),
      s("div", {
        id: c.value,
        class: "dads-disclosure__content",
        role: "region",
        "aria-labelledby": b.value
      }, [
        j(k.$slots, "default", {}, void 0, !0)
      ], 8, ni)
    ], 10, di));
  }
}), mu = /* @__PURE__ */ N(ri, [["__scopeId", "data-v-aac80566"]]), ui = ["data-marker"], ci = /* @__PURE__ */ R({
  __name: "DadsDescriptionList",
  props: {
    items: {},
    layout: { default: "horizontal" },
    marker: { default: "none" },
    bordered: { type: Boolean, default: !1 }
  },
  setup(e) {
    const g = e, a = d(() => g.marker === "none" ? void 0 : g.marker), r = d(() => [
      "dads-description-list",
      `dads-description-list--${g.layout}`,
      {
        "dads-description-list--bordered": g.bordered
      }
    ]);
    return (h, m) => (t(), l("dl", {
      class: w(r.value),
      "data-marker": a.value
    }, [
      e.items && e.items.length > 0 ? (t(!0), l(H, { key: 0 }, U(e.items, (b, c) => (t(), l("div", {
        key: c,
        class: "dads-description-list__item"
      }, [
        s("dt", null, _(b.term), 1),
        s("dd", null, _(b.description), 1)
      ]))), 128)) : j(h.$slots, "default", { key: 1 }, void 0, !0)
    ], 10, ui));
  }
}), _u = /* @__PURE__ */ N(ci, [["__scopeId", "data-v-97d39272"]]), bi = { class: "dads-language-selector__box" }, vi = ["id", "aria-label", "aria-controls", "aria-expanded", "disabled"], fi = { class: "dads-language-selector__opener-text" }, hi = ["id"], mi = ["aria-labelledby"], _i = ["id", "href", "lang", "hreflang", "aria-current", "onClick"], gi = { class: "dads-language-selector__label" }, pi = /* @__PURE__ */ R({
  __name: "DadsLanguageSelector",
  props: {
    modelValue: {},
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 },
    size: { default: "md" },
    colorScheme: { default: "light-blue" },
    cornerShape: { default: "rounded" },
    ariaLabel: { default: "言語を選択" },
    openerLabel: { default: "Language" }
  },
  emits: ["update:modelValue", "change", "open", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-language-selector-opener-${h}`), b = d(() => `dads-language-selector-popup-${h}`), c = (M) => `${m.value}-item-${M}`, n = P(null), i = P(null), o = P(null), y = P([]), p = P(!1), u = (M) => a.modelValue !== void 0 && a.modelValue === M.value, f = d(() => [
      "dads-language-selector",
      `dads-language-selector--${a.size}`,
      `dads-language-selector--${a.colorScheme}`,
      `dads-language-selector--corner-${a.cornerShape}`,
      {
        "dads-language-selector--disabled": a.disabled,
        "dads-language-selector--open": p.value
      }
    ]), $ = () => {
      a.disabled || p.value || (p.value = !0, r("open"));
    }, k = (M = !1) => {
      p.value && (p.value = !1, r("close"), M && i.value?.focus());
    }, L = () => {
      p.value ? k() : $();
    }, I = (M, K) => {
      !M.href && K && K.preventDefault(), r("update:modelValue", M.value), r("change", M.value), k(!0);
    }, x = (M) => {
      y.value[M]?.focus();
    }, C = () => x(0), B = () => x(a.options.length - 1), q = () => {
      const M = document.activeElement;
      return y.value.findIndex((K) => K === M);
    }, te = () => {
      const M = q();
      M < 0 || M >= a.options.length - 1 ? C() : x(M + 1);
    }, G = () => {
      const M = q();
      M <= 0 ? B() : x(M - 1);
    }, E = (M) => {
      M.preventDefault(), L();
    }, W = (M) => {
      if (!a.disabled)
        switch (M.key) {
          case "ArrowDown":
            M.preventDefault(), p.value ? C() : ($(), Ce(C));
            break;
          case "ArrowUp":
            M.preventDefault(), p.value ? B() : ($(), Ce(B));
            break;
          case "Enter":
          case " ":
            M.preventDefault(), L();
            break;
        }
    }, X = (M) => {
      if (p.value)
        switch (M.key) {
          case "ArrowDown":
            M.preventDefault(), te();
            break;
          case "ArrowUp":
            M.preventDefault(), G();
            break;
          case "Home":
            M.preventDefault(), C();
            break;
          case "End":
            M.preventDefault(), B();
            break;
          case "Escape":
            M.preventDefault(), k(!0);
            break;
          case "Tab":
            k();
            break;
        }
    }, de = (M) => {
      if (!p.value) return;
      const K = M.target;
      K && n.value && n.value.contains(K) || k();
    };
    ve(() => {
      document.addEventListener("pointerdown", de, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", de, !0);
    }), re(
      () => a.disabled,
      (M) => {
        M && k();
      }
    );
    const Z = (M) => (K) => {
      y.value[M] = K ?? null;
    };
    return (M, K) => (t(), l("div", {
      ref_key: "rootRef",
      ref: n,
      class: w(f.value)
    }, [
      s("div", bi, [
        s("button", {
          id: m.value,
          ref_key: "openerRef",
          ref: i,
          type: "button",
          class: "dads-language-selector__opener",
          "aria-label": e.ariaLabel,
          "aria-controls": b.value,
          "aria-expanded": p.value,
          "aria-haspopup": "menu",
          disabled: e.disabled || void 0,
          onClick: E,
          onKeydown: W
        }, [
          K[1] || (K[1] = s("svg", {
            class: "dads-language-selector__opener-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "currentcolor",
            "aria-hidden": "true"
          }, [
            s("path", { d: "M12 21.5A9.5 9.5 0 0 1 2.5 12c0-5.2 4.3-9.5 9.5-9.5s9.6 4.3 9.5 9.5c0 5.2-4.3 9.5-9.5 9.5Zm0-1.5c1-1.3 1.7-2.8 2.1-4.3H10c.4 1.5 1 3 2.1 4.3Zm-2-.3c-.8-1.2-1.4-2.6-1.7-4H5c1 2 3 3.5 5.2 4Zm4 0c2.2-.5 4-2 5-4h-3.3c-.4 1.4-1 2.8-1.8 4Zm-9.7-5.5H8a13 13 0 0 1 0-4.4H4.3a8 8 0 0 0 0 4.4Zm5.2 0h5c.2-1.5.2-3 0-4.4h-5c-.2 1.5-.2 3 0 4.4Zm6.5 0h3.7a8 8 0 0 0 0-4.4H16c.2 1.5.2 3 0 4.4Zm-.3-5.9H19c-1-2-3-3.5-5.2-4 .8 1.2 1.4 2.6 1.8 4Zm-5.8 0H14A12 12 0 0 0 12 4a12 12 0 0 0-2.1 4.3Zm-5 0h3.4c.4-1.4 1-2.8 1.8-4-2.3.5-4.1 2-5.2 4Z" })
          ], -1)),
          s("span", fi, _(e.openerLabel), 1),
          (t(), l("svg", {
            class: w(["dads-language-selector__opener-arrow", { "dads-language-selector__opener-arrow--open": p.value }]),
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "currentcolor",
            "aria-hidden": "true"
          }, [...K[0] || (K[0] = [
            s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)
          ])], 2))
        ], 40, vi),
        ye(s("div", {
          id: b.value,
          class: "dads-language-selector__popup"
        }, [
          s("ul", {
            ref_key: "menuRef",
            ref: o,
            class: "dads-language-selector__menu",
            role: "menu",
            "aria-labelledby": m.value,
            onKeydown: X
          }, [
            (t(!0), l(H, null, U(e.options, (A, F) => (t(), l("li", {
              key: A.value,
              role: "none",
              class: "dads-language-selector__item-wrap"
            }, [
              s("a", {
                id: c(F),
                ref_for: !0,
                ref: Z(F),
                role: "menuitem",
                class: w(["dads-language-selector__item", { "dads-language-selector__item--current": u(A) }]),
                href: A.href ?? "#",
                lang: A.value,
                hreflang: A.value,
                "aria-current": u(A) ? "true" : void 0,
                tabindex: "-1",
                onClick: (O) => I(A, O)
              }, [
                K[2] || (K[2] = s("svg", {
                  class: "dads-language-selector__check",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "currentcolor",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z" })
                ], -1)),
                s("span", gi, _(A.label), 1)
              ], 10, _i)
            ]))), 128))
          ], 40, mi)
        ], 8, hi), [
          [ke, p.value]
        ])
      ])
    ], 2));
  }
}), gu = /* @__PURE__ */ N(pi, [["__scopeId", "data-v-b0342960"]]), yi = {
  key: 0,
  class: "dads-menu-list__section",
  role: "presentation"
}, ki = { class: "dads-menu-list__section-title" }, $i = {
  key: 1,
  class: "dads-menu-list__divider"
}, xi = ["href", "aria-current", "onClick"], wi = { class: "dads-menu-list__label" }, Li = ["role", "aria-label", "aria-hidden"], Ii = ["disabled", "aria-current", "aria-expanded", "onClick"], Ci = { class: "dads-menu-list__label" }, Di = ["role", "aria-label", "aria-hidden"], Bi = {
  key: 0,
  class: "dads-menu-list__section",
  role: "presentation"
}, Vi = { class: "dads-menu-list__section-title" }, Ai = {
  key: 1,
  class: "dads-menu-list__divider"
}, Mi = ["href", "aria-current", "onClick"], Si = { class: "dads-menu-list__label" }, zi = ["role", "aria-label", "aria-hidden"], Ti = ["disabled", "aria-current", "aria-expanded", "onClick"], Fi = { class: "dads-menu-list__label" }, Ei = ["role", "aria-label", "aria-hidden"], qi = /* @__PURE__ */ R({
  __name: "DadsMenuList",
  props: {
    items: {},
    type: { default: "standard" },
    size: { default: "regular" },
    indentation: { default: 0 },
    ariaLabel: { default: void 0 }
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => a.indentation + 1), m = d(
      () => a.indentation > 0 ? { "--menu-list-indentation": String(a.indentation) } : void 0
    ), b = (o) => !!o.href && !o.disabled, c = (o) => ({
      class: "dads-menu-list__item",
      "data-type": a.type,
      "data-size": a.size,
      ...o.active ? { "data-current": "" } : {},
      ...o.expanded ? { "data-expanded": "" } : {}
    }), n = (o, y) => {
      if (o.disabled) {
        y.preventDefault();
        return;
      }
      r("click:item", o, y);
    }, i = (o, y) => {
      r("click:item", o, y);
    };
    return (o, y) => {
      const p = Ke("DadsMenuList", !0);
      return e.ariaLabel ? (t(), ae(ue(e.ariaLabel ? "nav" : "ul"), {
        key: 0,
        class: "dads-menu-list-root",
        "aria-label": e.ariaLabel
      }, {
        default: se(() => [
          s("ul", {
            class: "dads-menu-list",
            style: Le(m.value)
          }, [
            (t(!0), l(H, null, U(e.items, (u, f) => (t(), l("li", { key: f }, [
              u.divider ? (t(), l(H, { key: 0 }, [
                typeof u.divider == "object" && u.divider.title ? (t(), l("div", yi, [
                  s("span", ki, _(u.divider.title), 1)
                ])) : (t(), l("hr", $i))
              ], 64)) : b(u) ? (t(), l("a", be({
                key: 1,
                ref_for: !0
              }, c(u), {
                href: u.href,
                "aria-current": u.active ? "page" : void 0,
                onClick: ($) => n(u, $)
              }), [
                u.frontIcon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", u.frontIcon, "dads-menu-list__front-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : v("", !0),
                s("span", wi, [
                  Q(_(u.label) + " ", 1),
                  u.tailIcon ? (t(), l("i", {
                    key: 0,
                    class: w(["mdi", u.tailIcon, "dads-menu-list__tail-icon"]),
                    role: u.tailIconLabel ? "img" : void 0,
                    "aria-label": u.tailIconLabel || void 0,
                    "aria-hidden": u.tailIconLabel ? void 0 : "true"
                  }, null, 10, Li)) : v("", !0)
                ]),
                u.endIcon ? (t(), l("i", {
                  key: 1,
                  class: w(["mdi", u.endIcon, "dads-menu-list__end-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : v("", !0)
              ], 16, xi)) : (t(), l("button", be({
                key: 2,
                type: "button"
              }, { ref_for: !0 }, c(u), {
                disabled: u.disabled || void 0,
                "aria-current": u.active ? "page" : void 0,
                "aria-expanded": u.children && u.children.length > 0 ? !!u.expanded : void 0,
                onClick: ($) => n(u, $)
              }), [
                u.frontIcon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", u.frontIcon, "dads-menu-list__front-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : v("", !0),
                s("span", Ci, [
                  Q(_(u.label) + " ", 1),
                  u.tailIcon ? (t(), l("i", {
                    key: 0,
                    class: w(["mdi", u.tailIcon, "dads-menu-list__tail-icon"]),
                    role: u.tailIconLabel ? "img" : void 0,
                    "aria-label": u.tailIconLabel || void 0,
                    "aria-hidden": u.tailIconLabel ? void 0 : "true"
                  }, null, 10, Di)) : v("", !0)
                ]),
                u.endIcon ? (t(), l("i", {
                  key: 1,
                  class: w(["mdi", u.endIcon, "dads-menu-list__end-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : v("", !0)
              ], 16, Ii)),
              u.children && u.children.length > 0 ? (t(), ae(p, {
                key: 3,
                items: u.children,
                type: e.type,
                size: e.size,
                indentation: h.value,
                "onClick:item": i
              }, null, 8, ["items", "type", "size", "indentation"])) : v("", !0)
            ]))), 128))
          ], 4)
        ]),
        _: 1
      }, 8, ["aria-label"])) : (t(), l("ul", {
        key: 1,
        class: "dads-menu-list",
        style: Le(m.value)
      }, [
        (t(!0), l(H, null, U(e.items, (u, f) => (t(), l("li", { key: f }, [
          u.divider ? (t(), l(H, { key: 0 }, [
            typeof u.divider == "object" && u.divider.title ? (t(), l("div", Bi, [
              s("span", Vi, _(u.divider.title), 1)
            ])) : (t(), l("hr", Ai))
          ], 64)) : b(u) ? (t(), l("a", be({
            key: 1,
            ref_for: !0
          }, c(u), {
            href: u.href,
            "aria-current": u.active ? "page" : void 0,
            onClick: ($) => n(u, $)
          }), [
            u.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", u.frontIcon, "dads-menu-list__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0),
            s("span", Si, [
              Q(_(u.label) + " ", 1),
              u.tailIcon ? (t(), l("i", {
                key: 0,
                class: w(["mdi", u.tailIcon, "dads-menu-list__tail-icon"]),
                role: u.tailIconLabel ? "img" : void 0,
                "aria-label": u.tailIconLabel || void 0,
                "aria-hidden": u.tailIconLabel ? void 0 : "true"
              }, null, 10, zi)) : v("", !0)
            ]),
            u.endIcon ? (t(), l("i", {
              key: 1,
              class: w(["mdi", u.endIcon, "dads-menu-list__end-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0)
          ], 16, Mi)) : (t(), l("button", be({
            key: 2,
            type: "button"
          }, { ref_for: !0 }, c(u), {
            disabled: u.disabled || void 0,
            "aria-current": u.active ? "page" : void 0,
            "aria-expanded": u.children && u.children.length > 0 ? !!u.expanded : void 0,
            onClick: ($) => n(u, $)
          }), [
            u.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", u.frontIcon, "dads-menu-list__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0),
            s("span", Fi, [
              Q(_(u.label) + " ", 1),
              u.tailIcon ? (t(), l("i", {
                key: 0,
                class: w(["mdi", u.tailIcon, "dads-menu-list__tail-icon"]),
                role: u.tailIconLabel ? "img" : void 0,
                "aria-label": u.tailIconLabel || void 0,
                "aria-hidden": u.tailIconLabel ? void 0 : "true"
              }, null, 10, Ei)) : v("", !0)
            ]),
            u.endIcon ? (t(), l("i", {
              key: 1,
              class: w(["mdi", u.endIcon, "dads-menu-list__end-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0)
          ], 16, Ti)),
          u.children && u.children.length > 0 ? (t(), ae(p, {
            key: 3,
            items: u.children,
            type: e.type,
            size: e.size,
            indentation: h.value,
            "onClick:item": i
          }, null, 8, ["items", "type", "size", "indentation"])) : v("", !0)
        ]))), 128))
      ], 4));
    };
  }
}), ea = /* @__PURE__ */ N(qi, [["__scopeId", "data-v-4e5534be"]]), Ri = ["aria-expanded", "aria-controls"], Ni = { class: "dads-menu-list-box__trigger-label" }, Pi = ["id"], Hi = ["aria-label"], Oi = ["href", "aria-current", "aria-disabled", "data-current", "onClick"], Ki = { class: "dads-menu-list-box__item-body" }, ji = { class: "dads-menu-list-box__item-label" }, Ui = {
  key: 0,
  class: "dads-menu-list-box__item-description"
}, Zi = ["disabled", "aria-current", "aria-disabled", "data-current", "onClick"], Yi = { class: "dads-menu-list-box__item-body" }, Gi = { class: "dads-menu-list-box__item-label" }, Wi = {
  key: 0,
  class: "dads-menu-list-box__item-description"
}, Qi = /* @__PURE__ */ R({
  __name: "DadsMenuListBox",
  props: {
    items: {},
    ariaLabel: {},
    modelValue: { type: Boolean, default: !1 },
    triggerLabel: {},
    triggerIcon: {},
    triggerSize: { default: "md" },
    placement: { default: "start" }
  },
  emits: ["click:item", "update:modelValue", "open", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => !!a.triggerLabel), m = d(() => h.value ? a.modelValue : !0), b = le();
    re(
      () => a.modelValue,
      (p, u) => {
        h.value && p !== u && r(p ? "open" : "close");
      }
    );
    const c = () => {
      h.value && r("update:modelValue", !a.modelValue);
    }, n = d(
      () => a.items.map((p, u) => {
        const f = !!p.href && !p.disabled;
        return { item: p, index: u, isLink: f };
      })
    ), i = (p, u, f) => {
      if (p.disabled) {
        f.preventDefault();
        return;
      }
      r("click:item", p, u, f);
    }, o = d(() => [
      "dads-menu-list-box",
      {
        "dads-menu-list-box--with-opener": h.value,
        [`dads-menu-list-box--placement-${a.placement}`]: h.value
      }
    ]), y = d(() => [
      "dads-menu-list-box__trigger",
      `dads-menu-list-box__trigger--${a.triggerSize}`
    ]);
    return (p, u) => (t(), l("div", {
      class: w(o.value)
    }, [
      h.value ? (t(), l("button", {
        key: 0,
        type: "button",
        class: w(y.value),
        "aria-expanded": m.value ? "true" : "false",
        "aria-controls": Ve(b),
        onClick: c
      }, [
        e.triggerIcon ? (t(), l("i", {
          key: 0,
          class: w(["mdi", e.triggerIcon, "dads-menu-list-box__trigger-icon"]),
          "aria-hidden": "true"
        }, null, 2)) : v("", !0),
        s("span", Ni, _(e.triggerLabel), 1),
        u[0] || (u[0] = s("i", {
          class: "mdi mdi-chevron-down dads-menu-list-box__trigger-caret",
          "aria-hidden": "true"
        }, null, -1))
      ], 10, Ri)) : v("", !0),
      ye(s("div", {
        id: Ve(b),
        class: "dads-menu-list-box__surface"
      }, [
        s("ul", {
          class: "dads-menu-list-box__list",
          role: "menu",
          "aria-label": e.ariaLabel
        }, [
          (t(!0), l(H, null, U(n.value, (f) => (t(), l("li", {
            key: f.index,
            class: "dads-menu-list-box__list-item",
            role: "presentation"
          }, [
            f.isLink ? (t(), l("a", {
              key: 0,
              href: f.item.href,
              class: w(["dads-menu-list-box__item", {
                "dads-menu-list-box__item--active": f.item.active,
                "dads-menu-list-box__item--disabled": f.item.disabled
              }]),
              role: "menuitem",
              "aria-current": f.item.active ? "page" : void 0,
              "aria-disabled": f.item.disabled || void 0,
              "data-current": f.item.active ? "" : void 0,
              onClick: ($) => i(f.item, f.index, $)
            }, [
              f.item.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", f.item.iconName, "dads-menu-list-box__item-icon"]),
                "aria-hidden": "true"
              }, null, 2)) : v("", !0),
              s("span", Ki, [
                s("span", ji, _(f.item.label), 1),
                f.item.description ? (t(), l("span", Ui, _(f.item.description), 1)) : v("", !0)
              ])
            ], 10, Oi)) : (t(), l("button", {
              key: 1,
              type: "button",
              class: w(["dads-menu-list-box__item", {
                "dads-menu-list-box__item--active": f.item.active,
                "dads-menu-list-box__item--disabled": f.item.disabled
              }]),
              role: "menuitem",
              disabled: f.item.disabled,
              "aria-current": f.item.active ? "page" : void 0,
              "aria-disabled": f.item.disabled || void 0,
              "data-current": f.item.active ? "" : void 0,
              onClick: ($) => i(f.item, f.index, $)
            }, [
              f.item.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", f.item.iconName, "dads-menu-list-box__item-icon"]),
                "aria-hidden": "true"
              }, null, 2)) : v("", !0),
              s("span", Yi, [
                s("span", Gi, _(f.item.label), 1),
                f.item.description ? (t(), l("span", Wi, _(f.item.description), 1)) : v("", !0)
              ])
            ], 10, Zi))
          ]))), 128))
        ], 8, Hi)
      ], 8, Pi), [
        [ke, m.value]
      ])
    ], 2));
  }
}), pu = /* @__PURE__ */ N(Qi, [["__scopeId", "data-v-b9bc5f92"]]), Ji = ["aria-expanded", "aria-controls", "aria-label", "disabled"], Xi = {
  key: 0,
  class: "dads-hamburger-menu-button__icon",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, eo = {
  key: 1,
  class: "dads-hamburger-menu-button__icon",
  width: "24",
  height: "24",
  viewBox: "0 0 120 120",
  "aria-hidden": "true"
}, ao = {
  key: 2,
  class: "dads-hamburger-menu-button__label"
}, to = /* @__PURE__ */ R({
  __name: "DadsHamburgerMenuButton",
  props: {
    modelValue: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    ariaControls: {},
    openLabel: { default: "メニュー" },
    closeLabel: { default: "閉じる" },
    size: { default: "md" },
    variant: { default: "default" }
  },
  emits: ["update:modelValue", "click"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => !!a.modelValue), m = d(() => [
      "dads-hamburger-menu-button",
      `dads-hamburger-menu-button--${a.size}`,
      `dads-hamburger-menu-button--variant-${a.variant}`,
      {
        "dads-hamburger-menu-button--open": h.value
      }
    ]), b = d(() => a.variant === "icon-only"), c = d(() => b.value ? n.value : void 0), n = d(() => h.value ? a.closeLabel : a.openLabel), i = (o) => {
      if (a.disabled) {
        o.preventDefault();
        return;
      }
      r("update:modelValue", !h.value), r("click", o);
    };
    return (o, y) => (t(), l("button", {
      type: "button",
      class: w(m.value),
      "aria-expanded": h.value,
      "aria-controls": e.ariaControls,
      "aria-label": c.value,
      disabled: e.disabled || void 0,
      onClick: i
    }, [
      h.value ? (t(), l("svg", eo, [...y[1] || (y[1] = [
        s("path", {
          d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
          fill: "currentcolor"
        }, null, -1)
      ])])) : (t(), l("svg", Xi, [...y[0] || (y[0] = [
        s("path", {
          d: "M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z",
          fill: "currentcolor"
        }, null, -1)
      ])])),
      b.value ? v("", !0) : (t(), l("span", ao, _(n.value), 1))
    ], 10, Ji));
  }
}), yu = /* @__PURE__ */ N(to, [["__scopeId", "data-v-b3c58836"]]), lo = ["aria-label"], so = ["href", "target", "rel", "onClick"], io = { class: "dads-utility-link__label" }, oo = ["aria-label"], no = ["href", "target", "rel"], ro = { class: "dads-utility-link__label" }, uo = ["aria-label"], co = /* @__PURE__ */ R({
  __name: "DadsUtilityLink",
  props: {
    href: {},
    label: {},
    iconName: {},
    external: { type: Boolean },
    items: {},
    ariaLabel: { default: "ユーティリティリンク" },
    newTabAriaLabel: { default: "新規タブで開きます" }
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => a.items !== void 0 ? a.items : a.href === void 0 || a.label === void 0 ? [] : [
      {
        label: a.label,
        href: a.href,
        iconName: a.iconName,
        external: a.external
      }
    ]), m = d(() => a.items !== void 0), b = (c, n, i) => {
      r("click:item", c, n, i);
    };
    return (c, n) => m.value ? (t(), l("ul", {
      key: 0,
      class: "dads-utility-link-list",
      "aria-label": e.ariaLabel
    }, [
      (t(!0), l(H, null, U(h.value, (i, o) => (t(), l("li", {
        key: `${i.href}-${o}`,
        class: "dads-utility-link-list__item"
      }, [
        s("a", {
          class: "dads-utility-link",
          href: i.href,
          target: i.external ? "_blank" : void 0,
          rel: i.external ? "noopener noreferrer" : void 0,
          onClick: (y) => b(i, o, y)
        }, [
          i.iconName ? (t(), l("i", {
            key: 0,
            class: w(["mdi", i.iconName, "dads-utility-link__lead-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : v("", !0),
          s("span", io, _(i.label), 1),
          i.external ? (t(), l("svg", {
            key: 1,
            class: "dads-utility-link__tail-icon",
            width: "16",
            height: "16",
            viewBox: "0 0 48 48",
            fill: "currentcolor",
            role: "img",
            "aria-label": e.newTabAriaLabel
          }, [...n[1] || (n[1] = [
            s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)
          ])], 8, oo)) : v("", !0)
        ], 8, so)
      ]))), 128))
    ], 8, lo)) : h.value.length === 1 ? (t(), l("a", {
      key: 1,
      class: "dads-utility-link",
      href: h.value[0].href,
      target: h.value[0].external ? "_blank" : void 0,
      rel: h.value[0].external ? "noopener noreferrer" : void 0,
      onClick: n[0] || (n[0] = (i) => b(h.value[0], 0, i))
    }, [
      h.value[0].iconName ? (t(), l("i", {
        key: 0,
        class: w(["mdi", h.value[0].iconName, "dads-utility-link__lead-icon"]),
        "aria-hidden": "true"
      }, null, 2)) : v("", !0),
      s("span", ro, _(h.value[0].label), 1),
      h.value[0].external ? (t(), l("svg", {
        key: 1,
        class: "dads-utility-link__tail-icon",
        width: "16",
        height: "16",
        viewBox: "0 0 48 48",
        fill: "currentcolor",
        role: "img",
        "aria-label": e.newTabAriaLabel
      }, [...n[2] || (n[2] = [
        s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)
      ])], 8, uo)) : v("", !0)
    ], 8, no)) : v("", !0);
  }
}), bo = /* @__PURE__ */ N(co, [["__scopeId", "data-v-2ed77fbc"]]), vo = ["aria-label", "disabled"], fo = { class: "dads-scroll-top-button__label" }, ho = /* @__PURE__ */ R({
  __name: "DadsScrollTopButton",
  props: {
    showOffset: { default: 200 },
    ariaLabel: { default: "ページの先頭へ戻る" },
    position: { default: "bottom-right" },
    disabled: { type: Boolean, default: !1 },
    defaultLabel: { default: "トップへ" }
  },
  emits: ["click"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(0), m = d(() => h.value > a.showOffset), b = d(() => [
      "dads-scroll-top-button",
      `dads-scroll-top-button--${a.position}`
    ]), c = () => {
      typeof window > "u" || (h.value = window.scrollY);
    }, n = (i) => {
      if (a.disabled) {
        i.preventDefault();
        return;
      }
      typeof window < "u" && window.scrollTo({ top: 0, behavior: "smooth" }), r("click", i);
    };
    return ve(() => {
      typeof window > "u" || (h.value = window.scrollY, window.addEventListener("scroll", c, { passive: !0 }));
    }), _e(() => {
      typeof window > "u" || window.removeEventListener("scroll", c);
    }), (i, o) => ye((t(), l("button", {
      type: "button",
      class: w(b.value),
      "aria-label": e.ariaLabel,
      disabled: e.disabled,
      onClick: n
    }, [
      o[0] || (o[0] = s("span", {
        class: "dads-scroll-top-button__icon",
        "aria-hidden": "true"
      }, [
        s("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          focusable: "false"
        }, [
          s("path", {
            d: "M10 15V5M10 5L5 10M10 5L15 10",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        ])
      ], -1)),
      s("span", fo, [
        j(i.$slots, "default", {}, () => [
          Q(_(e.defaultLabel), 1)
        ], !0)
      ])
    ], 10, vo)), [
      [ke, m.value]
    ]);
  }
}), ku = /* @__PURE__ */ N(ho, [["__scopeId", "data-v-849a898e"]]), mo = ["aria-label"], _o = { class: "dads-global-menu" }, go = ["href", "aria-current", "aria-disabled", "tabindex", "onClick"], po = { class: "dads-global-menu__label" }, yo = ["disabled", "aria-current", "aria-haspopup", "aria-expanded", "onClick"], ko = { class: "dads-global-menu__label" }, $o = {
  key: 1,
  class: /* @__PURE__ */ w(["mdi", "mdi-chevron-down", "dads-global-menu__chevron"]),
  "aria-hidden": "true"
}, xo = /* @__PURE__ */ R({
  __name: "DadsGlobalMenu",
  props: {
    items: {},
    ariaLabel: { default: "グローバルメニュー" }
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = g, r = (b) => Array.isArray(b.children) && b.children.length > 0, h = (b) => !!b.href && !r(b), m = (b, c) => {
      if (b.disabled) {
        c.preventDefault();
        return;
      }
      a("click:item", b, c);
    };
    return (b, c) => (t(), l("nav", {
      class: "dads-global-menu-root",
      "aria-label": e.ariaLabel
    }, [
      s("ul", _o, [
        (t(!0), l(H, null, U(e.items, (n, i) => (t(), l("li", {
          key: i,
          class: "dads-global-menu__item"
        }, [
          h(n) ? (t(), l("a", {
            key: 0,
            class: "dads-global-menu__item-inner",
            href: n.disabled ? void 0 : n.href,
            "aria-current": n.active ? "page" : void 0,
            "aria-disabled": n.disabled ? "true" : void 0,
            tabindex: n.disabled ? -1 : void 0,
            onClick: (o) => m(n, o)
          }, [
            n.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", n.frontIcon, "dads-global-menu__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0),
            s("span", po, _(n.label), 1)
          ], 8, go)) : (t(), l("button", {
            key: 1,
            type: "button",
            class: "dads-global-menu__item-inner",
            disabled: n.disabled || void 0,
            "aria-current": n.active ? "page" : void 0,
            "aria-haspopup": r(n) ? "menu" : void 0,
            "aria-expanded": r(n) ? !!n.expanded : void 0,
            onClick: (o) => m(n, o)
          }, [
            n.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", n.frontIcon, "dads-global-menu__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : v("", !0),
            s("span", ko, _(n.label), 1),
            r(n) ? (t(), l("i", $o)) : v("", !0)
          ], 8, yo))
        ]))), 128))
      ])
    ], 8, mo));
  }
}), $u = /* @__PURE__ */ N(xo, [["__scopeId", "data-v-923eeb2e"]]), wo = ["id", "aria-expanded", "aria-controls"], Lo = { class: "dads-mega-menu__trigger-label" }, Io = ["id", "aria-label", "aria-labelledby"], Co = { class: "dads-mega-menu__columns" }, Do = {
  key: 0,
  class: "dads-mega-menu__heading"
}, Bo = /* @__PURE__ */ R({
  __name: "DadsMegaMenu",
  props: {
    modelValue: { type: Boolean, default: !1 },
    triggerLabel: {},
    columns: {},
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue", "click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-mega-menu-trigger-${h}`), b = d(() => `dads-mega-menu-panel-${h}`), c = P(null), n = P(null), i = d(() => a.modelValue), o = () => {
      i.value || r("update:modelValue", !0);
    }, y = (x = !1) => {
      i.value && (r("update:modelValue", !1), x && n.value?.focus());
    }, p = () => {
      i.value ? y() : o();
    }, u = (x) => {
      x.preventDefault(), p();
    }, f = (x) => {
      switch (x.key) {
        case "Enter":
        case " ":
          x.preventDefault(), p();
          break;
        case "ArrowDown":
          x.preventDefault(), o();
          break;
      }
    }, $ = (x) => {
      x.key === "Escape" && (x.preventDefault(), y(!0));
    }, k = (x, C) => {
      r("click:item", x, C), x.disabled || y();
    }, L = (x) => {
      if (!i.value) return;
      const C = x.target;
      C && c.value && c.value.contains(C) || y();
    };
    ve(() => {
      document.addEventListener("pointerdown", L, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", L, !0);
    });
    const I = (x) => {
      x.key === "Escape" && i.value && (x.preventDefault(), y(!0));
    };
    return re(
      () => a.modelValue,
      () => {
      }
    ), (x, C) => (t(), l("div", {
      ref_key: "rootRef",
      ref: c,
      class: w(["dads-mega-menu", { "dads-mega-menu--open": i.value }])
    }, [
      s("button", {
        id: m.value,
        ref_key: "triggerRef",
        ref: n,
        type: "button",
        class: "dads-mega-menu__trigger",
        "aria-expanded": i.value,
        "aria-controls": b.value,
        "aria-haspopup": "dialog",
        onClick: u,
        onKeydown: [
          f,
          Be(I, ["esc"])
        ]
      }, [
        s("span", Lo, _(e.triggerLabel), 1),
        (t(), l("svg", {
          class: w(["dads-mega-menu__trigger-arrow", { "dads-mega-menu__trigger-arrow--open": i.value }]),
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "currentcolor",
          "aria-hidden": "true"
        }, [...C[0] || (C[0] = [
          s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)
        ])], 2))
      ], 40, wo),
      ye(s("div", {
        id: b.value,
        class: "dads-mega-menu__panel",
        role: "dialog",
        "aria-label": e.ariaLabel || e.triggerLabel,
        "aria-labelledby": e.ariaLabel ? void 0 : m.value,
        onKeydown: $
      }, [
        s("div", Co, [
          (t(!0), l(H, null, U(e.columns, (B, q) => (t(), l("section", {
            key: q,
            class: "dads-mega-menu__column"
          }, [
            B.heading ? (t(), l("h3", Do, _(B.heading), 1)) : v("", !0),
            Ie(ea, {
              items: B.items,
              "onClick:item": k
            }, null, 8, ["items"])
          ]))), 128))
        ])
      ], 40, Io), [
        [ke, i.value]
      ])
    ], 2));
  }
}), xu = /* @__PURE__ */ N(Bo, [["__scopeId", "data-v-c4f46c2b"]]), Vo = ["aria-label"], Ao = { class: "dads-page-navigation__list" }, Mo = {
  key: 0,
  class: "dads-page-navigation__item"
}, So = ["disabled", "aria-label"], zo = {
  key: 1,
  class: "dads-page-navigation__item"
}, To = ["disabled"], Fo = { class: "dads-page-navigation__label" }, Eo = {
  key: 0,
  class: "dads-page-navigation__item"
}, qo = {
  key: 1,
  class: "dads-page-navigation__item"
}, Ro = ["aria-current", "disabled", "onClick"], No = {
  key: 2,
  class: "dads-page-navigation__item"
}, Po = ["disabled"], Ho = { class: "dads-page-navigation__label" }, Oo = {
  key: 3,
  class: "dads-page-navigation__item"
}, Ko = ["disabled", "aria-label"], jo = /* @__PURE__ */ R({
  __name: "DadsPageNavigation",
  props: {
    modelValue: {},
    totalPages: {},
    maxPageButtons: { default: 7 },
    showPrevNext: { type: Boolean, default: !0 },
    showFirstLast: { type: Boolean, default: !1 },
    prevLabel: { default: "前のページ" },
    nextLabel: { default: "次のページ" },
    firstLabel: { default: "最初のページ" },
    lastLabel: { default: "最後のページ" },
    ariaLabel: { default: "ページ送り" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => {
      const y = Math.max(1, Math.floor(a.totalPages)), p = Math.max(0, Math.floor(a.maxPageButtons));
      if (p <= 0) return [];
      if (y <= p) return Array.from({ length: y }, (I, x) => x + 1);
      const u = Math.max(0, p - 2), f = Math.floor((u - 1) / 2);
      let $ = Math.max(2, a.modelValue - f), k = Math.min(y - 1, $ + u - 1);
      k - $ + 1 < u && ($ = Math.max(2, k - u + 1));
      const L = [1];
      $ > 2 && L.push("ellipsis");
      for (let I = $; I <= k; I++) L.push(I);
      return k < y - 1 && L.push("ellipsis"), L.push(y), L;
    }), m = (y) => y === a.modelValue, b = d(() => a.disabled || a.modelValue <= 1), c = d(() => a.disabled || a.modelValue >= a.totalPages), n = b, i = c, o = (y) => {
      if (a.disabled) return;
      const p = Math.max(1, Math.min(a.totalPages, Math.floor(y)));
      p !== a.modelValue && (r("update:modelValue", p), r("change", p));
    };
    return (y, p) => (t(), l("nav", {
      class: "dads-page-navigation",
      "aria-label": e.ariaLabel
    }, [
      s("ul", Ao, [
        e.showFirstLast ? (t(), l("li", Mo, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--first",
            disabled: Ve(n) || void 0,
            "aria-label": e.firstLabel,
            onClick: p[0] || (p[0] = (u) => o(1))
          }, [...p[4] || (p[4] = [
            s("i", {
              class: "mdi mdi-chevron-double-left",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, So)
        ])) : v("", !0),
        e.showPrevNext ? (t(), l("li", zo, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--prev",
            disabled: b.value || void 0,
            onClick: p[1] || (p[1] = (u) => o(e.modelValue - 1))
          }, [
            p[5] || (p[5] = s("i", {
              class: "mdi mdi-chevron-left",
              "aria-hidden": "true"
            }, null, -1)),
            s("span", Fo, _(e.prevLabel), 1)
          ], 8, To)
        ])) : v("", !0),
        (t(!0), l(H, null, U(h.value, (u, f) => (t(), l(H, {
          key: `p-${f}-${u}`
        }, [
          u === "ellipsis" ? (t(), l("li", Eo, [...p[6] || (p[6] = [
            s("span", {
              class: "dads-page-navigation__ellipsis",
              "aria-hidden": "true"
            }, "…", -1)
          ])])) : (t(), l("li", qo, [
            s("button", {
              type: "button",
              class: w(["dads-page-navigation__btn dads-page-navigation__btn--page", { "is-active": m(u) }]),
              "aria-current": m(u) ? "page" : void 0,
              disabled: e.disabled || void 0,
              onClick: ($) => o(u)
            }, _(u), 11, Ro)
          ]))
        ], 64))), 128)),
        e.showPrevNext ? (t(), l("li", No, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--next",
            disabled: c.value || void 0,
            onClick: p[2] || (p[2] = (u) => o(e.modelValue + 1))
          }, [
            s("span", Ho, _(e.nextLabel), 1),
            p[7] || (p[7] = s("i", {
              class: "mdi mdi-chevron-right",
              "aria-hidden": "true"
            }, null, -1))
          ], 8, Po)
        ])) : v("", !0),
        e.showFirstLast ? (t(), l("li", Oo, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--last",
            disabled: Ve(i) || void 0,
            "aria-label": e.lastLabel,
            onClick: p[3] || (p[3] = (u) => o(e.totalPages))
          }, [...p[8] || (p[8] = [
            s("i", {
              class: "mdi mdi-chevron-double-right",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, Ko)
        ])) : v("", !0)
      ])
    ], 8, Vo));
  }
}), wu = /* @__PURE__ */ N(jo, [["__scopeId", "data-v-e58e8fce"]]), Uo = ["aria-label"], Zo = { class: "dads-table-of-contents__list" }, Yo = ["href", "aria-current", "onClick"], Go = {
  key: 0,
  class: "dads-table-of-contents__list dads-table-of-contents__list--nested"
}, Wo = ["href", "aria-current", "onClick"], Qo = /* @__PURE__ */ R({
  __name: "DadsTableOfContents",
  props: {
    items: {},
    activeId: { default: void 0 },
    ariaLabel: { default: "このページの目次" }
  },
  emits: ["click:item"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = (c) => c.href ?? `#${c.id}`, m = (c) => a.activeId !== void 0 && a.activeId === c.id, b = (c, n) => {
      r("click:item", c, n);
    };
    return (c, n) => (t(), l("nav", {
      class: "dads-table-of-contents",
      "aria-label": e.ariaLabel
    }, [
      s("ul", Zo, [
        (t(!0), l(H, null, U(e.items, (i) => (t(), l("li", {
          key: i.id,
          class: w(["dads-table-of-contents__item", { "dads-table-of-contents__item--active": m(i) }])
        }, [
          s("a", {
            class: w(["dads-table-of-contents__link", { "dads-table-of-contents__link--active": m(i) }]),
            href: h(i),
            "aria-current": m(i) ? "location" : void 0,
            onClick: (o) => b(i, o)
          }, _(i.label), 11, Yo),
          i.children && i.children.length > 0 ? (t(), l("ul", Go, [
            (t(!0), l(H, null, U(i.children, (o) => (t(), l("li", {
              key: o.id,
              class: w(["dads-table-of-contents__item dads-table-of-contents__item--nested", { "dads-table-of-contents__item--active": m(o) }])
            }, [
              s("a", {
                class: w(["dads-table-of-contents__link dads-table-of-contents__link--nested", { "dads-table-of-contents__link--active": m(o) }]),
                href: h(o),
                "aria-current": m(o) ? "location" : void 0,
                onClick: (y) => b(o, y)
              }, _(o.label), 11, Wo)
            ], 2))), 128))
          ])) : v("", !0)
        ], 2))), 128))
      ])
    ], 8, Uo));
  }
}), Lu = /* @__PURE__ */ N(Qo, [["__scopeId", "data-v-483f7e82"]]), Jo = ["aria-label"], Xo = { class: "dads-bottom-navigation__list" }, en = ["href", "aria-current", "aria-disabled", "tabindex", "onClick"], an = { class: "dads-bottom-navigation__label" }, tn = ["aria-current", "disabled", "onClick"], ln = { class: "dads-bottom-navigation__label" }, sn = /* @__PURE__ */ R({
  __name: "DadsBottomNavigation",
  props: {
    modelValue: { default: void 0 },
    items: {},
    ariaLabel: { default: "ボトムナビゲーション" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = g, r = (b, c) => c !== void 0 && b.id === c, h = (b, c) => {
      if (b.disabled) {
        c.preventDefault();
        return;
      }
      a("update:modelValue", b.id), a("change", b.id);
    }, m = (b, c) => [
      "dads-bottom-navigation__item",
      {
        "dads-bottom-navigation__item--active": r(b, c),
        "dads-bottom-navigation__item--disabled": b.disabled
      }
    ];
    return (b, c) => (t(), l("nav", {
      "aria-label": e.ariaLabel,
      class: "dads-bottom-navigation"
    }, [
      s("ul", Xo, [
        (t(!0), l(H, null, U(e.items, (n) => (t(), l("li", {
          key: n.id,
          class: "dads-bottom-navigation__list-item"
        }, [
          n.href !== void 0 ? (t(), l("a", {
            key: 0,
            href: n.disabled ? void 0 : n.href,
            "aria-current": r(n, e.modelValue) ? "page" : void 0,
            "aria-disabled": n.disabled ? "true" : void 0,
            tabindex: n.disabled ? -1 : void 0,
            class: w(m(n, e.modelValue)),
            onClick: (i) => h(n, i)
          }, [
            s("i", {
              class: w(["mdi", n.iconName, "dads-bottom-navigation__icon"]),
              "aria-hidden": "true"
            }, null, 2),
            s("span", an, _(n.label), 1)
          ], 10, en)) : (t(), l("button", {
            key: 1,
            type: "button",
            "aria-current": r(n, e.modelValue) ? "page" : void 0,
            disabled: n.disabled || void 0,
            class: w(m(n, e.modelValue)),
            onClick: (i) => h(n, i)
          }, [
            s("i", {
              class: w(["mdi", n.iconName, "dads-bottom-navigation__icon"]),
              "aria-hidden": "true"
            }, null, 2),
            s("span", ln, _(n.label), 1)
          ], 10, tn))
        ]))), 128))
      ])
    ], 8, Jo));
  }
}), Iu = /* @__PURE__ */ N(sn, [["__scopeId", "data-v-04f947a3"]]), dn = ["aria-label"], on = {
  key: 0,
  class: "dads-mobile-menu__header"
}, nn = ["aria-label"], rn = {
  key: 1,
  class: "dads-mobile-menu__panel-title"
}, un = ["aria-label"], cn = ["aria-label"], bn = {
  key: 1,
  class: "dads-mobile-menu__slide-list"
}, vn = ["href", "onClick"], fn = { class: "dads-mobile-menu__slide-item-label" }, hn = ["onClick"], mn = { class: "dads-mobile-menu__slide-item-label" }, _n = {
  key: 0,
  class: "mdi mdi-chevron-right dads-mobile-menu__slide-item-chevron",
  "aria-hidden": "true"
}, gn = {
  key: 1,
  class: "dads-mobile-menu__utility"
}, pn = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', yn = /* @__PURE__ */ R({
  __name: "DadsMobileMenu",
  props: {
    modelValue: { type: Boolean, default: !1 },
    items: {},
    type: { default: "accordion" },
    utilityItems: { default: void 0 },
    ariaLabel: { default: "モバイルメニュー" },
    navAriaLabel: { default: "メインナビゲーション" },
    subLinksAriaLabel: { default: "補助リンク" },
    closeLabel: { default: "閉じる" },
    backLabel: { default: "戻る" },
    showCloseButton: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "click:item", "click:utility"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(null), m = d(() => a.type === "slide"), b = P([]), c = d(() => b.value.length === 0 ? { items: a.items } : b.value[b.value.length - 1]), n = d(() => b.value.length > 0);
    let i = null;
    const o = () => {
      r("update:modelValue", !1);
    }, y = (L, I) => {
      r("click:item", L, I), (!L.children || L.children.length === 0) && o();
    }, p = (L, I) => {
      if (L.children && L.children.length > 0) {
        b.value.push({ label: L.label, items: L.children });
        return;
      }
      r("click:item", L, I), o();
    }, u = () => {
      b.value.pop();
    }, f = (L, I, x) => {
      r("click:utility", L, I, x), o();
    }, $ = () => h.value ? Array.from(h.value.querySelectorAll(pn)) : [], k = (L) => {
      const I = $();
      if (I.length === 0) return;
      const x = I[0], C = I[I.length - 1], B = document.activeElement;
      L.shiftKey ? (B === x || B === h.value) && (L.preventDefault(), C.focus()) : B === C && (L.preventDefault(), x.focus());
    };
    return re(
      () => a.modelValue,
      async (L) => {
        L ? (i = document.activeElement, b.value = [], await Ce(), h.value?.focus()) : i && (i.focus(), i = null);
      }
    ), (L, I) => (t(), ae(Fe, { to: "body" }, [
      Ie(Ae, { name: "dads-mobile-menu" }, {
        default: se(() => [
          e.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-mobile-menu", `dads-mobile-menu--type-${e.type}`]),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": e.ariaLabel,
            onKeydown: [
              Be(o, ["esc"]),
              Be(k, ["tab"])
            ]
          }, [
            s("div", {
              class: "dads-mobile-menu__overlay",
              "aria-hidden": "true",
              onClick: o
            }),
            s("div", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-mobile-menu__panel",
              tabindex: "-1"
            }, [
              e.showCloseButton || m.value && n.value ? (t(), l("header", on, [
                m.value && n.value ? (t(), l("button", {
                  key: 0,
                  type: "button",
                  class: "dads-mobile-menu__back",
                  "aria-label": e.backLabel,
                  onClick: u
                }, [
                  I[0] || (I[0] = s("i", {
                    class: "mdi mdi-chevron-left dads-mobile-menu__back-icon",
                    "aria-hidden": "true"
                  }, null, -1)),
                  s("span", null, _(e.backLabel), 1)
                ], 8, nn)) : v("", !0),
                m.value && c.value.label ? (t(), l("h2", rn, _(c.value.label), 1)) : v("", !0),
                e.showCloseButton ? (t(), l("button", {
                  key: 2,
                  type: "button",
                  class: "dads-mobile-menu__close",
                  "aria-label": e.closeLabel,
                  onClick: o
                }, [...I[1] || (I[1] = [
                  s("svg", {
                    class: "dads-mobile-menu__close-icon",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 120 120",
                    "aria-hidden": "true"
                  }, [
                    s("path", {
                      d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
                      fill: "currentcolor"
                    })
                  ], -1)
                ])], 8, un)) : v("", !0)
              ])) : v("", !0),
              s("nav", {
                class: "dads-mobile-menu__nav",
                "aria-label": e.navAriaLabel
              }, [
                m.value ? (t(), l("ul", bn, [
                  (t(!0), l(H, null, U(c.value.items, (x, C) => (t(), l("li", {
                    key: C,
                    class: "dads-mobile-menu__slide-item-wrap"
                  }, [
                    x.href && (!x.children || x.children.length === 0) ? (t(), l("a", {
                      key: 0,
                      href: x.href,
                      class: "dads-mobile-menu__slide-item",
                      onClick: (B) => p(x, B)
                    }, [
                      s("span", fn, _(x.label), 1)
                    ], 8, vn)) : (t(), l("button", {
                      key: 1,
                      type: "button",
                      class: w(["dads-mobile-menu__slide-item", {
                        "dads-mobile-menu__slide-item--parent": x.children && x.children.length > 0
                      }]),
                      onClick: (B) => p(x, B)
                    }, [
                      s("span", mn, _(x.label), 1),
                      x.children && x.children.length > 0 ? (t(), l("i", _n)) : v("", !0)
                    ], 10, hn))
                  ]))), 128))
                ])) : (t(), ae(ea, {
                  key: 0,
                  items: e.items,
                  type: "box",
                  "onClick:item": y
                }, null, 8, ["items"]))
              ], 8, cn),
              e.utilityItems && e.utilityItems.length > 0 ? (t(), l("div", gn, [
                Ie(bo, {
                  items: e.utilityItems,
                  "aria-label": e.subLinksAriaLabel,
                  "onClick:item": f
                }, null, 8, ["items", "aria-label"])
              ])) : v("", !0)
            ], 512)
          ], 42, dn)) : v("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Cu = /* @__PURE__ */ N(yn, [["__scopeId", "data-v-4d22e741"]]), kn = ["src", "alt", "width", "height", "loading"], $n = { class: "dads-image__caption" }, xn = ["src", "alt", "width", "height", "loading"], wn = /* @__PURE__ */ R({
  __name: "DadsImage",
  props: {
    src: {},
    alt: {},
    width: {},
    height: {},
    loading: { default: "lazy" },
    placeholder: {},
    objectFit: { default: "cover" },
    caption: {},
    showSkeleton: { type: Boolean, default: !0 }
  },
  emits: ["error", "load"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = P(!1), m = d(() => h.value && a.placeholder ? a.placeholder : a.src), b = P(!1), c = (o) => {
      h.value = !1, b.value = !0, r("load", o);
    }, n = (o) => {
      !h.value && a.placeholder && (h.value = !0), b.value = !0, r("error", o);
    }, i = d(() => [
      "dads-image",
      `dads-image--fit-${a.objectFit}`,
      {
        "dads-image--loaded": b.value,
        "dads-image--skeleton": a.showSkeleton && !b.value
      }
    ]);
    return (o, y) => e.caption ? (t(), l("figure", {
      key: 0,
      class: w(i.value)
    }, [
      s("img", {
        class: "dads-image__img",
        src: m.value,
        alt: e.alt,
        width: e.width,
        height: e.height,
        loading: e.loading,
        onError: n,
        onLoad: c
      }, null, 40, kn),
      s("figcaption", $n, _(e.caption), 1)
    ], 2)) : (t(), l("img", {
      key: 1,
      class: w([...i.value, "dads-image__img"]),
      src: m.value,
      alt: e.alt,
      width: e.width,
      height: e.height,
      loading: e.loading,
      onError: n,
      onLoad: c
    }, null, 42, xn));
  }
}), Du = /* @__PURE__ */ N(wn, [["__scopeId", "data-v-052b5191"]]), Ln = ["aria-label"], In = {
  key: 0,
  class: "dads-image-slider__header"
}, Cn = ["href"], Dn = {
  class: "dads-image-slider__viewport",
  "aria-live": "polite"
}, Bn = ["id", "aria-label", "aria-hidden"], Vn = ["src", "alt"], An = {
  key: 0,
  class: "dads-image-slider__caption"
}, Mn = ["aria-label", "disabled"], Sn = ["aria-label", "disabled"], zn = ["aria-label"], Tn = ["aria-selected", "aria-controls", "aria-label", "onClick"], Fn = /* @__PURE__ */ R({
  __name: "DadsImageSlider",
  props: {
    modelValue: { default: 0 },
    slides: {},
    autoPlay: { type: Boolean, default: !1 },
    interval: { default: 5e3 },
    pauseOnHover: { type: Boolean, default: !0 },
    showArrows: { type: Boolean, default: !0 },
    showIndicators: { type: Boolean, default: !0 },
    loop: { type: Boolean, default: !0 },
    ariaLabel: { default: "イメージスライダー" },
    heading: {},
    headingLevel: { default: 2 },
    showAllLabel: {},
    showAllHref: {},
    prevSlideAriaLabel: { default: "前のスライド" },
    nextSlideAriaLabel: { default: "次のスライド" },
    slidePositionAriaLabel: { default: "スライド位置" },
    formatSlideAriaLabel: { type: Function, default: (e) => `スライド ${e + 1}` }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e, r = d(() => `h${a.headingLevel}`), h = d(() => !!a.showAllLabel && !!a.showAllHref), m = d(() => !!a.heading || h.value), b = g, c = le(), n = d(() => `dads-image-slider-${c}`), i = (Z) => `${n.value}-slide-${Z}`, o = d(() => a.slides.length), y = (Z) => o.value === 0 || Z < 0 ? 0 : Z >= o.value ? Math.max(0, o.value - 1) : Z, p = d(() => y(a.modelValue ?? 0)), u = (Z) => {
      if (o.value === 0) return;
      let M;
      a.loop ? M = (Z % o.value + o.value) % o.value : M = y(Z), M !== p.value && (b("update:modelValue", M), b("change", M));
    }, f = () => u(p.value + 1), $ = () => u(p.value - 1), k = d(() => a.loop || p.value > 0), L = d(() => a.loop || p.value < o.value - 1);
    let I = null;
    const x = P(!1), C = () => {
      I !== null && (clearInterval(I), I = null);
    }, B = () => {
      C(), !(!a.autoPlay || x.value || o.value <= 1) && (I = setInterval(() => {
        if (!a.loop && p.value >= o.value - 1) {
          C();
          return;
        }
        f();
      }, a.interval));
    }, q = () => {
      a.pauseOnHover && (x.value = !0, C());
    }, te = () => {
      a.pauseOnHover && (x.value = !1, B());
    }, G = (Z) => {
      switch (Z.key) {
        case "ArrowRight":
          Z.preventDefault(), f();
          break;
        case "ArrowLeft":
          Z.preventDefault(), $();
          break;
        default:
          return;
      }
    };
    ve(() => {
      B();
    }), _e(() => {
      C();
    }), re(
      () => [a.autoPlay, a.interval, o.value],
      () => {
        B();
      }
    );
    const E = (Z) => [
      "dads-image-slider__indicator",
      {
        "dads-image-slider__indicator--active": Z === p.value
      }
    ], W = (Z) => [
      "dads-image-slider__slide",
      {
        "dads-image-slider__slide--active": Z === p.value
      }
    ], X = (Z) => u(Z), de = (Z, M) => `${M + 1} / ${o.value}: ${Z.alt}`;
    return (Z, M) => (t(), l("section", {
      class: "dads-image-slider",
      "aria-label": e.ariaLabel,
      "aria-roledescription": "carousel",
      tabindex: "0",
      onMouseenter: q,
      onMouseleave: te,
      onKeydown: G
    }, [
      m.value ? (t(), l("header", In, [
        e.heading ? (t(), ae(ue(r.value), {
          key: 0,
          class: "dads-image-slider__heading"
        }, {
          default: se(() => [
            Q(_(e.heading), 1)
          ]),
          _: 1
        })) : v("", !0),
        h.value ? (t(), l("a", {
          key: 1,
          href: e.showAllHref,
          class: "dads-image-slider__show-all"
        }, _(e.showAllLabel), 9, Cn)) : v("", !0)
      ])) : v("", !0),
      s("div", Dn, [
        (t(!0), l(H, null, U(e.slides, (K, A) => (t(), l("div", {
          id: i(A),
          key: A,
          role: "group",
          "aria-roledescription": "slide",
          "aria-label": de(K, A),
          "aria-hidden": A === p.value ? void 0 : "true",
          class: w(W(A))
        }, [
          s("img", {
            class: "dads-image-slider__image",
            src: K.src,
            alt: K.alt
          }, null, 8, Vn),
          K.caption ? (t(), l("p", An, _(K.caption), 1)) : v("", !0)
        ], 10, Bn))), 128))
      ]),
      e.showArrows && o.value > 1 ? (t(), l("button", {
        key: 1,
        type: "button",
        class: "dads-image-slider__arrow dads-image-slider__arrow--prev",
        "aria-label": e.prevSlideAriaLabel,
        disabled: !k.value || void 0,
        onClick: $
      }, [...M[0] || (M[0] = [
        s("span", { "aria-hidden": "true" }, "‹", -1)
      ])], 8, Mn)) : v("", !0),
      e.showArrows && o.value > 1 ? (t(), l("button", {
        key: 2,
        type: "button",
        class: "dads-image-slider__arrow dads-image-slider__arrow--next",
        "aria-label": e.nextSlideAriaLabel,
        disabled: !L.value || void 0,
        onClick: f
      }, [...M[1] || (M[1] = [
        s("span", { "aria-hidden": "true" }, "›", -1)
      ])], 8, Sn)) : v("", !0),
      e.showIndicators && o.value > 1 ? (t(), l("div", {
        key: 3,
        class: "dads-image-slider__indicators",
        role: "tablist",
        "aria-label": e.slidePositionAriaLabel
      }, [
        (t(!0), l(H, null, U(e.slides, (K, A) => (t(), l("button", {
          key: A,
          type: "button",
          role: "tab",
          "aria-selected": A === p.value,
          "aria-controls": i(A),
          "aria-label": e.formatSlideAriaLabel(A),
          class: w(E(A)),
          onClick: (F) => X(A)
        }, [...M[2] || (M[2] = [
          s("span", {
            class: "dads-image-slider__indicator-dot",
            "aria-hidden": "true"
          }, null, -1)
        ])], 10, Tn))), 128))
      ], 8, zn)) : v("", !0)
    ], 40, Ln));
  }
}), Bu = /* @__PURE__ */ N(Fn, [["__scopeId", "data-v-862c5f73"]]), En = ["aria-label"], qn = {
  key: 0,
  class: "dads-carousel__header"
}, Rn = ["href"], Nn = {
  class: "dads-carousel__viewport",
  "aria-live": "polite"
}, Pn = ["id", "aria-label", "aria-hidden"], Hn = ["aria-label", "disabled"], On = ["aria-label", "disabled"], Kn = ["aria-label"], jn = ["aria-selected", "aria-controls", "aria-label", "onClick"], Un = /* @__PURE__ */ R({
  __name: "DadsCarousel",
  props: {
    modelValue: { default: 0 },
    itemCount: {},
    type: { default: "key-visual" },
    mode: { default: "single" },
    visibleCount: { default: 3 },
    heading: {},
    headingLevel: { default: 2 },
    showAllLabel: {},
    showAllHref: {},
    autoPlay: { type: Boolean, default: !1 },
    interval: { default: 5e3 },
    pauseOnHover: { type: Boolean, default: !0 },
    showArrows: { type: Boolean, default: !0 },
    showIndicators: { type: Boolean, default: !0 },
    loop: { type: Boolean, default: !0 },
    ariaLabel: { default: "カルーセル" },
    prevSlideAriaLabel: { default: "前のスライド" },
    nextSlideAriaLabel: { default: "次のスライド" },
    slidePositionAriaLabel: { default: "スライド位置" },
    formatSlideAriaLabel: { type: Function, default: (e) => `スライド ${e + 1}` }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: g }) {
    const a = e;
    a.autoPlay, a.type === "container" && a.heading;
    const r = g, h = le(), m = d(() => `dads-carousel-${h}`), b = (F) => `${m.value}-slide-${F}`, c = d(() => Math.max(0, a.itemCount)), n = (F) => c.value === 0 || F < 0 ? 0 : F >= c.value ? Math.max(0, c.value - 1) : F, i = d(() => n(a.modelValue ?? 0)), o = (F) => {
      if (c.value === 0) return;
      let O;
      a.loop ? O = (F % c.value + c.value) % c.value : O = n(F), O !== i.value && (r("update:modelValue", O), r("change", O));
    }, y = () => o(i.value + 1), p = () => o(i.value - 1), u = d(() => a.loop || i.value > 0), f = d(() => a.loop || i.value < c.value - 1);
    let $ = null;
    const k = P(!1), L = () => {
      $ !== null && (clearInterval($), $ = null);
    }, I = () => {
      L(), !(!a.autoPlay || k.value || c.value <= 1) && ($ = setInterval(() => {
        if (!a.loop && i.value >= c.value - 1) {
          L();
          return;
        }
        y();
      }, a.interval));
    }, x = () => {
      a.pauseOnHover && (k.value = !0, L());
    }, C = () => {
      a.pauseOnHover && (k.value = !1, I());
    }, B = (F) => {
      switch (F.key) {
        case "ArrowRight":
          F.preventDefault(), y();
          break;
        case "ArrowLeft":
          F.preventDefault(), p();
          break;
        default:
          return;
      }
    };
    ve(() => {
      I();
    }), _e(() => {
      L();
    }), re(
      () => [a.autoPlay, a.interval, c.value],
      () => {
        I();
      }
    );
    const q = d(() => Array.from({ length: c.value }, (F, O) => O)), te = d(() => [
      "dads-carousel",
      `dads-carousel--type-${a.type}`,
      `dads-carousel--mode-${a.mode}`
    ]), G = d(() => `h${a.headingLevel}`), E = d(() => !!a.showAllLabel && !!a.showAllHref), W = d(() => a.mode === "multi"), X = d(() => W.value ? Math.max(1, Math.min(a.visibleCount, c.value || 1)) : 1), de = d(() => {
      if (W.value)
        return {
          "--dads-carousel-visible": String(X.value),
          transform: `translateX(calc(-${i.value} * (100% / var(--dads-carousel-visible))))`
        };
    }), Z = (F) => [
      "dads-carousel__slide",
      {
        "dads-carousel__slide--active": F === i.value
      }
    ], M = (F) => [
      "dads-carousel__indicator",
      {
        "dads-carousel__indicator--active": F === i.value
      }
    ], K = (F) => o(F), A = (F) => `${F + 1} / ${c.value}`;
    return (F, O) => (t(), l("section", {
      class: w(te.value),
      "aria-label": e.ariaLabel,
      "aria-roledescription": "carousel",
      tabindex: "0",
      onMouseenter: x,
      onMouseleave: C,
      onKeydown: B
    }, [
      e.heading || E.value ? (t(), l("header", qn, [
        e.heading ? (t(), ae(ue(G.value), {
          key: 0,
          class: "dads-carousel__heading"
        }, {
          default: se(() => [
            Q(_(e.heading), 1)
          ]),
          _: 1
        })) : v("", !0),
        E.value ? (t(), l("a", {
          key: 1,
          href: e.showAllHref,
          class: "dads-carousel__show-all"
        }, _(e.showAllLabel), 9, Rn)) : v("", !0)
      ])) : v("", !0),
      s("div", Nn, [
        s("div", {
          class: "dads-carousel__track",
          style: Le(de.value)
        }, [
          (t(!0), l(H, null, U(q.value, (J) => (t(), l("div", {
            id: b(J),
            key: J,
            role: "group",
            "aria-roledescription": "slide",
            "aria-label": A(J),
            "aria-hidden": !W.value && J !== i.value ? "true" : void 0,
            class: w(Z(J))
          }, [
            j(F.$slots, "default", {
              index: J,
              isActive: J === i.value
            }, void 0, !0)
          ], 10, Pn))), 128))
        ], 4)
      ]),
      e.showArrows && c.value > 1 ? (t(), l("button", {
        key: 1,
        type: "button",
        class: "dads-carousel__arrow dads-carousel__arrow--prev",
        "aria-label": e.prevSlideAriaLabel,
        disabled: !u.value || void 0,
        onClick: p
      }, [...O[0] || (O[0] = [
        s("span", { "aria-hidden": "true" }, "‹", -1)
      ])], 8, Hn)) : v("", !0),
      e.showArrows && c.value > 1 ? (t(), l("button", {
        key: 2,
        type: "button",
        class: "dads-carousel__arrow dads-carousel__arrow--next",
        "aria-label": e.nextSlideAriaLabel,
        disabled: !f.value || void 0,
        onClick: y
      }, [...O[1] || (O[1] = [
        s("span", { "aria-hidden": "true" }, "›", -1)
      ])], 8, On)) : v("", !0),
      e.showIndicators && c.value > 1 ? (t(), l("div", {
        key: 3,
        class: "dads-carousel__indicators",
        role: "tablist",
        "aria-label": e.slidePositionAriaLabel
      }, [
        (t(!0), l(H, null, U(q.value, (J) => (t(), l("button", {
          key: J,
          type: "button",
          role: "tab",
          "aria-selected": J === i.value,
          "aria-controls": b(J),
          "aria-label": e.formatSlideAriaLabel(J),
          class: w(M(J)),
          onClick: (fe) => K(J)
        }, [...O[2] || (O[2] = [
          s("span", {
            class: "dads-carousel__indicator-dot",
            "aria-hidden": "true"
          }, null, -1)
        ])], 10, jn))), 128))
      ], 8, Kn)) : v("", !0)
    ], 42, En));
  }
}), Vu = /* @__PURE__ */ N(Un, [["__scopeId", "data-v-8746109c"]]), Zn = /* @__PURE__ */ R({
  __name: "DadsList",
  props: {
    type: { default: "unordered" },
    items: {},
    start: {},
    spacing: { default: "4" },
    nestingMarker: { type: Boolean, default: !0 }
  },
  setup(e) {
    const g = e, a = d(() => g.type === "ordered" ? "number" : void 0);
    g.type;
    const r = d(() => [
      "dads-list",
      `dads-list--spacing-${g.spacing}`,
      {
        "dads-list--no-nesting-marker": !g.nestingMarker
      }
    ]), h = (b) => typeof b == "string" ? { label: b } : b, m = d(() => Array.isArray(g.items) && g.items.length > 0);
    return (b, c) => {
      const n = Ke("DadsList", !0);
      return t(), ae(ue(e.type === "ordered" ? "ol" : "ul"), {
        class: w(r.value),
        "data-marker": a.value,
        "data-spacing": e.spacing,
        start: e.type === "ordered" ? e.start : void 0
      }, {
        default: se(() => [
          m.value ? (t(!0), l(H, { key: 0 }, U(e.items, (i, o) => (t(), l("li", { key: o }, [
            Q(_(h(i).label) + " ", 1),
            h(i).children && h(i).children.length > 0 ? (t(), ae(n, {
              key: 0,
              type: e.type,
              items: h(i).children
            }, null, 8, ["type", "items"])) : v("", !0)
          ]))), 128)) : j(b.$slots, "default", { key: 1 }, void 0, !0)
        ]),
        _: 3
      }, 8, ["class", "data-marker", "data-spacing", "start"]);
    };
  }
}), Au = /* @__PURE__ */ N(Zn, [["__scopeId", "data-v-430ff576"]]), Yn = { class: "dads-blockquote-wrapper" }, Gn = ["cite"], Wn = { key: 1 }, Qn = {
  key: 0,
  class: "dads-blockquote__cite"
}, Jn = ["href"], Xn = /* @__PURE__ */ R({
  __name: "DadsBlockquote",
  props: {
    quote: {},
    cite: {},
    citeUrl: {}
  },
  setup(e) {
    const g = e, a = Te(), r = d(() => !!a.default), h = d(() => !!g.cite), m = d(() => !!g.citeUrl);
    return (b, c) => (t(), l("div", Yn, [
      s("blockquote", {
        class: "dads-blockquote",
        cite: e.citeUrl
      }, [
        r.value ? j(b.$slots, "default", { key: 0 }, void 0, !0) : e.quote ? (t(), l("p", Wn, _(e.quote), 1)) : v("", !0)
      ], 8, Gn),
      h.value ? (t(), l("cite", Qn, [
        m.value ? (t(), l("a", {
          key: 0,
          href: e.citeUrl,
          class: "dads-blockquote__cite-link"
        }, _(e.cite), 9, Jn)) : (t(), l(H, { key: 1 }, [
          Q(_(e.cite), 1)
        ], 64))
      ])) : v("", !0)
    ]));
  }
}), Mu = /* @__PURE__ */ N(Xn, [["__scopeId", "data-v-131dfe9a"]]), er = ["data-style", "aria-label"], ar = ["data-style"], tr = ["src"], lr = { class: "dads-resource-list__contents" }, sr = { class: "dads-resource-list__title" }, dr = {
  key: 0,
  class: "dads-resource-list__support"
}, ir = {
  key: 1,
  class: "dads-resource-list__tags"
}, or = {
  key: 2,
  class: "dads-resource-list__sub"
}, nr = { key: 1 }, rr = /* @__PURE__ */ R({
  __name: "DadsResourceList",
  props: {
    items: {},
    variant: { default: "frame" },
    ariaLabel: {}
  },
  emits: ["click:item", "click:action"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(
      () => a.items.map((n, i) => ({
        item: n,
        index: i,
        isLink: !!n.href && !n.disabled,
        hasMedia: !!n.thumbnail || !!n.iconName,
        hasTags: Array.isArray(n.tags) && n.tags.length > 0,
        kind: n.kind ?? "information",
        rowClass: [
          "dads-resource-list",
          `dads-resource-list--kind-${n.kind ?? "information"}`,
          {
            "dads-resource-list--selected": n.selected,
            "dads-resource-list--disabled": n.disabled
          }
        ]
      }))
    ), m = (n) => !!n.href && !n.disabled, b = (n, i, o) => {
      if (n.disabled) {
        o.preventDefault();
        return;
      }
      r("click:item", n, i, o);
    }, c = (n, i, o) => {
      if (n.disabled) {
        o.preventDefault();
        return;
      }
      r("click:action", n, i, o);
    };
    return (n, i) => (t(), l("ul", {
      class: "dads-resource-list-group",
      "data-style": e.variant,
      "aria-label": e.ariaLabel
    }, [
      (t(!0), l(H, null, U(h.value, (o) => (t(), l("li", {
        key: o.index,
        class: "dads-resource-list-group__item"
      }, [
        s("div", {
          class: w(o.rowClass),
          "data-style": e.variant
        }, [
          (t(), ae(ue(m(o.item) ? "a" : "div"), {
            href: m(o.item) ? o.item.href : void 0,
            "aria-current": o.item.selected ? "true" : void 0,
            "aria-disabled": o.item.disabled || void 0,
            class: "dads-resource-list__body",
            onClick: (y) => b(o.item, o.index, y)
          }, {
            default: se(() => [
              o.item.thumbnail ? (t(), l("img", {
                key: 0,
                class: "dads-resource-list__thumbnail",
                src: o.item.thumbnail,
                alt: ""
              }, null, 8, tr)) : o.item.iconName ? (t(), l("i", {
                key: 1,
                class: w(["mdi", o.item.iconName, "dads-resource-list__icon"]),
                "aria-hidden": "true"
              }, null, 2)) : v("", !0),
              s("div", lr, [
                s("h3", sr, _(o.item.title), 1),
                o.item.description ? (t(), l("div", dr, [
                  s("p", null, _(o.item.description), 1)
                ])) : v("", !0),
                o.hasTags ? (t(), l("ul", ir, [
                  (t(!0), l(H, null, U(o.item.tags, (y, p) => (t(), l("li", {
                    key: p,
                    class: "dads-resource-list__tag"
                  }, _(y), 1))), 128))
                ])) : v("", !0)
              ]),
              o.item.date ? (t(), l("div", or, [
                s("p", null, _(o.item.date), 1)
              ])) : v("", !0)
            ]),
            _: 2
          }, 1032, ["href", "aria-current", "aria-disabled", "onClick"])),
          o.item.action ? (t(), ae(ue(o.item.action.href ? "a" : "button"), {
            key: 0,
            type: o.item.action.href ? void 0 : "button",
            href: o.item.action.href,
            "aria-label": o.item.action.label,
            disabled: !o.item.action.href && o.item.disabled ? !0 : void 0,
            class: "dads-resource-list__action",
            onClick: (y) => c(o.item, o.index, y)
          }, {
            default: se(() => [
              o.item.action.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", o.item.action.iconName]),
                "aria-hidden": "true"
              }, null, 2)) : (t(), l("span", nr, _(o.item.action.label), 1))
            ]),
            _: 2
          }, 1032, ["type", "href", "aria-label", "disabled", "onClick"])) : v("", !0)
        ], 10, ar)
      ]))), 128))
    ], 8, er));
  }
}), Su = /* @__PURE__ */ N(rr, [["__scopeId", "data-v-f3e0c97d"]]), ur = ["aria-label"], cr = {
  key: 0,
  class: "dads-emergency-banner__timestamp"
}, br = ["datetime"], vr = {
  key: 1,
  class: "dads-emergency-banner__header"
}, fr = { class: "dads-emergency-banner__heading" }, hr = { class: "dads-emergency-banner__body" }, mr = { class: "dads-emergency-banner__message" }, _r = {
  key: 2,
  class: "dads-emergency-banner__action"
}, gr = ["href", "target", "rel"], pr = {
  key: 0,
  class: "mdi mdi-open-in-new dads-emergency-banner__external-icon",
  "aria-hidden": "true"
}, yr = {
  key: 1,
  class: "dads-emergency-banner__sr-only"
}, kr = ["aria-label"], $r = /* @__PURE__ */ R({
  __name: "DadsEmergencyBanner",
  props: {
    modelValue: { type: Boolean, default: !0 },
    title: {},
    message: {},
    linkLabel: {},
    linkHref: {},
    closable: { type: Boolean, default: !1 },
    closeLabel: { default: "閉じる" },
    iconName: { default: "mdi-alert" },
    ariaLabel: { default: "緊急情報" },
    timestamp: {},
    linkExternal: { type: Boolean, default: !1 },
    newTabHintText: { default: "（新規タブで開く）" }
  },
  emits: ["update:modelValue", "close"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = d(() => a.timestamp === void 0 ? null : a.timestamp instanceof Date ? {
      iso: a.timestamp.toISOString(),
      display: a.timestamp.toLocaleString()
    } : { iso: a.timestamp, display: a.timestamp }), m = () => {
      r("update:modelValue", !1), r("close");
    };
    return (b, c) => (t(), ae(Ae, { name: "dads-emergency-banner" }, {
      default: se(() => [
        e.modelValue ? (t(), l("div", {
          key: 0,
          class: "dads-emergency-banner",
          role: "alert",
          "aria-live": "assertive",
          "aria-label": e.ariaLabel
        }, [
          h.value ? (t(), l("p", cr, [
            s("time", {
              datetime: h.value.iso
            }, _(h.value.display), 9, br)
          ])) : v("", !0),
          e.title || b.$slots.title ? (t(), l("header", vr, [
            s("h2", fr, [
              e.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", e.iconName, "dads-emergency-banner__icon"]),
                "aria-hidden": "true"
              }, null, 2)) : v("", !0),
              j(b.$slots, "title", {}, () => [
                Q(_(e.title), 1)
              ], !0)
            ])
          ])) : v("", !0),
          s("div", hr, [
            s("p", mr, [
              j(b.$slots, "default", {}, () => [
                Q(_(e.message), 1)
              ], !0)
            ])
          ]),
          e.linkLabel && e.linkHref ? (t(), l("div", _r, [
            s("a", {
              class: "dads-emergency-banner__button",
              href: e.linkHref,
              target: e.linkExternal ? "_blank" : void 0,
              rel: e.linkExternal ? "noopener noreferrer" : void 0
            }, [
              Q(_(e.linkLabel) + " ", 1),
              e.linkExternal ? (t(), l("i", pr)) : v("", !0),
              e.linkExternal ? (t(), l("span", yr, _(e.newTabHintText), 1)) : v("", !0)
            ], 8, gr)
          ])) : v("", !0),
          e.closable ? (t(), l("button", {
            key: 3,
            type: "button",
            class: "dads-emergency-banner__close",
            "aria-label": e.closeLabel,
            onClick: m
          }, [...c[0] || (c[0] = [
            s("i", {
              class: "mdi mdi-close",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, kr)) : v("", !0)
        ], 8, ur)) : v("", !0)
      ]),
      _: 3
    }));
  }
}), zu = /* @__PURE__ */ N($r, [["__scopeId", "data-v-20bd557c"]]), xr = ["aria-label"], wr = {
  key: 0,
  class: "dads-table-control__top"
}, Lr = {
  key: 0,
  class: "dads-table-control__search"
}, Ir = ["for"], Cr = { class: "dads-table-control__search-control" }, Dr = ["id", "value", "placeholder"], Br = ["aria-label"], Vr = {
  key: 0,
  class: "dads-table-control__presets",
  role: "list"
}, Ar = ["aria-pressed", "onClick"], Mr = {
  key: 1,
  class: "dads-table-control__page-size"
}, Sr = ["for"], zr = ["id", "value"], Tr = ["value"], Fr = {
  key: 1,
  class: "dads-table-control__pagination"
}, Er = ["id"], qr = ["aria-label"], Rr = ["disabled", "aria-label"], Nr = ["aria-label"], Pr = ["disabled", "aria-label"], Hr = /* @__PURE__ */ R({
  __name: "DadsTableControl",
  props: {
    searchQuery: { default: "" },
    currentPage: { default: 1 },
    pageSize: { default: 10 },
    totalItems: {},
    pageSizeOptions: { default: () => [10, 25, 50, 100] },
    searchPlaceholder: { default: "検索" },
    presets: { default: () => [] },
    showReset: { type: Boolean, default: !0 },
    resetLabel: { default: "検索条件をリセット" },
    showSearch: { type: Boolean, default: !0 },
    showPageSize: { type: Boolean, default: !0 },
    showPagination: { type: Boolean, default: !0 },
    ariaLabel: { default: "テーブルコントロール" },
    searchLabel: { default: "検索" },
    pageSizeLabel: { default: "表示件数" },
    paginationAriaLabel: { default: "ページ送り" },
    prevPageAriaLabel: { default: "前のページ" },
    currentPageAriaLabel: { default: "現在のページ" },
    nextPageAriaLabel: { default: "次のページ" },
    prevPageLabel: { default: "前へ" },
    nextPageLabel: { default: "次へ" },
    formatPageSizeOption: { type: Function, default: (e) => `${e} 件` },
    formatRangeLabel: { type: Function, default: (e, g, a) => a === 0 ? "0 件" : `${e}-${g} / ${a} 件` }
  },
  emits: ["update:search", "update:page", "update:pageSize", "click:preset", "reset"],
  setup(e, { emit: g }) {
    const a = e, r = g, h = le(), m = d(() => `dads-table-control-search-${h}`), b = d(() => `dads-table-control-page-size-${h}`), c = d(() => `dads-table-control-status-${h}`), n = d(() => {
      const C = Math.max(1, a.pageSize);
      return Math.max(1, Math.ceil(a.totalItems / C));
    }), i = d(() => a.currentPage <= 1), o = d(() => a.currentPage >= n.value), y = () => {
      i.value || r("update:page", Math.max(1, a.currentPage - 1));
    }, p = () => {
      o.value || r("update:page", Math.min(n.value, a.currentPage + 1));
    }, u = (C) => {
      const B = C.target;
      r("update:search", B.value);
    }, f = (C) => {
      const B = C.target, q = Number(B.value);
      Number.isNaN(q) || (r("update:pageSize", q), a.currentPage > 1 && r("update:page", 1));
    }, $ = d(() => a.totalItems === 0 ? 0 : (a.currentPage - 1) * a.pageSize + 1), k = d(() => a.totalItems === 0 ? 0 : Math.min(a.totalItems, a.currentPage * a.pageSize)), L = d(
      () => a.formatRangeLabel($.value, k.value, a.totalItems)
    ), I = (C) => {
      r("update:search", C.query), r("click:preset", C);
    }, x = () => {
      a.searchQuery && (r("update:search", ""), r("reset"));
    };
    return (C, B) => (t(), l("div", {
      class: "dads-table-control",
      role: "group",
      "aria-label": e.ariaLabel
    }, [
      e.showSearch || e.showPageSize ? (t(), l("div", wr, [
        e.showSearch ? (t(), l("div", Lr, [
          s("label", {
            for: m.value,
            class: "dads-table-control__label"
          }, _(e.searchLabel), 9, Ir),
          s("div", Cr, [
            B[1] || (B[1] = s("i", {
              class: "mdi mdi-magnify dads-table-control__search-icon",
              "aria-hidden": "true"
            }, null, -1)),
            s("input", {
              id: m.value,
              class: "dads-table-control__search-input",
              type: "search",
              value: e.searchQuery,
              placeholder: e.searchPlaceholder,
              onInput: u
            }, null, 40, Dr),
            e.showReset && e.searchQuery ? (t(), l("button", {
              key: 0,
              type: "button",
              class: "dads-table-control__reset",
              "aria-label": e.resetLabel,
              onClick: x
            }, [...B[0] || (B[0] = [
              s("i", {
                class: "mdi mdi-close-circle",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, Br)) : v("", !0)
          ]),
          e.presets.length > 0 ? (t(), l("div", Vr, [
            (t(!0), l(H, null, U(e.presets, (q, te) => (t(), l("button", {
              key: `${q.label}-${te}`,
              type: "button",
              role: "listitem",
              class: "dads-table-control__preset",
              "aria-pressed": e.searchQuery === q.query,
              onClick: (G) => I(q)
            }, _(q.label), 9, Ar))), 128))
          ])) : v("", !0)
        ])) : v("", !0),
        e.showPageSize ? (t(), l("div", Mr, [
          s("label", {
            for: b.value,
            class: "dads-table-control__label"
          }, _(e.pageSizeLabel), 9, Sr),
          s("select", {
            id: b.value,
            class: "dads-table-control__page-size-select",
            value: e.pageSize,
            onChange: f
          }, [
            (t(!0), l(H, null, U(e.pageSizeOptions, (q) => (t(), l("option", {
              key: q,
              value: q
            }, _(e.formatPageSizeOption(q)), 9, Tr))), 128))
          ], 40, zr)
        ])) : v("", !0)
      ])) : v("", !0),
      e.showPagination ? (t(), l("div", Fr, [
        s("span", {
          id: c.value,
          class: "dads-table-control__status",
          "aria-live": "polite"
        }, _(L.value), 9, Er),
        s("div", {
          class: "dads-table-control__buttons",
          role: "navigation",
          "aria-label": e.paginationAriaLabel
        }, [
          s("button", {
            type: "button",
            class: "dads-table-control__button dads-table-control__button--prev",
            disabled: i.value,
            "aria-label": e.prevPageAriaLabel,
            onClick: y
          }, [
            B[2] || (B[2] = s("i", {
              class: "mdi mdi-chevron-left",
              "aria-hidden": "true"
            }, null, -1)),
            Q(" " + _(e.prevPageLabel), 1)
          ], 8, Rr),
          s("span", {
            class: "dads-table-control__page-indicator",
            "aria-label": e.currentPageAriaLabel
          }, _(e.currentPage) + " / " + _(n.value), 9, Nr),
          s("button", {
            type: "button",
            class: "dads-table-control__button dads-table-control__button--next",
            disabled: o.value,
            "aria-label": e.nextPageAriaLabel,
            onClick: p
          }, [
            Q(_(e.nextPageLabel) + " ", 1),
            B[3] || (B[3] = s("i", {
              class: "mdi mdi-chevron-right",
              "aria-hidden": "true"
            }, null, -1))
          ], 8, Pr)
        ], 8, qr)
      ])) : v("", !0)
    ], 8, xr));
  }
}), Tu = /* @__PURE__ */ N(Hr, [["__scopeId", "data-v-67002e74"]]);
export {
  nd as DADS_DEFAULT_SWATCHES,
  uu as DadsAccordion,
  Mu as DadsBlockquote,
  Iu as DadsBottomNavigation,
  Xr as DadsBreadcrumb,
  ua as DadsButton,
  iu as DadsCard,
  Vu as DadsCarousel,
  tt as DadsCheckbox,
  Zr as DadsCheckboxGroup,
  Yt as DadsChip,
  cu as DadsChipLabel,
  bu as DadsChipTag,
  vu as DadsColorPicker,
  Wr as DadsCombobox,
  fu as DadsDatePicker,
  _u as DadsDescriptionList,
  lu as DadsDialog,
  mu as DadsDisclosure,
  nu as DadsDivider,
  Jr as DadsDrawer,
  zu as DadsEmergencyBanner,
  Gr as DadsFileUpload,
  $u as DadsGlobalMenu,
  yu as DadsHamburgerMenuButton,
  Qr as DadsHeader,
  Qr as DadsHeaderContainer,
  ou as DadsHeading,
  Du as DadsImage,
  Bu as DadsImageSlider,
  Kr as DadsInputText,
  gu as DadsLanguageSelector,
  Au as DadsList,
  xu as DadsMegaMenu,
  ea as DadsMenuList,
  pu as DadsMenuListBox,
  Cu as DadsMobileMenu,
  lu as DadsModal,
  tu as DadsNotificationBanner,
  wu as DadsPageNavigation,
  du as DadsProgressIndicator,
  kt as DadsRadio,
  Yr as DadsRadioGroup,
  Su as DadsResourceList,
  ku as DadsScrollTopButton,
  hu as DadsSearchBox,
  Ur as DadsSelect,
  eu as DadsStepNavigation,
  au as DadsTab,
  ru as DadsTable,
  Tu as DadsTableControl,
  Lu as DadsTableOfContents,
  Kr as DadsTextField,
  jr as DadsTextarea,
  su as DadsTooltip,
  bo as DadsUtilityLink
};
//# sourceMappingURL=index.js.map
