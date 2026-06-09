import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, defineComponent as d, mergeProps as f, nextTick as p, normalizeClass as m, normalizeStyle as h, onBeforeUnmount as g, onMounted as _, openBlock as v, ref as y, renderList as b, renderSlot as x, resolveComponent as S, resolveDynamicComponent as C, toDisplayString as w, unref as T, useAttrs as E, useId as D, useSlots as O, vShow as k, watch as A, watchEffect as j, withCtx as M, withDirectives as N, withKeys as P, withModifiers as F } from "vue";
//#region src/components/Icon/icon-registry.ts
var I = {
	account_circle: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm160.5-234.5Q343-529 343-587t39.5-97.5Q422-724 480-724t97.5 39.5Q617-645 617-587t-39.5 97.5Q538-450 480-450t-97.5-39.5ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm107.5-76Q640-172 691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140q55 0 107.5-16Zm-52-375.5Q557-553 557-587t-21.5-55.5Q514-664 480-664t-55.5 21.5Q403-621 403-587t21.5 55.5Q446-510 480-510t55.5-21.5ZM480-587Zm0 374Z\"/>"
	},
	apps: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M179-179q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19ZM179-433q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19ZM179-687q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Zm254 0q-19-19-19-47t19-47q19-19 47-19t47 19q19 19 19 47t-19 47q-19 19-47 19t-47-19Z\"/>"
	},
	arrow_forward: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z\"/>"
	},
	bookmark: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z\"/>"
	},
	calendar_today: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z\"/>"
	},
	cancel: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z\"/>"
	},
	check: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z\"/>"
	},
	check_circle: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z\"/>"
	},
	chevron_left: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z\"/>"
	},
	chevron_right: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z\"/>"
	},
	close: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z\"/>"
	},
	dashboard: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z\"/>"
	},
	description: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z\"/>"
	},
	download: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z\"/>"
	},
	draft: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z\"/>"
	},
	error: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M503.5-289.48q9.5-9.48 9.5-23.5t-9.48-23.52q-9.48-9.5-23.5-9.5t-23.52 9.48q-9.5 9.48-9.5 23.5t9.48 23.52q9.48 9.5 23.5 9.5t23.52-9.48ZM453-433h60v-253h-60v253Zm27.27 353q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z\"/>"
	},
	help: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M511-258q11-11 11-27t-11-27q-11-11-27-11t-27 11q-11 11-11 27t11 27q11 11 27 11t27-11Zm-62-135h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z\"/>"
	},
	home: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z\"/>"
	},
	info: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M453-280h60v-240h-60v240Zm50.5-323.2q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z\"/>"
	},
	keyboard_arrow_down: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z\"/>"
	},
	keyboard_arrow_up: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M480-554 283-357l-43-43 240-240 240 240-43 43-197-197Z\"/>"
	},
	keyboard_double_arrow_left: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M453-241 213-481l240-240 42 42-198 198 198 198-42 42Zm253 0L466-481l240-240 42 42-198 198 198 198-42 42Z\"/>"
	},
	keyboard_double_arrow_right: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M411-481 213-679l42-42 240 240-240 240-42-42 198-198Zm253 0L466-679l42-42 240 240-240 240-42-42 198-198Z\"/>"
	},
	label: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-520q0-24.75 17.63-42.38Q115.25-800 140-800h471q14.25 0 27 6.37 12.75 6.38 21 17.63l222 296-221 296q-8.25 11.25-21 17.62-12.75 6.38-27 6.38H140Zm0-60h471l195-260-195-260H140v520Zm236-260Z\"/>"
	},
	local_fire_department: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M220-400q0 63 28.5 118.5T328-189q-4-12-6-24.5t-2-24.5q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60q0 12-2 24.5t-6 24.5q51-37 79.5-92.5T740-400q0-54-23-105.5T651-600q-21 15-44 23.5t-46 8.5q-61 0-101-41.5T420-714v-20q-46 33-83 73t-63 83.5q-26 43.5-40 89T220-400Zm260 24-71 70q-14 14-21.5 31t-7.5 37q0 41 29 69.5t71 28.5q42 0 71-28.5t29-69.5q0-20-7.5-37T551-306l-71-70Zm0-464v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-128 86-246.5T480-840Z\"/>"
	},
	logout: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z\"/>"
	},
	menu: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z\"/>"
	},
	newspaper: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M140-120q-24.75 0-42.37-17.63Q80-155.25 80-180v-660l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v660q0 24.75-17.62 42.37Q844.75-120 820-120H140Zm0-60h310v-280H140v280Zm370 0h310v-110H510v110Zm0-170h310v-110H510v110ZM140-520h680v-120H140v120Z\"/>"
	},
	notifications: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z\"/>"
	},
	open_in_new: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z\"/>"
	},
	save: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M840-683v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h503l157 157Zm-60 27L656-780H180v600h600v-476ZM553.5-275.26q30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5 43.24 0 73.74-30.26ZM233-584h358v-143H233v143Zm-53-72v476-600 124Z\"/>"
	},
	search: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"M796-121 533-384q-30 26-70 40.5T378-329q-108 0-183-75t-75-181q0-106 75-181t182-75q106 0 180.5 75T632-585q0 43-14 83t-42 75l264 262-44 44ZM377-389q81 0 138-57.5T572-585q0-81-57-138.5T377-781q-82 0-139.5 57.5T180-585q0 81 57.5 138.5T377-389Z\"/>"
	},
	settings: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z\"/>"
	},
	warning: {
		viewBox: "0 -960 960 960",
		body: "<path d=\"m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm361.5-65.68q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68ZM454-348h60v-224h-60v224Zm26-122Z\"/>"
	}
}, L = [
	"width",
	"height",
	"viewBox",
	"role",
	"aria-label",
	"aria-hidden",
	"innerHTML"
], R = /* @__PURE__ */ d({
	__name: "DadsIcon",
	props: {
		name: {},
		size: { default: 24 },
		label: {}
	},
	setup(e) {
		let t = e, n = r(() => I[t.name]);
		({
			BASE_URL: "/",
			DEV: !1,
			MODE: "production",
			PROD: !0,
			SSR: !1
		}).DEV && j(() => {
			I[t.name] || console.warn(`[DadsIcon] アイコン "${t.name}" はレジストリに含まれていません。Material Symbols 名を確認し、必要なら scripts/generate-icon-registry.mjs で追加してください。`);
		});
		let i = r(() => typeof t.size == "number" ? `${t.size}px` : t.size), a = r(() => n.value?.viewBox ?? "0 -960 960 960"), s = r(() => n.value?.body ?? "");
		return (t, n) => (v(), o("svg", {
			class: "dads-icon",
			xmlns: "http://www.w3.org/2000/svg",
			width: i.value,
			height: i.value,
			viewBox: a.value,
			fill: "currentColor",
			role: e.label ? "img" : void 0,
			"aria-label": e.label || void 0,
			"aria-hidden": e.label ? void 0 : !0,
			innerHTML: s.value
		}, null, 8, L));
	}
}), z = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, B = /* @__PURE__ */ z(R, [["__scopeId", "data-v-161f10e2"]]), V = {
	key: 0,
	class: "dads-button__spinner",
	"aria-hidden": "true"
}, ee = { class: "dads-button__label" }, H = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let n = e, c = t, l = r(() => n.href !== void 0), u = r(() => n.disabled || n.loading), d = r(() => l.value ? "a" : "button"), p = r(() => [
			"dads-button",
			`dads-button--${n.variant}`,
			`dads-button--${n.size}`,
			`dads-button--${n.color}`,
			{
				"dads-button--block": n.block,
				"dads-button--loading": n.loading
			}
		]), m = r(() => l.value ? {
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
		}), h = (e) => {
			if (u.value) {
				e.preventDefault();
				return;
			}
			c("click", e);
		};
		return (t, n) => (v(), i(C(d.value), f({ class: p.value }, m.value, { onClick: h }), {
			default: M(() => [
				e.loading ? (v(), o("span", V)) : a("", !0),
				e.prependIcon && !e.loading ? (v(), i(B, {
					key: 1,
					name: e.prependIcon,
					size: 20,
					class: "dads-button__icon dads-button__icon--prepend"
				}, null, 8, ["name"])) : a("", !0),
				s("span", ee, [x(t.$slots, "default", {}, void 0, !0)]),
				e.appendIcon && !e.loading ? (v(), i(B, {
					key: 2,
					name: e.appendIcon,
					size: 20,
					class: "dads-button__icon dads-button__icon--append"
				}, null, 8, ["name"])) : a("", !0)
			]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-a1f456e0"]]), U = {
	key: 0,
	class: "dads-form-control-label__requirement",
	"data-required": "true"
}, te = {
	key: 1,
	class: "dads-form-control-label__requirement"
}, ne = {
	key: 2,
	class: "dads-form-control-label__status"
}, W = ["id"], G = { class: "dads-form-control-label__control" }, K = ["id"], q = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsFormControlLabel",
	props: {
		as: { default: "div" },
		size: { default: "md" },
		label: {},
		labelFor: {},
		required: {
			type: Boolean,
			default: !1
		},
		requiredLabel: { default: "※必須" },
		optionalLabel: {},
		supportText: {},
		supportTextId: {},
		errorText: {},
		errorTextId: {},
		status: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = O(), c = r(() => t.as === "fieldset" ? "legend" : "label"), u = r(() => t.as === "div" ? t.labelFor : void 0), d = r(() => !!t.label || !!n.label), f = r(() => !!t.supportText || !!n["support-text"]), p = r(() => !!t.errorText || !!n.error), m = r(() => !!t.status || !!n.status);
		return (t, n) => (v(), i(C(e.as), {
			class: "dads-form-control-label",
			"data-size": e.size,
			"data-disabled": e.disabled || void 0
		}, {
			default: M(() => [
				d.value ? (v(), i(C(c.value), {
					key: 0,
					class: "dads-form-control-label__label",
					for: u.value
				}, {
					default: M(() => [
						x(t.$slots, "label", {}, () => [l(w(e.label), 1)], !0),
						e.required ? (v(), o("span", U, w(e.requiredLabel), 1)) : e.optionalLabel ? (v(), o("span", te, w(e.optionalLabel), 1)) : a("", !0),
						m.value ? (v(), o("span", ne, [x(t.$slots, "status", {}, () => [l(w(e.status), 1)], !0)])) : a("", !0)
					]),
					_: 3
				}, 8, ["for"])) : a("", !0),
				f.value ? (v(), o("p", {
					key: 1,
					id: e.supportTextId,
					class: "dads-form-control-label__support-text"
				}, [x(t.$slots, "support-text", {}, () => [l(w(e.supportText), 1)], !0)], 8, W)) : a("", !0),
				s("div", G, [x(t.$slots, "default", {}, void 0, !0)]),
				p.value ? (v(), o("p", {
					key: 2,
					id: e.errorTextId,
					class: "dads-form-control-label__error-text"
				}, [x(t.$slots, "error", {}, () => [l(w(e.errorText), 1)], !0)], 8, K)) : a("", !0)
			]),
			_: 3
		}, 8, ["data-size", "data-disabled"]));
	}
}), [["__scopeId", "data-v-ad2b8044"]]), J = { class: "dads-input-text__control" }, Y = [
	"id",
	"type",
	"value"
], re = ["id"], ie = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		requiredLabel: { default: "※必須" }
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
		let c = t, l = D(), u = r(() => n.id ?? `dads-input-text-${l}`), d = r(() => `${u.value}-hint`), p = r(() => `${u.value}-error`), h = r(() => `${u.value}-counter`), g = r(() => n.error || !!n.errorMessage), _ = r(() => String(n.modelValue ?? "").length), y = r(() => {
			let e = [];
			return g.value && n.errorMessage ? e.push(p.value) : n.hint && e.push(d.value), n.counter !== void 0 && e.push(h.value), e.length > 0 ? e.join(" ") : void 0;
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
		})), S = r(() => g.value && n.errorMessage ? void 0 : n.hint), C = r(() => g.value ? n.errorMessage : void 0), T = (e) => {
			let t = e.target, r = n.type === "number" ? t.valueAsNumber : t.value;
			c("update:modelValue", Number.isNaN(r) ? "" : r);
		}, E = (e) => c("change", e), O = (e) => c("focus", e), k = (e) => c("blur", e);
		return (t, n) => (v(), i(q, {
			class: m(b.value),
			size: e.size,
			label: e.label,
			"label-for": u.value,
			required: e.required,
			"required-label": e.requiredLabel,
			"support-text": S.value,
			"support-text-id": d.value,
			"error-text": C.value,
			"error-text-id": p.value,
			disabled: e.disabled
		}, {
			default: M(() => [s("div", J, [
				e.prependIcon ? (v(), i(B, {
					key: 0,
					name: e.prependIcon,
					size: 20,
					class: "dads-input-text__icon dads-input-text__icon--prepend"
				}, null, 8, ["name"])) : a("", !0),
				s("input", f({
					id: u.value,
					class: "dads-input-text__input",
					type: e.type,
					value: e.modelValue
				}, x.value, {
					onInput: T,
					onChange: E,
					onFocus: O,
					onBlur: k
				}), null, 16, Y),
				e.appendIcon ? (v(), i(B, {
					key: 1,
					name: e.appendIcon,
					size: 20,
					class: "dads-input-text__icon dads-input-text__icon--append"
				}, null, 8, ["name"])) : a("", !0)
			]), e.counter === void 0 ? a("", !0) : (v(), o("span", {
				key: 0,
				id: h.value,
				class: "dads-input-text__counter"
			}, w(_.value) + " / " + w(e.counter), 9, re))]),
			_: 1
		}, 8, [
			"class",
			"size",
			"label",
			"label-for",
			"required",
			"required-label",
			"support-text",
			"support-text-id",
			"error-text",
			"error-text-id",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-025fe358"]]), X = { class: "dads-textarea__control" }, Z = [
	"id",
	"value",
	"rows"
], ae = ["id"], Q = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		requiredLabel: { default: "※必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, c = t, l = y(null), u = D(), d = r(() => n.id ?? `dads-textarea-${u}`), p = r(() => `${d.value}-hint`), h = r(() => `${d.value}-error`), b = r(() => `${d.value}-counter`), x = r(() => n.error || !!n.errorMessage), S = r(() => String(n.modelValue ?? "").length), C = r(() => n.autoResize ? n.minRows : n.rows), T = r(() => n.autoResize ? "none" : n.resize), E = r(() => !!n.hint && !(x.value && n.errorMessage)), O = r(() => x.value && !!n.errorMessage), k = r(() => {
			let e = [];
			return O.value ? e.push(h.value) : E.value && e.push(p.value), n.counter !== void 0 && e.push(b.value), e.length > 0 ? e.join(" ") : void 0;
		}), j = r(() => [
			"dads-textarea",
			`dads-textarea--${n.size}`,
			{
				"dads-textarea--disabled": n.disabled,
				"dads-textarea--readonly": n.readonly,
				"dads-textarea--error": x.value
			}
		]), N = r(() => ({
			name: n.name,
			placeholder: n.placeholder,
			autocomplete: n.autocomplete,
			maxlength: n.maxlength,
			disabled: n.disabled || void 0,
			readonly: n.readonly || void 0,
			"aria-invalid": x.value || void 0,
			"aria-required": n.required || void 0,
			"aria-describedby": k.value
		})), P = null, F = () => {
			P = null;
			let e = l.value;
			if (!e || !n.autoResize) return;
			e.style.height = "auto";
			let t = window.getComputedStyle(e), r = Number.parseFloat(t.lineHeight) || 20, i = (Number.parseFloat(t.paddingTop) || 0) + (Number.parseFloat(t.paddingBottom) || 0), a = (Number.parseFloat(t.borderTopWidth) || 0) + (Number.parseFloat(t.borderBottomWidth) || 0), o = n.minRows * r + i + a, s = n.maxRows === void 0 ? Infinity : n.maxRows * r + i + a, c = Math.min(s, Math.max(o, e.scrollHeight));
			e.style.height = `${c}px`;
		}, I = () => {
			n.autoResize && (P !== null && cancelAnimationFrame(P), P = requestAnimationFrame(F));
		};
		_(I), g(() => {
			P !== null && cancelAnimationFrame(P);
		}), A(() => n.modelValue, I, { flush: "post" });
		let L = (e) => {
			let t = e.target;
			c("update:modelValue", t.value);
		}, R = (e) => c("change", e), z = (e) => c("focus", e), B = (e) => c("blur", e);
		return (t, n) => (v(), i(q, {
			as: "div",
			class: m(j.value),
			size: e.size,
			label: e.label,
			"label-for": d.value,
			required: e.required,
			"required-label": e.requiredLabel,
			"support-text": E.value ? e.hint : void 0,
			"support-text-id": p.value,
			"error-text": O.value ? e.errorMessage : void 0,
			"error-text-id": h.value,
			disabled: e.disabled
		}, {
			default: M(() => [s("div", X, [s("textarea", f({
				id: d.value,
				ref_key: "textareaRef",
				ref: l,
				class: "dads-textarea__input",
				value: e.modelValue,
				rows: C.value,
				style: { resize: T.value }
			}, N.value, {
				onInput: L,
				onChange: R,
				onFocus: z,
				onBlur: B
			}), null, 16, Z)]), e.counter === void 0 ? a("", !0) : (v(), o("p", {
				key: 0,
				id: b.value,
				class: "dads-textarea__counter"
			}, w(S.value) + " / " + w(e.counter), 9, ae))]),
			_: 1
		}, 8, [
			"class",
			"size",
			"label",
			"label-for",
			"required",
			"required-label",
			"support-text",
			"support-text-id",
			"error-text",
			"error-text-id",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-944ce24a"]]), oe = ["for"], se = {
	key: 0,
	class: "dads-select__required",
	"aria-hidden": "true"
}, ce = { class: "dads-select__control" }, le = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-invalid",
	"aria-required",
	"aria-describedby",
	"disabled",
	"data-readonly"
], ue = { class: "dads-select__value-wrap" }, de = {
	key: 0,
	class: "dads-select__tags"
}, fe = { class: "dads-select__tag-text" }, pe = [
	"aria-label",
	"disabled",
	"onClick"
], me = {
	key: 1,
	class: "dads-select__value"
}, he = {
	key: 2,
	class: "dads-select__value"
}, ge = {
	key: 3,
	class: "dads-select__placeholder"
}, _e = ["id", "aria-multiselectable"], ve = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], ye = {
	key: 0,
	class: "dads-select__option dads-select__option--empty",
	"aria-disabled": "true"
}, be = {
	key: 1,
	class: "dads-select__footer"
}, xe = ["id"], Se = ["id"], Ce = 500, we = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let c = t, d = n, f = D(), p = r(() => c.id ?? `dads-select-${f}`), h = r(() => `${p.value}-listbox`), x = r(() => `${p.value}-hint`), S = r(() => `${p.value}-error`), C = (e) => `${p.value}-option-${e}`, T = r(() => c.error || !!c.errorMessage), E = y(!1), O = y(-1), j = y(null), M = y(null), P = (e) => e[c.itemValue], I = (e) => String(e[c.itemTitle] ?? ""), L = (e) => {
			let t = P(e);
			return c.multiple ? Array.isArray(c.modelValue) && c.modelValue.includes(t) : c.modelValue === t;
		}, R = r(() => !c.multiple || !Array.isArray(c.modelValue) ? [] : c.modelValue.map((e) => c.items.find((t) => P(t) === e)).filter((e) => e !== void 0)), z = r(() => c.multiple || c.modelValue === null || c.modelValue === void 0 ? null : c.items.find((e) => P(e) === c.modelValue) ?? null), V = r(() => E.value && O.value >= 0 ? C(O.value) : void 0), ee = r(() => {
			let e = [];
			return T.value && c.errorMessage ? e.push(S.value) : c.hint && e.push(x.value), e.length > 0 ? e.join(" ") : void 0;
		}), H = r(() => T.value && !!c.errorMessage || !!c.hint), U = r(() => [
			"dads-select",
			`dads-select--${c.size}`,
			{
				"dads-select--disabled": c.disabled,
				"dads-select--readonly": c.readonly,
				"dads-select--error": T.value,
				"dads-select--open": E.value
			}
		]), te = () => {
			for (let e = 0; e < c.items.length; e++) if (L(c.items[e])) return e;
			return -1;
		}, ne = () => c.items.findIndex((e) => !e.disabled), W = () => {
			if (c.disabled || c.readonly || E.value) return;
			E.value = !0;
			let e = te();
			O.value = e >= 0 ? e : ne(), d("open");
		}, G = (e = !1) => {
			E.value && (E.value = !1, O.value = -1, d("close"), e && M.value?.focus());
		}, K = () => {
			c.disabled || c.readonly || (E.value ? G() : W());
		}, q = (e) => {
			d("update:modelValue", e), d("change", e);
		}, J = (e) => {
			if (e.disabled) return;
			let t = P(e);
			if (c.multiple) {
				let e = Array.isArray(c.modelValue) ? [...c.modelValue] : [], n = e.indexOf(t);
				n >= 0 ? e.splice(n, 1) : e.push(t), q(e);
			} else q(t), G(!0);
		}, Y = (e) => {
			if (!c.multiple) return;
			let t = P(e);
			q(Array.isArray(c.modelValue) ? c.modelValue.filter((e) => e !== t) : []);
		}, re = (e) => {
			if (c.items.length === 0) return;
			let t = O.value;
			for (let n = 0; n < c.items.length; n++) if (t = (t + e + c.items.length) % c.items.length, !c.items[t].disabled) {
				O.value = t;
				return;
			}
		}, ie = (e) => {
			let t = e === "first" ? c.items.keys() : [...c.items.keys()].reverse();
			for (let e of t) if (!c.items[e].disabled) {
				O.value = e;
				return;
			}
		}, X = "", Z = null, ae = (e) => {
			Z !== null && clearTimeout(Z), X += e.toLowerCase(), Z = setTimeout(() => {
				X = "", Z = null;
			}, Ce);
			let t = c.items.findIndex((e) => !e.disabled && I(e).toLowerCase().startsWith(X));
			t >= 0 && (O.value = t);
		}, Q = (e) => {
			if (c.disabled || c.readonly) return;
			let { key: t } = e;
			if (!E.value) {
				if (t === "ArrowDown" || t === "ArrowUp" || t === "Enter" || t === " ") {
					e.preventDefault(), W();
					return;
				}
				t.length === 1 && /\S/.test(t) && (e.preventDefault(), W(), ae(t));
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
					e.preventDefault(), re(1);
					break;
				case "ArrowUp":
					e.preventDefault(), re(-1);
					break;
				case "Home":
					e.preventDefault(), ie("first");
					break;
				case "End":
					e.preventDefault(), ie("last");
					break;
				case "Enter":
				case " ":
					e.preventDefault(), O.value >= 0 && J(c.items[O.value]);
					break;
				default: t.length === 1 && /\S/.test(t) && (e.preventDefault(), ae(t));
			}
		}, we = (e) => {
			if (!E.value) return;
			let t = e.target;
			t && j.value && j.value.contains(t) || G();
		};
		_(() => {
			document.addEventListener("pointerdown", we, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", we, !0), Z !== null && clearTimeout(Z);
		}), A(() => c.disabled, (e) => {
			e && G();
		});
		let Te = (e) => d("focus", e), Ee = (e) => d("blur", e);
		return (n, r) => (v(), o("div", {
			ref_key: "rootRef",
			ref: j,
			class: m(U.value)
		}, [
			t.label ? (v(), o("label", {
				key: 0,
				for: p.value,
				class: "dads-select__label"
			}, [l(w(t.label) + " ", 1), t.required ? (v(), o("span", se, w(t.requiredLabel), 1)) : a("", !0)], 8, oe)) : a("", !0),
			s("div", ce, [s("button", {
				id: p.value,
				ref_key: "triggerRef",
				ref: M,
				type: "button",
				class: "dads-select__trigger",
				role: "combobox",
				"aria-haspopup": "listbox",
				"aria-expanded": E.value,
				"aria-controls": h.value,
				"aria-activedescendant": V.value,
				"aria-invalid": T.value || void 0,
				"aria-required": t.required || void 0,
				"aria-describedby": ee.value,
				disabled: t.disabled || void 0,
				"data-readonly": t.readonly || void 0,
				onClick: K,
				onKeydown: Q,
				onFocus: Te,
				onBlur: Ee
			}, [
				t.prefixIcon ? (v(), i(B, {
					key: 0,
					name: t.prefixIcon,
					class: "dads-select__prefix-icon",
					size: 20
				}, null, 8, ["name"])) : a("", !0),
				s("span", ue, [t.multiple && R.value.length > 0 && t.chips ? (v(), o("span", de, [(v(!0), o(e, null, b(R.value, (e) => (v(), o("span", {
					key: String(P(e)),
					class: "dads-select__tag"
				}, [s("span", fe, w(I(e)), 1), s("button", {
					type: "button",
					class: "dads-select__tag-remove",
					"aria-label": t.formatRemoveAriaLabel(I(e)),
					disabled: t.disabled || t.readonly || void 0,
					onClick: F((t) => Y(e), ["stop"]),
					onKeydown: r[0] ||= F(() => {}, ["stop"])
				}, " × ", 40, pe)]))), 128))])) : t.multiple && R.value.length > 0 ? (v(), o("span", me, w(R.value.map((e) => I(e)).join(", ")), 1)) : !t.multiple && z.value ? (v(), o("span", he, w(I(z.value)), 1)) : (v(), o("span", ge, w(t.placeholder), 1))]),
				u(B, {
					name: "keyboard_arrow_down",
					class: m(["dads-select__icon", { "dads-select__icon--open": E.value }]),
					size: 20
				}, null, 8, ["class"])
			], 40, le), N(s("ul", {
				id: h.value,
				class: "dads-select__listbox",
				role: "listbox",
				"aria-multiselectable": t.multiple || void 0,
				tabindex: "-1"
			}, [(v(!0), o(e, null, b(t.items, (e, t) => (v(), o("li", {
				id: C(t),
				key: String(P(e)),
				role: "option",
				"aria-selected": L(e),
				"aria-disabled": e.disabled || void 0,
				class: m(["dads-select__option", {
					"dads-select__option--active": t === O.value,
					"dads-select__option--selected": L(e),
					"dads-select__option--disabled": e.disabled
				}]),
				onClick: (t) => J(e),
				onMouseenter: (n) => !e.disabled && (O.value = t)
			}, w(I(e)), 43, ve))), 128)), t.items.length === 0 ? (v(), o("li", ye, " 選択肢がありません ")) : a("", !0)], 8, _e), [[k, E.value]])]),
			H.value ? (v(), o("div", be, [T.value && t.errorMessage ? (v(), o("span", {
				key: 0,
				id: S.value,
				class: "dads-select__error",
				role: "alert"
			}, w(t.errorMessage), 9, xe)) : t.hint ? (v(), o("span", {
				key: 1,
				id: x.value,
				class: "dads-select__hint"
			}, w(t.hint), 9, Se)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-09c0d439"]]), Te = ["data-size"], Ee = { class: "dads-checkbox__checkbox" }, De = [
	"id",
	"checked",
	"value"
], Oe = {
	key: 0,
	class: "dads-checkbox__label"
}, ke = {
	key: 0,
	class: "dads-checkbox__requirement",
	"data-required": "true",
	"aria-hidden": "true"
}, Ae = {
	key: 0,
	class: "dads-checkbox-field__footer"
}, je = ["id"], Me = ["id"], Ne = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		name: {},
		id: {},
		value: { type: [
			String,
			Number,
			Boolean
		] },
		requiredLabel: { default: "※必須" }
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, c = E(), u = r(() => {
			let e = {};
			for (let t of Object.keys(c)) t === "class" || t === "style" || t === "id" || t.startsWith("on") || (e[t] = c[t]);
			return e;
		}), d = r(() => {
			let e = {};
			return c.class !== void 0 && (e.class = c.class), c.style !== void 0 && (e.style = c.style), e;
		}), p = y(null), m = D(), h = r(() => n.id ?? `dads-checkbox-${m}`), g = r(() => `${h.value}-hint`), b = r(() => `${h.value}-error`), x = r(() => n.error || !!n.errorMessage), S = r(() => {
			if (x.value && n.errorMessage) return b.value;
			if (n.hint) return g.value;
		}), C = r(() => ["dads-checkbox-field", {
			"dads-checkbox-field--disabled": n.disabled,
			"dads-checkbox-field--error": x.value
		}]), T = r(() => ({
			name: n.name,
			disabled: n.disabled || void 0,
			"aria-checked": n.indeterminate ? "mixed" : void 0,
			"aria-invalid": x.value || void 0,
			"aria-required": n.required || void 0,
			"aria-describedby": S.value
		})), O = r(() => x.value && !!n.errorMessage || !!n.hint), k = () => {
			p.value && (p.value.indeterminate = n.indeterminate);
		};
		_(k), A(() => n.indeterminate, k);
		let j = (e) => {
			let t = e.target;
			i("update:modelValue", t.checked), i("change", e);
		}, M = (e) => i("focus", e), N = (e) => i("blur", e);
		return (t, n) => (v(), o("div", f({ class: C.value }, d.value), [s("label", {
			class: "dads-checkbox",
			"data-size": e.size
		}, [s("span", Ee, [s("input", f({
			id: h.value,
			ref_key: "inputRef",
			ref: p,
			type: "checkbox",
			class: "dads-checkbox__input",
			checked: e.modelValue,
			value: e.value
		}, {
			...T.value,
			...u.value
		}, {
			onChange: j,
			onFocus: M,
			onBlur: N
		}), null, 16, De)]), e.label ? (v(), o("span", Oe, [l(w(e.label) + " ", 1), e.required ? (v(), o("span", ke, w(e.requiredLabel), 1)) : a("", !0)])) : a("", !0)], 8, Te), O.value ? (v(), o("div", Ae, [x.value && e.errorMessage ? (v(), o("p", {
			key: 0,
			id: b.value,
			class: "dads-checkbox-field__error-text"
		}, w(e.errorMessage), 9, je)) : e.hint ? (v(), o("p", {
			key: 1,
			id: g.value,
			class: "dads-checkbox-field__support-text"
		}, w(e.hint), 9, Me)) : a("", !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-4845056e"]]), Pe = { class: "dads-checkbox-group__items" }, Fe = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		requiredLabel: { default: "※必須" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let a = t, c = n, l = D(), u = r(() => a.id ?? `dads-checkbox-group-${l}`), d = r(() => `${u.value}-hint`), f = r(() => `${u.value}-error`), p = r(() => a.error || !!a.errorMessage), h = r(() => {
			if (p.value && a.errorMessage) return f.value;
			if (a.hint) return d.value;
		}), g = r(() => p.value && a.errorMessage ? void 0 : a.hint), _ = r(() => p.value ? a.errorMessage : void 0), y = r(() => [
			"dads-checkbox-group",
			`dads-checkbox-group--${a.direction}`,
			{
				"dads-checkbox-group--error": p.value,
				"dads-checkbox-group--disabled": a.disabled
			}
		]), x = (e) => a.modelValue?.includes(e) ?? !1, S = (e, t, n) => n ? e.includes(t) ? [...e] : [...e, t] : e.filter((e) => e !== t), C = (e, t) => {
			let n = S(a.modelValue ?? [], e, t);
			c("update:modelValue", n), c("change", n);
		};
		return (n, r) => (v(), i(q, {
			id: u.value,
			as: "fieldset",
			class: m(y.value),
			size: t.size,
			label: t.legend,
			required: t.required,
			"required-label": t.requiredLabel,
			"support-text": g.value,
			"support-text-id": d.value,
			"error-text": _.value,
			"error-text-id": f.value,
			disabled: t.disabled || void 0,
			"aria-invalid": p.value || void 0,
			"aria-describedby": h.value
		}, {
			default: M(() => [s("div", Pe, [(v(!0), o(e, null, b(t.items, (e) => (v(), i(Ne, {
				key: String(e.value),
				"model-value": x(e.value),
				label: e.label,
				hint: e.hint,
				disabled: e.disabled || t.disabled,
				size: t.size,
				name: t.name,
				value: e.value,
				error: p.value,
				"onUpdate:modelValue": (t) => C(e.value, t)
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
			]))), 128))])]),
			_: 1
		}, 8, [
			"id",
			"class",
			"size",
			"label",
			"required",
			"required-label",
			"support-text",
			"support-text-id",
			"error-text",
			"error-text-id",
			"disabled",
			"aria-invalid",
			"aria-describedby"
		]));
	}
}), [["__scopeId", "data-v-4edd4ac1"]]), Ie = ["data-size"], Le = { class: "dads-radio__radio" }, Re = [
	"id",
	"name",
	"value",
	"checked",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], ze = {
	key: 0,
	class: "dads-radio__label"
}, Be = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		ariaDescribedby: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, c = D(), l = r(() => n.id ?? `dads-radio-${c}`), u = r(() => n.modelValue === n.value), d = (e) => {
			i("update:modelValue", n.value), i("change", e);
		}, f = (e) => i("focus", e), p = (e) => i("blur", e);
		return (t, n) => (v(), o("label", {
			class: "dads-radio",
			"data-size": e.size
		}, [s("span", Le, [s("input", {
			id: l.value,
			type: "radio",
			class: "dads-radio__input",
			name: e.name,
			value: e.value,
			checked: u.value,
			disabled: e.disabled || void 0,
			"aria-invalid": e.error || void 0,
			"aria-describedby": e.ariaDescribedby,
			onChange: d,
			onFocus: f,
			onBlur: p
		}, null, 40, Re)]), e.label ? (v(), o("span", ze, w(e.label), 1)) : a("", !0)], 8, Ie));
	}
}), [["__scopeId", "data-v-e5814c88"]]), Ve = { class: "dads-radio-group__legend-visually-hidden" }, He = { class: "dads-radio-group__items" }, Ue = ["id"], We = ["id"], Ge = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		requiredLabel: { default: "※必須" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let l = t, d = n, f = D(), p = r(() => l.id ?? `dads-radio-group-${f}`), h = r(() => l.name ?? `dads-radio-group-name-${f}`), g = r(() => `${p.value}-hint`), _ = r(() => `${p.value}-error`), y = r(() => l.error || !!l.errorMessage), x = r(() => {
			if (y.value && l.errorMessage) return _.value;
			if (l.hint) return g.value;
		}), S = r(() => l.size), C = r(() => [
			"dads-radio-group",
			`dads-radio-group--${l.direction}`,
			{
				"dads-radio-group--error": y.value,
				"dads-radio-group--disabled": l.disabled
			}
		]), T = (e) => {
			d("update:modelValue", e), d("change", e);
		}, E = (e) => `${p.value}-item-${String(e)}-description`, O = (e) => `${p.value}-item-${String(e)}-hint`, k = (e) => {
			let t = [];
			return e.description && t.push(E(e.value)), e.hint && t.push(O(e.value)), t.length > 0 ? t.join(" ") : void 0;
		};
		return (n, r) => (v(), i(q, {
			id: p.value,
			as: "fieldset",
			class: m(C.value),
			size: S.value,
			label: t.legend,
			required: t.required,
			"required-label": t.requiredLabel,
			"support-text": t.hint,
			"support-text-id": g.value,
			"error-text": y.value && t.errorMessage ? t.errorMessage : void 0,
			"error-text-id": _.value,
			disabled: t.disabled,
			"aria-invalid": y.value || void 0,
			"aria-describedby": x.value
		}, c({
			default: M(() => [s("div", He, [(v(!0), o(e, null, b(t.items, (e) => (v(), o("div", {
				key: String(e.value),
				class: "dads-radio-group__item"
			}, [
				u(Be, {
					"model-value": t.modelValue ?? null,
					value: e.value,
					label: e.label,
					disabled: e.disabled || t.disabled,
					size: t.size,
					name: h.value,
					error: y.value,
					"aria-describedby": k(e),
					"onUpdate:modelValue": T
				}, null, 8, [
					"model-value",
					"value",
					"label",
					"disabled",
					"size",
					"name",
					"error",
					"aria-describedby"
				]),
				e.description ? (v(), o("p", {
					key: 0,
					id: E(e.value),
					class: "dads-radio__description dads-form-control-label__support-text"
				}, w(e.description), 9, Ue)) : a("", !0),
				e.hint ? (v(), o("p", {
					key: 1,
					id: O(e.value),
					class: "dads-radio__support-text dads-form-control-label__support-text"
				}, w(e.hint), 9, We)) : a("", !0)
			]))), 128))])]),
			_: 2
		}, [t.legend && t.legendVisuallyHidden ? {
			name: "label",
			fn: M(() => [s("span", Ve, w(t.legend), 1)]),
			key: "0"
		} : void 0]), 1032, [
			"id",
			"class",
			"size",
			"label",
			"required",
			"required-label",
			"support-text",
			"support-text-id",
			"error-text",
			"error-text-id",
			"disabled",
			"aria-invalid",
			"aria-describedby"
		]));
	}
}), [["__scopeId", "data-v-51b58cc1"]]), Ke = ["for"], qe = {
	key: 0,
	class: "dads-file-upload__required",
	"aria-hidden": "true"
}, Je = ["disabled"], Ye = { class: "dads-file-upload__dropzone-text" }, Xe = ["id"], Ze = {
	key: 1,
	class: "dads-file-upload__file-list"
}, Qe = { class: "dads-file-upload__file-name" }, $e = {
	key: 0,
	class: "dads-file-upload__file-size"
}, et = [
	"aria-label",
	"disabled",
	"onClick"
], tt = ["aria-valuenow"], nt = {
	key: 3,
	class: "dads-file-upload__footer"
}, rt = ["id"], it = ["id"], at = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsFileUpload",
	props: {
		modelValue: {},
		accept: {},
		multiple: {
			type: Boolean,
			default: !1
		},
		maxSize: {},
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
		let i = t, c = n, u = y(null), d = D(), p = r(() => i.id ?? `dads-file-upload-${d}`), g = r(() => `${p.value}-hint`), _ = r(() => `${p.value}-error`), x = y(!1), S = y(null), C = r(() => S.value ?? i.errorMessage), T = r(() => i.error || !!C.value), E = r(() => i.disabled || i.readonly), O = r(() => {
			let e = i.modelValue;
			return e == null ? [] : Array.isArray(e) ? e : [e];
		}), k = r(() => ["dads-file-upload", {
			"dads-file-upload--disabled": i.disabled,
			"dads-file-upload--readonly": i.readonly,
			"dads-file-upload--error": T.value,
			"dads-file-upload--expand-drop": i.expandDropArea,
			"dads-file-upload--dragover": x.value && i.expandDropArea
		}]), A = r(() => {
			if (T.value && C.value) return _.value;
			if (i.hint) return g.value;
		}), j = r(() => ({
			name: i.name,
			accept: i.accept,
			multiple: i.multiple || void 0,
			disabled: E.value || void 0,
			required: i.required || void 0,
			"aria-invalid": T.value || void 0,
			"aria-required": i.required || void 0,
			"aria-describedby": A.value
		})), M = r(() => T.value && !!C.value || !!i.hint), N = (e, t) => t.length === 0 ? !0 : t.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t), P = (e) => {
			if (i.maxSize !== void 0) {
				let t = e.find((e) => e.size > i.maxSize);
				if (t) return `${t.name} はサイズ上限を超えています`;
			}
			if (i.accept) {
				let t = i.accept.split(",").map((e) => e.trim()).filter(Boolean), n = e.find((e) => !N(e, t));
				if (n) return `${n.name} は許可された形式ではありません`;
			}
			return null;
		}, I = (e) => {
			i.multiple ? c("update:modelValue", e) : c("update:modelValue", e[0] ?? null);
		}, L = (e) => {
			if (E.value || e.length === 0) return;
			let t = P(e);
			if (t) {
				S.value = t;
				return;
			}
			S.value = null;
			let n = i.multiple ? e : e.slice(0, 1);
			c("change", n), I(n);
		}, R = () => {
			E.value || u.value?.click();
		}, z = (e) => {
			let t = e.target, n = t.files;
			n && (L(Array.from(n)), t.value = "");
		}, B = () => {
			E.value || (x.value = !0);
		}, V = () => {
			x.value = !1;
		}, ee = (e) => {
			if (x.value = !1, E.value) return;
			let t = e.dataTransfer?.files;
			t && L(Array.from(t));
		}, H = (e) => {
			E.value || (c("remove", e), I(O.value.filter((t) => t !== e)), S.value = null);
		}, U = (e) => e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : e < 1024 * 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${(e / 1024 / 1024 / 1024).toFixed(1)} GB`, te = (e) => c("focus", e), ne = (e) => c("blur", e);
		return (n, r) => (v(), o("div", { class: m(k.value) }, [
			t.label ? (v(), o("label", {
				key: 0,
				for: p.value,
				class: "dads-file-upload__label"
			}, [l(w(t.label) + " ", 1), t.required ? (v(), o("span", qe, w(t.requiredLabel), 1)) : a("", !0)], 8, Ke)) : a("", !0),
			s("div", {
				class: m(["dads-file-upload__dropzone", { "dads-file-upload__dropzone--dragover": x.value }]),
				onDragover: F(B, ["prevent"]),
				onDragleave: F(V, ["prevent"]),
				onDrop: F(ee, ["prevent"])
			}, [
				s("button", {
					type: "button",
					class: "dads-file-upload__button",
					disabled: E.value,
					onClick: R
				}, w(t.buttonText), 9, Je),
				s("span", Ye, w(t.dropzoneText), 1),
				s("input", f({
					id: p.value,
					ref_key: "inputRef",
					ref: u,
					type: "file",
					class: "dads-file-upload__input"
				}, j.value, {
					onChange: z,
					onFocus: te,
					onBlur: ne
				}), null, 16, Xe)
			], 34),
			O.value.length > 0 ? (v(), o("ul", Ze, [(v(!0), o(e, null, b(O.value, (e) => (v(), o("li", {
				key: `${e.name}-${e.size}-${e.lastModified}`,
				class: "dads-file-upload__file-item"
			}, [
				s("span", Qe, w(e.name), 1),
				t.showFileSize ? (v(), o("span", $e, w(U(e.size)), 1)) : a("", !0),
				s("button", {
					type: "button",
					class: "dads-file-upload__remove",
					"aria-label": t.formatRemoveLabel(e.name),
					disabled: E.value,
					onClick: (t) => H(e)
				}, " × ", 8, et)
			]))), 128))])) : a("", !0),
			t.progress === void 0 ? a("", !0) : (v(), o("div", {
				key: 2,
				class: "dads-file-upload__progress",
				role: "progressbar",
				"aria-valuenow": t.progress,
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "dads-file-upload__progress-bar",
				style: h({ width: `${t.progress}%` })
			}, null, 4)], 8, tt)),
			M.value ? (v(), o("div", nt, [T.value && C.value ? (v(), o("span", {
				key: 0,
				id: _.value,
				class: "dads-file-upload__error",
				role: "alert"
			}, w(C.value), 9, rt)) : t.hint ? (v(), o("span", {
				key: 1,
				id: g.value,
				class: "dads-file-upload__hint"
			}, w(t.hint), 9, it)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-72e0113d"]]), ot = {
	key: 0,
	class: "dads-chip-tag__prepend",
	"aria-hidden": "true"
}, st = { class: "dads-chip-tag__label" }, ct = {
	key: 1,
	class: "dads-chip-tag__append",
	"aria-hidden": "true"
}, lt = ["aria-label", "disabled"], ut = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		]), d = r(() => !n.clickable && n.disabled ? "true" : void 0), f = (e) => {
			!n.clickable || n.disabled || c("click", e);
		}, p = (e) => {
			!n.clickable || n.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), c("click", e));
		}, h = (e) => {
			n.disabled || c("close", e);
		};
		return (t, n) => (v(), i(C(e.clickable ? "button" : "span"), {
			type: e.clickable ? "button" : void 0,
			class: m(l.value),
			role: e.clickable ? "button" : void 0,
			tabindex: e.clickable && !e.disabled ? 0 : void 0,
			disabled: e.clickable && e.disabled || void 0,
			"aria-disabled": d.value,
			"aria-label": e.ariaLabel,
			onClick: f,
			onKeydown: p
		}, {
			default: M(() => [
				t.$slots.prepend ? (v(), o("span", ot, [x(t.$slots, "prepend", {}, void 0, !0)])) : a("", !0),
				s("span", st, [x(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.append && !e.closable ? (v(), o("span", ct, [x(t.$slots, "append", {}, void 0, !0)])) : a("", !0),
				e.closable ? (v(), o("button", {
					key: 2,
					type: "button",
					class: "dads-chip-tag__close",
					"aria-label": e.closeLabel,
					disabled: e.disabled,
					onClick: F(h, ["stop"])
				}, [u(B, {
					name: "close",
					size: 16
				})], 8, lt)) : a("", !0)
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
}), [["__scopeId", "data-v-7e8f8eb5"]]), dt = ["for"], ft = {
	key: 0,
	class: "dads-combobox__required",
	"aria-hidden": "true"
}, pt = {
	key: 0,
	class: "dads-combobox__chip-list"
}, mt = [
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
], ht = ["id", "aria-multiselectable"], gt = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onMousedown",
	"onMouseenter"
], _t = {
	key: 1,
	class: "dads-combobox__footer"
}, vt = ["id"], yt = ["id"], bt = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let i = t, c = n, d = D(), f = r(() => i.id ?? `dads-combobox-${d}`), p = r(() => `${f.value}-listbox`), h = r(() => `${f.value}-hint`), x = r(() => `${f.value}-error`), S = (e) => `${f.value}-option-${e}`, C = r(() => i.error || !!i.errorMessage), T = y(null), E = y(null), O = y(!1), j = y(-1), P = y(""), F = (e) => e[i.itemValue], I = (e) => String(e[i.itemTitle] ?? ""), L = (e, t) => t ? I(e).toLowerCase().includes(t.toLowerCase()) : !0, R = r(() => {
			let e = i.filter ?? L;
			return i.items.filter((t) => e(t, P.value));
		}), z = () => Array.isArray(i.modelValue) ? i.modelValue : [], B = r(() => i.multiple ? z() : []), V = r(() => i.multiple || i.modelValue === null || i.modelValue === void 0 || i.modelValue === "" ? null : i.items.find((e) => F(e) === i.modelValue) ?? null), ee = (e) => {
			let t = i.items.find((t) => F(t) === e);
			return t ? I(t) : String(e);
		}, H = r(() => O.value && j.value >= 0 ? S(j.value) : void 0), U = r(() => {
			let e = [];
			return C.value && i.errorMessage ? e.push(x.value) : i.hint && e.push(h.value), e.length > 0 ? e.join(" ") : void 0;
		}), te = r(() => C.value && !!i.errorMessage || !!i.hint), ne = r(() => [
			"dads-combobox",
			`dads-combobox--${i.size}`,
			{
				"dads-combobox--disabled": i.disabled,
				"dads-combobox--readonly": i.readonly,
				"dads-combobox--error": C.value,
				"dads-combobox--open": O.value,
				"dads-combobox--multiple": i.multiple
			}
		]);
		A(() => [
			i.modelValue,
			i.items,
			i.multiple
		], () => {
			i.multiple || (V.value ? P.value = I(V.value) : i.modelValue === null || i.modelValue === void 0 ? P.value = "" : P.value = String(i.modelValue));
		}, { immediate: !0 });
		let W = () => R.value.findIndex((e) => !e.disabled), G = () => {
			i.disabled || i.readonly || O.value || (O.value = !0, R.value.length === 0 ? j.value = -1 : j.value = W());
		}, K = () => {
			O.value && (O.value = !1, j.value = -1);
		}, q = (e) => {
			c("update:modelValue", e), c("change", e);
		}, J = (e) => {
			let t = R.value;
			if (t.length === 0) {
				j.value = -1;
				return;
			}
			let n = j.value < 0 ? e === 1 ? -1 : 0 : j.value;
			for (let r = 0; r < t.length; r++) if (n = (n + e + t.length) % t.length, !t[n].disabled) {
				j.value = n;
				return;
			}
		}, Y = (e) => {
			let t = e.trim();
			if (!t) return;
			let n = i.items.find((e) => String(F(e)) === t || I(e) === t);
			if (n && n.disabled) return;
			let r = n ? F(n) : t;
			if (i.multiple) {
				let e = z();
				e.some((e) => e === r) || q([...e, r]), P.value = "", j.value = R.value.length > 0 ? W() : -1;
			} else q(r), P.value = n ? I(n) : String(r), K();
		}, re = (e) => {
			i.multiple && q(z().filter((t) => t !== e));
		}, ie = (e) => {
			P.value = e.target.value, O.value ||= !0, j.value = R.value.length > 0 ? W() : -1;
		}, X = (e) => {
			if (i.disabled || i.readonly) return;
			let { key: t } = e;
			switch (t) {
				case "ArrowDown":
					e.preventDefault(), O.value ? J(1) : G();
					break;
				case "ArrowUp":
					e.preventDefault(), O.value ? J(-1) : G();
					break;
				case "Enter": {
					e.preventDefault();
					let t = R.value;
					O.value && j.value >= 0 && t[j.value] ? Y(String(F(t[j.value]))) : P.value.trim() && Y(P.value);
					break;
				}
				case "Escape":
					O.value && (e.preventDefault(), K());
					break;
				case "Tab":
					K();
					break;
				case "Backspace": {
					if (!i.multiple || P.value !== "") break;
					let e = z();
					e.length > 0 && q(e.slice(0, -1));
					break;
				}
				default: break;
			}
		}, Z = (e) => {
			!i.disabled && !i.readonly && G(), c("focus", e);
		}, ae = (e) => {
			c("blur", e);
		}, Q = (e) => {
			let t = e.target;
			t && t === T.value || t?.closest(".dads-chip-tag__close") || (e.preventDefault(), T.value?.focus());
		}, oe = (e, t) => {
			e.preventDefault(), !t.disabled && Y(String(F(t)));
		}, se = (e) => {
			if (!O.value) return;
			let t = e.target;
			t && E.value && E.value.contains(t) || K();
		};
		return _(() => {
			document.addEventListener("pointerdown", se, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", se, !0);
		}), A(() => i.disabled, (e) => {
			e && K();
		}), (n, r) => (v(), o("div", {
			ref_key: "rootRef",
			ref: E,
			class: m(ne.value)
		}, [
			t.label ? (v(), o("label", {
				key: 0,
				for: f.value,
				class: "dads-combobox__label"
			}, [l(w(t.label) + " ", 1), t.required ? (v(), o("span", ft, w(t.requiredLabel), 1)) : a("", !0)], 8, dt)) : a("", !0),
			s("div", {
				class: "dads-combobox__control",
				onMousedown: Q
			}, [t.multiple && B.value.length > 0 ? (v(), o("ul", pt, [(v(!0), o(e, null, b(B.value, (e) => (v(), o("li", {
				key: String(e),
				class: "dads-combobox__chip-item"
			}, [u(ut, {
				size: "sm",
				closable: !t.disabled && !t.readonly,
				disabled: t.disabled,
				onClose: (t) => re(e)
			}, {
				default: M(() => [l(w(ee(e)), 1)]),
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
				"aria-invalid": C.value || void 0,
				"aria-required": t.required || void 0,
				"aria-describedby": U.value,
				"aria-expanded": O.value,
				"aria-controls": p.value,
				"aria-activedescendant": H.value,
				"aria-autocomplete": "list",
				onInput: ie,
				onKeydown: X,
				onFocus: Z,
				onBlur: ae
			}, null, 40, mt)], 32),
			N(s("ul", {
				id: p.value,
				class: "dads-combobox__suggestions",
				role: "listbox",
				"aria-multiselectable": t.multiple || void 0
			}, [(v(!0), o(e, null, b(R.value, (e, t) => (v(), o("li", {
				id: S(t),
				key: String(F(e)),
				role: "option",
				"aria-selected": t === j.value,
				"aria-disabled": e.disabled || void 0,
				class: m(["dads-combobox__suggestion", {
					"dads-combobox__suggestion--active": t === j.value,
					"dads-combobox__suggestion--disabled": e.disabled
				}]),
				onMousedown: (t) => oe(t, e),
				onMouseenter: (n) => !e.disabled && (j.value = t)
			}, w(I(e)), 43, gt))), 128))], 8, ht), [[k, O.value && R.value.length > 0]]),
			te.value ? (v(), o("div", _t, [C.value && t.errorMessage ? (v(), o("span", {
				key: 0,
				id: x.value,
				class: "dads-combobox__error",
				role: "alert"
			}, w(t.errorMessage), 9, vt)) : t.hint ? (v(), o("span", {
				key: 1,
				id: h.value,
				class: "dads-combobox__hint"
			}, w(t.hint), 9, yt)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-254fc9b8"]]), xt = { class: "dads-header-container__inner" }, St = [
	"aria-label",
	"aria-expanded",
	"aria-controls"
], Ct = {
	key: 1,
	class: "dads-header-container__logo"
}, wt = ["aria-label"], Tt = {
	key: 3,
	class: "dads-header-container__utility"
}, Et = {
	key: 4,
	class: "dads-header-container__actions"
}, Dt = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		menuExpanded: {
			type: Boolean,
			default: !1
		},
		menuControls: {},
		navAriaLabel: { default: "メインナビゲーション" },
		variant: { default: "wide-full" },
		logoLabel: {},
		logoHref: {}
	},
	emits: ["click:menu"],
	setup(e, { emit: t }) {
		let n = e, c = t, d = O(), f = r(() => [
			"dads-header-container",
			`dads-header-container--${n.variant}`,
			{ "dads-header-container--sticky": n.sticky }
		]), p = r(() => !!d.logo || !!n.logoLabel), h = (e) => c("click:menu", e);
		return (t, n) => (v(), o("header", { class: m(f.value) }, [s("div", xt, [
			e.showMenuToggle ? (v(), o("button", {
				key: 0,
				type: "button",
				class: "dads-header-container__menu-toggle",
				"aria-label": e.menuToggleLabel,
				"aria-expanded": e.menuExpanded,
				"aria-controls": e.menuControls,
				onClick: h
			}, [u(B, {
				name: "menu",
				size: 24
			})], 8, St)) : a("", !0),
			p.value ? (v(), o("div", Ct, [x(t.$slots, "logo", {}, () => [(v(), i(C(e.logoHref ? "a" : "strong"), {
				href: e.logoHref,
				class: "dads-header-container__logo-text"
			}, {
				default: M(() => [l(w(e.logoLabel), 1)]),
				_: 1
			}, 8, ["href"]))], !0)])) : a("", !0),
			t.$slots.nav ? (v(), o("nav", {
				key: 2,
				class: "dads-header-container__nav",
				"aria-label": e.navAriaLabel
			}, [x(t.$slots, "nav", {}, void 0, !0)], 8, wt)) : a("", !0),
			t.$slots.utility ? (v(), o("div", Tt, [x(t.$slots, "utility", {}, void 0, !0)])) : a("", !0),
			t.$slots.actions ? (v(), o("div", Et, [x(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		])], 2));
	}
}), [["__scopeId", "data-v-63d4637b"]]), Ot = [
	"aria-expanded",
	"aria-controls",
	"aria-label",
	"disabled"
], kt = {
	key: 0,
	class: "dads-hamburger-menu-button__icon",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	"aria-hidden": "true"
}, At = {
	key: 1,
	class: "dads-hamburger-menu-button__icon",
	width: "24",
	height: "24",
	viewBox: "0 0 120 120",
	"aria-hidden": "true"
}, jt = {
	key: 2,
	class: "dads-hamburger-menu-button__label"
}, Mt = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		]), u = r(() => n.variant === "icon-only"), d = r(() => u.value ? f.value : void 0), f = r(() => c.value ? n.closeLabel : n.openLabel), p = (e) => {
			if (n.disabled) {
				e.preventDefault();
				return;
			}
			i("update:modelValue", !c.value), i("click", e);
		};
		return (t, n) => (v(), o("button", {
			type: "button",
			class: m(l.value),
			"aria-expanded": c.value,
			"aria-controls": e.ariaControls,
			"aria-label": d.value,
			disabled: e.disabled || void 0,
			onClick: p
		}, [c.value ? (v(), o("svg", At, [...n[1] ||= [s("path", {
			d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
			fill: "currentcolor"
		}, null, -1)]])) : (v(), o("svg", kt, [...n[0] ||= [s("path", {
			d: "M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z",
			fill: "currentcolor"
		}, null, -1)]])), u.value ? a("", !0) : (v(), o("span", jt, w(f.value), 1))], 10, Ot));
	}
}), [["__scopeId", "data-v-1f9c43e9"]]), Nt = ["data-placement"], Pt = { class: "dads-drawer__header" }, Ft = { class: "dads-drawer__body" }, It = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsDrawer",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		title: { default: "メニュー" },
		placement: { default: "left" },
		closeLabel: { default: "閉じる" }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = y(null), a = D(), c = `dads-drawer-${a}`, l = `dads-drawer-heading-${a}`, d = () => {
			r("update:modelValue", !1);
		}, f = (e) => {
			let t = i.value;
			t && (e ? typeof t.showModal == "function" ? t.open || t.showModal() : t.setAttribute("open", "") : typeof t.close == "function" ? t.open && t.close() : t.removeAttribute("open"));
		};
		_(() => f(n.modelValue)), A(() => n.modelValue, f);
		let p = () => {
			n.modelValue && d();
		}, m = (e) => {
			e.target === i.value && d();
		};
		return (t, n) => (v(), o("dialog", {
			id: c,
			ref_key: "dialogRef",
			ref: i,
			class: "dads-drawer",
			"data-placement": e.placement,
			"aria-labelledby": l,
			onClose: p,
			onClick: m
		}, [
			s("h2", {
				id: l,
				class: "dads-u-visually-hidden"
			}, w(e.title), 1),
			s("div", Pt, [u(Mt, {
				"model-value": !0,
				ariaControls: c,
				"close-label": e.closeLabel,
				onClick: d
			}, null, 8, ["close-label"])]),
			s("div", Ft, [x(t.$slots, "default", {}, void 0, !0)])
		], 40, Nt));
	}
}), [["__scopeId", "data-v-e1fe279e"]]), Lt = ["aria-labelledby"], Rt = ["id"], zt = { class: "dads-breadcrumb__list" }, Bt = ["href", "onClick"], Vt = ["aria-current", "aria-disabled"], Ht = {
	key: 2,
	class: "dads-breadcrumb__separator",
	"aria-hidden": "true"
}, Ut = {
	key: 0,
	class: "dads-breadcrumb__separator-icon",
	width: "12",
	height: "12",
	viewBox: "0 0 12 12",
	"aria-hidden": "true"
}, Wt = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsBreadcrumb",
	props: {
		items: {},
		separator: {},
		ariaLabel: { default: "現在位置" }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let i = t, c = D(), u = r(() => `dads-breadcrumb-label-${c}`), d = n, f = r(() => i.items.map((e, t) => {
			let n = t === i.items.length - 1;
			return {
				item: e,
				index: t,
				isLast: n,
				isDisabled: !n && !!e.disabled,
				isLink: !n && !!e.href && !e.disabled
			};
		})), p = (e, t, n) => {
			d("click:item", e, t, n);
		};
		return (n, r) => (v(), o("nav", {
			class: "dads-breadcrumb",
			"aria-labelledby": u.value
		}, [s("span", {
			id: u.value,
			class: "dads-breadcrumb__label"
		}, w(t.ariaLabel), 9, Rt), s("ol", zt, [(v(!0), o(e, null, b(f.value, (n) => (v(), o("li", {
			key: n.index,
			class: "dads-breadcrumb__item"
		}, [n.isLink ? (v(), o("a", {
			key: 0,
			href: n.item.href,
			class: "dads-breadcrumb__link",
			onClick: (e) => p(n.item, n.index, e)
		}, w(n.item.title), 9, Bt)) : (v(), o("span", {
			key: 1,
			class: m(["dads-breadcrumb__current", { "dads-breadcrumb__current--disabled": n.isDisabled }]),
			"aria-current": n.isLast ? "page" : void 0,
			"aria-disabled": n.isDisabled ? "true" : void 0
		}, w(n.item.title), 11, Vt)), n.isLast ? a("", !0) : (v(), o("span", Ht, [t.separator ? (v(), o(e, { key: 1 }, [l(w(t.separator), 1)], 64)) : (v(), o("svg", Ut, [...r[0] ||= [s("path", {
			d: "M4.5 11L4 10.5L8 6.5L4 2.5L4.5 2L9 6.5L4.5 11Z",
			fill: "currentColor"
		}, null, -1)]]))]))]))), 128))])], 8, Lt));
	}
}), [["__scopeId", "data-v-4d588ec8"]]), Gt = [
	"data-orientation",
	"data-size",
	"aria-label"
], Kt = { class: "dads-u-visually-hidden" }, qt = [
	"data-state",
	"data-first",
	"data-last",
	"aria-current"
], Jt = { class: "dads-step-navigation__number" }, Yt = {
	key: 0,
	class: "dads-step-navigation__state-icon"
}, Xt = {
	key: 1,
	class: "dads-step-navigation__state-icon"
}, Zt = {
	key: 2,
	class: "dads-step-navigation__state-icon"
}, Qt = {
	key: 3,
	class: "dads-step-navigation__state-label"
}, $t = {
	key: 4,
	class: "dads-u-visually-hidden"
}, en = { class: "dads-step-navigation__title" }, tn = {
	key: 0,
	class: "dads-step-navigation__description"
}, nn = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsStepNavigation",
	props: {
		steps: {},
		current: {},
		size: { default: "normal" },
		orientation: { default: "horizontal" },
		clickable: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: "ステップ" },
		reached: {}
	},
	emits: ["click:step"],
	setup(t, { emit: n }) {
		let c = t, u = n, d = (e) => c.current === e, f = (e, t) => d(t) ? "span" : e.href != null && !e.disabled ? "a" : e.disabled || c.clickable ? "button" : "span", p = {
			completed: "完了",
			editing: "編集中",
			error: "エラー",
			skipped: "スキップされました"
		}, m = (e) => e === "editing" || e === "error", h = r(() => c.reached == null ? c.steps.filter((e) => e.status === "reached" || e.status === "completed" || e.status === "editing" || e.status === "error").length : c.reached), g = (e, t, n) => {
			u("click:step", e, t, n);
		};
		return (n, r) => (v(), o("nav", {
			class: "dads-step-navigation",
			"data-orientation": t.orientation,
			"data-size": t.size,
			"aria-label": t.ariaLabel
		}, [s("p", Kt, " 全" + w(t.steps.length) + "ステップ中、" + w(h.value) + "ステップ目まで到達済み ", 1), s("ul", null, [(v(!0), o(e, null, b(t.steps, (e, n) => (v(), o("li", {
			key: n,
			class: "dads-step-navigation__step",
			"data-state": e.status || void 0,
			"data-first": n === 0 ? "" : void 0,
			"data-last": n === t.steps.length - 1 ? "" : void 0,
			"aria-current": d(n) ? "step" : void 0
		}, [(v(), i(C(f(e, n)), {
			class: "dads-step-navigation__header",
			type: f(e, n) === "button" ? "button" : void 0,
			href: f(e, n) === "a" ? e.href : void 0,
			disabled: f(e, n) === "button" && e.disabled ? !0 : void 0,
			onClick: (t) => f(e, n) === "button" || f(e, n) === "a" ? g(e, n, t) : void 0
		}, {
			default: M(() => [
				r[3] ||= s("span", { class: "dads-u-visually-hidden" }, "ステップ", -1),
				s("span", Jt, [
					l(w(n + 1) + " ", 1),
					e.status === "completed" ? (v(), o("span", Yt, [...r[0] ||= [s("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						"aria-hidden": "true"
					}, [s("circle", {
						cx: "12",
						cy: "12",
						r: "12",
						fill: "#666"
					}), s("path", {
						d: "M10 17.5 19.8 8l-1.5-1.5-8.1 8-4.1-4L4.5 12l5.6 5.5Z",
						fill: "#fff"
					})], -1)]])) : e.status === "editing" ? (v(), o("span", Xt, [...r[1] ||= [s("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						"aria-hidden": "true"
					}, [s("path", {
						d: "M5.8 20c-.5 0-1-.2-1.3-.5-.3-.4-.5-.8-.5-1.3V5.6c0-.5.2-.9.5-1.3.4-.3.8-.5 1.3-.5h8L12 5.6H5.8v12.6h12.6V12l1.8-1.8v8c0 .5-.2 1-.5 1.3-.4.3-.8.5-1.3.5H5.8Zm3.6-5.4v-3.8l8.3-8.3a1.8 1.8 0 0 1 2.5 0l1.3 1.3.4.6a1.7 1.7 0 0 1 0 1.3c-.1.3-.2.5-.4.6l-8.3 8.3H9.4Zm1.8-1.8h1.3l5.2-5.2L17 7l-.7-.7-5.2 5.2v1.3Z",
						fill: "#333"
					})], -1)]])) : e.status === "error" ? (v(), o("span", Zt, [...r[2] ||= [s("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						"aria-hidden": "true"
					}, [s("path", {
						d: "M1 21 12 2l11 19H1Zm3.5-2h15L12 6 4.5 19Zm7.5-1c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7c0 .3.1.5.3.7.2.2.4.3.7.3Zm-1-3h2v-5h-2v5Z",
						fill: "#ec0000"
					})], -1)]])) : a("", !0),
					e.status && p[e.status] && m(e.status) ? (v(), o("span", Qt, w(p[e.status]), 1)) : e.status && p[e.status] ? (v(), o("span", $t, w(p[e.status]), 1)) : a("", !0)
				]),
				s("span", en, w(e.title), 1)
			]),
			_: 2
		}, 1032, [
			"type",
			"href",
			"disabled",
			"onClick"
		])), e.description ? (v(), o("p", tn, w(e.description), 1)) : a("", !0)], 8, qt))), 128))])], 8, Gt));
	}
}), [["__scopeId", "data-v-b240db08"]]), rn = ["aria-label", "aria-orientation"], an = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], on = { class: "dads-tab__label" }, sn = { class: "dads-tab__panels" }, cn = [
	"id",
	"aria-labelledby",
	"hidden"
], ln = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let c = t, l = n, u = D(), d = r(() => `dads-tab-${u}`), f = y([]), h = (e) => e.value === c.modelValue, g = (e) => {
			e.disabled || h(e) || (l("update:modelValue", e.value), l("change", e.value));
		}, _ = (e) => {
			p(() => {
				f.value[e]?.focus();
			});
		}, S = (e) => {
			let t = c.items.map((e, t) => e.disabled ? -1 : t).filter((e) => e >= 0);
			if (t.length === 0) return;
			let n = c.items.findIndex((e) => e.value === c.modelValue), r = t.indexOf(n), i = r === -1 ? 0 : r, a = t.length - 1, o = null, s = c.orientation === "vertical" ? "ArrowDown" : "ArrowRight", u = c.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
			switch (e.key) {
				case s:
					o = t[(i + 1) % t.length];
					break;
				case u:
					o = t[(i - 1 + t.length) % t.length];
					break;
				case "Home":
					o = t[0];
					break;
				case "End":
					o = t[a];
					break;
				case "Enter":
				case " ": return;
				default: return;
			}
			if (o === n) return;
			e.preventDefault();
			let d = c.items[o];
			l("update:modelValue", d.value), l("change", d.value), _(o);
		}, C = (e) => ["dads-tab__tab", {
			"dads-tab__tab--active": h(e),
			"dads-tab__tab--disabled": e.disabled
		}], T = (e) => `${d.value}-tab-${e}`, E = (e) => `${d.value}-panel-${e}`;
		return (n, r) => (v(), o("div", { class: m(["dads-tab", `dads-tab--${t.orientation}`]) }, [s("div", {
			role: "tablist",
			class: "dads-tab__list",
			"aria-label": t.ariaLabel,
			"aria-orientation": t.orientation,
			onKeydown: S
		}, [(v(!0), o(e, null, b(t.items, (e) => (v(), o("button", {
			id: T(e.value),
			key: String(e.value),
			ref_for: !0,
			ref_key: "tabRefs",
			ref: f,
			type: "button",
			role: "tab",
			"aria-selected": h(e),
			"aria-controls": E(e.value),
			tabindex: h(e) ? 0 : -1,
			disabled: e.disabled || void 0,
			class: m(C(e)),
			onClick: (t) => g(e)
		}, [e.icon ? (v(), i(B, {
			key: 0,
			name: e.icon,
			class: "dads-tab__icon",
			size: 20
		}, null, 8, ["name"])) : a("", !0), s("span", on, w(e.label), 1)], 10, an))), 128))], 40, rn), s("div", sn, [(v(!0), o(e, null, b(t.items, (e) => N((v(), o("div", {
			id: E(e.value),
			key: String(e.value),
			role: "tabpanel",
			"aria-labelledby": T(e.value),
			hidden: !t.keepAlive && !h(e) ? !0 : void 0,
			class: "dads-tab__panel",
			tabindex: 0
		}, [t.keepAlive || h(e) ? x(n.$slots, `panel-${e.value}`, { key: 0 }, void 0, !0) : a("", !0)], 8, cn)), [[k, h(e)]])), 128))])], 2));
	}
}), [["__scopeId", "data-v-9439b871"]]), un = ["role", "aria-live"], dn = {
	class: "dads-notification-banner__icon",
	"aria-hidden": "true"
}, fn = { class: "dads-notification-banner__content" }, pn = {
	key: 0,
	class: "dads-notification-banner__heading"
}, mn = {
	key: 1,
	class: "dads-notification-banner__message"
}, hn = {
	key: 2,
	class: "dads-notification-banner__timestamp"
}, gn = ["datetime"], _n = {
	key: 0,
	class: "dads-notification-banner__action"
}, vn = ["aria-label"], yn = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsNotificationBanner",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		color: { default: "info-1" },
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
		let c = e, d = t, f = {
			success: "check_circle",
			error: "error",
			warning: "warning",
			"info-1": "info",
			"info-2": "info"
		}, p = r(() => f[c.color]), h = r(() => [
			"dads-notification-banner",
			`dads-notification-banner--${c.color}`,
			`dads-notification-banner--style-${c.style}`
		]), g = r(() => c.color === "error" || c.color === "warning" ? "alert" : "status"), y = r(() => c.color === "error" ? "assertive" : "polite"), b = r(() => c.timestamp === void 0 ? null : c.timestamp instanceof Date ? {
			iso: c.timestamp.toISOString(),
			display: c.timestamp.toLocaleString()
		} : {
			iso: c.timestamp,
			display: c.timestamp
		});
		_(() => {
			if (c.persistKey && !(typeof window > "u")) try {
				window.localStorage.getItem(c.persistKey) === "closed" && d("update:modelValue", !1);
			} catch {}
		});
		let S = () => {
			if (d("update:modelValue", !1), d("close"), c.persistKey && typeof window < "u") try {
				window.localStorage.setItem(c.persistKey, "closed");
			} catch {}
		};
		return (t, r) => (v(), i(n, { name: "dads-notification-banner" }, {
			default: M(() => [e.modelValue ? (v(), o("div", {
				key: 0,
				class: m(h.value),
				role: g.value,
				"aria-live": y.value
			}, [
				s("span", dn, [x(t.$slots, "icon", {}, () => [u(B, {
					name: p.value,
					size: 20
				}, null, 8, ["name"])], !0)]),
				s("div", fn, [
					e.title ? (v(), o("h2", pn, w(e.title), 1)) : a("", !0),
					e.message || t.$slots.default ? (v(), o("p", mn, [x(t.$slots, "default", {}, () => [l(w(e.message), 1)], !0)])) : a("", !0),
					b.value ? (v(), o("p", hn, [s("time", { datetime: b.value.iso }, w(b.value.display), 9, gn)])) : a("", !0)
				]),
				t.$slots.action ? (v(), o("div", _n, [x(t.$slots, "action", {}, void 0, !0)])) : a("", !0),
				e.closable ? (v(), o("button", {
					key: 1,
					type: "button",
					class: "dads-notification-banner__close",
					"aria-label": e.closeLabel,
					onClick: S
				}, [u(B, {
					name: "close",
					size: 20
				})], 8, vn)) : a("", !0)
			], 10, un)) : a("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-f7c59a42"]]), bn = ["aria-modal", "aria-labelledby"], xn = {
	key: 0,
	class: "dads-dialog__header"
}, Sn = ["id"], Cn = ["aria-label"], wn = { class: "dads-dialog__body" }, Tn = {
	key: 1,
	class: "dads-dialog__footer"
}, En = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", Dn = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let l = e, d = c, f = y(null), h = r(() => l.variant === "modal"), g = null, _ = D(), b = () => {
			d("update:modelValue", !1), d("close");
		}, S = () => {
			l.persistent || b();
		}, C = () => {
			h.value && (l.persistent || b());
		}, E = () => f.value ? Array.from(f.value.querySelectorAll(En)) : [], O = (e) => e ? typeof e == "string" ? document.querySelector(e) : e : null, k = (e) => {
			if (!h.value || e.key !== "Tab") return;
			let t = E();
			if (t.length === 0) {
				e.preventDefault(), f.value?.focus();
				return;
			}
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			e.shiftKey ? (i === n || i === f.value) && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
		return A(() => l.modelValue, async (e) => {
			if (e) g = document.activeElement, await p(), (O(l.initialFocus) ?? f.value)?.focus(), d("open");
			else {
				let e = O(l.returnFocusTo);
				e ? e.focus() : g && g.focus(), g = null;
			}
		}), (r, c) => (v(), i(t, { to: "body" }, [u(n, { name: "dads-dialog" }, {
			default: M(() => [e.modelValue ? (v(), o("div", {
				key: 0,
				class: m(["dads-dialog", [`dads-dialog--${e.size}`, `dads-dialog--${e.variant}`]]),
				role: "dialog",
				"aria-modal": h.value ? "true" : void 0,
				"aria-labelledby": e.title ? T(_) : void 0,
				onKeydown: [P(S, ["esc"]), k]
			}, [h.value ? (v(), o("div", {
				key: 0,
				class: "dads-dialog__overlay",
				"aria-hidden": "true",
				onClick: C
			})) : a("", !0), s("div", {
				ref_key: "panelRef",
				ref: f,
				class: "dads-dialog__panel",
				tabindex: "-1"
			}, [
				e.title || r.$slots.header || e.closable ? (v(), o("header", xn, [x(r.$slots, "header", {}, () => [e.title ? (v(), o("h2", {
					key: 0,
					id: T(_),
					class: "dads-dialog__title"
				}, w(e.title), 9, Sn)) : a("", !0)], !0), e.closable ? (v(), o("button", {
					key: 0,
					type: "button",
					class: "dads-dialog__close",
					"aria-label": e.closeLabel,
					onClick: b
				}, [u(B, {
					name: "close",
					size: 24
				})], 8, Cn)) : a("", !0)])) : a("", !0),
				s("div", wn, [x(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (v(), o("footer", Tn, [x(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 512)], 42, bn)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-43bf465f"]]), On = ["aria-describedby"], kn = ["id"], An = { class: "dads-tooltip__content" }, $ = 8, jn = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let c = e, d = D(), f = r(() => c.id ?? `dads-tooltip-${d}`), _ = y(null), b = y(null), S = y(!1), C = y({}), T = null, E = null, O = () => {
			T !== null && (clearTimeout(T), T = null), E !== null && (clearTimeout(E), E = null);
		}, k = () => {
			c.disabled || (S.value = !0);
		}, j = () => {
			S.value = !1;
		}, N = () => {
			c.disabled || (E !== null && (clearTimeout(E), E = null), !S.value && (c.openDelay > 0 ? T = setTimeout(() => {
				T = null, k();
			}, c.openDelay) : k()));
		}, P = () => {
			T !== null && (clearTimeout(T), T = null), S.value && (c.closeDelay > 0 ? E = setTimeout(() => {
				E = null, j();
			}, c.closeDelay) : j());
		}, F = (e) => {
			e.key === "Escape" && S.value && (O(), j());
		}, I = () => {
			let e = _.value, t = b.value;
			if (!e || !t) return;
			let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = window.scrollX, a = window.scrollY, o = 0, s = 0;
			switch (c.position) {
				case "top":
					o = n.top - r.height - $, s = n.left + n.width / 2 - r.width / 2;
					break;
				case "top-start":
					o = n.top - r.height - $, s = n.left;
					break;
				case "top-end":
					o = n.top - r.height - $, s = n.right - r.width;
					break;
				case "bottom":
					o = n.bottom + $, s = n.left + n.width / 2 - r.width / 2;
					break;
				case "bottom-start":
					o = n.bottom + $, s = n.left;
					break;
				case "bottom-end":
					o = n.bottom + $, s = n.right - r.width;
					break;
				case "left":
					o = n.top + n.height / 2 - r.height / 2, s = n.left - r.width - $;
					break;
				case "right":
					o = n.top + n.height / 2 - r.height / 2, s = n.right + $;
					break;
			}
			C.value = {
				top: `${o + a}px`,
				left: `${s + i}px`
			};
		};
		A(S, async (e) => {
			e && (await p(), I());
		});
		let L = r(() => [`dads-tooltip--${c.position}`]), R = r(() => S.value && !c.disabled ? f.value : void 0);
		return g(() => {
			O();
		}), (r, c) => (v(), o("span", {
			ref_key: "wrapRef",
			ref: _,
			class: "dads-tooltip__trigger-wrap",
			"aria-describedby": R.value,
			onMouseenter: N,
			onMouseleave: P,
			onFocusin: N,
			onFocusout: P,
			onKeydown: F
		}, [x(r.$slots, "trigger", {}, void 0, !0), (v(), i(t, { to: "body" }, [u(n, { name: "dads-tooltip" }, {
			default: M(() => [S.value && !e.disabled ? (v(), o("div", {
				key: 0,
				id: f.value,
				ref_key: "tipRef",
				ref: b,
				class: m(["dads-tooltip", L.value]),
				role: "tooltip",
				style: h(C.value)
			}, [s("div", An, [x(r.$slots, "default", {}, () => [l(w(e.text), 1)], !0)]), c[0] ||= s("span", {
				class: "dads-tooltip__arrow",
				"aria-hidden": "true"
			}, null, -1)], 14, kn)) : a("", !0)]),
			_: 3
		})]))], 40, On));
	}
}), [["__scopeId", "data-v-5eedea95"]]), Mn = [
	"data-type",
	"aria-valuenow",
	"aria-labelledby",
	"aria-label"
], Nn = [
	"width",
	"viewBox",
	"data-indeterminate"
], Pn = ["x2"], Fn = ["x2"], In = ["x2"], Ln = [
	"width",
	"height",
	"viewBox",
	"data-indeterminate"
], Rn = [
	"cx",
	"cy",
	"r",
	"stroke-width"
], zn = [
	"cx",
	"cy",
	"r",
	"stroke-width"
], Bn = [
	"cx",
	"cy",
	"r"
], Vn = ["id"], Hn = {
	key: 0,
	class: "dads-progress-indicator__percentage"
}, Un = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsProgressIndicator",
	props: {
		type: { default: "stacked" },
		indicator: { default: "linear" },
		value: {},
		active: {
			type: Boolean,
			default: !0
		},
		label: {},
		showPercentage: {
			type: Boolean,
			default: !1
		},
		ariaLabel: {}
	},
	setup(e) {
		let t = e, n = D(), i = r(() => t.value === void 0), c = r(() => {
			if (t.value !== void 0) return Math.max(0, Math.min(100, t.value));
		}), u = r(() => c.value === void 0 ? void 0 : Math.round(c.value)), d = r(() => t.type === "inlined"), f = r(() => d.value ? 80 : 240), p = r(() => d.value ? 24 : 48), g = r(() => d.value ? {
			cx: 12,
			cy: 12,
			r: 8,
			strokeWidth: 3,
			borderR: 9.5
		} : {
			cx: 24,
			cy: 24,
			r: 22,
			strokeWidth: 4,
			borderR: 23.5
		}), _ = r(() => c.value === void 0 ? void 0 : { "--value": String(c.value) }), y = r(() => !!t.label);
		return (t, r) => (v(), o("div", {
			class: m(["dads-progress-indicator", { "dads-progress-indicator--inactive": !e.active }]),
			"data-type": e.type,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": i.value ? void 0 : u.value,
			"aria-labelledby": y.value ? T(n) : void 0,
			"aria-label": y.value ? void 0 : e.ariaLabel,
			style: h(_.value)
		}, [e.indicator === "linear" ? (v(), o("svg", {
			key: 0,
			class: "dads-progress-indicator__linear",
			width: f.value,
			height: "4",
			viewBox: `0 0 ${f.value} 4`,
			stroke: "currentcolor",
			fill: "none",
			"aria-hidden": "true",
			"data-indeterminate": i.value ? "" : void 0
		}, [
			s("line", {
				class: "dads-progress-indicator__track",
				x1: "0",
				y1: "2",
				x2: f.value,
				y2: "2",
				"stroke-width": "4"
			}, null, 8, Pn),
			s("line", {
				class: "dads-progress-indicator__bar",
				x1: "0",
				y1: "2",
				x2: f.value,
				y2: "2",
				"stroke-width": "4",
				pathLength: "100"
			}, null, 8, Fn),
			s("line", {
				class: "dads-progress-indicator__border",
				x1: "0",
				y1: "3.5",
				x2: f.value,
				y2: "3.5",
				"stroke-width": "1"
			}, null, 8, In)
		], 8, Nn)) : (v(), o("svg", {
			key: 1,
			class: "dads-progress-indicator__spinner",
			width: p.value,
			height: p.value,
			viewBox: `0 0 ${p.value} ${p.value}`,
			stroke: "currentcolor",
			fill: "none",
			"aria-hidden": "true",
			"data-indeterminate": i.value ? "" : void 0
		}, [
			s("circle", {
				class: "dads-progress-indicator__track",
				cx: g.value.cx,
				cy: g.value.cy,
				r: g.value.r,
				"stroke-width": g.value.strokeWidth
			}, null, 8, Rn),
			s("g", null, [s("g", null, [s("circle", {
				class: "dads-progress-indicator__bar",
				cx: g.value.cx,
				cy: g.value.cy,
				r: g.value.r,
				"stroke-width": g.value.strokeWidth,
				pathLength: "100"
			}, null, 8, zn)])]),
			s("circle", {
				class: "dads-progress-indicator__border",
				cx: g.value.cx,
				cy: g.value.cy,
				r: g.value.borderR,
				"stroke-width": "1"
			}, null, 8, Bn)
		], 8, Ln)), e.label ? (v(), o("span", {
			key: 2,
			id: T(n),
			class: "dads-progress-indicator__label"
		}, [l(w(e.label) + " ", 1), e.showPercentage && !i.value ? (v(), o("span", Hn, [
			r[0] ||= l(" (", -1),
			s("span", null, w(u.value), 1),
			r[1] ||= l("%) ", -1)
		])) : a("", !0)], 8, Vn)) : a("", !0)], 14, Mn));
	}
}), [["__scopeId", "data-v-2ee09982"]]), Wn = {
	key: 0,
	class: "dads-card__image"
}, Gn = {
	key: 1,
	class: "dads-card__header"
}, Kn = { class: "dads-card__body" }, qn = {
	key: 2,
	class: "dads-card__sub"
}, Jn = {
	key: 3,
	class: "dads-card__footer"
}, Yn = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		return (t, n) => (v(), i(C(e.clickable ? "button" : "div"), {
			type: e.clickable ? "button" : void 0,
			class: m(l.value),
			"aria-label": e.clickable ? e.ariaLabel : void 0,
			onClick: u,
			onKeydown: d
		}, {
			default: M(() => [
				t.$slots.image ? (v(), o("div", Wn, [x(t.$slots, "image", {}, void 0, !0)])) : a("", !0),
				t.$slots.header ? (v(), o("header", Gn, [x(t.$slots, "header", {}, void 0, !0)])) : a("", !0),
				s("div", Kn, [x(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.sub ? (v(), o("div", qn, [x(t.$slots, "sub", {}, void 0, !0)])) : a("", !0),
				t.$slots.footer ? (v(), o("footer", Jn, [x(t.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			]),
			_: 3
		}, 40, [
			"type",
			"class",
			"aria-label"
		]));
	}
}), [["__scopeId", "data-v-527bcaa9"]]), Xn = {
	key: 0,
	class: "dads-heading__shoulder"
}, Zn = {
	key: 0,
	class: "dads-heading__icon",
	"aria-hidden": "true"
}, Qn = { class: "dads-heading__text" }, $n = {
	key: 1,
	class: "dads-heading__chip"
}, er = {
	key: 1,
	class: "dads-heading__subtitle"
}, tr = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let t = e, n = O(), c = r(() => t.level === void 0 ? Number(t.as.charAt(1)) : t.level), u = r(() => !!t.shoulder || !!n.shoulder), d = r(() => !!t.subtitle || !!n.subtitle), f = r(() => !!n.chip), p = r(() => u.value || d.value ? "hgroup" : "div"), h = r(() => {
			let e = ["dads-heading", `dads-heading--level-${c.value}`];
			return t.size && e.push(`dads-heading--size-${t.size}`), e;
		});
		return (t, n) => (v(), i(C(p.value), { class: m(h.value) }, {
			default: M(() => [
				u.value ? (v(), o("p", Xn, [x(t.$slots, "shoulder", {}, () => [l(w(e.shoulder), 1)], !0)])) : a("", !0),
				(v(), i(C(e.as), { class: "dads-heading__title" }, {
					default: M(() => [
						t.$slots["prepend-icon"] || e.icon ? (v(), o("span", Zn, [x(t.$slots, "prepend-icon", {}, () => [e.icon ? (v(), i(B, {
							key: 0,
							name: e.icon,
							size: 24
						}, null, 8, ["name"])) : a("", !0)], !0)])) : a("", !0),
						s("span", Qn, [x(t.$slots, "default", {}, void 0, !0)]),
						f.value ? (v(), o("span", $n, [x(t.$slots, "chip", {}, void 0, !0)])) : a("", !0)
					]),
					_: 3
				})),
				d.value ? (v(), o("p", er, [x(t.$slots, "subtitle", {}, () => [l(w(e.subtitle), 1)], !0)])) : a("", !0)
			]),
			_: 3
		}, 8, ["class"]));
	}
}), [["__scopeId", "data-v-757ba429"]]), nr = ["aria-orientation", "aria-label"], rr = { class: "dads-divider__label" }, ir = {
	key: 1,
	class: "dads-divider__line",
	"aria-hidden": "true"
}, ar = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsDivider",
	props: {
		orientation: { default: "horizontal" },
		color: { default: "gray-420" },
		variant: { default: "full-width" },
		thickness: { default: 1 },
		lineStyle: { default: "solid" },
		ariaLabel: {}
	},
	setup(t) {
		let n = t, i = O(), a = r(() => !!i.default && n.orientation === "horizontal"), c = r(() => [
			`dads-divider--${n.orientation}`,
			`dads-divider--${n.color}`,
			`dads-divider--${n.variant}`,
			`dads-divider--thickness-${n.thickness}`,
			`dads-divider--style-${n.lineStyle}`,
			{ "dads-divider--with-label": a.value }
		]);
		return (n, r) => (v(), o("div", {
			class: m(["dads-divider", c.value]),
			role: "separator",
			"aria-orientation": t.orientation,
			"aria-label": t.ariaLabel
		}, [a.value ? (v(), o(e, { key: 0 }, [
			r[0] ||= s("span", {
				class: "dads-divider__line",
				"aria-hidden": "true"
			}, null, -1),
			s("span", rr, [x(n.$slots, "default", {}, void 0, !0)]),
			r[1] ||= s("span", {
				class: "dads-divider__line",
				"aria-hidden": "true"
			}, null, -1)
		], 64)) : (v(), o("span", ir))], 10, nr));
	}
}), [["__scopeId", "data-v-69c91b07"]]), or = {
	key: 0,
	class: "dads-table__caption"
}, sr = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsTable",
	props: {
		caption: {},
		dense: {
			type: Boolean,
			default: !1
		},
		striped: {
			type: Boolean,
			default: !1
		},
		hoverable: {
			type: Boolean,
			default: !1
		},
		selectable: {
			type: Boolean,
			default: !1
		},
		cellBorder: {
			type: [Boolean, String],
			default: !1
		},
		border: {
			type: [Boolean, String],
			default: !1
		}
	},
	setup(e) {
		let t = e, n = O(), c = r(() => !!t.caption || !!n.caption), u = r(() => c.value ? "figure" : "div"), d = r(() => ({
			"data-size": t.dense ? "dense" : void 0,
			"data-row-stripe": t.striped ? "" : void 0,
			"data-row-hover-highlight": t.hoverable ? "" : void 0,
			"data-selectable": t.selectable ? "" : void 0
		})), p = (e) => {
			if (!(e === !1 || e === void 0)) return e === !0 ? "" : e;
		}, m = r(() => ({
			"data-cell-border": p(t.cellBorder),
			"data-border": p(t.border)
		}));
		return (t, n) => (v(), i(C(u.value), f({ class: "dads-table" }, d.value), {
			default: M(() => [c.value ? (v(), o("figcaption", or, [x(t.$slots, "caption", {}, () => [l(w(e.caption), 1)], !0)])) : a("", !0), s("table", f({ class: "dads-table__table" }, m.value), [x(t.$slots, "default", {}, void 0, !0)], 16)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-a4d78dfa"]]), cr = ["open", "aria-disabled"], lr = [
	"id",
	"aria-expanded",
	"aria-disabled",
	"tabindex"
], ur = { class: "dads-accordion__content" }, dr = ["href"], fr = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsAccordion",
	props: {
		modelValue: {
			type: Boolean,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			default: !1
		},
		title: {},
		headingLevel: { default: 3 },
		disabled: {
			type: Boolean,
			default: !1
		},
		backLink: {
			type: Boolean,
			default: !1
		},
		backLinkLabel: { default: void 0 }
	},
	emits: ["update:modelValue", "toggle"],
	setup(e, { emit: t }) {
		let n = e, c = t, u = D(), d = r(() => `dads-accordion-${u}-summary`), f = r(() => n.modelValue !== void 0), p = y(n.defaultOpen), m = r(() => f.value ? !!n.modelValue : p.value), h = y(null);
		A(m, (e) => {
			h.value && h.value.open !== e && (h.value.open = e);
		});
		let g = (e) => {
			f.value || (p.value = e), c("update:modelValue", e), c("toggle", e);
		}, _ = (e) => {
			e.preventDefault(), !n.disabled && g(!m.value);
		}, b = (e) => {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), !n.disabled && g(!m.value));
		}, S = r(() => `h${n.headingLevel}`), T = r(() => n.backLinkLabel ?? `「${n.title}」の先頭に戻る`);
		return (t, n) => (v(), o("details", {
			ref_key: "detailsRef",
			ref: h,
			class: "dads-accordion",
			open: m.value,
			"aria-disabled": e.disabled || void 0
		}, [s("summary", {
			id: d.value,
			class: "dads-accordion__summary",
			"aria-expanded": m.value,
			"aria-disabled": e.disabled || void 0,
			tabindex: e.disabled ? -1 : 0,
			onClick: _,
			onKeydown: b
		}, [n[0] ||= s("span", { class: "dads-accordion__icon" }, [s("svg", {
			class: "dads-accordion__icon-svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			"aria-hidden": "true"
		}, [s("path", {
			d: "M3.3 7.3L12 16L20.7 7.3",
			fill: "none",
			stroke: "currentcolor",
			"stroke-width": "2"
		})])], -1), (v(), i(C(S.value), null, {
			default: M(() => [l(w(e.title), 1)]),
			_: 1
		}))], 40, lr), s("div", ur, [x(t.$slots, "default", {}, void 0, !0), e.backLink ? (v(), o("a", {
			key: 0,
			href: `#${d.value}`,
			class: "dads-accordion__back-link"
		}, [n[1] ||= s("svg", {
			class: "dads-accordion__back-link-icon",
			width: "24",
			height: "24",
			fill: "none",
			"aria-hidden": "true"
		}, [s("path", {
			d: "M6 7V14.5C6 16.8 8.2 19 10.5 19C12.8 19 15 16.8 15 14.5V6M10.709 9.7L15 5.414L19.291 9.7",
			stroke: "currentcolor",
			"stroke-width": "2"
		})], -1), l(" " + w(T.value), 1)], 8, dr)) : a("", !0)])], 8, cr));
	}
}), [["__scopeId", "data-v-05f1889e"]]), pr = ["data-color", "data-style"], mr = {
	key: 0,
	class: "dads-chip-label__prepend",
	"aria-hidden": "true"
}, hr = { class: "dads-chip-label__text" }, gr = {
	key: 1,
	class: "dads-chip-label__append",
	"aria-hidden": "true"
}, _r = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsChipLabel",
	props: {
		color: { default: "gray" },
		appearance: { default: "text" }
	},
	setup(e) {
		return (t, n) => (v(), o("span", {
			class: "dads-chip-label",
			"data-color": e.color,
			"data-style": e.appearance
		}, [
			t.$slots.prepend ? (v(), o("span", mr, [x(t.$slots, "prepend", {}, void 0, !0)])) : a("", !0),
			s("span", hr, [x(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.append ? (v(), o("span", gr, [x(t.$slots, "append", {}, void 0, !0)])) : a("", !0)
		], 8, pr));
	}
}), [["__scopeId", "data-v-fd727b60"]]), vr = [
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
], yr = { class: "dads-color-picker__main" }, br = [
	"value",
	"disabled",
	"aria-label"
], xr = [
	"value",
	"disabled",
	"aria-label"
], Sr = {
	class: "dads-color-picker__swatches",
	role: "list"
}, Cr = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"onClick"
], wr = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsColorPicker",
	props: {
		modelValue: {},
		swatches: { default: () => [...vr] },
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
		let i = t, a = n, c = `dads-color-picker-${D()}`, l = `${c}-hex`, u = (e) => {
			if (!e) return "#000000";
			let t = e.trim().toLowerCase();
			return t.startsWith("#") ? t : `#${t}`;
		}, d = r(() => u(i.modelValue)), f = (e) => /^#[0-9a-f]{6}$/i.test(e.trim()), p = (e) => {
			let t = e.target;
			a("update:modelValue", u(t.value));
		}, g = (e) => {
			let t = e.target;
			f(t.value) && a("update:modelValue", u(t.value));
		}, _ = (e) => {
			i.disabled || a("update:modelValue", u(e));
		};
		return (n, r) => (v(), o("div", { class: m(["dads-color-picker", { "dads-color-picker--disabled": t.disabled }]) }, [s("div", yr, [s("label", {
			for: c,
			class: "dads-color-picker__swatch-label"
		}, [s("input", {
			id: c,
			class: "dads-color-picker__color-input",
			type: "color",
			value: d.value,
			disabled: t.disabled,
			"aria-label": t.label ?? t.defaultAriaLabel,
			onInput: p
		}, null, 40, br), s("span", {
			class: "dads-color-picker__swatch-preview",
			style: h({ backgroundColor: d.value }),
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
		}, null, 40, xr)]), s("ul", Sr, [(v(!0), o(e, null, b(t.swatches, (e) => (v(), o("li", { key: e }, [s("button", {
			type: "button",
			class: "dads-color-picker__swatch",
			style: h({ backgroundColor: e }),
			disabled: t.disabled,
			"aria-label": t.formatSwatchAriaLabel(e),
			"aria-pressed": u(e) === d.value,
			onClick: (t) => _(e)
		}, null, 12, Cr)]))), 128))])], 2));
	}
}), [["__scopeId", "data-v-42b39955"]]), Tr = ["for"], Er = {
	key: 0,
	class: "dads-date-picker__required",
	"aria-hidden": "true"
}, Dr = ["data-size"], Or = [
	"data-error",
	"data-disabled",
	"data-readonly"
], kr = { class: "dads-date-picker__year" }, Ar = { class: "dads-date-picker__label" }, jr = [
	"id",
	"name",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-required",
	"aria-describedby"
], Mr = {
	key: 0,
	class: "dads-date-picker__wareki",
	"aria-live": "polite"
}, Nr = { class: "dads-date-picker__month" }, Pr = { class: "dads-date-picker__label" }, Fr = [
	"id",
	"name",
	"value",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-describedby"
], Ir = { class: "dads-date-picker__day" }, Lr = { class: "dads-date-picker__label" }, Rr = [
	"id",
	"name",
	"value",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-describedby"
], zr = [
	"aria-expanded",
	"aria-controls",
	"aria-label",
	"disabled"
], Br = ["id", "aria-label"], Vr = { class: "dads-date-picker__calendar-header" }, Hr = ["disabled", "aria-label"], Ur = {
	class: "dads-date-picker__current-month",
	"aria-live": "polite"
}, Wr = ["disabled", "aria-label"], Gr = ["aria-label"], Kr = [
	"data-selected",
	"data-today",
	"disabled",
	"aria-selected",
	"onClick"
], qr = {
	key: 1,
	"aria-hidden": "true",
	class: "dads-date-picker__date-placeholder"
}, Jr = {
	key: 1,
	class: "dads-date-picker__footer"
}, Yr = ["id"], Xr = ["id"], Zr = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let i = t, c = (e) => Number.isFinite(e) ? e >= 2019 ? {
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
		} : null : null, d = n, f = D(), p = r(() => i.id ?? `dads-date-picker-${f}`), h = r(() => `${p.value}-year`), x = r(() => `${p.value}-month`), S = r(() => `${p.value}-day`), C = r(() => `${p.value}-popover`), T = r(() => `${p.value}-hint`), E = r(() => `${p.value}-error`), O = r(() => i.error || !!i.errorMessage), j = r(() => {
			let e = [];
			return O.value && i.errorMessage ? e.push(E.value) : i.hint && e.push(T.value), e.length > 0 ? e.join(" ") : void 0;
		}), M = r(() => O.value && !!i.errorMessage || !!i.hint), P = (e) => {
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
		}, F = (e, t = 2) => String(e).padStart(t, "0"), I = (e, t, n) => {
			if (e === null || t === null || n === null || t < 1 || t > 12 || n < 1 || n > 31) return "";
			let r = new Date(e, t - 1, n);
			return r.getFullYear() !== e || r.getMonth() !== t - 1 || r.getDate() !== n ? "" : `${F(e, 4)}-${F(t)}-${F(n)}`;
		}, L = y(""), R = y(""), z = y("");
		A(() => i.modelValue, (e) => {
			let t = P(e);
			L.value = t.year === null ? "" : String(t.year).padStart(4, "0"), R.value = t.month === null ? "" : F(t.month), z.value = t.day === null ? "" : F(t.day);
		}, { immediate: !0 });
		let V = () => {
			let e = L.value ? Number.parseInt(L.value, 10) : null, t = R.value ? Number.parseInt(R.value, 10) : null, n = z.value ? Number.parseInt(z.value, 10) : null, r = I(Number.isNaN(e) ? null : e, Number.isNaN(t) ? null : t, Number.isNaN(n) ? null : n);
			r !== i.modelValue && (d("update:modelValue", r), d("change", r));
		}, ee = (e) => {
			L.value = e.target.value.replace(/\D/g, "").slice(0, 4), V();
		}, H = (e) => {
			R.value = e.target.value.replace(/\D/g, "").slice(0, 2), V();
		}, U = (e) => {
			z.value = e.target.value.replace(/\D/g, "").slice(0, 2), V();
		}, te = y(null), ne = y(null), W = y(null), G = y(null), K = y(null), q = y(!1), J = y((/* @__PURE__ */ new Date()).getFullYear()), Y = y((/* @__PURE__ */ new Date()).getMonth() + 1), re = () => {
			let e = P(i.modelValue);
			if (e.year !== null && e.month !== null) {
				J.value = e.year, Y.value = e.month;
				return;
			}
			let t = /* @__PURE__ */ new Date();
			J.value = t.getFullYear(), Y.value = t.getMonth() + 1;
		}, ie = () => {
			i.disabled || i.readonly || (re(), q.value = !0);
		}, X = () => {
			q.value && (q.value = !1, G.value?.focus());
		}, Z = () => {
			q.value ? X() : ie();
		}, ae = (e) => {
			let t = Y.value + e, n = J.value;
			t < 1 ? (t = 12, --n) : t > 12 && (t = 1, n += 1), J.value = n, Y.value = t;
		}, Q = r(() => P(i.min)), oe = r(() => P(i.max)), se = (e, t) => e.y === t.y ? e.m === t.m ? e.d === t.d ? 0 : e.d < t.d ? -1 : 1 : e.m < t.m ? -1 : 1 : e.y < t.y ? -1 : 1, ce = (e, t, n) => {
			let r = {
				y: e,
				m: t,
				d: n
			};
			return !(Q.value.year !== null && se(r, {
				y: Q.value.year,
				m: Q.value.month,
				d: Q.value.day
			}) < 0 || oe.value.year !== null && se(r, {
				y: oe.value.year,
				m: oe.value.month,
				d: oe.value.day
			}) > 0);
		}, le = /* @__PURE__ */ new Date(), ue = I(le.getFullYear(), le.getMonth() + 1, le.getDate()), de = r(() => {
			let e = J.value, t = Y.value, n = new Date(e, t - 1, 1).getDay(), r = new Date(e, t, 0).getDate(), a = [], o = new Date(e, t - 1, 1 - n);
			for (let e = 0; e < 42; e++) {
				let n = o.getFullYear(), s = o.getMonth() + 1, c = o.getDate(), l = s === t, u = I(n, s, c), d = !!u && u === i.modelValue;
				if (a.push({
					year: n,
					month: s,
					day: c,
					inMonth: l,
					disabled: !l || !ce(n, s, c),
					selected: d,
					isToday: !!u && u === ue,
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
							iso: I(e, t, n)
						}), o.setDate(o.getDate() + 1);
					}
					break;
				}
			}
			let s = [];
			for (let e = 0; e < a.length; e += 7) s.push(a.slice(e, e + 7));
			return s;
		}), fe = (e) => {
			if (!e.disabled) {
				if (e.iso === i.modelValue) {
					X();
					return;
				}
				d("update:modelValue", e.iso), d("change", e.iso), X();
			}
		}, pe = r(() => {
			if (Q.value.year === null) return !0;
			let e = Y.value === 1 ? J.value - 1 : J.value, t = Y.value === 1 ? 12 : Y.value - 1;
			return ce(e, t, new Date(e, t, 0).getDate());
		}), me = r(() => oe.value.year === null ? !0 : ce(Y.value === 12 ? J.value + 1 : J.value, Y.value === 12 ? 1 : Y.value + 1, 1)), he = r(() => {
			let e = new Date(J.value, Y.value - 1, 1);
			return new Intl.DateTimeFormat("ja-JP", {
				year: "numeric",
				month: "long"
			}).format(e);
		}), ge = [
			"日",
			"月",
			"火",
			"水",
			"木",
			"金",
			"土"
		], _e = (e) => {
			e.key === "Escape" && (e.preventDefault(), X());
		}, ve = (e) => {
			if (!q.value) return;
			let t = e.target;
			t && K.value?.contains(t) || t && G.value?.contains(t) || (q.value = !1);
		};
		_(() => {
			document.addEventListener("pointerdown", ve, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", ve, !0);
		}), A(() => i.disabled, (e) => {
			e && (q.value = !1);
		});
		let ye = (e) => d("focus", e), be = (e) => d("blur", e), xe = r(() => [
			"dads-date-picker",
			`dads-date-picker--${i.size}`,
			`dads-date-picker--variant-${i.variant}`,
			`dads-date-picker--locale-${i.locale}`,
			{
				"dads-date-picker--disabled": i.disabled,
				"dads-date-picker--readonly": i.readonly,
				"dads-date-picker--error": O.value,
				"dads-date-picker--open": q.value
			}
		]), Se = r(() => {
			if (i.locale !== "japanese") return "";
			let e = Number(L.value);
			if (!Number.isFinite(e) || e === 0) return "";
			let t = c(e);
			return t ? `${t.era}${t.year}年` : "";
		});
		return (n, r) => (v(), o("div", { class: m(xe.value) }, [
			t.label ? (v(), o("label", {
				key: 0,
				for: h.value,
				class: "dads-date-picker__label-text"
			}, [l(w(t.label) + " ", 1), t.required ? (v(), o("span", Er, w(t.requiredLabel), 1)) : a("", !0)], 8, Tr)) : a("", !0),
			s("div", {
				class: "dads-date-picker__controls",
				"data-size": t.size
			}, [
				s("div", {
					class: "dads-date-picker__inputs",
					"data-error": O.value || void 0,
					"data-disabled": t.disabled || void 0,
					"data-readonly": t.readonly || void 0
				}, [
					s("label", kr, [
						s("span", Ar, w(t.yearLabel), 1),
						s("input", {
							id: h.value,
							ref_key: "yearInputRef",
							ref: te,
							class: "dads-date-picker__input",
							type: "text",
							inputmode: "numeric",
							pattern: "[0-9]+",
							autocomplete: "off",
							name: t.name ? `${t.name}-year` : void 0,
							value: L.value,
							placeholder: t.placeholder,
							disabled: t.disabled || void 0,
							readonly: t.readonly || void 0,
							"aria-invalid": O.value || void 0,
							"aria-required": t.required || void 0,
							"aria-describedby": j.value,
							"data-js-year-input": "",
							onInput: ee,
							onFocus: ye,
							onBlur: be
						}, null, 40, jr),
						Se.value ? (v(), o("span", Mr, w(Se.value), 1)) : a("", !0)
					]),
					s("label", Nr, [s("span", Pr, w(t.monthLabel), 1), s("input", {
						id: x.value,
						ref_key: "monthInputRef",
						ref: ne,
						class: "dads-date-picker__input",
						type: "text",
						inputmode: "numeric",
						pattern: "[0-9]+",
						autocomplete: "off",
						name: t.name ? `${t.name}-month` : void 0,
						value: R.value,
						disabled: t.disabled || void 0,
						readonly: t.readonly || void 0,
						"aria-invalid": O.value || void 0,
						"aria-describedby": j.value,
						"data-js-month-input": "",
						onInput: H,
						onFocus: ye,
						onBlur: be
					}, null, 40, Fr)]),
					s("label", Ir, [s("span", Lr, w(t.dayLabel), 1), s("input", {
						id: S.value,
						ref_key: "dayInputRef",
						ref: W,
						class: "dads-date-picker__input",
						type: "text",
						inputmode: "numeric",
						pattern: "[0-9]+",
						autocomplete: "off",
						name: t.name ? `${t.name}-day` : void 0,
						value: z.value,
						disabled: t.disabled || void 0,
						readonly: t.readonly || void 0,
						"aria-invalid": O.value || void 0,
						"aria-describedby": j.value,
						"data-js-day-input": "",
						onInput: U,
						onFocus: ye,
						onBlur: be
					}, null, 40, Rr)])
				], 8, Or),
				s("button", {
					ref_key: "calendarButtonRef",
					ref: G,
					type: "button",
					class: "dads-date-picker__calendar-button",
					"aria-expanded": q.value,
					"aria-controls": C.value,
					"aria-haspopup": "dialog",
					"aria-label": t.openCalendarAriaLabel,
					disabled: t.disabled || t.readonly || void 0,
					"data-js-calendar-button": "",
					onClick: Z
				}, [u(B, {
					name: "calendar_today",
					class: "dads-date-picker__calendar-icon",
					size: 24
				}), u(B, {
					name: "keyboard_arrow_down",
					class: "dads-date-picker__calendar-chevron",
					size: 16
				})], 8, zr),
				N(s("div", {
					id: C.value,
					ref_key: "popoverRef",
					ref: K,
					class: "dads-date-picker__calendar-popover",
					role: "dialog",
					"aria-label": he.value,
					onKeydown: _e
				}, [s("div", Vr, [
					s("button", {
						type: "button",
						class: "dads-date-picker__nav-button",
						disabled: !pe.value || void 0,
						"aria-label": t.prevMonthAriaLabel,
						onClick: r[0] ||= (e) => ae(-1)
					}, [u(B, {
						name: "chevron_left",
						size: 20
					})], 8, Hr),
					s("span", Ur, w(he.value), 1),
					s("button", {
						type: "button",
						class: "dads-date-picker__nav-button",
						disabled: !me.value || void 0,
						"aria-label": t.nextMonthAriaLabel,
						onClick: r[1] ||= (e) => ae(1)
					}, [u(B, {
						name: "chevron_right",
						size: 20
					})], 8, Wr)
				]), s("table", {
					class: "dads-date-picker__calendar-table",
					role: "grid",
					"aria-label": he.value
				}, [s("thead", null, [s("tr", null, [(v(), o(e, null, b(ge, (e) => s("th", {
					key: e,
					scope: "col",
					class: "dads-date-picker__weekday"
				}, w(e), 1)), 64))])]), s("tbody", null, [(v(!0), o(e, null, b(de.value, (t, n) => (v(), o("tr", { key: n }, [(v(!0), o(e, null, b(t, (e) => (v(), o("td", {
					key: `${e.year}-${e.month}-${e.day}`,
					class: "dads-date-picker__date-cell"
				}, [e.inMonth ? (v(), o("button", {
					key: 0,
					type: "button",
					class: "dads-date-picker__date",
					"data-selected": e.selected || void 0,
					"data-today": e.isToday || void 0,
					disabled: e.disabled || void 0,
					"aria-selected": e.selected || void 0,
					onClick: (t) => fe(e)
				}, w(e.day), 9, Kr)) : (v(), o("span", qr))]))), 128))]))), 128))])], 8, Gr)], 40, Br), [[k, q.value]])
			], 8, Dr),
			M.value ? (v(), o("div", Jr, [O.value && t.errorMessage ? (v(), o("span", {
				key: 0,
				id: E.value,
				class: "dads-date-picker__error-text",
				role: "alert"
			}, w(t.errorMessage), 9, Yr)) : t.hint ? (v(), o("span", {
				key: 1,
				id: T.value,
				class: "dads-date-picker__hint"
			}, w(t.hint), 9, Xr)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-23ada84f"]]), Qr = ["for"], $r = {
	key: 0,
	class: "dads-search-box__required",
	"aria-hidden": "true"
}, ei = { class: "dads-search-box__row" }, ti = [
	"value",
	"disabled",
	"aria-label"
], ni = {
	value: "",
	disabled: "",
	hidden: ""
}, ri = ["value"], ii = { class: "dads-search-box__fields" }, ai = { class: "dads-search-box__input" }, oi = {
	key: 0,
	class: "dads-u-visually-hidden"
}, si = [
	"id",
	"name",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid",
	"aria-required",
	"aria-describedby"
], ci = ["aria-label"], li = {
	key: 0,
	class: "dads-search-box__suggestions",
	role: "listbox"
}, ui = ["onMousedown"], di = {
	key: 1,
	class: "dads-search-box__footer"
}, fi = ["id"], pi = ["id"], mi = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let i = t, c = n, d = y(null), f = r(() => Array.isArray(i.suggestions) && i.suggestions.length > 0), p = r(() => Array.isArray(i.categories) && i.categories.length > 0), h = r(() => i.clearable && !!i.modelValue && !i.disabled && !i.readonly), g = (e) => {
			let t = e.target.value;
			c("update:category", t);
		}, _ = (e) => {
			c("update:modelValue", e), c("select:suggestion", e), c("search", e);
		}, x = () => {
			c("update:modelValue", ""), d.value?.focus();
		}, S = D(), C = r(() => i.id ?? `dads-search-box-${S}`), T = r(() => `${C.value}-hint`), E = r(() => `${C.value}-error`), O = r(() => i.error || !!i.errorMessage), k = r(() => {
			if (O.value && i.errorMessage) return E.value;
			if (i.hint) return T.value;
		}), A = r(() => [
			"dads-search-box",
			`dads-search-box--${i.size}`,
			{
				"dads-search-box--disabled": i.disabled,
				"dads-search-box--readonly": i.readonly,
				"dads-search-box--error": O.value
			}
		]), j = r(() => i.size), N = r(() => O.value && !!i.errorMessage || !!i.hint), P = (e) => {
			let t = e.target;
			c("update:modelValue", t.value);
		}, I = (e) => {
			e.key !== "Enter" || e.isComposing || i.disabled || (e.preventDefault(), c("search", i.modelValue ?? ""));
		}, L = () => {
			i.disabled || c("search", i.modelValue ?? "");
		}, R = (e) => c("focus", e), z = (e) => c("blur", e);
		return (n, r) => (v(), o("div", { class: m(A.value) }, [
			t.label ? (v(), o("label", {
				key: 0,
				for: C.value,
				class: "dads-search-box__label"
			}, [l(w(t.label) + " ", 1), t.required ? (v(), o("span", $r, w(t.requiredLabel), 1)) : a("", !0)], 8, Qr)) : a("", !0),
			s("div", ei, [
				p.value ? (v(), o("select", {
					key: 0,
					class: "dads-search-box__category",
					value: t.category,
					disabled: t.disabled || void 0,
					"aria-label": t.categoryPlaceholder,
					onChange: g
				}, [s("option", ni, w(t.categoryPlaceholder), 1), (v(!0), o(e, null, b(t.categories, (e) => (v(), o("option", {
					key: e,
					value: e
				}, w(e), 9, ri))), 128))], 40, ti)) : a("", !0),
				s("div", ii, [s("label", ai, [
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
					t.label ? a("", !0) : (v(), o("span", oi, w(t.buttonLabel), 1)),
					s("input", {
						id: C.value,
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
						onInput: P,
						onKeydown: I,
						onFocus: R,
						onBlur: z
					}, null, 40, si),
					h.value ? (v(), o("button", {
						key: 1,
						type: "button",
						class: "dads-search-box__clear",
						"aria-label": t.clearLabel,
						onClick: x
					}, " × ", 8, ci)) : a("", !0)
				]), f.value ? (v(), o("ul", li, [(v(!0), o(e, null, b(t.suggestions, (e, t) => (v(), o("li", {
					key: t,
					class: "dads-search-box__suggestion",
					role: "option",
					tabindex: "-1",
					onMousedown: F((t) => _(e), ["prevent"])
				}, w(e), 41, ui))), 128))])) : a("", !0)]),
				u(H, {
					type: "submit",
					variant: "solid-fill",
					size: j.value,
					disabled: t.disabled,
					onClick: L
				}, {
					default: M(() => [l(w(t.buttonLabel), 1)]),
					_: 1
				}, 8, ["size", "disabled"])
			]),
			N.value ? (v(), o("div", di, [O.value && t.errorMessage ? (v(), o("span", {
				key: 0,
				id: E.value,
				class: "dads-search-box__error",
				role: "alert"
			}, w(t.errorMessage), 9, fi)) : t.hint ? (v(), o("span", {
				key: 1,
				id: T.value,
				class: "dads-search-box__hint"
			}, w(t.hint), 9, pi)) : a("", !0)])) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-d5b8a326"]]), hi = ["open", "aria-disabled"], gi = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-disabled",
	"tabindex"
], _i = { class: "dads-disclosure__title" }, vi = ["id", "aria-labelledby"], yi = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let n = e, i = t, a = D(), c = r(() => `dads-disclosure-${a}`), l = r(() => `${c.value}-summary`), u = r(() => `${c.value}-content`), d = r(() => n.modelValue !== void 0), f = y(n.defaultOpen), p = r(() => d.value ? !!n.modelValue : f.value), h = y(null);
		A(p, (e) => {
			h.value && h.value.open !== e && (h.value.open = e);
		});
		let g = (e) => {
			d.value || (f.value = e), i("update:modelValue", e), i("toggle", e);
		}, _ = (e) => {
			e.preventDefault(), !n.disabled && g(!p.value);
		}, b = (e) => {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), !n.disabled && g(!p.value));
		}, S = r(() => ["dads-disclosure", {
			"dads-disclosure--open": p.value,
			"dads-disclosure--disabled": n.disabled
		}]);
		return (t, n) => (v(), o("details", {
			ref_key: "detailsRef",
			ref: h,
			class: m(S.value),
			open: p.value,
			"aria-disabled": e.disabled || void 0
		}, [s("summary", {
			id: l.value,
			class: "dads-disclosure__summary",
			"aria-expanded": p.value,
			"aria-controls": u.value,
			"aria-disabled": e.disabled || void 0,
			tabindex: e.disabled ? -1 : 0,
			onClick: _,
			onKeydown: b
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
		], -1), s("span", _i, w(e.title), 1)], 40, gi), s("div", {
			id: u.value,
			class: "dads-disclosure__content",
			role: "region",
			"aria-labelledby": l.value
		}, [x(t.$slots, "default", {}, void 0, !0)], 8, vi)], 10, hi));
	}
}), [["__scopeId", "data-v-2a71530d"]]), bi = ["data-marker"], xi = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsDescriptionList",
	props: {
		items: {},
		layout: { default: "vertical" },
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
		return (n, r) => (v(), o("dl", {
			class: m(a.value),
			"data-marker": i.value
		}, [t.items && t.items.length > 0 ? (v(!0), o(e, { key: 0 }, b(t.items, (e, t) => (v(), o("div", {
			key: t,
			class: "dads-description-list__item"
		}, [s("dt", null, w(e.term), 1), s("dd", null, w(e.description), 1)]))), 128)) : x(n.$slots, "default", { key: 1 }, void 0, !0)], 10, bi));
	}
}), [["__scopeId", "data-v-aa9b61fe"]]), Si = [
	"id",
	"data-size",
	"aria-label",
	"aria-controls",
	"aria-expanded",
	"disabled"
], Ci = ["id"], wi = ["aria-labelledby"], Ti = [
	"id",
	"href",
	"lang",
	"hreflang",
	"data-current",
	"aria-current",
	"onClick"
], Ei = { class: "dads-menu-list__label" }, Di = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsLanguageSelector",
	props: {
		modelValue: {},
		options: { default: () => [] },
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "sm" },
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
		let i = t, a = n, c = D(), u = r(() => `dads-language-selector-opener-${c}`), d = r(() => `dads-language-selector-popup-${c}`), f = (e) => `${u.value}-item-${e}`, h = y(null), x = y(null), S = y(null), C = y([]), T = y(!1), E = (e) => i.modelValue !== void 0 && i.modelValue === e.value, O = () => {
			i.disabled || T.value || (T.value = !0, a("open"));
		}, j = (e = !1) => {
			T.value && (T.value = !1, a("close"), e && x.value?.focus());
		}, M = () => {
			T.value ? j() : O();
		}, P = (e, t) => {
			!e.href && t && t.preventDefault(), a("update:modelValue", e.value), a("change", e.value), j(!0);
		}, F = (e) => {
			C.value[e]?.focus();
		}, I = () => F(0), L = () => F(i.options.length - 1), R = () => {
			let e = document.activeElement;
			return C.value.findIndex((t) => t === e);
		}, z = () => {
			let e = R();
			e < 0 || e >= i.options.length - 1 ? I() : F(e + 1);
		}, B = () => {
			let e = R();
			e <= 0 ? L() : F(e - 1);
		}, V = (e) => {
			e.preventDefault(), M();
		}, ee = (e) => {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), T.value ? I() : (O(), p(I));
					break;
				case "ArrowUp":
					e.preventDefault(), T.value ? L() : (O(), p(L));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), M();
					break;
			}
		}, H = (e) => {
			if (T.value) switch (e.key) {
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
					e.preventDefault(), j(!0);
					break;
				case "Tab":
					j();
					break;
			}
		}, U = (e) => {
			if (!T.value) return;
			let t = e.target;
			t && h.value && h.value.contains(t) || j();
		};
		_(() => {
			document.addEventListener("pointerdown", U, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", U, !0);
		}), A(() => i.disabled, (e) => {
			e && j();
		});
		let te = (e) => (t) => {
			C.value[e] = t ?? null;
		};
		return (n, r) => (v(), o("div", {
			ref_key: "rootRef",
			ref: h,
			class: "dads-language-selector"
		}, [s("div", { class: m(["dads-menu-list-box", { "dads-menu-list-box--disabled": t.disabled }]) }, [s("button", {
			id: u.value,
			ref_key: "openerRef",
			ref: x,
			type: "button",
			class: "dads-menu-list-box__opener",
			"data-size": t.size,
			"data-style": "text",
			"data-text-weight": "normal",
			"aria-label": t.ariaLabel,
			"aria-controls": d.value,
			"aria-expanded": T.value,
			"aria-haspopup": "menu",
			disabled: t.disabled || void 0,
			onClick: V,
			onKeydown: ee
		}, [
			r[0] ||= s("svg", {
				class: "dads-menu-list-box__opener-icon",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				fill: "currentcolor",
				"aria-hidden": "true"
			}, [s("path", { d: "M12 21.5A9.5 9.5 0 0 1 2.5 12c0-5.2 4.3-9.5 9.5-9.5s9.6 4.3 9.5 9.5c0 5.2-4.3 9.5-9.5 9.5Zm0-1.5c1-1.3 1.7-2.8 2.1-4.3H10c.4 1.5 1 3 2.1 4.3Zm-2-.3c-.8-1.2-1.4-2.6-1.7-4H5c1 2 3 3.5 5.2 4Zm4 0c2.2-.5 4-2 5-4h-3.3c-.4 1.4-1 2.8-1.8 4Zm-9.7-5.5H8a13 13 0 0 1 0-4.4H4.3a8 8 0 0 0 0 4.4Zm5.2 0h5c.2-1.5.2-3 0-4.4h-5c-.2 1.5-.2 3 0 4.4Zm6.5 0h3.7a8 8 0 0 0 0-4.4H16c.2 1.5.2 3 0 4.4Zm-.3-5.9H19c-1-2-3-3.5-5.2-4 .8 1.2 1.4 2.6 1.8 4Zm-5.8 0H14A12 12 0 0 0 12 4a12 12 0 0 0-2.1 4.3Zm-5 0h3.4c.4-1.4 1-2.8 1.8-4-2.3.5-4.1 2-5.2 4Z" })], -1),
			l(" " + w(t.openerLabel) + " ", 1),
			r[1] ||= s("svg", {
				class: "dads-menu-list-box__opener-arrow",
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "currentcolor",
				"aria-hidden": "true"
			}, [s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" })], -1)
		], 40, Si), N(s("div", {
			id: d.value,
			class: "dads-menu-list-box__popup"
		}, [s("ul", {
			ref_key: "menuRef",
			ref: S,
			class: "dads-menu-list",
			role: "menu",
			"aria-labelledby": u.value,
			onKeydown: H
		}, [(v(!0), o(e, null, b(t.options, (e, t) => (v(), o("li", {
			key: e.value,
			role: "presentation"
		}, [s("a", {
			id: f(t),
			ref_for: !0,
			ref: te(t),
			role: "menuitem",
			class: "dads-menu-list__item",
			href: e.href ?? "#",
			lang: e.value,
			hreflang: e.value,
			"data-type": "box",
			"data-size": "regular",
			"data-current": E(e) ? "" : void 0,
			"aria-current": E(e) ? "true" : void 0,
			tabindex: "-1",
			onClick: (t) => P(e, t)
		}, [r[2] ||= s("svg", {
			class: "dads-menu-list__front-icon dads-language-selector__check",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentcolor",
			"aria-hidden": "true"
		}, [s("path", { d: "m9.5 18-5.7-5.7 1.5-1.4 4.2 4.3L18.7 6l1.4 1.4L9.5 18Z" })], -1), s("span", Ei, w(e.label), 1)], 8, Ti)]))), 128))], 40, wi)], 8, Ci), [[k, T.value]])], 2)], 512));
	}
}), [["__scopeId", "data-v-43bbf786"]]), Oi = {
	key: 0,
	class: "dads-menu-list__section",
	role: "presentation"
}, ki = { class: "dads-menu-list__section-title" }, Ai = {
	key: 1,
	class: "dads-menu-list__divider"
}, ji = [
	"href",
	"aria-current",
	"onClick"
], Mi = { class: "dads-menu-list__label" }, Ni = [
	"disabled",
	"aria-current",
	"aria-expanded",
	"onClick"
], Pi = { class: "dads-menu-list__label" }, Fi = {
	key: 0,
	class: "dads-menu-list__section",
	role: "presentation"
}, Ii = { class: "dads-menu-list__section-title" }, Li = {
	key: 1,
	class: "dads-menu-list__divider"
}, Ri = [
	"href",
	"aria-current",
	"onClick"
], zi = { class: "dads-menu-list__label" }, Bi = [
	"disabled",
	"aria-current",
	"aria-expanded",
	"onClick"
], Vi = { class: "dads-menu-list__label" }, Hi = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let c = t, u = n, d = r(() => c.indentation + 1), p = r(() => c.indentation > 0 ? { "--menu-list-indentation": String(c.indentation) } : void 0), m = (e) => !!e.href && !e.disabled, g = (e) => ({
			class: "dads-menu-list__item",
			"data-type": c.type,
			"data-size": c.size,
			...e.active ? { "data-current": "" } : {},
			...e.expanded ? { "data-expanded": "" } : {}
		}), _ = (e, t) => {
			if (e.disabled) {
				t.preventDefault();
				return;
			}
			u("click:item", e, t);
		}, y = (e, t) => {
			u("click:item", e, t);
		};
		return (n, r) => {
			let c = S("DadsMenuList", !0);
			return t.ariaLabel ? (v(), i(C(t.ariaLabel ? "nav" : "ul"), {
				key: 0,
				class: "dads-menu-list-root",
				"aria-label": t.ariaLabel
			}, {
				default: M(() => [s("ul", {
					class: "dads-menu-list",
					style: h(p.value)
				}, [(v(!0), o(e, null, b(t.items, (n, r) => (v(), o("li", { key: r }, [n.divider ? (v(), o(e, { key: 0 }, [typeof n.divider == "object" && n.divider.title ? (v(), o("div", Oi, [s("span", ki, w(n.divider.title), 1)])) : (v(), o("hr", Ai))], 64)) : m(n) ? (v(), o("a", f({
					key: 1,
					ref_for: !0
				}, g(n), {
					href: n.href,
					"aria-current": n.active ? "page" : void 0,
					onClick: (e) => _(n, e)
				}), [
					n.frontIcon ? (v(), i(B, {
						key: 0,
						name: n.frontIcon,
						class: "dads-menu-list__front-icon",
						size: 20
					}, null, 8, ["name"])) : a("", !0),
					s("span", Mi, [l(w(n.label) + " ", 1), n.tailIcon ? (v(), i(B, {
						key: 0,
						name: n.tailIcon,
						class: "dads-menu-list__tail-icon",
						size: 16,
						label: n.tailIconLabel || void 0
					}, null, 8, ["name", "label"])) : a("", !0)]),
					n.endIcon ? (v(), i(B, {
						key: 1,
						name: n.endIcon,
						class: "dads-menu-list__end-icon",
						size: 16
					}, null, 8, ["name"])) : a("", !0)
				], 16, ji)) : (v(), o("button", f({
					key: 2,
					type: "button"
				}, { ref_for: !0 }, g(n), {
					disabled: n.disabled || void 0,
					"aria-current": n.active ? "page" : void 0,
					"aria-expanded": n.children && n.children.length > 0 ? !!n.expanded : void 0,
					onClick: (e) => _(n, e)
				}), [
					n.frontIcon ? (v(), i(B, {
						key: 0,
						name: n.frontIcon,
						class: "dads-menu-list__front-icon",
						size: 20
					}, null, 8, ["name"])) : a("", !0),
					s("span", Pi, [l(w(n.label) + " ", 1), n.tailIcon ? (v(), i(B, {
						key: 0,
						name: n.tailIcon,
						class: "dads-menu-list__tail-icon",
						size: 16,
						label: n.tailIconLabel || void 0
					}, null, 8, ["name", "label"])) : a("", !0)]),
					n.endIcon ? (v(), i(B, {
						key: 1,
						name: n.endIcon,
						class: "dads-menu-list__end-icon",
						size: 16
					}, null, 8, ["name"])) : a("", !0)
				], 16, Ni)), n.children && n.children.length > 0 ? (v(), i(c, {
					key: 3,
					items: n.children,
					type: t.type,
					size: t.size,
					indentation: d.value,
					"onClick:item": y
				}, null, 8, [
					"items",
					"type",
					"size",
					"indentation"
				])) : a("", !0)]))), 128))], 4)]),
				_: 1
			}, 8, ["aria-label"])) : (v(), o("ul", {
				key: 1,
				class: "dads-menu-list",
				style: h(p.value)
			}, [(v(!0), o(e, null, b(t.items, (n, r) => (v(), o("li", { key: r }, [n.divider ? (v(), o(e, { key: 0 }, [typeof n.divider == "object" && n.divider.title ? (v(), o("div", Fi, [s("span", Ii, w(n.divider.title), 1)])) : (v(), o("hr", Li))], 64)) : m(n) ? (v(), o("a", f({
				key: 1,
				ref_for: !0
			}, g(n), {
				href: n.href,
				"aria-current": n.active ? "page" : void 0,
				onClick: (e) => _(n, e)
			}), [
				n.frontIcon ? (v(), i(B, {
					key: 0,
					name: n.frontIcon,
					class: "dads-menu-list__front-icon",
					size: 20
				}, null, 8, ["name"])) : a("", !0),
				s("span", zi, [l(w(n.label) + " ", 1), n.tailIcon ? (v(), i(B, {
					key: 0,
					name: n.tailIcon,
					class: "dads-menu-list__tail-icon",
					size: 16,
					label: n.tailIconLabel || void 0
				}, null, 8, ["name", "label"])) : a("", !0)]),
				n.endIcon ? (v(), i(B, {
					key: 1,
					name: n.endIcon,
					class: "dads-menu-list__end-icon",
					size: 16
				}, null, 8, ["name"])) : a("", !0)
			], 16, Ri)) : (v(), o("button", f({
				key: 2,
				type: "button"
			}, { ref_for: !0 }, g(n), {
				disabled: n.disabled || void 0,
				"aria-current": n.active ? "page" : void 0,
				"aria-expanded": n.children && n.children.length > 0 ? !!n.expanded : void 0,
				onClick: (e) => _(n, e)
			}), [
				n.frontIcon ? (v(), i(B, {
					key: 0,
					name: n.frontIcon,
					class: "dads-menu-list__front-icon",
					size: 20
				}, null, 8, ["name"])) : a("", !0),
				s("span", Vi, [l(w(n.label) + " ", 1), n.tailIcon ? (v(), i(B, {
					key: 0,
					name: n.tailIcon,
					class: "dads-menu-list__tail-icon",
					size: 16,
					label: n.tailIconLabel || void 0
				}, null, 8, ["name", "label"])) : a("", !0)]),
				n.endIcon ? (v(), i(B, {
					key: 1,
					name: n.endIcon,
					class: "dads-menu-list__end-icon",
					size: 16
				}, null, 8, ["name"])) : a("", !0)
			], 16, Bi)), n.children && n.children.length > 0 ? (v(), i(c, {
				key: 3,
				items: n.children,
				type: t.type,
				size: t.size,
				indentation: d.value,
				"onClick:item": y
			}, null, 8, [
				"items",
				"type",
				"size",
				"indentation"
			])) : a("", !0)]))), 128))], 4));
		};
	}
}), [["__scopeId", "data-v-d677db9e"]]), Ui = [
	"id",
	"data-size",
	"data-style",
	"aria-expanded",
	"aria-controls"
], Wi = { class: "dads-menu-list-box__popup" }, Gi = [
	"id",
	"aria-label",
	"aria-labelledby"
], Ki = [
	"href",
	"aria-current",
	"data-current",
	"onClick"
], qi = { class: "dads-menu-list__label" }, Ji = [
	"disabled",
	"aria-current",
	"aria-disabled",
	"data-current",
	"onClick"
], Yi = { class: "dads-menu-list__label" }, Xi = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		triggerStyle: { default: "text" },
		placement: { default: "start" }
	},
	emits: [
		"click:item",
		"update:modelValue",
		"open",
		"close"
	],
	setup(t, { emit: n }) {
		let c = t, d = n, f = r(() => !!c.triggerLabel), p = r(() => f.value ? c.modelValue : !0), h = D(), g = D();
		A(() => c.modelValue, (e, t) => {
			f.value && e !== t && d(e ? "open" : "close");
		});
		let _ = () => {
			f.value && d("update:modelValue", !c.modelValue);
		}, y = r(() => c.items.map((e, t) => ({
			item: e,
			index: t,
			isLink: !!e.href && !e.disabled
		}))), x = (e, t, n) => {
			if (e.disabled) {
				n.preventDefault();
				return;
			}
			d("click:item", e, t, n);
		}, S = r(() => ["dads-menu-list-box", {
			"dads-menu-list-box--with-opener": f.value,
			[`dads-menu-list-box--placement-${c.placement}`]: f.value
		}]);
		return (n, r) => (v(), o("div", { class: m(S.value) }, [f.value ? (v(), o("button", {
			key: 0,
			id: T(g),
			type: "button",
			class: "dads-menu-list-box__opener",
			"data-size": t.triggerSize,
			"data-style": t.triggerStyle,
			"aria-haspopup": "menu",
			"aria-expanded": p.value ? "true" : "false",
			"aria-controls": T(h),
			onClick: _
		}, [
			t.triggerIcon ? (v(), i(B, {
				key: 0,
				name: t.triggerIcon,
				class: "dads-menu-list-box__opener-icon",
				size: 20
			}, null, 8, ["name"])) : a("", !0),
			l(" " + w(t.triggerLabel) + " ", 1),
			u(B, {
				name: "keyboard_arrow_down",
				class: "dads-menu-list-box__opener-arrow",
				size: 16
			})
		], 8, Ui)) : a("", !0), N(s("div", Wi, [s("ul", {
			id: T(h),
			class: "dads-menu-list",
			role: "menu",
			"aria-label": t.ariaLabel || void 0,
			"aria-labelledby": !t.ariaLabel && f.value ? T(g) : void 0
		}, [(v(!0), o(e, null, b(y.value, (e) => (v(), o("li", {
			key: e.index,
			role: "presentation"
		}, [e.isLink ? (v(), o("a", {
			key: 0,
			href: e.item.href,
			class: "dads-menu-list__item",
			"data-type": "box",
			"data-size": "regular",
			role: "menuitem",
			"aria-current": e.item.active ? "page" : void 0,
			"data-current": e.item.active ? "" : void 0,
			onClick: (t) => x(e.item, e.index, t)
		}, [e.item.iconName ? (v(), i(B, {
			key: 0,
			name: e.item.iconName,
			class: "dads-menu-list__front-icon",
			size: 24
		}, null, 8, ["name"])) : a("", !0), s("span", qi, w(e.item.label), 1)], 8, Ki)) : (v(), o("button", {
			key: 1,
			type: "button",
			class: "dads-menu-list__item",
			"data-type": "box",
			"data-size": "regular",
			role: "menuitem",
			disabled: e.item.disabled,
			"aria-current": e.item.active ? "page" : void 0,
			"aria-disabled": e.item.disabled || void 0,
			"data-current": e.item.active ? "" : void 0,
			onClick: (t) => x(e.item, e.index, t)
		}, [e.item.iconName ? (v(), i(B, {
			key: 0,
			name: e.item.iconName,
			class: "dads-menu-list__front-icon",
			size: 24
		}, null, 8, ["name"])) : a("", !0), s("span", Yi, w(e.item.label), 1)], 8, Ji))]))), 128))], 8, Gi)], 512), [[k, p.value]])], 2));
	}
}), [["__scopeId", "data-v-d2ab54b5"]]), Zi = ["aria-label"], Qi = [
	"href",
	"target",
	"rel",
	"onClick"
], $i = { class: "dads-utility-link__label" }, ea = ["aria-label"], ta = [
	"href",
	"target",
	"rel"
], na = { class: "dads-utility-link__label" }, ra = ["aria-label"], ia = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let c = t, l = n, u = r(() => c.items === void 0 ? c.href === void 0 || c.label === void 0 ? [] : [{
			label: c.label,
			href: c.href,
			iconName: c.iconName,
			external: c.external
		}] : c.items), d = r(() => c.items !== void 0), f = (e, t, n) => {
			l("click:item", e, t, n);
		};
		return (n, r) => d.value ? (v(), o("ul", {
			key: 0,
			class: "dads-utility-link-list",
			"aria-label": t.ariaLabel
		}, [(v(!0), o(e, null, b(u.value, (e, n) => (v(), o("li", {
			key: `${e.href}-${n}`,
			class: "dads-utility-link-list__item"
		}, [s("a", {
			class: "dads-utility-link",
			href: e.href,
			target: e.external ? "_blank" : void 0,
			rel: e.external ? "noopener noreferrer" : void 0,
			onClick: (t) => f(e, n, t)
		}, [
			e.iconName ? (v(), i(B, {
				key: 0,
				name: e.iconName,
				class: "dads-utility-link__lead-icon",
				size: 16
			}, null, 8, ["name"])) : a("", !0),
			s("span", $i, w(e.label), 1),
			e.external ? (v(), o("svg", {
				key: 1,
				class: "dads-utility-link__tail-icon",
				width: "16",
				height: "16",
				viewBox: "0 0 48 48",
				fill: "currentcolor",
				role: "img",
				"aria-label": t.newTabAriaLabel
			}, [...r[1] ||= [s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)]], 8, ea)) : a("", !0)
		], 8, Qi)]))), 128))], 8, Zi)) : u.value.length === 1 ? (v(), o("a", {
			key: 1,
			class: "dads-utility-link",
			href: u.value[0].href,
			target: u.value[0].external ? "_blank" : void 0,
			rel: u.value[0].external ? "noopener noreferrer" : void 0,
			onClick: r[0] ||= (e) => f(u.value[0], 0, e)
		}, [
			u.value[0].iconName ? (v(), i(B, {
				key: 0,
				name: u.value[0].iconName,
				class: "dads-utility-link__lead-icon",
				size: 16
			}, null, 8, ["name"])) : a("", !0),
			s("span", na, w(u.value[0].label), 1),
			u.value[0].external ? (v(), o("svg", {
				key: 1,
				class: "dads-utility-link__tail-icon",
				width: "16",
				height: "16",
				viewBox: "0 0 48 48",
				fill: "currentcolor",
				role: "img",
				"aria-label": t.newTabAriaLabel
			}, [...r[2] ||= [s("path", { d: "M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" }, null, -1)]], 8, ra)) : a("", !0)
		], 8, ta)) : a("", !0);
	}
}), [["__scopeId", "data-v-5c5e0d95"]]), aa = ["aria-label"], oa = { class: "dads-global-menu" }, sa = [
	"href",
	"aria-current",
	"aria-disabled",
	"tabindex",
	"onClick"
], ca = { class: "dads-global-menu__label" }, la = [
	"disabled",
	"aria-current",
	"aria-haspopup",
	"aria-expanded",
	"onClick"
], ua = { class: "dads-global-menu__label" }, da = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsGlobalMenu",
	props: {
		items: {},
		ariaLabel: { default: "グローバルメニュー" }
	},
	emits: ["click:item"],
	setup(t, { emit: n }) {
		let r = n, c = (e) => Array.isArray(e.children) && e.children.length > 0, l = (e) => !!e.href && !c(e), u = (e, t) => {
			if (e.disabled) {
				t.preventDefault();
				return;
			}
			r("click:item", e, t);
		};
		return (n, r) => (v(), o("nav", {
			class: "dads-global-menu-root",
			"aria-label": t.ariaLabel
		}, [s("ul", oa, [(v(!0), o(e, null, b(t.items, (e, t) => (v(), o("li", {
			key: t,
			class: "dads-global-menu__item"
		}, [l(e) ? (v(), o("a", {
			key: 0,
			class: "dads-global-menu__item-inner",
			href: e.disabled ? void 0 : e.href,
			"aria-current": e.active ? "page" : void 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			tabindex: e.disabled ? -1 : void 0,
			onClick: (t) => u(e, t)
		}, [e.frontIcon ? (v(), i(B, {
			key: 0,
			name: e.frontIcon,
			class: "dads-global-menu__front-icon",
			size: 24
		}, null, 8, ["name"])) : a("", !0), s("span", ca, w(e.label), 1)], 8, sa)) : (v(), o("button", {
			key: 1,
			type: "button",
			class: "dads-global-menu__item-inner",
			disabled: e.disabled || void 0,
			"aria-current": e.active ? "page" : void 0,
			"aria-haspopup": c(e) ? "menu" : void 0,
			"aria-expanded": c(e) ? !!e.expanded : void 0,
			onClick: (t) => u(e, t)
		}, [
			e.frontIcon ? (v(), i(B, {
				key: 0,
				name: e.frontIcon,
				class: "dads-global-menu__front-icon",
				size: 24
			}, null, 8, ["name"])) : a("", !0),
			s("span", ua, w(e.label), 1),
			c(e) ? (v(), i(B, {
				key: 1,
				name: "keyboard_arrow_down",
				class: "dads-global-menu__chevron",
				size: 16
			})) : a("", !0)
		], 8, la))]))), 128))])], 8, aa));
	}
}), [["__scopeId", "data-v-e810c68c"]]), fa = [
	"id",
	"aria-expanded",
	"aria-controls"
], pa = { class: "dads-mega-menu__trigger-label" }, ma = [
	"id",
	"aria-label",
	"aria-labelledby"
], ha = { class: "dads-mega-menu__columns" }, ga = {
	key: 0,
	class: "dads-mega-menu__heading"
}, _a = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let i = t, c = n, l = D(), d = r(() => `dads-mega-menu-trigger-${l}`), f = r(() => `dads-mega-menu-panel-${l}`), p = y(null), h = y(null), x = r(() => i.modelValue), S = () => {
			x.value || c("update:modelValue", !0);
		}, C = (e = !1) => {
			x.value && (c("update:modelValue", !1), e && h.value?.focus());
		}, T = () => {
			x.value ? C() : S();
		}, E = (e) => {
			e.preventDefault(), T();
		}, O = (e) => {
			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault(), T();
					break;
				case "ArrowDown":
					e.preventDefault(), S();
					break;
			}
		}, j = (e) => {
			e.key === "Escape" && (e.preventDefault(), C(!0));
		}, M = (e, t) => {
			c("click:item", e, t), e.disabled || C();
		}, F = (e) => {
			if (!x.value) return;
			let t = e.target;
			t && p.value && p.value.contains(t) || C();
		};
		_(() => {
			document.addEventListener("pointerdown", F, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", F, !0);
		});
		let I = (e) => {
			e.key === "Escape" && x.value && (e.preventDefault(), C(!0));
		};
		return A(() => i.modelValue, () => {}), (n, r) => (v(), o("div", {
			ref_key: "rootRef",
			ref: p,
			class: m(["dads-mega-menu", { "dads-mega-menu--open": x.value }])
		}, [s("button", {
			id: d.value,
			ref_key: "triggerRef",
			ref: h,
			type: "button",
			class: "dads-mega-menu__trigger",
			"aria-expanded": x.value,
			"aria-controls": f.value,
			"aria-haspopup": "dialog",
			onClick: E,
			onKeydown: [O, P(I, ["esc"])]
		}, [s("span", pa, w(t.triggerLabel), 1), (v(), o("svg", {
			class: m(["dads-mega-menu__trigger-arrow", { "dads-mega-menu__trigger-arrow--open": x.value }]),
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "currentcolor",
			"aria-hidden": "true"
		}, [...r[0] ||= [s("path", { d: "m20.5 6.6-8 8-8-8L3.1 8l9.4 9.4L21.9 8l-1.4-1.4Z" }, null, -1)]], 2))], 40, fa), N(s("div", {
			id: f.value,
			class: "dads-mega-menu__panel",
			role: "dialog",
			"aria-label": t.ariaLabel || t.triggerLabel,
			"aria-labelledby": t.ariaLabel ? void 0 : d.value,
			onKeydown: j
		}, [s("div", ha, [(v(!0), o(e, null, b(t.columns, (e, t) => (v(), o("section", {
			key: t,
			class: "dads-mega-menu__column"
		}, [e.heading ? (v(), o("h3", ga, w(e.heading), 1)) : a("", !0), u(Hi, {
			items: e.items,
			"onClick:item": M
		}, null, 8, ["items"])]))), 128))])], 40, ma), [[k, x.value]])], 2));
	}
}), [["__scopeId", "data-v-703200a8"]]), va = ["aria-label"], ya = { class: "dads-page-navigation__list" }, ba = {
	key: 0,
	class: "dads-page-navigation__item"
}, xa = ["disabled", "aria-label"], Sa = {
	key: 1,
	class: "dads-page-navigation__item"
}, Ca = ["disabled"], wa = { class: "dads-page-navigation__label" }, Ta = {
	key: 0,
	class: "dads-page-navigation__item"
}, Ea = {
	key: 1,
	class: "dads-page-navigation__item"
}, Da = [
	"aria-current",
	"disabled",
	"onClick"
], Oa = {
	key: 2,
	class: "dads-page-navigation__item"
}, ka = ["disabled"], Aa = { class: "dads-page-navigation__label" }, ja = {
	key: 3,
	class: "dads-page-navigation__item"
}, Ma = ["disabled", "aria-label"], Na = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		}), d = (e) => e === i.modelValue, f = r(() => i.disabled || i.modelValue <= 1), p = r(() => i.disabled || i.modelValue >= i.totalPages), h = f, g = p, _ = (e) => {
			if (i.disabled) return;
			let t = Math.max(1, Math.min(i.totalPages, Math.floor(e)));
			t !== i.modelValue && (c("update:modelValue", t), c("change", t));
		};
		return (n, r) => (v(), o("nav", {
			class: "dads-page-navigation",
			"aria-label": t.ariaLabel
		}, [s("ul", ya, [
			t.showFirstLast ? (v(), o("li", ba, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--first",
				disabled: T(h) || void 0,
				"aria-label": t.firstLabel,
				onClick: r[0] ||= (e) => _(1)
			}, [u(B, {
				name: "keyboard_double_arrow_left",
				size: 20
			})], 8, xa)])) : a("", !0),
			t.showPrevNext ? (v(), o("li", Sa, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--prev",
				disabled: f.value || void 0,
				onClick: r[1] ||= (e) => _(t.modelValue - 1)
			}, [u(B, {
				name: "chevron_left",
				size: 20
			}), s("span", wa, w(t.prevLabel), 1)], 8, Ca)])) : a("", !0),
			(v(!0), o(e, null, b(l.value, (n, i) => (v(), o(e, { key: `p-${i}-${n}` }, [n === "ellipsis" ? (v(), o("li", Ta, [...r[4] ||= [s("span", {
				class: "dads-page-navigation__ellipsis",
				"aria-hidden": "true"
			}, "…", -1)]])) : (v(), o("li", Ea, [s("button", {
				type: "button",
				class: m(["dads-page-navigation__btn dads-page-navigation__btn--page", { "is-active": d(n) }]),
				"aria-current": d(n) ? "page" : void 0,
				disabled: t.disabled || void 0,
				onClick: (e) => _(n)
			}, w(n), 11, Da)]))], 64))), 128)),
			t.showPrevNext ? (v(), o("li", Oa, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--next",
				disabled: p.value || void 0,
				onClick: r[2] ||= (e) => _(t.modelValue + 1)
			}, [s("span", Aa, w(t.nextLabel), 1), u(B, {
				name: "chevron_right",
				size: 20
			})], 8, ka)])) : a("", !0),
			t.showFirstLast ? (v(), o("li", ja, [s("button", {
				type: "button",
				class: "dads-page-navigation__btn dads-page-navigation__btn--last",
				disabled: T(g) || void 0,
				"aria-label": t.lastLabel,
				onClick: r[3] ||= (e) => _(t.totalPages)
			}, [u(B, {
				name: "keyboard_double_arrow_right",
				size: 20
			})], 8, Ma)])) : a("", !0)
		])], 8, va));
	}
}), [["__scopeId", "data-v-394552ac"]]), Pa = ["aria-label"], Fa = { class: "dads-table-of-contents__list" }, Ia = [
	"href",
	"aria-current",
	"onClick"
], La = {
	key: 0,
	class: "dads-table-of-contents__list dads-table-of-contents__list--nested"
}, Ra = [
	"href",
	"aria-current",
	"onClick"
], za = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		return (n, r) => (v(), o("nav", {
			class: "dads-table-of-contents",
			"aria-label": t.ariaLabel
		}, [s("ul", Fa, [(v(!0), o(e, null, b(t.items, (t) => (v(), o("li", {
			key: t.id,
			class: m(["dads-table-of-contents__item", { "dads-table-of-contents__item--active": l(t) }])
		}, [s("a", {
			class: m(["dads-table-of-contents__link", { "dads-table-of-contents__link--active": l(t) }]),
			href: c(t),
			"aria-current": l(t) ? "location" : void 0,
			onClick: (e) => u(t, e)
		}, w(t.label), 11, Ia), t.children && t.children.length > 0 ? (v(), o("ul", La, [(v(!0), o(e, null, b(t.children, (e) => (v(), o("li", {
			key: e.id,
			class: m(["dads-table-of-contents__item dads-table-of-contents__item--nested", { "dads-table-of-contents__item--active": l(e) }])
		}, [s("a", {
			class: m(["dads-table-of-contents__link dads-table-of-contents__link--nested", { "dads-table-of-contents__link--active": l(e) }]),
			href: c(e),
			"aria-current": l(e) ? "location" : void 0,
			onClick: (t) => u(e, t)
		}, w(e.label), 11, Ra)], 2))), 128))])) : a("", !0)], 2))), 128))])], 8, Pa));
	}
}), [["__scopeId", "data-v-cb31444f"]]), Ba = ["aria-label"], Va = {
	key: 0,
	class: "dads-mobile-menu__header"
}, Ha = ["aria-label"], Ua = {
	key: 1,
	class: "dads-mobile-menu__panel-title"
}, Wa = ["aria-label"], Ga = ["aria-label"], Ka = {
	key: 1,
	class: "dads-mobile-menu__slide-list"
}, qa = ["href", "onClick"], Ja = { class: "dads-mobile-menu__slide-item-label" }, Ya = ["onClick"], Xa = { class: "dads-mobile-menu__slide-item-label" }, Za = {
	key: 1,
	class: "dads-mobile-menu__utility"
}, Qa = "a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", $a = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
	setup(c, { emit: l }) {
		let d = c, f = l, h = y(null), g = r(() => d.type === "slide"), _ = y([]), x = r(() => _.value.length === 0 ? { items: d.items } : _.value[_.value.length - 1]), S = r(() => _.value.length > 0), C = null, T = () => {
			f("update:modelValue", !1);
		}, E = (e, t) => {
			f("click:item", e, t), (!e.children || e.children.length === 0) && T();
		}, D = (e, t) => {
			if (e.children && e.children.length > 0) {
				_.value.push({
					label: e.label,
					items: e.children
				});
				return;
			}
			f("click:item", e, t), T();
		}, O = () => {
			_.value.pop();
		}, k = (e, t, n) => {
			f("click:utility", e, t, n), T();
		}, j = () => h.value ? Array.from(h.value.querySelectorAll(Qa)) : [], N = (e) => {
			let t = j();
			if (t.length === 0) return;
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			e.shiftKey ? (i === n || i === h.value) && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
		return A(() => d.modelValue, async (e) => {
			e ? (C = document.activeElement, _.value = [], await p(), h.value?.focus()) : C &&= (C.focus(), null);
		}), (r, l) => (v(), i(t, { to: "body" }, [u(n, { name: "dads-mobile-menu" }, {
			default: M(() => [c.modelValue ? (v(), o("div", {
				key: 0,
				class: m(["dads-mobile-menu", `dads-mobile-menu--type-${c.type}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-label": c.ariaLabel,
				onKeydown: [P(T, ["esc"]), P(N, ["tab"])]
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
				c.showCloseButton || g.value && S.value ? (v(), o("header", Va, [
					g.value && S.value ? (v(), o("button", {
						key: 0,
						type: "button",
						class: "dads-mobile-menu__back",
						"aria-label": c.backLabel,
						onClick: O
					}, [u(B, {
						name: "chevron_left",
						class: "dads-mobile-menu__back-icon",
						size: 20
					}), s("span", null, w(c.backLabel), 1)], 8, Ha)) : a("", !0),
					g.value && x.value.label ? (v(), o("h2", Ua, w(x.value.label), 1)) : a("", !0),
					c.showCloseButton ? (v(), o("button", {
						key: 2,
						type: "button",
						class: "dads-mobile-menu__close",
						"aria-label": c.closeLabel,
						onClick: T
					}, [...l[0] ||= [s("svg", {
						class: "dads-mobile-menu__close-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 120 120",
						"aria-hidden": "true"
					}, [s("path", {
						d: "M32 95L25 88L53 60L25 32L32 25L60 53L88 25L95 32L67 60L95 88L88 95L60 67L32 95Z",
						fill: "currentcolor"
					})], -1)]], 8, Wa)) : a("", !0)
				])) : a("", !0),
				s("nav", {
					class: "dads-mobile-menu__nav",
					"aria-label": c.navAriaLabel
				}, [g.value ? (v(), o("ul", Ka, [(v(!0), o(e, null, b(x.value.items, (e, t) => (v(), o("li", {
					key: t,
					class: "dads-mobile-menu__slide-item-wrap"
				}, [e.href && (!e.children || e.children.length === 0) ? (v(), o("a", {
					key: 0,
					href: e.href,
					class: "dads-mobile-menu__slide-item",
					onClick: (t) => D(e, t)
				}, [s("span", Ja, w(e.label), 1)], 8, qa)) : (v(), o("button", {
					key: 1,
					type: "button",
					class: m(["dads-mobile-menu__slide-item", { "dads-mobile-menu__slide-item--parent": e.children && e.children.length > 0 }]),
					onClick: (t) => D(e, t)
				}, [s("span", Xa, w(e.label), 1), e.children && e.children.length > 0 ? (v(), i(B, {
					key: 0,
					name: "chevron_right",
					class: "dads-mobile-menu__slide-item-chevron",
					size: 24
				})) : a("", !0)], 10, Ya))]))), 128))])) : (v(), i(Hi, {
					key: 0,
					items: c.items,
					type: "box",
					"onClick:item": E
				}, null, 8, ["items"]))], 8, Ga),
				c.utilityItems && c.utilityItems.length > 0 ? (v(), o("div", Za, [u(ia, {
					items: c.utilityItems,
					"aria-label": c.subLinksAriaLabel,
					"onClick:item": k
				}, null, 8, ["items", "aria-label"])])) : a("", !0)
			], 512)], 42, Ba)) : a("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-1638542a"]]), eo = [
	"src",
	"alt",
	"width",
	"height",
	"loading"
], to = { class: "dads-image__caption" }, no = [
	"src",
	"alt",
	"width",
	"height",
	"loading"
], ro = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let n = e, i = t, a = y(!1), c = r(() => a.value && n.placeholder ? n.placeholder : n.src), l = y(!1), u = (e) => {
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
		return (t, n) => e.caption ? (v(), o("figure", {
			key: 0,
			class: m(f.value)
		}, [s("img", {
			class: "dads-image__img",
			src: c.value,
			alt: e.alt,
			width: e.width,
			height: e.height,
			loading: e.loading,
			onError: d,
			onLoad: u
		}, null, 40, eo), s("figcaption", to, w(e.caption), 1)], 2)) : (v(), o("img", {
			key: 1,
			class: m([...f.value, "dads-image__img"]),
			src: c.value,
			alt: e.alt,
			width: e.width,
			height: e.height,
			loading: e.loading,
			onError: d,
			onLoad: u
		}, null, 42, no));
	}
}), [["__scopeId", "data-v-27ffff07"]]), io = ["aria-labelledby", "aria-label"], ao = { class: "dads-carousel__inner" }, oo = { class: "dads-carousel__panels" }, so = { class: "dads-carousel__panel-set" }, co = {
	class: "dads-carousel__number dads-carousel__panel-number",
	"aria-current": "true",
	"aria-hidden": "true"
}, lo = {
	class: "dads-carousel__main",
	"aria-live": "polite",
	"aria-atomic": "true"
}, uo = ["role", "aria-label"], fo = { class: "dads-u-visually-hidden" }, po = { class: "dads-carousel__image-container" }, mo = [
	"src",
	"srcset",
	"alt",
	"width",
	"height"
], ho = { class: "dads-carousel__next" }, go = { class: "dads-carousel__next-image-container" }, _o = [
	"src",
	"srcset",
	"width",
	"height"
], vo = { class: "dads-carousel__next-image-label" }, yo = { class: "dads-carousel__main-bg" }, bo = [
	"src",
	"srcset",
	"width",
	"height"
], xo = { class: "dads-carousel__next-bg" }, So = [
	"src",
	"srcset",
	"width",
	"height"
], Co = { class: "dads-carousel__controls" }, wo = { class: "dads-carousel__step-nav-wrap" }, To = ["aria-label"], Eo = [
	"aria-selected",
	"tabindex",
	"onClick"
], Do = { class: "dads-u-visually-hidden" }, Oo = { class: "dads-carousel__page-nav" }, ko = { class: "dads-u-visually-hidden" }, Ao = { class: "dads-u-visually-hidden" }, jo = { class: "dads-carousel__others dads-disclosure" }, Mo = { class: "dads-disclosure__summary" }, No = { class: "dads-carousel__others-content dads-disclosure__content" }, Po = {
	class: "dads-carousel__number dads-carousel__panel-number",
	"aria-hidden": "true"
}, Fo = { class: "dads-carousel__main" }, Io = { class: "dads-u-visually-hidden" }, Lo = { class: "dads-carousel__image-container" }, Ro = [
	"src",
	"srcset",
	"alt",
	"width",
	"height"
], zo = { class: "dads-carousel__main-bg" }, Bo = [
	"src",
	"srcset",
	"width",
	"height"
], Vo = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsCarousel",
	props: {
		slides: {},
		modelValue: { default: 0 },
		heading: {},
		headingLevel: { default: 2 },
		ariaLabel: { default: "スライドショー" },
		breakpointRem: { default: 64 },
		unit: { default: "スライド" },
		showAllLabel: { default: "すべてのスライド" },
		prevSlideAriaLabel: { default: "前のスライド" },
		nextSlideAriaLabel: { default: "次のスライド" },
		nextPreviewLabel: { default: "次のスライド" },
		stepNavAriaLabel: { default: "スライド選択" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let c = t, u = n, d = `dads-carousel-heading-${D()}`, f = r(() => c.slides.length), p = r(() => `h${c.headingLevel}`), m = r(() => {
			if (f.value === 0) return 0;
			let e = c.modelValue ?? 0;
			return e < 0 ? 0 : e >= f.value ? f.value - 1 : e;
		}), h = r(() => f.value === 0 ? 0 : (m.value + 1) % f.value), x = r(() => c.slides[m.value]), S = r(() => c.slides[h.value]), T = (e) => {
			e < 0 || e >= f.value || e !== m.value && (u("update:modelValue", e), u("change", e));
		}, E = () => {
			f.value !== 0 && T((m.value + 1) % f.value);
		}, O = () => {
			f.value !== 0 && T((m.value + f.value - 1) % f.value);
		}, k = y(!1), A = y(null), j = null, N = (e) => {
			k.value = e / (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) >= c.breakpointRem;
		};
		_(() => {
			typeof ResizeObserver > "u" || !A.value || (j = new ResizeObserver((e) => {
				for (let t of e) {
					let e = t.borderBoxSize?.[0];
					N(e ? e.inlineSize : t.contentRect.width);
				}
			}), j.observe(A.value));
		}), g(() => {
			j?.disconnect(), j = null;
		});
		let P = y([]), F = (e, t) => {
			e && (P.value[t] = e);
		}, I = (e) => {
			P.value[e]?.focus();
		}, L = (e) => {
			if (f.value === 0) return;
			let t = null;
			e.key === "ArrowRight" || e.key === "ArrowDown" ? t = (m.value + 1) % f.value : (e.key === "ArrowLeft" || e.key === "ArrowUp") && (t = (m.value + f.value - 1) % f.value), t !== null && (e.preventDefault(), T(t), I(t));
		}, R = r(() => {
			let e = c.slides.map((e, t) => ({
				slide: e,
				index: t,
				number: t + 1
			}));
			return [...e.slice(m.value + 1), ...e.slice(0, m.value)];
		});
		return (n, r) => (v(), o("div", {
			ref_key: "rootRef",
			ref: A,
			class: "dads-carousel",
			role: "region",
			"aria-labelledby": t.heading ? d : void 0,
			"aria-label": t.heading ? void 0 : t.ariaLabel
		}, [s("div", ao, [
			t.heading ? (v(), i(C(p.value), {
				key: 0,
				id: d,
				class: "dads-carousel__heading"
			}, {
				default: M(() => [l(w(t.heading), 1)]),
				_: 1
			})) : a("", !0),
			s("div", oo, [s("div", so, [
				s("p", co, w(m.value + 1), 1),
				s("div", lo, [s("div", {
					class: "dads-carousel__main-panel",
					role: k.value ? "tabpanel" : void 0,
					"aria-label": k.value ? `${t.unit}${m.value + 1}` : void 0
				}, [(v(), i(C(x.value?.href ? "a" : "div"), {
					class: "dads-carousel__main-link",
					href: x.value?.href,
					target: x.value?.href ? x.value?.target : void 0,
					rel: x.value?.href ? x.value?.rel : void 0
				}, {
					default: M(() => [s("span", fo, w(t.unit) + w(m.value + 1), 1), s("div", po, [x.value ? (v(), o("img", {
						key: 0,
						src: x.value.src,
						srcset: x.value.srcset,
						alt: x.value.alt,
						width: x.value.width,
						height: x.value.height
					}, null, 8, mo)) : a("", !0)])]),
					_: 1
				}, 8, [
					"href",
					"target",
					"rel"
				]))], 8, uo)]),
				s("p", ho, [s("button", {
					type: "button",
					onClick: E
				}, [s("span", go, [S.value ? (v(), o("img", {
					key: 0,
					src: S.value.src,
					srcset: S.value.srcset,
					alt: "",
					width: S.value.width,
					height: S.value.height
				}, null, 8, _o)) : a("", !0)]), s("span", vo, w(t.nextPreviewLabel), 1)])]),
				s("div", yo, [s("div", null, [x.value ? (v(), o("img", {
					key: 0,
					src: x.value.src,
					srcset: x.value.srcset,
					alt: "",
					"aria-hidden": "true",
					width: x.value.width,
					height: x.value.height
				}, null, 8, bo)) : a("", !0)])]),
				s("div", xo, [s("div", null, [S.value ? (v(), o("img", {
					key: 0,
					src: S.value.src,
					srcset: S.value.srcset,
					alt: "",
					"aria-hidden": "true",
					width: S.value.width,
					height: S.value.height
				}, null, 8, So)) : a("", !0)])])
			])]),
			s("div", Co, [
				s("div", wo, [s("ul", {
					class: "dads-carousel__step-nav",
					role: "tablist",
					"aria-label": t.stepNavAriaLabel,
					onKeydown: L
				}, [(v(!0), o(e, null, b(t.slides, (e, n) => (v(), o("li", {
					key: n,
					role: "presentation"
				}, [s("button", {
					ref_for: !0,
					ref: (e) => F(e, n),
					class: "dads-carousel__step dads-carousel__number",
					type: "button",
					role: "tab",
					"aria-selected": n === m.value ? "true" : "false",
					tabindex: n === m.value ? 0 : -1,
					onClick: (e) => T(n)
				}, [s("span", Do, w(t.unit), 1), l(w(n + 1), 1)], 8, Eo)]))), 128))], 40, To)]),
				s("p", Oo, [
					s("button", {
						type: "button",
						onClick: O
					}, [r[0] ||= s("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						"aria-hidden": "true"
					}, [s("path", {
						d: "m5.27 8 5.33-5.33-.93-.94L3.4 8l6.27 6.27.93-.94L5.27 8Z",
						fill: "currentcolor"
					})], -1), s("span", ko, w(t.prevSlideAriaLabel), 1)]),
					s("span", null, w(m.value + 1) + " / " + w(f.value), 1),
					s("button", {
						type: "button",
						onClick: E
					}, [r[1] ||= s("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						"aria-hidden": "true"
					}, [s("path", {
						d: "m6 1.73-.93.94L10.4 8l-5.33 5.33.93.94L12.27 8 6 1.73Z",
						fill: "currentcolor"
					})], -1), s("span", Ao, w(t.nextSlideAriaLabel), 1)])
				]),
				s("details", jo, [s("summary", Mo, [r[2] ||= s("svg", {
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
				], -1), l(" " + w(t.showAllLabel), 1)]), s("div", No, [s("ul", null, [(v(!0), o(e, null, b(R.value, (e) => (v(), o("li", {
					key: e.index,
					class: "dads-carousel__panel-set"
				}, [
					s("p", Po, w(e.number), 1),
					s("div", Fo, [(v(), i(C(e.slide.href ? "a" : "div"), {
						class: "dads-carousel__main-link",
						href: e.slide.href,
						target: e.slide.href ? e.slide.target : void 0,
						rel: e.slide.href ? e.slide.rel : void 0
					}, {
						default: M(() => [s("span", Io, w(t.unit) + w(e.number), 1), s("div", Lo, [s("img", {
							src: e.slide.src,
							srcset: e.slide.srcset,
							alt: e.slide.alt,
							width: e.slide.width,
							height: e.slide.height
						}, null, 8, Ro)])]),
						_: 2
					}, 1032, [
						"href",
						"target",
						"rel"
					]))]),
					s("div", zo, [s("div", null, [s("img", {
						src: e.slide.src,
						srcset: e.slide.srcset,
						alt: "",
						"aria-hidden": "true",
						width: e.slide.width,
						height: e.slide.height
					}, null, 8, Bo)])])
				]))), 128))])])])
			])
		])], 8, io));
	}
}), [["__scopeId", "data-v-bf717355"]]), Ho = /* @__PURE__ */ d({
	__name: "DadsImageSlider",
	props: {
		slides: {},
		modelValue: { default: 0 },
		heading: {},
		headingLevel: { default: 2 },
		breakpointRem: {},
		unit: {},
		showAllLabel: {},
		prevSlideAriaLabel: {},
		nextSlideAriaLabel: {},
		nextPreviewLabel: {},
		stepNavAriaLabel: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (v(), i(Vo, {
			class: "dads-image-slider",
			slides: e.slides,
			"model-value": e.modelValue,
			heading: e.heading,
			"heading-level": e.headingLevel,
			"breakpoint-rem": e.breakpointRem,
			unit: e.unit,
			"show-all-label": e.showAllLabel,
			"prev-slide-aria-label": e.prevSlideAriaLabel,
			"next-slide-aria-label": e.nextSlideAriaLabel,
			"next-preview-label": e.nextPreviewLabel,
			"step-nav-aria-label": e.stepNavAriaLabel,
			"onUpdate:modelValue": r[0] ||= (e) => n("update:modelValue", e),
			onChange: r[1] ||= (e) => n("change", e)
		}, null, 8, [
			"slides",
			"model-value",
			"heading",
			"heading-level",
			"breakpoint-rem",
			"unit",
			"show-all-label",
			"prev-slide-aria-label",
			"next-slide-aria-label",
			"next-preview-label",
			"step-nav-aria-label"
		]));
	}
}), Uo = { class: "dads-carousel-single" }, Wo = [
	"src",
	"srcset",
	"alt",
	"width",
	"height"
], Go = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsCarouselSingle",
	props: {
		src: {},
		alt: {},
		srcset: {},
		href: {},
		target: {},
		rel: {},
		width: {},
		height: {}
	},
	setup(e) {
		let t = e, n = r(() => !!t.href), a = r(() => n.value ? "a" : "span");
		return (t, r) => (v(), o("div", Uo, [(v(), i(C(a.value), {
			class: "dads-carousel-single__link",
			href: n.value ? e.href : void 0,
			target: n.value ? e.target : void 0,
			rel: n.value ? e.rel : void 0
		}, {
			default: M(() => [s("img", {
				class: "dads-carousel-single__image",
				src: e.src,
				srcset: e.srcset,
				alt: e.alt,
				width: e.width,
				height: e.height
			}, null, 8, Wo)]),
			_: 1
		}, 8, [
			"href",
			"target",
			"rel"
		]))]));
	}
}), [["__scopeId", "data-v-cdb35b25"]]), Ko = ["data-marker", "data-spacing"], qo = { class: "dads-list__marker" }, Jo = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsList",
	props: {
		type: { default: "unordered" },
		items: {},
		start: { default: 1 },
		spacing: { default: "4" },
		nestingMarker: {
			type: Boolean,
			default: !0
		}
	},
	setup(t) {
		let n = t, c = r(() => n.type === "ordered"), u = r(() => c.value ? "number" : void 0), d = r(() => [
			"dads-list",
			`dads-list--spacing-${n.spacing}`,
			{ "dads-list--no-nesting-marker": !n.nestingMarker }
		]), f = (e) => typeof e == "string" ? { label: e } : e, p = (e, t) => e.marker ?? `${n.start + t}. `, h = r(() => Array.isArray(n.items) && n.items.length > 0);
		return (n, r) => {
			let g = S("DadsList", !0);
			return v(), o("ul", {
				class: m(d.value),
				"data-marker": u.value,
				"data-spacing": t.spacing
			}, [h.value ? (v(!0), o(e, { key: 0 }, b(t.items, (n, r) => (v(), o("li", { key: r }, [c.value ? (v(), o(e, { key: 0 }, [s("span", qo, w(p(f(n), r)), 1), s("span", null, w(f(n).label), 1)], 64)) : (v(), o(e, { key: 1 }, [l(w(f(n).label), 1)], 64)), f(n).children && f(n).children.length > 0 ? (v(), i(g, {
				key: 2,
				type: t.type,
				start: t.start,
				spacing: t.spacing,
				"nesting-marker": t.nestingMarker,
				items: f(n).children
			}, null, 8, [
				"type",
				"start",
				"spacing",
				"nesting-marker",
				"items"
			])) : a("", !0)]))), 128)) : x(n.$slots, "default", { key: 1 }, void 0, !0)], 10, Ko);
		};
	}
}), [["__scopeId", "data-v-2b48949a"]]), Yo = { class: "dads-blockquote-wrapper" }, Xo = ["cite"], Zo = { key: 1 }, Qo = {
	key: 0,
	class: "dads-blockquote__cite"
}, $o = ["href"], es = /* @__PURE__ */ z(/* @__PURE__ */ d({
	__name: "DadsBlockquote",
	props: {
		quote: {},
		cite: {},
		citeUrl: {}
	},
	setup(t) {
		let n = t, i = O(), c = r(() => !!i.default), u = r(() => !!n.cite), d = r(() => !!n.citeUrl);
		return (n, r) => (v(), o("div", Yo, [s("blockquote", {
			class: "dads-blockquote",
			cite: t.citeUrl
		}, [c.value ? x(n.$slots, "default", { key: 0 }, void 0, !0) : t.quote ? (v(), o("p", Zo, w(t.quote), 1)) : a("", !0)], 8, Xo), u.value ? (v(), o("cite", Qo, [d.value ? (v(), o("a", {
			key: 0,
			href: t.citeUrl,
			class: "dads-blockquote__cite-link"
		}, w(t.cite), 9, $o)) : (v(), o(e, { key: 1 }, [l(w(t.cite), 1)], 64))])) : a("", !0)]));
	}
}), [["__scopeId", "data-v-b8e56d26"]]), ts = ["data-style", "aria-label"], ns = ["data-style"], rs = ["src"], is = { class: "dads-resource-list__contents" }, as = { class: "dads-resource-list__title" }, os = {
	key: 0,
	class: "dads-resource-list__support"
}, ss = {
	key: 1,
	class: "dads-resource-list__tags"
}, cs = {
	key: 2,
	class: "dads-resource-list__sub"
}, ls = { key: 1 }, us = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		}, p = (e, t, n) => {
			if (e.disabled) {
				n.preventDefault();
				return;
			}
			l("click:action", e, t, n);
		};
		return (n, r) => (v(), o("ul", {
			class: "dads-resource-list-group",
			"data-style": t.variant,
			"aria-label": t.ariaLabel
		}, [(v(!0), o(e, null, b(u.value, (n) => (v(), o("li", {
			key: n.index,
			class: "dads-resource-list-group__item"
		}, [s("div", {
			class: m(n.rowClass),
			"data-style": t.variant
		}, [(v(), i(C(d(n.item) ? "a" : "div"), {
			href: d(n.item) ? n.item.href : void 0,
			"aria-current": n.item.selected ? "true" : void 0,
			"aria-disabled": n.item.disabled || void 0,
			class: "dads-resource-list__body",
			onClick: (e) => f(n.item, n.index, e)
		}, {
			default: M(() => [
				n.item.thumbnail ? (v(), o("img", {
					key: 0,
					class: "dads-resource-list__thumbnail",
					src: n.item.thumbnail,
					alt: ""
				}, null, 8, rs)) : n.item.iconName ? (v(), i(B, {
					key: 1,
					name: n.item.iconName,
					class: "dads-resource-list__icon",
					size: 32
				}, null, 8, ["name"])) : a("", !0),
				s("div", is, [
					s("h3", as, w(n.item.title), 1),
					n.item.description ? (v(), o("div", os, [s("p", null, w(n.item.description), 1)])) : a("", !0),
					n.hasTags ? (v(), o("ul", ss, [(v(!0), o(e, null, b(n.item.tags, (e, t) => (v(), o("li", {
						key: t,
						class: "dads-resource-list__tag"
					}, w(e), 1))), 128))])) : a("", !0)
				]),
				n.item.date ? (v(), o("div", cs, [s("p", null, w(n.item.date), 1)])) : a("", !0)
			]),
			_: 2
		}, 1032, [
			"href",
			"aria-current",
			"aria-disabled",
			"onClick"
		])), n.item.action ? (v(), i(C(n.item.action.href ? "a" : "button"), {
			key: 0,
			type: n.item.action.href ? void 0 : "button",
			href: n.item.action.href,
			"aria-label": n.item.action.label,
			disabled: !n.item.action.href && n.item.disabled ? !0 : void 0,
			class: "dads-resource-list__action",
			onClick: (e) => p(n.item, n.index, e)
		}, {
			default: M(() => [n.item.action.iconName ? (v(), i(B, {
				key: 0,
				name: n.item.action.iconName,
				size: 20
			}, null, 8, ["name"])) : (v(), o("span", ls, w(n.item.action.label), 1))]),
			_: 2
		}, 1032, [
			"type",
			"href",
			"aria-label",
			"disabled",
			"onClick"
		])) : a("", !0)], 10, ns)]))), 128))], 8, ts));
	}
}), [["__scopeId", "data-v-4f11b189"]]), ds = ["aria-label"], fs = {
	key: 0,
	class: "dads-emergency-banner__timestamp"
}, ps = ["datetime"], ms = {
	key: 1,
	class: "dads-emergency-banner__header"
}, hs = { class: "dads-emergency-banner__heading" }, gs = { class: "dads-emergency-banner__body" }, _s = { class: "dads-emergency-banner__message" }, vs = {
	key: 2,
	class: "dads-emergency-banner__action"
}, ys = [
	"href",
	"target",
	"rel"
], bs = {
	key: 1,
	class: "dads-emergency-banner__sr-only"
}, xs = ["aria-label"], Ss = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		iconName: { default: "warning" },
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
		let c = e, d = t, f = r(() => c.timestamp === void 0 ? null : c.timestamp instanceof Date ? {
			iso: c.timestamp.toISOString(),
			display: c.timestamp.toLocaleString()
		} : {
			iso: c.timestamp,
			display: c.timestamp
		}), p = () => {
			d("update:modelValue", !1), d("close");
		};
		return (t, r) => (v(), i(n, { name: "dads-emergency-banner" }, {
			default: M(() => [e.modelValue ? (v(), o("div", {
				key: 0,
				class: "dads-emergency-banner",
				role: "alert",
				"aria-live": "assertive",
				"aria-label": e.ariaLabel
			}, [
				f.value ? (v(), o("p", fs, [s("time", { datetime: f.value.iso }, w(f.value.display), 9, ps)])) : a("", !0),
				e.title || t.$slots.title ? (v(), o("header", ms, [s("h2", hs, [e.iconName ? (v(), i(B, {
					key: 0,
					name: e.iconName,
					class: "dads-emergency-banner__icon",
					size: 24
				}, null, 8, ["name"])) : a("", !0), x(t.$slots, "title", {}, () => [l(w(e.title), 1)], !0)])])) : a("", !0),
				s("div", gs, [s("p", _s, [x(t.$slots, "default", {}, () => [l(w(e.message), 1)], !0)])]),
				e.linkLabel && e.linkHref ? (v(), o("div", vs, [s("a", {
					class: "dads-emergency-banner__button",
					href: e.linkHref,
					target: e.linkExternal ? "_blank" : void 0,
					rel: e.linkExternal ? "noopener noreferrer" : void 0
				}, [
					l(w(e.linkLabel) + " ", 1),
					e.linkExternal ? (v(), i(B, {
						key: 0,
						name: "open_in_new",
						class: "dads-emergency-banner__external-icon",
						size: 16
					})) : a("", !0),
					e.linkExternal ? (v(), o("span", bs, w(e.newTabHintText), 1)) : a("", !0)
				], 8, ys)])) : a("", !0),
				e.closable ? (v(), o("button", {
					key: 3,
					type: "button",
					class: "dads-emergency-banner__close",
					"aria-label": e.closeLabel,
					onClick: p
				}, [u(B, {
					name: "close",
					size: 20
				})], 8, xs)) : a("", !0)
			], 8, ds)) : a("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-0e99de0e"]]), Cs = ["aria-label"], ws = {
	key: 0,
	class: "dads-table-control__top"
}, Ts = {
	key: 0,
	class: "dads-table-control__search"
}, Es = ["for"], Ds = { class: "dads-table-control__search-control" }, Os = [
	"id",
	"value",
	"placeholder"
], ks = ["aria-label"], As = {
	key: 0,
	class: "dads-table-control__presets",
	role: "list"
}, js = ["aria-pressed", "onClick"], Ms = {
	key: 1,
	class: "dads-table-control__page-size"
}, Ns = ["for"], Ps = ["id", "value"], Fs = ["value"], Is = {
	key: 1,
	class: "dads-table-control__pagination"
}, Ls = ["id"], Rs = ["aria-label"], zs = ["disabled", "aria-label"], Bs = ["aria-label"], Vs = ["disabled", "aria-label"], Hs = /* @__PURE__ */ z(/* @__PURE__ */ d({
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
		let i = t, c = n, d = D(), f = r(() => `dads-table-control-search-${d}`), p = r(() => `dads-table-control-page-size-${d}`), m = r(() => `dads-table-control-status-${d}`), h = r(() => {
			let e = Math.max(1, i.pageSize);
			return Math.max(1, Math.ceil(i.totalItems / e));
		}), g = r(() => i.currentPage <= 1), _ = r(() => i.currentPage >= h.value), y = () => {
			g.value || c("update:page", Math.max(1, i.currentPage - 1));
		}, x = () => {
			_.value || c("update:page", Math.min(h.value, i.currentPage + 1));
		}, S = (e) => {
			let t = e.target;
			c("update:search", t.value);
		}, C = (e) => {
			let t = e.target, n = Number(t.value);
			Number.isNaN(n) || (c("update:pageSize", n), i.currentPage > 1 && c("update:page", 1));
		}, T = r(() => i.totalItems === 0 ? 0 : (i.currentPage - 1) * i.pageSize + 1), E = r(() => i.totalItems === 0 ? 0 : Math.min(i.totalItems, i.currentPage * i.pageSize)), O = r(() => i.formatRangeLabel(T.value, E.value, i.totalItems)), k = (e) => {
			c("update:search", e.query), c("click:preset", e);
		}, A = () => {
			i.searchQuery && (c("update:search", ""), c("reset"));
		};
		return (n, r) => (v(), o("div", {
			class: "dads-table-control",
			role: "group",
			"aria-label": t.ariaLabel
		}, [t.showSearch || t.showPageSize ? (v(), o("div", ws, [t.showSearch ? (v(), o("div", Ts, [
			s("label", {
				for: f.value,
				class: "dads-table-control__label"
			}, w(t.searchLabel), 9, Es),
			s("div", Ds, [
				u(B, {
					name: "search",
					class: "dads-table-control__search-icon",
					size: 20
				}),
				s("input", {
					id: f.value,
					class: "dads-table-control__search-input",
					type: "search",
					value: t.searchQuery,
					placeholder: t.searchPlaceholder,
					onInput: S
				}, null, 40, Os),
				t.showReset && t.searchQuery ? (v(), o("button", {
					key: 0,
					type: "button",
					class: "dads-table-control__reset",
					"aria-label": t.resetLabel,
					onClick: A
				}, [u(B, {
					name: "cancel",
					size: 20
				})], 8, ks)) : a("", !0)
			]),
			t.presets.length > 0 ? (v(), o("div", As, [(v(!0), o(e, null, b(t.presets, (e, n) => (v(), o("button", {
				key: `${e.label}-${n}`,
				type: "button",
				role: "listitem",
				class: "dads-table-control__preset",
				"aria-pressed": t.searchQuery === e.query,
				onClick: (t) => k(e)
			}, w(e.label), 9, js))), 128))])) : a("", !0)
		])) : a("", !0), t.showPageSize ? (v(), o("div", Ms, [s("label", {
			for: p.value,
			class: "dads-table-control__label"
		}, w(t.pageSizeLabel), 9, Ns), s("select", {
			id: p.value,
			class: "dads-table-control__page-size-select",
			value: t.pageSize,
			onChange: C
		}, [(v(!0), o(e, null, b(t.pageSizeOptions, (e) => (v(), o("option", {
			key: e,
			value: e
		}, w(t.formatPageSizeOption(e)), 9, Fs))), 128))], 40, Ps)])) : a("", !0)])) : a("", !0), t.showPagination ? (v(), o("div", Is, [s("span", {
			id: m.value,
			class: "dads-table-control__status",
			"aria-live": "polite"
		}, w(O.value), 9, Ls), s("div", {
			class: "dads-table-control__buttons",
			role: "navigation",
			"aria-label": t.paginationAriaLabel
		}, [
			s("button", {
				type: "button",
				class: "dads-table-control__button dads-table-control__button--prev",
				disabled: g.value,
				"aria-label": t.prevPageAriaLabel,
				onClick: y
			}, [u(B, {
				name: "chevron_left",
				size: 20
			}), l(" " + w(t.prevPageLabel), 1)], 8, zs),
			s("span", {
				class: "dads-table-control__page-indicator",
				"aria-label": t.currentPageAriaLabel
			}, w(t.currentPage) + " / " + w(h.value), 9, Bs),
			s("button", {
				type: "button",
				class: "dads-table-control__button dads-table-control__button--next",
				disabled: _.value,
				"aria-label": t.nextPageAriaLabel,
				onClick: x
			}, [l(w(t.nextPageLabel) + " ", 1), u(B, {
				name: "chevron_right",
				size: 20
			})], 8, Vs)
		], 8, Rs)])) : a("", !0)], 8, Cs));
	}
}), [["__scopeId", "data-v-a937b426"]]);
//#endregion
export { vr as DADS_DEFAULT_SWATCHES, fr as DadsAccordion, es as DadsBlockquote, Wt as DadsBreadcrumb, H as DadsButton, Yn as DadsCard, Vo as DadsCarousel, Go as DadsCarouselSingle, Ne as DadsCheckbox, Fe as DadsCheckboxGroup, _r as DadsChipLabel, ut as DadsChipTag, wr as DadsColorPicker, bt as DadsCombobox, Zr as DadsDatePicker, xi as DadsDescriptionList, Dn as DadsDialog, yi as DadsDisclosure, ar as DadsDivider, It as DadsDrawer, Ss as DadsEmergencyBanner, at as DadsFileUpload, q as DadsFormControlLabel, da as DadsGlobalMenu, Mt as DadsHamburgerMenuButton, Dt as DadsHeaderContainer, tr as DadsHeading, B as DadsIcon, ro as DadsImage, Ho as DadsImageSlider, ie as DadsInputText, Di as DadsLanguageSelector, Jo as DadsList, _a as DadsMegaMenu, Hi as DadsMenuList, Xi as DadsMenuListBox, $a as DadsMobileMenu, yn as DadsNotificationBanner, Na as DadsPageNavigation, Un as DadsProgressIndicator, Be as DadsRadio, Ge as DadsRadioGroup, us as DadsResourceList, mi as DadsSearchBox, we as DadsSelect, nn as DadsStepNavigation, ln as DadsTab, sr as DadsTable, Hs as DadsTableControl, za as DadsTableOfContents, Q as DadsTextarea, jn as DadsTooltip, ia as DadsUtilityLink, I as iconRegistry };

//# sourceMappingURL=index.js.map