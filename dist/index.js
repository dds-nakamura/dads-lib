import { defineComponent as R, computed as d, openBlock as t, createBlock as ae, resolveDynamicComponent as ce, mergeProps as ve, withCtx as se, createElementBlock as l, createCommentVNode as b, normalizeClass as w, createElementVNode as s, renderSlot as j, useId as le, createTextVNode as Q, toDisplayString as y, ref as q, onMounted as be, onBeforeUnmount as _e, watch as re, Fragment as P, renderList as U, withModifiers as we, withDirectives as ye, vShow as ke, useAttrs as oa, normalizeStyle as Ie, createVNode as Ce, useSlots as Te, resolveComponent as Ke, nextTick as De, Teleport as Ee, Transition as Me, withKeys as Be, unref as Ve } from "vue";
const ia = {
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => e.href !== void 0), m = d(() => e.disabled || e.loading), v = d(() => h.value ? "a" : "button"), u = d(() => [
      "dads-button",
      `dads-button--${e.variant}`,
      `dads-button--${e.size}`,
      `dads-button--${e.color}`,
      {
        "dads-button--block": e.block,
        "dads-button--loading": e.loading
      }
    ]), n = d(() => h.value ? {
      role: "button",
      href: m.value ? void 0 : e.href,
      "aria-disabled": m.value ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0,
      "aria-label": e.ariaLabel,
      tabindex: m.value ? -1 : void 0
    } : {
      type: e.type,
      disabled: e.disabled,
      "aria-busy": e.loading ? "true" : void 0,
      "aria-label": e.ariaLabel
    }), o = (i) => {
      if (m.value) {
        i.preventDefault();
        return;
      }
      r("click", i);
    };
    return (i, p) => (t(), ae(ce(v.value), ve({ class: u.value }, n.value, { onClick: o }), {
      default: se(() => [
        a.loading ? (t(), l("span", ia)) : b("", !0),
        a.prependIcon && !a.loading ? (t(), l("i", {
          key: 1,
          class: w(["mdi", a.prependIcon, "dads-button__icon", "dads-button__icon--prepend"]),
          "aria-hidden": "true"
        }, null, 2)) : b("", !0),
        s("span", na, [
          j(i.$slots, "default", {}, void 0, !0)
        ]),
        a.appendIcon && !a.loading ? (t(), l("i", {
          key: 2,
          class: w(["mdi", a.appendIcon, "dads-button__icon", "dads-button__icon--append"]),
          "aria-hidden": "true"
        }, null, 2)) : b("", !0)
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), H = (a, g) => {
  const e = a.__vccOpts || a;
  for (const [r, h] of g)
    e[r] = h;
  return e;
}, ca = /* @__PURE__ */ H(ra, [["__scopeId", "data-v-3778c8eb"]]), ua = ["for"], va = {
  key: 0,
  class: "dads-input-text__required",
  "aria-hidden": "true"
}, ba = { class: "dads-input-text__control" }, fa = ["id", "type", "value"], ha = {
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
    align: { default: "vertical" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-input-text-${h}`), v = d(() => `${m.value}-hint`), u = d(() => `${m.value}-error`), n = d(() => `${m.value}-counter`), o = d(() => e.error || !!e.errorMessage), i = d(() => String(e.modelValue ?? "").length), p = d(() => {
      const x = [];
      return o.value && e.errorMessage ? x.push(u.value) : e.hint && x.push(v.value), e.counter !== void 0 && x.push(n.value), x.length > 0 ? x.join(" ") : void 0;
    }), _ = d(() => [
      "dads-input-text",
      `dads-input-text--${e.size}`,
      `dads-input-text--align-${e.align}`,
      {
        "dads-input-text--disabled": e.disabled,
        "dads-input-text--readonly": e.readonly,
        "dads-input-text--error": o.value
      }
    ]), c = d(() => ({
      name: e.name,
      placeholder: e.placeholder,
      autocomplete: e.autocomplete,
      maxlength: e.maxlength,
      inputmode: e.inputmode,
      disabled: e.disabled || void 0,
      readonly: e.readonly || void 0,
      "aria-invalid": o.value || void 0,
      "aria-required": e.required || void 0,
      "aria-describedby": p.value
    })), f = d(
      () => o.value && !!e.errorMessage || !!e.hint || e.counter !== void 0
    ), $ = (x) => {
      const D = x.target, B = e.type === "number" ? D.valueAsNumber : D.value;
      r("update:modelValue", Number.isNaN(B) ? "" : B);
    }, k = (x) => r("change", x), I = (x) => r("focus", x), C = (x) => r("blur", x);
    return (x, D) => (t(), l("div", {
      class: w(_.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-input-text__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", va, "必須")) : b("", !0)
      ], 8, ua)) : b("", !0),
      s("div", ba, [
        a.prependIcon ? (t(), l("i", {
          key: 0,
          class: w(["mdi", a.prependIcon, "dads-input-text__icon", "dads-input-text__icon--prepend"]),
          "aria-hidden": "true"
        }, null, 2)) : b("", !0),
        s("input", ve({
          id: m.value,
          class: "dads-input-text__input",
          type: a.type,
          value: a.modelValue
        }, c.value, {
          onInput: $,
          onChange: k,
          onFocus: I,
          onBlur: C
        }), null, 16, fa),
        a.appendIcon ? (t(), l("i", {
          key: 1,
          class: w(["mdi", a.appendIcon, "dads-input-text__icon", "dads-input-text__icon--append"]),
          "aria-hidden": "true"
        }, null, 2)) : b("", !0)
      ]),
      f.value ? (t(), l("div", ha, [
        o.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: u.value,
          class: "dads-input-text__error",
          role: "alert"
        }, y(a.errorMessage), 9, ma)) : a.hint ? (t(), l("span", {
          key: 1,
          id: v.value,
          class: "dads-input-text__hint"
        }, y(a.hint), 9, _a)) : b("", !0),
        a.counter !== void 0 ? (t(), l("span", {
          key: 2,
          id: n.value,
          class: "dads-input-text__counter"
        }, y(i.value) + " / " + y(a.counter), 9, ga)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Hr = /* @__PURE__ */ H(pa, [["__scopeId", "data-v-d119165b"]]), ya = ["for"], ka = {
  key: 0,
  class: "dads-textarea__required",
  "aria-hidden": "true"
}, $a = { class: "dads-textarea__control" }, xa = ["id", "value", "rows"], wa = {
  key: 1,
  class: "dads-textarea__footer"
}, Ia = ["id"], Ca = ["id"], Da = ["id"], La = /* @__PURE__ */ R({
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
    maxRows: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null), m = le(), v = d(() => e.id ?? `dads-textarea-${m}`), u = d(() => `${v.value}-hint`), n = d(() => `${v.value}-error`), o = d(() => `${v.value}-counter`), i = d(() => e.error || !!e.errorMessage), p = d(() => String(e.modelValue ?? "").length), _ = d(() => e.autoResize ? e.minRows : e.rows), c = d(() => e.autoResize ? "none" : e.resize), f = d(() => {
      const F = [];
      return i.value && e.errorMessage ? F.push(n.value) : e.hint && F.push(u.value), e.counter !== void 0 && F.push(o.value), F.length > 0 ? F.join(" ") : void 0;
    }), $ = d(() => [
      "dads-textarea",
      `dads-textarea--${e.size}`,
      {
        "dads-textarea--disabled": e.disabled,
        "dads-textarea--readonly": e.readonly,
        "dads-textarea--error": i.value
      }
    ]), k = d(() => ({
      name: e.name,
      placeholder: e.placeholder,
      autocomplete: e.autocomplete,
      maxlength: e.maxlength,
      disabled: e.disabled || void 0,
      readonly: e.readonly || void 0,
      "aria-invalid": i.value || void 0,
      "aria-required": e.required || void 0,
      "aria-describedby": f.value
    })), I = d(
      () => i.value && !!e.errorMessage || !!e.hint || e.counter !== void 0
    );
    let C = null;
    const x = () => {
      C = null;
      const F = h.value;
      if (!F || !e.autoResize) return;
      F.style.height = "auto";
      const W = window.getComputedStyle(F), X = Number.parseFloat(W.lineHeight) || 20, de = (Number.parseFloat(W.paddingTop) || 0) + (Number.parseFloat(W.paddingBottom) || 0), Z = (Number.parseFloat(W.borderTopWidth) || 0) + (Number.parseFloat(W.borderBottomWidth) || 0), S = e.minRows * X + de + Z, K = e.maxRows !== void 0 ? e.maxRows * X + de + Z : Number.POSITIVE_INFINITY, M = Math.min(K, Math.max(S, F.scrollHeight));
      F.style.height = `${M}px`;
    }, D = () => {
      e.autoResize && (C !== null && cancelAnimationFrame(C), C = requestAnimationFrame(x));
    };
    be(D), _e(() => {
      C !== null && cancelAnimationFrame(C);
    }), re(() => e.modelValue, D, { flush: "post" });
    const B = (F) => {
      const W = F.target;
      r("update:modelValue", W.value);
    }, N = (F) => r("change", F), te = (F) => r("focus", F), G = (F) => r("blur", F);
    return (F, W) => (t(), l("div", {
      class: w($.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: v.value,
        class: "dads-textarea__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", ka, "必須")) : b("", !0)
      ], 8, ya)) : b("", !0),
      s("div", $a, [
        s("textarea", ve({
          id: v.value,
          ref_key: "textareaRef",
          ref: h,
          class: "dads-textarea__input",
          value: a.modelValue,
          rows: _.value,
          style: { resize: c.value }
        }, k.value, {
          onInput: B,
          onChange: N,
          onFocus: te,
          onBlur: G
        }), null, 16, xa)
      ]),
      I.value ? (t(), l("div", wa, [
        i.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-textarea__error",
          role: "alert"
        }, y(a.errorMessage), 9, Ia)) : a.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-textarea__hint"
        }, y(a.hint), 9, Ca)) : b("", !0),
        a.counter !== void 0 ? (t(), l("span", {
          key: 2,
          id: o.value,
          class: "dads-textarea__counter"
        }, y(p.value) + " / " + y(a.counter), 9, Da)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), qr = /* @__PURE__ */ H(La, [["__scopeId", "data-v-b044f06b"]]), Ba = ["for"], Va = {
  key: 0,
  class: "dads-select__required",
  "aria-hidden": "true"
}, Ma = { class: "dads-select__control" }, Aa = ["id", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid", "aria-required", "aria-describedby", "disabled", "data-readonly"], Sa = { class: "dads-select__value-wrap" }, za = {
  key: 0,
  class: "dads-select__tags"
}, Ta = { class: "dads-select__tag-text" }, Ea = ["aria-label", "disabled", "onClick"], Fa = {
  key: 1,
  class: "dads-select__value"
}, Na = {
  key: 2,
  class: "dads-select__value"
}, Ra = {
  key: 3,
  class: "dads-select__placeholder"
}, Ha = ["id", "aria-multiselectable"], qa = ["id", "aria-selected", "aria-disabled", "onClick", "onMouseenter"], Pa = {
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
    chips: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "focus", "blur", "open", "close"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-select-${h}`), v = d(() => `${m.value}-listbox`), u = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), o = (T) => `${m.value}-option-${T}`, i = d(() => e.error || !!e.errorMessage), p = q(!1), _ = q(-1), c = q(null), f = q(null), $ = (T) => T[e.itemValue], k = (T) => String(T[e.itemTitle] ?? ""), I = (T) => {
      const L = $(T);
      return e.multiple ? Array.isArray(e.modelValue) && e.modelValue.includes(L) : e.modelValue === L;
    }, C = d(() => !e.multiple || !Array.isArray(e.modelValue) ? [] : e.modelValue.map((T) => e.items.find((L) => $(L) === T)).filter((T) => T !== void 0)), x = d(() => e.multiple || e.modelValue === null || e.modelValue === void 0 ? null : e.items.find((T) => $(T) === e.modelValue) ?? null), D = d(
      () => p.value && _.value >= 0 ? o(_.value) : void 0
    ), B = d(() => {
      const T = [];
      return i.value && e.errorMessage ? T.push(n.value) : e.hint && T.push(u.value), T.length > 0 ? T.join(" ") : void 0;
    }), N = d(() => i.value && !!e.errorMessage || !!e.hint), te = d(() => [
      "dads-select",
      `dads-select--${e.size}`,
      {
        "dads-select--disabled": e.disabled,
        "dads-select--readonly": e.readonly,
        "dads-select--error": i.value,
        "dads-select--open": p.value
      }
    ]), G = () => {
      for (let T = 0; T < e.items.length; T++)
        if (I(e.items[T])) return T;
      return -1;
    }, F = () => e.items.findIndex((T) => !T.disabled), W = () => {
      if (e.disabled || e.readonly || p.value) return;
      p.value = !0;
      const T = G();
      _.value = T >= 0 ? T : F(), r("open");
    }, X = (T = !1) => {
      p.value && (p.value = !1, _.value = -1, r("close"), T && f.value?.focus());
    }, de = () => {
      e.disabled || e.readonly || (p.value ? X() : W());
    }, Z = (T) => {
      r("update:modelValue", T), r("change", T);
    }, S = (T) => {
      if (T.disabled) return;
      const L = $(T);
      if (e.multiple) {
        const z = Array.isArray(e.modelValue) ? [...e.modelValue] : [], Y = z.indexOf(L);
        Y >= 0 ? z.splice(Y, 1) : z.push(L), Z(z);
      } else
        Z(L), X(!0);
    }, K = (T) => {
      if (!e.multiple) return;
      const L = $(T), z = Array.isArray(e.modelValue) ? e.modelValue.filter((Y) => Y !== L) : [];
      Z(z);
    }, M = (T) => {
      if (e.items.length === 0) return;
      let z = _.value;
      for (let Y = 0; Y < e.items.length; Y++)
        if (z = (z + T + e.items.length) % e.items.length, !e.items[z].disabled) {
          _.value = z;
          return;
        }
    }, E = (T) => {
      const L = T === "first" ? e.items.keys() : [...e.items.keys()].reverse();
      for (const z of L)
        if (!e.items[z].disabled) {
          _.value = z;
          return;
        }
    };
    let O = "", J = null;
    const fe = (T) => {
      J !== null && clearTimeout(J), O += T.toLowerCase(), J = setTimeout(() => {
        O = "", J = null;
      }, Ua);
      const L = e.items.findIndex(
        (z) => !z.disabled && k(z).toLowerCase().startsWith(O)
      );
      L >= 0 && (_.value = L);
    }, Ae = (T) => {
      if (e.disabled || e.readonly) return;
      const { key: L } = T;
      if (!p.value) {
        if (L === "ArrowDown" || L === "ArrowUp" || L === "Enter" || L === " ") {
          T.preventDefault(), W();
          return;
        }
        L.length === 1 && /\S/.test(L) && (T.preventDefault(), W(), fe(L));
        return;
      }
      switch (L) {
        case "Escape":
          T.preventDefault(), X(!0);
          break;
        case "Tab":
          X();
          break;
        case "ArrowDown":
          T.preventDefault(), M(1);
          break;
        case "ArrowUp":
          T.preventDefault(), M(-1);
          break;
        case "Home":
          T.preventDefault(), E("first");
          break;
        case "End":
          T.preventDefault(), E("last");
          break;
        case "Enter":
        case " ":
          T.preventDefault(), _.value >= 0 && S(e.items[_.value]);
          break;
        default:
          L.length === 1 && /\S/.test(L) && (T.preventDefault(), fe(L));
      }
    }, Le = (T) => {
      if (!p.value) return;
      const L = T.target;
      L && c.value && c.value.contains(L) || X();
    };
    be(() => {
      document.addEventListener("pointerdown", Le, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", Le, !0), J !== null && clearTimeout(J);
    }), re(
      () => e.disabled,
      (T) => {
        T && X();
      }
    );
    const ge = (T) => r("focus", T), pe = (T) => r("blur", T);
    return (T, L) => (t(), l("div", {
      ref_key: "rootRef",
      ref: c,
      class: w(te.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-select__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", Va, "必須")) : b("", !0)
      ], 8, Ba)) : b("", !0),
      s("div", Ma, [
        s("button", {
          id: m.value,
          ref_key: "triggerRef",
          ref: f,
          type: "button",
          class: "dads-select__trigger",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": p.value,
          "aria-controls": v.value,
          "aria-activedescendant": D.value,
          "aria-invalid": i.value || void 0,
          "aria-required": a.required || void 0,
          "aria-describedby": B.value,
          disabled: a.disabled || void 0,
          "data-readonly": a.readonly || void 0,
          onClick: de,
          onKeydown: Ae,
          onFocus: ge,
          onBlur: pe
        }, [
          a.prefixIcon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", a.prefixIcon, "dads-select__prefix-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : b("", !0),
          s("span", Sa, [
            a.multiple && C.value.length > 0 && a.chips ? (t(), l("span", za, [
              (t(!0), l(P, null, U(C.value, (z) => (t(), l("span", {
                key: String($(z)),
                class: "dads-select__tag"
              }, [
                s("span", Ta, y(k(z)), 1),
                s("button", {
                  type: "button",
                  class: "dads-select__tag-remove",
                  "aria-label": `${k(z)} を削除`,
                  disabled: a.disabled || a.readonly || void 0,
                  onClick: we((Y) => K(z), ["stop"]),
                  onKeydown: L[0] || (L[0] = we(() => {
                  }, ["stop"]))
                }, " × ", 40, Ea)
              ]))), 128))
            ])) : a.multiple && C.value.length > 0 ? (t(), l("span", Fa, y(C.value.map((z) => k(z)).join(", ")), 1)) : !a.multiple && x.value ? (t(), l("span", Na, y(k(x.value)), 1)) : (t(), l("span", Ra, y(a.placeholder), 1))
          ]),
          s("i", {
            class: w(["mdi mdi-chevron-down dads-select__icon", { "dads-select__icon--open": p.value }]),
            "aria-hidden": "true"
          }, null, 2)
        ], 40, Aa),
        ye(s("ul", {
          id: v.value,
          class: "dads-select__listbox",
          role: "listbox",
          "aria-multiselectable": a.multiple || void 0,
          tabindex: "-1"
        }, [
          (t(!0), l(P, null, U(a.items, (z, Y) => (t(), l("li", {
            id: o(Y),
            key: String($(z)),
            role: "option",
            "aria-selected": I(z),
            "aria-disabled": z.disabled || void 0,
            class: w([
              "dads-select__option",
              {
                "dads-select__option--active": Y === _.value,
                "dads-select__option--selected": I(z),
                "dads-select__option--disabled": z.disabled
              }
            ]),
            onClick: (oe) => S(z),
            onMouseenter: (oe) => !z.disabled && (_.value = Y)
          }, y(k(z)), 43, qa))), 128)),
          a.items.length === 0 ? (t(), l("li", Pa, " 選択肢がありません ")) : b("", !0)
        ], 8, Ha), [
          [ke, p.value]
        ])
      ]),
      N.value ? (t(), l("div", Oa, [
        i.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-select__error",
          role: "alert"
        }, y(a.errorMessage), 9, Ka)) : a.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-select__hint"
        }, y(a.hint), 9, ja)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Pr = /* @__PURE__ */ H(Za, [["__scopeId", "data-v-ca68f0f9"]]), Ya = ["for"], Ga = ["id", "checked", "value"], Wa = {
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
    value: { type: [String, Number, Boolean] }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = oa(), m = d(() => {
      const B = {};
      for (const N of Object.keys(h))
        N === "class" || N === "style" || N === "id" || N.startsWith("on") || (B[N] = h[N]);
      return B;
    }), v = d(() => {
      const B = {};
      return h.class !== void 0 && (B.class = h.class), h.style !== void 0 && (B.style = h.style), B;
    }), u = q(null), n = le(), o = d(() => e.id ?? `dads-checkbox-${n}`), i = d(() => `${o.value}-hint`), p = d(() => `${o.value}-error`), _ = d(() => e.error || !!e.errorMessage), c = d(() => {
      if (_.value && e.errorMessage) return p.value;
      if (e.hint) return i.value;
    }), f = d(() => [
      "dads-checkbox",
      `dads-checkbox--${e.size}`,
      {
        "dads-checkbox--checked": e.modelValue && !e.indeterminate,
        "dads-checkbox--indeterminate": e.indeterminate,
        "dads-checkbox--disabled": e.disabled,
        "dads-checkbox--readonly": e.readonly,
        "dads-checkbox--error": _.value
      }
    ]), $ = d(() => ({
      name: e.name,
      disabled: e.disabled || void 0,
      // `aria-checked="mixed"` overrides the native checked state announcement so
      // screen readers report the third "indeterminate" state correctly.
      "aria-checked": e.indeterminate ? "mixed" : void 0,
      "aria-invalid": _.value || void 0,
      "aria-required": e.required || void 0,
      "aria-describedby": c.value
    })), k = d(() => _.value && !!e.errorMessage || !!e.hint), I = () => {
      u.value && (u.value.indeterminate = e.indeterminate);
    };
    be(I), re(() => e.indeterminate, I);
    const C = (B) => {
      if (e.readonly) {
        u.value && (u.value.checked = e.modelValue);
        return;
      }
      const N = B.target;
      r("update:modelValue", N.checked), r("change", B);
    }, x = (B) => r("focus", B), D = (B) => r("blur", B);
    return (B, N) => (t(), l("div", ve({ class: f.value }, v.value), [
      s("label", {
        class: "dads-checkbox__label",
        for: o.value
      }, [
        s("input", ve({
          id: o.value,
          ref_key: "inputRef",
          ref: u,
          type: "checkbox",
          class: "dads-checkbox__input",
          checked: a.modelValue,
          value: a.value
        }, { ...$.value, ...m.value }, {
          onChange: C,
          onFocus: x,
          onBlur: D
        }), null, 16, Ga),
        N[0] || (N[0] = s("span", {
          class: "dads-checkbox__indicator",
          "aria-hidden": "true"
        }, null, -1)),
        a.label ? (t(), l("span", Wa, [
          Q(y(a.label) + " ", 1),
          a.required ? (t(), l("span", Qa, "必須")) : b("", !0)
        ])) : b("", !0)
      ], 8, Ya),
      k.value ? (t(), l("div", Ja, [
        _.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: p.value,
          class: "dads-checkbox__error",
          role: "alert"
        }, y(a.errorMessage), 9, Xa)) : a.hint ? (t(), l("span", {
          key: 1,
          id: i.value,
          class: "dads-checkbox__hint"
        }, y(a.hint), 9, et)) : b("", !0)
      ])) : b("", !0)
    ], 16));
  }
}), tt = /* @__PURE__ */ H(at, [["__scopeId", "data-v-dfe04e93"]]), lt = ["id", "disabled", "aria-invalid", "aria-describedby"], st = {
  key: 0,
  class: "dads-checkbox-group__legend"
}, dt = {
  key: 0,
  class: "dads-checkbox-group__required",
  "aria-hidden": "true"
}, ot = { class: "dads-checkbox-group__items" }, it = {
  key: 1,
  class: "dads-checkbox-group__footer"
}, nt = ["id"], rt = ["id"], ct = /* @__PURE__ */ R({
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
    id: {}
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-checkbox-group-${h}`), v = d(() => `${m.value}-hint`), u = d(() => `${m.value}-error`), n = d(() => e.error || !!e.errorMessage), o = d(() => {
      if (n.value && e.errorMessage) return u.value;
      if (e.hint) return v.value;
    }), i = d(() => [
      "dads-checkbox-group",
      `dads-checkbox-group--${e.direction}`,
      {
        "dads-checkbox-group--error": n.value,
        "dads-checkbox-group--disabled": e.disabled
      }
    ]), p = d(() => n.value && !!e.errorMessage || !!e.hint), _ = ($) => e.modelValue?.includes($) ?? !1, c = ($, k, I) => I ? $.includes(k) ? [...$] : [...$, k] : $.filter((C) => C !== k), f = ($, k) => {
      const I = c(e.modelValue ?? [], $, k);
      r("update:modelValue", I), r("change", I);
    };
    return ($, k) => (t(), l("fieldset", {
      id: m.value,
      class: w(i.value),
      disabled: a.disabled || void 0,
      "aria-invalid": n.value || void 0,
      "aria-describedby": o.value
    }, [
      a.legend ? (t(), l("legend", st, [
        Q(y(a.legend) + " ", 1),
        a.required ? (t(), l("span", dt, "必須")) : b("", !0)
      ])) : b("", !0),
      s("div", ot, [
        (t(!0), l(P, null, U(a.items, (I) => (t(), ae(tt, {
          key: String(I.value),
          "model-value": _(I.value),
          label: I.label,
          hint: I.hint,
          disabled: I.disabled || a.disabled,
          size: a.size,
          name: a.name,
          value: I.value,
          error: n.value,
          "onUpdate:modelValue": (C) => f(I.value, C)
        }, null, 8, ["model-value", "label", "hint", "disabled", "size", "name", "value", "error", "onUpdate:modelValue"]))), 128))
      ]),
      p.value ? (t(), l("div", it, [
        n.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: u.value,
          class: "dads-checkbox-group__error",
          role: "alert"
        }, y(a.errorMessage), 9, nt)) : a.hint ? (t(), l("span", {
          key: 1,
          id: v.value,
          class: "dads-checkbox-group__hint"
        }, y(a.hint), 9, rt)) : b("", !0)
      ])) : b("", !0)
    ], 10, lt));
  }
}), Or = /* @__PURE__ */ H(ct, [["__scopeId", "data-v-c9d58fba"]]), ut = ["for"], vt = ["id", "name", "value", "checked"], bt = {
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
    id: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-radio-${h}`), v = d(() => `${m.value}-hint`), u = d(() => `${m.value}-error`), n = d(() => `${m.value}-description`), o = d(() => e.error || !!e.errorMessage), i = d(() => e.modelValue === e.value), p = d(() => {
      const C = [];
      return e.description && C.push(n.value), o.value && e.errorMessage ? C.push(u.value) : e.hint && C.push(v.value), C.length > 0 ? C.join(" ") : void 0;
    }), _ = d(() => [
      "dads-radio",
      `dads-radio--${e.size}`,
      {
        "dads-radio--checked": i.value,
        "dads-radio--disabled": e.disabled,
        "dads-radio--error": o.value
      }
    ]), c = d(() => ({
      disabled: e.disabled || void 0,
      "aria-invalid": o.value || void 0,
      "aria-required": e.required || void 0,
      "aria-describedby": p.value
    })), f = d(() => o.value && !!e.errorMessage || !!e.hint), $ = (C) => {
      r("update:modelValue", e.value), r("change", C);
    }, k = (C) => r("focus", C), I = (C) => r("blur", C);
    return (C, x) => (t(), l("div", {
      class: w(_.value)
    }, [
      s("label", {
        class: "dads-radio__label",
        for: m.value
      }, [
        s("input", ve({
          id: m.value,
          type: "radio",
          class: "dads-radio__input",
          name: a.name,
          value: a.value,
          checked: i.value
        }, c.value, {
          onChange: $,
          onFocus: k,
          onBlur: I
        }), null, 16, vt),
        x[0] || (x[0] = s("span", {
          class: "dads-radio__indicator",
          "aria-hidden": "true"
        }, null, -1)),
        a.label || a.required || a.description ? (t(), l("span", bt, [
          s("span", ft, [
            a.label ? (t(), l(P, { key: 0 }, [
              Q(y(a.label), 1)
            ], 64)) : b("", !0),
            a.required ? (t(), l("span", ht, "必須")) : b("", !0)
          ]),
          a.description ? (t(), l("span", {
            key: 0,
            id: n.value,
            class: "dads-radio__description"
          }, y(a.description), 9, mt)) : b("", !0)
        ])) : b("", !0)
      ], 8, ut),
      f.value ? (t(), l("div", _t, [
        o.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: u.value,
          class: "dads-radio__error",
          role: "alert"
        }, y(a.errorMessage), 9, gt)) : a.hint ? (t(), l("span", {
          key: 1,
          id: v.value,
          class: "dads-radio__hint"
        }, y(a.hint), 9, pt)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), kt = /* @__PURE__ */ H(yt, [["__scopeId", "data-v-8d8295bf"]]), $t = ["id", "disabled", "aria-invalid", "aria-describedby"], xt = {
  key: 0,
  class: "dads-radio-group__required",
  "aria-hidden": "true"
}, wt = { class: "dads-radio-group__items" }, It = {
  key: 1,
  class: "dads-radio-group__footer"
}, Ct = ["id"], Dt = ["id"], Lt = /* @__PURE__ */ R({
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
    id: {}
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-radio-group-${h}`), v = d(() => e.name ?? `dads-radio-group-name-${h}`), u = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), o = d(() => e.error || !!e.errorMessage), i = d(() => {
      if (o.value && e.errorMessage) return n.value;
      if (e.hint) return u.value;
    }), p = d(() => [
      "dads-radio-group",
      `dads-radio-group--${e.direction}`,
      {
        "dads-radio-group--error": o.value,
        "dads-radio-group--disabled": e.disabled
      }
    ]), _ = d(() => o.value && !!e.errorMessage || !!e.hint), c = (f) => {
      r("update:modelValue", f), r("change", f);
    };
    return (f, $) => (t(), l("fieldset", {
      id: m.value,
      class: w(p.value),
      disabled: a.disabled,
      "aria-invalid": o.value || void 0,
      "aria-describedby": i.value
    }, [
      a.legend ? (t(), l("legend", {
        key: 0,
        class: w(["dads-radio-group__legend", { "dads-radio-group__legend--visually-hidden": a.legendVisuallyHidden }])
      }, [
        Q(y(a.legend) + " ", 1),
        a.required ? (t(), l("span", xt, "必須")) : b("", !0)
      ], 2)) : b("", !0),
      s("div", wt, [
        (t(!0), l(P, null, U(a.items, (k) => (t(), ae(kt, {
          key: String(k.value),
          "model-value": a.modelValue ?? null,
          value: k.value,
          label: k.label,
          hint: k.hint,
          description: k.description,
          disabled: k.disabled || a.disabled,
          size: a.size,
          name: v.value,
          error: o.value,
          "onUpdate:modelValue": c
        }, null, 8, ["model-value", "value", "label", "hint", "description", "disabled", "size", "name", "error"]))), 128))
      ]),
      _.value ? (t(), l("div", It, [
        o.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-radio-group__error",
          role: "alert"
        }, y(a.errorMessage), 9, Ct)) : a.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-radio-group__hint"
        }, y(a.hint), 9, Dt)) : b("", !0)
      ])) : b("", !0)
    ], 10, $t));
  }
}), Kr = /* @__PURE__ */ H(Lt, [["__scopeId", "data-v-4033d40c"]]), Bt = ["for"], Vt = {
  key: 0,
  class: "dads-file-upload__required",
  "aria-hidden": "true"
}, Mt = ["disabled"], At = { class: "dads-file-upload__dropzone-text" }, St = ["id"], zt = {
  key: 1,
  class: "dads-file-upload__file-list"
}, Tt = { class: "dads-file-upload__file-name" }, Et = {
  key: 0,
  class: "dads-file-upload__file-size"
}, Ft = ["aria-label", "disabled", "onClick"], Nt = ["aria-valuenow"], Rt = {
  key: 3,
  class: "dads-file-upload__footer"
}, Ht = ["id"], qt = ["id"], Pt = /* @__PURE__ */ R({
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
    showFileSize: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "remove", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null), m = le(), v = d(() => e.id ?? `dads-file-upload-${m}`), u = d(() => `${v.value}-hint`), n = d(() => `${v.value}-error`), o = q(!1), i = q(null), p = d(() => i.value ?? e.errorMessage), _ = d(() => e.error || !!p.value), c = d(() => e.disabled || e.readonly), f = d(() => {
      const M = e.modelValue;
      return M == null ? [] : Array.isArray(M) ? M : [M];
    }), $ = d(() => [
      "dads-file-upload",
      `dads-file-upload--${e.size}`,
      {
        "dads-file-upload--disabled": e.disabled,
        "dads-file-upload--readonly": e.readonly,
        "dads-file-upload--error": _.value,
        "dads-file-upload--expand-drop": e.expandDropArea,
        "dads-file-upload--dragover": o.value && e.expandDropArea
      }
    ]), k = d(() => {
      if (_.value && p.value) return n.value;
      if (e.hint) return u.value;
    }), I = d(() => ({
      name: e.name,
      accept: e.accept,
      multiple: e.multiple || void 0,
      disabled: c.value || void 0,
      required: e.required || void 0,
      "aria-invalid": _.value || void 0,
      "aria-required": e.required || void 0,
      "aria-describedby": k.value
    })), C = d(() => _.value && !!p.value || !!e.hint), x = (M, E) => E.length === 0 ? !0 : E.some((O) => O.startsWith(".") ? M.name.toLowerCase().endsWith(O.toLowerCase()) : O.endsWith("/*") ? M.type.startsWith(O.slice(0, -1)) : M.type === O), D = (M) => {
      if (e.maxSize !== void 0) {
        const E = M.find((O) => O.size > e.maxSize);
        if (E) return `${E.name} はサイズ上限を超えています`;
      }
      if (e.accept) {
        const E = e.accept.split(",").map((J) => J.trim()).filter(Boolean), O = M.find((J) => !x(J, E));
        if (O) return `${O.name} は許可された形式ではありません`;
      }
      return null;
    }, B = (M) => {
      e.multiple ? r("update:modelValue", M) : r("update:modelValue", M[0] ?? null);
    }, N = (M) => {
      if (c.value || M.length === 0) return;
      const E = D(M);
      if (E) {
        i.value = E;
        return;
      }
      i.value = null;
      const O = e.multiple ? M : M.slice(0, 1);
      r("change", O), B(O);
    }, te = () => {
      c.value || h.value?.click();
    }, G = (M) => {
      const E = M.target, O = E.files;
      O && (N(Array.from(O)), E.value = "");
    }, F = () => {
      c.value || (o.value = !0);
    }, W = () => {
      o.value = !1;
    }, X = (M) => {
      if (o.value = !1, c.value) return;
      const E = M.dataTransfer?.files;
      E && N(Array.from(E));
    }, de = (M) => {
      c.value || (r("remove", M), B(f.value.filter((E) => E !== M)), i.value = null);
    }, Z = (M) => M < 1024 ? `${M} B` : M < 1024 * 1024 ? `${(M / 1024).toFixed(1)} KB` : M < 1024 * 1024 * 1024 ? `${(M / 1024 / 1024).toFixed(1)} MB` : `${(M / 1024 / 1024 / 1024).toFixed(1)} GB`, S = (M) => r("focus", M), K = (M) => r("blur", M);
    return (M, E) => (t(), l("div", {
      class: w($.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: v.value,
        class: "dads-file-upload__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", Vt, "必須")) : b("", !0)
      ], 8, Bt)) : b("", !0),
      s("div", {
        class: w(["dads-file-upload__dropzone", { "dads-file-upload__dropzone--dragover": o.value }]),
        onDragover: we(F, ["prevent"]),
        onDragleave: we(W, ["prevent"]),
        onDrop: we(X, ["prevent"])
      }, [
        s("button", {
          type: "button",
          class: "dads-file-upload__button",
          disabled: c.value,
          onClick: te
        }, y(a.buttonText), 9, Mt),
        s("span", At, y(a.dropzoneText), 1),
        s("input", ve({
          id: v.value,
          ref_key: "inputRef",
          ref: h,
          type: "file",
          class: "dads-file-upload__input"
        }, I.value, {
          onChange: G,
          onFocus: S,
          onBlur: K
        }), null, 16, St)
      ], 34),
      f.value.length > 0 ? (t(), l("ul", zt, [
        (t(!0), l(P, null, U(f.value, (O) => (t(), l("li", {
          key: `${O.name}-${O.size}-${O.lastModified}`,
          class: "dads-file-upload__file-item"
        }, [
          s("span", Tt, y(O.name), 1),
          a.showFileSize ? (t(), l("span", Et, y(Z(O.size)), 1)) : b("", !0),
          s("button", {
            type: "button",
            class: "dads-file-upload__remove",
            "aria-label": `${O.name} を削除`,
            disabled: c.value,
            onClick: (J) => de(O)
          }, " × ", 8, Ft)
        ]))), 128))
      ])) : b("", !0),
      a.progress !== void 0 ? (t(), l("div", {
        key: 2,
        class: "dads-file-upload__progress",
        role: "progressbar",
        "aria-valuenow": a.progress,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        s("div", {
          class: "dads-file-upload__progress-bar",
          style: Ie({ width: `${a.progress}%` })
        }, null, 4)
      ], 8, Nt)) : b("", !0),
      C.value ? (t(), l("div", Rt, [
        _.value && p.value ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-file-upload__error",
          role: "alert"
        }, y(p.value), 9, Ht)) : a.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-file-upload__hint"
        }, y(a.hint), 9, qt)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), jr = /* @__PURE__ */ H(Pt, [["__scopeId", "data-v-bb63a539"]]), Ot = {
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => [
      "dads-chip",
      `dads-chip--${e.size}`,
      `dads-chip--${e.color}`,
      {
        "dads-chip--clickable": e.clickable
      }
    ]), m = d(() => !e.clickable && e.disabled ? "true" : void 0), v = (o) => {
      !e.clickable || e.disabled || r("click", o);
    }, u = (o) => {
      !e.clickable || e.disabled || (o.key === "Enter" || o.key === " ") && (o.preventDefault(), r("click", o));
    }, n = (o) => {
      e.disabled || r("close", o);
    };
    return (o, i) => (t(), ae(ce(a.clickable ? "button" : "span"), {
      type: a.clickable ? "button" : void 0,
      class: w(h.value),
      role: a.clickable ? "button" : void 0,
      tabindex: a.clickable && !a.disabled ? 0 : void 0,
      disabled: a.clickable && a.disabled || void 0,
      "aria-disabled": m.value,
      "aria-label": a.ariaLabel,
      onClick: v,
      onKeydown: u
    }, {
      default: se(() => [
        o.$slots.prepend ? (t(), l("span", Ot, [
          j(o.$slots, "prepend", {}, void 0, !0)
        ])) : b("", !0),
        s("span", Kt, [
          j(o.$slots, "default", {}, void 0, !0)
        ]),
        o.$slots.append && !a.closable ? (t(), l("span", jt, [
          j(o.$slots, "append", {}, void 0, !0)
        ])) : b("", !0),
        a.closable ? (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-chip__close",
          "aria-label": a.closeLabel,
          disabled: a.disabled,
          onClick: we(n, ["stop"])
        }, [...i[0] || (i[0] = [
          s("i", {
            class: "mdi mdi-close",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, Ut)) : b("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "role", "tabindex", "disabled", "aria-disabled", "aria-label"]));
  }
}), Yt = /* @__PURE__ */ H(Zt, [["__scopeId", "data-v-19bf65af"]]), Gt = ["for"], Wt = {
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
    readonly: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => e.id ?? `dads-combobox-${h}`), v = d(() => `${m.value}-listbox`), u = d(() => `${m.value}-hint`), n = d(() => `${m.value}-error`), o = (L) => `${m.value}-option-${L}`, i = d(() => e.error || !!e.errorMessage), p = q(null), _ = q(null), c = q(!1), f = q(-1), $ = q(""), k = (L) => L[e.itemValue], I = (L) => String(L[e.itemTitle] ?? ""), C = (L, z) => z ? I(L).toLowerCase().includes(z.toLowerCase()) : !0, x = d(() => {
      const L = e.filter ?? C;
      return e.items.filter((z) => L(z, $.value));
    }), D = () => Array.isArray(e.modelValue) ? e.modelValue : [], B = d(() => e.multiple ? D() : []), N = d(() => e.multiple || e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? null : e.items.find((L) => k(L) === e.modelValue) ?? null), te = (L) => {
      const z = e.items.find((Y) => k(Y) === L);
      return z ? I(z) : String(L);
    }, G = d(
      () => c.value && f.value >= 0 ? o(f.value) : void 0
    ), F = d(() => {
      const L = [];
      return i.value && e.errorMessage ? L.push(n.value) : e.hint && L.push(u.value), L.length > 0 ? L.join(" ") : void 0;
    }), W = d(() => i.value && !!e.errorMessage || !!e.hint), X = d(() => [
      "dads-combobox",
      `dads-combobox--${e.size}`,
      {
        "dads-combobox--disabled": e.disabled,
        "dads-combobox--readonly": e.readonly,
        "dads-combobox--error": i.value,
        "dads-combobox--open": c.value,
        "dads-combobox--multiple": e.multiple
      }
    ]);
    re(
      () => [e.modelValue, e.items, e.multiple],
      () => {
        e.multiple || (N.value ? $.value = I(N.value) : e.modelValue === null || e.modelValue === void 0 ? $.value = "" : $.value = String(e.modelValue));
      },
      { immediate: !0 }
    );
    const de = () => x.value.findIndex((L) => !L.disabled), Z = () => {
      e.disabled || e.readonly || c.value || (c.value = !0, x.value.length === 0 ? f.value = -1 : f.value = de());
    }, S = () => {
      c.value && (c.value = !1, f.value = -1);
    }, K = (L) => {
      r("update:modelValue", L), r("change", L);
    }, M = (L) => {
      const z = x.value;
      if (z.length === 0) {
        f.value = -1;
        return;
      }
      let oe = f.value < 0 ? L === 1 ? -1 : 0 : f.value;
      for (let ue = 0; ue < z.length; ue++)
        if (oe = (oe + L + z.length) % z.length, !z[oe].disabled) {
          f.value = oe;
          return;
        }
    }, E = (L) => {
      const z = L.trim();
      if (!z) return;
      const Y = e.items.find(
        (ue) => String(k(ue)) === z || I(ue) === z
      );
      if (Y && Y.disabled) return;
      const oe = Y ? k(Y) : z;
      if (e.multiple) {
        const ue = D();
        ue.some((Fe) => Fe === oe) || K([...ue, oe]), $.value = "", f.value = x.value.length > 0 ? de() : -1;
      } else
        K(oe), $.value = Y ? I(Y) : String(oe), S();
    }, O = (L) => {
      e.multiple && K(D().filter((z) => z !== L));
    }, J = (L) => {
      const z = L.target;
      $.value = z.value, c.value || (c.value = !0), f.value = x.value.length > 0 ? de() : -1;
    }, fe = (L) => {
      if (e.disabled || e.readonly) return;
      const { key: z } = L;
      switch (z) {
        case "ArrowDown":
          L.preventDefault(), c.value ? M(1) : Z();
          break;
        case "ArrowUp":
          L.preventDefault(), c.value ? M(-1) : Z();
          break;
        case "Enter": {
          L.preventDefault();
          const Y = x.value;
          c.value && f.value >= 0 && Y[f.value] ? E(String(k(Y[f.value]))) : $.value.trim() && E($.value);
          break;
        }
        case "Escape":
          c.value && (L.preventDefault(), S());
          break;
        case "Tab":
          S();
          break;
        case "Backspace": {
          if (!e.multiple || $.value !== "") break;
          const Y = D();
          Y.length > 0 && K(Y.slice(0, -1));
          break;
        }
      }
    }, Ae = (L) => {
      !e.disabled && !e.readonly && Z(), r("focus", L);
    }, Le = (L) => {
      r("blur", L);
    }, ge = (L) => {
      const z = L.target;
      z && z === p.value || z?.closest(".dads-chip__close") || (L.preventDefault(), p.value?.focus());
    }, pe = (L, z) => {
      L.preventDefault(), !z.disabled && E(String(k(z)));
    }, T = (L) => {
      if (!c.value) return;
      const z = L.target;
      z && _.value && _.value.contains(z) || S();
    };
    return be(() => {
      document.addEventListener("pointerdown", T, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", T, !0);
    }), re(
      () => e.disabled,
      (L) => {
        L && S();
      }
    ), (L, z) => (t(), l("div", {
      ref_key: "rootRef",
      ref: _,
      class: w(X.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: m.value,
        class: "dads-combobox__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", Wt, "必須")) : b("", !0)
      ], 8, Gt)) : b("", !0),
      s("div", {
        class: "dads-combobox__control",
        onMousedown: ge
      }, [
        a.multiple && B.value.length > 0 ? (t(), l("ul", Qt, [
          (t(!0), l(P, null, U(B.value, (Y) => (t(), l("li", {
            key: String(Y),
            class: "dads-combobox__chip-item"
          }, [
            Ce(Yt, {
              size: "sm",
              closable: !a.disabled && !a.readonly,
              disabled: a.disabled,
              onClose: (oe) => O(Y)
            }, {
              default: se(() => [
                Q(y(te(Y)), 1)
              ]),
              _: 2
            }, 1032, ["closable", "disabled", "onClose"])
          ]))), 128))
        ])) : b("", !0),
        s("input", {
          id: m.value,
          ref_key: "inputRef",
          ref: p,
          class: "dads-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          name: a.name,
          value: $.value,
          placeholder: a.multiple && B.value.length > 0 ? "" : a.placeholder,
          disabled: a.disabled || void 0,
          readonly: a.readonly || void 0,
          "aria-invalid": i.value || void 0,
          "aria-required": a.required || void 0,
          "aria-describedby": F.value,
          "aria-expanded": c.value,
          "aria-controls": v.value,
          "aria-activedescendant": G.value,
          "aria-autocomplete": "list",
          onInput: J,
          onKeydown: fe,
          onFocus: Ae,
          onBlur: Le
        }, null, 40, Jt)
      ], 32),
      ye(s("ul", {
        id: v.value,
        class: "dads-combobox__suggestions",
        role: "listbox",
        "aria-multiselectable": a.multiple || void 0
      }, [
        (t(!0), l(P, null, U(x.value, (Y, oe) => (t(), l("li", {
          id: o(oe),
          key: String(k(Y)),
          role: "option",
          "aria-selected": oe === f.value,
          "aria-disabled": Y.disabled || void 0,
          class: w([
            "dads-combobox__suggestion",
            {
              "dads-combobox__suggestion--active": oe === f.value,
              "dads-combobox__suggestion--disabled": Y.disabled
            }
          ]),
          onMousedown: (ue) => pe(ue, Y),
          onMouseenter: (ue) => !Y.disabled && (f.value = oe)
        }, y(I(Y)), 43, el))), 128))
      ], 8, Xt), [
        [ke, c.value && x.value.length > 0]
      ]),
      W.value ? (t(), l("div", al, [
        i.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: n.value,
          class: "dads-combobox__error",
          role: "alert"
        }, y(a.errorMessage), 9, tl)) : a.hint ? (t(), l("span", {
          key: 1,
          id: u.value,
          class: "dads-combobox__hint"
        }, y(a.hint), 9, ll)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Ur = /* @__PURE__ */ H(sl, [["__scopeId", "data-v-fe32138c"]]), dl = { class: "dads-header-container__inner" }, ol = ["aria-label"], il = {
  key: 1,
  class: "dads-header-container__logo"
}, nl = {
  key: 2,
  class: "dads-header-container__nav",
  "aria-label": "メインナビゲーション"
}, rl = {
  key: 3,
  class: "dads-header-container__utility"
}, cl = {
  key: 4,
  class: "dads-header-container__actions"
}, ul = /* @__PURE__ */ R({
  __name: "DadsHeaderContainer",
  props: {
    sticky: { type: Boolean, default: !0 },
    showMenuToggle: { type: Boolean, default: !0 },
    menuToggleLabel: { default: "メニューを開く" },
    variant: { default: "wide-full" },
    logoLabel: {},
    logoHref: {}
  },
  emits: ["click:menu"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = Te(), m = d(() => [
      "dads-header-container",
      `dads-header-container--${e.variant}`,
      { "dads-header-container--sticky": e.sticky }
    ]), v = d(() => !!h.logo || !!e.logoLabel), u = (n) => r("click:menu", n);
    return (n, o) => (t(), l("header", {
      class: w(m.value)
    }, [
      s("div", dl, [
        a.showMenuToggle ? (t(), l("button", {
          key: 0,
          type: "button",
          class: "dads-header-container__menu-toggle",
          "aria-label": a.menuToggleLabel,
          onClick: u
        }, [...o[0] || (o[0] = [
          s("i", {
            class: "mdi mdi-menu",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, ol)) : b("", !0),
        v.value ? (t(), l("div", il, [
          j(n.$slots, "logo", {}, () => [
            (t(), ae(ce(a.logoHref ? "a" : "strong"), {
              href: a.logoHref,
              class: "dads-header-container__logo-text"
            }, {
              default: se(() => [
                Q(y(a.logoLabel), 1)
              ]),
              _: 1
            }, 8, ["href"]))
          ], !0)
        ])) : b("", !0),
        n.$slots.nav ? (t(), l("nav", nl, [
          j(n.$slots, "nav", {}, void 0, !0)
        ])) : b("", !0),
        n.$slots.utility ? (t(), l("div", rl, [
          j(n.$slots, "utility", {}, void 0, !0)
        ])) : b("", !0),
        n.$slots.actions ? (t(), l("div", cl, [
          j(n.$slots, "actions", {}, void 0, !0)
        ])) : b("", !0)
      ])
    ], 2));
  }
}), Zr = /* @__PURE__ */ H(ul, [["__scopeId", "data-v-7349ba93"]]), vl = {
  key: 0,
  class: "dads-drawer__item-details"
}, bl = { class: "dads-drawer__item-button" }, fl = { class: "dads-drawer__item-label" }, hl = { class: "dads-drawer__item-children" }, ml = ["href", "aria-disabled", "tabindex"], _l = { class: "dads-drawer__item-label" }, gl = ["disabled"], pl = { class: "dads-drawer__item-label" }, yl = /* @__PURE__ */ R({
  __name: "DadsDrawerItem",
  props: {
    item: {}
  },
  emits: ["click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(
      () => Array.isArray(e.item.children) && e.item.children.length > 0
    ), m = d(() => !h.value && !!e.item.href), v = d(() => [
      "dads-drawer__item",
      {
        "dads-drawer__item--with-children": h.value,
        "dads-drawer__item--disabled": e.item.disabled
      }
    ]), u = (o) => {
      if (e.item.disabled) {
        o.preventDefault();
        return;
      }
      r("click:item", e.item, o);
    }, n = (o, i) => {
      r("click:item", o, i);
    };
    return (o, i) => {
      const p = Ke("DadsDrawerItem", !0);
      return t(), l("li", {
        class: w(v.value)
      }, [
        h.value ? (t(), l("details", vl, [
          s("summary", bl, [
            a.item.icon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", a.item.icon, "dads-drawer__item-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0),
            s("span", fl, y(a.item.label), 1),
            i[0] || (i[0] = s("i", {
              class: "mdi mdi-chevron-down dads-drawer__item-chevron",
              "aria-hidden": "true"
            }, null, -1))
          ]),
          s("ul", hl, [
            (t(!0), l(P, null, U(a.item.children, (_, c) => (t(), ae(p, {
              key: c,
              item: _,
              "onClick:item": n
            }, null, 8, ["item"]))), 128))
          ])
        ])) : m.value ? (t(), l("a", {
          key: 1,
          href: a.item.disabled ? void 0 : a.item.href,
          class: "dads-drawer__item-button",
          "aria-disabled": a.item.disabled || void 0,
          tabindex: a.item.disabled ? -1 : void 0,
          onClick: u
        }, [
          a.item.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", a.item.icon, "dads-drawer__item-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : b("", !0),
          s("span", _l, y(a.item.label), 1)
        ], 8, ml)) : (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-drawer__item-button",
          disabled: a.item.disabled,
          onClick: u
        }, [
          a.item.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", a.item.icon, "dads-drawer__item-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : b("", !0),
          s("span", pl, y(a.item.label), 1)
        ], 8, gl))
      ], 2);
    };
  }
}), kl = ["aria-label"], $l = { class: "dads-drawer__header" }, xl = {
  key: 0,
  class: "dads-drawer__title"
}, wl = ["aria-label"], Il = {
  class: "dads-drawer__nav",
  "aria-label": "ドロワーナビゲーション"
}, Cl = { class: "dads-drawer__list" }, Dl = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', Ll = /* @__PURE__ */ R({
  __name: "DadsDrawer",
  props: {
    modelValue: { type: Boolean, default: !1 },
    items: {},
    title: {},
    closeLabel: { default: "閉じる" },
    placement: { default: "left" }
  },
  emits: ["update:modelValue", "click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null);
    let m = null;
    const v = () => {
      r("update:modelValue", !1);
    }, u = (i, p) => {
      r("click:item", i, p), i.onClick && i.onClick(p), i.children || v();
    }, n = () => h.value ? Array.from(h.value.querySelectorAll(Dl)) : [], o = (i) => {
      const p = n();
      if (p.length === 0) return;
      const _ = p[0], c = p[p.length - 1], f = document.activeElement;
      i.shiftKey ? (f === _ || f === h.value) && (i.preventDefault(), c.focus()) : f === c && (i.preventDefault(), _.focus());
    };
    return re(
      () => e.modelValue,
      async (i) => {
        i ? (m = document.activeElement, await De(), h.value?.focus()) : m && (m.focus(), m = null);
      }
    ), (i, p) => (t(), ae(Ee, { to: "body" }, [
      Ce(Me, {
        name: `dads-drawer-${a.placement}`
      }, {
        default: se(() => [
          a.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-drawer", `dads-drawer--${a.placement}`]),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": a.title || "ナビゲーション",
            onKeydown: [
              Be(v, ["esc"]),
              Be(o, ["tab"])
            ]
          }, [
            s("div", {
              class: "dads-drawer__overlay",
              "aria-hidden": "true",
              onClick: v
            }),
            s("aside", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-drawer__panel",
              tabindex: "-1"
            }, [
              s("header", $l, [
                a.title ? (t(), l("h2", xl, y(a.title), 1)) : b("", !0),
                s("button", {
                  type: "button",
                  class: "dads-drawer__close",
                  "aria-label": a.closeLabel,
                  onClick: v
                }, [...p[0] || (p[0] = [
                  s("i", {
                    class: "mdi mdi-close",
                    "aria-hidden": "true"
                  }, null, -1)
                ])], 8, wl)
              ]),
              s("nav", Il, [
                s("ul", Cl, [
                  (t(!0), l(P, null, U(a.items, (_, c) => (t(), ae(yl, {
                    key: c,
                    item: _,
                    "onClick:item": u
                  }, null, 8, ["item"]))), 128))
                ])
              ])
            ], 512)
          ], 42, kl)) : b("", !0)
        ]),
        _: 1
      }, 8, ["name"])
    ]));
  }
}), Yr = /* @__PURE__ */ H(Ll, [["__scopeId", "data-v-a885b67b"]]), Bl = ["aria-label"], Vl = { class: "dads-breadcrumb__list" }, Ml = ["href", "onClick"], Al = ["aria-current", "aria-disabled"], Sl = {
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(
      () => e.items.map((v, u) => {
        const n = u === e.items.length - 1, o = !n && !!v.disabled, i = !n && !!v.href && !v.disabled;
        return { item: v, index: u, isLast: n, isDisabled: o, isLink: i };
      })
    ), m = (v, u, n) => {
      r("click:item", v, u, n);
    };
    return (v, u) => (t(), l("nav", {
      class: "dads-breadcrumb",
      "aria-label": a.ariaLabel
    }, [
      s("ol", Vl, [
        (t(!0), l(P, null, U(h.value, (n) => (t(), l("li", {
          key: n.index,
          class: "dads-breadcrumb__item"
        }, [
          n.isLink ? (t(), l("a", {
            key: 0,
            href: n.item.href,
            class: "dads-breadcrumb__link",
            onClick: (o) => m(n.item, n.index, o)
          }, y(n.item.title), 9, Ml)) : (t(), l("span", {
            key: 1,
            class: w([
              "dads-breadcrumb__current",
              { "dads-breadcrumb__current--disabled": n.isDisabled }
            ]),
            "aria-current": n.isLast ? "page" : void 0,
            "aria-disabled": n.isDisabled ? "true" : void 0
          }, y(n.item.title), 11, Al)),
          n.isLast ? b("", !0) : (t(), l("span", Sl, y(a.separator), 1))
        ]))), 128))
      ])
    ], 8, Bl));
  }
}), Gr = /* @__PURE__ */ H(zl, [["__scopeId", "data-v-99f8e0f7"]]), Tl = ["aria-label"], El = { class: "dads-step-navigation__list" }, Fl = ["aria-current"], Nl = {
  class: "dads-step-navigation__indicator",
  "aria-hidden": "true"
}, Rl = {
  key: 0,
  class: "mdi mdi-check"
}, Hl = {
  key: 1,
  class: "mdi mdi-close"
}, ql = { key: 2 }, Pl = { class: "dads-step-navigation__title" }, Ol = {
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => [
      "dads-step-navigation",
      `dads-step-navigation--${e.orientation}`
    ]), m = (n) => n.status ?? "pending", v = (n) => [
      `dads-step-navigation__item--${m(n)}`
    ], u = (n, o, i) => {
      r("click:step", n, o, i);
    };
    return (n, o) => (t(), l("nav", {
      class: w(h.value),
      "aria-label": a.ariaLabel
    }, [
      s("ol", El, [
        (t(!0), l(P, null, U(a.steps, (i, p) => (t(), l("li", {
          key: p,
          class: w(["dads-step-navigation__item", v(i)]),
          "aria-current": m(i) === "current" ? "step" : void 0
        }, [
          (t(), ae(ce(a.clickable ? "button" : "div"), {
            type: a.clickable ? "button" : void 0,
            class: w(a.clickable ? "dads-step-navigation__button" : "dads-step-navigation__static"),
            onClick: (_) => a.clickable ? u(i, p, _) : void 0
          }, {
            default: se(() => [
              s("span", Nl, [
                m(i) === "done" ? (t(), l("i", Rl)) : m(i) === "error" ? (t(), l("i", Hl)) : (t(), l("span", ql, y(p + 1), 1))
              ]),
              s("span", Pl, y(i.title), 1)
            ]),
            _: 2
          }, 1032, ["type", "class", "onClick"])),
          p < a.steps.length - 1 ? (t(), l("span", Ol)) : b("", !0)
        ], 10, Fl))), 128))
      ])
    ], 10, Tl));
  }
}), Wr = /* @__PURE__ */ H(Kl, [["__scopeId", "data-v-d096fd65"]]), jl = ["aria-label", "aria-orientation"], Ul = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], Zl = { class: "dads-tab__label" }, Yl = { class: "dads-tab__panels" }, Gl = ["id", "aria-labelledby", "hidden"], Wl = /* @__PURE__ */ R({
  __name: "DadsTab",
  props: {
    modelValue: {},
    items: {},
    orientation: { default: "horizontal" },
    keepAlive: { type: Boolean, default: !1 },
    ariaLabel: { default: "タブ" }
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-tab-${h}`), v = q([]), u = (f) => f.value === e.modelValue, n = (f) => {
      f.disabled || u(f) || (r("update:modelValue", f.value), r("change", f.value));
    }, o = (f) => {
      De(() => {
        v.value[f]?.focus();
      });
    }, i = (f) => {
      const $ = e.items.map((G, F) => G.disabled ? -1 : F).filter((G) => G >= 0);
      if ($.length === 0) return;
      const k = e.items.findIndex((G) => G.value === e.modelValue), I = $.indexOf(k), C = I === -1 ? 0 : I, x = $.length - 1;
      let D = null;
      const B = e.orientation === "vertical" ? "ArrowDown" : "ArrowRight", N = e.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      switch (f.key) {
        case B:
          D = $[(C + 1) % $.length];
          break;
        case N:
          D = $[(C - 1 + $.length) % $.length];
          break;
        case "Home":
          D = $[0];
          break;
        case "End":
          D = $[x];
          break;
        case "Enter":
        case " ":
          return;
        default:
          return;
      }
      if (D === k) return;
      f.preventDefault();
      const te = e.items[D];
      r("update:modelValue", te.value), r("change", te.value), o(D);
    }, p = (f) => [
      "dads-tab__tab",
      {
        "dads-tab__tab--active": u(f),
        "dads-tab__tab--disabled": f.disabled
      }
    ], _ = (f) => `${m.value}-tab-${f}`, c = (f) => `${m.value}-panel-${f}`;
    return (f, $) => (t(), l("div", {
      class: w(["dads-tab", `dads-tab--${a.orientation}`])
    }, [
      s("div", {
        role: "tablist",
        class: "dads-tab__list",
        "aria-label": a.ariaLabel,
        "aria-orientation": a.orientation,
        onKeydown: i
      }, [
        (t(!0), l(P, null, U(a.items, (k) => (t(), l("button", {
          id: _(k.value),
          key: String(k.value),
          ref_for: !0,
          ref_key: "tabRefs",
          ref: v,
          type: "button",
          role: "tab",
          "aria-selected": u(k),
          "aria-controls": c(k.value),
          tabindex: u(k) ? 0 : -1,
          disabled: k.disabled || void 0,
          class: w(p(k)),
          onClick: (I) => n(k)
        }, [
          k.icon ? (t(), l("i", {
            key: 0,
            class: w(["mdi", k.icon, "dads-tab__icon"]),
            "aria-hidden": "true"
          }, null, 2)) : b("", !0),
          s("span", Zl, y(k.label), 1)
        ], 10, Ul))), 128))
      ], 40, jl),
      s("div", Yl, [
        (t(!0), l(P, null, U(a.items, (k) => ye((t(), l("div", {
          id: c(k.value),
          key: String(k.value),
          role: "tabpanel",
          "aria-labelledby": _(k.value),
          hidden: !a.keepAlive && !u(k) ? !0 : void 0,
          class: "dads-tab__panel",
          tabindex: 0
        }, [
          a.keepAlive || u(k) ? j(f.$slots, `panel-${k.value}`, { key: 0 }, void 0, !0) : b("", !0)
        ], 8, Gl)), [
          [ke, u(k)]
        ])), 128))
      ])
    ], 2));
  }
}), Qr = /* @__PURE__ */ H(Wl, [["__scopeId", "data-v-4689cd84"]]), Ql = ["role", "aria-live"], Jl = {
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
}, ds = ["aria-label"], os = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = {
      success: "mdi-check-circle",
      error: "mdi-alert-circle",
      warning: "mdi-alert",
      info: "mdi-information",
      neutral: "mdi-bell"
    }, m = d(() => h[e.color]), v = d(() => [
      "dads-notification-banner",
      `dads-notification-banner--${e.color}`,
      `dads-notification-banner--style-${e.style}`
    ]), u = d(
      () => e.color === "error" || e.color === "warning" ? "alert" : "status"
    ), n = d(() => e.color === "error" ? "assertive" : "polite"), o = d(() => e.timestamp === void 0 ? null : e.timestamp instanceof Date ? {
      iso: e.timestamp.toISOString(),
      display: e.timestamp.toLocaleString()
    } : { iso: e.timestamp, display: e.timestamp });
    be(() => {
      if (e.persistKey && !(typeof window > "u"))
        try {
          window.localStorage.getItem(e.persistKey) === "closed" && r("update:modelValue", !1);
        } catch {
        }
    });
    const i = () => {
      if (r("update:modelValue", !1), r("close"), e.persistKey && typeof window < "u")
        try {
          window.localStorage.setItem(e.persistKey, "closed");
        } catch {
        }
    };
    return (p, _) => (t(), ae(Me, { name: "dads-notification-banner" }, {
      default: se(() => [
        a.modelValue ? (t(), l("div", {
          key: 0,
          class: w(v.value),
          role: u.value,
          "aria-live": n.value
        }, [
          s("span", Jl, [
            j(p.$slots, "icon", {}, () => [
              s("i", {
                class: w(["mdi", m.value])
              }, null, 2)
            ], !0)
          ]),
          s("div", Xl, [
            a.title ? (t(), l("p", es, y(a.title), 1)) : b("", !0),
            a.message || p.$slots.default ? (t(), l("p", as, [
              j(p.$slots, "default", {}, () => [
                Q(y(a.message), 1)
              ], !0)
            ])) : b("", !0),
            o.value ? (t(), l("p", ts, [
              s("time", {
                datetime: o.value.iso
              }, y(o.value.display), 9, ls)
            ])) : b("", !0)
          ]),
          p.$slots.action ? (t(), l("div", ss, [
            j(p.$slots, "action", {}, void 0, !0)
          ])) : b("", !0),
          a.closable ? (t(), l("button", {
            key: 1,
            type: "button",
            class: "dads-notification-banner__close",
            "aria-label": a.closeLabel,
            onClick: i
          }, [..._[0] || (_[0] = [
            s("i", {
              class: "mdi mdi-close",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, ds)) : b("", !0)
        ], 10, Ql)) : b("", !0)
      ]),
      _: 3
    }));
  }
}), Jr = /* @__PURE__ */ H(os, [["__scopeId", "data-v-cae094ba"]]), is = ["aria-modal", "aria-labelledby"], ns = {
  key: 0,
  class: "dads-dialog__header"
}, rs = ["id"], cs = ["aria-label"], us = { class: "dads-dialog__body" }, vs = {
  key: 1,
  class: "dads-dialog__footer"
}, bs = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', fs = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null), m = d(() => e.variant === "modal");
    let v = null;
    const u = le(), n = () => {
      r("update:modelValue", !1), r("close");
    }, o = () => {
      e.persistent || n();
    }, i = () => {
      m.value && (e.persistent || n());
    }, p = () => h.value ? Array.from(h.value.querySelectorAll(bs)) : [], _ = (f) => f ? typeof f == "string" ? document.querySelector(f) : f : null, c = (f) => {
      if (!m.value || f.key !== "Tab") return;
      const $ = p();
      if ($.length === 0) {
        f.preventDefault(), h.value?.focus();
        return;
      }
      const k = $[0], I = $[$.length - 1], C = document.activeElement;
      f.shiftKey ? (C === k || C === h.value) && (f.preventDefault(), I.focus()) : C === I && (f.preventDefault(), k.focus());
    };
    return re(
      () => e.modelValue,
      async (f) => {
        if (f)
          v = document.activeElement, await De(), (_(e.initialFocus) ?? h.value)?.focus(), r("open");
        else {
          const $ = _(e.returnFocusTo);
          $ ? $.focus() : v && v.focus(), v = null;
        }
      }
    ), (f, $) => (t(), ae(Ee, { to: "body" }, [
      Ce(Me, { name: "dads-dialog" }, {
        default: se(() => [
          a.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-dialog", [`dads-dialog--${a.size}`, `dads-dialog--${a.variant}`]]),
            role: "dialog",
            "aria-modal": m.value ? "true" : void 0,
            "aria-labelledby": a.title ? Ve(u) : void 0,
            onKeydown: [
              Be(o, ["esc"]),
              c
            ]
          }, [
            m.value ? (t(), l("div", {
              key: 0,
              class: "dads-dialog__overlay",
              "aria-hidden": "true",
              onClick: i
            })) : b("", !0),
            s("div", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-dialog__panel",
              tabindex: "-1"
            }, [
              a.title || f.$slots.header || a.closable ? (t(), l("header", ns, [
                j(f.$slots, "header", {}, () => [
                  a.title ? (t(), l("h2", {
                    key: 0,
                    id: Ve(u),
                    class: "dads-dialog__title"
                  }, y(a.title), 9, rs)) : b("", !0)
                ], !0),
                a.closable ? (t(), l("button", {
                  key: 0,
                  type: "button",
                  class: "dads-dialog__close",
                  "aria-label": a.closeLabel,
                  onClick: n
                }, [...$[0] || ($[0] = [
                  s("i", {
                    class: "mdi mdi-close",
                    "aria-hidden": "true"
                  }, null, -1)
                ])], 8, cs)) : b("", !0)
              ])) : b("", !0),
              s("div", us, [
                j(f.$slots, "default", {}, void 0, !0)
              ]),
              f.$slots.footer ? (t(), l("footer", vs, [
                j(f.$slots, "footer", {}, void 0, !0)
              ])) : b("", !0)
            ], 512)
          ], 42, is)) : b("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Xr = /* @__PURE__ */ H(fs, [["__scopeId", "data-v-a08c675d"]]), hs = ["aria-describedby"], ms = ["id"], _s = { class: "dads-tooltip__content" }, xe = 8, gs = /* @__PURE__ */ R({
  __name: "DadsTooltip",
  props: {
    text: {},
    position: { default: "top" },
    openDelay: { default: 0 },
    closeDelay: { default: 0 },
    disabled: { type: Boolean, default: !1 },
    id: {}
  },
  setup(a) {
    const g = a, e = le(), r = d(() => g.id ?? `dads-tooltip-${e}`), h = q(null), m = q(null), v = q(!1), u = q({});
    let n = null, o = null;
    const i = () => {
      n !== null && (clearTimeout(n), n = null), o !== null && (clearTimeout(o), o = null);
    }, p = () => {
      g.disabled || (v.value = !0);
    }, _ = () => {
      v.value = !1;
    }, c = () => {
      g.disabled || (o !== null && (clearTimeout(o), o = null), !v.value && (g.openDelay > 0 ? n = setTimeout(() => {
        n = null, p();
      }, g.openDelay) : p()));
    }, f = () => {
      n !== null && (clearTimeout(n), n = null), v.value && (g.closeDelay > 0 ? o = setTimeout(() => {
        o = null, _();
      }, g.closeDelay) : _());
    }, $ = () => {
      const C = h.value, x = m.value;
      if (!C || !x) return;
      const D = C.getBoundingClientRect(), B = x.getBoundingClientRect(), N = window.scrollX, te = window.scrollY;
      let G = 0, F = 0;
      switch (g.position) {
        case "top":
          G = D.top - B.height - xe, F = D.left + D.width / 2 - B.width / 2;
          break;
        case "top-start":
          G = D.top - B.height - xe, F = D.left;
          break;
        case "top-end":
          G = D.top - B.height - xe, F = D.right - B.width;
          break;
        case "bottom":
          G = D.bottom + xe, F = D.left + D.width / 2 - B.width / 2;
          break;
        case "bottom-start":
          G = D.bottom + xe, F = D.left;
          break;
        case "bottom-end":
          G = D.bottom + xe, F = D.right - B.width;
          break;
        case "left":
          G = D.top + D.height / 2 - B.height / 2, F = D.left - B.width - xe;
          break;
        case "right":
          G = D.top + D.height / 2 - B.height / 2, F = D.right + xe;
          break;
      }
      u.value = {
        top: `${G + te}px`,
        left: `${F + N}px`
      };
    };
    re(v, async (C) => {
      C && (await De(), $());
    });
    const k = d(() => [`dads-tooltip--${g.position}`]), I = d(() => v.value && !g.disabled ? r.value : void 0);
    return _e(() => {
      i();
    }), (C, x) => (t(), l("span", {
      ref_key: "wrapRef",
      ref: h,
      class: "dads-tooltip__trigger-wrap",
      "aria-describedby": I.value,
      onMouseenter: c,
      onMouseleave: f,
      onFocusin: c,
      onFocusout: f
    }, [
      j(C.$slots, "trigger", {}, void 0, !0),
      (t(), ae(Ee, { to: "body" }, [
        Ce(Me, { name: "dads-tooltip" }, {
          default: se(() => [
            v.value && !a.disabled ? (t(), l("div", {
              key: 0,
              id: r.value,
              ref_key: "tipRef",
              ref: m,
              class: w(["dads-tooltip", k.value]),
              role: "tooltip",
              style: Ie(u.value)
            }, [
              s("div", _s, [
                j(C.$slots, "default", {}, () => [
                  Q(y(a.text), 1)
                ], !0)
              ]),
              x[0] || (x[0] = s("span", {
                class: "dads-tooltip__arrow",
                "aria-hidden": "true"
              }, null, -1))
            ], 14, ms)) : b("", !0)
          ]),
          _: 3
        })
      ]))
    ], 40, hs));
  }
}), ec = /* @__PURE__ */ H(gs, [["__scopeId", "data-v-c8c0469d"]]), ps = ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-label"], ys = {
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
  setup(a) {
    const g = a, e = 2 * Math.PI * Oe, r = d(() => g.value === void 0), h = d(() => {
      if (g.value !== void 0)
        return Math.max(0, Math.min(100, g.value));
    }), m = d(() => {
      if (h.value !== void 0)
        return e * (1 - h.value / 100);
    }), v = d(() => [
      "dads-progress-indicator",
      `dads-progress-indicator--${g.variant}`,
      `dads-progress-indicator--${g.size}`,
      `dads-progress-indicator--color-${g.color}`,
      {
        "dads-progress-indicator--indeterminate": r.value
      }
    ]), u = d(() => g.label !== void 0 ? g.label : r.value ? "" : `${h.value}%`);
    return (n, o) => (t(), l("div", {
      class: w(v.value),
      role: "progressbar",
      "aria-valuemin": r.value ? void 0 : 0,
      "aria-valuemax": r.value ? void 0 : 100,
      "aria-valuenow": r.value ? void 0 : h.value,
      "aria-label": a.ariaLabel
    }, [
      a.variant === "linear" ? (t(), l("div", ys, [
        s("div", {
          class: "dads-progress-indicator__bar-fill",
          style: Ie(r.value ? void 0 : { width: `${h.value}%` })
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
          "stroke-dasharray": e,
          "stroke-dashoffset": r.value ? void 0 : m.value
        }, null, 8, $s)
      ])),
      a.showLabel && u.value ? (t(), l("span", xs, y(u.value), 1)) : b("", !0)
    ], 10, ps));
  }
}), ac = /* @__PURE__ */ H(ws, [["__scopeId", "data-v-c7e52e14"]]), Is = {
  key: 0,
  class: "dads-card__image"
}, Cs = {
  key: 1,
  class: "dads-card__header"
}, Ds = { class: "dads-card__body" }, Ls = {
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => [
      "dads-card",
      `dads-card--${e.variant}`,
      e.variant === "elevated" && `dads-card--elevation-${e.elevation}`,
      e.clickable && "dads-card--clickable"
    ]), m = (u) => {
      e.clickable && r("click", u);
    }, v = (u) => {
      e.clickable && (u.key === "Enter" || u.key === " " || u.key === "Spacebar") && (u.preventDefault(), m(u));
    };
    return (u, n) => (t(), ae(ce(a.clickable ? "button" : "div"), {
      type: a.clickable ? "button" : void 0,
      class: w(h.value),
      "aria-label": a.clickable ? a.ariaLabel : void 0,
      onClick: m,
      onKeydown: v
    }, {
      default: se(() => [
        u.$slots.image ? (t(), l("div", Is, [
          j(u.$slots, "image", {}, void 0, !0)
        ])) : b("", !0),
        u.$slots.header ? (t(), l("header", Cs, [
          j(u.$slots, "header", {}, void 0, !0)
        ])) : b("", !0),
        s("div", Ds, [
          j(u.$slots, "default", {}, void 0, !0)
        ]),
        u.$slots.sub ? (t(), l("div", Ls, [
          j(u.$slots, "sub", {}, void 0, !0)
        ])) : b("", !0),
        u.$slots.footer ? (t(), l("footer", Bs, [
          j(u.$slots, "footer", {}, void 0, !0)
        ])) : b("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "aria-label"]));
  }
}), tc = /* @__PURE__ */ H(Vs, [["__scopeId", "data-v-14ea26ab"]]), Ms = {
  key: 0,
  class: "dads-heading__shoulder"
}, As = {
  key: 0,
  class: "dads-heading__icon",
  "aria-hidden": "true"
}, Ss = { class: "dads-heading__text" }, zs = {
  key: 1,
  class: "dads-heading__chip"
}, Ts = {
  key: 1,
  class: "dads-heading__subtitle"
}, Es = /* @__PURE__ */ R({
  __name: "DadsHeading",
  props: {
    as: { default: "h2" },
    level: {},
    size: {},
    shoulder: {},
    subtitle: {},
    icon: {}
  },
  setup(a) {
    const g = a, e = Te(), r = d(() => g.level !== void 0 ? g.level : Number(g.as.charAt(1))), h = d(() => !!g.shoulder || !!e.shoulder), m = d(() => !!g.subtitle || !!e.subtitle), v = d(() => !!e.chip), u = d(() => h.value || m.value ? "hgroup" : "div"), n = d(() => {
      const o = [
        "dads-heading",
        `dads-heading--level-${r.value}`
      ];
      return g.size && o.push(`dads-heading--size-${g.size}`), o;
    });
    return (o, i) => (t(), ae(ce(u.value), {
      class: w(n.value)
    }, {
      default: se(() => [
        h.value ? (t(), l("p", Ms, [
          j(o.$slots, "shoulder", {}, () => [
            Q(y(a.shoulder), 1)
          ], !0)
        ])) : b("", !0),
        (t(), ae(ce(a.as), { class: "dads-heading__title" }, {
          default: se(() => [
            o.$slots["prepend-icon"] || a.icon ? (t(), l("span", As, [
              j(o.$slots, "prepend-icon", {}, () => [
                a.icon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", a.icon])
                }, null, 2)) : b("", !0)
              ], !0)
            ])) : b("", !0),
            s("span", Ss, [
              j(o.$slots, "default", {}, void 0, !0)
            ]),
            v.value ? (t(), l("span", zs, [
              j(o.$slots, "chip", {}, void 0, !0)
            ])) : b("", !0)
          ]),
          _: 3
        })),
        m.value ? (t(), l("p", Ts, [
          j(o.$slots, "subtitle", {}, () => [
            Q(y(a.subtitle), 1)
          ], !0)
        ])) : b("", !0)
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), lc = /* @__PURE__ */ H(Es, [["__scopeId", "data-v-6c1fa5cf"]]), Fs = ["aria-orientation", "aria-label"], Ns = { class: "dads-divider__label" }, Rs = {
  key: 1,
  class: "dads-divider__line",
  "aria-hidden": "true"
}, Hs = /* @__PURE__ */ R({
  __name: "DadsDivider",
  props: {
    orientation: { default: "horizontal" },
    color: { default: "default" },
    variant: { default: "full-width" },
    thickness: { default: 1 },
    lineStyle: { default: "solid" },
    ariaLabel: {}
  },
  setup(a) {
    const g = a, e = Te(), r = d(() => !!e.default && g.orientation === "horizontal"), h = d(() => [
      `dads-divider--${g.orientation}`,
      `dads-divider--${g.color}`,
      `dads-divider--${g.variant}`,
      `dads-divider--thickness-${g.thickness}`,
      `dads-divider--style-${g.lineStyle}`,
      {
        "dads-divider--with-label": r.value
      }
    ]);
    return (m, v) => (t(), l("div", {
      class: w(["dads-divider", h.value]),
      role: "separator",
      "aria-orientation": a.orientation,
      "aria-label": a.ariaLabel
    }, [
      r.value ? (t(), l(P, { key: 0 }, [
        v[0] || (v[0] = s("span", {
          class: "dads-divider__line",
          "aria-hidden": "true"
        }, null, -1)),
        s("span", Ns, [
          j(m.$slots, "default", {}, void 0, !0)
        ]),
        v[1] || (v[1] = s("span", {
          class: "dads-divider__line",
          "aria-hidden": "true"
        }, null, -1))
      ], 64)) : (t(), l("span", Rs))
    ], 10, Fs));
  }
}), sc = /* @__PURE__ */ H(Hs, [["__scopeId", "data-v-ff448fdb"]]), qs = {
  key: 0,
  class: "dads-table__caption"
}, Ps = {
  key: 2,
  class: "dads-table__skeleton-body",
  "aria-busy": "true",
  "aria-live": "polite"
}, Os = /* @__PURE__ */ R({
  __name: "DadsTable",
  props: {
    stickyHeader: { type: Boolean, default: !1 },
    density: { default: "comfortable" },
    bordered: { type: Boolean, default: !1 },
    striped: { type: Boolean, default: !1 },
    caption: {},
    loading: { type: Boolean, default: !1 },
    skeletonRowCount: { default: 3 },
    skeletonColumnCount: { default: 4 }
  },
  setup(a) {
    const g = a, e = d(() => Array.from({ length: g.skeletonRowCount }, (v, u) => u)), r = d(() => Array.from({ length: g.skeletonColumnCount }, (v, u) => u)), h = d(() => ({
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
    return (v, u) => (t(), l("div", {
      class: w(["dads-table-wrapper", h.value])
    }, [
      s("table", {
        class: w(["dads-table", m.value])
      }, [
        a.caption || v.$slots.caption ? (t(), l("caption", qs, [
          j(v.$slots, "caption", {}, () => [
            Q(y(a.caption), 1)
          ], !0)
        ])) : b("", !0),
        a.loading ? (t(), l("tbody", Ps, [
          (t(!0), l(P, null, U(e.value, (n) => (t(), l("tr", {
            key: n,
            class: "dads-table__skeleton-row"
          }, [
            (t(!0), l(P, null, U(r.value, (o) => (t(), l("td", {
              key: o,
              class: "dads-table__skeleton-cell"
            }, [...u[0] || (u[0] = [
              s("span", {
                class: "dads-table__skeleton-bar",
                "aria-hidden": "true"
              }, null, -1),
              s("span", { class: "dads-table__sr-only" }, "読み込み中", -1)
            ])]))), 128))
          ]))), 128))
        ])) : j(v.$slots, "default", { key: 1 }, void 0, !0)
      ], 2)
    ], 2));
  }
}), dc = /* @__PURE__ */ H(Os, [["__scopeId", "data-v-0adf24a3"]]), Ks = { class: "dads-accordion__heading" }, js = ["id", "aria-expanded", "aria-controls", "disabled", "onClick", "onKeydown"], Us = { class: "dads-accordion__title" }, Zs = {
  class: "dads-accordion__icon",
  "aria-hidden": "true"
}, Ys = ["id", "aria-labelledby"], Gs = {
  key: 0,
  class: "dads-accordion__return-link"
}, Ws = ["href"], Qs = /* @__PURE__ */ R({
  __name: "DadsAccordion",
  props: {
    modelValue: { default: () => "" },
    items: {},
    type: { default: "single" },
    size: { default: "m" },
    returnLink: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-accordion-${h}`), v = q([]), u = (f) => e.type === "multiple" ? Array.isArray(e.modelValue) && e.modelValue.includes(f) : e.modelValue === f, n = (f) => {
      if (!f.disabled) {
        if (e.type === "multiple") {
          const $ = Array.isArray(e.modelValue) ? e.modelValue : [], k = $.includes(f.id) ? $.filter((I) => I !== f.id) : [...$, f.id];
          r("update:modelValue", k);
          return;
        }
        r("update:modelValue", e.modelValue === f.id ? "" : f.id);
      }
    }, o = (f) => {
      De(() => {
        v.value[f]?.focus();
      });
    }, i = (f, $) => {
      const k = e.items.map((B, N) => B.disabled ? -1 : N).filter((B) => B >= 0);
      if (k.length === 0) return;
      const I = k.indexOf($), C = I === -1 ? 0 : I, x = k.length;
      let D;
      switch (f.key) {
        case "ArrowDown":
          D = k[(C + 1) % x];
          break;
        case "ArrowUp":
          D = k[(C - 1 + x) % x];
          break;
        case "Home":
          D = k[0];
          break;
        case "End":
          D = k[x - 1];
          break;
        default:
          return;
      }
      f.preventDefault(), o(D);
    }, p = (f) => `${m.value}-header-${f}`, _ = (f) => `${m.value}-panel-${f}`, c = (f) => [
      "dads-accordion__item",
      {
        "dads-accordion__item--open": u(f.id),
        "dads-accordion__item--disabled": f.disabled
      }
    ];
    return (f, $) => (t(), l("div", {
      class: w(["dads-accordion", `dads-accordion--size-${a.size}`])
    }, [
      (t(!0), l(P, null, U(a.items, (k, I) => (t(), l("div", {
        key: k.id,
        class: w(c(k))
      }, [
        s("h3", Ks, [
          s("button", {
            id: p(k.id),
            ref_for: !0,
            ref_key: "headerRefs",
            ref: v,
            type: "button",
            class: "dads-accordion__header",
            "aria-expanded": u(k.id),
            "aria-controls": _(k.id),
            disabled: k.disabled || void 0,
            onClick: (C) => n(k),
            onKeydown: (C) => i(C, I)
          }, [
            s("span", Us, y(k.title), 1),
            s("span", Zs, [
              s("i", {
                class: w(["mdi", u(k.id) ? "mdi-chevron-up" : "mdi-chevron-down"])
              }, null, 2)
            ])
          ], 40, js)
        ]),
        ye(s("div", {
          id: _(k.id),
          role: "region",
          class: "dads-accordion__panel",
          "aria-labelledby": p(k.id)
        }, [
          j(f.$slots, `panel-${k.id}`, {}, void 0, !0),
          a.returnLink ? (t(), l("p", Gs, [
            s("a", {
              href: a.returnLink.href
            }, y(a.returnLink.label), 9, Ws)
          ])) : b("", !0)
        ], 8, Ys), [
          [ke, u(k.id)]
        ])
      ], 2))), 128))
    ], 2));
  }
}), oc = /* @__PURE__ */ H(Qs, [["__scopeId", "data-v-01e324ac"]]), Js = {
  key: 0,
  class: "dads-chip-label__prepend",
  "aria-hidden": "true"
}, Xs = { class: "dads-chip-label__text" }, ed = {
  key: 1,
  class: "dads-chip-label__append",
  "aria-hidden": "true"
}, ad = /* @__PURE__ */ R({
  __name: "DadsChipLabel",
  props: {
    size: { default: "md" },
    color: { default: "primary" },
    appearance: { default: "filled" }
  },
  setup(a) {
    const g = a, e = d(() => [
      "dads-chip-label",
      `dads-chip-label--${g.size}`,
      `dads-chip-label--${g.color}`,
      `dads-chip-label--appearance-${g.appearance}`
    ]);
    return (r, h) => (t(), l("span", {
      class: w(e.value)
    }, [
      r.$slots.prepend ? (t(), l("span", Js, [
        j(r.$slots, "prepend", {}, void 0, !0)
      ])) : b("", !0),
      s("span", Xs, [
        j(r.$slots, "default", {}, void 0, !0)
      ]),
      r.$slots.append ? (t(), l("span", ed, [
        j(r.$slots, "append", {}, void 0, !0)
      ])) : b("", !0)
    ], 2));
  }
}), ic = /* @__PURE__ */ H(ad, [["__scopeId", "data-v-d13a89ef"]]), td = {
  key: 0,
  class: "dads-chip-tag__prepend",
  "aria-hidden": "true"
}, ld = { class: "dads-chip-tag__label" }, sd = {
  key: 1,
  class: "dads-chip-tag__append",
  "aria-hidden": "true"
}, dd = ["aria-label", "disabled"], od = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => [
      "dads-chip-tag",
      `dads-chip-tag--${e.size}`,
      `dads-chip-tag--${e.color}`,
      `dads-chip-tag--appearance-${e.appearance}`,
      {
        "dads-chip-tag--clickable": e.clickable
      }
    ]), m = d(() => !e.clickable && e.disabled ? "true" : void 0), v = (o) => {
      !e.clickable || e.disabled || r("click", o);
    }, u = (o) => {
      !e.clickable || e.disabled || (o.key === "Enter" || o.key === " ") && (o.preventDefault(), r("click", o));
    }, n = (o) => {
      e.disabled || r("close", o);
    };
    return (o, i) => (t(), ae(ce(a.clickable ? "button" : "span"), {
      type: a.clickable ? "button" : void 0,
      class: w(h.value),
      role: a.clickable ? "button" : void 0,
      tabindex: a.clickable && !a.disabled ? 0 : void 0,
      disabled: a.clickable && a.disabled || void 0,
      "aria-disabled": m.value,
      "aria-label": a.ariaLabel,
      onClick: v,
      onKeydown: u
    }, {
      default: se(() => [
        o.$slots.prepend ? (t(), l("span", td, [
          j(o.$slots, "prepend", {}, void 0, !0)
        ])) : b("", !0),
        s("span", ld, [
          j(o.$slots, "default", {}, void 0, !0)
        ]),
        o.$slots.append && !a.closable ? (t(), l("span", sd, [
          j(o.$slots, "append", {}, void 0, !0)
        ])) : b("", !0),
        a.closable ? (t(), l("button", {
          key: 2,
          type: "button",
          class: "dads-chip-tag__close",
          "aria-label": a.closeLabel,
          disabled: a.disabled,
          onClick: we(n, ["stop"])
        }, [...i[0] || (i[0] = [
          s("i", {
            class: "mdi mdi-close",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, dd)) : b("", !0)
      ]),
      _: 3
    }, 40, ["type", "class", "role", "tabindex", "disabled", "aria-disabled", "aria-label"]));
  }
}), nc = /* @__PURE__ */ H(od, [["__scopeId", "data-v-dda0e07b"]]), id = [
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
], nd = { class: "dads-color-picker__main" }, rd = ["value", "disabled", "aria-label"], cd = ["value", "disabled"], ud = {
  class: "dads-color-picker__swatches",
  role: "list"
}, vd = ["disabled", "aria-label", "aria-pressed", "onClick"], bd = /* @__PURE__ */ R({
  __name: "DadsColorPicker",
  props: {
    modelValue: {},
    swatches: { default: () => [...id] },
    disabled: { type: Boolean, default: !1 },
    label: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: g }) {
    const e = a, r = g, m = `dads-color-picker-${le()}`, v = `${m}-hex`, u = (c) => {
      if (!c) return "#000000";
      const f = c.trim().toLowerCase();
      return f.startsWith("#") ? f : `#${f}`;
    }, n = d(() => u(e.modelValue)), o = (c) => /^#[0-9a-f]{6}$/i.test(c.trim()), i = (c) => {
      const f = c.target;
      r("update:modelValue", u(f.value));
    }, p = (c) => {
      const f = c.target;
      o(f.value) && r("update:modelValue", u(f.value));
    }, _ = (c) => {
      e.disabled || r("update:modelValue", u(c));
    };
    return (c, f) => (t(), l("div", {
      class: w(["dads-color-picker", { "dads-color-picker--disabled": a.disabled }])
    }, [
      s("div", nd, [
        s("label", {
          for: m,
          class: "dads-color-picker__swatch-label"
        }, [
          s("input", {
            id: m,
            class: "dads-color-picker__color-input",
            type: "color",
            value: n.value,
            disabled: a.disabled,
            "aria-label": a.label ?? "色を選択",
            onInput: i
          }, null, 40, rd),
          s("span", {
            class: "dads-color-picker__swatch-preview",
            style: Ie({ backgroundColor: n.value }),
            "aria-hidden": "true"
          }, null, 4)
        ]),
        s("input", {
          id: v,
          class: "dads-color-picker__hex-input",
          type: "text",
          value: a.modelValue,
          disabled: a.disabled,
          maxlength: "7",
          spellcheck: "false",
          autocomplete: "off",
          "aria-label": "HEXカラーコード",
          onInput: p
        }, null, 40, cd)
      ]),
      s("ul", ud, [
        (t(!0), l(P, null, U(a.swatches, ($) => (t(), l("li", { key: $ }, [
          s("button", {
            type: "button",
            class: "dads-color-picker__swatch",
            style: Ie({ backgroundColor: $ }),
            disabled: a.disabled,
            "aria-label": `${$} を選択`,
            "aria-pressed": u($) === n.value,
            onClick: (k) => _($)
          }, null, 12, vd)
        ]))), 128))
      ])
    ], 2));
  }
}), rc = /* @__PURE__ */ H(bd, [["__scopeId", "data-v-aa69a8e9"]]), fd = ["for"], hd = {
  key: 0,
  class: "dads-date-picker__required",
  "aria-hidden": "true"
}, md = ["data-size"], _d = ["data-error", "data-disabled", "data-readonly"], gd = { class: "dads-date-picker__year" }, pd = ["id", "name", "value", "placeholder", "disabled", "readonly", "aria-invalid", "aria-required", "aria-describedby"], yd = {
  key: 0,
  class: "dads-date-picker__wareki",
  "aria-live": "polite"
}, kd = { class: "dads-date-picker__month" }, $d = ["id", "name", "value", "disabled", "readonly", "aria-invalid", "aria-describedby"], xd = { class: "dads-date-picker__day" }, wd = ["id", "name", "value", "disabled", "readonly", "aria-invalid", "aria-describedby"], Id = ["aria-expanded", "aria-controls", "disabled"], Cd = ["id", "aria-label"], Dd = { class: "dads-date-picker__calendar-header" }, Ld = ["disabled"], Bd = {
  class: "dads-date-picker__current-month",
  "aria-live": "polite"
}, Vd = ["disabled"], Md = ["aria-label"], Ad = ["data-selected", "data-today", "disabled", "aria-selected", "onClick"], Sd = {
  key: 1,
  "aria-hidden": "true",
  class: "dads-date-picker__date-placeholder"
}, zd = {
  key: 1,
  class: "dads-date-picker__footer"
}, Td = ["id"], Ed = ["id"], Fd = /* @__PURE__ */ R({
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
    locale: { default: "gregorian" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(a, { emit: g }) {
    const e = a, r = (V) => Number.isFinite(V) ? V >= 2019 ? { era: "令和", year: V - 2018 } : V >= 1989 ? { era: "平成", year: V - 1988 } : V >= 1926 ? { era: "昭和", year: V - 1925 } : V >= 1912 ? { era: "大正", year: V - 1911 } : V >= 1868 ? { era: "明治", year: V - 1867 } : null : null, h = g, m = le(), v = d(() => e.id ?? `dads-date-picker-${m}`), u = d(() => `${v.value}-year`), n = d(() => `${v.value}-month`), o = d(() => `${v.value}-day`), i = d(() => `${v.value}-popover`), p = d(() => `${v.value}-hint`), _ = d(() => `${v.value}-error`), c = d(() => e.error || !!e.errorMessage), f = d(() => {
      const V = [];
      return c.value && e.errorMessage ? V.push(_.value) : e.hint && V.push(p.value), V.length > 0 ? V.join(" ") : void 0;
    }), $ = d(() => c.value && !!e.errorMessage || !!e.hint), k = (V) => {
      if (!V || !/^\d{4}-\d{2}-\d{2}$/.test(V))
        return { year: null, month: null, day: null };
      const [A, ee, ne] = V.split("-").map((ie) => Number.parseInt(ie, 10));
      return Number.isNaN(A) || Number.isNaN(ee) || Number.isNaN(ne) ? { year: null, month: null, day: null } : { year: A, month: ee, day: ne };
    }, I = (V, A = 2) => String(V).padStart(A, "0"), C = (V, A, ee) => {
      if (V === null || A === null || ee === null || A < 1 || A > 12 || ee < 1 || ee > 31) return "";
      const ne = new Date(V, A - 1, ee);
      return ne.getFullYear() !== V || ne.getMonth() !== A - 1 || ne.getDate() !== ee ? "" : `${I(V, 4)}-${I(A)}-${I(ee)}`;
    }, x = q(""), D = q(""), B = q("");
    re(
      () => e.modelValue,
      (V) => {
        const A = k(V);
        x.value = A.year !== null ? String(A.year).padStart(4, "0") : "", D.value = A.month !== null ? I(A.month) : "", B.value = A.day !== null ? I(A.day) : "";
      },
      { immediate: !0 }
    );
    const N = () => {
      const V = x.value ? Number.parseInt(x.value, 10) : null, A = D.value ? Number.parseInt(D.value, 10) : null, ee = B.value ? Number.parseInt(B.value, 10) : null, ne = C(
        Number.isNaN(V) ? null : V,
        Number.isNaN(A) ? null : A,
        Number.isNaN(ee) ? null : ee
      );
      ne !== e.modelValue && (h("update:modelValue", ne), h("change", ne));
    }, te = (V) => {
      x.value = V.target.value.replace(/\D/g, "").slice(0, 4), N();
    }, G = (V) => {
      D.value = V.target.value.replace(/\D/g, "").slice(0, 2), N();
    }, F = (V) => {
      B.value = V.target.value.replace(/\D/g, "").slice(0, 2), N();
    }, W = q(null), X = q(null), de = q(null), Z = q(null), S = q(null), K = q(!1), M = q((/* @__PURE__ */ new Date()).getFullYear()), E = q((/* @__PURE__ */ new Date()).getMonth() + 1), O = () => {
      const V = k(e.modelValue);
      if (V.year !== null && V.month !== null) {
        M.value = V.year, E.value = V.month;
        return;
      }
      const A = /* @__PURE__ */ new Date();
      M.value = A.getFullYear(), E.value = A.getMonth() + 1;
    }, J = () => {
      e.disabled || e.readonly || (O(), K.value = !0);
    }, fe = () => {
      K.value && (K.value = !1, Z.value?.focus());
    }, Ae = () => {
      K.value ? fe() : J();
    }, Le = (V) => {
      let A = E.value + V, ee = M.value;
      A < 1 ? (A = 12, ee -= 1) : A > 12 && (A = 1, ee += 1), M.value = ee, E.value = A;
    }, ge = d(() => k(e.min)), pe = d(() => k(e.max)), T = (V, A) => V.y !== A.y ? V.y < A.y ? -1 : 1 : V.m !== A.m ? V.m < A.m ? -1 : 1 : V.d !== A.d ? V.d < A.d ? -1 : 1 : 0, L = (V, A, ee) => {
      const ne = { y: V, m: A, d: ee };
      if (ge.value.year !== null) {
        const ie = {
          y: ge.value.year,
          m: ge.value.month,
          d: ge.value.day
        };
        if (T(ne, ie) < 0) return !1;
      }
      if (pe.value.year !== null) {
        const ie = {
          y: pe.value.year,
          m: pe.value.month,
          d: pe.value.day
        };
        if (T(ne, ie) > 0) return !1;
      }
      return !0;
    }, z = /* @__PURE__ */ new Date(), Y = C(z.getFullYear(), z.getMonth() + 1, z.getDate()), oe = d(() => {
      const V = M.value, A = E.value, ne = new Date(V, A - 1, 1).getDay(), ie = new Date(V, A, 0).getDate(), he = [], me = new Date(V, A - 1, 1 - ne);
      for (let $e = 0; $e < 42; $e++) {
        const qe = me.getFullYear(), ze = me.getMonth() + 1, Pe = me.getDate(), Ye = ze === A, Se = C(qe, ze, Pe), da = !!Se && Se === e.modelValue;
        if (he.push({
          year: qe,
          month: ze,
          day: Pe,
          inMonth: Ye,
          disabled: !Ye || !L(qe, ze, Pe),
          selected: da,
          isToday: !!Se && Se === Y,
          iso: Se
        }), me.setDate(me.getDate() + 1), $e >= 27 && he[he.length - 1].day === ie && he[he.length - 1].inMonth) {
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
                iso: C(Qe, Je, Xe)
              }), me.setDate(me.getDate() + 1);
            }
          break;
        }
      }
      const Ze = [];
      for (let $e = 0; $e < he.length; $e += 7)
        Ze.push(he.slice($e, $e + 7));
      return Ze;
    }), ue = (V) => {
      if (!V.disabled) {
        if (V.iso === e.modelValue) {
          fe();
          return;
        }
        h("update:modelValue", V.iso), h("change", V.iso), fe();
      }
    }, Fe = d(() => {
      if (ge.value.year === null) return !0;
      const V = E.value === 1 ? M.value - 1 : M.value, A = E.value === 1 ? 12 : E.value - 1, ee = new Date(V, A, 0).getDate();
      return L(V, A, ee);
    }), aa = d(() => {
      if (pe.value.year === null) return !0;
      const V = E.value === 12 ? M.value + 1 : M.value, A = E.value === 12 ? 1 : E.value + 1;
      return L(V, A, 1);
    }), Ne = d(() => {
      const V = new Date(M.value, E.value - 1, 1);
      return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long" }).format(V);
    }), ta = ["日", "月", "火", "水", "木", "金", "土"], la = (V) => {
      V.key === "Escape" && (V.preventDefault(), fe());
    }, je = (V) => {
      if (!K.value) return;
      const A = V.target;
      A && S.value?.contains(A) || A && Z.value?.contains(A) || (K.value = !1);
    };
    be(() => {
      document.addEventListener("pointerdown", je, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", je, !0);
    }), re(
      () => e.disabled,
      (V) => {
        V && (K.value = !1);
      }
    );
    const Re = (V) => h("focus", V), He = (V) => h("blur", V), sa = d(() => [
      "dads-date-picker",
      `dads-date-picker--${e.size}`,
      `dads-date-picker--variant-${e.variant}`,
      `dads-date-picker--locale-${e.locale}`,
      {
        "dads-date-picker--disabled": e.disabled,
        "dads-date-picker--readonly": e.readonly,
        "dads-date-picker--error": c.value,
        "dads-date-picker--open": K.value
      }
    ]), Ue = d(() => {
      if (e.locale !== "japanese") return "";
      const V = Number(x.value);
      if (!Number.isFinite(V) || V === 0) return "";
      const A = r(V);
      return A ? `${A.era}${A.year}年` : "";
    });
    return (V, A) => (t(), l("div", {
      class: w(sa.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: u.value,
        class: "dads-date-picker__label-text"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", hd, "必須")) : b("", !0)
      ], 8, fd)) : b("", !0),
      s("div", {
        class: "dads-date-picker__controls",
        "data-size": a.size
      }, [
        s("div", {
          class: "dads-date-picker__inputs",
          "data-error": c.value || void 0,
          "data-disabled": a.disabled || void 0,
          "data-readonly": a.readonly || void 0
        }, [
          s("label", gd, [
            A[2] || (A[2] = s("span", { class: "dads-date-picker__label" }, "年", -1)),
            s("input", {
              id: u.value,
              ref_key: "yearInputRef",
              ref: W,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: a.name ? `${a.name}-year` : void 0,
              value: x.value,
              placeholder: a.placeholder,
              disabled: a.disabled || void 0,
              readonly: a.readonly || void 0,
              "aria-invalid": c.value || void 0,
              "aria-required": a.required || void 0,
              "aria-describedby": f.value,
              "data-js-year-input": "",
              onInput: te,
              onFocus: Re,
              onBlur: He
            }, null, 40, pd),
            Ue.value ? (t(), l("span", yd, y(Ue.value), 1)) : b("", !0)
          ]),
          s("label", kd, [
            A[3] || (A[3] = s("span", { class: "dads-date-picker__label" }, "月", -1)),
            s("input", {
              id: n.value,
              ref_key: "monthInputRef",
              ref: X,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: a.name ? `${a.name}-month` : void 0,
              value: D.value,
              disabled: a.disabled || void 0,
              readonly: a.readonly || void 0,
              "aria-invalid": c.value || void 0,
              "aria-describedby": f.value,
              "data-js-month-input": "",
              onInput: G,
              onFocus: Re,
              onBlur: He
            }, null, 40, $d)
          ]),
          s("label", xd, [
            A[4] || (A[4] = s("span", { class: "dads-date-picker__label" }, "日", -1)),
            s("input", {
              id: o.value,
              ref_key: "dayInputRef",
              ref: de,
              class: "dads-date-picker__input",
              type: "text",
              inputmode: "numeric",
              pattern: "[0-9]+",
              autocomplete: "off",
              name: a.name ? `${a.name}-day` : void 0,
              value: B.value,
              disabled: a.disabled || void 0,
              readonly: a.readonly || void 0,
              "aria-invalid": c.value || void 0,
              "aria-describedby": f.value,
              "data-js-day-input": "",
              onInput: F,
              onFocus: Re,
              onBlur: He
            }, null, 40, wd)
          ])
        ], 8, _d),
        s("button", {
          ref_key: "calendarButtonRef",
          ref: Z,
          type: "button",
          class: "dads-date-picker__calendar-button",
          "aria-expanded": K.value,
          "aria-controls": i.value,
          "aria-haspopup": "dialog",
          "aria-label": "カレンダーを開く",
          disabled: a.disabled || a.readonly || void 0,
          "data-js-calendar-button": "",
          onClick: Ae
        }, [...A[5] || (A[5] = [
          s("i", {
            class: "mdi mdi-calendar dads-date-picker__calendar-icon",
            "aria-hidden": "true"
          }, null, -1),
          s("i", {
            class: "mdi mdi-chevron-down dads-date-picker__calendar-chevron",
            "aria-hidden": "true"
          }, null, -1)
        ])], 8, Id),
        ye(s("div", {
          id: i.value,
          ref_key: "popoverRef",
          ref: S,
          class: "dads-date-picker__calendar-popover",
          role: "dialog",
          "aria-label": Ne.value,
          onKeydown: la
        }, [
          s("div", Dd, [
            s("button", {
              type: "button",
              class: "dads-date-picker__nav-button",
              disabled: !Fe.value || void 0,
              "aria-label": "前の月",
              onClick: A[0] || (A[0] = (ee) => Le(-1))
            }, [...A[6] || (A[6] = [
              s("i", {
                class: "mdi mdi-chevron-left",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, Ld),
            s("span", Bd, y(Ne.value), 1),
            s("button", {
              type: "button",
              class: "dads-date-picker__nav-button",
              disabled: !aa.value || void 0,
              "aria-label": "次の月",
              onClick: A[1] || (A[1] = (ee) => Le(1))
            }, [...A[7] || (A[7] = [
              s("i", {
                class: "mdi mdi-chevron-right",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, Vd)
          ]),
          s("table", {
            class: "dads-date-picker__calendar-table",
            role: "grid",
            "aria-label": Ne.value
          }, [
            s("thead", null, [
              s("tr", null, [
                (t(), l(P, null, U(ta, (ee) => s("th", {
                  key: ee,
                  scope: "col",
                  class: "dads-date-picker__weekday"
                }, y(ee), 1)), 64))
              ])
            ]),
            s("tbody", null, [
              (t(!0), l(P, null, U(oe.value, (ee, ne) => (t(), l("tr", { key: ne }, [
                (t(!0), l(P, null, U(ee, (ie) => (t(), l("td", {
                  key: `${ie.year}-${ie.month}-${ie.day}`,
                  class: "dads-date-picker__date-cell"
                }, [
                  ie.inMonth ? (t(), l("button", {
                    key: 0,
                    type: "button",
                    class: "dads-date-picker__date",
                    "data-selected": ie.selected || void 0,
                    "data-today": ie.isToday || void 0,
                    disabled: ie.disabled || void 0,
                    "aria-selected": ie.selected || void 0,
                    onClick: (he) => ue(ie)
                  }, y(ie.day), 9, Ad)) : (t(), l("span", Sd))
                ]))), 128))
              ]))), 128))
            ])
          ], 8, Md)
        ], 40, Cd), [
          [ke, K.value]
        ])
      ], 8, md),
      $.value ? (t(), l("div", zd, [
        c.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: _.value,
          class: "dads-date-picker__error-text",
          role: "alert"
        }, y(a.errorMessage), 9, Td)) : a.hint ? (t(), l("span", {
          key: 1,
          id: p.value,
          class: "dads-date-picker__hint"
        }, y(a.hint), 9, Ed)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), cc = /* @__PURE__ */ H(Fd, [["__scopeId", "data-v-225ef24f"]]), Nd = ["for"], Rd = {
  key: 0,
  class: "dads-search-box__required",
  "aria-hidden": "true"
}, Hd = { class: "dads-search-box__row" }, qd = ["value", "disabled", "aria-label"], Pd = {
  value: "",
  disabled: "",
  hidden: ""
}, Od = ["value"], Kd = { class: "dads-search-box__fields" }, jd = { class: "dads-search-box__input" }, Ud = {
  key: 0,
  class: "dads-u-visually-hidden"
}, Zd = ["id", "name", "value", "placeholder", "disabled", "readonly", "aria-invalid", "aria-required", "aria-describedby"], Yd = ["aria-label"], Gd = {
  key: 0,
  class: "dads-search-box__suggestions",
  role: "listbox"
}, Wd = ["onMousedown"], Qd = {
  key: 1,
  class: "dads-search-box__footer"
}, Jd = ["id"], Xd = ["id"], eo = /* @__PURE__ */ R({
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
    categoryPlaceholder: { default: "カテゴリ" }
  },
  emits: ["update:modelValue", "search", "focus", "blur", "update:category", "select:suggestion"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null), m = d(
      () => Array.isArray(e.suggestions) && e.suggestions.length > 0
    ), v = d(() => Array.isArray(e.categories) && e.categories.length > 0), u = d(
      () => e.clearable && !!e.modelValue && !e.disabled && !e.readonly
    ), n = (F) => {
      const W = F.target.value;
      r("update:category", W);
    }, o = (F) => {
      r("update:modelValue", F), r("select:suggestion", F), r("search", F);
    }, i = () => {
      r("update:modelValue", ""), h.value?.focus();
    }, p = le(), _ = d(() => e.id ?? `dads-search-box-${p}`), c = d(() => `${_.value}-hint`), f = d(() => `${_.value}-error`), $ = d(() => e.error || !!e.errorMessage), k = d(() => {
      if ($.value && e.errorMessage) return f.value;
      if (e.hint) return c.value;
    }), I = d(() => [
      "dads-search-box",
      `dads-search-box--${e.size}`,
      {
        "dads-search-box--disabled": e.disabled,
        "dads-search-box--readonly": e.readonly,
        "dads-search-box--error": $.value
      }
    ]), C = d(() => e.size), x = d(() => $.value && !!e.errorMessage || !!e.hint), D = (F) => {
      const W = F.target;
      r("update:modelValue", W.value);
    }, B = (F) => {
      F.key !== "Enter" || F.isComposing || e.disabled || (F.preventDefault(), r("search", e.modelValue ?? ""));
    }, N = () => {
      e.disabled || r("search", e.modelValue ?? "");
    }, te = (F) => r("focus", F), G = (F) => r("blur", F);
    return (F, W) => (t(), l("div", {
      class: w(I.value)
    }, [
      a.label ? (t(), l("label", {
        key: 0,
        for: _.value,
        class: "dads-search-box__label"
      }, [
        Q(y(a.label) + " ", 1),
        a.required ? (t(), l("span", Rd, "必須")) : b("", !0)
      ], 8, Nd)) : b("", !0),
      s("div", Hd, [
        v.value ? (t(), l("select", {
          key: 0,
          class: "dads-search-box__category",
          value: a.category,
          disabled: a.disabled || void 0,
          "aria-label": a.categoryPlaceholder,
          onChange: n
        }, [
          s("option", Pd, y(a.categoryPlaceholder), 1),
          (t(!0), l(P, null, U(a.categories, (X) => (t(), l("option", {
            key: X,
            value: X
          }, y(X), 9, Od))), 128))
        ], 40, qd)) : b("", !0),
        s("div", Kd, [
          s("label", jd, [
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
            a.label ? b("", !0) : (t(), l("span", Ud, y(a.buttonLabel), 1)),
            s("input", {
              id: _.value,
              ref_key: "inputRef",
              ref: h,
              type: "search",
              class: "dads-search-box__field",
              name: a.name,
              value: a.modelValue,
              placeholder: a.placeholder,
              disabled: a.disabled || void 0,
              readonly: a.readonly || void 0,
              "aria-invalid": $.value || void 0,
              "aria-required": a.required || void 0,
              "aria-describedby": k.value,
              onInput: D,
              onKeydown: B,
              onFocus: te,
              onBlur: G
            }, null, 40, Zd),
            u.value ? (t(), l("button", {
              key: 1,
              type: "button",
              class: "dads-search-box__clear",
              "aria-label": a.clearLabel,
              onClick: i
            }, " × ", 8, Yd)) : b("", !0)
          ]),
          m.value ? (t(), l("ul", Gd, [
            (t(!0), l(P, null, U(a.suggestions, (X, de) => (t(), l("li", {
              key: de,
              class: "dads-search-box__suggestion",
              role: "option",
              tabindex: "-1",
              onMousedown: we((Z) => o(X), ["prevent"])
            }, y(X), 41, Wd))), 128))
          ])) : b("", !0)
        ]),
        Ce(ca, {
          type: "submit",
          variant: "solid-fill",
          size: C.value,
          disabled: a.disabled,
          onClick: N
        }, {
          default: se(() => [
            Q(y(a.buttonLabel), 1)
          ]),
          _: 1
        }, 8, ["size", "disabled"])
      ]),
      x.value ? (t(), l("div", Qd, [
        $.value && a.errorMessage ? (t(), l("span", {
          key: 0,
          id: f.value,
          class: "dads-search-box__error",
          role: "alert"
        }, y(a.errorMessage), 9, Jd)) : a.hint ? (t(), l("span", {
          key: 1,
          id: c.value,
          class: "dads-search-box__hint"
        }, y(a.hint), 9, Xd)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), uc = /* @__PURE__ */ H(eo, [["__scopeId", "data-v-c987d01a"]]), ao = ["open", "aria-disabled"], to = ["id", "aria-expanded", "aria-controls", "aria-disabled", "tabindex"], lo = { class: "dads-disclosure__title" }, so = ["id", "aria-labelledby"], oo = /* @__PURE__ */ R({
  __name: "DadsDisclosure",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    title: {},
    disabled: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-disclosure-${h}`), v = d(() => `${m.value}-summary`), u = d(() => `${m.value}-content`), n = d(() => e.modelValue !== void 0), o = q(e.defaultOpen), i = d(
      () => n.value ? !!e.modelValue : o.value
    ), p = q(null);
    re(i, (k) => {
      p.value && p.value.open !== k && (p.value.open = k);
    });
    const _ = (k) => {
      n.value || (o.value = k), r("update:modelValue", k), r("toggle", k);
    }, c = (k) => {
      k.preventDefault(), !e.disabled && _(!i.value);
    }, f = (k) => {
      k.key !== "Enter" && k.key !== " " || (k.preventDefault(), !e.disabled && _(!i.value));
    }, $ = d(() => [
      "dads-disclosure",
      {
        "dads-disclosure--open": i.value,
        "dads-disclosure--disabled": e.disabled
      }
    ]);
    return (k, I) => (t(), l("details", {
      ref_key: "detailsRef",
      ref: p,
      class: w($.value),
      open: i.value,
      "aria-disabled": a.disabled || void 0
    }, [
      s("summary", {
        id: v.value,
        class: "dads-disclosure__summary",
        "aria-expanded": i.value,
        "aria-controls": u.value,
        "aria-disabled": a.disabled || void 0,
        tabindex: a.disabled ? -1 : 0,
        onClick: c,
        onKeydown: f
      }, [
        I[0] || (I[0] = s("svg", {
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
        s("span", lo, y(a.title), 1)
      ], 40, to),
      s("div", {
        id: u.value,
        class: "dads-disclosure__content",
        role: "region",
        "aria-labelledby": v.value
      }, [
        j(k.$slots, "default", {}, void 0, !0)
      ], 8, so)
    ], 10, ao));
  }
}), vc = /* @__PURE__ */ H(oo, [["__scopeId", "data-v-aac80566"]]), io = ["data-marker"], no = /* @__PURE__ */ R({
  __name: "DadsDescriptionList",
  props: {
    items: {},
    layout: { default: "horizontal" },
    marker: { default: "none" },
    bordered: { type: Boolean, default: !1 }
  },
  setup(a) {
    const g = a, e = d(() => g.marker === "none" ? void 0 : g.marker), r = d(() => [
      "dads-description-list",
      `dads-description-list--${g.layout}`,
      {
        "dads-description-list--bordered": g.bordered
      }
    ]);
    return (h, m) => (t(), l("dl", {
      class: w(r.value),
      "data-marker": e.value
    }, [
      a.items && a.items.length > 0 ? (t(!0), l(P, { key: 0 }, U(a.items, (v, u) => (t(), l("div", {
        key: u,
        class: "dads-description-list__item"
      }, [
        s("dt", null, y(v.term), 1),
        s("dd", null, y(v.description), 1)
      ]))), 128)) : j(h.$slots, "default", { key: 1 }, void 0, !0)
    ], 10, io));
  }
}), bc = /* @__PURE__ */ H(no, [["__scopeId", "data-v-97d39272"]]), ro = { class: "dads-language-selector__box" }, co = ["id", "aria-label", "aria-controls", "aria-expanded", "disabled"], uo = { class: "dads-language-selector__opener-text" }, vo = ["id"], bo = ["aria-labelledby"], fo = ["id", "href", "lang", "hreflang", "aria-current", "onClick"], ho = { class: "dads-language-selector__label" }, mo = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-language-selector-opener-${h}`), v = d(() => `dads-language-selector-popup-${h}`), u = (S) => `${m.value}-item-${S}`, n = q(null), o = q(null), i = q(null), p = q([]), _ = q(!1), c = (S) => e.modelValue !== void 0 && e.modelValue === S.value, f = d(() => [
      "dads-language-selector",
      `dads-language-selector--${e.size}`,
      `dads-language-selector--${e.colorScheme}`,
      `dads-language-selector--corner-${e.cornerShape}`,
      {
        "dads-language-selector--disabled": e.disabled,
        "dads-language-selector--open": _.value
      }
    ]), $ = () => {
      e.disabled || _.value || (_.value = !0, r("open"));
    }, k = (S = !1) => {
      _.value && (_.value = !1, r("close"), S && o.value?.focus());
    }, I = () => {
      _.value ? k() : $();
    }, C = (S, K) => {
      !S.href && K && K.preventDefault(), r("update:modelValue", S.value), r("change", S.value), k(!0);
    }, x = (S) => {
      p.value[S]?.focus();
    }, D = () => x(0), B = () => x(e.options.length - 1), N = () => {
      const S = document.activeElement;
      return p.value.findIndex((K) => K === S);
    }, te = () => {
      const S = N();
      S < 0 || S >= e.options.length - 1 ? D() : x(S + 1);
    }, G = () => {
      const S = N();
      S <= 0 ? B() : x(S - 1);
    }, F = (S) => {
      S.preventDefault(), I();
    }, W = (S) => {
      if (!e.disabled)
        switch (S.key) {
          case "ArrowDown":
            S.preventDefault(), _.value ? D() : ($(), De(D));
            break;
          case "ArrowUp":
            S.preventDefault(), _.value ? B() : ($(), De(B));
            break;
          case "Enter":
          case " ":
            S.preventDefault(), I();
            break;
        }
    }, X = (S) => {
      if (_.value)
        switch (S.key) {
          case "ArrowDown":
            S.preventDefault(), te();
            break;
          case "ArrowUp":
            S.preventDefault(), G();
            break;
          case "Home":
            S.preventDefault(), D();
            break;
          case "End":
            S.preventDefault(), B();
            break;
          case "Escape":
            S.preventDefault(), k(!0);
            break;
          case "Tab":
            k();
            break;
        }
    }, de = (S) => {
      if (!_.value) return;
      const K = S.target;
      K && n.value && n.value.contains(K) || k();
    };
    be(() => {
      document.addEventListener("pointerdown", de, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", de, !0);
    }), re(
      () => e.disabled,
      (S) => {
        S && k();
      }
    );
    const Z = (S) => (K) => {
      p.value[S] = K ?? null;
    };
    return (S, K) => (t(), l("div", {
      ref_key: "rootRef",
      ref: n,
      class: w(f.value)
    }, [
      s("div", ro, [
        s("button", {
          id: m.value,
          ref_key: "openerRef",
          ref: o,
          type: "button",
          class: "dads-language-selector__opener",
          "aria-label": a.ariaLabel,
          "aria-controls": v.value,
          "aria-expanded": _.value,
          "aria-haspopup": "menu",
          disabled: a.disabled || void 0,
          onClick: F,
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
          s("span", uo, y(a.openerLabel), 1),
          (t(), l("svg", {
            class: w(["dads-language-selector__opener-arrow", { "dads-language-selector__opener-arrow--open": _.value }]),
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "currentcolor",
            "aria-hidden": "true"
          }, [...K[0] || (K[0] = [
            s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)
          ])], 2))
        ], 40, co),
        ye(s("div", {
          id: v.value,
          class: "dads-language-selector__popup"
        }, [
          s("ul", {
            ref_key: "menuRef",
            ref: i,
            class: "dads-language-selector__menu",
            role: "menu",
            "aria-labelledby": m.value,
            onKeydown: X
          }, [
            (t(!0), l(P, null, U(a.options, (M, E) => (t(), l("li", {
              key: M.value,
              role: "none",
              class: "dads-language-selector__item-wrap"
            }, [
              s("a", {
                id: u(E),
                ref_for: !0,
                ref: Z(E),
                role: "menuitem",
                class: w(["dads-language-selector__item", { "dads-language-selector__item--current": c(M) }]),
                href: M.href ?? "#",
                lang: M.value,
                hreflang: M.value,
                "aria-current": c(M) ? "true" : void 0,
                tabindex: "-1",
                onClick: (O) => C(M, O)
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
                s("span", ho, y(M.label), 1)
              ], 10, fo)
            ]))), 128))
          ], 40, bo)
        ], 8, vo), [
          [ke, _.value]
        ])
      ])
    ], 2));
  }
}), fc = /* @__PURE__ */ H(mo, [["__scopeId", "data-v-b0342960"]]), _o = {
  key: 0,
  class: "dads-menu-list__section",
  role: "presentation"
}, go = { class: "dads-menu-list__section-title" }, po = {
  key: 1,
  class: "dads-menu-list__divider"
}, yo = ["href", "aria-current", "onClick"], ko = { class: "dads-menu-list__label" }, $o = ["role", "aria-label", "aria-hidden"], xo = ["disabled", "aria-current", "aria-expanded", "onClick"], wo = { class: "dads-menu-list__label" }, Io = ["role", "aria-label", "aria-hidden"], Co = {
  key: 0,
  class: "dads-menu-list__section",
  role: "presentation"
}, Do = { class: "dads-menu-list__section-title" }, Lo = {
  key: 1,
  class: "dads-menu-list__divider"
}, Bo = ["href", "aria-current", "onClick"], Vo = { class: "dads-menu-list__label" }, Mo = ["role", "aria-label", "aria-hidden"], Ao = ["disabled", "aria-current", "aria-expanded", "onClick"], So = { class: "dads-menu-list__label" }, zo = ["role", "aria-label", "aria-hidden"], To = /* @__PURE__ */ R({
  __name: "DadsMenuList",
  props: {
    items: {},
    type: { default: "standard" },
    size: { default: "regular" },
    indentation: { default: 0 },
    ariaLabel: { default: void 0 }
  },
  emits: ["click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => e.indentation + 1), m = d(
      () => e.indentation > 0 ? { "--menu-list-indentation": String(e.indentation) } : void 0
    ), v = (i) => !!i.href && !i.disabled, u = (i) => ({
      class: "dads-menu-list__item",
      "data-type": e.type,
      "data-size": e.size,
      ...i.active ? { "data-current": "" } : {},
      ...i.expanded ? { "data-expanded": "" } : {}
    }), n = (i, p) => {
      if (i.disabled) {
        p.preventDefault();
        return;
      }
      r("click:item", i, p);
    }, o = (i, p) => {
      r("click:item", i, p);
    };
    return (i, p) => {
      const _ = Ke("DadsMenuList", !0);
      return a.ariaLabel ? (t(), ae(ce(a.ariaLabel ? "nav" : "ul"), {
        key: 0,
        class: "dads-menu-list-root",
        "aria-label": a.ariaLabel
      }, {
        default: se(() => [
          s("ul", {
            class: "dads-menu-list",
            style: Ie(m.value)
          }, [
            (t(!0), l(P, null, U(a.items, (c, f) => (t(), l("li", { key: f }, [
              c.divider ? (t(), l(P, { key: 0 }, [
                typeof c.divider == "object" && c.divider.title ? (t(), l("div", _o, [
                  s("span", go, y(c.divider.title), 1)
                ])) : (t(), l("hr", po))
              ], 64)) : v(c) ? (t(), l("a", ve({
                key: 1,
                ref_for: !0
              }, u(c), {
                href: c.href,
                "aria-current": c.active ? "page" : void 0,
                onClick: ($) => n(c, $)
              }), [
                c.frontIcon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", c.frontIcon, "dads-menu-list__front-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : b("", !0),
                s("span", ko, [
                  Q(y(c.label) + " ", 1),
                  c.tailIcon ? (t(), l("i", {
                    key: 0,
                    class: w(["mdi", c.tailIcon, "dads-menu-list__tail-icon"]),
                    role: c.tailIconLabel ? "img" : void 0,
                    "aria-label": c.tailIconLabel || void 0,
                    "aria-hidden": c.tailIconLabel ? void 0 : "true"
                  }, null, 10, $o)) : b("", !0)
                ]),
                c.endIcon ? (t(), l("i", {
                  key: 1,
                  class: w(["mdi", c.endIcon, "dads-menu-list__end-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : b("", !0)
              ], 16, yo)) : (t(), l("button", ve({
                key: 2,
                type: "button"
              }, { ref_for: !0 }, u(c), {
                disabled: c.disabled || void 0,
                "aria-current": c.active ? "page" : void 0,
                "aria-expanded": c.children && c.children.length > 0 ? !!c.expanded : void 0,
                onClick: ($) => n(c, $)
              }), [
                c.frontIcon ? (t(), l("i", {
                  key: 0,
                  class: w(["mdi", c.frontIcon, "dads-menu-list__front-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : b("", !0),
                s("span", wo, [
                  Q(y(c.label) + " ", 1),
                  c.tailIcon ? (t(), l("i", {
                    key: 0,
                    class: w(["mdi", c.tailIcon, "dads-menu-list__tail-icon"]),
                    role: c.tailIconLabel ? "img" : void 0,
                    "aria-label": c.tailIconLabel || void 0,
                    "aria-hidden": c.tailIconLabel ? void 0 : "true"
                  }, null, 10, Io)) : b("", !0)
                ]),
                c.endIcon ? (t(), l("i", {
                  key: 1,
                  class: w(["mdi", c.endIcon, "dads-menu-list__end-icon"]),
                  "aria-hidden": "true"
                }, null, 2)) : b("", !0)
              ], 16, xo)),
              c.children && c.children.length > 0 ? (t(), ae(_, {
                key: 3,
                items: c.children,
                type: a.type,
                size: a.size,
                indentation: h.value,
                "onClick:item": o
              }, null, 8, ["items", "type", "size", "indentation"])) : b("", !0)
            ]))), 128))
          ], 4)
        ]),
        _: 1
      }, 8, ["aria-label"])) : (t(), l("ul", {
        key: 1,
        class: "dads-menu-list",
        style: Ie(m.value)
      }, [
        (t(!0), l(P, null, U(a.items, (c, f) => (t(), l("li", { key: f }, [
          c.divider ? (t(), l(P, { key: 0 }, [
            typeof c.divider == "object" && c.divider.title ? (t(), l("div", Co, [
              s("span", Do, y(c.divider.title), 1)
            ])) : (t(), l("hr", Lo))
          ], 64)) : v(c) ? (t(), l("a", ve({
            key: 1,
            ref_for: !0
          }, u(c), {
            href: c.href,
            "aria-current": c.active ? "page" : void 0,
            onClick: ($) => n(c, $)
          }), [
            c.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", c.frontIcon, "dads-menu-list__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0),
            s("span", Vo, [
              Q(y(c.label) + " ", 1),
              c.tailIcon ? (t(), l("i", {
                key: 0,
                class: w(["mdi", c.tailIcon, "dads-menu-list__tail-icon"]),
                role: c.tailIconLabel ? "img" : void 0,
                "aria-label": c.tailIconLabel || void 0,
                "aria-hidden": c.tailIconLabel ? void 0 : "true"
              }, null, 10, Mo)) : b("", !0)
            ]),
            c.endIcon ? (t(), l("i", {
              key: 1,
              class: w(["mdi", c.endIcon, "dads-menu-list__end-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0)
          ], 16, Bo)) : (t(), l("button", ve({
            key: 2,
            type: "button"
          }, { ref_for: !0 }, u(c), {
            disabled: c.disabled || void 0,
            "aria-current": c.active ? "page" : void 0,
            "aria-expanded": c.children && c.children.length > 0 ? !!c.expanded : void 0,
            onClick: ($) => n(c, $)
          }), [
            c.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", c.frontIcon, "dads-menu-list__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0),
            s("span", So, [
              Q(y(c.label) + " ", 1),
              c.tailIcon ? (t(), l("i", {
                key: 0,
                class: w(["mdi", c.tailIcon, "dads-menu-list__tail-icon"]),
                role: c.tailIconLabel ? "img" : void 0,
                "aria-label": c.tailIconLabel || void 0,
                "aria-hidden": c.tailIconLabel ? void 0 : "true"
              }, null, 10, zo)) : b("", !0)
            ]),
            c.endIcon ? (t(), l("i", {
              key: 1,
              class: w(["mdi", c.endIcon, "dads-menu-list__end-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0)
          ], 16, Ao)),
          c.children && c.children.length > 0 ? (t(), ae(_, {
            key: 3,
            items: c.children,
            type: a.type,
            size: a.size,
            indentation: h.value,
            "onClick:item": o
          }, null, 8, ["items", "type", "size", "indentation"])) : b("", !0)
        ]))), 128))
      ], 4));
    };
  }
}), ea = /* @__PURE__ */ H(To, [["__scopeId", "data-v-4e5534be"]]), Eo = ["aria-expanded", "aria-controls"], Fo = { class: "dads-menu-list-box__trigger-label" }, No = ["id"], Ro = ["aria-label"], Ho = ["href", "aria-current", "aria-disabled", "data-current", "onClick"], qo = { class: "dads-menu-list-box__item-body" }, Po = { class: "dads-menu-list-box__item-label" }, Oo = {
  key: 0,
  class: "dads-menu-list-box__item-description"
}, Ko = ["disabled", "aria-current", "aria-disabled", "data-current", "onClick"], jo = { class: "dads-menu-list-box__item-body" }, Uo = { class: "dads-menu-list-box__item-label" }, Zo = {
  key: 0,
  class: "dads-menu-list-box__item-description"
}, Yo = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => !!e.triggerLabel), m = d(() => h.value ? e.modelValue : !0), v = le();
    re(
      () => e.modelValue,
      (_, c) => {
        h.value && _ !== c && r(_ ? "open" : "close");
      }
    );
    const u = () => {
      h.value && r("update:modelValue", !e.modelValue);
    }, n = d(
      () => e.items.map((_, c) => {
        const f = !!_.href && !_.disabled;
        return { item: _, index: c, isLink: f };
      })
    ), o = (_, c, f) => {
      if (_.disabled) {
        f.preventDefault();
        return;
      }
      r("click:item", _, c, f);
    }, i = d(() => [
      "dads-menu-list-box",
      {
        "dads-menu-list-box--with-opener": h.value,
        [`dads-menu-list-box--placement-${e.placement}`]: h.value
      }
    ]), p = d(() => [
      "dads-menu-list-box__trigger",
      `dads-menu-list-box__trigger--${e.triggerSize}`
    ]);
    return (_, c) => (t(), l("div", {
      class: w(i.value)
    }, [
      h.value ? (t(), l("button", {
        key: 0,
        type: "button",
        class: w(p.value),
        "aria-expanded": m.value ? "true" : "false",
        "aria-controls": Ve(v),
        onClick: u
      }, [
        a.triggerIcon ? (t(), l("i", {
          key: 0,
          class: w(["mdi", a.triggerIcon, "dads-menu-list-box__trigger-icon"]),
          "aria-hidden": "true"
        }, null, 2)) : b("", !0),
        s("span", Fo, y(a.triggerLabel), 1),
        c[0] || (c[0] = s("i", {
          class: "mdi mdi-chevron-down dads-menu-list-box__trigger-caret",
          "aria-hidden": "true"
        }, null, -1))
      ], 10, Eo)) : b("", !0),
      ye(s("div", {
        id: Ve(v),
        class: "dads-menu-list-box__surface"
      }, [
        s("ul", {
          class: "dads-menu-list-box__list",
          role: "menu",
          "aria-label": a.ariaLabel
        }, [
          (t(!0), l(P, null, U(n.value, (f) => (t(), l("li", {
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
              onClick: ($) => o(f.item, f.index, $)
            }, [
              f.item.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", f.item.iconName, "dads-menu-list-box__item-icon"]),
                "aria-hidden": "true"
              }, null, 2)) : b("", !0),
              s("span", qo, [
                s("span", Po, y(f.item.label), 1),
                f.item.description ? (t(), l("span", Oo, y(f.item.description), 1)) : b("", !0)
              ])
            ], 10, Ho)) : (t(), l("button", {
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
              onClick: ($) => o(f.item, f.index, $)
            }, [
              f.item.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", f.item.iconName, "dads-menu-list-box__item-icon"]),
                "aria-hidden": "true"
              }, null, 2)) : b("", !0),
              s("span", jo, [
                s("span", Uo, y(f.item.label), 1),
                f.item.description ? (t(), l("span", Zo, y(f.item.description), 1)) : b("", !0)
              ])
            ], 10, Ko))
          ]))), 128))
        ], 8, Ro)
      ], 8, No), [
        [ke, m.value]
      ])
    ], 2));
  }
}), hc = /* @__PURE__ */ H(Yo, [["__scopeId", "data-v-b9bc5f92"]]), Go = ["aria-expanded", "aria-controls", "aria-label", "disabled"], Wo = {
  key: 0,
  class: "dads-hamburger-menu-button__icon",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Qo = {
  key: 1,
  class: "dads-hamburger-menu-button__icon",
  width: "24",
  height: "24",
  viewBox: "0 0 120 120",
  "aria-hidden": "true"
}, Jo = {
  key: 2,
  class: "dads-hamburger-menu-button__label"
}, Xo = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => !!e.modelValue), m = d(() => [
      "dads-hamburger-menu-button",
      `dads-hamburger-menu-button--${e.size}`,
      `dads-hamburger-menu-button--variant-${e.variant}`,
      {
        "dads-hamburger-menu-button--open": h.value
      }
    ]), v = d(() => e.variant === "icon-only"), u = d(() => v.value ? n.value : void 0), n = d(() => h.value ? e.closeLabel : e.openLabel), o = (i) => {
      if (e.disabled) {
        i.preventDefault();
        return;
      }
      r("update:modelValue", !h.value), r("click", i);
    };
    return (i, p) => (t(), l("button", {
      type: "button",
      class: w(m.value),
      "aria-expanded": h.value,
      "aria-controls": a.ariaControls,
      "aria-label": u.value,
      disabled: a.disabled || void 0,
      onClick: o
    }, [
      h.value ? (t(), l("svg", Qo, [...p[1] || (p[1] = [
        s("path", {
          d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
          fill: "currentcolor"
        }, null, -1)
      ])])) : (t(), l("svg", Wo, [...p[0] || (p[0] = [
        s("path", {
          d: "M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z",
          fill: "currentcolor"
        }, null, -1)
      ])])),
      v.value ? b("", !0) : (t(), l("span", Jo, y(n.value), 1))
    ], 10, Go));
  }
}), mc = /* @__PURE__ */ H(Xo, [["__scopeId", "data-v-b3c58836"]]), ei = ["aria-label"], ai = ["href", "target", "rel", "onClick"], ti = { class: "dads-utility-link__label" }, li = {
  key: 1,
  class: "dads-utility-link__tail-icon",
  width: "16",
  height: "16",
  viewBox: "0 0 48 48",
  fill: "currentcolor",
  role: "img",
  "aria-label": "新規タブで開きます"
}, si = ["href", "target", "rel"], di = { class: "dads-utility-link__label" }, oi = {
  key: 1,
  class: "dads-utility-link__tail-icon",
  width: "16",
  height: "16",
  viewBox: "0 0 48 48",
  fill: "currentcolor",
  role: "img",
  "aria-label": "新規タブで開きます"
}, ii = /* @__PURE__ */ R({
  __name: "DadsUtilityLink",
  props: {
    href: {},
    label: {},
    iconName: {},
    external: { type: Boolean },
    items: {},
    ariaLabel: { default: "ユーティリティリンク" }
  },
  emits: ["click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => e.items !== void 0 ? e.items : e.href === void 0 || e.label === void 0 ? [] : [
      {
        label: e.label,
        href: e.href,
        iconName: e.iconName,
        external: e.external
      }
    ]), m = d(() => e.items !== void 0), v = (u, n, o) => {
      r("click:item", u, n, o);
    };
    return (u, n) => m.value ? (t(), l("ul", {
      key: 0,
      class: "dads-utility-link-list",
      "aria-label": a.ariaLabel
    }, [
      (t(!0), l(P, null, U(h.value, (o, i) => (t(), l("li", {
        key: `${o.href}-${i}`,
        class: "dads-utility-link-list__item"
      }, [
        s("a", {
          class: "dads-utility-link",
          href: o.href,
          target: o.external ? "_blank" : void 0,
          rel: o.external ? "noopener noreferrer" : void 0,
          onClick: (p) => v(o, i, p)
        }, [
          o.iconName ? (t(), l("i", {
            key: 0,
            class: w(["mdi", o.iconName, "dads-utility-link__lead-icon"]),
            "aria-hidden": "true"
          }, null, 2)) : b("", !0),
          s("span", ti, y(o.label), 1),
          o.external ? (t(), l("svg", li, [...n[1] || (n[1] = [
            s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)
          ])])) : b("", !0)
        ], 8, ai)
      ]))), 128))
    ], 8, ei)) : h.value.length === 1 ? (t(), l("a", {
      key: 1,
      class: "dads-utility-link",
      href: h.value[0].href,
      target: h.value[0].external ? "_blank" : void 0,
      rel: h.value[0].external ? "noopener noreferrer" : void 0,
      onClick: n[0] || (n[0] = (o) => v(h.value[0], 0, o))
    }, [
      h.value[0].iconName ? (t(), l("i", {
        key: 0,
        class: w(["mdi", h.value[0].iconName, "dads-utility-link__lead-icon"]),
        "aria-hidden": "true"
      }, null, 2)) : b("", !0),
      s("span", di, y(h.value[0].label), 1),
      h.value[0].external ? (t(), l("svg", oi, [...n[2] || (n[2] = [
        s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)
      ])])) : b("", !0)
    ], 8, si)) : b("", !0);
  }
}), ni = /* @__PURE__ */ H(ii, [["__scopeId", "data-v-19e67f54"]]), ri = ["aria-label", "disabled"], ci = { class: "dads-scroll-top-button__label" }, ui = /* @__PURE__ */ R({
  __name: "DadsScrollTopButton",
  props: {
    showOffset: { default: 200 },
    ariaLabel: { default: "ページの先頭へ戻る" },
    position: { default: "bottom-right" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(0), m = d(() => h.value > e.showOffset), v = d(() => [
      "dads-scroll-top-button",
      `dads-scroll-top-button--${e.position}`
    ]), u = () => {
      typeof window > "u" || (h.value = window.scrollY);
    }, n = (o) => {
      if (e.disabled) {
        o.preventDefault();
        return;
      }
      typeof window < "u" && window.scrollTo({ top: 0, behavior: "smooth" }), r("click", o);
    };
    return be(() => {
      typeof window > "u" || (h.value = window.scrollY, window.addEventListener("scroll", u, { passive: !0 }));
    }), _e(() => {
      typeof window > "u" || window.removeEventListener("scroll", u);
    }), (o, i) => ye((t(), l("button", {
      type: "button",
      class: w(v.value),
      "aria-label": a.ariaLabel,
      disabled: a.disabled,
      onClick: n
    }, [
      i[1] || (i[1] = s("span", {
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
      s("span", ci, [
        j(o.$slots, "default", {}, () => [
          i[0] || (i[0] = Q("トップへ", -1))
        ], !0)
      ])
    ], 10, ri)), [
      [ke, m.value]
    ]);
  }
}), _c = /* @__PURE__ */ H(ui, [["__scopeId", "data-v-b022d60b"]]), vi = ["aria-label"], bi = { class: "dads-global-menu" }, fi = ["href", "aria-current", "aria-disabled", "tabindex", "onClick"], hi = { class: "dads-global-menu__label" }, mi = ["disabled", "aria-current", "aria-haspopup", "aria-expanded", "onClick"], _i = { class: "dads-global-menu__label" }, gi = {
  key: 1,
  class: /* @__PURE__ */ w(["mdi", "mdi-chevron-down", "dads-global-menu__chevron"]),
  "aria-hidden": "true"
}, pi = /* @__PURE__ */ R({
  __name: "DadsGlobalMenu",
  props: {
    items: {},
    ariaLabel: { default: "グローバルメニュー" }
  },
  emits: ["click:item"],
  setup(a, { emit: g }) {
    const e = g, r = (v) => Array.isArray(v.children) && v.children.length > 0, h = (v) => !!v.href && !r(v), m = (v, u) => {
      if (v.disabled) {
        u.preventDefault();
        return;
      }
      e("click:item", v, u);
    };
    return (v, u) => (t(), l("nav", {
      class: "dads-global-menu-root",
      "aria-label": a.ariaLabel
    }, [
      s("ul", bi, [
        (t(!0), l(P, null, U(a.items, (n, o) => (t(), l("li", {
          key: o,
          class: "dads-global-menu__item"
        }, [
          h(n) ? (t(), l("a", {
            key: 0,
            class: "dads-global-menu__item-inner",
            href: n.disabled ? void 0 : n.href,
            "aria-current": n.active ? "page" : void 0,
            "aria-disabled": n.disabled ? "true" : void 0,
            tabindex: n.disabled ? -1 : void 0,
            onClick: (i) => m(n, i)
          }, [
            n.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", n.frontIcon, "dads-global-menu__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0),
            s("span", hi, y(n.label), 1)
          ], 8, fi)) : (t(), l("button", {
            key: 1,
            type: "button",
            class: "dads-global-menu__item-inner",
            disabled: n.disabled || void 0,
            "aria-current": n.active ? "page" : void 0,
            "aria-haspopup": r(n) ? "menu" : void 0,
            "aria-expanded": r(n) ? !!n.expanded : void 0,
            onClick: (i) => m(n, i)
          }, [
            n.frontIcon ? (t(), l("i", {
              key: 0,
              class: w(["mdi", n.frontIcon, "dads-global-menu__front-icon"]),
              "aria-hidden": "true"
            }, null, 2)) : b("", !0),
            s("span", _i, y(n.label), 1),
            r(n) ? (t(), l("i", gi)) : b("", !0)
          ], 8, mi))
        ]))), 128))
      ])
    ], 8, vi));
  }
}), gc = /* @__PURE__ */ H(pi, [["__scopeId", "data-v-923eeb2e"]]), yi = ["id", "aria-expanded", "aria-controls"], ki = { class: "dads-mega-menu__trigger-label" }, $i = ["id", "aria-label", "aria-labelledby"], xi = { class: "dads-mega-menu__columns" }, wi = {
  key: 0,
  class: "dads-mega-menu__heading"
}, Ii = /* @__PURE__ */ R({
  __name: "DadsMegaMenu",
  props: {
    modelValue: { type: Boolean, default: !1 },
    triggerLabel: {},
    columns: {},
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue", "click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-mega-menu-trigger-${h}`), v = d(() => `dads-mega-menu-panel-${h}`), u = q(null), n = q(null), o = d(() => e.modelValue), i = () => {
      o.value || r("update:modelValue", !0);
    }, p = (x = !1) => {
      o.value && (r("update:modelValue", !1), x && n.value?.focus());
    }, _ = () => {
      o.value ? p() : i();
    }, c = (x) => {
      x.preventDefault(), _();
    }, f = (x) => {
      switch (x.key) {
        case "Enter":
        case " ":
          x.preventDefault(), _();
          break;
        case "ArrowDown":
          x.preventDefault(), i();
          break;
      }
    }, $ = (x) => {
      x.key === "Escape" && (x.preventDefault(), p(!0));
    }, k = (x, D) => {
      r("click:item", x, D), x.disabled || p();
    }, I = (x) => {
      if (!o.value) return;
      const D = x.target;
      D && u.value && u.value.contains(D) || p();
    };
    be(() => {
      document.addEventListener("pointerdown", I, !0);
    }), _e(() => {
      document.removeEventListener("pointerdown", I, !0);
    });
    const C = (x) => {
      x.key === "Escape" && o.value && (x.preventDefault(), p(!0));
    };
    return re(
      () => e.modelValue,
      () => {
      }
    ), (x, D) => (t(), l("div", {
      ref_key: "rootRef",
      ref: u,
      class: w(["dads-mega-menu", { "dads-mega-menu--open": o.value }])
    }, [
      s("button", {
        id: m.value,
        ref_key: "triggerRef",
        ref: n,
        type: "button",
        class: "dads-mega-menu__trigger",
        "aria-expanded": o.value,
        "aria-controls": v.value,
        "aria-haspopup": "dialog",
        onClick: c,
        onKeydown: [
          f,
          Be(C, ["esc"])
        ]
      }, [
        s("span", ki, y(a.triggerLabel), 1),
        (t(), l("svg", {
          class: w(["dads-mega-menu__trigger-arrow", { "dads-mega-menu__trigger-arrow--open": o.value }]),
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "currentcolor",
          "aria-hidden": "true"
        }, [...D[0] || (D[0] = [
          s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)
        ])], 2))
      ], 40, yi),
      ye(s("div", {
        id: v.value,
        class: "dads-mega-menu__panel",
        role: "dialog",
        "aria-label": a.ariaLabel || a.triggerLabel,
        "aria-labelledby": a.ariaLabel ? void 0 : m.value,
        onKeydown: $
      }, [
        s("div", xi, [
          (t(!0), l(P, null, U(a.columns, (B, N) => (t(), l("section", {
            key: N,
            class: "dads-mega-menu__column"
          }, [
            B.heading ? (t(), l("h3", wi, y(B.heading), 1)) : b("", !0),
            Ce(ea, {
              items: B.items,
              "onClick:item": k
            }, null, 8, ["items"])
          ]))), 128))
        ])
      ], 40, $i), [
        [ke, o.value]
      ])
    ], 2));
  }
}), pc = /* @__PURE__ */ H(Ii, [["__scopeId", "data-v-c4f46c2b"]]), Ci = ["aria-label"], Di = { class: "dads-page-navigation__list" }, Li = {
  key: 0,
  class: "dads-page-navigation__item"
}, Bi = ["disabled", "aria-label"], Vi = {
  key: 1,
  class: "dads-page-navigation__item"
}, Mi = ["disabled"], Ai = { class: "dads-page-navigation__label" }, Si = {
  key: 0,
  class: "dads-page-navigation__item"
}, zi = {
  key: 1,
  class: "dads-page-navigation__item"
}, Ti = ["aria-current", "disabled", "onClick"], Ei = {
  key: 2,
  class: "dads-page-navigation__item"
}, Fi = ["disabled"], Ni = { class: "dads-page-navigation__label" }, Ri = {
  key: 3,
  class: "dads-page-navigation__item"
}, Hi = ["disabled", "aria-label"], qi = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => {
      const p = Math.max(1, Math.floor(e.totalPages)), _ = Math.max(0, Math.floor(e.maxPageButtons));
      if (_ <= 0) return [];
      if (p <= _) return Array.from({ length: p }, (C, x) => x + 1);
      const c = Math.max(0, _ - 2), f = Math.floor((c - 1) / 2);
      let $ = Math.max(2, e.modelValue - f), k = Math.min(p - 1, $ + c - 1);
      k - $ + 1 < c && ($ = Math.max(2, k - c + 1));
      const I = [1];
      $ > 2 && I.push("ellipsis");
      for (let C = $; C <= k; C++) I.push(C);
      return k < p - 1 && I.push("ellipsis"), I.push(p), I;
    }), m = (p) => p === e.modelValue, v = d(() => e.disabled || e.modelValue <= 1), u = d(() => e.disabled || e.modelValue >= e.totalPages), n = v, o = u, i = (p) => {
      if (e.disabled) return;
      const _ = Math.max(1, Math.min(e.totalPages, Math.floor(p)));
      _ !== e.modelValue && (r("update:modelValue", _), r("change", _));
    };
    return (p, _) => (t(), l("nav", {
      class: "dads-page-navigation",
      "aria-label": a.ariaLabel
    }, [
      s("ul", Di, [
        a.showFirstLast ? (t(), l("li", Li, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--first",
            disabled: Ve(n) || void 0,
            "aria-label": a.firstLabel,
            onClick: _[0] || (_[0] = (c) => i(1))
          }, [..._[4] || (_[4] = [
            s("i", {
              class: "mdi mdi-chevron-double-left",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, Bi)
        ])) : b("", !0),
        a.showPrevNext ? (t(), l("li", Vi, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--prev",
            disabled: v.value || void 0,
            onClick: _[1] || (_[1] = (c) => i(a.modelValue - 1))
          }, [
            _[5] || (_[5] = s("i", {
              class: "mdi mdi-chevron-left",
              "aria-hidden": "true"
            }, null, -1)),
            s("span", Ai, y(a.prevLabel), 1)
          ], 8, Mi)
        ])) : b("", !0),
        (t(!0), l(P, null, U(h.value, (c, f) => (t(), l(P, {
          key: `p-${f}-${c}`
        }, [
          c === "ellipsis" ? (t(), l("li", Si, [..._[6] || (_[6] = [
            s("span", {
              class: "dads-page-navigation__ellipsis",
              "aria-hidden": "true"
            }, "…", -1)
          ])])) : (t(), l("li", zi, [
            s("button", {
              type: "button",
              class: w(["dads-page-navigation__btn dads-page-navigation__btn--page", { "is-active": m(c) }]),
              "aria-current": m(c) ? "page" : void 0,
              disabled: a.disabled || void 0,
              onClick: ($) => i(c)
            }, y(c), 11, Ti)
          ]))
        ], 64))), 128)),
        a.showPrevNext ? (t(), l("li", Ei, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--next",
            disabled: u.value || void 0,
            onClick: _[2] || (_[2] = (c) => i(a.modelValue + 1))
          }, [
            s("span", Ni, y(a.nextLabel), 1),
            _[7] || (_[7] = s("i", {
              class: "mdi mdi-chevron-right",
              "aria-hidden": "true"
            }, null, -1))
          ], 8, Fi)
        ])) : b("", !0),
        a.showFirstLast ? (t(), l("li", Ri, [
          s("button", {
            type: "button",
            class: "dads-page-navigation__btn dads-page-navigation__btn--last",
            disabled: Ve(o) || void 0,
            "aria-label": a.lastLabel,
            onClick: _[3] || (_[3] = (c) => i(a.totalPages))
          }, [..._[8] || (_[8] = [
            s("i", {
              class: "mdi mdi-chevron-double-right",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, Hi)
        ])) : b("", !0)
      ])
    ], 8, Ci));
  }
}), yc = /* @__PURE__ */ H(qi, [["__scopeId", "data-v-e58e8fce"]]), Pi = ["aria-label"], Oi = { class: "dads-table-of-contents__list" }, Ki = ["href", "aria-current", "onClick"], ji = {
  key: 0,
  class: "dads-table-of-contents__list dads-table-of-contents__list--nested"
}, Ui = ["href", "aria-current", "onClick"], Zi = /* @__PURE__ */ R({
  __name: "DadsTableOfContents",
  props: {
    items: {},
    activeId: { default: void 0 },
    ariaLabel: { default: "このページの目次" }
  },
  emits: ["click:item"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = (u) => u.href ?? `#${u.id}`, m = (u) => e.activeId !== void 0 && e.activeId === u.id, v = (u, n) => {
      r("click:item", u, n);
    };
    return (u, n) => (t(), l("nav", {
      class: "dads-table-of-contents",
      "aria-label": a.ariaLabel
    }, [
      s("ul", Oi, [
        (t(!0), l(P, null, U(a.items, (o) => (t(), l("li", {
          key: o.id,
          class: w(["dads-table-of-contents__item", { "dads-table-of-contents__item--active": m(o) }])
        }, [
          s("a", {
            class: w(["dads-table-of-contents__link", { "dads-table-of-contents__link--active": m(o) }]),
            href: h(o),
            "aria-current": m(o) ? "location" : void 0,
            onClick: (i) => v(o, i)
          }, y(o.label), 11, Ki),
          o.children && o.children.length > 0 ? (t(), l("ul", ji, [
            (t(!0), l(P, null, U(o.children, (i) => (t(), l("li", {
              key: i.id,
              class: w(["dads-table-of-contents__item dads-table-of-contents__item--nested", { "dads-table-of-contents__item--active": m(i) }])
            }, [
              s("a", {
                class: w(["dads-table-of-contents__link dads-table-of-contents__link--nested", { "dads-table-of-contents__link--active": m(i) }]),
                href: h(i),
                "aria-current": m(i) ? "location" : void 0,
                onClick: (p) => v(i, p)
              }, y(i.label), 11, Ui)
            ], 2))), 128))
          ])) : b("", !0)
        ], 2))), 128))
      ])
    ], 8, Pi));
  }
}), kc = /* @__PURE__ */ H(Zi, [["__scopeId", "data-v-483f7e82"]]), Yi = ["aria-label"], Gi = { class: "dads-bottom-navigation__list" }, Wi = ["href", "aria-current", "aria-disabled", "tabindex", "onClick"], Qi = { class: "dads-bottom-navigation__label" }, Ji = ["aria-current", "disabled", "onClick"], Xi = { class: "dads-bottom-navigation__label" }, en = /* @__PURE__ */ R({
  __name: "DadsBottomNavigation",
  props: {
    modelValue: { default: void 0 },
    items: {},
    ariaLabel: { default: "ボトムナビゲーション" }
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = g, r = (v, u) => u !== void 0 && v.id === u, h = (v, u) => {
      if (v.disabled) {
        u.preventDefault();
        return;
      }
      e("update:modelValue", v.id), e("change", v.id);
    }, m = (v, u) => [
      "dads-bottom-navigation__item",
      {
        "dads-bottom-navigation__item--active": r(v, u),
        "dads-bottom-navigation__item--disabled": v.disabled
      }
    ];
    return (v, u) => (t(), l("nav", {
      "aria-label": a.ariaLabel,
      class: "dads-bottom-navigation"
    }, [
      s("ul", Gi, [
        (t(!0), l(P, null, U(a.items, (n) => (t(), l("li", {
          key: n.id,
          class: "dads-bottom-navigation__list-item"
        }, [
          n.href !== void 0 ? (t(), l("a", {
            key: 0,
            href: n.disabled ? void 0 : n.href,
            "aria-current": r(n, a.modelValue) ? "page" : void 0,
            "aria-disabled": n.disabled ? "true" : void 0,
            tabindex: n.disabled ? -1 : void 0,
            class: w(m(n, a.modelValue)),
            onClick: (o) => h(n, o)
          }, [
            s("i", {
              class: w(["mdi", n.iconName, "dads-bottom-navigation__icon"]),
              "aria-hidden": "true"
            }, null, 2),
            s("span", Qi, y(n.label), 1)
          ], 10, Wi)) : (t(), l("button", {
            key: 1,
            type: "button",
            "aria-current": r(n, a.modelValue) ? "page" : void 0,
            disabled: n.disabled || void 0,
            class: w(m(n, a.modelValue)),
            onClick: (o) => h(n, o)
          }, [
            s("i", {
              class: w(["mdi", n.iconName, "dads-bottom-navigation__icon"]),
              "aria-hidden": "true"
            }, null, 2),
            s("span", Xi, y(n.label), 1)
          ], 10, Ji))
        ]))), 128))
      ])
    ], 8, Yi));
  }
}), $c = /* @__PURE__ */ H(en, [["__scopeId", "data-v-04f947a3"]]), an = ["aria-label"], tn = {
  key: 0,
  class: "dads-mobile-menu__header"
}, ln = ["aria-label"], sn = {
  key: 1,
  class: "dads-mobile-menu__panel-title"
}, dn = ["aria-label"], on = {
  class: "dads-mobile-menu__nav",
  "aria-label": "メインナビゲーション"
}, nn = {
  key: 1,
  class: "dads-mobile-menu__slide-list"
}, rn = ["href", "onClick"], cn = { class: "dads-mobile-menu__slide-item-label" }, un = ["onClick"], vn = { class: "dads-mobile-menu__slide-item-label" }, bn = {
  key: 0,
  class: "mdi mdi-chevron-right dads-mobile-menu__slide-item-chevron",
  "aria-hidden": "true"
}, fn = {
  key: 1,
  class: "dads-mobile-menu__utility"
}, hn = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', mn = /* @__PURE__ */ R({
  __name: "DadsMobileMenu",
  props: {
    modelValue: { type: Boolean, default: !1 },
    items: {},
    type: { default: "accordion" },
    utilityItems: { default: void 0 },
    ariaLabel: { default: "モバイルメニュー" },
    closeLabel: { default: "閉じる" },
    backLabel: { default: "戻る" },
    showCloseButton: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "click:item", "click:utility"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(null), m = d(() => e.type === "slide"), v = q([]), u = d(() => v.value.length === 0 ? { items: e.items } : v.value[v.value.length - 1]), n = d(() => v.value.length > 0);
    let o = null;
    const i = () => {
      r("update:modelValue", !1);
    }, p = (I, C) => {
      r("click:item", I, C), (!I.children || I.children.length === 0) && i();
    }, _ = (I, C) => {
      if (I.children && I.children.length > 0) {
        v.value.push({ label: I.label, items: I.children });
        return;
      }
      r("click:item", I, C), i();
    }, c = () => {
      v.value.pop();
    }, f = (I, C, x) => {
      r("click:utility", I, C, x), i();
    }, $ = () => h.value ? Array.from(h.value.querySelectorAll(hn)) : [], k = (I) => {
      const C = $();
      if (C.length === 0) return;
      const x = C[0], D = C[C.length - 1], B = document.activeElement;
      I.shiftKey ? (B === x || B === h.value) && (I.preventDefault(), D.focus()) : B === D && (I.preventDefault(), x.focus());
    };
    return re(
      () => e.modelValue,
      async (I) => {
        I ? (o = document.activeElement, v.value = [], await De(), h.value?.focus()) : o && (o.focus(), o = null);
      }
    ), (I, C) => (t(), ae(Ee, { to: "body" }, [
      Ce(Me, { name: "dads-mobile-menu" }, {
        default: se(() => [
          a.modelValue ? (t(), l("div", {
            key: 0,
            class: w(["dads-mobile-menu", `dads-mobile-menu--type-${a.type}`]),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": a.ariaLabel,
            onKeydown: [
              Be(i, ["esc"]),
              Be(k, ["tab"])
            ]
          }, [
            s("div", {
              class: "dads-mobile-menu__overlay",
              "aria-hidden": "true",
              onClick: i
            }),
            s("div", {
              ref_key: "panelRef",
              ref: h,
              class: "dads-mobile-menu__panel",
              tabindex: "-1"
            }, [
              a.showCloseButton || m.value && n.value ? (t(), l("header", tn, [
                m.value && n.value ? (t(), l("button", {
                  key: 0,
                  type: "button",
                  class: "dads-mobile-menu__back",
                  "aria-label": a.backLabel,
                  onClick: c
                }, [
                  C[0] || (C[0] = s("i", {
                    class: "mdi mdi-chevron-left dads-mobile-menu__back-icon",
                    "aria-hidden": "true"
                  }, null, -1)),
                  s("span", null, y(a.backLabel), 1)
                ], 8, ln)) : b("", !0),
                m.value && u.value.label ? (t(), l("h2", sn, y(u.value.label), 1)) : b("", !0),
                a.showCloseButton ? (t(), l("button", {
                  key: 2,
                  type: "button",
                  class: "dads-mobile-menu__close",
                  "aria-label": a.closeLabel,
                  onClick: i
                }, [...C[1] || (C[1] = [
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
                ])], 8, dn)) : b("", !0)
              ])) : b("", !0),
              s("nav", on, [
                m.value ? (t(), l("ul", nn, [
                  (t(!0), l(P, null, U(u.value.items, (x, D) => (t(), l("li", {
                    key: D,
                    class: "dads-mobile-menu__slide-item-wrap"
                  }, [
                    x.href && (!x.children || x.children.length === 0) ? (t(), l("a", {
                      key: 0,
                      href: x.href,
                      class: "dads-mobile-menu__slide-item",
                      onClick: (B) => _(x, B)
                    }, [
                      s("span", cn, y(x.label), 1)
                    ], 8, rn)) : (t(), l("button", {
                      key: 1,
                      type: "button",
                      class: w(["dads-mobile-menu__slide-item", {
                        "dads-mobile-menu__slide-item--parent": x.children && x.children.length > 0
                      }]),
                      onClick: (B) => _(x, B)
                    }, [
                      s("span", vn, y(x.label), 1),
                      x.children && x.children.length > 0 ? (t(), l("i", bn)) : b("", !0)
                    ], 10, un))
                  ]))), 128))
                ])) : (t(), ae(ea, {
                  key: 0,
                  items: a.items,
                  type: "box",
                  "onClick:item": p
                }, null, 8, ["items"]))
              ]),
              a.utilityItems && a.utilityItems.length > 0 ? (t(), l("div", fn, [
                Ce(ni, {
                  items: a.utilityItems,
                  "aria-label": "補助リンク",
                  "onClick:item": f
                }, null, 8, ["items"])
              ])) : b("", !0)
            ], 512)
          ], 42, an)) : b("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), xc = /* @__PURE__ */ H(mn, [["__scopeId", "data-v-47fadc27"]]), _n = ["src", "alt", "width", "height", "loading"], gn = { class: "dads-image__caption" }, pn = ["src", "alt", "width", "height", "loading"], yn = /* @__PURE__ */ R({
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
  setup(a, { emit: g }) {
    const e = a, r = g, h = q(!1), m = d(() => h.value && e.placeholder ? e.placeholder : e.src), v = q(!1), u = (i) => {
      h.value = !1, v.value = !0, r("load", i);
    }, n = (i) => {
      !h.value && e.placeholder && (h.value = !0), v.value = !0, r("error", i);
    }, o = d(() => [
      "dads-image",
      `dads-image--fit-${e.objectFit}`,
      {
        "dads-image--loaded": v.value,
        "dads-image--skeleton": e.showSkeleton && !v.value
      }
    ]);
    return (i, p) => a.caption ? (t(), l("figure", {
      key: 0,
      class: w(o.value)
    }, [
      s("img", {
        class: "dads-image__img",
        src: m.value,
        alt: a.alt,
        width: a.width,
        height: a.height,
        loading: a.loading,
        onError: n,
        onLoad: u
      }, null, 40, _n),
      s("figcaption", gn, y(a.caption), 1)
    ], 2)) : (t(), l("img", {
      key: 1,
      class: w([...o.value, "dads-image__img"]),
      src: m.value,
      alt: a.alt,
      width: a.width,
      height: a.height,
      loading: a.loading,
      onError: n,
      onLoad: u
    }, null, 42, pn));
  }
}), wc = /* @__PURE__ */ H(yn, [["__scopeId", "data-v-052b5191"]]), kn = ["aria-label"], $n = {
  key: 0,
  class: "dads-image-slider__header"
}, xn = ["href"], wn = {
  class: "dads-image-slider__viewport",
  "aria-live": "polite"
}, In = ["id", "aria-label", "aria-hidden"], Cn = ["src", "alt"], Dn = {
  key: 0,
  class: "dads-image-slider__caption"
}, Ln = ["disabled"], Bn = ["disabled"], Vn = {
  key: 3,
  class: "dads-image-slider__indicators",
  role: "tablist",
  "aria-label": "スライド位置"
}, Mn = ["aria-selected", "aria-controls", "aria-label", "onClick"], An = /* @__PURE__ */ R({
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
    showAllHref: {}
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = a, r = d(() => `h${e.headingLevel}`), h = d(() => !!e.showAllLabel && !!e.showAllHref), m = d(() => !!e.heading || h.value), v = g, u = le(), n = d(() => `dads-image-slider-${u}`), o = (Z) => `${n.value}-slide-${Z}`, i = d(() => e.slides.length), p = (Z) => i.value === 0 || Z < 0 ? 0 : Z >= i.value ? Math.max(0, i.value - 1) : Z, _ = d(() => p(e.modelValue ?? 0)), c = (Z) => {
      if (i.value === 0) return;
      let S;
      e.loop ? S = (Z % i.value + i.value) % i.value : S = p(Z), S !== _.value && (v("update:modelValue", S), v("change", S));
    }, f = () => c(_.value + 1), $ = () => c(_.value - 1), k = d(() => e.loop || _.value > 0), I = d(() => e.loop || _.value < i.value - 1);
    let C = null;
    const x = q(!1), D = () => {
      C !== null && (clearInterval(C), C = null);
    }, B = () => {
      D(), !(!e.autoPlay || x.value || i.value <= 1) && (C = setInterval(() => {
        if (!e.loop && _.value >= i.value - 1) {
          D();
          return;
        }
        f();
      }, e.interval));
    }, N = () => {
      e.pauseOnHover && (x.value = !0, D());
    }, te = () => {
      e.pauseOnHover && (x.value = !1, B());
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
    be(() => {
      B();
    }), _e(() => {
      D();
    }), re(
      () => [e.autoPlay, e.interval, i.value],
      () => {
        B();
      }
    );
    const F = (Z) => [
      "dads-image-slider__indicator",
      {
        "dads-image-slider__indicator--active": Z === _.value
      }
    ], W = (Z) => [
      "dads-image-slider__slide",
      {
        "dads-image-slider__slide--active": Z === _.value
      }
    ], X = (Z) => c(Z), de = (Z, S) => `${S + 1} / ${i.value}: ${Z.alt}`;
    return (Z, S) => (t(), l("section", {
      class: "dads-image-slider",
      "aria-label": a.ariaLabel,
      "aria-roledescription": "carousel",
      tabindex: "0",
      onMouseenter: N,
      onMouseleave: te,
      onKeydown: G
    }, [
      m.value ? (t(), l("header", $n, [
        a.heading ? (t(), ae(ce(r.value), {
          key: 0,
          class: "dads-image-slider__heading"
        }, {
          default: se(() => [
            Q(y(a.heading), 1)
          ]),
          _: 1
        })) : b("", !0),
        h.value ? (t(), l("a", {
          key: 1,
          href: a.showAllHref,
          class: "dads-image-slider__show-all"
        }, y(a.showAllLabel), 9, xn)) : b("", !0)
      ])) : b("", !0),
      s("div", wn, [
        (t(!0), l(P, null, U(a.slides, (K, M) => (t(), l("div", {
          id: o(M),
          key: M,
          role: "group",
          "aria-roledescription": "slide",
          "aria-label": de(K, M),
          "aria-hidden": M === _.value ? void 0 : "true",
          class: w(W(M))
        }, [
          s("img", {
            class: "dads-image-slider__image",
            src: K.src,
            alt: K.alt
          }, null, 8, Cn),
          K.caption ? (t(), l("p", Dn, y(K.caption), 1)) : b("", !0)
        ], 10, In))), 128))
      ]),
      a.showArrows && i.value > 1 ? (t(), l("button", {
        key: 1,
        type: "button",
        class: "dads-image-slider__arrow dads-image-slider__arrow--prev",
        "aria-label": "前のスライド",
        disabled: !k.value || void 0,
        onClick: $
      }, [...S[0] || (S[0] = [
        s("span", { "aria-hidden": "true" }, "‹", -1)
      ])], 8, Ln)) : b("", !0),
      a.showArrows && i.value > 1 ? (t(), l("button", {
        key: 2,
        type: "button",
        class: "dads-image-slider__arrow dads-image-slider__arrow--next",
        "aria-label": "次のスライド",
        disabled: !I.value || void 0,
        onClick: f
      }, [...S[1] || (S[1] = [
        s("span", { "aria-hidden": "true" }, "›", -1)
      ])], 8, Bn)) : b("", !0),
      a.showIndicators && i.value > 1 ? (t(), l("div", Vn, [
        (t(!0), l(P, null, U(a.slides, (K, M) => (t(), l("button", {
          key: M,
          type: "button",
          role: "tab",
          "aria-selected": M === _.value,
          "aria-controls": o(M),
          "aria-label": `スライド ${M + 1}`,
          class: w(F(M)),
          onClick: (E) => X(M)
        }, [...S[2] || (S[2] = [
          s("span", {
            class: "dads-image-slider__indicator-dot",
            "aria-hidden": "true"
          }, null, -1)
        ])], 10, Mn))), 128))
      ])) : b("", !0)
    ], 40, kn));
  }
}), Ic = /* @__PURE__ */ H(An, [["__scopeId", "data-v-00a89b7b"]]), Sn = ["aria-label"], zn = {
  key: 0,
  class: "dads-carousel__header"
}, Tn = ["href"], En = {
  class: "dads-carousel__viewport",
  "aria-live": "polite"
}, Fn = ["id", "aria-label", "aria-hidden"], Nn = ["disabled"], Rn = ["disabled"], Hn = {
  key: 3,
  class: "dads-carousel__indicators",
  role: "tablist",
  "aria-label": "スライド位置"
}, qn = ["aria-selected", "aria-controls", "aria-label", "onClick"], Pn = /* @__PURE__ */ R({
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
    ariaLabel: { default: "カルーセル" }
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: g }) {
    const e = a;
    e.autoPlay, e.type === "container" && e.heading;
    const r = g, h = le(), m = d(() => `dads-carousel-${h}`), v = (E) => `${m.value}-slide-${E}`, u = d(() => Math.max(0, e.itemCount)), n = (E) => u.value === 0 || E < 0 ? 0 : E >= u.value ? Math.max(0, u.value - 1) : E, o = d(() => n(e.modelValue ?? 0)), i = (E) => {
      if (u.value === 0) return;
      let O;
      e.loop ? O = (E % u.value + u.value) % u.value : O = n(E), O !== o.value && (r("update:modelValue", O), r("change", O));
    }, p = () => i(o.value + 1), _ = () => i(o.value - 1), c = d(() => e.loop || o.value > 0), f = d(() => e.loop || o.value < u.value - 1);
    let $ = null;
    const k = q(!1), I = () => {
      $ !== null && (clearInterval($), $ = null);
    }, C = () => {
      I(), !(!e.autoPlay || k.value || u.value <= 1) && ($ = setInterval(() => {
        if (!e.loop && o.value >= u.value - 1) {
          I();
          return;
        }
        p();
      }, e.interval));
    }, x = () => {
      e.pauseOnHover && (k.value = !0, I());
    }, D = () => {
      e.pauseOnHover && (k.value = !1, C());
    }, B = (E) => {
      switch (E.key) {
        case "ArrowRight":
          E.preventDefault(), p();
          break;
        case "ArrowLeft":
          E.preventDefault(), _();
          break;
        default:
          return;
      }
    };
    be(() => {
      C();
    }), _e(() => {
      I();
    }), re(
      () => [e.autoPlay, e.interval, u.value],
      () => {
        C();
      }
    );
    const N = d(() => Array.from({ length: u.value }, (E, O) => O)), te = d(() => [
      "dads-carousel",
      `dads-carousel--type-${e.type}`,
      `dads-carousel--mode-${e.mode}`
    ]), G = d(() => `h${e.headingLevel}`), F = d(() => !!e.showAllLabel && !!e.showAllHref), W = d(() => e.mode === "multi"), X = d(() => W.value ? Math.max(1, Math.min(e.visibleCount, u.value || 1)) : 1), de = d(() => {
      if (W.value)
        return {
          "--dads-carousel-visible": String(X.value),
          transform: `translateX(calc(-${o.value} * (100% / var(--dads-carousel-visible))))`
        };
    }), Z = (E) => [
      "dads-carousel__slide",
      {
        "dads-carousel__slide--active": E === o.value
      }
    ], S = (E) => [
      "dads-carousel__indicator",
      {
        "dads-carousel__indicator--active": E === o.value
      }
    ], K = (E) => i(E), M = (E) => `${E + 1} / ${u.value}`;
    return (E, O) => (t(), l("section", {
      class: w(te.value),
      "aria-label": a.ariaLabel,
      "aria-roledescription": "carousel",
      tabindex: "0",
      onMouseenter: x,
      onMouseleave: D,
      onKeydown: B
    }, [
      a.heading || F.value ? (t(), l("header", zn, [
        a.heading ? (t(), ae(ce(G.value), {
          key: 0,
          class: "dads-carousel__heading"
        }, {
          default: se(() => [
            Q(y(a.heading), 1)
          ]),
          _: 1
        })) : b("", !0),
        F.value ? (t(), l("a", {
          key: 1,
          href: a.showAllHref,
          class: "dads-carousel__show-all"
        }, y(a.showAllLabel), 9, Tn)) : b("", !0)
      ])) : b("", !0),
      s("div", En, [
        s("div", {
          class: "dads-carousel__track",
          style: Ie(de.value)
        }, [
          (t(!0), l(P, null, U(N.value, (J) => (t(), l("div", {
            id: v(J),
            key: J,
            role: "group",
            "aria-roledescription": "slide",
            "aria-label": M(J),
            "aria-hidden": !W.value && J !== o.value ? "true" : void 0,
            class: w(Z(J))
          }, [
            j(E.$slots, "default", {
              index: J,
              isActive: J === o.value
            }, void 0, !0)
          ], 10, Fn))), 128))
        ], 4)
      ]),
      a.showArrows && u.value > 1 ? (t(), l("button", {
        key: 1,
        type: "button",
        class: "dads-carousel__arrow dads-carousel__arrow--prev",
        "aria-label": "前のスライド",
        disabled: !c.value || void 0,
        onClick: _
      }, [...O[0] || (O[0] = [
        s("span", { "aria-hidden": "true" }, "‹", -1)
      ])], 8, Nn)) : b("", !0),
      a.showArrows && u.value > 1 ? (t(), l("button", {
        key: 2,
        type: "button",
        class: "dads-carousel__arrow dads-carousel__arrow--next",
        "aria-label": "次のスライド",
        disabled: !f.value || void 0,
        onClick: p
      }, [...O[1] || (O[1] = [
        s("span", { "aria-hidden": "true" }, "›", -1)
      ])], 8, Rn)) : b("", !0),
      a.showIndicators && u.value > 1 ? (t(), l("div", Hn, [
        (t(!0), l(P, null, U(N.value, (J) => (t(), l("button", {
          key: J,
          type: "button",
          role: "tab",
          "aria-selected": J === o.value,
          "aria-controls": v(J),
          "aria-label": `スライド ${J + 1}`,
          class: w(S(J)),
          onClick: (fe) => K(J)
        }, [...O[2] || (O[2] = [
          s("span", {
            class: "dads-carousel__indicator-dot",
            "aria-hidden": "true"
          }, null, -1)
        ])], 10, qn))), 128))
      ])) : b("", !0)
    ], 42, Sn));
  }
}), Cc = /* @__PURE__ */ H(Pn, [["__scopeId", "data-v-b0294f81"]]), On = /* @__PURE__ */ R({
  __name: "DadsList",
  props: {
    type: { default: "unordered" },
    items: {},
    start: {},
    spacing: { default: "4" },
    nestingMarker: { type: Boolean, default: !0 }
  },
  setup(a) {
    const g = a, e = d(() => g.type === "ordered" ? "number" : void 0);
    g.type;
    const r = d(() => [
      "dads-list",
      `dads-list--spacing-${g.spacing}`,
      {
        "dads-list--no-nesting-marker": !g.nestingMarker
      }
    ]), h = (v) => typeof v == "string" ? { label: v } : v, m = d(() => Array.isArray(g.items) && g.items.length > 0);
    return (v, u) => {
      const n = Ke("DadsList", !0);
      return t(), ae(ce(a.type === "ordered" ? "ol" : "ul"), {
        class: w(r.value),
        "data-marker": e.value,
        "data-spacing": a.spacing,
        start: a.type === "ordered" ? a.start : void 0
      }, {
        default: se(() => [
          m.value ? (t(!0), l(P, { key: 0 }, U(a.items, (o, i) => (t(), l("li", { key: i }, [
            Q(y(h(o).label) + " ", 1),
            h(o).children && h(o).children.length > 0 ? (t(), ae(n, {
              key: 0,
              type: a.type,
              items: h(o).children
            }, null, 8, ["type", "items"])) : b("", !0)
          ]))), 128)) : j(v.$slots, "default", { key: 1 }, void 0, !0)
        ]),
        _: 3
      }, 8, ["class", "data-marker", "data-spacing", "start"]);
    };
  }
}), Dc = /* @__PURE__ */ H(On, [["__scopeId", "data-v-430ff576"]]), Kn = { class: "dads-blockquote-wrapper" }, jn = ["cite"], Un = { key: 1 }, Zn = {
  key: 0,
  class: "dads-blockquote__cite"
}, Yn = ["href"], Gn = /* @__PURE__ */ R({
  __name: "DadsBlockquote",
  props: {
    quote: {},
    cite: {},
    citeUrl: {}
  },
  setup(a) {
    const g = a, e = Te(), r = d(() => !!e.default), h = d(() => !!g.cite), m = d(() => !!g.citeUrl);
    return (v, u) => (t(), l("div", Kn, [
      s("blockquote", {
        class: "dads-blockquote",
        cite: a.citeUrl
      }, [
        r.value ? j(v.$slots, "default", { key: 0 }, void 0, !0) : a.quote ? (t(), l("p", Un, y(a.quote), 1)) : b("", !0)
      ], 8, jn),
      h.value ? (t(), l("cite", Zn, [
        m.value ? (t(), l("a", {
          key: 0,
          href: a.citeUrl,
          class: "dads-blockquote__cite-link"
        }, y(a.cite), 9, Yn)) : (t(), l(P, { key: 1 }, [
          Q(y(a.cite), 1)
        ], 64))
      ])) : b("", !0)
    ]));
  }
}), Lc = /* @__PURE__ */ H(Gn, [["__scopeId", "data-v-131dfe9a"]]), Wn = ["data-style", "aria-label"], Qn = ["data-style"], Jn = ["src"], Xn = { class: "dads-resource-list__contents" }, er = { class: "dads-resource-list__title" }, ar = {
  key: 0,
  class: "dads-resource-list__support"
}, tr = {
  key: 1,
  class: "dads-resource-list__tags"
}, lr = {
  key: 2,
  class: "dads-resource-list__sub"
}, sr = { key: 1 }, dr = /* @__PURE__ */ R({
  __name: "DadsResourceList",
  props: {
    items: {},
    variant: { default: "frame" },
    ariaLabel: {}
  },
  emits: ["click:item", "click:action"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(
      () => e.items.map((n, o) => ({
        item: n,
        index: o,
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
    ), m = (n) => !!n.href && !n.disabled, v = (n, o, i) => {
      if (n.disabled) {
        i.preventDefault();
        return;
      }
      r("click:item", n, o, i);
    }, u = (n, o, i) => {
      if (n.disabled) {
        i.preventDefault();
        return;
      }
      r("click:action", n, o, i);
    };
    return (n, o) => (t(), l("ul", {
      class: "dads-resource-list-group",
      "data-style": a.variant,
      "aria-label": a.ariaLabel
    }, [
      (t(!0), l(P, null, U(h.value, (i) => (t(), l("li", {
        key: i.index,
        class: "dads-resource-list-group__item"
      }, [
        s("div", {
          class: w(i.rowClass),
          "data-style": a.variant
        }, [
          (t(), ae(ce(m(i.item) ? "a" : "div"), {
            href: m(i.item) ? i.item.href : void 0,
            "aria-current": i.item.selected ? "true" : void 0,
            "aria-disabled": i.item.disabled || void 0,
            class: "dads-resource-list__body",
            onClick: (p) => v(i.item, i.index, p)
          }, {
            default: se(() => [
              i.item.thumbnail ? (t(), l("img", {
                key: 0,
                class: "dads-resource-list__thumbnail",
                src: i.item.thumbnail,
                alt: ""
              }, null, 8, Jn)) : i.item.iconName ? (t(), l("i", {
                key: 1,
                class: w(["mdi", i.item.iconName, "dads-resource-list__icon"]),
                "aria-hidden": "true"
              }, null, 2)) : b("", !0),
              s("div", Xn, [
                s("h3", er, y(i.item.title), 1),
                i.item.description ? (t(), l("div", ar, [
                  s("p", null, y(i.item.description), 1)
                ])) : b("", !0),
                i.hasTags ? (t(), l("ul", tr, [
                  (t(!0), l(P, null, U(i.item.tags, (p, _) => (t(), l("li", {
                    key: _,
                    class: "dads-resource-list__tag"
                  }, y(p), 1))), 128))
                ])) : b("", !0)
              ]),
              i.item.date ? (t(), l("div", lr, [
                s("p", null, y(i.item.date), 1)
              ])) : b("", !0)
            ]),
            _: 2
          }, 1032, ["href", "aria-current", "aria-disabled", "onClick"])),
          i.item.action ? (t(), ae(ce(i.item.action.href ? "a" : "button"), {
            key: 0,
            type: i.item.action.href ? void 0 : "button",
            href: i.item.action.href,
            "aria-label": i.item.action.label,
            disabled: !i.item.action.href && i.item.disabled ? !0 : void 0,
            class: "dads-resource-list__action",
            onClick: (p) => u(i.item, i.index, p)
          }, {
            default: se(() => [
              i.item.action.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", i.item.action.iconName]),
                "aria-hidden": "true"
              }, null, 2)) : (t(), l("span", sr, y(i.item.action.label), 1))
            ]),
            _: 2
          }, 1032, ["type", "href", "aria-label", "disabled", "onClick"])) : b("", !0)
        ], 10, Qn)
      ]))), 128))
    ], 8, Wn));
  }
}), Bc = /* @__PURE__ */ H(dr, [["__scopeId", "data-v-f3e0c97d"]]), or = ["aria-label"], ir = {
  key: 0,
  class: "dads-emergency-banner__timestamp"
}, nr = ["datetime"], rr = {
  key: 1,
  class: "dads-emergency-banner__header"
}, cr = { class: "dads-emergency-banner__heading" }, ur = { class: "dads-emergency-banner__body" }, vr = { class: "dads-emergency-banner__message" }, br = {
  key: 2,
  class: "dads-emergency-banner__action"
}, fr = ["href", "target", "rel"], hr = {
  key: 0,
  class: "mdi mdi-open-in-new dads-emergency-banner__external-icon",
  "aria-hidden": "true"
}, mr = {
  key: 1,
  class: "dads-emergency-banner__sr-only"
}, _r = ["aria-label"], gr = /* @__PURE__ */ R({
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
    linkExternal: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "close"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = d(() => e.timestamp === void 0 ? null : e.timestamp instanceof Date ? {
      iso: e.timestamp.toISOString(),
      display: e.timestamp.toLocaleString()
    } : { iso: e.timestamp, display: e.timestamp }), m = () => {
      r("update:modelValue", !1), r("close");
    };
    return (v, u) => (t(), ae(Me, { name: "dads-emergency-banner" }, {
      default: se(() => [
        a.modelValue ? (t(), l("div", {
          key: 0,
          class: "dads-emergency-banner",
          role: "alert",
          "aria-live": "assertive",
          "aria-label": a.ariaLabel
        }, [
          h.value ? (t(), l("p", ir, [
            s("time", {
              datetime: h.value.iso
            }, y(h.value.display), 9, nr)
          ])) : b("", !0),
          a.title || v.$slots.title ? (t(), l("header", rr, [
            s("h2", cr, [
              a.iconName ? (t(), l("i", {
                key: 0,
                class: w(["mdi", a.iconName, "dads-emergency-banner__icon"]),
                "aria-hidden": "true"
              }, null, 2)) : b("", !0),
              j(v.$slots, "title", {}, () => [
                Q(y(a.title), 1)
              ], !0)
            ])
          ])) : b("", !0),
          s("div", ur, [
            s("p", vr, [
              j(v.$slots, "default", {}, () => [
                Q(y(a.message), 1)
              ], !0)
            ])
          ]),
          a.linkLabel && a.linkHref ? (t(), l("div", br, [
            s("a", {
              class: "dads-emergency-banner__button",
              href: a.linkHref,
              target: a.linkExternal ? "_blank" : void 0,
              rel: a.linkExternal ? "noopener noreferrer" : void 0
            }, [
              Q(y(a.linkLabel) + " ", 1),
              a.linkExternal ? (t(), l("i", hr)) : b("", !0),
              a.linkExternal ? (t(), l("span", mr, " （新規タブで開く） ")) : b("", !0)
            ], 8, fr)
          ])) : b("", !0),
          a.closable ? (t(), l("button", {
            key: 3,
            type: "button",
            class: "dads-emergency-banner__close",
            "aria-label": a.closeLabel,
            onClick: m
          }, [...u[0] || (u[0] = [
            s("i", {
              class: "mdi mdi-close",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, _r)) : b("", !0)
        ], 8, or)) : b("", !0)
      ]),
      _: 3
    }));
  }
}), Vc = /* @__PURE__ */ H(gr, [["__scopeId", "data-v-97e16c8b"]]), pr = {
  class: "dads-table-control",
  role: "group",
  "aria-label": "テーブルコントロール"
}, yr = {
  key: 0,
  class: "dads-table-control__top"
}, kr = {
  key: 0,
  class: "dads-table-control__search"
}, $r = ["for"], xr = { class: "dads-table-control__search-control" }, wr = ["id", "value", "placeholder"], Ir = ["aria-label"], Cr = {
  key: 0,
  class: "dads-table-control__presets",
  role: "list"
}, Dr = ["aria-pressed", "onClick"], Lr = {
  key: 1,
  class: "dads-table-control__page-size"
}, Br = ["for"], Vr = ["id", "value"], Mr = ["value"], Ar = {
  key: 1,
  class: "dads-table-control__pagination"
}, Sr = ["id"], zr = {
  class: "dads-table-control__buttons",
  role: "navigation",
  "aria-label": "ページ送り"
}, Tr = ["disabled"], Er = {
  class: "dads-table-control__page-indicator",
  "aria-label": "現在のページ"
}, Fr = ["disabled"], Nr = /* @__PURE__ */ R({
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
    showPagination: { type: Boolean, default: !0 }
  },
  emits: ["update:search", "update:page", "update:pageSize", "click:preset", "reset"],
  setup(a, { emit: g }) {
    const e = a, r = g, h = le(), m = d(() => `dads-table-control-search-${h}`), v = d(() => `dads-table-control-page-size-${h}`), u = d(() => `dads-table-control-status-${h}`), n = d(() => {
      const D = Math.max(1, e.pageSize);
      return Math.max(1, Math.ceil(e.totalItems / D));
    }), o = d(() => e.currentPage <= 1), i = d(() => e.currentPage >= n.value), p = () => {
      o.value || r("update:page", Math.max(1, e.currentPage - 1));
    }, _ = () => {
      i.value || r("update:page", Math.min(n.value, e.currentPage + 1));
    }, c = (D) => {
      const B = D.target;
      r("update:search", B.value);
    }, f = (D) => {
      const B = D.target, N = Number(B.value);
      Number.isNaN(N) || (r("update:pageSize", N), e.currentPage > 1 && r("update:page", 1));
    }, $ = d(() => e.totalItems === 0 ? 0 : (e.currentPage - 1) * e.pageSize + 1), k = d(() => e.totalItems === 0 ? 0 : Math.min(e.totalItems, e.currentPage * e.pageSize)), I = d(() => e.totalItems === 0 ? "0 件" : `${$.value}-${k.value} / ${e.totalItems} 件`), C = (D) => {
      r("update:search", D.query), r("click:preset", D);
    }, x = () => {
      e.searchQuery && (r("update:search", ""), r("reset"));
    };
    return (D, B) => (t(), l("div", pr, [
      a.showSearch || a.showPageSize ? (t(), l("div", yr, [
        a.showSearch ? (t(), l("div", kr, [
          s("label", {
            for: m.value,
            class: "dads-table-control__label"
          }, "検索", 8, $r),
          s("div", xr, [
            B[1] || (B[1] = s("i", {
              class: "mdi mdi-magnify dads-table-control__search-icon",
              "aria-hidden": "true"
            }, null, -1)),
            s("input", {
              id: m.value,
              class: "dads-table-control__search-input",
              type: "search",
              value: a.searchQuery,
              placeholder: a.searchPlaceholder,
              onInput: c
            }, null, 40, wr),
            a.showReset && a.searchQuery ? (t(), l("button", {
              key: 0,
              type: "button",
              class: "dads-table-control__reset",
              "aria-label": a.resetLabel,
              onClick: x
            }, [...B[0] || (B[0] = [
              s("i", {
                class: "mdi mdi-close-circle",
                "aria-hidden": "true"
              }, null, -1)
            ])], 8, Ir)) : b("", !0)
          ]),
          a.presets.length > 0 ? (t(), l("div", Cr, [
            (t(!0), l(P, null, U(a.presets, (N, te) => (t(), l("button", {
              key: `${N.label}-${te}`,
              type: "button",
              role: "listitem",
              class: "dads-table-control__preset",
              "aria-pressed": a.searchQuery === N.query,
              onClick: (G) => C(N)
            }, y(N.label), 9, Dr))), 128))
          ])) : b("", !0)
        ])) : b("", !0),
        a.showPageSize ? (t(), l("div", Lr, [
          s("label", {
            for: v.value,
            class: "dads-table-control__label"
          }, "表示件数", 8, Br),
          s("select", {
            id: v.value,
            class: "dads-table-control__page-size-select",
            value: a.pageSize,
            onChange: f
          }, [
            (t(!0), l(P, null, U(a.pageSizeOptions, (N) => (t(), l("option", {
              key: N,
              value: N
            }, y(N) + " 件", 9, Mr))), 128))
          ], 40, Vr)
        ])) : b("", !0)
      ])) : b("", !0),
      a.showPagination ? (t(), l("div", Ar, [
        s("span", {
          id: u.value,
          class: "dads-table-control__status",
          "aria-live": "polite"
        }, y(I.value), 9, Sr),
        s("div", zr, [
          s("button", {
            type: "button",
            class: "dads-table-control__button dads-table-control__button--prev",
            disabled: o.value,
            "aria-label": "前のページ",
            onClick: p
          }, [...B[2] || (B[2] = [
            s("i", {
              class: "mdi mdi-chevron-left",
              "aria-hidden": "true"
            }, null, -1),
            Q(" 前へ ", -1)
          ])], 8, Tr),
          s("span", Er, y(a.currentPage) + " / " + y(n.value), 1),
          s("button", {
            type: "button",
            class: "dads-table-control__button dads-table-control__button--next",
            disabled: i.value,
            "aria-label": "次のページ",
            onClick: _
          }, [...B[3] || (B[3] = [
            Q(" 次へ ", -1),
            s("i", {
              class: "mdi mdi-chevron-right",
              "aria-hidden": "true"
            }, null, -1)
          ])], 8, Fr)
        ])
      ])) : b("", !0)
    ]));
  }
}), Mc = /* @__PURE__ */ H(Nr, [["__scopeId", "data-v-2de04934"]]);
export {
  id as DADS_DEFAULT_SWATCHES,
  oc as DadsAccordion,
  Lc as DadsBlockquote,
  $c as DadsBottomNavigation,
  Gr as DadsBreadcrumb,
  ca as DadsButton,
  tc as DadsCard,
  Cc as DadsCarousel,
  tt as DadsCheckbox,
  Or as DadsCheckboxGroup,
  Yt as DadsChip,
  ic as DadsChipLabel,
  nc as DadsChipTag,
  rc as DadsColorPicker,
  Ur as DadsCombobox,
  cc as DadsDatePicker,
  bc as DadsDescriptionList,
  Xr as DadsDialog,
  vc as DadsDisclosure,
  sc as DadsDivider,
  Yr as DadsDrawer,
  Vc as DadsEmergencyBanner,
  jr as DadsFileUpload,
  gc as DadsGlobalMenu,
  mc as DadsHamburgerMenuButton,
  Zr as DadsHeader,
  Zr as DadsHeaderContainer,
  lc as DadsHeading,
  wc as DadsImage,
  Ic as DadsImageSlider,
  Hr as DadsInputText,
  fc as DadsLanguageSelector,
  Dc as DadsList,
  pc as DadsMegaMenu,
  ea as DadsMenuList,
  hc as DadsMenuListBox,
  xc as DadsMobileMenu,
  Xr as DadsModal,
  Jr as DadsNotificationBanner,
  yc as DadsPageNavigation,
  ac as DadsProgressIndicator,
  kt as DadsRadio,
  Kr as DadsRadioGroup,
  Bc as DadsResourceList,
  _c as DadsScrollTopButton,
  uc as DadsSearchBox,
  Pr as DadsSelect,
  Wr as DadsStepNavigation,
  Qr as DadsTab,
  dc as DadsTable,
  Mc as DadsTableControl,
  kc as DadsTableOfContents,
  Hr as DadsTextField,
  qr as DadsTextarea,
  ec as DadsTooltip,
  ni as DadsUtilityLink
};
//# sourceMappingURL=index.js.map
