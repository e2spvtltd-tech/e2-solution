import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AppHeader } from "./AppHeader-B1SGa7QP.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
import { i as inr } from "./mock-data-DuKnmzXl.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import api from "./api-B0BjSyJe.mjs";
import { d as WalletMinimal, T as TrendingUp, R as Repeat, G as Gift, e as ArrowUpRight, f as RefreshCw, g as Send, h as ArrowDownLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
function WalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [activeWallet, setActiveWallet] = reactExports.useState("main");
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [withdrawing, setWithdrawing] = reactExports.useState(false);
  const [withdrawAmount, setWithdrawAmount] = reactExports.useState("");
  reactExports.useEffect(() => {
    api.get("/user/dashboard").then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(() => {
      navigate({
        to: "/login"
      });
    });
  }, [navigate]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center", children: "Loading wallet..." });
  const wallets = [{
    key: "main",
    label: "Main Wallet",
    value: data.wallets.main,
    icon: WalletMinimal
  }, {
    key: "roi",
    label: "ROI Wallet",
    value: 0,
    icon: TrendingUp
  }, {
    key: "binary",
    label: "Binary Wallet",
    value: 0,
    icon: Repeat
  }, {
    key: "referral",
    label: "Referral Wallet",
    value: 0,
    icon: Gift
  }];
  const current = wallets.find((w) => w.key === activeWallet);
  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      setWithdrawing(true);
      await new Promise((r) => setTimeout(r, 1e3));
      toast.success(`Withdrawal request of ${inr(Number(withdrawAmount))} submitted`);
      setWithdrawAmount("");
      setActiveTab("withdrawals");
    } catch (err) {
      toast.error(err.response?.data?.message || "Withdrawal failed");
    } finally {
      setWithdrawing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Wallet", subtitle: "Manage funds & withdrawals" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar pb-1", children: [{
      id: "overview",
      label: "Balance Overview"
    }, {
      id: "transactions",
      label: "Transactions"
    }, {
      id: "withdrawals",
      label: "Withdrawals"
    }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"), children: tab.label }, tab.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-8 space-y-4 md:space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm uppercase tracking-wide text-primary-foreground/70", children: current.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl md:text-5xl font-extrabold tracking-tight", children: inr(current.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-4 md:w-2/3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: () => setActiveTab("withdrawals"), className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 md:h-5 md:w-5 mr-1" }),
                " Withdraw"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: () => toast.success("Transfer feature coming soon"), className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 md:h-5 md:w-5 mr-1" }),
                " Transfer"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4", children: wallets.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveWallet(w.key), className: cn("rounded-2xl p-3 md:p-5 text-left shadow-soft transition-colors", activeWallet === w.key ? "bg-primary text-primary-foreground shadow-glow" : "bg-card hover:bg-accent"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "h-4 w-4 md:h-5 md:w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 md:mt-3 text-sm md:text-xl font-bold", children: inr(w.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-[10px] md:text-xs mt-0.5", activeWallet === w.key ? "text-primary-foreground/70" : "text-muted-foreground"), children: w.label })
          ] }, w.key)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full flex flex-col justify-center items-center text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "P2P Transfer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Send funds directly to other users instantly." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-2", variant: "outline", children: "Coming Soon" })
        ] }) })
      ] }),
      activeTab === "transactions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft min-h-[50vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm md:text-base font-bold text-foreground", children: "Recent Transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: [].map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3 md:py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl", tx.status === "success" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"), children: tx.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm md:text-base truncate", children: tx.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: tx.time })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-bold text-sm md:text-base whitespace-nowrap", `text-${tx.status}`), children: tx.amount })
        ] }, tx.id)) })
      ] }),
      activeTab === "withdrawals" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5 space-y-4 md:space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Request Withdrawal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block", children: "From Wallet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none", value: activeWallet, onChange: (e) => setActiveWallet(e.target.value), children: wallets.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: w.key, children: [
                w.label,
                " (",
                inr(w.value),
                ")"
              ] }, w.key)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block", children: "Amount (INR)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "e.g. 5000", value: withdrawAmount, onChange: (e) => setWithdrawAmount(e.target.value), className: "w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Min: ",
                  inr(500)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Fee: 5%" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full py-6 font-bold", onClick: handleWithdraw, disabled: withdrawing || current.value <= 0, children: withdrawing ? "Processing..." : "Submit Request" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-7 space-y-4 md:space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Withdrawal History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: [].map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-3 md:py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: w.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("flex items-center gap-1 text-xs font-bold uppercase", w.color), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "h-3 w-3" }),
                " ",
                w.status
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Requested: ",
                inr(w.amount)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                "Net: ",
                inr(w.net)
              ] })
            ] })
          ] }, w.id)) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  WalletPage as component
};
