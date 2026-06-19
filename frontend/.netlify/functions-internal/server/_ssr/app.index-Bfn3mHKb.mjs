import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppHeader } from "./AppHeader-BMA3LYwX.mjs";
import { S as StatCard } from "./StatCard-BtFByT5M.mjs";
import { i as inr, g as growthSeries } from "./mock-data-DuKnmzXl.mjs";
import api from "./api-C4AJ10yd.mjs";
import { T as TrendingUp, f as WalletMinimal, G as Gift, R as Repeat, e as Users, g as ArrowUpRight, P as Plus } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 320, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: growthSeries, margin: {
    top: 8,
    right: 4,
    left: 4,
    bottom: 0
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", x1: "0", y1: "0", x2: "0", y2: "1", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "v", stroke: "var(--primary)", strokeWidth: 2.5, fill: "url(#g)" })
  ] }) });
});
function Dashboard() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: loading
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const res = await api.get("/user/dashboard");
        return res.data;
      } catch (err) {
        localStorage.removeItem("token");
        navigate({
          to: "/login"
        });
        throw err;
      }
    },
    refetchInterval: 1e3,
    // Poll every second for live updates
    staleTime: 500
    // Keep data fresh
  });
  if (loading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center", children: "Loading dashboard..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm font-medium uppercase tracking-wide text-primary-foreground/70", children: "Total Portfolio Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] md:text-xs font-semibold", children: "0%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl md:text-5xl font-extrabold tracking-tight", children: inr(data.totalEarnings + data.walletBalance) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 md:mt-6 flex items-center justify-between rounded-2xl bg-primary-foreground/10 px-4 md:px-6 py-2.5 md:py-4 text-sm md:text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/80", children: "Pending Volume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: inr(0) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-8 space-y-4 md:space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Total Earnings", value: inr(data.totalEarnings || 0), delta: "0%", tone: "primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: WalletMinimal, label: "Wallet Balance", value: inr(data.walletBalance || 0), tone: "default" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Gift, label: "Today's Earnings", value: inr(data.todayEarning || 0), tone: "success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Repeat, label: "Binary Income", value: inr(data.binaryIncome || 0), tone: "success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Total Team", value: (data.teamMembers || 0).toString(), tone: "warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: ArrowUpRight, label: "Total Investment", value: inr(data.totalInvestment || 0), tone: "default" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4 space-y-4 md:space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-3 gap-2 md:gap-4", children: [{
          icon: Plus,
          label: "Invest Now",
          to: "/app/invest"
        }, {
          icon: Users,
          label: "Binary Tree",
          to: "/app/network"
        }, {
          icon: Gift,
          label: "Referral Link",
          to: "/app/network"
        }, {
          icon: ArrowUpRight,
          label: "Withdraw",
          to: "/app/wallet"
        }, {
          icon: WalletMinimal,
          label: "Support",
          to: "/app/profile"
        }, {
          icon: Repeat,
          label: "KYC",
          to: "/app/profile"
        }].map(({
          icon: Icon,
          label,
          to
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex flex-col items-center gap-1.5 md:gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-2xl bg-card text-primary shadow-soft hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 md:h-6 md:w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] md:text-sm font-medium text-muted-foreground text-center", children: label })
        ] }, label)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-12 space-y-4 md:space-y-6 mt-4 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 md:mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-bold text-foreground", children: "Growth Analytics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-muted-foreground", children: "Monthly ROI Performance" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/15 px-2 py-0.5 text-[11px] md:text-xs font-semibold text-success", children: "0%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthChart, {})
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
