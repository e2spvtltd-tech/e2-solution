import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AppHeader } from "./AppHeader-B1SGa7QP.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
import { p as packages, i as inr } from "./mock-data-DuKnmzXl.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { T as TrendingUp, s as Activity, t as History, C as CircleCheckBig, u as Star, v as Check } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function PackageCard({
  p
}) {
  const featured = p.popular;
  const features = [p.dailyRoi, p.binaryBonus, p.referral, p.duration, p.ceiling];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-3xl p-5 shadow-soft h-full flex flex-col", featured ? "bg-gradient-hero text-primary-foreground shadow-glow" : "bg-card"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[11px] font-bold uppercase tracking-wider", featured ? "text-primary-foreground/80" : "text-primary"), children: p.name }),
      featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
        " Popular"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-extrabold tracking-tight", children: inr(p.price) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5 flex-1", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("h-4 w-4 shrink-0", featured ? "text-primary-foreground" : "text-primary") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: featured ? "text-primary-foreground/90" : "text-muted-foreground", children: f })
    ] }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toast.success(`Investment started in ${p.name} plan`), variant: featured ? "secondary" : "hero", className: "mt-5 w-full shrink-0", children: "Invest Now" })
  ] });
}
function InvestPage() {
  const [activeTab, setActiveTab] = reactExports.useState("available");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Investments", subtitle: "Precision-engineered investment plans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar pb-1", children: [{
      id: "available",
      label: "Available Plans"
    }, {
      id: "active",
      label: "Active Plans"
    }, {
      id: "history",
      label: "Investment History"
    }, {
      id: "completed",
      label: "Completed Plans"
    }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"), children: tab.label }, tab.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 md:space-y-6 md:p-8 mx-auto max-w-7xl pb-20 md:pb-24", children: [
      activeTab === "available" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl bg-accent p-3 md:p-4 text-sm md:text-base text-accent-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Choose a plan and earn daily ROI plus binary network rewards." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 items-stretch", children: packages.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCard, { p }, p.id)) })
      ] }),
      activeTab === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-10 w-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "No Active Plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto text-sm", children: "You haven't invested in any plans yet. Head over to the Available Plans tab to start earning." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setActiveTab("available"), className: "mt-4", children: "Explore Plans" })
      ] }),
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-10 w-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "No Investment History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto text-sm", children: "Your investment transaction history will appear here once you make your first deposit." })
        ] })
      ] }),
      activeTab === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-10 w-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "No Completed Plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto text-sm", children: "Plans that have completed their ROI duration will be listed here for your reference." })
        ] })
      ] })
    ] })
  ] });
}
export {
  InvestPage as component
};
