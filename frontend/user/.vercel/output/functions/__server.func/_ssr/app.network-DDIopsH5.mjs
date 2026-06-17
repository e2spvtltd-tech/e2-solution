import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppHeader } from "./AppHeader-B1SGa7QP.mjs";
import { t as topPerformers, i as inr, c as compact, a as teamGrowthSeries } from "./mock-data-DuKnmzXl.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
import api from "./api-B0BjSyJe.mjs";
import { p as Search, c as Users, q as UserPlus, a as ArrowLeft, A as ArrowRight, r as Copy, Q as QrCode } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, X as XAxis, b as Bar } from "../_libs/recharts.mjs";
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
const stats = [{
  icon: Users,
  label: "Total Team",
  value: "0",
  tone: "primary"
}, {
  icon: UserPlus,
  label: "Direct Referrals",
  value: "0",
  tone: "accent"
}, {
  icon: ArrowLeft,
  label: "Left Team",
  value: "0",
  tone: "accent"
}, {
  icon: ArrowRight,
  label: "Right Team",
  value: "0",
  tone: "accent"
}];
const TeamChart = reactExports.memo(function TeamChart2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: teamGrowthSeries, margin: {
    top: 4,
    right: 4,
    left: 4,
    bottom: 0
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "d", axisLine: false, tickLine: false, tick: {
      fontSize: 11,
      fill: "var(--muted-foreground)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "v", radius: [6, 6, 0, 0], fill: "var(--primary)" })
  ] }) });
});
const OrgTreeStyles = () => /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
  __html: `
    .org-tree ul {
      padding-top: 24px; 
      position: relative;
      display: flex;
      justify-content: center;
      padding-left: 0;
      margin: 0;
    }
    .org-tree li {
      text-align: center;
      list-style-type: none;
      position: relative;
      padding: 24px 12px 0 12px;
    }
    .org-tree li::before, .org-tree li::after {
      content: '';
      position: absolute; top: 0; right: 50%;
      border-top: 2px solid #cbd5e1;
      width: 50%; height: 24px;
    }
    .org-tree li::after {
      right: auto; left: 50%;
      border-left: 2px solid #cbd5e1;
    }
    .org-tree li:only-child::after, .org-tree li:only-child::before {
      display: none;
    }
    .org-tree li:only-child { padding-top: 0;}
    .org-tree li:first-child::before, .org-tree li:last-child::after {
      border: 0 none;
    }
    .org-tree li:last-child::before {
      border-right: 2px solid #cbd5e1;
      border-radius: 0 6px 0 0;
    }
    .org-tree li:first-child::after {
      border-radius: 6px 0 0 0;
    }
    .org-tree ul ul::before {
      content: '';
      position: absolute; top: 0; left: 50%;
      border-left: 2px solid #cbd5e1;
      width: 0; height: 24px;
      margin-left: -1px;
    }
    .org-tree li > div {
      display: inline-block;
    }
  `
} });
const TreeNodeCard = ({
  node,
  isRoot = false,
  side = null
}) => {
  if (!node || Object.keys(node).length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-border w-[120px] bg-accent/30 text-muted-foreground h-[140px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[20px] font-semibold text-muted-foreground/40 mb-1", children: "+" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider", children: "Empty" })
  ] });
  const initial = node.name ? node.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "U";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col items-center justify-center p-4 rounded-2xl border shadow-soft w-[140px] transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer relative z-10", isRoot ? "bg-primary/10 border-primary/20" : "bg-card border-border"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-12 w-12 rounded-full flex items-center justify-center text-primary-foreground font-bold mb-2 shadow-sm", "bg-primary"), children: initial }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate w-full text-center text-foreground", children: isRoot ? "You" : node.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-medium text-muted-foreground uppercase mt-0.5 bg-accent/50 px-2 py-0.5 rounded-md", children: [
      "ID: ",
      node.id
    ] }),
    !isRoot && side && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-2 w-2 rounded-full", side === "Left" ? "bg-success" : "bg-primary") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground", children: side })
    ] }),
    isRoot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] font-bold text-primary-foreground bg-primary px-3 py-0.5 rounded-full uppercase tracking-wider", children: "You" })
  ] });
};
const renderTree = (node, isRoot = true, side = null, level = 0) => {
  if (!node && level > 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodeCard, { node, isRoot, side }) }),
    node && (node.left || node.right || level < 2) && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      renderTree(node.left, false, "Left", level + 1),
      renderTree(node.right, false, "Right", level + 1)
    ] })
  ] }, node?.id || Math.random());
};
function NetworkPage() {
  const [activeTab, setActiveTab] = reactExports.useState("team");
  const [treeData, setTreeData] = reactExports.useState(null);
  const [referrals, setReferrals] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    Promise.all([api.get("/user/network"), api.get("/user/referrals")]).then(([treeRes, refRes]) => {
      setTreeData(treeRes.data);
      setReferrals(refRes.data);
      setLoading(false);
    }).catch(console.error);
  }, []);
  const statusTone = {
    active: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    inactive: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Network", subtitle: "Manage your binary structure and team" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar pb-1", children: [{
      id: "tree",
      label: "Binary Tree"
    }, {
      id: "team",
      label: "Team"
    }, {
      id: "referrals",
      label: "Referrals"
    }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"), children: tab.label }, tab.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl", children: [
      activeTab === "team" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:flex md:gap-4 md:items-center space-y-4 md:space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-2xl bg-card px-3.5 py-1 md:py-2 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 md:h-5 md:w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Search team members by name or ID", className: "h-11 md:h-12 flex-1 bg-transparent text-sm md:text-base outline-none placeholder:text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0 mt-4 md:mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-8 space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-2xl p-4 md:p-5 shadow-soft", s.tone === "primary" ? "bg-gradient-hero text-primary-foreground" : "bg-card"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: cn("h-5 w-5 md:h-6 md:w-6", s.tone === "primary" ? "text-primary-foreground/80" : "text-primary") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 md:mt-3 text-2xl md:text-3xl font-extrabold tracking-tight", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xs md:text-sm font-medium", s.tone === "primary" ? "text-primary-foreground/70" : "text-muted-foreground"), children: s.label })
            ] }, s.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 md:mb-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-bold text-foreground", children: "Team Growth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm text-muted-foreground", children: "Last 7 days" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TeamChart, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 md:mb-4 text-sm md:text-base font-bold text-foreground", children: "Top Performers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: topPerformers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3 md:py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-gradient-primary text-sm md:text-base font-bold text-primary-foreground", children: m.name.split(" ").map((n) => n[0]).join("") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm md:text-base font-semibold text-foreground", children: m.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs md:text-sm text-muted-foreground", children: [
                  "Volume ",
                  inr(m.volume),
                  " · ",
                  compact(m.team),
                  " team"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[11px] md:text-xs font-semibold capitalize", statusTone[m.status]), children: m.side })
            ] }, m.id)) })
          ] }) })
        ] })
      ] }),
      activeTab === "tree" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-6 md:py-8 text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrgTreeStyles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Interactive Binary Tree" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "Explore your left and right network structures visually. Expand nodes and view matching volume easily." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-5xl rounded-3xl bg-card py-4 md:py-8 shadow-soft border border-border overflow-x-auto no-scrollbar", style: {
          WebkitOverflowScrolling: "touch"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "max-content",
          margin: "0 auto",
          padding: "0 20px"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "org-tree", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading tree..." }) : renderTree(treeData, true) }) }) }) })
      ] }),
      activeTab === "referrals" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Your Referral Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 mt-1", children: "Share this link to invite new members to your network." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 bg-background/20 p-2 pl-4 rounded-xl backdrop-blur-sm border border-primary-foreground/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate flex-1", children: "https://e2solutions.com/ref/USER8829" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "secondary", className: "font-bold shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-2" }),
                " Copy"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-3 rounded-2xl shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-24 w-24 text-primary" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-sm md:text-base font-bold text-foreground", children: [
            "Direct Referrals (",
            referrals.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: "Loading referrals..." }) : referrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-muted-foreground", children: "No referrals yet." }) : referrals.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground", children: r.name.substring(0, 2).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: r.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Joined: ",
                r.joined
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-success", children: [
                "+ ",
                inr(r.volume || 0)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xs font-semibold capitalize", statusTone[r.status] || "text-muted-foreground"), children: r.status })
            ] })
          ] }, r.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  NetworkPage as component
};
