import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, mergeProps as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, onMounted as g, openBlock as _, ref as v, renderList as y, renderSlot as b, resolveComponent as x, resolveDynamicComponent as S, toDisplayString as C, unref as w, useAttrs as T, useId as E, useSlots as D, vShow as O, watch as k, withCtx as A, withDirectives as j, withKeys as M, withModifiers as N } from "vue";
//#region src/components/Button/DadsButton.vue?vue&type=script&setup=true&lang.ts
var P = {
	key: 0,
	class: "dads-button__spinner",
	"aria-hidden": "true"
}, F = { class: "dads-button__label" }, I = /* @__PURE__ */ u({
	__name: "DadsButton",
	props: {
		variant: { default: "solid-fill" },
		size: { default: "md" },
		color: { default: "primary" },
		disabled: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		prependIcon: {},
		appendIcon: {},
		block: {
			type: Boolean,
			default: !1
		},
		type: { default: "button" },
		href: {},
		ariaLabel: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, c = t, l = r(() => n.href !== void 0), u = r(() => n.disabled || n.loading), f = r(() => l.value ? "a" : "button"), m = r(() => [
			"dads-button",
			`dads-button--${n.variant}`,
			`dads-button--${n.size}`,
			`dads-button--${n.color}`,
			{
				"dads-button--block": n.block,
				"dads-button--loading": n.loading
			}
		]), h = r(() => l.value ? {
			role: "button",
			href: u.value ? void 0 : n.href,
			"aria-disabled": u.value ? "true" : void 0,
			"aria-busy": n.loading ? "true" : void 0,
			"aria-label": n.ariaLabel,
			tabindex: u.value ? -1 : void 0
		} : {
			type: n.type,
			disabled: n.disabled,
			"aria-busy": n.loading ? "true" : void 0,
			"aria-label": n.ariaLabel
		}), g = (e) => {
			if (u.value) {
				e.preventDefault();
				return;
			}
			c("click", e);
		};
		return (t, n) => (_(), i(S(f.value), d({ class: m.value }, h.value, { onClick: g }), {
			default: A(() => [
				e.loading ? (_(), o("span", P)) : a("", !0),
				e.prependIcon && !e.loading ? (_(), o("i", {
					key: 1,
					class: p([
						"mdi",
						e.prependIcon,
						"dads-button__icon",
						"dads-button__icon--prepend"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("span", F, [b(t.$slots, "default", {}, void 0, !0)]),
				e.appendIcon && !e.loading ? (_(), o("i", {
					key: 2,
					class: p([
						"mdi",
						e.appendIcon,
						"dads-button__icon",
						"dads-button__icon--append"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0)
			]),
			_: 3
		}, 16, ["class"]));
	}
}), L = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, R = /* @__PURE__ */ L(I, [["__scopeId", "data-v-3778c8eb"]]), z = ["for"], B = {
	key: 0,
	class: "dads-input-text__required",
	"aria-hidden": "true"
}, V = { class: "dads-input-text__control" }, H = [
	"id",
	"type",
	"value"
], U = {
	key: 1,
	class: "dads-input-text__footer"
}, W = ["id"], G = ["id"], K = ["id"], q = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		prependIcon: {},
		appendIcon: {},
		counter: {},
		align: { default: "vertical" },
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e;
		({
			BASE_URL: "/",
			DEV: !1,
			MODE: "production",
			PROD: !0,
			SSR: !1
		}).DEV && (n.placeholder !== void 0 && console.warn("[DadsInputText] placeholder は公式 DADS で非推奨です。プレースホルダーテキストはフォーカス時に消え、コントラスト不足で読みにくく、入力の手がかりとして機能しにくいため、`hint` プロップで代替してください。"), n.maxlength !== void 0 && console.warn("[DadsInputText] maxlength は公式 DADS で非推奨です。入力が黙って切り詰められユーザーに通知されないため、`counter` で残り文字数を表示しバックエンド検証で上限を伝える方式を検討してください。"));
		let i = t, l = E(), u = r(() => n.id ?? `dads-input-text-${l}`), f = r(() => `${u.value}-hint`), m = r(() => `${u.value}-error`), h = r(() => `${u.value}-counter`), g = r(() => n.error || !!n.errorMessage), v = r(() => String(n.modelValue ?? "").length), y = r(() => {
			let e = [];
			return g.value && n.errorMessage ? e.push(m.value) : n.hint && e.push(f.value), n.counter !== void 0 && e.push(h.value), e.length > 0 ? e.join(" ") : void 0;
		}), b = r(() => [
			"dads-input-text",
			`dads-input-text--${n.size}`,
			`dads-input-text--align-${n.align}`,
			{
				"dads-input-text--disabled": n.disabled,
				"dads-input-text--readonly": n.readonly,
				"dads-input-text--error": g.value
			}
		]), x = r(() => ({
			name: n.name,
			placeholder: n.placeholder,
			autocomplete: n.autocomplete,
			maxlength: n.maxlength,
			inputmode: n.inputmode,
			disabled: n.disabled || void 0,
			readonly: n.readonly || void 0,
			"aria-invalid": g.value || void 0,
			"aria-required": n.required || void 0,
			"aria-describedby": y.value
		})), S = r(() => g.value && !!n.errorMessage || !!n.hint || n.counter !== void 0), w = (e) => {
			let t = e.target, r = n.type === "number" ? t.valueAsNumber : t.value;
			i("update:modelValue", Number.isNaN(r) ? "" : r);
		}, T = (e) => i("change", e), D = (e) => i("focus", e), O = (e) => i("blur", e);
		return (t, n) => (_(), o("div", { class: p(b.value) }, [
			e.label ? (_(), o("label", {
				key: 0,
				for: u.value,
				class: "dads-input-text__label"
			}, [c(C(e.label) + " ", 1), e.required ? (_(), o("span", B, C(e.requiredLabel), 1)) : a("", !0)], 8, z)) : a("", !0),
			s("div", V, [
				e.prependIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						e.prependIcon,
						"dads-input-text__icon",
						"dads-input-text__icon--prepend"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("input", d({
					id: u.value,
					class: "dads-input-text__input",
					type: e.type,
					value: e.modelValue
				}, x.value, {
					onInput: w,
					onChange: T,
					onFocus: D,
					onBlur: O
				}), null, 16, H),
				e.appendIcon ? (_(), o("i", {
					key: 1,
					class: p([
						"mdi",
						e.appendIcon,
						"dads-input-text__icon",
						"dads-input-text__icon--append"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0)
			]),
			S.value ? (_(), o("div", U, [g.value && e.errorMessage ? (_(), o("span", {
				key: 0,
				id: m.value,
				class: "dads-input-text__error",
				role: "alert"
			}, C(e.errorMessage), 9, W)) : e.hint ? (_(), o("span", {
				key: 1,
				id: f.value,
				class: "dads-input-text__hint"
			}, C(e.hint), 9, G)) : a("", !0), e.counter === void 0 ? a("", !0) : (_(), o("span", {
				key: 2,
				id: h.value,
				class: "dads-input-text__counter"
			}, C(v.value) + " / " + C(e.counter), 9, K))])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-12e47078"]]), J = ["for"], Y = {
	key: 0,
	class: "dads-textarea__required",
	"aria-hidden": "true"
}, X = { class: "dads-textarea__control" }, ee = [
	"id",
	"value",
	"rows"
], Z = {
	key: 1,
	class: "dads-textarea__footer"
}, Q = ["id"], te = ["id"], ne = ["id"], $ = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		counter: {},
		resize: { default: "vertical" },
		autoResize: {
			type: Boolean,
			default: !1
		},
		minRows: { default: 2 },
		maxRows: {},
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, l = v(null), u = E(), f = r(() => n.id ?? `dads-textarea-${u}`), m = r(() => `${f.value}-hint`), y = r(() => `${f.value}-error`), b = r(() => `${f.value}-counter`), x = r(() => n.error || !!n.errorMessage), S = r(() => String(n.modelValue ?? "").length), w = r(() => n.autoResize ? n.minRows : n.rows), T = r(() => n.autoResize ? "none" : n.resize), D = r(() => {
			let e = [];
			return x.value && n.errorMessage ? e.push(y.value) : n.hint && e.push(m.value), n.counter !== void 0 && e.push(b.value), e.length > 0 ? e.join(" ") : void 0;
		}), O = r(() => [
			"dads-textarea",
			`dads-textarea--${n.size}`,
			{
				"dads-textarea--disabled": n.disabled,
				"dads-textarea--readonly": n.readonly,
				"dads-textarea--error": x.value
			}
		]), A = r(() => ({
			name: n.name,
			placeholder: n.placeholder,
			autocomplete: n.autocomplete,
			maxlength: n.maxlength,
			disabled: n.disabled || void 0,
			readonly: n.readonly || void 0,
			"aria-invalid": x.value || void 0,
			"aria-required": n.required || void 0,
			"aria-describedby": D.value
		})), j = r(() => x.value && !!n.errorMessage || !!n.hint || n.counter !== void 0), M = null, N = () => {
			M = null;
			let e = l.value;
			if (!e || !n.autoResize) return;
			e.style.height = "auto";
			let t = window.getComputedStyle(e), r = Number.parseFloat(t.lineHeight) || 20, i = (Number.parseFloat(t.paddingTop) || 0) + (Number.parseFloat(t.paddingBottom) || 0), a = (Number.parseFloat(t.borderTopWidth) || 0) + (Number.parseFloat(t.borderBottomWidth) || 0), o = n.minRows * r + i + a, s = n.maxRows === void 0 ? Infinity : n.maxRows * r + i + a, c = Math.min(s, Math.max(o, e.scrollHeight));
			e.style.height = `${c}px`;
		}, P = () => {
			n.autoResize && (M !== null && cancelAnimationFrame(M), M = requestAnimationFrame(N));
		};
		g(P), h(() => {
			M !== null && cancelAnimationFrame(M);
		}), k(() => n.modelValue, P, { flush: "post" });
		let F = (e) => {
			let t = e.target;
			i("update:modelValue", t.value);
		}, I = (e) => i("change", e), L = (e) => i("focus", e), R = (e) => i("blur", e);
		return (t, n) => (_(), o("div", { class: p(O.value) }, [
			e.label ? (_(), o("label", {
				key: 0,
				for: f.value,
				class: "dads-textarea__label"
			}, [c(C(e.label) + " ", 1), e.required ? (_(), o("span", Y, C(e.requiredLabel), 1)) : a("", !0)], 8, J)) : a("", !0),
			s("div", X, [s("textarea", d({
				id: f.value,
				ref_key: "textareaRef",
				ref: l,
				class: "dads-textarea__input",
				value: e.modelValue,
				rows: w.value,
				style: { resize: T.value }
			}, A.value, {
				onInput: F,
				onChange: I,
				onFocus: L,
				onBlur: R
			}), null, 16, ee)]),
			j.value ? (_(), o("div", Z, [x.value && e.errorMessage ? (_(), o("span", {
				key: 0,
				id: y.value,
				class: "dads-textarea__error",
				role: "alert"
			}, C(e.errorMessage), 9, Q)) : e.hint ? (_(), o("span", {
				key: 1,
				id: m.value,
				class: "dads-textarea__hint"
			}, C(e.hint), 9, te)) : a("", !0), e.counter === void 0 ? a("", !0) : (_(), o("span", {
				key: 2,
				id: b.value,
				class: "dads-textarea__counter"
			}, C(S.value) + " / " + C(e.counter), 9, ne))])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-cff4d920"]]), re = ["for"], ie = {
	key: 0,
	class: "dads-select__required",
	"aria-hidden": "true"
}, ae = { class: "dads-select__control" }, oe = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-invalid",
	"aria-required",
	"aria-describedby",
	"disabled",
	"data-readonly"
], se = { class: "dads-select__value-wrap" }, ce = {
	key: 0,
	class: "dads-select__tags"
}, le = { class: "dads-select__tag-text" }, ue = [
	"aria-label",
	"disabled",
	"onClick"
], de = {
	key: 1,
	class: "dads-select__value"
}, fe = {
	key: 2,
	class: "dads-select__value"
}, pe = {
	key: 3,
	class: "dads-select__placeholder"
}, me = ["id", "aria-multiselectable"], he = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], ge = {
	key: 0,
	class: "dads-select__option dads-select__option--empty",
	"aria-disabled": "true"
}, _e = {
	key: 1,
	class: "dads-select__footer"
}, ve = ["id"], ye = ["id"], be = 500, xe = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsSelect",
	props: {
		modelValue: { type: [
			String,
			Number,
			Boolean,
			Array,
			null
		] },
		items: { default: () => [] },
		itemValue: { default: "value" },
		itemTitle: { default: "title" },
		multiple: {
			type: Boolean,
			default: !1
		},
		placeholder: {},
		id: {},
		name: {},
		size: { default: "md" },
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		prefixIcon: {},
		chips: {
			type: Boolean,
			default: !0
		},
		formatRemoveAriaLabel: {
			type: Function,
			default: (e) => `${e} を削除`
		},
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur",
		"open",
		"close"
	],
	setup(t, { emit: n }) {
		let i = t, l = n, u = E(), d = r(() => i.id ?? `dads-select-${u}`), f = r(() => `${d.value}-listbox`), m = r(() => `${d.value}-hint`), b = r(() => `${d.value}-error`), x = (e) => `${d.value}-option-${e}`, S = r(() => i.error || !!i.errorMessage), w = v(!1), T = v(-1), D = v(null), A = v(null), M = (e) => e[i.itemValue], P = (e) => String(e[i.itemTitle] ?? ""), F = (e) => {
			let t = M(e);
			return i.multiple ? Array.isArray(i.modelValue) && i.modelValue.includes(t) : i.modelValue === t;
		}, I = r(() => !i.multiple || !Array.isArray(i.modelValue) ? [] : i.modelValue.map((e) => i.items.find((t) => M(t) === e)).filter((e) => e !== void 0)), L = r(() => i.multiple || i.modelValue === null || i.modelValue === void 0 ? null : i.items.find((e) => M(e) === i.modelValue) ?? null), R = r(() => w.value && T.value >= 0 ? x(T.value) : void 0), z = r(() => {
			let e = [];
			return S.value && i.errorMessage ? e.push(b.value) : i.hint && e.push(m.value), e.length > 0 ? e.join(" ") : void 0;
		}), B = r(() => S.value && !!i.errorMessage || !!i.hint), V = r(() => [
			"dads-select",
			`dads-select--${i.size}`,
			{
				"dads-select--disabled": i.disabled,
				"dads-select--readonly": i.readonly,
				"dads-select--error": S.value,
				"dads-select--open": w.value
			}
		]), H = () => {
			for (let e = 0; e < i.items.length; e++) if (F(i.items[e])) return e;
			return -1;
		}, U = () => i.items.findIndex((e) => !e.disabled), W = () => {
			if (i.disabled || i.readonly || w.value) return;
			w.value = !0;
			let e = H();
			T.value = e >= 0 ? e : U(), l("open");
		}, G = (e = !1) => {
			w.value && (w.value = !1, T.value = -1, l("close"), e && A.value?.focus());
		}, K = () => {
			i.disabled || i.readonly || (w.value ? G() : W());
		}, q = (e) => {
			l("update:modelValue", e), l("change", e);
		}, J = (e) => {
			if (e.disabled) return;
			let t = M(e);
			if (i.multiple) {
				let e = Array.isArray(i.modelValue) ? [...i.modelValue] : [], n = e.indexOf(t);
				n >= 0 ? e.splice(n, 1) : e.push(t), q(e);
			} else q(t), G(!0);
		}, Y = (e) => {
			if (!i.multiple) return;
			let t = M(e);
			q(Array.isArray(i.modelValue) ? i.modelValue.filter((e) => e !== t) : []);
		}, X = (e) => {
			if (i.items.length === 0) return;
			let t = T.value;
			for (let n = 0; n < i.items.length; n++) if (t = (t + e + i.items.length) % i.items.length, !i.items[t].disabled) {
				T.value = t;
				return;
			}
		}, ee = (e) => {
			let t = e === "first" ? i.items.keys() : [...i.items.keys()].reverse();
			for (let e of t) if (!i.items[e].disabled) {
				T.value = e;
				return;
			}
		}, Z = "", Q = null, te = (e) => {
			Q !== null && clearTimeout(Q), Z += e.toLowerCase(), Q = setTimeout(() => {
				Z = "", Q = null;
			}, be);
			let t = i.items.findIndex((e) => !e.disabled && P(e).toLowerCase().startsWith(Z));
			t >= 0 && (T.value = t);
		}, ne = (e) => {
			if (i.disabled || i.readonly) return;
			let { key: t } = e;
			if (!w.value) {
				if (t === "ArrowDown" || t === "ArrowUp" || t === "Enter" || t === " ") {
					e.preventDefault(), W();
					return;
				}
				t.length === 1 && /\S/.test(t) && (e.preventDefault(), W(), te(t));
				return;
			}
			switch (t) {
				case "Escape":
					e.preventDefault(), G(!0);
					break;
				case "Tab":
					G();
					break;
				case "ArrowDown":
					e.preventDefault(), X(1);
					break;
				case "ArrowUp":
					e.preventDefault(), X(-1);
					break;
				case "Home":
					e.preventDefault(), ee("first");
					break;
				case "End":
					e.preventDefault(), ee("last");
					break;
				case "Enter":
				case " ":
					e.preventDefault(), T.value >= 0 && J(i.items[T.value]);
					break;
				default: t.length === 1 && /\S/.test(t) && (e.preventDefault(), te(t));
			}
		}, $ = (e) => {
			if (!w.value) return;
			let t = e.target;
			t && D.value && D.value.contains(t) || G();
		};
		g(() => {
			document.addEventListener("pointerdown", $, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", $, !0), Q !== null && clearTimeout(Q);
		}), k(() => i.disabled, (e) => {
			e && G();
		});
		let xe = (e) => l("focus", e), Se = (e) => l("blur", e);
		return (n, r) => (_(), o("div", {
			ref_key: "rootRef",
			ref: D,
			class: p(V.value)
		}, [
			t.label ? (_(), o("label", {
				key: 0,
				for: d.value,
				class: "dads-select__label"
			}, [c(C(t.label) + " ", 1), t.required ? (_(), o("span", ie, C(t.requiredLabel), 1)) : a("", !0)], 8, re)) : a("", !0),
			s("div", ae, [s("button", {
				id: d.value,
				ref_key: "triggerRef",
				ref: A,
				type: "button",
				class: "dads-select__trigger",
				role: "combobox",
				"aria-haspopup": "listbox",
				"aria-expanded": w.value,
				"aria-controls": f.value,
				"aria-activedescendant": R.value,
				"aria-invalid": S.value || void 0,
				"aria-required": t.required || void 0,
				"aria-describedby": z.value,
				disabled: t.disabled || void 0,
				"data-readonly": t.readonly || void 0,
				onClick: K,
				onKeydown: ne,
				onFocus: xe,
				onBlur: Se
			}, [
				t.prefixIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						t.prefixIcon,
						"dads-select__prefix-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("span", se, [t.multiple && I.value.length > 0 && t.chips ? (_(), o("span", ce, [(_(!0), o(e, null, y(I.value, (e) => (_(), o("span", {
					key: String(M(e)),
					class: "dads-select__tag"
				}, [s("span", le, C(P(e)), 1), s("button", {
					type: "button",
					class: "dads-select__tag-remove",
					"aria-label": t.formatRemoveAriaLabel(P(e)),
					disabled: t.disabled || t.readonly || void 0,
					onClick: N((t) => Y(e), ["stop"]),
					onKeydown: r[0] ||= N(() => {}, ["stop"])
				}, " × ", 40, ue)]))), 128))])) : t.multiple && I.value.length > 0 ? (_(), o("span", de, C(I.value.map((e) => P(e)).join(", ")), 1)) : !t.multiple && L.value ? (_(), o("span", fe, C(P(L.value)), 1)) : (_(), o("span", pe, C(t.placeholder), 1))]),
				s("i", {
					class: p(["mdi mdi-chevron-down dads-select__icon", { "dads-select__icon--open": w.value }]),
					"aria-hidden": "true"
				}, null, 2)
			], 40, oe), j(s("ul", {
				id: f.value,
				class: "dads-select__listbox",
				role: "listbox",
				"aria-multiselectable": t.multiple || void 0,
				tabindex: "-1"
			}, [(_(!0), o(e, null, y(t.items, (e, t) => (_(), o("li", {
				id: x(t),
				key: String(M(e)),
				role: "option",
				"aria-selected": F(e),
				"aria-disabled": e.disabled || void 0,
				class: p(["dads-select__option", {
					"dads-select__option--active": t === T.value,
					"dads-select__option--selected": F(e),
					"dads-select__option--disabled": e.disabled
				}]),
				onClick: (t) => J(e),
				onMouseenter: (n) => !e.disabled && (T.value = t)
			}, C(P(e)), 43, he))), 128)), t.items.length === 0 ? (_(), o("li", ge, " 選択肢がありません ")) : a("", !0)], 8, me), [[O, w.value]])]),
			B.value ? (_(), o("div", _e, [S.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: b.value,
				class: "dads-select__error",
				role: "alert"
			}, C(t.errorMessage), 9, ve)) : t.hint ? (_(), o("span", {
				key: 1,
				id: m.value,
				class: "dads-select__hint"
			}, C(t.hint), 9, ye)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-49d82779"]]), Se = ["for"], Ce = [
	"id",
	"checked",
	"value"
], we = {
	key: 0,
	class: "dads-checkbox__text"
}, Te = {
	key: 0,
	class: "dads-checkbox__required",
	"aria-hidden": "true"
}, Ee = {
	key: 0,
	class: "dads-checkbox__footer"
}, De = ["id"], Oe = ["id"], ke = /* @__PURE__ */ L(/* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "DadsCheckbox",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		name: {},
		id: {},
		value: { type: [
			String,
			Number,
			Boolean
		] },
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, l = T(), u = r(() => {
			let e = {};
			for (let t of Object.keys(l)) t === "class" || t === "style" || t === "id" || t.startsWith("on") || (e[t] = l[t]);
			return e;
		}), f = r(() => {
			let e = {};
			return l.class !== void 0 && (e.class = l.class), l.style !== void 0 && (e.style = l.style), e;
		}), p = v(null), m = E(), h = r(() => n.id ?? `dads-checkbox-${m}`), y = r(() => `${h.value}-hint`), b = r(() => `${h.value}-error`), x = r(() => n.error || !!n.errorMessage), S = r(() => {
			if (x.value && n.errorMessage) return b.value;
			if (n.hint) return y.value;
		}), w = r(() => [
			"dads-checkbox",
			`dads-checkbox--${n.size}`,
			{
				"dads-checkbox--checked": n.modelValue && !n.indeterminate,
				"dads-checkbox--indeterminate": n.indeterminate,
				"dads-checkbox--disabled": n.disabled,
				"dads-checkbox--readonly": n.readonly,
				"dads-checkbox--error": x.value
			}
		]), D = r(() => ({
			name: n.name,
			disabled: n.disabled || void 0,
			"aria-checked": n.indeterminate ? "mixed" : void 0,
			"aria-invalid": x.value || void 0,
			"aria-required": n.required || void 0,
			"aria-describedby": S.value
		})), O = r(() => x.value && !!n.errorMessage || !!n.hint), A = () => {
			p.value && (p.value.indeterminate = n.indeterminate);
		};
		g(A), k(() => n.indeterminate, A);
		let j = (e) => {
			if (n.readonly) {
				p.value && (p.value.checked = n.modelValue);
				return;
			}
			let t = e.target;
			i("update:modelValue", t.checked), i("change", e);
		}, M = (e) => i("focus", e), N = (e) => i("blur", e);
		return (t, n) => (_(), o("div", d({ class: w.value }, f.value), [s("label", {
			class: "dads-checkbox__label",
			for: h.value
		}, [
			s("input", d({
				id: h.value,
				ref_key: "inputRef",
				ref: p,
				type: "checkbox",
				class: "dads-checkbox__input",
				checked: e.modelValue,
				value: e.value
			}, {
				...D.value,
				...u.value
			}, {
				onChange: j,
				onFocus: M,
				onBlur: N
			}), null, 16, Ce),
			n[0] ||= s("span", {
				class: "dads-checkbox__indicator",
				"aria-hidden": "true"
			}, null, -1),
			e.label ? (_(), o("span", we, [c(C(e.label) + " ", 1), e.required ? (_(), o("span", Te, C(e.requiredLabel), 1)) : a("", !0)])) : a("", !0)
		], 8, Se), O.value ? (_(), o("div", Ee, [x.value && e.errorMessage ? (_(), o("span", {
			key: 0,
			id: b.value,
			class: "dads-checkbox__error",
			role: "alert"
		}, C(e.errorMessage), 9, De)) : e.hint ? (_(), o("span", {
			key: 1,
			id: y.value,
			class: "dads-checkbox__hint"
		}, C(e.hint), 9, Oe)) : a("", !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-53c03b99"]]), Ae = [
	"id",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], je = {
	key: 0,
	class: "dads-checkbox-group__legend"
}, Me = {
	key: 0,
	class: "dads-checkbox-group__required",
	"aria-hidden": "true"
}, Ne = { class: "dads-checkbox-group__items" }, Pe = {
	key: 1,
	class: "dads-checkbox-group__footer"
}, Fe = ["id"], Ie = ["id"], Le = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsCheckboxGroup",
	props: {
		modelValue: {},
		items: {},
		legend: {},
		direction: { default: "vertical" },
		size: { default: "md" },
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {},
		id: {},
		requiredLabel: { default: "必須" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let l = t, u = n, d = E(), f = r(() => l.id ?? `dads-checkbox-group-${d}`), m = r(() => `${f.value}-hint`), h = r(() => `${f.value}-error`), g = r(() => l.error || !!l.errorMessage), v = r(() => {
			if (g.value && l.errorMessage) return h.value;
			if (l.hint) return m.value;
		}), b = r(() => [
			"dads-checkbox-group",
			`dads-checkbox-group--${l.direction}`,
			{
				"dads-checkbox-group--error": g.value,
				"dads-checkbox-group--disabled": l.disabled
			}
		]), x = r(() => g.value && !!l.errorMessage || !!l.hint), S = (e) => l.modelValue?.includes(e) ?? !1, w = (e, t, n) => n ? e.includes(t) ? [...e] : [...e, t] : e.filter((e) => e !== t), T = (e, t) => {
			let n = w(l.modelValue ?? [], e, t);
			u("update:modelValue", n), u("change", n);
		};
		return (n, r) => (_(), o("fieldset", {
			id: f.value,
			class: p(b.value),
			disabled: t.disabled || void 0,
			"aria-invalid": g.value || void 0,
			"aria-describedby": v.value
		}, [
			t.legend ? (_(), o("legend", je, [c(C(t.legend) + " ", 1), t.required ? (_(), o("span", Me, C(t.requiredLabel), 1)) : a("", !0)])) : a("", !0),
			s("div", Ne, [(_(!0), o(e, null, y(t.items, (e) => (_(), i(ke, {
				key: String(e.value),
				"model-value": S(e.value),
				label: e.label,
				hint: e.hint,
				disabled: e.disabled || t.disabled,
				size: t.size,
				name: t.name,
				value: e.value,
				error: g.value,
				"onUpdate:modelValue": (t) => T(e.value, t)
			}, null, 8, [
				"model-value",
				"label",
				"hint",
				"disabled",
				"size",
				"name",
				"value",
				"error",
				"onUpdate:modelValue"
			]))), 128))]),
			x.value ? (_(), o("div", Pe, [g.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: h.value,
				class: "dads-checkbox-group__error",
				role: "alert"
			}, C(t.errorMessage), 9, Fe)) : t.hint ? (_(), o("span", {
				key: 1,
				id: m.value,
				class: "dads-checkbox-group__hint"
			}, C(t.hint), 9, Ie)) : a("", !0)])) : a("", !0)
		], 10, Ae));
	}
}), [["__scopeId", "data-v-ed4d09d6"]]), Re = ["for"], ze = [
	"id",
	"name",
	"value",
	"checked"
], Be = {
	key: 0,
	class: "dads-radio__text"
}, Ve = { class: "dads-radio__title" }, He = {
	key: 1,
	class: "dads-radio__required",
	"aria-hidden": "true"
}, Ue = ["id"], We = {
	key: 0,
	class: "dads-radio__footer"
}, Ge = ["id"], Ke = ["id"], qe = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsRadio",
	props: {
		modelValue: { type: [
			String,
			Number,
			Boolean,
			null
		] },
		value: { type: [
			String,
			Number,
			Boolean
		] },
		size: { default: "md" },
		label: {},
		description: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {},
		id: {},
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(t, { emit: n }) {
		let i = t, l = n, u = E(), f = r(() => i.id ?? `dads-radio-${u}`), m = r(() => `${f.value}-hint`), h = r(() => `${f.value}-error`), g = r(() => `${f.value}-description`), v = r(() => i.error || !!i.errorMessage), y = r(() => i.modelValue === i.value), b = r(() => {
			let e = [];
			return i.description && e.push(g.value), v.value && i.errorMessage ? e.push(h.value) : i.hint && e.push(m.value), e.length > 0 ? e.join(" ") : void 0;
		}), x = r(() => [
			"dads-radio",
			`dads-radio--${i.size}`,
			{
				"dads-radio--checked": y.value,
				"dads-radio--disabled": i.disabled,
				"dads-radio--error": v.value
			}
		]), S = r(() => ({
			disabled: i.disabled || void 0,
			"aria-invalid": v.value || void 0,
			"aria-required": i.required || void 0,
			"aria-describedby": b.value
		})), w = r(() => v.value && !!i.errorMessage || !!i.hint), T = (e) => {
			l("update:modelValue", i.value), l("change", e);
		}, D = (e) => l("focus", e), O = (e) => l("blur", e);
		return (n, r) => (_(), o("div", { class: p(x.value) }, [s("label", {
			class: "dads-radio__label",
			for: f.value
		}, [
			s("input", d({
				id: f.value,
				type: "radio",
				class: "dads-radio__input",
				name: t.name,
				value: t.value,
				checked: y.value
			}, S.value, {
				onChange: T,
				onFocus: D,
				onBlur: O
			}), null, 16, ze),
			r[0] ||= s("span", {
				class: "dads-radio__indicator",
				"aria-hidden": "true"
			}, null, -1),
			t.label || t.required || t.description ? (_(), o("span", Be, [s("span", Ve, [t.label ? (_(), o(e, { key: 0 }, [c(C(t.label), 1)], 64)) : a("", !0), t.required ? (_(), o("span", He, C(t.requiredLabel), 1)) : a("", !0)]), t.description ? (_(), o("span", {
				key: 0,
				id: g.value,
				class: "dads-radio__description"
			}, C(t.description), 9, Ue)) : a("", !0)])) : a("", !0)
		], 8, Re), w.value ? (_(), o("div", We, [v.value && t.errorMessage ? (_(), o("span", {
			key: 0,
			id: h.value,
			class: "dads-radio__error",
			role: "alert"
		}, C(t.errorMessage), 9, Ge)) : t.hint ? (_(), o("span", {
			key: 1,
			id: m.value,
			class: "dads-radio__hint"
		}, C(t.hint), 9, Ke)) : a("", !0)])) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-4388c269"]]), Je = [
	"id",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], Ye = {
	key: 0,
	class: "dads-radio-group__required",
	"aria-hidden": "true"
}, Xe = { class: "dads-radio-group__items" }, Ze = {
	key: 1,
	class: "dads-radio-group__footer"
}, Qe = ["id"], $e = ["id"], et = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsRadioGroup",
	props: {
		modelValue: { type: [
			String,
			Number,
			Boolean,
			null
		] },
		items: {},
		legend: {},
		legendVisuallyHidden: {
			type: Boolean,
			default: !1
		},
		direction: { default: "vertical" },
		size: { default: "md" },
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {},
		id: {},
		requiredLabel: { default: "必須" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let l = t, u = n, d = E(), f = r(() => l.id ?? `dads-radio-group-${d}`), m = r(() => l.name ?? `dads-radio-group-name-${d}`), h = r(() => `${f.value}-hint`), g = r(() => `${f.value}-error`), v = r(() => l.error || !!l.errorMessage), b = r(() => {
			if (v.value && l.errorMessage) return g.value;
			if (l.hint) return h.value;
		}), x = r(() => [
			"dads-radio-group",
			`dads-radio-group--${l.direction}`,
			{
				"dads-radio-group--error": v.value,
				"dads-radio-group--disabled": l.disabled
			}
		]), S = r(() => v.value && !!l.errorMessage || !!l.hint), w = (e) => {
			u("update:modelValue", e), u("change", e);
		};
		return (n, r) => (_(), o("fieldset", {
			id: f.value,
			class: p(x.value),
			disabled: t.disabled,
			"aria-invalid": v.value || void 0,
			"aria-describedby": b.value
		}, [
			t.legend ? (_(), o("legend", {
				key: 0,
				class: p(["dads-radio-group__legend", { "dads-radio-group__legend--visually-hidden": t.legendVisuallyHidden }])
			}, [c(C(t.legend) + " ", 1), t.required ? (_(), o("span", Ye, C(t.requiredLabel), 1)) : a("", !0)], 2)) : a("", !0),
			s("div", Xe, [(_(!0), o(e, null, y(t.items, (e) => (_(), i(qe, {
				key: String(e.value),
				"model-value": t.modelValue ?? null,
				value: e.value,
				label: e.label,
				hint: e.hint,
				description: e.description,
				disabled: e.disabled || t.disabled,
				size: t.size,
				name: m.value,
				error: v.value,
				"onUpdate:modelValue": w
			}, null, 8, [
				"model-value",
				"value",
				"label",
				"hint",
				"description",
				"disabled",
				"size",
				"name",
				"error"
			]))), 128))]),
			S.value ? (_(), o("div", Ze, [v.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: g.value,
				class: "dads-radio-group__error",
				role: "alert"
			}, C(t.errorMessage), 9, Qe)) : t.hint ? (_(), o("span", {
				key: 1,
				id: h.value,
				class: "dads-radio-group__hint"
			}, C(t.hint), 9, $e)) : a("", !0)])) : a("", !0)
		], 10, Je));
	}
}), [["__scopeId", "data-v-bdfa4690"]]), tt = ["for"], nt = {
	key: 0,
	class: "dads-file-upload__required",
	"aria-hidden": "true"
}, rt = ["disabled"], it = { class: "dads-file-upload__dropzone-text" }, at = ["id"], ot = {
	key: 1,
	class: "dads-file-upload__file-list"
}, st = { class: "dads-file-upload__file-name" }, ct = {
	key: 0,
	class: "dads-file-upload__file-size"
}, lt = [
	"aria-label",
	"disabled",
	"onClick"
], ut = ["aria-valuenow"], dt = {
	key: 3,
	class: "dads-file-upload__footer"
}, ft = ["id"], pt = ["id"], mt = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsFileUpload",
	props: {
		modelValue: {},
		accept: {},
		multiple: {
			type: Boolean,
			default: !1
		},
		maxSize: {},
		size: { default: "md" },
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		progress: {},
		name: {},
		id: {},
		buttonText: { default: "ファイルを選択" },
		dropzoneText: { default: "またはここにファイルをドロップ" },
		expandDropArea: {
			type: Boolean,
			default: !1
		},
		showFileSize: {
			type: Boolean,
			default: !0
		},
		requiredLabel: { default: "必須" },
		formatRemoveLabel: {
			type: Function,
			default: (e) => `${e} を削除`
		}
	},
	emits: [
		"update:modelValue",
		"change",
		"remove",
		"focus",
		"blur"
	],
	setup(t, { emit: n }) {
		let i = t, l = n, u = v(null), f = E(), h = r(() => i.id ?? `dads-file-upload-${f}`), g = r(() => `${h.value}-hint`), b = r(() => `${h.value}-error`), x = v(!1), S = v(null), w = r(() => S.value ?? i.errorMessage), T = r(() => i.error || !!w.value), D = r(() => i.disabled || i.readonly), O = r(() => {
			let e = i.modelValue;
			return e == null ? [] : Array.isArray(e) ? e : [e];
		}), k = r(() => [
			"dads-file-upload",
			`dads-file-upload--${i.size}`,
			{
				"dads-file-upload--disabled": i.disabled,
				"dads-file-upload--readonly": i.readonly,
				"dads-file-upload--error": T.value,
				"dads-file-upload--expand-drop": i.expandDropArea,
				"dads-file-upload--dragover": x.value && i.expandDropArea
			}
		]), A = r(() => {
			if (T.value && w.value) return b.value;
			if (i.hint) return g.value;
		}), j = r(() => ({
			name: i.name,
			accept: i.accept,
			multiple: i.multiple || void 0,
			disabled: D.value || void 0,
			required: i.required || void 0,
			"aria-invalid": T.value || void 0,
			"aria-required": i.required || void 0,
			"aria-describedby": A.value
		})), M = r(() => T.value && !!w.value || !!i.hint), P = (e, t) => t.length === 0 ? !0 : t.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t), F = (e) => {
			if (i.maxSize !== void 0) {
				let t = e.find((e) => e.size > i.maxSize);
				if (t) return `${t.name} はサイズ上限を超えています`;
			}
			if (i.accept) {
				let t = i.accept.split(",").map((e) => e.trim()).filter(Boolean), n = e.find((e) => !P(e, t));
				if (n) return `${n.name} は許可された形式ではありません`;
			}
			return null;
		}, I = (e) => {
			i.multiple ? l("update:modelValue", e) : l("update:modelValue", e[0] ?? null);
		}, L = (e) => {
			if (D.value || e.length === 0) return;
			let t = F(e);
			if (t) {
				S.value = t;
				return;
			}
			S.value = null;
			let n = i.multiple ? e : e.slice(0, 1);
			l("change", n), I(n);
		}, R = () => {
			D.value || u.value?.click();
		}, z = (e) => {
			let t = e.target, n = t.files;
			n && (L(Array.from(n)), t.value = "");
		}, B = () => {
			D.value || (x.value = !0);
		}, V = () => {
			x.value = !1;
		}, H = (e) => {
			if (x.value = !1, D.value) return;
			let t = e.dataTransfer?.files;
			t && L(Array.from(t));
		}, U = (e) => {
			D.value || (l("remove", e), I(O.value.filter((t) => t !== e)), S.value = null);
		}, W = (e) => e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : e < 1024 * 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${(e / 1024 / 1024 / 1024).toFixed(1)} GB`, G = (e) => l("focus", e), K = (e) => l("blur", e);
		return (n, r) => (_(), o("div", { class: p(k.value) }, [
			t.label ? (_(), o("label", {
				key: 0,
				for: h.value,
				class: "dads-file-upload__label"
			}, [c(C(t.label) + " ", 1), t.required ? (_(), o("span", nt, C(t.requiredLabel), 1)) : a("", !0)], 8, tt)) : a("", !0),
			s("div", {
				class: p(["dads-file-upload__dropzone", { "dads-file-upload__dropzone--dragover": x.value }]),
				onDragover: N(B, ["prevent"]),
				onDragleave: N(V, ["prevent"]),
				onDrop: N(H, ["prevent"])
			}, [
				s("button", {
					type: "button",
					class: "dads-file-upload__button",
					disabled: D.value,
					onClick: R
				}, C(t.buttonText), 9, rt),
				s("span", it, C(t.dropzoneText), 1),
				s("input", d({
					id: h.value,
					ref_key: "inputRef",
					ref: u,
					type: "file",
					class: "dads-file-upload__input"
				}, j.value, {
					onChange: z,
					onFocus: G,
					onBlur: K
				}), null, 16, at)
			], 34),
			O.value.length > 0 ? (_(), o("ul", ot, [(_(!0), o(e, null, y(O.value, (e) => (_(), o("li", {
				key: `${e.name}-${e.size}-${e.lastModified}`,
				class: "dads-file-upload__file-item"
			}, [
				s("span", st, C(e.name), 1),
				t.showFileSize ? (_(), o("span", ct, C(W(e.size)), 1)) : a("", !0),
				s("button", {
					type: "button",
					class: "dads-file-upload__remove",
					"aria-label": t.formatRemoveLabel(e.name),
					disabled: D.value,
					onClick: (t) => U(e)
				}, " × ", 8, lt)
			]))), 128))])) : a("", !0),
			t.progress === void 0 ? a("", !0) : (_(), o("div", {
				key: 2,
				class: "dads-file-upload__progress",
				role: "progressbar",
				"aria-valuenow": t.progress,
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "dads-file-upload__progress-bar",
				style: m({ width: `${t.progress}%` })
			}, null, 4)], 8, ut)),
			M.value ? (_(), o("div", dt, [T.value && w.value ? (_(), o("span", {
				key: 0,
				id: b.value,
				class: "dads-file-upload__error",
				role: "alert"
			}, C(w.value), 9, ft)) : t.hint ? (_(), o("span", {
				key: 1,
				id: g.value,
				class: "dads-file-upload__hint"
			}, C(t.hint), 9, pt)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-78aada56"]]), ht = {
	key: 0,
	class: "dads-chip__prepend",
	"aria-hidden": "true"
}, gt = { class: "dads-chip__label" }, _t = {
	key: 1,
	class: "dads-chip__append",
	"aria-hidden": "true"
}, vt = ["aria-label", "disabled"], yt = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsChip",
	props: {
		size: { default: "md" },
		color: { default: "primary" },
		closable: {
			type: Boolean,
			default: !1
		},
		clickable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		closeLabel: { default: "削除" },
		ariaLabel: {}
	},
	emits: ["click", "close"],
	setup(e, { emit: t }) {
		let n = e, c = t, l = r(() => [
			"dads-chip",
			`dads-chip--${n.size}`,
			`dads-chip--${n.color}`,
			{ "dads-chip--clickable": n.clickable }
		]), u = r(() => !n.clickable && n.disabled ? "true" : void 0), d = (e) => {
			!n.clickable || n.disabled || c("click", e);
		}, f = (e) => {
			!n.clickable || n.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), c("click", e));
		}, m = (e) => {
			n.disabled || c("close", e);
		};
		return (t, n) => (_(), i(S(e.clickable ? "button" : "span"), {
			type: e.clickable ? "button" : void 0,
			class: p(l.value),
			role: e.clickable ? "button" : void 0,
			tabindex: e.clickable && !e.disabled ? 0 : void 0,
			disabled: e.clickable && e.disabled || void 0,
			"aria-disabled": u.value,
			"aria-label": e.ariaLabel,
			onClick: d,
			onKeydown: f
		}, {
			default: A(() => [
				t.$slots.prepend ? (_(), o("span", ht, [b(t.$slots, "prepend", {}, void 0, !0)])) : a("", !0),
				s("span", gt, [b(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.append && !e.closable ? (_(), o("span", _t, [b(t.$slots, "append", {}, void 0, !0)])) : a("", !0),
				e.closable ? (_(), o("button", {
					key: 2,
					type: "button",
					class: "dads-chip__close",
					"aria-label": e.closeLabel,
					disabled: e.disabled,
					onClick: N(m, ["stop"])
				}, [...n[0] ||= [s("i", {
					class: "mdi mdi-close",
					"aria-hidden": "true"
				}, null, -1)]], 8, vt)) : a("", !0)
			]),
			_: 3
		}, 40, [
			"type",
			"class",
			"role",
			"tabindex",
			"disabled",
			"aria-disabled",
			"aria-label"
		]));
	}
}), [["__scopeId", "data-v-19bf65af"]]), bt = ["for"], xt = {
	key: 0,
	class: "dads-combobox__required",
	"aria-hidden": "true"
}, St = {
	key: 0,
	class: "dads-combobox__chip-list"
}, Ct = [
	"id",
	"name",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-required",
	"aria-describedby",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant"
], wt = ["id", "aria-multiselectable"], Tt = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onMousedown",
	"onMouseenter"
], Et = {
	key: 1,
	class: "dads-combobox__footer"
}, Dt = ["id"], Ot = ["id"], kt = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsCombobox",
	props: {
		modelValue: {},
		items: { default: () => [] },
		itemValue: { default: "value" },
		itemTitle: { default: "title" },
		multiple: {
			type: Boolean,
			default: !1
		},
		filter: {},
		placeholder: {},
		id: {},
		name: {},
		size: { default: "md" },
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(t, { emit: n }) {
		let i = t, u = n, d = E(), f = r(() => i.id ?? `dads-combobox-${d}`), m = r(() => `${f.value}-listbox`), b = r(() => `${f.value}-hint`), x = r(() => `${f.value}-error`), S = (e) => `${f.value}-option-${e}`, w = r(() => i.error || !!i.errorMessage), T = v(null), D = v(null), M = v(!1), N = v(-1), P = v(""), F = (e) => e[i.itemValue], I = (e) => String(e[i.itemTitle] ?? ""), L = (e, t) => t ? I(e).toLowerCase().includes(t.toLowerCase()) : !0, R = r(() => {
			let e = i.filter ?? L;
			return i.items.filter((t) => e(t, P.value));
		}), z = () => Array.isArray(i.modelValue) ? i.modelValue : [], B = r(() => i.multiple ? z() : []), V = r(() => i.multiple || i.modelValue === null || i.modelValue === void 0 || i.modelValue === "" ? null : i.items.find((e) => F(e) === i.modelValue) ?? null), H = (e) => {
			let t = i.items.find((t) => F(t) === e);
			return t ? I(t) : String(e);
		}, U = r(() => M.value && N.value >= 0 ? S(N.value) : void 0), W = r(() => {
			let e = [];
			return w.value && i.errorMessage ? e.push(x.value) : i.hint && e.push(b.value), e.length > 0 ? e.join(" ") : void 0;
		}), G = r(() => w.value && !!i.errorMessage || !!i.hint), K = r(() => [
			"dads-combobox",
			`dads-combobox--${i.size}`,
			{
				"dads-combobox--disabled": i.disabled,
				"dads-combobox--readonly": i.readonly,
				"dads-combobox--error": w.value,
				"dads-combobox--open": M.value,
				"dads-combobox--multiple": i.multiple
			}
		]);
		k(() => [
			i.modelValue,
			i.items,
			i.multiple
		], () => {
			i.multiple || (V.value ? P.value = I(V.value) : i.modelValue === null || i.modelValue === void 0 ? P.value = "" : P.value = String(i.modelValue));
		}, { immediate: !0 });
		let q = () => R.value.findIndex((e) => !e.disabled), J = () => {
			i.disabled || i.readonly || M.value || (M.value = !0, R.value.length === 0 ? N.value = -1 : N.value = q());
		}, Y = () => {
			M.value && (M.value = !1, N.value = -1);
		}, X = (e) => {
			u("update:modelValue", e), u("change", e);
		}, ee = (e) => {
			let t = R.value;
			if (t.length === 0) {
				N.value = -1;
				return;
			}
			let n = N.value < 0 ? e === 1 ? -1 : 0 : N.value;
			for (let r = 0; r < t.length; r++) if (n = (n + e + t.length) % t.length, !t[n].disabled) {
				N.value = n;
				return;
			}
		}, Z = (e) => {
			let t = e.trim();
			if (!t) return;
			let n = i.items.find((e) => String(F(e)) === t || I(e) === t);
			if (n && n.disabled) return;
			let r = n ? F(n) : t;
			if (i.multiple) {
				let e = z();
				e.some((e) => e === r) || X([...e, r]), P.value = "", N.value = R.value.length > 0 ? q() : -1;
			} else X(r), P.value = n ? I(n) : String(r), Y();
		}, Q = (e) => {
			i.multiple && X(z().filter((t) => t !== e));
		}, te = (e) => {
			P.value = e.target.value, M.value ||= !0, N.value = R.value.length > 0 ? q() : -1;
		}, ne = (e) => {
			if (i.disabled || i.readonly) return;
			let { key: t } = e;
			switch (t) {
				case "ArrowDown":
					e.preventDefault(), M.value ? ee(1) : J();
					break;
				case "ArrowUp":
					e.preventDefault(), M.value ? ee(-1) : J();
					break;
				case "Enter": {
					e.preventDefault();
					let t = R.value;
					M.value && N.value >= 0 && t[N.value] ? Z(String(F(t[N.value]))) : P.value.trim() && Z(P.value);
					break;
				}
				case "Escape":
					M.value && (e.preventDefault(), Y());
					break;
				case "Tab":
					Y();
					break;
				case "Backspace": {
					if (!i.multiple || P.value !== "") break;
					let e = z();
					e.length > 0 && X(e.slice(0, -1));
					break;
				}
				default: break;
			}
		}, $ = (e) => {
			!i.disabled && !i.readonly && J(), u("focus", e);
		}, re = (e) => {
			u("blur", e);
		}, ie = (e) => {
			let t = e.target;
			t && t === T.value || t?.closest(".dads-chip__close") || (e.preventDefault(), T.value?.focus());
		}, ae = (e, t) => {
			e.preventDefault(), !t.disabled && Z(String(F(t)));
		}, oe = (e) => {
			if (!M.value) return;
			let t = e.target;
			t && D.value && D.value.contains(t) || Y();
		};
		return g(() => {
			document.addEventListener("pointerdown", oe, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", oe, !0);
		}), k(() => i.disabled, (e) => {
			e && Y();
		}), (n, r) => (_(), o("div", {
			ref_key: "rootRef",
			ref: D,
			class: p(K.value)
		}, [
			t.label ? (_(), o("label", {
				key: 0,
				for: f.value,
				class: "dads-combobox__label"
			}, [c(C(t.label) + " ", 1), t.required ? (_(), o("span", xt, C(t.requiredLabel), 1)) : a("", !0)], 8, bt)) : a("", !0),
			s("div", {
				class: "dads-combobox__control",
				onMousedown: ie
			}, [t.multiple && B.value.length > 0 ? (_(), o("ul", St, [(_(!0), o(e, null, y(B.value, (e) => (_(), o("li", {
				key: String(e),
				class: "dads-combobox__chip-item"
			}, [l(yt, {
				size: "sm",
				closable: !t.disabled && !t.readonly,
				disabled: t.disabled,
				onClose: (t) => Q(e)
			}, {
				default: A(() => [c(C(H(e)), 1)]),
				_: 2
			}, 1032, [
				"closable",
				"disabled",
				"onClose"
			])]))), 128))])) : a("", !0), s("input", {
				id: f.value,
				ref_key: "inputRef",
				ref: T,
				class: "dads-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				name: t.name,
				value: P.value,
				placeholder: t.multiple && B.value.length > 0 ? "" : t.placeholder,
				disabled: t.disabled || void 0,
				readonly: t.readonly || void 0,
				"aria-invalid": w.value || void 0,
				"aria-required": t.required || void 0,
				"aria-describedby": W.value,
				"aria-expanded": M.value,
				"aria-controls": m.value,
				"aria-activedescendant": U.value,
				"aria-autocomplete": "list",
				onInput: te,
				onKeydown: ne,
				onFocus: $,
				onBlur: re
			}, null, 40, Ct)], 32),
			j(s("ul", {
				id: m.value,
				class: "dads-combobox__suggestions",
				role: "listbox",
				"aria-multiselectable": t.multiple || void 0
			}, [(_(!0), o(e, null, y(R.value, (e, t) => (_(), o("li", {
				id: S(t),
				key: String(F(e)),
				role: "option",
				"aria-selected": t === N.value,
				"aria-disabled": e.disabled || void 0,
				class: p(["dads-combobox__suggestion", {
					"dads-combobox__suggestion--active": t === N.value,
					"dads-combobox__suggestion--disabled": e.disabled
				}]),
				onMousedown: (t) => ae(t, e),
				onMouseenter: (n) => !e.disabled && (N.value = t)
			}, C(I(e)), 43, Tt))), 128))], 8, wt), [[O, M.value && R.value.length > 0]]),
			G.value ? (_(), o("div", Et, [w.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: x.value,
				class: "dads-combobox__error",
				role: "alert"
			}, C(t.errorMessage), 9, Dt)) : t.hint ? (_(), o("span", {
				key: 1,
				id: b.value,
				class: "dads-combobox__hint"
			}, C(t.hint), 9, Ot)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-fc794643"]]), At = { class: "dads-header-container__inner" }, jt = ["aria-label"], Mt = {
	key: 1,
	class: "dads-header-container__logo"
}, Nt = ["aria-label"], Pt = {
	key: 3,
	class: "dads-header-container__utility"
}, Ft = {
	key: 4,
	class: "dads-header-container__actions"
}, It = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsHeaderContainer",
	props: {
		sticky: {
			type: Boolean,
			default: !0
		},
		showMenuToggle: {
			type: Boolean,
			default: !0
		},
		menuToggleLabel: { default: "メニューを開く" },
		navAriaLabel: { default: "メインナビゲーション" },
		variant: { default: "wide-full" },
		logoLabel: {},
		logoHref: {}
	},
	emits: ["click:menu"],
	setup(e, { emit: t }) {
		let n = e, l = t, u = D(), d = r(() => [
			"dads-header-container",
			`dads-header-container--${n.variant}`,
			{ "dads-header-container--sticky": n.sticky }
		]), f = r(() => !!u.logo || !!n.logoLabel), m = (e) => l("click:menu", e);
		return (t, n) => (_(), o("header", { class: p(d.value) }, [s("div", At, [
			e.showMenuToggle ? (_(), o("button", {
				key: 0,
				type: "button",
				class: "dads-header-container__menu-toggle",
				"aria-label": e.menuToggleLabel,
				onClick: m
			}, [...n[0] ||= [s("i", {
				class: "mdi mdi-menu",
				"aria-hidden": "true"
			}, null, -1)]], 8, jt)) : a("", !0),
			f.value ? (_(), o("div", Mt, [b(t.$slots, "logo", {}, () => [(_(), i(S(e.logoHref ? "a" : "strong"), {
				href: e.logoHref,
				class: "dads-header-container__logo-text"
			}, {
				default: A(() => [c(C(e.logoLabel), 1)]),
				_: 1
			}, 8, ["href"]))], !0)])) : a("", !0),
			t.$slots.nav ? (_(), o("nav", {
				key: 2,
				class: "dads-header-container__nav",
				"aria-label": e.navAriaLabel
			}, [b(t.$slots, "nav", {}, void 0, !0)], 8, Nt)) : a("", !0),
			t.$slots.utility ? (_(), o("div", Pt, [b(t.$slots, "utility", {}, void 0, !0)])) : a("", !0),
			t.$slots.actions ? (_(), o("div", Ft, [b(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		])], 2));
	}
}), [["__scopeId", "data-v-9f2f95af"]]), Lt = {
	key: 0,
	class: "dads-drawer__item-details"
}, Rt = { class: "dads-drawer__item-button" }, zt = { class: "dads-drawer__item-label" }, Bt = { class: "dads-drawer__item-children" }, Vt = [
	"href",
	"aria-disabled",
	"tabindex"
], Ht = { class: "dads-drawer__item-label" }, Ut = ["disabled"], Wt = { class: "dads-drawer__item-label" }, Gt = /* @__PURE__ */ u({
	__name: "DadsDrawerItem",
	props: { item: {} },
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let c = t, l = n, u = r(() => Array.isArray(c.item.children) && c.item.children.length > 0), d = r(() => !u.value && !!c.item.href), f = r(() => ["dads-drawer__item", {
			"dads-drawer__item--with-children": u.value,
			"dads-drawer__item--disabled": c.item.disabled
		}]), m = (e) => {
			if (c.item.disabled) {
				e.preventDefault();
				return;
			}
			l("click:item", c.item, e);
		}, h = (e, t) => {
			l("click:item", e, t);
		};
		return (n, r) => {
			let c = x("DadsDrawerItem", !0);
			return _(), o("li", { class: p(f.value) }, [u.value ? (_(), o("details", Lt, [s("summary", Rt, [
				t.item.icon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						t.item.icon,
						"dads-drawer__item-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("span", zt, C(t.item.label), 1),
				r[0] ||= s("i", {
					class: "mdi mdi-chevron-down dads-drawer__item-chevron",
					"aria-hidden": "true"
				}, null, -1)
			]), s("ul", Bt, [(_(!0), o(e, null, y(t.item.children, (e, t) => (_(), i(c, {
				key: t,
				item: e,
				"onClick:item": h
			}, null, 8, ["item"]))), 128))])])) : d.value ? (_(), o("a", {
				key: 1,
				href: t.item.disabled ? void 0 : t.item.href,
				class: "dads-drawer__item-button",
				"aria-disabled": t.item.disabled || void 0,
				tabindex: t.item.disabled ? -1 : void 0,
				onClick: m
			}, [t.item.icon ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					t.item.icon,
					"dads-drawer__item-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0), s("span", Ht, C(t.item.label), 1)], 8, Vt)) : (_(), o("button", {
				key: 2,
				type: "button",
				class: "dads-drawer__item-button",
				disabled: t.item.disabled,
				onClick: m
			}, [t.item.icon ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					t.item.icon,
					"dads-drawer__item-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0), s("span", Wt, C(t.item.label), 1)], 8, Ut))], 2);
		};
	}
}), Kt = ["aria-label"], qt = { class: "dads-drawer__header" }, Jt = {
	key: 0,
	class: "dads-drawer__title"
}, Yt = ["aria-label"], Xt = ["aria-label"], Zt = { class: "dads-drawer__list" }, Qt = "a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", $t = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDrawer",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		items: {},
		title: {},
		closeLabel: { default: "閉じる" },
		defaultAriaLabel: { default: "ナビゲーション" },
		navAriaLabel: { default: "ドロワーナビゲーション" },
		placement: { default: "left" }
	},
	emits: ["update:modelValue", "click:item"],
	setup(r, { emit: c }) {
		let u = r, d = c, m = v(null), h = null, g = () => {
			d("update:modelValue", !1);
		}, b = (e, t) => {
			d("click:item", e, t), e.onClick && e.onClick(t), e.children || g();
		}, x = () => m.value ? Array.from(m.value.querySelectorAll(Qt)) : [], S = (e) => {
			let t = x();
			if (t.length === 0) return;
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			e.shiftKey ? (i === n || i === m.value) && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
		return k(() => u.modelValue, async (e) => {
			e ? (h = document.activeElement, await f(), m.value?.focus()) : h &&= (h.focus(), null);
		}), (c, u) => (_(), i(t, { to: "body" }, [l(n, { name: `dads-drawer-${r.placement}` }, {
			default: A(() => [r.modelValue ? (_(), o("div", {
				key: 0,
				class: p(["dads-drawer", `dads-drawer--${r.placement}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-label": r.title || r.defaultAriaLabel,
				onKeydown: [M(g, ["esc"]), M(S, ["tab"])]
			}, [s("div", {
				class: "dads-drawer__overlay",
				"aria-hidden": "true",
				onClick: g
			}), s("aside", {
				ref_key: "panelRef",
				ref: m,
				class: "dads-drawer__panel",
				tabindex: "-1"
			}, [s("header", qt, [r.title ? (_(), o("h2", Jt, C(r.title), 1)) : a("", !0), s("button", {
				type: "button",
				class: "dads-drawer__close",
				"aria-label": r.closeLabel,
				onClick: g
			}, [...u[0] ||= [s("i", {
				class: "mdi mdi-close",
				"aria-hidden": "true"
			}, null, -1)]], 8, Yt)]), s("nav", {
				class: "dads-drawer__nav",
				"aria-label": r.navAriaLabel
			}, [s("ul", Zt, [(_(!0), o(e, null, y(r.items, (e, t) => (_(), i(Gt, {
				key: t,
				item: e,
				"onClick:item": b
			}, null, 8, ["item"]))), 128))])], 8, Xt)], 512)], 42, Kt)) : a("", !0)]),
			_: 1
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-04f146d2"]]), en = ["aria-label"], tn = { class: "dads-breadcrumb__list" }, nn = ["href", "onClick"], rn = ["aria-current", "aria-disabled"], an = {
	key: 2,
	class: "dads-breadcrumb__separator",
	"aria-hidden": "true"
}, on = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsBreadcrumb",
	props: {
		items: {},
		separator: { default: "》" },
		ariaLabel: { default: "パンくずリスト" }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let i = t, c = n, l = r(() => i.items.map((e, t) => {
			let n = t === i.items.length - 1;
			return {
				item: e,
				index: t,
				isLast: n,
				isDisabled: !n && !!e.disabled,
				isLink: !n && !!e.href && !e.disabled
			};
		})), u = (e, t, n) => {
			c("click:item", e, t, n);
		};
		return (n, r) => (_(), o("nav", {
			class: "dads-breadcrumb",
			"aria-label": t.ariaLabel
		}, [s("ol", tn, [(_(!0), o(e, null, y(l.value, (e) => (_(), o("li", {
			key: e.index,
			class: "dads-breadcrumb__item"
		}, [e.isLink ? (_(), o("a", {
			key: 0,
			href: e.item.href,
			class: "dads-breadcrumb__link",
			onClick: (t) => u(e.item, e.index, t)
		}, C(e.item.title), 9, nn)) : (_(), o("span", {
			key: 1,
			class: p(["dads-breadcrumb__current", { "dads-breadcrumb__current--disabled": e.isDisabled }]),
			"aria-current": e.isLast ? "page" : void 0,
			"aria-disabled": e.isDisabled ? "true" : void 0
		}, C(e.item.title), 11, rn)), e.isLast ? a("", !0) : (_(), o("span", an, C(t.separator), 1))]))), 128))])], 8, en));
	}
}), [["__scopeId", "data-v-99f8e0f7"]]), sn = ["aria-label"], cn = { class: "dads-step-navigation__list" }, ln = ["aria-current"], un = {
	class: "dads-step-navigation__indicator",
	"aria-hidden": "true"
}, dn = {
	key: 0,
	class: "mdi mdi-check"
}, fn = {
	key: 1,
	class: "mdi mdi-close"
}, pn = { key: 2 }, mn = { class: "dads-step-navigation__title" }, hn = {
	key: 0,
	class: "dads-step-navigation__connector",
	"aria-hidden": "true"
}, gn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsStepNavigation",
	props: {
		steps: {},
		orientation: { default: "horizontal" },
		clickable: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: "ステップ" }
	},
	emits: ["click:step"],
	setup(t, { emit: n }) {
		let c = t, l = n, u = r(() => ["dads-step-navigation", `dads-step-navigation--${c.orientation}`]), d = (e) => e.status ?? "pending", f = (e) => [`dads-step-navigation__item--${d(e)}`], m = (e, t, n) => {
			l("click:step", e, t, n);
		};
		return (n, r) => (_(), o("nav", {
			class: p(u.value),
			"aria-label": t.ariaLabel
		}, [s("ol", cn, [(_(!0), o(e, null, y(t.steps, (e, n) => (_(), o("li", {
			key: n,
			class: p(["dads-step-navigation__item", f(e)]),
			"aria-current": d(e) === "current" ? "step" : void 0
		}, [(_(), i(S(t.clickable ? "button" : "div"), {
			type: t.clickable ? "button" : void 0,
			class: p(t.clickable ? "dads-step-navigation__button" : "dads-step-navigation__static"),
			onClick: (r) => t.clickable ? m(e, n, r) : void 0
		}, {
			default: A(() => [s("span", un, [d(e) === "done" ? (_(), o("i", dn)) : d(e) === "error" ? (_(), o("i", fn)) : (_(), o("span", pn, C(n + 1), 1))]), s("span", mn, C(e.title), 1)]),
			_: 2
		}, 1032, [
			"type",
			"class",
			"onClick"
		])), n < t.steps.length - 1 ? (_(), o("span", hn)) : a("", !0)], 10, ln))), 128))])], 10, sn));
	}
}), [["__scopeId", "data-v-d096fd65"]]), _n = ["aria-label", "aria-orientation"], vn = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], yn = { class: "dads-tab__label" }, bn = { class: "dads-tab__panels" }, xn = [
	"id",
	"aria-labelledby",
	"hidden"
], Sn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsTab",
	props: {
		modelValue: {},
		items: {},
		orientation: { default: "horizontal" },
		keepAlive: {
			type: Boolean,
			default: !1
		},
		ariaLabel: { default: "タブ" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let i = t, c = n, l = E(), u = r(() => `dads-tab-${l}`), d = v([]), m = (e) => e.value === i.modelValue, h = (e) => {
			e.disabled || m(e) || (c("update:modelValue", e.value), c("change", e.value));
		}, g = (e) => {
			f(() => {
				d.value[e]?.focus();
			});
		}, x = (e) => {
			let t = i.items.map((e, t) => e.disabled ? -1 : t).filter((e) => e >= 0);
			if (t.length === 0) return;
			let n = i.items.findIndex((e) => e.value === i.modelValue), r = t.indexOf(n), a = r === -1 ? 0 : r, o = t.length - 1, s = null, l = i.orientation === "vertical" ? "ArrowDown" : "ArrowRight", u = i.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
			switch (e.key) {
				case l:
					s = t[(a + 1) % t.length];
					break;
				case u:
					s = t[(a - 1 + t.length) % t.length];
					break;
				case "Home":
					s = t[0];
					break;
				case "End":
					s = t[o];
					break;
				case "Enter":
				case " ": return;
				default: return;
			}
			if (s === n) return;
			e.preventDefault();
			let d = i.items[s];
			c("update:modelValue", d.value), c("change", d.value), g(s);
		}, S = (e) => ["dads-tab__tab", {
			"dads-tab__tab--active": m(e),
			"dads-tab__tab--disabled": e.disabled
		}], w = (e) => `${u.value}-tab-${e}`, T = (e) => `${u.value}-panel-${e}`;
		return (n, r) => (_(), o("div", { class: p(["dads-tab", `dads-tab--${t.orientation}`]) }, [s("div", {
			role: "tablist",
			class: "dads-tab__list",
			"aria-label": t.ariaLabel,
			"aria-orientation": t.orientation,
			onKeydown: x
		}, [(_(!0), o(e, null, y(t.items, (e) => (_(), o("button", {
			id: w(e.value),
			key: String(e.value),
			ref_for: !0,
			ref_key: "tabRefs",
			ref: d,
			type: "button",
			role: "tab",
			"aria-selected": m(e),
			"aria-controls": T(e.value),
			tabindex: m(e) ? 0 : -1,
			disabled: e.disabled || void 0,
			class: p(S(e)),
			onClick: (t) => h(e)
		}, [e.icon ? (_(), o("i", {
			key: 0,
			class: p([
				"mdi",
				e.icon,
				"dads-tab__icon"
			]),
			"aria-hidden": "true"
		}, null, 2)) : a("", !0), s("span", yn, C(e.label), 1)], 10, vn))), 128))], 40, _n), s("div", bn, [(_(!0), o(e, null, y(t.items, (e) => j((_(), o("div", {
			id: T(e.value),
			key: String(e.value),
			role: "tabpanel",
			"aria-labelledby": w(e.value),
			hidden: !t.keepAlive && !m(e) ? !0 : void 0,
			class: "dads-tab__panel",
			tabindex: 0
		}, [t.keepAlive || m(e) ? b(n.$slots, `panel-${e.value}`, { key: 0 }, void 0, !0) : a("", !0)], 8, xn)), [[O, m(e)]])), 128))])], 2));
	}
}), [["__scopeId", "data-v-4689cd84"]]), Cn = ["role", "aria-live"], wn = {
	class: "dads-notification-banner__icon",
	"aria-hidden": "true"
}, Tn = { class: "dads-notification-banner__content" }, En = {
	key: 0,
	class: "dads-notification-banner__title"
}, Dn = {
	key: 1,
	class: "dads-notification-banner__message"
}, On = {
	key: 2,
	class: "dads-notification-banner__timestamp"
}, kn = ["datetime"], An = {
	key: 0,
	class: "dads-notification-banner__action"
}, jn = ["aria-label"], Mn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsNotificationBanner",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		color: { default: "info" },
		style: { default: "standard" },
		title: {},
		message: {},
		closable: {
			type: Boolean,
			default: !0
		},
		closeLabel: { default: "閉じる" },
		timestamp: {},
		persistKey: {}
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = {
			success: "mdi-check-circle",
			error: "mdi-alert-circle",
			warning: "mdi-alert",
			info: "mdi-information",
			neutral: "mdi-bell"
		}, f = r(() => d[l.color]), m = r(() => [
			"dads-notification-banner",
			`dads-notification-banner--${l.color}`,
			`dads-notification-banner--style-${l.style}`
		]), h = r(() => l.color === "error" || l.color === "warning" ? "alert" : "status"), v = r(() => l.color === "error" ? "assertive" : "polite"), y = r(() => l.timestamp === void 0 ? null : l.timestamp instanceof Date ? {
			iso: l.timestamp.toISOString(),
			display: l.timestamp.toLocaleString()
		} : {
			iso: l.timestamp,
			display: l.timestamp
		});
		g(() => {
			if (l.persistKey && !(typeof window > "u")) try {
				window.localStorage.getItem(l.persistKey) === "closed" && u("update:modelValue", !1);
			} catch {}
		});
		let x = () => {
			if (u("update:modelValue", !1), u("close"), l.persistKey && typeof window < "u") try {
				window.localStorage.setItem(l.persistKey, "closed");
			} catch {}
		};
		return (t, r) => (_(), i(n, { name: "dads-notification-banner" }, {
			default: A(() => [e.modelValue ? (_(), o("div", {
				key: 0,
				class: p(m.value),
				role: h.value,
				"aria-live": v.value
			}, [
				s("span", wn, [b(t.$slots, "icon", {}, () => [s("i", { class: p(["mdi", f.value]) }, null, 2)], !0)]),
				s("div", Tn, [
					e.title ? (_(), o("p", En, C(e.title), 1)) : a("", !0),
					e.message || t.$slots.default ? (_(), o("p", Dn, [b(t.$slots, "default", {}, () => [c(C(e.message), 1)], !0)])) : a("", !0),
					y.value ? (_(), o("p", On, [s("time", { datetime: y.value.iso }, C(y.value.display), 9, kn)])) : a("", !0)
				]),
				t.$slots.action ? (_(), o("div", An, [b(t.$slots, "action", {}, void 0, !0)])) : a("", !0),
				e.closable ? (_(), o("button", {
					key: 1,
					type: "button",
					class: "dads-notification-banner__close",
					"aria-label": e.closeLabel,
					onClick: x
				}, [...r[0] ||= [s("i", {
					class: "mdi mdi-close",
					"aria-hidden": "true"
				}, null, -1)]], 8, jn)) : a("", !0)
			], 10, Cn)) : a("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-cae094ba"]]), Nn = ["aria-modal", "aria-labelledby"], Pn = {
	key: 0,
	class: "dads-dialog__header"
}, Fn = ["id"], In = ["aria-label"], Ln = { class: "dads-dialog__body" }, Rn = {
	key: 1,
	class: "dads-dialog__footer"
}, zn = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", Bn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		variant: { default: "modal" },
		title: {},
		persistent: {
			type: Boolean,
			default: !1
		},
		closable: {
			type: Boolean,
			default: !0
		},
		closeLabel: { default: "閉じる" },
		initialFocus: {},
		returnFocusTo: {}
	},
	emits: [
		"update:modelValue",
		"close",
		"open"
	],
	setup(e, { emit: c }) {
		let u = e, d = c, m = v(null), h = r(() => u.variant === "modal"), g = null, y = E(), x = () => {
			d("update:modelValue", !1), d("close");
		}, S = () => {
			u.persistent || x();
		}, T = () => {
			h.value && (u.persistent || x());
		}, D = () => m.value ? Array.from(m.value.querySelectorAll(zn)) : [], O = (e) => e ? typeof e == "string" ? document.querySelector(e) : e : null, j = (e) => {
			if (!h.value || e.key !== "Tab") return;
			let t = D();
			if (t.length === 0) {
				e.preventDefault(), m.value?.focus();
				return;
			}
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			e.shiftKey ? (i === n || i === m.value) && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
		return k(() => u.modelValue, async (e) => {
			if (e) g = document.activeElement, await f(), (O(u.initialFocus) ?? m.value)?.focus(), d("open");
			else {
				let e = O(u.returnFocusTo);
				e ? e.focus() : g && g.focus(), g = null;
			}
		}), (r, c) => (_(), i(t, { to: "body" }, [l(n, { name: "dads-dialog" }, {
			default: A(() => [e.modelValue ? (_(), o("div", {
				key: 0,
				class: p(["dads-dialog", [`dads-dialog--${e.size}`, `dads-dialog--${e.variant}`]]),
				role: "dialog",
				"aria-modal": h.value ? "true" : void 0,
				"aria-labelledby": e.title ? w(y) : void 0,
				onKeydown: [M(S, ["esc"]), j]
			}, [h.value ? (_(), o("div", {
				key: 0,
				class: "dads-dialog__overlay",
				"aria-hidden": "true",
				onClick: T
			})) : a("", !0), s("div", {
				ref_key: "panelRef",
				ref: m,
				class: "dads-dialog__panel",
				tabindex: "-1"
			}, [
				e.title || r.$slots.header || e.closable ? (_(), o("header", Pn, [b(r.$slots, "header", {}, () => [e.title ? (_(), o("h2", {
					key: 0,
					id: w(y),
					class: "dads-dialog__title"
				}, C(e.title), 9, Fn)) : a("", !0)], !0), e.closable ? (_(), o("button", {
					key: 0,
					type: "button",
					class: "dads-dialog__close",
					"aria-label": e.closeLabel,
					onClick: x
				}, [...c[0] ||= [s("i", {
					class: "mdi mdi-close",
					"aria-hidden": "true"
				}, null, -1)]], 8, In)) : a("", !0)])) : a("", !0),
				s("div", Ln, [b(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (_(), o("footer", Rn, [b(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 512)], 42, Nn)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-a08c675d"]]), Vn = ["aria-describedby"], Hn = ["id"], Un = { class: "dads-tooltip__content" }, Wn = 8, Gn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsTooltip",
	props: {
		text: {},
		position: { default: "top" },
		openDelay: { default: 0 },
		closeDelay: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {}
	},
	setup(e) {
		let u = e, d = E(), g = r(() => u.id ?? `dads-tooltip-${d}`), y = v(null), x = v(null), S = v(!1), w = v({}), T = null, D = null, O = () => {
			T !== null && (clearTimeout(T), T = null), D !== null && (clearTimeout(D), D = null);
		}, j = () => {
			u.disabled || (S.value = !0);
		}, M = () => {
			S.value = !1;
		}, N = () => {
			u.disabled || (D !== null && (clearTimeout(D), D = null), !S.value && (u.openDelay > 0 ? T = setTimeout(() => {
				T = null, j();
			}, u.openDelay) : j()));
		}, P = () => {
			T !== null && (clearTimeout(T), T = null), S.value && (u.closeDelay > 0 ? D = setTimeout(() => {
				D = null, M();
			}, u.closeDelay) : M());
		}, F = () => {
			let e = y.value, t = x.value;
			if (!e || !t) return;
			let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = window.scrollX, a = window.scrollY, o = 0, s = 0;
			switch (u.position) {
				case "top":
					o = n.top - r.height - Wn, s = n.left + n.width / 2 - r.width / 2;
					break;
				case "top-start":
					o = n.top - r.height - Wn, s = n.left;
					break;
				case "top-end":
					o = n.top - r.height - Wn, s = n.right - r.width;
					break;
				case "bottom":
					o = n.bottom + Wn, s = n.left + n.width / 2 - r.width / 2;
					break;
				case "bottom-start":
					o = n.bottom + Wn, s = n.left;
					break;
				case "bottom-end":
					o = n.bottom + Wn, s = n.right - r.width;
					break;
				case "left":
					o = n.top + n.height / 2 - r.height / 2, s = n.left - r.width - Wn;
					break;
				case "right":
					o = n.top + n.height / 2 - r.height / 2, s = n.right + Wn;
					break;
			}
			w.value = {
				top: `${o + a}px`,
				left: `${s + i}px`
			};
		};
		k(S, async (e) => {
			e && (await f(), F());
		});
		let I = r(() => [`dads-tooltip--${u.position}`]), L = r(() => S.value && !u.disabled ? g.value : void 0);
		return h(() => {
			O();
		}), (r, u) => (_(), o("span", {
			ref_key: "wrapRef",
			ref: y,
			class: "dads-tooltip__trigger-wrap",
			"aria-describedby": L.value,
			onMouseenter: N,
			onMouseleave: P,
			onFocusin: N,
			onFocusout: P
		}, [b(r.$slots, "trigger", {}, void 0, !0), (_(), i(t, { to: "body" }, [l(n, { name: "dads-tooltip" }, {
			default: A(() => [S.value && !e.disabled ? (_(), o("div", {
				key: 0,
				id: g.value,
				ref_key: "tipRef",
				ref: x,
				class: p(["dads-tooltip", I.value]),
				role: "tooltip",
				style: m(w.value)
			}, [s("div", Un, [b(r.$slots, "default", {}, () => [c(C(e.text), 1)], !0)]), u[0] ||= s("span", {
				class: "dads-tooltip__arrow",
				"aria-hidden": "true"
			}, null, -1)], 14, Hn)) : a("", !0)]),
			_: 3
		})]))], 40, Vn));
	}
}), [["__scopeId", "data-v-c8c0469d"]]), Kn = [
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-label"
], qn = {
	key: 0,
	class: "dads-progress-indicator__bar"
}, Jn = {
	key: 1,
	class: "dads-progress-indicator__circle-svg",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Yn = ["stroke-dashoffset"], Xn = {
	key: 2,
	class: "dads-progress-indicator__label"
}, Zn = 16, Qn = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsProgressIndicator",
	props: {
		variant: { default: "linear" },
		value: {},
		size: { default: "md" },
		color: { default: "primary" },
		label: {},
		showLabel: {
			type: Boolean,
			default: !1
		},
		ariaLabel: {}
	},
	setup(e) {
		let t = e, n = 2 * Math.PI * Zn, i = r(() => t.value === void 0), c = r(() => {
			if (t.value !== void 0) return Math.max(0, Math.min(100, t.value));
		}), l = r(() => {
			if (c.value !== void 0) return n * (1 - c.value / 100);
		}), u = r(() => [
			"dads-progress-indicator",
			`dads-progress-indicator--${t.variant}`,
			`dads-progress-indicator--${t.size}`,
			`dads-progress-indicator--color-${t.color}`,
			{ "dads-progress-indicator--indeterminate": i.value }
		]), d = r(() => t.label === void 0 ? i.value ? "" : `${c.value}%` : t.label);
		return (t, r) => (_(), o("div", {
			class: p(u.value),
			role: "progressbar",
			"aria-valuemin": i.value ? void 0 : 0,
			"aria-valuemax": i.value ? void 0 : 100,
			"aria-valuenow": i.value ? void 0 : c.value,
			"aria-label": e.ariaLabel
		}, [e.variant === "linear" ? (_(), o("div", qn, [s("div", {
			class: "dads-progress-indicator__bar-fill",
			style: m(i.value ? void 0 : { width: `${c.value}%` })
		}, null, 4)])) : (_(), o("svg", Jn, [s("circle", {
			class: "dads-progress-indicator__circle-track",
			cx: "18",
			cy: "18",
			r: Zn,
			fill: "none",
			"stroke-width": "3"
		}), s("circle", {
			class: "dads-progress-indicator__circle-fill",
			cx: "18",
			cy: "18",
			r: Zn,
			fill: "none",
			"stroke-width": "3",
			"stroke-dasharray": n,
			"stroke-dashoffset": i.value ? void 0 : l.value
		}, null, 8, Yn)])), e.showLabel && d.value ? (_(), o("span", Xn, C(d.value), 1)) : a("", !0)], 10, Kn));
	}
}), [["__scopeId", "data-v-c7e52e14"]]), $n = {
	key: 0,
	class: "dads-card__image"
}, er = {
	key: 1,
	class: "dads-card__header"
}, tr = { class: "dads-card__body" }, nr = {
	key: 2,
	class: "dads-card__sub"
}, rr = {
	key: 3,
	class: "dads-card__footer"
}, ir = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsCard",
	props: {
		variant: { default: "outlined" },
		elevation: { default: 1 },
		clickable: {
			type: Boolean,
			default: !1
		},
		ariaLabel: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, c = t, l = r(() => [
			"dads-card",
			`dads-card--${n.variant}`,
			n.variant === "elevated" && `dads-card--elevation-${n.elevation}`,
			n.clickable && "dads-card--clickable"
		]), u = (e) => {
			n.clickable && c("click", e);
		}, d = (e) => {
			n.clickable && (e.key === "Enter" || e.key === " " || e.key === "Spacebar") && (e.preventDefault(), u(e));
		};
		return (t, n) => (_(), i(S(e.clickable ? "button" : "div"), {
			type: e.clickable ? "button" : void 0,
			class: p(l.value),
			"aria-label": e.clickable ? e.ariaLabel : void 0,
			onClick: u,
			onKeydown: d
		}, {
			default: A(() => [
				t.$slots.image ? (_(), o("div", $n, [b(t.$slots, "image", {}, void 0, !0)])) : a("", !0),
				t.$slots.header ? (_(), o("header", er, [b(t.$slots, "header", {}, void 0, !0)])) : a("", !0),
				s("div", tr, [b(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.sub ? (_(), o("div", nr, [b(t.$slots, "sub", {}, void 0, !0)])) : a("", !0),
				t.$slots.footer ? (_(), o("footer", rr, [b(t.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			]),
			_: 3
		}, 40, [
			"type",
			"class",
			"aria-label"
		]));
	}
}), [["__scopeId", "data-v-14ea26ab"]]), ar = {
	key: 0,
	class: "dads-heading__shoulder"
}, or = {
	key: 0,
	class: "dads-heading__icon",
	"aria-hidden": "true"
}, sr = { class: "dads-heading__text" }, cr = {
	key: 1,
	class: "dads-heading__chip"
}, lr = {
	key: 1,
	class: "dads-heading__subtitle"
}, ur = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
		let t = e, n = D(), l = r(() => t.level === void 0 ? Number(t.as.charAt(1)) : t.level), u = r(() => !!t.shoulder || !!n.shoulder), d = r(() => !!t.subtitle || !!n.subtitle), f = r(() => !!n.chip), m = r(() => u.value || d.value ? "hgroup" : "div"), h = r(() => {
			let e = ["dads-heading", `dads-heading--level-${l.value}`];
			return t.size && e.push(`dads-heading--size-${t.size}`), e;
		});
		return (t, n) => (_(), i(S(m.value), { class: p(h.value) }, {
			default: A(() => [
				u.value ? (_(), o("p", ar, [b(t.$slots, "shoulder", {}, () => [c(C(e.shoulder), 1)], !0)])) : a("", !0),
				(_(), i(S(e.as), { class: "dads-heading__title" }, {
					default: A(() => [
						t.$slots["prepend-icon"] || e.icon ? (_(), o("span", or, [b(t.$slots, "prepend-icon", {}, () => [e.icon ? (_(), o("i", {
							key: 0,
							class: p(["mdi", e.icon])
						}, null, 2)) : a("", !0)], !0)])) : a("", !0),
						s("span", sr, [b(t.$slots, "default", {}, void 0, !0)]),
						f.value ? (_(), o("span", cr, [b(t.$slots, "chip", {}, void 0, !0)])) : a("", !0)
					]),
					_: 3
				})),
				d.value ? (_(), o("p", lr, [b(t.$slots, "subtitle", {}, () => [c(C(e.subtitle), 1)], !0)])) : a("", !0)
			]),
			_: 3
		}, 8, ["class"]));
	}
}), [["__scopeId", "data-v-6c1fa5cf"]]), dr = ["aria-orientation", "aria-label"], fr = { class: "dads-divider__label" }, pr = {
	key: 1,
	class: "dads-divider__line",
	"aria-hidden": "true"
}, mr = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDivider",
	props: {
		orientation: { default: "horizontal" },
		color: { default: "default" },
		variant: { default: "full-width" },
		thickness: { default: 1 },
		lineStyle: { default: "solid" },
		ariaLabel: {}
	},
	setup(t) {
		let n = t, i = D(), a = r(() => !!i.default && n.orientation === "horizontal"), c = r(() => [
			`dads-divider--${n.orientation}`,
			`dads-divider--${n.color}`,
			`dads-divider--${n.variant}`,
			`dads-divider--thickness-${n.thickness}`,
			`dads-divider--style-${n.lineStyle}`,
			{ "dads-divider--with-label": a.value }
		]);
		return (n, r) => (_(), o("div", {
			class: p(["dads-divider", c.value]),
			role: "separator",
			"aria-orientation": t.orientation,
			"aria-label": t.ariaLabel
		}, [a.value ? (_(), o(e, { key: 0 }, [
			r[0] ||= s("span", {
				class: "dads-divider__line",
				"aria-hidden": "true"
			}, null, -1),
			s("span", fr, [b(n.$slots, "default", {}, void 0, !0)]),
			r[1] ||= s("span", {
				class: "dads-divider__line",
				"aria-hidden": "true"
			}, null, -1)
		], 64)) : (_(), o("span", pr))], 10, dr));
	}
}), [["__scopeId", "data-v-ff448fdb"]]), hr = {
	key: 0,
	class: "dads-table__caption"
}, gr = {
	key: 2,
	class: "dads-table__skeleton-body",
	"aria-busy": "true",
	"aria-live": "polite"
}, _r = { class: "dads-table__sr-only" }, vr = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsTable",
	props: {
		stickyHeader: {
			type: Boolean,
			default: !1
		},
		density: { default: "comfortable" },
		bordered: {
			type: Boolean,
			default: !1
		},
		striped: {
			type: Boolean,
			default: !1
		},
		caption: {},
		loading: {
			type: Boolean,
			default: !1
		},
		skeletonRowCount: { default: 3 },
		skeletonColumnCount: { default: 4 },
		loadingLabel: { default: "読み込み中" }
	},
	setup(t) {
		let n = t, i = r(() => Array.from({ length: n.skeletonRowCount }, (e, t) => t)), l = r(() => Array.from({ length: n.skeletonColumnCount }, (e, t) => t)), u = r(() => ({ "dads-table-wrapper--sticky-header": n.stickyHeader })), d = r(() => [`dads-table--${n.density}`, {
			"dads-table--sticky-header": n.stickyHeader,
			"dads-table--bordered": n.bordered,
			"dads-table--striped": n.striped,
			"dads-table--loading": n.loading
		}]);
		return (n, r) => (_(), o("div", { class: p(["dads-table-wrapper", u.value]) }, [s("table", { class: p(["dads-table", d.value]) }, [t.caption || n.$slots.caption ? (_(), o("caption", hr, [b(n.$slots, "caption", {}, () => [c(C(t.caption), 1)], !0)])) : a("", !0), t.loading ? (_(), o("tbody", gr, [(_(!0), o(e, null, y(i.value, (n) => (_(), o("tr", {
			key: n,
			class: "dads-table__skeleton-row"
		}, [(_(!0), o(e, null, y(l.value, (e) => (_(), o("td", {
			key: e,
			class: "dads-table__skeleton-cell"
		}, [r[0] ||= s("span", {
			class: "dads-table__skeleton-bar",
			"aria-hidden": "true"
		}, null, -1), s("span", _r, C(t.loadingLabel), 1)]))), 128))]))), 128))])) : b(n.$slots, "default", { key: 1 }, void 0, !0)], 2)], 2));
	}
}), [["__scopeId", "data-v-3a4df01a"]]), yr = { class: "dads-accordion__heading" }, br = [
	"id",
	"aria-expanded",
	"aria-controls",
	"disabled",
	"onClick",
	"onKeydown"
], xr = { class: "dads-accordion__title" }, Sr = {
	class: "dads-accordion__icon",
	"aria-hidden": "true"
}, Cr = ["id", "aria-labelledby"], wr = {
	key: 0,
	class: "dads-accordion__return-link"
}, Tr = ["href"], Er = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsAccordion",
	props: {
		modelValue: { default: () => "" },
		items: {},
		type: { default: "single" },
		size: { default: "m" },
		returnLink: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let i = t, c = n, l = E(), u = r(() => `dads-accordion-${l}`), d = v([]), m = (e) => i.type === "multiple" ? Array.isArray(i.modelValue) && i.modelValue.includes(e) : i.modelValue === e, h = (e) => {
			if (!e.disabled) {
				if (i.type === "multiple") {
					let t = Array.isArray(i.modelValue) ? i.modelValue : [];
					c("update:modelValue", t.includes(e.id) ? t.filter((t) => t !== e.id) : [...t, e.id]);
					return;
				}
				c("update:modelValue", i.modelValue === e.id ? "" : e.id);
			}
		}, g = (e) => {
			f(() => {
				d.value[e]?.focus();
			});
		}, x = (e, t) => {
			let n = i.items.map((e, t) => e.disabled ? -1 : t).filter((e) => e >= 0);
			if (n.length === 0) return;
			let r = n.indexOf(t), a = r === -1 ? 0 : r, o = n.length, s;
			switch (e.key) {
				case "ArrowDown":
					s = n[(a + 1) % o];
					break;
				case "ArrowUp":
					s = n[(a - 1 + o) % o];
					break;
				case "Home":
					s = n[0];
					break;
				case "End":
					s = n[o - 1];
					break;
				default: return;
			}
			e.preventDefault(), g(s);
		}, S = (e) => `${u.value}-header-${e}`, w = (e) => `${u.value}-panel-${e}`, T = (e) => ["dads-accordion__item", {
			"dads-accordion__item--open": m(e.id),
			"dads-accordion__item--disabled": e.disabled
		}];
		return (n, r) => (_(), o("div", { class: p(["dads-accordion", `dads-accordion--size-${t.size}`]) }, [(_(!0), o(e, null, y(t.items, (e, r) => (_(), o("div", {
			key: e.id,
			class: p(T(e))
		}, [s("h3", yr, [s("button", {
			id: S(e.id),
			ref_for: !0,
			ref_key: "headerRefs",
			ref: d,
			type: "button",
			class: "dads-accordion__header",
			"aria-expanded": m(e.id),
			"aria-controls": w(e.id),
			disabled: e.disabled || void 0,
			onClick: (t) => h(e),
			onKeydown: (e) => x(e, r)
		}, [s("span", xr, C(e.title), 1), s("span", Sr, [s("i", { class: p(["mdi", m(e.id) ? "mdi-chevron-up" : "mdi-chevron-down"]) }, null, 2)])], 40, br)]), j(s("div", {
			id: w(e.id),
			role: "region",
			class: "dads-accordion__panel",
			"aria-labelledby": S(e.id)
		}, [b(n.$slots, `panel-${e.id}`, {}, void 0, !0), t.returnLink ? (_(), o("p", wr, [s("a", { href: t.returnLink.href }, C(t.returnLink.label), 9, Tr)])) : a("", !0)], 8, Cr), [[O, m(e.id)]])], 2))), 128))], 2));
	}
}), [["__scopeId", "data-v-01e324ac"]]), Dr = {
	key: 0,
	class: "dads-chip-label__prepend",
	"aria-hidden": "true"
}, Or = { class: "dads-chip-label__text" }, kr = {
	key: 1,
	class: "dads-chip-label__append",
	"aria-hidden": "true"
}, Ar = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsChipLabel",
	props: {
		size: { default: "md" },
		color: { default: "primary" },
		appearance: { default: "filled" }
	},
	setup(e) {
		let t = e, n = r(() => [
			"dads-chip-label",
			`dads-chip-label--${t.size}`,
			`dads-chip-label--${t.color}`,
			`dads-chip-label--appearance-${t.appearance}`
		]);
		return (e, t) => (_(), o("span", { class: p(n.value) }, [
			e.$slots.prepend ? (_(), o("span", Dr, [b(e.$slots, "prepend", {}, void 0, !0)])) : a("", !0),
			s("span", Or, [b(e.$slots, "default", {}, void 0, !0)]),
			e.$slots.append ? (_(), o("span", kr, [b(e.$slots, "append", {}, void 0, !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-d13a89ef"]]), jr = {
	key: 0,
	class: "dads-chip-tag__prepend",
	"aria-hidden": "true"
}, Mr = { class: "dads-chip-tag__label" }, Nr = {
	key: 1,
	class: "dads-chip-tag__append",
	"aria-hidden": "true"
}, Pr = ["aria-label", "disabled"], Fr = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsChipTag",
	props: {
		size: { default: "md" },
		color: { default: "primary" },
		closable: {
			type: Boolean,
			default: !1
		},
		clickable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		closeLabel: { default: "削除" },
		ariaLabel: {},
		appearance: { default: "filled" }
	},
	emits: ["click", "close"],
	setup(e, { emit: t }) {
		let n = e, c = t, l = r(() => [
			"dads-chip-tag",
			`dads-chip-tag--${n.size}`,
			`dads-chip-tag--${n.color}`,
			`dads-chip-tag--appearance-${n.appearance}`,
			{ "dads-chip-tag--clickable": n.clickable }
		]), u = r(() => !n.clickable && n.disabled ? "true" : void 0), d = (e) => {
			!n.clickable || n.disabled || c("click", e);
		}, f = (e) => {
			!n.clickable || n.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), c("click", e));
		}, m = (e) => {
			n.disabled || c("close", e);
		};
		return (t, n) => (_(), i(S(e.clickable ? "button" : "span"), {
			type: e.clickable ? "button" : void 0,
			class: p(l.value),
			role: e.clickable ? "button" : void 0,
			tabindex: e.clickable && !e.disabled ? 0 : void 0,
			disabled: e.clickable && e.disabled || void 0,
			"aria-disabled": u.value,
			"aria-label": e.ariaLabel,
			onClick: d,
			onKeydown: f
		}, {
			default: A(() => [
				t.$slots.prepend ? (_(), o("span", jr, [b(t.$slots, "prepend", {}, void 0, !0)])) : a("", !0),
				s("span", Mr, [b(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.append && !e.closable ? (_(), o("span", Nr, [b(t.$slots, "append", {}, void 0, !0)])) : a("", !0),
				e.closable ? (_(), o("button", {
					key: 2,
					type: "button",
					class: "dads-chip-tag__close",
					"aria-label": e.closeLabel,
					disabled: e.disabled,
					onClick: N(m, ["stop"])
				}, [...n[0] ||= [s("i", {
					class: "mdi mdi-close",
					"aria-hidden": "true"
				}, null, -1)]], 8, Pr)) : a("", !0)
			]),
			_: 3
		}, 40, [
			"type",
			"class",
			"role",
			"tabindex",
			"disabled",
			"aria-disabled",
			"aria-label"
		]));
	}
}), [["__scopeId", "data-v-dda0e07b"]]), Ir = [
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
], Lr = { class: "dads-color-picker__main" }, Rr = [
	"value",
	"disabled",
	"aria-label"
], zr = [
	"value",
	"disabled",
	"aria-label"
], Br = {
	class: "dads-color-picker__swatches",
	role: "list"
}, Vr = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"onClick"
], Hr = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsColorPicker",
	props: {
		modelValue: {},
		swatches: { default: () => [...Ir] },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		defaultAriaLabel: { default: "色を選択" },
		hexInputAriaLabel: { default: "HEXカラーコード" },
		formatSwatchAriaLabel: {
			type: Function,
			default: (e) => `${e} を選択`
		}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let i = t, a = n, c = `dads-color-picker-${E()}`, l = `${c}-hex`, u = (e) => {
			if (!e) return "#000000";
			let t = e.trim().toLowerCase();
			return t.startsWith("#") ? t : `#${t}`;
		}, d = r(() => u(i.modelValue)), f = (e) => /^#[0-9a-f]{6}$/i.test(e.trim()), h = (e) => {
			let t = e.target;
			a("update:modelValue", u(t.value));
		}, g = (e) => {
			let t = e.target;
			f(t.value) && a("update:modelValue", u(t.value));
		}, v = (e) => {
			i.disabled || a("update:modelValue", u(e));
		};
		return (n, r) => (_(), o("div", { class: p(["dads-color-picker", { "dads-color-picker--disabled": t.disabled }]) }, [s("div", Lr, [s("label", {
			for: c,
			class: "dads-color-picker__swatch-label"
		}, [s("input", {
			id: c,
			class: "dads-color-picker__color-input",
			type: "color",
			value: d.value,
			disabled: t.disabled,
			"aria-label": t.label ?? t.defaultAriaLabel,
			onInput: h
		}, null, 40, Rr), s("span", {
			class: "dads-color-picker__swatch-preview",
			style: m({ backgroundColor: d.value }),
			"aria-hidden": "true"
		}, null, 4)]), s("input", {
			id: l,
			class: "dads-color-picker__hex-input",
			type: "text",
			value: t.modelValue,
			disabled: t.disabled,
			maxlength: "7",
			spellcheck: "false",
			autocomplete: "off",
			"aria-label": t.hexInputAriaLabel,
			onInput: g
		}, null, 40, zr)]), s("ul", Br, [(_(!0), o(e, null, y(t.swatches, (e) => (_(), o("li", { key: e }, [s("button", {
			type: "button",
			class: "dads-color-picker__swatch",
			style: m({ backgroundColor: e }),
			disabled: t.disabled,
			"aria-label": t.formatSwatchAriaLabel(e),
			"aria-pressed": u(e) === d.value,
			onClick: (t) => v(e)
		}, null, 12, Vr)]))), 128))])], 2));
	}
}), [["__scopeId", "data-v-5cc3a708"]]), Ur = ["for"], Wr = {
	key: 0,
	class: "dads-date-picker__required",
	"aria-hidden": "true"
}, Gr = ["data-size"], Kr = [
	"data-error",
	"data-disabled",
	"data-readonly"
], qr = { class: "dads-date-picker__year" }, Jr = { class: "dads-date-picker__label" }, Yr = [
	"id",
	"name",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-required",
	"aria-describedby"
], Xr = {
	key: 0,
	class: "dads-date-picker__wareki",
	"aria-live": "polite"
}, Zr = { class: "dads-date-picker__month" }, Qr = { class: "dads-date-picker__label" }, $r = [
	"id",
	"name",
	"value",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-describedby"
], ei = { class: "dads-date-picker__day" }, ti = { class: "dads-date-picker__label" }, ni = [
	"id",
	"name",
	"value",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-describedby"
], ri = [
	"aria-expanded",
	"aria-controls",
	"aria-label",
	"disabled"
], ii = ["id", "aria-label"], ai = { class: "dads-date-picker__calendar-header" }, oi = ["disabled", "aria-label"], si = {
	class: "dads-date-picker__current-month",
	"aria-live": "polite"
}, ci = ["disabled", "aria-label"], li = ["aria-label"], ui = [
	"data-selected",
	"data-today",
	"disabled",
	"aria-selected",
	"onClick"
], di = {
	key: 1,
	"aria-hidden": "true",
	class: "dads-date-picker__date-placeholder"
}, fi = {
	key: 1,
	class: "dads-date-picker__footer"
}, pi = ["id"], mi = ["id"], hi = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDatePicker",
	props: {
		modelValue: { default: "" },
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
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
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(t, { emit: n }) {
		let i = t, l = (e) => Number.isFinite(e) ? e >= 2019 ? {
			era: "令和",
			year: e - 2018
		} : e >= 1989 ? {
			era: "平成",
			year: e - 1988
		} : e >= 1926 ? {
			era: "昭和",
			year: e - 1925
		} : e >= 1912 ? {
			era: "大正",
			year: e - 1911
		} : e >= 1868 ? {
			era: "明治",
			year: e - 1867
		} : null : null, u = n, d = E(), f = r(() => i.id ?? `dads-date-picker-${d}`), m = r(() => `${f.value}-year`), b = r(() => `${f.value}-month`), x = r(() => `${f.value}-day`), S = r(() => `${f.value}-popover`), w = r(() => `${f.value}-hint`), T = r(() => `${f.value}-error`), D = r(() => i.error || !!i.errorMessage), A = r(() => {
			let e = [];
			return D.value && i.errorMessage ? e.push(T.value) : i.hint && e.push(w.value), e.length > 0 ? e.join(" ") : void 0;
		}), M = r(() => D.value && !!i.errorMessage || !!i.hint), N = (e) => {
			if (!e || !/^\d{4}-\d{2}-\d{2}$/.test(e)) return {
				year: null,
				month: null,
				day: null
			};
			let [t, n, r] = e.split("-").map((e) => Number.parseInt(e, 10));
			return Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r) ? {
				year: null,
				month: null,
				day: null
			} : {
				year: t,
				month: n,
				day: r
			};
		}, P = (e, t = 2) => String(e).padStart(t, "0"), F = (e, t, n) => {
			if (e === null || t === null || n === null || t < 1 || t > 12 || n < 1 || n > 31) return "";
			let r = new Date(e, t - 1, n);
			return r.getFullYear() !== e || r.getMonth() !== t - 1 || r.getDate() !== n ? "" : `${P(e, 4)}-${P(t)}-${P(n)}`;
		}, I = v(""), L = v(""), R = v("");
		k(() => i.modelValue, (e) => {
			let t = N(e);
			I.value = t.year === null ? "" : String(t.year).padStart(4, "0"), L.value = t.month === null ? "" : P(t.month), R.value = t.day === null ? "" : P(t.day);
		}, { immediate: !0 });
		let z = () => {
			let e = I.value ? Number.parseInt(I.value, 10) : null, t = L.value ? Number.parseInt(L.value, 10) : null, n = R.value ? Number.parseInt(R.value, 10) : null, r = F(Number.isNaN(e) ? null : e, Number.isNaN(t) ? null : t, Number.isNaN(n) ? null : n);
			r !== i.modelValue && (u("update:modelValue", r), u("change", r));
		}, B = (e) => {
			I.value = e.target.value.replace(/\D/g, "").slice(0, 4), z();
		}, V = (e) => {
			L.value = e.target.value.replace(/\D/g, "").slice(0, 2), z();
		}, H = (e) => {
			R.value = e.target.value.replace(/\D/g, "").slice(0, 2), z();
		}, U = v(null), W = v(null), G = v(null), K = v(null), q = v(null), J = v(!1), Y = v((/* @__PURE__ */ new Date()).getFullYear()), X = v((/* @__PURE__ */ new Date()).getMonth() + 1), ee = () => {
			let e = N(i.modelValue);
			if (e.year !== null && e.month !== null) {
				Y.value = e.year, X.value = e.month;
				return;
			}
			let t = /* @__PURE__ */ new Date();
			Y.value = t.getFullYear(), X.value = t.getMonth() + 1;
		}, Z = () => {
			i.disabled || i.readonly || (ee(), J.value = !0);
		}, Q = () => {
			J.value && (J.value = !1, K.value?.focus());
		}, te = () => {
			J.value ? Q() : Z();
		}, ne = (e) => {
			let t = X.value + e, n = Y.value;
			t < 1 ? (t = 12, --n) : t > 12 && (t = 1, n += 1), Y.value = n, X.value = t;
		}, $ = r(() => N(i.min)), re = r(() => N(i.max)), ie = (e, t) => e.y === t.y ? e.m === t.m ? e.d === t.d ? 0 : e.d < t.d ? -1 : 1 : e.m < t.m ? -1 : 1 : e.y < t.y ? -1 : 1, ae = (e, t, n) => {
			let r = {
				y: e,
				m: t,
				d: n
			};
			return !($.value.year !== null && ie(r, {
				y: $.value.year,
				m: $.value.month,
				d: $.value.day
			}) < 0 || re.value.year !== null && ie(r, {
				y: re.value.year,
				m: re.value.month,
				d: re.value.day
			}) > 0);
		}, oe = /* @__PURE__ */ new Date(), se = F(oe.getFullYear(), oe.getMonth() + 1, oe.getDate()), ce = r(() => {
			let e = Y.value, t = X.value, n = new Date(e, t - 1, 1).getDay(), r = new Date(e, t, 0).getDate(), a = [], o = new Date(e, t - 1, 1 - n);
			for (let e = 0; e < 42; e++) {
				let n = o.getFullYear(), s = o.getMonth() + 1, c = o.getDate(), l = s === t, u = F(n, s, c), d = !!u && u === i.modelValue;
				if (a.push({
					year: n,
					month: s,
					day: c,
					inMonth: l,
					disabled: !l || !ae(n, s, c),
					selected: d,
					isToday: !!u && u === se,
					iso: u
				}), o.setDate(o.getDate() + 1), e >= 27 && a[a.length - 1].day === r && a[a.length - 1].inMonth) {
					let e = 7 - a.length % 7;
					if (e !== 7) for (let t = 0; t < e; t++) {
						let e = o.getFullYear(), t = o.getMonth() + 1, n = o.getDate();
						a.push({
							year: e,
							month: t,
							day: n,
							inMonth: !1,
							disabled: !0,
							selected: !1,
							isToday: !1,
							iso: F(e, t, n)
						}), o.setDate(o.getDate() + 1);
					}
					break;
				}
			}
			let s = [];
			for (let e = 0; e < a.length; e += 7) s.push(a.slice(e, e + 7));
			return s;
		}), le = (e) => {
			if (!e.disabled) {
				if (e.iso === i.modelValue) {
					Q();
					return;
				}
				u("update:modelValue", e.iso), u("change", e.iso), Q();
			}
		}, ue = r(() => {
			if ($.value.year === null) return !0;
			let e = X.value === 1 ? Y.value - 1 : Y.value, t = X.value === 1 ? 12 : X.value - 1;
			return ae(e, t, new Date(e, t, 0).getDate());
		}), de = r(() => re.value.year === null ? !0 : ae(X.value === 12 ? Y.value + 1 : Y.value, X.value === 12 ? 1 : X.value + 1, 1)), fe = r(() => {
			let e = new Date(Y.value, X.value - 1, 1);
			return new Intl.DateTimeFormat("ja-JP", {
				year: "numeric",
				month: "long"
			}).format(e);
		}), pe = [
			"日",
			"月",
			"火",
			"水",
			"木",
			"金",
			"土"
		], me = (e) => {
			e.key === "Escape" && (e.preventDefault(), Q());
		}, he = (e) => {
			if (!J.value) return;
			let t = e.target;
			t && q.value?.contains(t) || t && K.value?.contains(t) || (J.value = !1);
		};
		g(() => {
			document.addEventListener("pointerdown", he, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", he, !0);
		}), k(() => i.disabled, (e) => {
			e && (J.value = !1);
		});
		let ge = (e) => u("focus", e), _e = (e) => u("blur", e), ve = r(() => [
			"dads-date-picker",
			`dads-date-picker--${i.size}`,
			`dads-date-picker--variant-${i.variant}`,
			`dads-date-picker--locale-${i.locale}`,
			{
				"dads-date-picker--disabled": i.disabled,
				"dads-date-picker--readonly": i.readonly,
				"dads-date-picker--error": D.value,
				"dads-date-picker--open": J.value
			}
		]), ye = r(() => {
			if (i.locale !== "japanese") return "";
			let e = Number(I.value);
			if (!Number.isFinite(e) || e === 0) return "";
			let t = l(e);
			return t ? `${t.era}${t.year}年` : "";
		});
		return (n, r) => (_(), o("div", { class: p(ve.value) }, [
			t.label ? (_(), o("label", {
				key: 0,
				for: m.value,
				class: "dads-date-picker__label-text"
			}, [c(C(t.label) + " ", 1), t.required ? (_(), o("span", Wr, C(t.requiredLabel), 1)) : a("", !0)], 8, Ur)) : a("", !0),
			s("div", {
				class: "dads-date-picker__controls",
				"data-size": t.size
			}, [
				s("div", {
					class: "dads-date-picker__inputs",
					"data-error": D.value || void 0,
					"data-disabled": t.disabled || void 0,
					"data-readonly": t.readonly || void 0
				}, [
					s("label", qr, [
						s("span", Jr, C(t.yearLabel), 1),
						s("input", {
							id: m.value,
							ref_key: "yearInputRef",
							ref: U,
							class: "dads-date-picker__input",
							type: "text",
							inputmode: "numeric",
							pattern: "[0-9]+",
							autocomplete: "off",
							name: t.name ? `${t.name}-year` : void 0,
							value: I.value,
							placeholder: t.placeholder,
							disabled: t.disabled || void 0,
							readonly: t.readonly || void 0,
							"aria-invalid": D.value || void 0,
							"aria-required": t.required || void 0,
							"aria-describedby": A.value,
							"data-js-year-input": "",
							onInput: B,
							onFocus: ge,
							onBlur: _e
						}, null, 40, Yr),
						ye.value ? (_(), o("span", Xr, C(ye.value), 1)) : a("", !0)
					]),
					s("label", Zr, [s("span", Qr, C(t.monthLabel), 1), s("input", {
						id: b.value,
						ref_key: "monthInputRef",
						ref: W,
						class: "dads-date-picker__input",
						type: "text",
						inputmode: "numeric",
						pattern: "[0-9]+",
						autocomplete: "off",
						name: t.name ? `${t.name}-month` : void 0,
						value: L.value,
						disabled: t.disabled || void 0,
						readonly: t.readonly || void 0,
						"aria-invalid": D.value || void 0,
						"aria-describedby": A.value,
						"data-js-month-input": "",
						onInput: V,
						onFocus: ge,
						onBlur: _e
					}, null, 40, $r)]),
					s("label", ei, [s("span", ti, C(t.dayLabel), 1), s("input", {
						id: x.value,
						ref_key: "dayInputRef",
						ref: G,
						class: "dads-date-picker__input",
						type: "text",
						inputmode: "numeric",
						pattern: "[0-9]+",
						autocomplete: "off",
						name: t.name ? `${t.name}-day` : void 0,
						value: R.value,
						disabled: t.disabled || void 0,
						readonly: t.readonly || void 0,
						"aria-invalid": D.value || void 0,
						"aria-describedby": A.value,
						"data-js-day-input": "",
						onInput: H,
						onFocus: ge,
						onBlur: _e
					}, null, 40, ni)])
				], 8, Kr),
				s("button", {
					ref_key: "calendarButtonRef",
					ref: K,
					type: "button",
					class: "dads-date-picker__calendar-button",
					"aria-expanded": J.value,
					"aria-controls": S.value,
					"aria-haspopup": "dialog",
					"aria-label": t.openCalendarAriaLabel,
					disabled: t.disabled || t.readonly || void 0,
					"data-js-calendar-button": "",
					onClick: te
				}, [...r[2] ||= [s("i", {
					class: "mdi mdi-calendar dads-date-picker__calendar-icon",
					"aria-hidden": "true"
				}, null, -1), s("i", {
					class: "mdi mdi-chevron-down dads-date-picker__calendar-chevron",
					"aria-hidden": "true"
				}, null, -1)]], 8, ri),
				j(s("div", {
					id: S.value,
					ref_key: "popoverRef",
					ref: q,
					class: "dads-date-picker__calendar-popover",
					role: "dialog",
					"aria-label": fe.value,
					onKeydown: me
				}, [s("div", ai, [
					s("button", {
						type: "button",
						class: "dads-date-picker__nav-button",
						disabled: !ue.value || void 0,
						"aria-label": t.prevMonthAriaLabel,
						onClick: r[0] ||= (e) => ne(-1)
					}, [...r[3] ||= [s("i", {
						class: "mdi mdi-chevron-left",
						"aria-hidden": "true"
					}, null, -1)]], 8, oi),
					s("span", si, C(fe.value), 1),
					s("button", {
						type: "button",
						class: "dads-date-picker__nav-button",
						disabled: !de.value || void 0,
						"aria-label": t.nextMonthAriaLabel,
						onClick: r[1] ||= (e) => ne(1)
					}, [...r[4] ||= [s("i", {
						class: "mdi mdi-chevron-right",
						"aria-hidden": "true"
					}, null, -1)]], 8, ci)
				]), s("table", {
					class: "dads-date-picker__calendar-table",
					role: "grid",
					"aria-label": fe.value
				}, [s("thead", null, [s("tr", null, [(_(), o(e, null, y(pe, (e) => s("th", {
					key: e,
					scope: "col",
					class: "dads-date-picker__weekday"
				}, C(e), 1)), 64))])]), s("tbody", null, [(_(!0), o(e, null, y(ce.value, (t, n) => (_(), o("tr", { key: n }, [(_(!0), o(e, null, y(t, (e) => (_(), o("td", {
					key: `${e.year}-${e.month}-${e.day}`,
					class: "dads-date-picker__date-cell"
				}, [e.inMonth ? (_(), o("button", {
					key: 0,
					type: "button",
					class: "dads-date-picker__date",
					"data-selected": e.selected || void 0,
					"data-today": e.isToday || void 0,
					disabled: e.disabled || void 0,
					"aria-selected": e.selected || void 0,
					onClick: (t) => le(e)
				}, C(e.day), 9, ui)) : (_(), o("span", di))]))), 128))]))), 128))])], 8, li)], 40, ii), [[O, J.value]])
			], 8, Gr),
			M.value ? (_(), o("div", fi, [D.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: T.value,
				class: "dads-date-picker__error-text",
				role: "alert"
			}, C(t.errorMessage), 9, pi)) : t.hint ? (_(), o("span", {
				key: 1,
				id: w.value,
				class: "dads-date-picker__hint"
			}, C(t.hint), 9, mi)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-f5021a0b"]]), gi = ["for"], _i = {
	key: 0,
	class: "dads-search-box__required",
	"aria-hidden": "true"
}, vi = { class: "dads-search-box__row" }, yi = [
	"value",
	"disabled",
	"aria-label"
], bi = {
	value: "",
	disabled: "",
	hidden: ""
}, xi = ["value"], Si = { class: "dads-search-box__fields" }, Ci = { class: "dads-search-box__input" }, wi = {
	key: 0,
	class: "dads-u-visually-hidden"
}, Ti = [
	"id",
	"name",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-required",
	"aria-describedby"
], Ei = ["aria-label"], Di = {
	key: 0,
	class: "dads-search-box__suggestions",
	role: "listbox"
}, Oi = ["onMousedown"], ki = {
	key: 1,
	class: "dads-search-box__footer"
}, Ai = ["id"], ji = ["id"], Mi = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsSearchBox",
	props: {
		modelValue: { default: "" },
		placeholder: {},
		label: {},
		hint: {},
		errorMessage: {},
		required: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		error: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		name: {},
		id: {},
		buttonLabel: { default: "検索" },
		clearable: {
			type: Boolean,
			default: !1
		},
		clearLabel: { default: "クリア" },
		suggestions: {},
		categories: {},
		category: { default: "" },
		categoryPlaceholder: { default: "カテゴリ" },
		requiredLabel: { default: "必須" }
	},
	emits: [
		"update:modelValue",
		"search",
		"focus",
		"blur",
		"update:category",
		"select:suggestion"
	],
	setup(t, { emit: n }) {
		let i = t, u = n, d = v(null), f = r(() => Array.isArray(i.suggestions) && i.suggestions.length > 0), m = r(() => Array.isArray(i.categories) && i.categories.length > 0), h = r(() => i.clearable && !!i.modelValue && !i.disabled && !i.readonly), g = (e) => {
			let t = e.target.value;
			u("update:category", t);
		}, b = (e) => {
			u("update:modelValue", e), u("select:suggestion", e), u("search", e);
		}, x = () => {
			u("update:modelValue", ""), d.value?.focus();
		}, S = E(), w = r(() => i.id ?? `dads-search-box-${S}`), T = r(() => `${w.value}-hint`), D = r(() => `${w.value}-error`), O = r(() => i.error || !!i.errorMessage), k = r(() => {
			if (O.value && i.errorMessage) return D.value;
			if (i.hint) return T.value;
		}), j = r(() => [
			"dads-search-box",
			`dads-search-box--${i.size}`,
			{
				"dads-search-box--disabled": i.disabled,
				"dads-search-box--readonly": i.readonly,
				"dads-search-box--error": O.value
			}
		]), M = r(() => i.size), P = r(() => O.value && !!i.errorMessage || !!i.hint), F = (e) => {
			let t = e.target;
			u("update:modelValue", t.value);
		}, I = (e) => {
			e.key !== "Enter" || e.isComposing || i.disabled || (e.preventDefault(), u("search", i.modelValue ?? ""));
		}, L = () => {
			i.disabled || u("search", i.modelValue ?? "");
		}, z = (e) => u("focus", e), B = (e) => u("blur", e);
		return (n, r) => (_(), o("div", { class: p(j.value) }, [
			t.label ? (_(), o("label", {
				key: 0,
				for: w.value,
				class: "dads-search-box__label"
			}, [c(C(t.label) + " ", 1), t.required ? (_(), o("span", _i, C(t.requiredLabel), 1)) : a("", !0)], 8, gi)) : a("", !0),
			s("div", vi, [
				m.value ? (_(), o("select", {
					key: 0,
					class: "dads-search-box__category",
					value: t.category,
					disabled: t.disabled || void 0,
					"aria-label": t.categoryPlaceholder,
					onChange: g
				}, [s("option", bi, C(t.categoryPlaceholder), 1), (_(!0), o(e, null, y(t.categories, (e) => (_(), o("option", {
					key: e,
					value: e
				}, C(e), 9, xi))), 128))], 40, yi)) : a("", !0),
				s("div", Si, [s("label", Ci, [
					r[0] ||= s("svg", {
						class: "dads-search-box__icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						"aria-hidden": "true"
					}, [s("path", {
						d: "m21 20.5-6-6a7.4 7.4 0 0 0 1.9-5A7.4 7.4 0 0 0 9.5 2 7.5 7.5 0 1 0 14 15.5l6 6 1-1ZM3.5 9.5a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6Z",
						fill: "currentcolor"
					})], -1),
					t.label ? a("", !0) : (_(), o("span", wi, C(t.buttonLabel), 1)),
					s("input", {
						id: w.value,
						ref_key: "inputRef",
						ref: d,
						type: "search",
						class: "dads-search-box__field",
						name: t.name,
						value: t.modelValue,
						placeholder: t.placeholder,
						disabled: t.disabled || void 0,
						readonly: t.readonly || void 0,
						"aria-invalid": O.value || void 0,
						"aria-required": t.required || void 0,
						"aria-describedby": k.value,
						onInput: F,
						onKeydown: I,
						onFocus: z,
						onBlur: B
					}, null, 40, Ti),
					h.value ? (_(), o("button", {
						key: 1,
						type: "button",
						class: "dads-search-box__clear",
						"aria-label": t.clearLabel,
						onClick: x
					}, " × ", 8, Ei)) : a("", !0)
				]), f.value ? (_(), o("ul", Di, [(_(!0), o(e, null, y(t.suggestions, (e, t) => (_(), o("li", {
					key: t,
					class: "dads-search-box__suggestion",
					role: "option",
					tabindex: "-1",
					onMousedown: N((t) => b(e), ["prevent"])
				}, C(e), 41, Oi))), 128))])) : a("", !0)]),
				l(R, {
					type: "submit",
					variant: "solid-fill",
					size: M.value,
					disabled: t.disabled,
					onClick: L
				}, {
					default: A(() => [c(C(t.buttonLabel), 1)]),
					_: 1
				}, 8, ["size", "disabled"])
			]),
			P.value ? (_(), o("div", ki, [O.value && t.errorMessage ? (_(), o("span", {
				key: 0,
				id: D.value,
				class: "dads-search-box__error",
				role: "alert"
			}, C(t.errorMessage), 9, Ai)) : t.hint ? (_(), o("span", {
				key: 1,
				id: T.value,
				class: "dads-search-box__hint"
			}, C(t.hint), 9, ji)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-56839662"]]), Ni = ["open", "aria-disabled"], Pi = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-disabled",
	"tabindex"
], Fi = { class: "dads-disclosure__title" }, Ii = ["id", "aria-labelledby"], Li = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDisclosure",
	props: {
		modelValue: {
			type: Boolean,
			default: void 0
		},
		title: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		defaultOpen: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "toggle"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = E(), c = r(() => `dads-disclosure-${a}`), l = r(() => `${c.value}-summary`), u = r(() => `${c.value}-content`), d = r(() => n.modelValue !== void 0), f = v(n.defaultOpen), m = r(() => d.value ? !!n.modelValue : f.value), h = v(null);
		k(m, (e) => {
			h.value && h.value.open !== e && (h.value.open = e);
		});
		let g = (e) => {
			d.value || (f.value = e), i("update:modelValue", e), i("toggle", e);
		}, y = (e) => {
			e.preventDefault(), !n.disabled && g(!m.value);
		}, x = (e) => {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), !n.disabled && g(!m.value));
		}, S = r(() => ["dads-disclosure", {
			"dads-disclosure--open": m.value,
			"dads-disclosure--disabled": n.disabled
		}]);
		return (t, n) => (_(), o("details", {
			ref_key: "detailsRef",
			ref: h,
			class: p(S.value),
			open: m.value,
			"aria-disabled": e.disabled || void 0
		}, [s("summary", {
			id: l.value,
			class: "dads-disclosure__summary",
			"aria-expanded": m.value,
			"aria-controls": u.value,
			"aria-disabled": e.disabled || void 0,
			tabindex: e.disabled ? -1 : 0,
			onClick: y,
			onKeydown: x
		}, [n[0] ||= s("svg", {
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
		], -1), s("span", Fi, C(e.title), 1)], 40, Pi), s("div", {
			id: u.value,
			class: "dads-disclosure__content",
			role: "region",
			"aria-labelledby": l.value
		}, [b(t.$slots, "default", {}, void 0, !0)], 8, Ii)], 10, Ni));
	}
}), [["__scopeId", "data-v-aac80566"]]), Ri = ["data-marker"], zi = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsDescriptionList",
	props: {
		items: {},
		layout: { default: "horizontal" },
		marker: { default: "none" },
		bordered: {
			type: Boolean,
			default: !1
		}
	},
	setup(t) {
		let n = t, i = r(() => n.marker === "none" ? void 0 : n.marker), a = r(() => [
			"dads-description-list",
			`dads-description-list--${n.layout}`,
			{ "dads-description-list--bordered": n.bordered }
		]);
		return (n, r) => (_(), o("dl", {
			class: p(a.value),
			"data-marker": i.value
		}, [t.items && t.items.length > 0 ? (_(!0), o(e, { key: 0 }, y(t.items, (e, t) => (_(), o("div", {
			key: t,
			class: "dads-description-list__item"
		}, [s("dt", null, C(e.term), 1), s("dd", null, C(e.description), 1)]))), 128)) : b(n.$slots, "default", { key: 1 }, void 0, !0)], 10, Ri));
	}
}), [["__scopeId", "data-v-97d39272"]]), Bi = { class: "dads-language-selector__box" }, Vi = [
	"id",
	"aria-label",
	"aria-controls",
	"aria-expanded",
	"disabled"
], Hi = { class: "dads-language-selector__opener-text" }, Ui = ["id"], Wi = ["aria-labelledby"], Gi = [
	"id",
	"href",
	"lang",
	"hreflang",
	"aria-current",
	"onClick"
], Ki = { class: "dads-language-selector__label" }, qi = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsLanguageSelector",
	props: {
		modelValue: {},
		options: { default: () => [] },
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		colorScheme: { default: "light-blue" },
		cornerShape: { default: "rounded" },
		ariaLabel: { default: "言語を選択" },
		openerLabel: { default: "Language" }
	},
	emits: [
		"update:modelValue",
		"change",
		"open",
		"close"
	],
	setup(t, { emit: n }) {
		let i = t, a = n, c = E(), l = r(() => `dads-language-selector-opener-${c}`), u = r(() => `dads-language-selector-popup-${c}`), d = (e) => `${l.value}-item-${e}`, m = v(null), b = v(null), x = v(null), S = v([]), w = v(!1), T = (e) => i.modelValue !== void 0 && i.modelValue === e.value, D = r(() => [
			"dads-language-selector",
			`dads-language-selector--${i.size}`,
			`dads-language-selector--${i.colorScheme}`,
			`dads-language-selector--corner-${i.cornerShape}`,
			{
				"dads-language-selector--disabled": i.disabled,
				"dads-language-selector--open": w.value
			}
		]), A = () => {
			i.disabled || w.value || (w.value = !0, a("open"));
		}, M = (e = !1) => {
			w.value && (w.value = !1, a("close"), e && b.value?.focus());
		}, N = () => {
			w.value ? M() : A();
		}, P = (e, t) => {
			!e.href && t && t.preventDefault(), a("update:modelValue", e.value), a("change", e.value), M(!0);
		}, F = (e) => {
			S.value[e]?.focus();
		}, I = () => F(0), L = () => F(i.options.length - 1), R = () => {
			let e = document.activeElement;
			return S.value.findIndex((t) => t === e);
		}, z = () => {
			let e = R();
			e < 0 || e >= i.options.length - 1 ? I() : F(e + 1);
		}, B = () => {
			let e = R();
			e <= 0 ? L() : F(e - 1);
		}, V = (e) => {
			e.preventDefault(), N();
		}, H = (e) => {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), w.value ? I() : (A(), f(I));
					break;
				case "ArrowUp":
					e.preventDefault(), w.value ? L() : (A(), f(L));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), N();
					break;
			}
		}, U = (e) => {
			if (w.value) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), z();
					break;
				case "ArrowUp":
					e.preventDefault(), B();
					break;
				case "Home":
					e.preventDefault(), I();
					break;
				case "End":
					e.preventDefault(), L();
					break;
				case "Escape":
					e.preventDefault(), M(!0);
					break;
				case "Tab":
					M();
					break;
			}
		}, W = (e) => {
			if (!w.value) return;
			let t = e.target;
			t && m.value && m.value.contains(t) || M();
		};
		g(() => {
			document.addEventListener("pointerdown", W, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", W, !0);
		}), k(() => i.disabled, (e) => {
			e && M();
		});
		let G = (e) => (t) => {
			S.value[e] = t ?? null;
		};
		return (n, r) => (_(), o("div", {
			ref_key: "rootRef",
			ref: m,
			class: p(D.value)
		}, [s("div", Bi, [s("button", {
			id: l.value,
			ref_key: "openerRef",
			ref: b,
			type: "button",
			class: "dads-language-selector__opener",
			"aria-label": t.ariaLabel,
			"aria-controls": u.value,
			"aria-expanded": w.value,
			"aria-haspopup": "menu",
			disabled: t.disabled || void 0,
			onClick: V,
			onKeydown: H
		}, [
			r[1] ||= s("svg", {
				class: "dads-language-selector__opener-icon",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				fill: "currentcolor",
				"aria-hidden": "true"
			}, [s("path", { d: "M12 21.5A9.5 9.5 0 0 1 2.5 12c0-5.2 4.3-9.5 9.5-9.5s9.6 4.3 9.5 9.5c0 5.2-4.3 9.5-9.5 9.5Zm0-1.5c1-1.3 1.7-2.8 2.1-4.3H10c.4 1.5 1 3 2.1 4.3Zm-2-.3c-.8-1.2-1.4-2.6-1.7-4H5c1 2 3 3.5 5.2 4Zm4 0c2.2-.5 4-2 5-4h-3.3c-.4 1.4-1 2.8-1.8 4Zm-9.7-5.5H8a13 13 0 0 1 0-4.4H4.3a8 8 0 0 0 0 4.4Zm5.2 0h5c.2-1.5.2-3 0-4.4h-5c-.2 1.5-.2 3 0 4.4Zm6.5 0h3.7a8 8 0 0 0 0-4.4H16c.2 1.5.2 3 0 4.4Zm-.3-5.9H19c-1-2-3-3.5-5.2-4 .8 1.2 1.4 2.6 1.8 4Zm-5.8 0H14A12 12 0 0 0 12 4a12 12 0 0 0-2.1 4.3Zm-5 0h3.4c.4-1.4 1-2.8 1.8-4-2.3.5-4.1 2-5.2 4Z" })], -1),
			s("span", Hi, C(t.openerLabel), 1),
			(_(), o("svg", {
				class: p(["dads-language-selector__opener-arrow", { "dads-language-selector__opener-arrow--open": w.value }]),
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "currentcolor",
				"aria-hidden": "true"
			}, [...r[0] ||= [s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)]], 2))
		], 40, Vi), j(s("div", {
			id: u.value,
			class: "dads-language-selector__popup"
		}, [s("ul", {
			ref_key: "menuRef",
			ref: x,
			class: "dads-language-selector__menu",
			role: "menu",
			"aria-labelledby": l.value,
			onKeydown: U
		}, [(_(!0), o(e, null, y(t.options, (e, t) => (_(), o("li", {
			key: e.value,
			role: "none",
			class: "dads-language-selector__item-wrap"
		}, [s("a", {
			id: d(t),
			ref_for: !0,
			ref: G(t),
			role: "menuitem",
			class: p(["dads-language-selector__item", { "dads-language-selector__item--current": T(e) }]),
			href: e.href ?? "#",
			lang: e.value,
			hreflang: e.value,
			"aria-current": T(e) ? "true" : void 0,
			tabindex: "-1",
			onClick: (t) => P(e, t)
		}, [r[2] ||= s("svg", {
			class: "dads-language-selector__check",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentcolor",
			"aria-hidden": "true"
		}, [s("path", { d: "m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z" })], -1), s("span", Ki, C(e.label), 1)], 10, Gi)]))), 128))], 40, Wi)], 8, Ui), [[O, w.value]])])], 2));
	}
}), [["__scopeId", "data-v-b0342960"]]), Ji = {
	key: 0,
	class: "dads-menu-list__section",
	role: "presentation"
}, Yi = { class: "dads-menu-list__section-title" }, Xi = {
	key: 1,
	class: "dads-menu-list__divider"
}, Zi = [
	"href",
	"aria-current",
	"onClick"
], Qi = { class: "dads-menu-list__label" }, $i = [
	"role",
	"aria-label",
	"aria-hidden"
], ea = [
	"disabled",
	"aria-current",
	"aria-expanded",
	"onClick"
], ta = { class: "dads-menu-list__label" }, na = [
	"role",
	"aria-label",
	"aria-hidden"
], ra = {
	key: 0,
	class: "dads-menu-list__section",
	role: "presentation"
}, ia = { class: "dads-menu-list__section-title" }, aa = {
	key: 1,
	class: "dads-menu-list__divider"
}, oa = [
	"href",
	"aria-current",
	"onClick"
], sa = { class: "dads-menu-list__label" }, ca = [
	"role",
	"aria-label",
	"aria-hidden"
], la = [
	"disabled",
	"aria-current",
	"aria-expanded",
	"onClick"
], ua = { class: "dads-menu-list__label" }, da = [
	"role",
	"aria-label",
	"aria-hidden"
], fa = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsMenuList",
	props: {
		items: {},
		type: { default: "standard" },
		size: { default: "regular" },
		indentation: { default: 0 },
		ariaLabel: { default: void 0 }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let l = t, u = n, f = r(() => l.indentation + 1), h = r(() => l.indentation > 0 ? { "--menu-list-indentation": String(l.indentation) } : void 0), g = (e) => !!e.href && !e.disabled, v = (e) => ({
			class: "dads-menu-list__item",
			"data-type": l.type,
			"data-size": l.size,
			...e.active ? { "data-current": "" } : {},
			...e.expanded ? { "data-expanded": "" } : {}
		}), b = (e, t) => {
			if (e.disabled) {
				t.preventDefault();
				return;
			}
			u("click:item", e, t);
		}, w = (e, t) => {
			u("click:item", e, t);
		};
		return (n, r) => {
			let l = x("DadsMenuList", !0);
			return t.ariaLabel ? (_(), i(S(t.ariaLabel ? "nav" : "ul"), {
				key: 0,
				class: "dads-menu-list-root",
				"aria-label": t.ariaLabel
			}, {
				default: A(() => [s("ul", {
					class: "dads-menu-list",
					style: m(h.value)
				}, [(_(!0), o(e, null, y(t.items, (n, r) => (_(), o("li", { key: r }, [n.divider ? (_(), o(e, { key: 0 }, [typeof n.divider == "object" && n.divider.title ? (_(), o("div", Ji, [s("span", Yi, C(n.divider.title), 1)])) : (_(), o("hr", Xi))], 64)) : g(n) ? (_(), o("a", d({
					key: 1,
					ref_for: !0
				}, v(n), {
					href: n.href,
					"aria-current": n.active ? "page" : void 0,
					onClick: (e) => b(n, e)
				}), [
					n.frontIcon ? (_(), o("i", {
						key: 0,
						class: p([
							"mdi",
							n.frontIcon,
							"dads-menu-list__front-icon"
						]),
						"aria-hidden": "true"
					}, null, 2)) : a("", !0),
					s("span", Qi, [c(C(n.label) + " ", 1), n.tailIcon ? (_(), o("i", {
						key: 0,
						class: p([
							"mdi",
							n.tailIcon,
							"dads-menu-list__tail-icon"
						]),
						role: n.tailIconLabel ? "img" : void 0,
						"aria-label": n.tailIconLabel || void 0,
						"aria-hidden": n.tailIconLabel ? void 0 : "true"
					}, null, 10, $i)) : a("", !0)]),
					n.endIcon ? (_(), o("i", {
						key: 1,
						class: p([
							"mdi",
							n.endIcon,
							"dads-menu-list__end-icon"
						]),
						"aria-hidden": "true"
					}, null, 2)) : a("", !0)
				], 16, Zi)) : (_(), o("button", d({
					key: 2,
					type: "button"
				}, { ref_for: !0 }, v(n), {
					disabled: n.disabled || void 0,
					"aria-current": n.active ? "page" : void 0,
					"aria-expanded": n.children && n.children.length > 0 ? !!n.expanded : void 0,
					onClick: (e) => b(n, e)
				}), [
					n.frontIcon ? (_(), o("i", {
						key: 0,
						class: p([
							"mdi",
							n.frontIcon,
							"dads-menu-list__front-icon"
						]),
						"aria-hidden": "true"
					}, null, 2)) : a("", !0),
					s("span", ta, [c(C(n.label) + " ", 1), n.tailIcon ? (_(), o("i", {
						key: 0,
						class: p([
							"mdi",
							n.tailIcon,
							"dads-menu-list__tail-icon"
						]),
						role: n.tailIconLabel ? "img" : void 0,
						"aria-label": n.tailIconLabel || void 0,
						"aria-hidden": n.tailIconLabel ? void 0 : "true"
					}, null, 10, na)) : a("", !0)]),
					n.endIcon ? (_(), o("i", {
						key: 1,
						class: p([
							"mdi",
							n.endIcon,
							"dads-menu-list__end-icon"
						]),
						"aria-hidden": "true"
					}, null, 2)) : a("", !0)
				], 16, ea)), n.children && n.children.length > 0 ? (_(), i(l, {
					key: 3,
					items: n.children,
					type: t.type,
					size: t.size,
					indentation: f.value,
					"onClick:item": w
				}, null, 8, [
					"items",
					"type",
					"size",
					"indentation"
				])) : a("", !0)]))), 128))], 4)]),
				_: 1
			}, 8, ["aria-label"])) : (_(), o("ul", {
				key: 1,
				class: "dads-menu-list",
				style: m(h.value)
			}, [(_(!0), o(e, null, y(t.items, (n, r) => (_(), o("li", { key: r }, [n.divider ? (_(), o(e, { key: 0 }, [typeof n.divider == "object" && n.divider.title ? (_(), o("div", ra, [s("span", ia, C(n.divider.title), 1)])) : (_(), o("hr", aa))], 64)) : g(n) ? (_(), o("a", d({
				key: 1,
				ref_for: !0
			}, v(n), {
				href: n.href,
				"aria-current": n.active ? "page" : void 0,
				onClick: (e) => b(n, e)
			}), [
				n.frontIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						n.frontIcon,
						"dads-menu-list__front-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("span", sa, [c(C(n.label) + " ", 1), n.tailIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						n.tailIcon,
						"dads-menu-list__tail-icon"
					]),
					role: n.tailIconLabel ? "img" : void 0,
					"aria-label": n.tailIconLabel || void 0,
					"aria-hidden": n.tailIconLabel ? void 0 : "true"
				}, null, 10, ca)) : a("", !0)]),
				n.endIcon ? (_(), o("i", {
					key: 1,
					class: p([
						"mdi",
						n.endIcon,
						"dads-menu-list__end-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0)
			], 16, oa)) : (_(), o("button", d({
				key: 2,
				type: "button"
			}, { ref_for: !0 }, v(n), {
				disabled: n.disabled || void 0,
				"aria-current": n.active ? "page" : void 0,
				"aria-expanded": n.children && n.children.length > 0 ? !!n.expanded : void 0,
				onClick: (e) => b(n, e)
			}), [
				n.frontIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						n.frontIcon,
						"dads-menu-list__front-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("span", ua, [c(C(n.label) + " ", 1), n.tailIcon ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						n.tailIcon,
						"dads-menu-list__tail-icon"
					]),
					role: n.tailIconLabel ? "img" : void 0,
					"aria-label": n.tailIconLabel || void 0,
					"aria-hidden": n.tailIconLabel ? void 0 : "true"
				}, null, 10, da)) : a("", !0)]),
				n.endIcon ? (_(), o("i", {
					key: 1,
					class: p([
						"mdi",
						n.endIcon,
						"dads-menu-list__end-icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0)
			], 16, la)), n.children && n.children.length > 0 ? (_(), i(l, {
				key: 3,
				items: n.children,
				type: t.type,
				size: t.size,
				indentation: f.value,
				"onClick:item": w
			}, null, 8, [
				"items",
				"type",
				"size",
				"indentation"
			])) : a("", !0)]))), 128))], 4));
		};
	}
}), [["__scopeId", "data-v-4e5534be"]]), pa = ["aria-expanded", "aria-controls"], ma = { class: "dads-menu-list-box__trigger-label" }, ha = ["id"], ga = ["aria-label"], _a = [
	"href",
	"aria-current",
	"aria-disabled",
	"data-current",
	"onClick"
], va = { class: "dads-menu-list-box__item-body" }, ya = { class: "dads-menu-list-box__item-label" }, ba = {
	key: 0,
	class: "dads-menu-list-box__item-description"
}, xa = [
	"disabled",
	"aria-current",
	"aria-disabled",
	"data-current",
	"onClick"
], Sa = { class: "dads-menu-list-box__item-body" }, Ca = { class: "dads-menu-list-box__item-label" }, wa = {
	key: 0,
	class: "dads-menu-list-box__item-description"
}, Ta = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsMenuListBox",
	props: {
		items: {},
		ariaLabel: {},
		modelValue: {
			type: Boolean,
			default: !1
		},
		triggerLabel: {},
		triggerIcon: {},
		triggerSize: { default: "md" },
		placement: { default: "start" }
	},
	emits: [
		"click:item",
		"update:modelValue",
		"open",
		"close"
	],
	setup(t, { emit: n }) {
		let i = t, c = n, l = r(() => !!i.triggerLabel), u = r(() => l.value ? i.modelValue : !0), d = E();
		k(() => i.modelValue, (e, t) => {
			l.value && e !== t && c(e ? "open" : "close");
		});
		let f = () => {
			l.value && c("update:modelValue", !i.modelValue);
		}, m = r(() => i.items.map((e, t) => ({
			item: e,
			index: t,
			isLink: !!e.href && !e.disabled
		}))), h = (e, t, n) => {
			if (e.disabled) {
				n.preventDefault();
				return;
			}
			c("click:item", e, t, n);
		}, g = r(() => ["dads-menu-list-box", {
			"dads-menu-list-box--with-opener": l.value,
			[`dads-menu-list-box--placement-${i.placement}`]: l.value
		}]), v = r(() => ["dads-menu-list-box__trigger", `dads-menu-list-box__trigger--${i.triggerSize}`]);
		return (n, r) => (_(), o("div", { class: p(g.value) }, [l.value ? (_(), o("button", {
			key: 0,
			type: "button",
			class: p(v.value),
			"aria-expanded": u.value ? "true" : "false",
			"aria-controls": w(d),
			onClick: f
		}, [
			t.triggerIcon ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					t.triggerIcon,
					"dads-menu-list-box__trigger-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0),
			s("span", ma, C(t.triggerLabel), 1),
			r[0] ||= s("i", {
				class: "mdi mdi-chevron-down dads-menu-list-box__trigger-caret",
				"aria-hidden": "true"
			}, null, -1)
		], 10, pa)) : a("", !0), j(s("div", {
			id: w(d),
			class: "dads-menu-list-box__surface"
		}, [s("ul", {
			class: "dads-menu-list-box__list",
			role: "menu",
			"aria-label": t.ariaLabel
		}, [(_(!0), o(e, null, y(m.value, (e) => (_(), o("li", {
			key: e.index,
			class: "dads-menu-list-box__list-item",
			role: "presentation"
		}, [e.isLink ? (_(), o("a", {
			key: 0,
			href: e.item.href,
			class: p(["dads-menu-list-box__item", {
				"dads-menu-list-box__item--active": e.item.active,
				"dads-menu-list-box__item--disabled": e.item.disabled
			}]),
			role: "menuitem",
			"aria-current": e.item.active ? "page" : void 0,
			"aria-disabled": e.item.disabled || void 0,
			"data-current": e.item.active ? "" : void 0,
			onClick: (t) => h(e.item, e.index, t)
		}, [e.item.iconName ? (_(), o("i", {
			key: 0,
			class: p([
				"mdi",
				e.item.iconName,
				"dads-menu-list-box__item-icon"
			]),
			"aria-hidden": "true"
		}, null, 2)) : a("", !0), s("span", va, [s("span", ya, C(e.item.label), 1), e.item.description ? (_(), o("span", ba, C(e.item.description), 1)) : a("", !0)])], 10, _a)) : (_(), o("button", {
			key: 1,
			type: "button",
			class: p(["dads-menu-list-box__item", {
				"dads-menu-list-box__item--active": e.item.active,
				"dads-menu-list-box__item--disabled": e.item.disabled
			}]),
			role: "menuitem",
			disabled: e.item.disabled,
			"aria-current": e.item.active ? "page" : void 0,
			"aria-disabled": e.item.disabled || void 0,
			"data-current": e.item.active ? "" : void 0,
			onClick: (t) => h(e.item, e.index, t)
		}, [e.item.iconName ? (_(), o("i", {
			key: 0,
			class: p([
				"mdi",
				e.item.iconName,
				"dads-menu-list-box__item-icon"
			]),
			"aria-hidden": "true"
		}, null, 2)) : a("", !0), s("span", Sa, [s("span", Ca, C(e.item.label), 1), e.item.description ? (_(), o("span", wa, C(e.item.description), 1)) : a("", !0)])], 10, xa))]))), 128))], 8, ga)], 8, ha), [[O, u.value]])], 2));
	}
}), [["__scopeId", "data-v-b9bc5f92"]]), Ea = [
	"aria-expanded",
	"aria-controls",
	"aria-label",
	"disabled"
], Da = {
	key: 0,
	class: "dads-hamburger-menu-button__icon",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	"aria-hidden": "true"
}, Oa = {
	key: 1,
	class: "dads-hamburger-menu-button__icon",
	width: "24",
	height: "24",
	viewBox: "0 0 120 120",
	"aria-hidden": "true"
}, ka = {
	key: 2,
	class: "dads-hamburger-menu-button__label"
}, Aa = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsHamburgerMenuButton",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		ariaControls: {},
		openLabel: { default: "メニュー" },
		closeLabel: { default: "閉じる" },
		size: { default: "md" },
		variant: { default: "default" }
	},
	emits: ["update:modelValue", "click"],
	setup(e, { emit: t }) {
		let n = e, i = t, c = r(() => !!n.modelValue), l = r(() => [
			"dads-hamburger-menu-button",
			`dads-hamburger-menu-button--${n.size}`,
			`dads-hamburger-menu-button--variant-${n.variant}`,
			{ "dads-hamburger-menu-button--open": c.value }
		]), u = r(() => n.variant === "icon-only"), d = r(() => u.value ? f.value : void 0), f = r(() => c.value ? n.closeLabel : n.openLabel), m = (e) => {
			if (n.disabled) {
				e.preventDefault();
				return;
			}
			i("update:modelValue", !c.value), i("click", e);
		};
		return (t, n) => (_(), o("button", {
			type: "button",
			class: p(l.value),
			"aria-expanded": c.value,
			"aria-controls": e.ariaControls,
			"aria-label": d.value,
			disabled: e.disabled || void 0,
			onClick: m
		}, [c.value ? (_(), o("svg", Oa, [...n[1] ||= [s("path", {
			d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
			fill: "currentcolor"
		}, null, -1)]])) : (_(), o("svg", Da, [...n[0] ||= [s("path", {
			d: "M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z",
			fill: "currentcolor"
		}, null, -1)]])), u.value ? a("", !0) : (_(), o("span", ka, C(f.value), 1))], 10, Ea));
	}
}), [["__scopeId", "data-v-b3c58836"]]), ja = ["aria-label"], Ma = [
	"href",
	"target",
	"rel",
	"onClick"
], Na = { class: "dads-utility-link__label" }, Pa = ["aria-label"], Fa = [
	"href",
	"target",
	"rel"
], Ia = { class: "dads-utility-link__label" }, La = ["aria-label"], Ra = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
	setup(t, { emit: n }) {
		let i = t, c = n, l = r(() => i.items === void 0 ? i.href === void 0 || i.label === void 0 ? [] : [{
			label: i.label,
			href: i.href,
			iconName: i.iconName,
			external: i.external
		}] : i.items), u = r(() => i.items !== void 0), d = (e, t, n) => {
			c("click:item", e, t, n);
		};
		return (n, r) => u.value ? (_(), o("ul", {
			key: 0,
			class: "dads-utility-link-list",
			"aria-label": t.ariaLabel
		}, [(_(!0), o(e, null, y(l.value, (e, n) => (_(), o("li", {
			key: `${e.href}-${n}`,
			class: "dads-utility-link-list__item"
		}, [s("a", {
			class: "dads-utility-link",
			href: e.href,
			target: e.external ? "_blank" : void 0,
			rel: e.external ? "noopener noreferrer" : void 0,
			onClick: (t) => d(e, n, t)
		}, [
			e.iconName ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					e.iconName,
					"dads-utility-link__lead-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0),
			s("span", Na, C(e.label), 1),
			e.external ? (_(), o("svg", {
				key: 1,
				class: "dads-utility-link__tail-icon",
				width: "16",
				height: "16",
				viewBox: "0 0 48 48",
				fill: "currentcolor",
				role: "img",
				"aria-label": t.newTabAriaLabel
			}, [...r[1] ||= [s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)]], 8, Pa)) : a("", !0)
		], 8, Ma)]))), 128))], 8, ja)) : l.value.length === 1 ? (_(), o("a", {
			key: 1,
			class: "dads-utility-link",
			href: l.value[0].href,
			target: l.value[0].external ? "_blank" : void 0,
			rel: l.value[0].external ? "noopener noreferrer" : void 0,
			onClick: r[0] ||= (e) => d(l.value[0], 0, e)
		}, [
			l.value[0].iconName ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					l.value[0].iconName,
					"dads-utility-link__lead-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0),
			s("span", Ia, C(l.value[0].label), 1),
			l.value[0].external ? (_(), o("svg", {
				key: 1,
				class: "dads-utility-link__tail-icon",
				width: "16",
				height: "16",
				viewBox: "0 0 48 48",
				fill: "currentcolor",
				role: "img",
				"aria-label": t.newTabAriaLabel
			}, [...r[2] ||= [s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)]], 8, La)) : a("", !0)
		], 8, Fa)) : a("", !0);
	}
}), [["__scopeId", "data-v-2ed77fbc"]]), za = ["aria-label", "disabled"], Ba = { class: "dads-scroll-top-button__label" }, Va = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsScrollTopButton",
	props: {
		showOffset: { default: 200 },
		ariaLabel: { default: "ページの先頭へ戻る" },
		position: { default: "bottom-right" },
		disabled: {
			type: Boolean,
			default: !1
		},
		defaultLabel: { default: "トップへ" }
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = v(0), l = r(() => a.value > n.showOffset), u = r(() => ["dads-scroll-top-button", `dads-scroll-top-button--${n.position}`]), d = () => {
			typeof window > "u" || (a.value = window.scrollY);
		}, f = (e) => {
			if (n.disabled) {
				e.preventDefault();
				return;
			}
			typeof window < "u" && window.scrollTo({
				top: 0,
				behavior: "smooth"
			}), i("click", e);
		};
		return g(() => {
			typeof window > "u" || (a.value = window.scrollY, window.addEventListener("scroll", d, { passive: !0 }));
		}), h(() => {
			typeof window > "u" || window.removeEventListener("scroll", d);
		}), (t, n) => j((_(), o("button", {
			type: "button",
			class: p(u.value),
			"aria-label": e.ariaLabel,
			disabled: e.disabled,
			onClick: f
		}, [n[0] ||= s("span", {
			class: "dads-scroll-top-button__icon",
			"aria-hidden": "true"
		}, [s("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 20 20",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			focusable: "false"
		}, [s("path", {
			d: "M10 15V5M10 5L5 10M10 5L15 10",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		})])], -1), s("span", Ba, [b(t.$slots, "default", {}, () => [c(C(e.defaultLabel), 1)], !0)])], 10, za)), [[O, l.value]]);
	}
}), [["__scopeId", "data-v-849a898e"]]), Ha = ["aria-label"], Ua = { class: "dads-global-menu" }, Wa = [
	"href",
	"aria-current",
	"aria-disabled",
	"tabindex",
	"onClick"
], Ga = { class: "dads-global-menu__label" }, Ka = [
	"disabled",
	"aria-current",
	"aria-haspopup",
	"aria-expanded",
	"onClick"
], qa = { class: "dads-global-menu__label" }, Ja = {
	key: 1,
	class: /* @__PURE__ */ p([
		"mdi",
		"mdi-chevron-down",
		"dads-global-menu__chevron"
	]),
	"aria-hidden": "true"
}, Ya = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsGlobalMenu",
	props: {
		items: {},
		ariaLabel: { default: "グローバルメニュー" }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let r = n, i = (e) => Array.isArray(e.children) && e.children.length > 0, c = (e) => !!e.href && !i(e), l = (e, t) => {
			if (e.disabled) {
				t.preventDefault();
				return;
			}
			r("click:item", e, t);
		};
		return (n, r) => (_(), o("nav", {
			class: "dads-global-menu-root",
			"aria-label": t.ariaLabel
		}, [s("ul", Ua, [(_(!0), o(e, null, y(t.items, (e, t) => (_(), o("li", {
			key: t,
			class: "dads-global-menu__item"
		}, [c(e) ? (_(), o("a", {
			key: 0,
			class: "dads-global-menu__item-inner",
			href: e.disabled ? void 0 : e.href,
			"aria-current": e.active ? "page" : void 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			tabindex: e.disabled ? -1 : void 0,
			onClick: (t) => l(e, t)
		}, [e.frontIcon ? (_(), o("i", {
			key: 0,
			class: p([
				"mdi",
				e.frontIcon,
				"dads-global-menu__front-icon"
			]),
			"aria-hidden": "true"
		}, null, 2)) : a("", !0), s("span", Ga, C(e.label), 1)], 8, Wa)) : (_(), o("button", {
			key: 1,
			type: "button",
			class: "dads-global-menu__item-inner",
			disabled: e.disabled || void 0,
			"aria-current": e.active ? "page" : void 0,
			"aria-haspopup": i(e) ? "menu" : void 0,
			"aria-expanded": i(e) ? !!e.expanded : void 0,
			onClick: (t) => l(e, t)
		}, [
			e.frontIcon ? (_(), o("i", {
				key: 0,
				class: p([
					"mdi",
					e.frontIcon,
					"dads-global-menu__front-icon"
				]),
				"aria-hidden": "true"
			}, null, 2)) : a("", !0),
			s("span", qa, C(e.label), 1),
			i(e) ? (_(), o("i", Ja)) : a("", !0)
		], 8, Ka))]))), 128))])], 8, Ha));
	}
}), [["__scopeId", "data-v-923eeb2e"]]), Xa = [
	"id",
	"aria-expanded",
	"aria-controls"
], Za = { class: "dads-mega-menu__trigger-label" }, Qa = [
	"id",
	"aria-label",
	"aria-labelledby"
], $a = { class: "dads-mega-menu__columns" }, eo = {
	key: 0,
	class: "dads-mega-menu__heading"
}, to = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsMegaMenu",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		triggerLabel: {},
		columns: {},
		ariaLabel: { default: void 0 }
	},
	emits: ["update:modelValue", "click:item"],
	setup(t, { emit: n }) {
		let i = t, c = n, u = E(), d = r(() => `dads-mega-menu-trigger-${u}`), f = r(() => `dads-mega-menu-panel-${u}`), m = v(null), b = v(null), x = r(() => i.modelValue), S = () => {
			x.value || c("update:modelValue", !0);
		}, w = (e = !1) => {
			x.value && (c("update:modelValue", !1), e && b.value?.focus());
		}, T = () => {
			x.value ? w() : S();
		}, D = (e) => {
			e.preventDefault(), T();
		}, A = (e) => {
			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault(), T();
					break;
				case "ArrowDown":
					e.preventDefault(), S();
					break;
			}
		}, N = (e) => {
			e.key === "Escape" && (e.preventDefault(), w(!0));
		}, P = (e, t) => {
			c("click:item", e, t), e.disabled || w();
		}, F = (e) => {
			if (!x.value) return;
			let t = e.target;
			t && m.value && m.value.contains(t) || w();
		};
		g(() => {
			document.addEventListener("pointerdown", F, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", F, !0);
		});
		let I = (e) => {
			e.key === "Escape" && x.value && (e.preventDefault(), w(!0));
		};
		return k(() => i.modelValue, () => {}), (n, r) => (_(), o("div", {
			ref_key: "rootRef",
			ref: m,
			class: p(["dads-mega-menu", { "dads-mega-menu--open": x.value }])
		}, [s("button", {
			id: d.value,
			ref_key: "triggerRef",
			ref: b,
			type: "button",
			class: "dads-mega-menu__trigger",
			"aria-expanded": x.value,
			"aria-controls": f.value,
			"aria-haspopup": "dialog",
			onClick: D,
			onKeydown: [A, M(I, ["esc"])]
		}, [s("span", Za, C(t.triggerLabel), 1), (_(), o("svg", {
			class: p(["dads-mega-menu__trigger-arrow", { "dads-mega-menu__trigger-arrow--open": x.value }]),
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "currentcolor",
			"aria-hidden": "true"
		}, [...r[0] ||= [s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)]], 2))], 40, Xa), j(s("div", {
			id: f.value,
			class: "dads-mega-menu__panel",
			role: "dialog",
			"aria-label": t.ariaLabel || t.triggerLabel,
			"aria-labelledby": t.ariaLabel ? void 0 : d.value,
			onKeydown: N
		}, [s("div", $a, [(_(!0), o(e, null, y(t.columns, (e, t) => (_(), o("section", {
			key: t,
			class: "dads-mega-menu__column"
		}, [e.heading ? (_(), o("h3", eo, C(e.heading), 1)) : a("", !0), l(fa, {
			items: e.items,
			"onClick:item": P
		}, null, 8, ["items"])]))), 128))])], 40, Qa), [[O, x.value]])], 2));
	}
}), [["__scopeId", "data-v-c4f46c2b"]]), no = ["aria-label"], ro = { class: "dads-page-navigation__list" }, io = {
	key: 0,
	class: "dads-page-navigation__item"
}, ao = ["disabled", "aria-label"], oo = {
	key: 1,
	class: "dads-page-navigation__item"
}, so = ["disabled"], co = { class: "dads-page-navigation__label" }, lo = {
	key: 0,
	class: "dads-page-navigation__item"
}, uo = {
	key: 1,
	class: "dads-page-navigation__item"
}, fo = [
	"aria-current",
	"disabled",
	"onClick"
], po = {
	key: 2,
	class: "dads-page-navigation__item"
}, mo = ["disabled"], ho = { class: "dads-page-navigation__label" }, go = {
	key: 3,
	class: "dads-page-navigation__item"
}, _o = ["disabled", "aria-label"], vo = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsPageNavigation",
	props: {
		modelValue: {},
		totalPages: {},
		maxPageButtons: { default: 7 },
		showPrevNext: {
			type: Boolean,
			default: !0
		},
		showFirstLast: {
			type: Boolean,
			default: !1
		},
		prevLabel: { default: "前のページ" },
		nextLabel: { default: "次のページ" },
		firstLabel: { default: "最初のページ" },
		lastLabel: { default: "最後のページ" },
		ariaLabel: { default: "ページ送り" },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let i = t, c = n, l = r(() => {
			let e = Math.max(1, Math.floor(i.totalPages)), t = Math.max(0, Math.floor(i.maxPageButtons));
			if (t <= 0) return [];
			if (e <= t) return Array.from({ length: e }, (e, t) => t + 1);
			let n = Math.max(0, t - 2), r = Math.floor((n - 1) / 2), a = Math.max(2, i.modelValue - r), o = Math.min(e - 1, a + n - 1);
			o - a + 1 < n && (a = Math.max(2, o - n + 1));
			let s = [1];
			a > 2 && s.push("ellipsis");
			for (let e = a; e <= o; e++) s.push(e);
			return o < e - 1 && s.push("ellipsis"), s.push(e), s;
		}), u = (e) => e === i.modelValue, d = r(() => i.disabled || i.modelValue <= 1), f = r(() => i.disabled || i.modelValue >= i.totalPages), m = d, h = f, g = (e) => {
			if (i.disabled) return;
			let t = Math.max(1, Math.min(i.totalPages, Math.floor(e)));
			t !== i.modelValue && (c("update:modelValue", t), c("change", t));
		};
		return (n, r) => (_(), o("nav", {
			class: "dads-page-navigation",
			"aria-label": t.ariaLabel
		}, [s("ul", ro, [
			t.showFirstLast ? (_(), o("li", io, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--first",
				disabled: w(m) || void 0,
				"aria-label": t.firstLabel,
				onClick: r[0] ||= (e) => g(1)
			}, [...r[4] ||= [s("i", {
				class: "mdi mdi-chevron-double-left",
				"aria-hidden": "true"
			}, null, -1)]], 8, ao)])) : a("", !0),
			t.showPrevNext ? (_(), o("li", oo, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--prev",
				disabled: d.value || void 0,
				onClick: r[1] ||= (e) => g(t.modelValue - 1)
			}, [r[5] ||= s("i", {
				class: "mdi mdi-chevron-left",
				"aria-hidden": "true"
			}, null, -1), s("span", co, C(t.prevLabel), 1)], 8, so)])) : a("", !0),
			(_(!0), o(e, null, y(l.value, (n, i) => (_(), o(e, { key: `p-${i}-${n}` }, [n === "ellipsis" ? (_(), o("li", lo, [...r[6] ||= [s("span", {
				class: "dads-page-navigation__ellipsis",
				"aria-hidden": "true"
			}, "…", -1)]])) : (_(), o("li", uo, [s("button", {
				type: "button",
				class: p(["dads-page-navigation__btn dads-page-navigation__btn--page", { "is-active": u(n) }]),
				"aria-current": u(n) ? "page" : void 0,
				disabled: t.disabled || void 0,
				onClick: (e) => g(n)
			}, C(n), 11, fo)]))], 64))), 128)),
			t.showPrevNext ? (_(), o("li", po, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--next",
				disabled: f.value || void 0,
				onClick: r[2] ||= (e) => g(t.modelValue + 1)
			}, [s("span", ho, C(t.nextLabel), 1), r[7] ||= s("i", {
				class: "mdi mdi-chevron-right",
				"aria-hidden": "true"
			}, null, -1)], 8, mo)])) : a("", !0),
			t.showFirstLast ? (_(), o("li", go, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--last",
				disabled: w(h) || void 0,
				"aria-label": t.lastLabel,
				onClick: r[3] ||= (e) => g(t.totalPages)
			}, [...r[8] ||= [s("i", {
				class: "mdi mdi-chevron-double-right",
				"aria-hidden": "true"
			}, null, -1)]], 8, _o)])) : a("", !0)
		])], 8, no));
	}
}), [["__scopeId", "data-v-e58e8fce"]]), yo = ["aria-label"], bo = { class: "dads-table-of-contents__list" }, xo = [
	"href",
	"aria-current",
	"onClick"
], So = {
	key: 0,
	class: "dads-table-of-contents__list dads-table-of-contents__list--nested"
}, Co = [
	"href",
	"aria-current",
	"onClick"
], wo = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsTableOfContents",
	props: {
		items: {},
		activeId: { default: void 0 },
		ariaLabel: { default: "このページの目次" }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let r = t, i = n, c = (e) => e.href ?? `#${e.id}`, l = (e) => r.activeId !== void 0 && r.activeId === e.id, u = (e, t) => {
			i("click:item", e, t);
		};
		return (n, r) => (_(), o("nav", {
			class: "dads-table-of-contents",
			"aria-label": t.ariaLabel
		}, [s("ul", bo, [(_(!0), o(e, null, y(t.items, (t) => (_(), o("li", {
			key: t.id,
			class: p(["dads-table-of-contents__item", { "dads-table-of-contents__item--active": l(t) }])
		}, [s("a", {
			class: p(["dads-table-of-contents__link", { "dads-table-of-contents__link--active": l(t) }]),
			href: c(t),
			"aria-current": l(t) ? "location" : void 0,
			onClick: (e) => u(t, e)
		}, C(t.label), 11, xo), t.children && t.children.length > 0 ? (_(), o("ul", So, [(_(!0), o(e, null, y(t.children, (e) => (_(), o("li", {
			key: e.id,
			class: p(["dads-table-of-contents__item dads-table-of-contents__item--nested", { "dads-table-of-contents__item--active": l(e) }])
		}, [s("a", {
			class: p(["dads-table-of-contents__link dads-table-of-contents__link--nested", { "dads-table-of-contents__link--active": l(e) }]),
			href: c(e),
			"aria-current": l(e) ? "location" : void 0,
			onClick: (t) => u(e, t)
		}, C(e.label), 11, Co)], 2))), 128))])) : a("", !0)], 2))), 128))])], 8, yo));
	}
}), [["__scopeId", "data-v-483f7e82"]]), To = ["aria-label"], Eo = { class: "dads-bottom-navigation__list" }, Do = [
	"href",
	"aria-current",
	"aria-disabled",
	"tabindex",
	"onClick"
], Oo = { class: "dads-bottom-navigation__label" }, ko = [
	"aria-current",
	"disabled",
	"onClick"
], Ao = { class: "dads-bottom-navigation__label" }, jo = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsBottomNavigation",
	props: {
		modelValue: { default: void 0 },
		items: {},
		ariaLabel: { default: "ボトムナビゲーション" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = n, i = (e, t) => t !== void 0 && e.id === t, a = (e, t) => {
			if (e.disabled) {
				t.preventDefault();
				return;
			}
			r("update:modelValue", e.id), r("change", e.id);
		}, c = (e, t) => ["dads-bottom-navigation__item", {
			"dads-bottom-navigation__item--active": i(e, t),
			"dads-bottom-navigation__item--disabled": e.disabled
		}];
		return (n, r) => (_(), o("nav", {
			"aria-label": t.ariaLabel,
			class: "dads-bottom-navigation"
		}, [s("ul", Eo, [(_(!0), o(e, null, y(t.items, (e) => (_(), o("li", {
			key: e.id,
			class: "dads-bottom-navigation__list-item"
		}, [e.href === void 0 ? (_(), o("button", {
			key: 1,
			type: "button",
			"aria-current": i(e, t.modelValue) ? "page" : void 0,
			disabled: e.disabled || void 0,
			class: p(c(e, t.modelValue)),
			onClick: (t) => a(e, t)
		}, [s("i", {
			class: p([
				"mdi",
				e.iconName,
				"dads-bottom-navigation__icon"
			]),
			"aria-hidden": "true"
		}, null, 2), s("span", Ao, C(e.label), 1)], 10, ko)) : (_(), o("a", {
			key: 0,
			href: e.disabled ? void 0 : e.href,
			"aria-current": i(e, t.modelValue) ? "page" : void 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			tabindex: e.disabled ? -1 : void 0,
			class: p(c(e, t.modelValue)),
			onClick: (t) => a(e, t)
		}, [s("i", {
			class: p([
				"mdi",
				e.iconName,
				"dads-bottom-navigation__icon"
			]),
			"aria-hidden": "true"
		}, null, 2), s("span", Oo, C(e.label), 1)], 10, Do))]))), 128))])], 8, To));
	}
}), [["__scopeId", "data-v-04f947a3"]]), Mo = ["aria-label"], No = {
	key: 0,
	class: "dads-mobile-menu__header"
}, Po = ["aria-label"], Fo = {
	key: 1,
	class: "dads-mobile-menu__panel-title"
}, Io = ["aria-label"], Lo = ["aria-label"], Ro = {
	key: 1,
	class: "dads-mobile-menu__slide-list"
}, zo = ["href", "onClick"], Bo = { class: "dads-mobile-menu__slide-item-label" }, Vo = ["onClick"], Ho = { class: "dads-mobile-menu__slide-item-label" }, Uo = {
	key: 0,
	class: "mdi mdi-chevron-right dads-mobile-menu__slide-item-chevron",
	"aria-hidden": "true"
}, Wo = {
	key: 1,
	class: "dads-mobile-menu__utility"
}, Go = "a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", Ko = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsMobileMenu",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		items: {},
		type: { default: "accordion" },
		utilityItems: { default: void 0 },
		ariaLabel: { default: "モバイルメニュー" },
		navAriaLabel: { default: "メインナビゲーション" },
		subLinksAriaLabel: { default: "補助リンク" },
		closeLabel: { default: "閉じる" },
		backLabel: { default: "戻る" },
		showCloseButton: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"update:modelValue",
		"click:item",
		"click:utility"
	],
	setup(c, { emit: u }) {
		let d = c, m = u, h = v(null), g = r(() => d.type === "slide"), b = v([]), x = r(() => b.value.length === 0 ? { items: d.items } : b.value[b.value.length - 1]), S = r(() => b.value.length > 0), w = null, T = () => {
			m("update:modelValue", !1);
		}, E = (e, t) => {
			m("click:item", e, t), (!e.children || e.children.length === 0) && T();
		}, D = (e, t) => {
			if (e.children && e.children.length > 0) {
				b.value.push({
					label: e.label,
					items: e.children
				});
				return;
			}
			m("click:item", e, t), T();
		}, O = () => {
			b.value.pop();
		}, j = (e, t, n) => {
			m("click:utility", e, t, n), T();
		}, N = () => h.value ? Array.from(h.value.querySelectorAll(Go)) : [], P = (e) => {
			let t = N();
			if (t.length === 0) return;
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			e.shiftKey ? (i === n || i === h.value) && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
		return k(() => d.modelValue, async (e) => {
			e ? (w = document.activeElement, b.value = [], await f(), h.value?.focus()) : w &&= (w.focus(), null);
		}), (r, u) => (_(), i(t, { to: "body" }, [l(n, { name: "dads-mobile-menu" }, {
			default: A(() => [c.modelValue ? (_(), o("div", {
				key: 0,
				class: p(["dads-mobile-menu", `dads-mobile-menu--type-${c.type}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-label": c.ariaLabel,
				onKeydown: [M(T, ["esc"]), M(P, ["tab"])]
			}, [s("div", {
				class: "dads-mobile-menu__overlay",
				"aria-hidden": "true",
				onClick: T
			}), s("div", {
				ref_key: "panelRef",
				ref: h,
				class: "dads-mobile-menu__panel",
				tabindex: "-1"
			}, [
				c.showCloseButton || g.value && S.value ? (_(), o("header", No, [
					g.value && S.value ? (_(), o("button", {
						key: 0,
						type: "button",
						class: "dads-mobile-menu__back",
						"aria-label": c.backLabel,
						onClick: O
					}, [u[0] ||= s("i", {
						class: "mdi mdi-chevron-left dads-mobile-menu__back-icon",
						"aria-hidden": "true"
					}, null, -1), s("span", null, C(c.backLabel), 1)], 8, Po)) : a("", !0),
					g.value && x.value.label ? (_(), o("h2", Fo, C(x.value.label), 1)) : a("", !0),
					c.showCloseButton ? (_(), o("button", {
						key: 2,
						type: "button",
						class: "dads-mobile-menu__close",
						"aria-label": c.closeLabel,
						onClick: T
					}, [...u[1] ||= [s("svg", {
						class: "dads-mobile-menu__close-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 120 120",
						"aria-hidden": "true"
					}, [s("path", {
						d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
						fill: "currentcolor"
					})], -1)]], 8, Io)) : a("", !0)
				])) : a("", !0),
				s("nav", {
					class: "dads-mobile-menu__nav",
					"aria-label": c.navAriaLabel
				}, [g.value ? (_(), o("ul", Ro, [(_(!0), o(e, null, y(x.value.items, (e, t) => (_(), o("li", {
					key: t,
					class: "dads-mobile-menu__slide-item-wrap"
				}, [e.href && (!e.children || e.children.length === 0) ? (_(), o("a", {
					key: 0,
					href: e.href,
					class: "dads-mobile-menu__slide-item",
					onClick: (t) => D(e, t)
				}, [s("span", Bo, C(e.label), 1)], 8, zo)) : (_(), o("button", {
					key: 1,
					type: "button",
					class: p(["dads-mobile-menu__slide-item", { "dads-mobile-menu__slide-item--parent": e.children && e.children.length > 0 }]),
					onClick: (t) => D(e, t)
				}, [s("span", Ho, C(e.label), 1), e.children && e.children.length > 0 ? (_(), o("i", Uo)) : a("", !0)], 10, Vo))]))), 128))])) : (_(), i(fa, {
					key: 0,
					items: c.items,
					type: "box",
					"onClick:item": E
				}, null, 8, ["items"]))], 8, Lo),
				c.utilityItems && c.utilityItems.length > 0 ? (_(), o("div", Wo, [l(Ra, {
					items: c.utilityItems,
					"aria-label": c.subLinksAriaLabel,
					"onClick:item": j
				}, null, 8, ["items", "aria-label"])])) : a("", !0)
			], 512)], 42, Mo)) : a("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-4d22e741"]]), qo = [
	"src",
	"alt",
	"width",
	"height",
	"loading"
], Jo = { class: "dads-image__caption" }, Yo = [
	"src",
	"alt",
	"width",
	"height",
	"loading"
], Xo = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
		showSkeleton: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["error", "load"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = v(!1), c = r(() => a.value && n.placeholder ? n.placeholder : n.src), l = v(!1), u = (e) => {
			a.value = !1, l.value = !0, i("load", e);
		}, d = (e) => {
			!a.value && n.placeholder && (a.value = !0), l.value = !0, i("error", e);
		}, f = r(() => [
			"dads-image",
			`dads-image--fit-${n.objectFit}`,
			{
				"dads-image--loaded": l.value,
				"dads-image--skeleton": n.showSkeleton && !l.value
			}
		]);
		return (t, n) => e.caption ? (_(), o("figure", {
			key: 0,
			class: p(f.value)
		}, [s("img", {
			class: "dads-image__img",
			src: c.value,
			alt: e.alt,
			width: e.width,
			height: e.height,
			loading: e.loading,
			onError: d,
			onLoad: u
		}, null, 40, qo), s("figcaption", Jo, C(e.caption), 1)], 2)) : (_(), o("img", {
			key: 1,
			class: p([...f.value, "dads-image__img"]),
			src: c.value,
			alt: e.alt,
			width: e.width,
			height: e.height,
			loading: e.loading,
			onError: d,
			onLoad: u
		}, null, 42, Yo));
	}
}), [["__scopeId", "data-v-052b5191"]]), Zo = ["aria-label"], Qo = {
	key: 0,
	class: "dads-image-slider__header"
}, $o = ["href"], es = {
	class: "dads-image-slider__viewport",
	"aria-live": "polite"
}, ts = [
	"id",
	"aria-label",
	"aria-hidden"
], ns = ["src", "alt"], rs = {
	key: 0,
	class: "dads-image-slider__caption"
}, is = ["aria-label", "disabled"], as = ["aria-label", "disabled"], os = ["aria-label"], ss = [
	"aria-selected",
	"aria-controls",
	"aria-label",
	"onClick"
], cs = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsImageSlider",
	props: {
		modelValue: { default: 0 },
		slides: {},
		autoPlay: {
			type: Boolean,
			default: !1
		},
		interval: { default: 5e3 },
		pauseOnHover: {
			type: Boolean,
			default: !0
		},
		showArrows: {
			type: Boolean,
			default: !0
		},
		showIndicators: {
			type: Boolean,
			default: !0
		},
		loop: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: "イメージスライダー" },
		heading: {},
		headingLevel: { default: 2 },
		showAllLabel: {},
		showAllHref: {},
		prevSlideAriaLabel: { default: "前のスライド" },
		nextSlideAriaLabel: { default: "次のスライド" },
		slidePositionAriaLabel: { default: "スライド位置" },
		formatSlideAriaLabel: {
			type: Function,
			default: (e) => `スライド ${e + 1}`
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let l = t, u = r(() => `h${l.headingLevel}`), d = r(() => !!l.showAllLabel && !!l.showAllHref), f = r(() => !!l.heading || d.value), m = n, b = E(), x = r(() => `dads-image-slider-${b}`), w = (e) => `${x.value}-slide-${e}`, T = r(() => l.slides.length), D = (e) => T.value === 0 || e < 0 ? 0 : e >= T.value ? Math.max(0, T.value - 1) : e, O = r(() => D(l.modelValue ?? 0)), j = (e) => {
			if (T.value === 0) return;
			let t;
			t = l.loop ? (e % T.value + T.value) % T.value : D(e), t !== O.value && (m("update:modelValue", t), m("change", t));
		}, M = () => j(O.value + 1), N = () => j(O.value - 1), P = r(() => l.loop || O.value > 0), F = r(() => l.loop || O.value < T.value - 1), I = null, L = v(!1), R = () => {
			I !== null && (clearInterval(I), I = null);
		}, z = () => {
			R(), !(!l.autoPlay || L.value || T.value <= 1) && (I = setInterval(() => {
				if (!l.loop && O.value >= T.value - 1) {
					R();
					return;
				}
				M();
			}, l.interval));
		}, B = () => {
			l.pauseOnHover && (L.value = !0, R());
		}, V = () => {
			l.pauseOnHover && (L.value = !1, z());
		}, H = (e) => {
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault(), M();
					break;
				case "ArrowLeft":
					e.preventDefault(), N();
					break;
				default: return;
			}
		};
		g(() => {
			z();
		}), h(() => {
			R();
		}), k(() => [
			l.autoPlay,
			l.interval,
			T.value
		], () => {
			z();
		});
		let U = (e) => ["dads-image-slider__indicator", { "dads-image-slider__indicator--active": e === O.value }], W = (e) => ["dads-image-slider__slide", { "dads-image-slider__slide--active": e === O.value }], G = (e) => j(e), K = (e, t) => `${t + 1} / ${T.value}: ${e.alt}`;
		return (n, r) => (_(), o("section", {
			class: "dads-image-slider",
			"aria-label": t.ariaLabel,
			"aria-roledescription": "carousel",
			tabindex: "0",
			onMouseenter: B,
			onMouseleave: V,
			onKeydown: H
		}, [
			f.value ? (_(), o("header", Qo, [t.heading ? (_(), i(S(u.value), {
				key: 0,
				class: "dads-image-slider__heading"
			}, {
				default: A(() => [c(C(t.heading), 1)]),
				_: 1
			})) : a("", !0), d.value ? (_(), o("a", {
				key: 1,
				href: t.showAllHref,
				class: "dads-image-slider__show-all"
			}, C(t.showAllLabel), 9, $o)) : a("", !0)])) : a("", !0),
			s("div", es, [(_(!0), o(e, null, y(t.slides, (e, t) => (_(), o("div", {
				id: w(t),
				key: t,
				role: "group",
				"aria-roledescription": "slide",
				"aria-label": K(e, t),
				"aria-hidden": t === O.value ? void 0 : "true",
				class: p(W(t))
			}, [s("img", {
				class: "dads-image-slider__image",
				src: e.src,
				alt: e.alt
			}, null, 8, ns), e.caption ? (_(), o("p", rs, C(e.caption), 1)) : a("", !0)], 10, ts))), 128))]),
			t.showArrows && T.value > 1 ? (_(), o("button", {
				key: 1,
				type: "button",
				class: "dads-image-slider__arrow dads-image-slider__arrow--prev",
				"aria-label": t.prevSlideAriaLabel,
				disabled: !P.value || void 0,
				onClick: N
			}, [...r[0] ||= [s("span", { "aria-hidden": "true" }, "‹", -1)]], 8, is)) : a("", !0),
			t.showArrows && T.value > 1 ? (_(), o("button", {
				key: 2,
				type: "button",
				class: "dads-image-slider__arrow dads-image-slider__arrow--next",
				"aria-label": t.nextSlideAriaLabel,
				disabled: !F.value || void 0,
				onClick: M
			}, [...r[1] ||= [s("span", { "aria-hidden": "true" }, "›", -1)]], 8, as)) : a("", !0),
			t.showIndicators && T.value > 1 ? (_(), o("div", {
				key: 3,
				class: "dads-image-slider__indicators",
				role: "tablist",
				"aria-label": t.slidePositionAriaLabel
			}, [(_(!0), o(e, null, y(t.slides, (e, n) => (_(), o("button", {
				key: n,
				type: "button",
				role: "tab",
				"aria-selected": n === O.value,
				"aria-controls": w(n),
				"aria-label": t.formatSlideAriaLabel(n),
				class: p(U(n)),
				onClick: (e) => G(n)
			}, [...r[2] ||= [s("span", {
				class: "dads-image-slider__indicator-dot",
				"aria-hidden": "true"
			}, null, -1)]], 10, ss))), 128))], 8, os)) : a("", !0)
		], 40, Zo));
	}
}), [["__scopeId", "data-v-862c5f73"]]), ls = ["aria-label"], us = {
	key: 0,
	class: "dads-carousel__header"
}, ds = ["href"], fs = {
	class: "dads-carousel__viewport",
	"aria-live": "polite"
}, ps = [
	"id",
	"aria-label",
	"aria-hidden"
], ms = ["aria-label", "disabled"], hs = ["aria-label", "disabled"], gs = ["aria-label"], _s = [
	"aria-selected",
	"aria-controls",
	"aria-label",
	"onClick"
], vs = /* @__PURE__ */ L(/* @__PURE__ */ u({
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
		autoPlay: {
			type: Boolean,
			default: !1
		},
		interval: { default: 5e3 },
		pauseOnHover: {
			type: Boolean,
			default: !0
		},
		showArrows: {
			type: Boolean,
			default: !0
		},
		showIndicators: {
			type: Boolean,
			default: !0
		},
		loop: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: "カルーセル" },
		prevSlideAriaLabel: { default: "前のスライド" },
		nextSlideAriaLabel: { default: "次のスライド" },
		slidePositionAriaLabel: { default: "スライド位置" },
		formatSlideAriaLabel: {
			type: Function,
			default: (e) => `スライド ${e + 1}`
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let l = t;
		l.autoPlay, l.type === "container" && l.heading;
		let u = n, d = E(), f = r(() => `dads-carousel-${d}`), x = (e) => `${f.value}-slide-${e}`, w = r(() => Math.max(0, l.itemCount)), T = (e) => w.value === 0 || e < 0 ? 0 : e >= w.value ? Math.max(0, w.value - 1) : e, D = r(() => T(l.modelValue ?? 0)), O = (e) => {
			if (w.value === 0) return;
			let t;
			t = l.loop ? (e % w.value + w.value) % w.value : T(e), t !== D.value && (u("update:modelValue", t), u("change", t));
		}, j = () => O(D.value + 1), M = () => O(D.value - 1), N = r(() => l.loop || D.value > 0), P = r(() => l.loop || D.value < w.value - 1), F = null, I = v(!1), L = () => {
			F !== null && (clearInterval(F), F = null);
		}, R = () => {
			L(), !(!l.autoPlay || I.value || w.value <= 1) && (F = setInterval(() => {
				if (!l.loop && D.value >= w.value - 1) {
					L();
					return;
				}
				j();
			}, l.interval));
		}, z = () => {
			l.pauseOnHover && (I.value = !0, L());
		}, B = () => {
			l.pauseOnHover && (I.value = !1, R());
		}, V = (e) => {
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault(), j();
					break;
				case "ArrowLeft":
					e.preventDefault(), M();
					break;
				default: return;
			}
		};
		g(() => {
			R();
		}), h(() => {
			L();
		}), k(() => [
			l.autoPlay,
			l.interval,
			w.value
		], () => {
			R();
		});
		let H = r(() => Array.from({ length: w.value }, (e, t) => t)), U = r(() => [
			"dads-carousel",
			`dads-carousel--type-${l.type}`,
			`dads-carousel--mode-${l.mode}`
		]), W = r(() => `h${l.headingLevel}`), G = r(() => !!l.showAllLabel && !!l.showAllHref), K = r(() => l.mode === "multi"), q = r(() => K.value ? Math.max(1, Math.min(l.visibleCount, w.value || 1)) : 1), J = r(() => {
			if (K.value) return {
				"--dads-carousel-visible": String(q.value),
				transform: `translateX(calc(-${D.value} * (100% / var(--dads-carousel-visible))))`
			};
		}), Y = (e) => ["dads-carousel__slide", { "dads-carousel__slide--active": e === D.value }], X = (e) => ["dads-carousel__indicator", { "dads-carousel__indicator--active": e === D.value }], ee = (e) => O(e), Z = (e) => `${e + 1} / ${w.value}`;
		return (n, r) => (_(), o("section", {
			class: p(U.value),
			"aria-label": t.ariaLabel,
			"aria-roledescription": "carousel",
			tabindex: "0",
			onMouseenter: z,
			onMouseleave: B,
			onKeydown: V
		}, [
			t.heading || G.value ? (_(), o("header", us, [t.heading ? (_(), i(S(W.value), {
				key: 0,
				class: "dads-carousel__heading"
			}, {
				default: A(() => [c(C(t.heading), 1)]),
				_: 1
			})) : a("", !0), G.value ? (_(), o("a", {
				key: 1,
				href: t.showAllHref,
				class: "dads-carousel__show-all"
			}, C(t.showAllLabel), 9, ds)) : a("", !0)])) : a("", !0),
			s("div", fs, [s("div", {
				class: "dads-carousel__track",
				style: m(J.value)
			}, [(_(!0), o(e, null, y(H.value, (e) => (_(), o("div", {
				id: x(e),
				key: e,
				role: "group",
				"aria-roledescription": "slide",
				"aria-label": Z(e),
				"aria-hidden": !K.value && e !== D.value ? "true" : void 0,
				class: p(Y(e))
			}, [b(n.$slots, "default", {
				index: e,
				isActive: e === D.value
			}, void 0, !0)], 10, ps))), 128))], 4)]),
			t.showArrows && w.value > 1 ? (_(), o("button", {
				key: 1,
				type: "button",
				class: "dads-carousel__arrow dads-carousel__arrow--prev",
				"aria-label": t.prevSlideAriaLabel,
				disabled: !N.value || void 0,
				onClick: M
			}, [...r[0] ||= [s("span", { "aria-hidden": "true" }, "‹", -1)]], 8, ms)) : a("", !0),
			t.showArrows && w.value > 1 ? (_(), o("button", {
				key: 2,
				type: "button",
				class: "dads-carousel__arrow dads-carousel__arrow--next",
				"aria-label": t.nextSlideAriaLabel,
				disabled: !P.value || void 0,
				onClick: j
			}, [...r[1] ||= [s("span", { "aria-hidden": "true" }, "›", -1)]], 8, hs)) : a("", !0),
			t.showIndicators && w.value > 1 ? (_(), o("div", {
				key: 3,
				class: "dads-carousel__indicators",
				role: "tablist",
				"aria-label": t.slidePositionAriaLabel
			}, [(_(!0), o(e, null, y(H.value, (e) => (_(), o("button", {
				key: e,
				type: "button",
				role: "tab",
				"aria-selected": e === D.value,
				"aria-controls": x(e),
				"aria-label": t.formatSlideAriaLabel(e),
				class: p(X(e)),
				onClick: (t) => ee(e)
			}, [...r[2] ||= [s("span", {
				class: "dads-carousel__indicator-dot",
				"aria-hidden": "true"
			}, null, -1)]], 10, _s))), 128))], 8, gs)) : a("", !0)
		], 42, ls));
	}
}), [["__scopeId", "data-v-8746109c"]]), ys = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsList",
	props: {
		type: { default: "unordered" },
		items: {},
		start: {},
		spacing: { default: "4" },
		nestingMarker: {
			type: Boolean,
			default: !0
		}
	},
	setup(t) {
		let n = t, s = r(() => n.type === "ordered" ? "number" : void 0);
		n.type;
		let l = r(() => [
			"dads-list",
			`dads-list--spacing-${n.spacing}`,
			{ "dads-list--no-nesting-marker": !n.nestingMarker }
		]), u = (e) => typeof e == "string" ? { label: e } : e, d = r(() => Array.isArray(n.items) && n.items.length > 0);
		return (n, r) => {
			let f = x("DadsList", !0);
			return _(), i(S(t.type === "ordered" ? "ol" : "ul"), {
				class: p(l.value),
				"data-marker": s.value,
				"data-spacing": t.spacing,
				start: t.type === "ordered" ? t.start : void 0
			}, {
				default: A(() => [d.value ? (_(!0), o(e, { key: 0 }, y(t.items, (e, n) => (_(), o("li", { key: n }, [c(C(u(e).label) + " ", 1), u(e).children && u(e).children.length > 0 ? (_(), i(f, {
					key: 0,
					type: t.type,
					items: u(e).children
				}, null, 8, ["type", "items"])) : a("", !0)]))), 128)) : b(n.$slots, "default", { key: 1 }, void 0, !0)]),
				_: 3
			}, 8, [
				"class",
				"data-marker",
				"data-spacing",
				"start"
			]);
		};
	}
}), [["__scopeId", "data-v-430ff576"]]), bs = { class: "dads-blockquote-wrapper" }, xs = ["cite"], Ss = { key: 1 }, Cs = {
	key: 0,
	class: "dads-blockquote__cite"
}, ws = ["href"], Ts = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsBlockquote",
	props: {
		quote: {},
		cite: {},
		citeUrl: {}
	},
	setup(t) {
		let n = t, i = D(), l = r(() => !!i.default), u = r(() => !!n.cite), d = r(() => !!n.citeUrl);
		return (n, r) => (_(), o("div", bs, [s("blockquote", {
			class: "dads-blockquote",
			cite: t.citeUrl
		}, [l.value ? b(n.$slots, "default", { key: 0 }, void 0, !0) : t.quote ? (_(), o("p", Ss, C(t.quote), 1)) : a("", !0)], 8, xs), u.value ? (_(), o("cite", Cs, [d.value ? (_(), o("a", {
			key: 0,
			href: t.citeUrl,
			class: "dads-blockquote__cite-link"
		}, C(t.cite), 9, ws)) : (_(), o(e, { key: 1 }, [c(C(t.cite), 1)], 64))])) : a("", !0)]));
	}
}), [["__scopeId", "data-v-131dfe9a"]]), Es = ["data-style", "aria-label"], Ds = ["data-style"], Os = ["src"], ks = { class: "dads-resource-list__contents" }, As = { class: "dads-resource-list__title" }, js = {
	key: 0,
	class: "dads-resource-list__support"
}, Ms = {
	key: 1,
	class: "dads-resource-list__tags"
}, Ns = {
	key: 2,
	class: "dads-resource-list__sub"
}, Ps = { key: 1 }, Fs = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsResourceList",
	props: {
		items: {},
		variant: { default: "frame" },
		ariaLabel: {}
	},
	emits: ["click:item", "click:action"],
	setup(t, { emit: n }) {
		let c = t, l = n, u = r(() => c.items.map((e, t) => ({
			item: e,
			index: t,
			isLink: !!e.href && !e.disabled,
			hasMedia: !!e.thumbnail || !!e.iconName,
			hasTags: Array.isArray(e.tags) && e.tags.length > 0,
			kind: e.kind ?? "information",
			rowClass: [
				"dads-resource-list",
				`dads-resource-list--kind-${e.kind ?? "information"}`,
				{
					"dads-resource-list--selected": e.selected,
					"dads-resource-list--disabled": e.disabled
				}
			]
		}))), d = (e) => !!e.href && !e.disabled, f = (e, t, n) => {
			if (e.disabled) {
				n.preventDefault();
				return;
			}
			l("click:item", e, t, n);
		}, m = (e, t, n) => {
			if (e.disabled) {
				n.preventDefault();
				return;
			}
			l("click:action", e, t, n);
		};
		return (n, r) => (_(), o("ul", {
			class: "dads-resource-list-group",
			"data-style": t.variant,
			"aria-label": t.ariaLabel
		}, [(_(!0), o(e, null, y(u.value, (n) => (_(), o("li", {
			key: n.index,
			class: "dads-resource-list-group__item"
		}, [s("div", {
			class: p(n.rowClass),
			"data-style": t.variant
		}, [(_(), i(S(d(n.item) ? "a" : "div"), {
			href: d(n.item) ? n.item.href : void 0,
			"aria-current": n.item.selected ? "true" : void 0,
			"aria-disabled": n.item.disabled || void 0,
			class: "dads-resource-list__body",
			onClick: (e) => f(n.item, n.index, e)
		}, {
			default: A(() => [
				n.item.thumbnail ? (_(), o("img", {
					key: 0,
					class: "dads-resource-list__thumbnail",
					src: n.item.thumbnail,
					alt: ""
				}, null, 8, Os)) : n.item.iconName ? (_(), o("i", {
					key: 1,
					class: p([
						"mdi",
						n.item.iconName,
						"dads-resource-list__icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0),
				s("div", ks, [
					s("h3", As, C(n.item.title), 1),
					n.item.description ? (_(), o("div", js, [s("p", null, C(n.item.description), 1)])) : a("", !0),
					n.hasTags ? (_(), o("ul", Ms, [(_(!0), o(e, null, y(n.item.tags, (e, t) => (_(), o("li", {
						key: t,
						class: "dads-resource-list__tag"
					}, C(e), 1))), 128))])) : a("", !0)
				]),
				n.item.date ? (_(), o("div", Ns, [s("p", null, C(n.item.date), 1)])) : a("", !0)
			]),
			_: 2
		}, 1032, [
			"href",
			"aria-current",
			"aria-disabled",
			"onClick"
		])), n.item.action ? (_(), i(S(n.item.action.href ? "a" : "button"), {
			key: 0,
			type: n.item.action.href ? void 0 : "button",
			href: n.item.action.href,
			"aria-label": n.item.action.label,
			disabled: !n.item.action.href && n.item.disabled ? !0 : void 0,
			class: "dads-resource-list__action",
			onClick: (e) => m(n.item, n.index, e)
		}, {
			default: A(() => [n.item.action.iconName ? (_(), o("i", {
				key: 0,
				class: p(["mdi", n.item.action.iconName]),
				"aria-hidden": "true"
			}, null, 2)) : (_(), o("span", Ps, C(n.item.action.label), 1))]),
			_: 2
		}, 1032, [
			"type",
			"href",
			"aria-label",
			"disabled",
			"onClick"
		])) : a("", !0)], 10, Ds)]))), 128))], 8, Es));
	}
}), [["__scopeId", "data-v-f3e0c97d"]]), Is = ["aria-label"], Ls = {
	key: 0,
	class: "dads-emergency-banner__timestamp"
}, Rs = ["datetime"], zs = {
	key: 1,
	class: "dads-emergency-banner__header"
}, Bs = { class: "dads-emergency-banner__heading" }, Vs = { class: "dads-emergency-banner__body" }, Hs = { class: "dads-emergency-banner__message" }, Us = {
	key: 2,
	class: "dads-emergency-banner__action"
}, Ws = [
	"href",
	"target",
	"rel"
], Gs = {
	key: 0,
	class: "mdi mdi-open-in-new dads-emergency-banner__external-icon",
	"aria-hidden": "true"
}, Ks = {
	key: 1,
	class: "dads-emergency-banner__sr-only"
}, qs = ["aria-label"], Js = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsEmergencyBanner",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		title: {},
		message: {},
		linkLabel: {},
		linkHref: {},
		closable: {
			type: Boolean,
			default: !1
		},
		closeLabel: { default: "閉じる" },
		iconName: { default: "mdi-alert" },
		ariaLabel: { default: "緊急情報" },
		timestamp: {},
		linkExternal: {
			type: Boolean,
			default: !1
		},
		newTabHintText: { default: "（新規タブで開く）" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = r(() => l.timestamp === void 0 ? null : l.timestamp instanceof Date ? {
			iso: l.timestamp.toISOString(),
			display: l.timestamp.toLocaleString()
		} : {
			iso: l.timestamp,
			display: l.timestamp
		}), f = () => {
			u("update:modelValue", !1), u("close");
		};
		return (t, r) => (_(), i(n, { name: "dads-emergency-banner" }, {
			default: A(() => [e.modelValue ? (_(), o("div", {
				key: 0,
				class: "dads-emergency-banner",
				role: "alert",
				"aria-live": "assertive",
				"aria-label": e.ariaLabel
			}, [
				d.value ? (_(), o("p", Ls, [s("time", { datetime: d.value.iso }, C(d.value.display), 9, Rs)])) : a("", !0),
				e.title || t.$slots.title ? (_(), o("header", zs, [s("h2", Bs, [e.iconName ? (_(), o("i", {
					key: 0,
					class: p([
						"mdi",
						e.iconName,
						"dads-emergency-banner__icon"
					]),
					"aria-hidden": "true"
				}, null, 2)) : a("", !0), b(t.$slots, "title", {}, () => [c(C(e.title), 1)], !0)])])) : a("", !0),
				s("div", Vs, [s("p", Hs, [b(t.$slots, "default", {}, () => [c(C(e.message), 1)], !0)])]),
				e.linkLabel && e.linkHref ? (_(), o("div", Us, [s("a", {
					class: "dads-emergency-banner__button",
					href: e.linkHref,
					target: e.linkExternal ? "_blank" : void 0,
					rel: e.linkExternal ? "noopener noreferrer" : void 0
				}, [
					c(C(e.linkLabel) + " ", 1),
					e.linkExternal ? (_(), o("i", Gs)) : a("", !0),
					e.linkExternal ? (_(), o("span", Ks, C(e.newTabHintText), 1)) : a("", !0)
				], 8, Ws)])) : a("", !0),
				e.closable ? (_(), o("button", {
					key: 3,
					type: "button",
					class: "dads-emergency-banner__close",
					"aria-label": e.closeLabel,
					onClick: f
				}, [...r[0] ||= [s("i", {
					class: "mdi mdi-close",
					"aria-hidden": "true"
				}, null, -1)]], 8, qs)) : a("", !0)
			], 8, Is)) : a("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-20bd557c"]]), Ys = ["aria-label"], Xs = {
	key: 0,
	class: "dads-table-control__top"
}, Zs = {
	key: 0,
	class: "dads-table-control__search"
}, Qs = ["for"], $s = { class: "dads-table-control__search-control" }, ec = [
	"id",
	"value",
	"placeholder"
], tc = ["aria-label"], nc = {
	key: 0,
	class: "dads-table-control__presets",
	role: "list"
}, rc = ["aria-pressed", "onClick"], ic = {
	key: 1,
	class: "dads-table-control__page-size"
}, ac = ["for"], oc = ["id", "value"], sc = ["value"], cc = {
	key: 1,
	class: "dads-table-control__pagination"
}, lc = ["id"], uc = ["aria-label"], dc = ["disabled", "aria-label"], fc = ["aria-label"], pc = ["disabled", "aria-label"], mc = /* @__PURE__ */ L(/* @__PURE__ */ u({
	__name: "DadsTableControl",
	props: {
		searchQuery: { default: "" },
		currentPage: { default: 1 },
		pageSize: { default: 10 },
		totalItems: {},
		pageSizeOptions: { default: () => [
			10,
			25,
			50,
			100
		] },
		searchPlaceholder: { default: "検索" },
		presets: { default: () => [] },
		showReset: {
			type: Boolean,
			default: !0
		},
		resetLabel: { default: "検索条件をリセット" },
		showSearch: {
			type: Boolean,
			default: !0
		},
		showPageSize: {
			type: Boolean,
			default: !0
		},
		showPagination: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: "テーブルコントロール" },
		searchLabel: { default: "検索" },
		pageSizeLabel: { default: "表示件数" },
		paginationAriaLabel: { default: "ページ送り" },
		prevPageAriaLabel: { default: "前のページ" },
		currentPageAriaLabel: { default: "現在のページ" },
		nextPageAriaLabel: { default: "次のページ" },
		prevPageLabel: { default: "前へ" },
		nextPageLabel: { default: "次へ" },
		formatPageSizeOption: {
			type: Function,
			default: (e) => `${e} 件`
		},
		formatRangeLabel: {
			type: Function,
			default: (e, t, n) => n === 0 ? "0 件" : `${e}-${t} / ${n} 件`
		}
	},
	emits: [
		"update:search",
		"update:page",
		"update:pageSize",
		"click:preset",
		"reset"
	],
	setup(t, { emit: n }) {
		let i = t, l = n, u = E(), d = r(() => `dads-table-control-search-${u}`), f = r(() => `dads-table-control-page-size-${u}`), p = r(() => `dads-table-control-status-${u}`), m = r(() => {
			let e = Math.max(1, i.pageSize);
			return Math.max(1, Math.ceil(i.totalItems / e));
		}), h = r(() => i.currentPage <= 1), g = r(() => i.currentPage >= m.value), v = () => {
			h.value || l("update:page", Math.max(1, i.currentPage - 1));
		}, b = () => {
			g.value || l("update:page", Math.min(m.value, i.currentPage + 1));
		}, x = (e) => {
			let t = e.target;
			l("update:search", t.value);
		}, S = (e) => {
			let t = e.target, n = Number(t.value);
			Number.isNaN(n) || (l("update:pageSize", n), i.currentPage > 1 && l("update:page", 1));
		}, w = r(() => i.totalItems === 0 ? 0 : (i.currentPage - 1) * i.pageSize + 1), T = r(() => i.totalItems === 0 ? 0 : Math.min(i.totalItems, i.currentPage * i.pageSize)), D = r(() => i.formatRangeLabel(w.value, T.value, i.totalItems)), O = (e) => {
			l("update:search", e.query), l("click:preset", e);
		}, k = () => {
			i.searchQuery && (l("update:search", ""), l("reset"));
		};
		return (n, r) => (_(), o("div", {
			class: "dads-table-control",
			role: "group",
			"aria-label": t.ariaLabel
		}, [t.showSearch || t.showPageSize ? (_(), o("div", Xs, [t.showSearch ? (_(), o("div", Zs, [
			s("label", {
				for: d.value,
				class: "dads-table-control__label"
			}, C(t.searchLabel), 9, Qs),
			s("div", $s, [
				r[1] ||= s("i", {
					class: "mdi mdi-magnify dads-table-control__search-icon",
					"aria-hidden": "true"
				}, null, -1),
				s("input", {
					id: d.value,
					class: "dads-table-control__search-input",
					type: "search",
					value: t.searchQuery,
					placeholder: t.searchPlaceholder,
					onInput: x
				}, null, 40, ec),
				t.showReset && t.searchQuery ? (_(), o("button", {
					key: 0,
					type: "button",
					class: "dads-table-control__reset",
					"aria-label": t.resetLabel,
					onClick: k
				}, [...r[0] ||= [s("i", {
					class: "mdi mdi-close-circle",
					"aria-hidden": "true"
				}, null, -1)]], 8, tc)) : a("", !0)
			]),
			t.presets.length > 0 ? (_(), o("div", nc, [(_(!0), o(e, null, y(t.presets, (e, n) => (_(), o("button", {
				key: `${e.label}-${n}`,
				type: "button",
				role: "listitem",
				class: "dads-table-control__preset",
				"aria-pressed": t.searchQuery === e.query,
				onClick: (t) => O(e)
			}, C(e.label), 9, rc))), 128))])) : a("", !0)
		])) : a("", !0), t.showPageSize ? (_(), o("div", ic, [s("label", {
			for: f.value,
			class: "dads-table-control__label"
		}, C(t.pageSizeLabel), 9, ac), s("select", {
			id: f.value,
			class: "dads-table-control__page-size-select",
			value: t.pageSize,
			onChange: S
		}, [(_(!0), o(e, null, y(t.pageSizeOptions, (e) => (_(), o("option", {
			key: e,
			value: e
		}, C(t.formatPageSizeOption(e)), 9, sc))), 128))], 40, oc)])) : a("", !0)])) : a("", !0), t.showPagination ? (_(), o("div", cc, [s("span", {
			id: p.value,
			class: "dads-table-control__status",
			"aria-live": "polite"
		}, C(D.value), 9, lc), s("div", {
			class: "dads-table-control__buttons",
			role: "navigation",
			"aria-label": t.paginationAriaLabel
		}, [
			s("button", {
				type: "button",
				class: "dads-table-control__button dads-table-control__button--prev",
				disabled: h.value,
				"aria-label": t.prevPageAriaLabel,
				onClick: v
			}, [r[2] ||= s("i", {
				class: "mdi mdi-chevron-left",
				"aria-hidden": "true"
			}, null, -1), c(" " + C(t.prevPageLabel), 1)], 8, dc),
			s("span", {
				class: "dads-table-control__page-indicator",
				"aria-label": t.currentPageAriaLabel
			}, C(t.currentPage) + " / " + C(m.value), 9, fc),
			s("button", {
				type: "button",
				class: "dads-table-control__button dads-table-control__button--next",
				disabled: g.value,
				"aria-label": t.nextPageAriaLabel,
				onClick: b
			}, [c(C(t.nextPageLabel) + " ", 1), r[3] ||= s("i", {
				class: "mdi mdi-chevron-right",
				"aria-hidden": "true"
			}, null, -1)], 8, pc)
		], 8, uc)])) : a("", !0)], 8, Ys));
	}
}), [["__scopeId", "data-v-67002e74"]]);
//#endregion
export { Ir as DADS_DEFAULT_SWATCHES, Er as DadsAccordion, Ts as DadsBlockquote, jo as DadsBottomNavigation, on as DadsBreadcrumb, R as DadsButton, ir as DadsCard, vs as DadsCarousel, ke as DadsCheckbox, Le as DadsCheckboxGroup, yt as DadsChip, Ar as DadsChipLabel, Fr as DadsChipTag, Hr as DadsColorPicker, kt as DadsCombobox, hi as DadsDatePicker, zi as DadsDescriptionList, Bn as DadsDialog, Bn as DadsModal, Li as DadsDisclosure, mr as DadsDivider, $t as DadsDrawer, Js as DadsEmergencyBanner, mt as DadsFileUpload, Ya as DadsGlobalMenu, Aa as DadsHamburgerMenuButton, It as DadsHeader, It as DadsHeaderContainer, ur as DadsHeading, Xo as DadsImage, cs as DadsImageSlider, q as DadsInputText, q as DadsTextField, qi as DadsLanguageSelector, ys as DadsList, to as DadsMegaMenu, fa as DadsMenuList, Ta as DadsMenuListBox, Ko as DadsMobileMenu, Mn as DadsNotificationBanner, vo as DadsPageNavigation, Qn as DadsProgressIndicator, qe as DadsRadio, et as DadsRadioGroup, Fs as DadsResourceList, Va as DadsScrollTopButton, Mi as DadsSearchBox, xe as DadsSelect, gn as DadsStepNavigation, Sn as DadsTab, vr as DadsTable, mc as DadsTableControl, wo as DadsTableOfContents, $ as DadsTextarea, Gn as DadsTooltip, Ra as DadsUtilityLink };

//# sourceMappingURL=index.js.map