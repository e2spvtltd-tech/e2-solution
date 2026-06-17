import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { H as House, N as Network, T as TrendingUp, W as Wallet, U as User } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const tabs = [
  { to: "/app", label: "Home", icon: House },
  { to: "/app/network", label: "Network", icon: Network },
  { to: "/app/invest", label: "Invest", icon: TrendingUp },
  { to: "/app/wallet", label: "Wallet", icon: Wallet },
  { to: "/app/profile", label: "Profile", icon: User }
];
function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]", children: tabs.map(({ to, label, icon: Icon }) => {
    const active = to === "/app" ? pathname === "/app" : pathname.startsWith(to);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        className: cn(
          "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
          active ? "text-primary" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "grid h-9 w-9 place-items-center rounded-xl transition-colors",
                active && "bg-accent"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: active ? 2.4 : 2 })
            }
          ),
          label
        ]
      }
    ) }, to);
  }) }) });
}
function AppLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen w-full flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pb-4 md:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  AppLayout as component
};
