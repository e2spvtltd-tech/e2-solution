import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppHeader } from "./AppHeader-B1SGa7QP.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { i as inr, g as growthSeries } from "./mock-data-DuKnmzXl.mjs";
import { S as StatCard } from "./StatCard-BtFByT5M.mjs";
import { T as TrendingUp, w as CalendarDays, x as Calendar, d as WalletMinimal } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./button-BKD2xzZ9.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./api-B0BjSyJe.mjs";
import "../_libs/axios.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/tailwind-merge.mjs";
import "../_libs/es-toolkit.mjs";
import "../_libs/reselect.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const GrowthChart = reactExports.memo(function GrowthChart2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: growthSeries, margin: {
    top: 8,
    right: 4,
    left: 4,
    bottom: 0
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g-earnings", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--primary)", stopOpacity: 0.35 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--primary)", stopOpacity: 0 })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "m", axisLine: false, tickLine: false, tick: {
      fontSize: 11,
      fill: "var(--muted-foreground)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: {
      stroke: "var(--primary)",
      strokeWidth: 1
    }, contentStyle: {
      borderRadius: 12,
      border: "1px solid var(--border)",
      fontSize: 12
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "v", stroke: "var(--primary)", strokeWidth: 2.5, fill: "url(#g-earnings)" })
  ] }) });
});
function EarningsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("roi");
  const renderKPIs = (multiplier) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4 mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Today's Earnings", value: inr(1200 * multiplier), tone: "success" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CalendarDays, label: "Weekly Earnings", value: inr(8400 * multiplier), tone: "primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Calendar, label: "Monthly Earnings", value: inr(36e3 * multiplier), tone: "warning" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: WalletMinimal, label: "Total Earnings", value: inr(145e3 * multiplier), tone: "default" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Earnings", subtitle: "Track your income growth" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar pb-1", children: [{
      id: "roi",
      label: "ROI Income"
    }, {
      id: "binary",
      label: "Binary Income"
    }, {
      id: "referral",
      label: "Referral Income"
    }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"), children: tab.label }, tab.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl", children: [
      activeTab === "roi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground", children: "Daily passive income generated from your active investment plans." }),
        renderKPIs(1),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 md:mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-bold text-foreground", children: "ROI Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm text-muted-foreground", children: "Monthly Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthChart, {})
        ] })
      ] }),
      activeTab === "binary" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground", children: "Matching bonus earned from your left and right team volume pairing." }),
        renderKPIs(1.5),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 md:mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-bold text-foreground", children: "Binary Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm text-muted-foreground", children: "Monthly Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthChart, {})
        ] })
      ] }),
      activeTab === "referral" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground", children: "Direct commission earned from the investments of members you invite." }),
        renderKPIs(0.8),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 md:mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-bold text-foreground", children: "Referral Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm text-muted-foreground", children: "Monthly Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthChart, {})
        ] })
      ] })
    ] })
  ] });
}
export {
  EarningsPage as component
};
