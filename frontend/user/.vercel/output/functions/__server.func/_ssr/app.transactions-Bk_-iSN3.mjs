import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppHeader } from "./AppHeader-B1SGa7QP.mjs";
import { i as inr } from "./mock-data-DuKnmzXl.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { D as Download, G as Gift, R as Repeat, e as ArrowUpRight, h as ArrowDownLeft } from "../_libs/lucide-react.mjs";
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
const txns = [{
  id: "1",
  title: "Withdrawal Request",
  date: "10 Jun, 2:14 PM",
  amount: -15e3,
  type: "withdrawal",
  status: "completed"
}, {
  id: "2",
  title: "Crypto Deposit",
  date: "09 Jun, 11:02 AM",
  amount: 5e4,
  type: "deposit",
  status: "completed"
}, {
  id: "3",
  title: "Monthly ROI Payout",
  date: "08 Jun, 9:00 AM",
  amount: 24500,
  type: "income",
  status: "completed"
}, {
  id: "4",
  title: "Internal Transfer",
  date: "07 Jun, 6:30 PM",
  amount: -8e3,
  type: "transfer",
  status: "pending"
}, {
  id: "5",
  title: "Referral Commission",
  date: "06 Jun, 1:45 PM",
  amount: 3250,
  type: "income",
  status: "completed"
}, {
  id: "6",
  title: "Withdrawal Request",
  date: "05 Jun, 4:20 PM",
  amount: -2e4,
  type: "withdrawal",
  status: "rejected"
}];
const typeIcon = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  transfer: Repeat,
  income: Gift
};
const filters = ["All", "Deposits", "Withdrawals", "Transfers", "Income"];
function TransactionsPage() {
  const [filter, setFilter] = reactExports.useState("All");
  const map = {
    Deposits: "deposit",
    Withdrawals: "withdrawal",
    Transfers: "transfer",
    Income: "income"
  };
  const list = filter === "All" ? txns : txns.filter((t) => t.type === map[filter]);
  const statusTone = {
    completed: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    rejected: "bg-destructive/15 text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Transactions", subtitle: "All deposits, withdrawals & income" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: cn("shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors", filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-soft"), children: f }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 text-primary" }),
        " Export PDF / Excel"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: list.map((t) => {
        const Icon = typeIcon[t.type];
        const positive = t.amount >= 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-10 w-10 place-items-center rounded-xl", positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-sm font-bold", positive ? "text-success" : "text-destructive"), children: [
              positive ? "+" : "−",
              inr(Math.abs(t.amount))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", statusTone[t.status]), children: t.status })
          ] })
        ] }, t.id);
      }) })
    ] })
  ] });
}
export {
  TransactionsPage as component
};
