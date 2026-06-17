import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
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
const appCss = "/assets/styles-DP3vH4eB.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "E2 Solutions â€” Institutional-grade Network Investing" },
      {
        name: "description",
        content: "E2 Solutions is a binary network investment platform with daily ROI, binary income, referral commissions, and real-time team analytics."
      },
      { name: "author", content: "E2 Solutions" },
      { name: "theme-color", content: "#5B3DF5" },
      { property: "og:title", content: "E2 Solutions â€” Institutional-grade Network Investing" },
      {
        property: "og:description",
        content: "Build your future with daily ROI, binary income and a powerful referral network."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              const originalFetch = window.fetch;
              window.fetch = async function(...args) {
                let url = '';
                if (typeof args[0] === 'string') {
                  url = args[0];
                } else if (args[0] && args[0].url) {
                  url = args[0].url;
                }
                if (url && url.includes('useblackbox.io')) {
                  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                return originalFetch.apply(this, args);
              };

              // Suppress the "Uncaught (in promise) TypeError: Failed to fetch" from the extension
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message === 'Failed to fetch') {
                  const stack = event.reason.stack || '';
                  if (stack.includes('index.iife.js') || stack.includes('useblackbox.io')) {
                    event.preventDefault();
                  }
                }
              });
              
              // Also intercept console.error for this specific error just in case
              const originalConsoleError = console.error;
              console.error = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('useblackbox.io')) {
                  return;
                }
                return originalConsoleError.apply(console, args);
              };
            `
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$d = () => import("./reset-password-DUjG-_1v.mjs");
const Route$d = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset Password â€” E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./register-DGPastFL.mjs");
const Route$c = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create Account â€” E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./otp-BH4s1-nM.mjs");
const Route$b = createFileRoute("/otp")({
  head: () => ({
    meta: [{
      title: "Verify OTP â€” E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./login-BfCtTLLd.mjs");
const Route$a = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./forgot-password-Bbm5Q151.mjs");
const Route$9 = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Forgot Password â€” E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app-CfbjlAn0.mjs");
const Route$8 = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-D3SYpMWG.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "E2 Solutions â€” Build Your Future with Network Investing"
    }, {
      name: "description",
      content: "Institutional-grade binary network investment platform. Earn daily ROI, binary income and referral commissions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.index-LrBeM9F0.mjs");
const Route$6 = createFileRoute("/app/")({
  head: () => ({
    meta: [{
      title: "Dashboard — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.wallet-DrJlgkwJ.mjs");
const Route$5 = createFileRoute("/app/wallet")({
  head: () => ({
    meta: [{
      title: "Wallet — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.transactions-Bk_-iSN3.mjs");
const Route$4 = createFileRoute("/app/transactions")({
  head: () => ({
    meta: [{
      title: "Transactions — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.profile-KoCSZsEG.mjs");
const Route$3 = createFileRoute("/app/profile")({
  head: () => ({
    meta: [{
      title: "User Settings — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.network-DDIopsH5.mjs");
const Route$2 = createFileRoute("/app/network")({
  head: () => ({
    meta: [{
      title: "Network — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.invest-E311NyJa.mjs");
const Route$1 = createFileRoute("/app/invest")({
  head: () => ({
    meta: [{
      title: "Investments — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.earnings-asKC4SRd.mjs");
const Route = createFileRoute("/app/earnings")({
  head: () => ({
    meta: [{
      title: "Earnings — E2 Solutions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResetPasswordRoute = Route$d.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$e
});
const RegisterRoute = Route$c.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$e
});
const OtpRoute = Route$b.update({
  id: "/otp",
  path: "/otp",
  getParentRoute: () => Route$e
});
const LoginRoute = Route$a.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$e
});
const ForgotPasswordRoute = Route$9.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$e
});
const AppRoute = Route$8.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const AppIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppWalletRoute = Route$5.update({
  id: "/wallet",
  path: "/wallet",
  getParentRoute: () => AppRoute
});
const AppTransactionsRoute = Route$4.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => AppRoute
});
const AppProfileRoute = Route$3.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AppRoute
});
const AppNetworkRoute = Route$2.update({
  id: "/network",
  path: "/network",
  getParentRoute: () => AppRoute
});
const AppInvestRoute = Route$1.update({
  id: "/invest",
  path: "/invest",
  getParentRoute: () => AppRoute
});
const AppEarningsRoute = Route.update({
  id: "/earnings",
  path: "/earnings",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppEarningsRoute,
  AppInvestRoute,
  AppNetworkRoute,
  AppProfileRoute,
  AppTransactionsRoute,
  AppWalletRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  ForgotPasswordRoute,
  LoginRoute,
  OtpRoute,
  RegisterRoute,
  ResetPasswordRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
