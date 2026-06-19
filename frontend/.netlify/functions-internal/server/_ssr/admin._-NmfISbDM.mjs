import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as distExports } from "../_libs/react-router-dom.mjs";
import { a as axios } from "../_libs/axios.mjs";
import "../_libs/sonner.mjs";
import { H as House, e as Users, N as Network, V as Briefcase, T as TrendingUp, k as Landmark, W as Wallet, Y as Banknote, Z as Contact, F as FileText, o as Bell, m as Headset, _ as Settings$1, U as User, $ as ChevronRight, q as LogOut, J as Menu, r as Search, a0 as ArrowLeftRight, a1 as ChartNoAxesColumn, P as Plus, a2 as UserCheck, s as UserPlus, a3 as Clock, a4 as Percent, a5 as Share2, S as Shield, M as Mail, a6 as Phone, Q as QrCode, x as Check, t as Copy, a7 as Funnel, b as Eye, a8 as SquarePen, a9 as ShieldBan, C as CircleCheckBig, a as ArrowLeft, d as ShieldCheck, z as Calendar, u as Activity, D as Download, aa as Pen, X, L as Lock, ab as GitBranch, j as ArrowDownLeft, g as ArrowUpRight, I as Info } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, B as BarChart, b as Bar, L as LineChart, c as Line, d as Cell } from "../_libs/recharts.mjs";
import "../_libs/react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/cookie.mjs";
import "../_libs/set-cookie-parser.mjs";
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
import "../_libs/clsx.mjs";
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
const API_URL = "https://e2-solution-production.up.railway.app/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
const MainLayout = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = reactExports.useState(false);
  const [showNotifications, setShowNotifications] = reactExports.useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = reactExports.useState(false);
  const [notifications, setNotifications] = reactExports.useState([]);
  const location = distExports.useLocation();
  reactExports.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/admin/notifications");
        setNotifications(res.data.map((n) => ({
          id: n.id,
          title: n.type === "registration" ? "New Registration" : "Notification",
          message: n.message,
          time: new Date(n.created_at).toLocaleString()
        })));
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15e3);
    return () => clearInterval(interval);
  }, []);
  const bottomNavItems = [
    { path: "/", icon: House, label: "Home" },
    { path: "/members", icon: Users, label: "Members" },
    { path: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    { path: "/analytics", icon: ChartNoAxesColumn, label: "Analytics" }
  ];
  const sidebarNavItems = [
    { path: "/", icon: House, label: "Dashboard" },
    { path: "/user-management", icon: Users, label: "User Management" },
    { path: "/binary-network", icon: Network, label: "Binary Network" },
    { path: "/investment-plans", icon: Briefcase, label: "Investment Plans" },
    { path: "/investments", icon: TrendingUp, label: "Investments" },
    { path: "/income-management", icon: Landmark, label: "Income Management" },
    { path: "/wallet-management", icon: Wallet, label: "Wallet Management" },
    { path: "/withdrawals", icon: Banknote, label: "Withdrawals" },
    { path: "/kyc-management", icon: Contact, label: "KYC Management" },
    { path: "/reports", icon: FileText, label: "Reports" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/support-center", icon: Headset, label: "Support Center" },
    { path: "/settings", icon: Settings$1, label: "Settings" },
    { path: "/profile", icon: User, label: "Profile" }
  ];
  reactExports.useEffect(() => {
    const currentItem = sidebarNavItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      document.title = `${currentItem.label} — E2 Solutions Admin`;
    } else if (location.pathname.startsWith("/user-profile")) {
      document.title = `User Profile — E2 Solutions Admin`;
    } else {
      document.title = `Admin — E2 Solutions`;
    }
  }, [location.pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-container", children: [
    isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-overlay", onClick: () => setIsSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `sidebar ${isSidebarOpen ? "sidebar-open" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-logo", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", style: { height: "40px", width: "56px" }, fill: "none", stroke: "url(#logo-gradient)", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "logo-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3b82f6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#8b5cf6" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "22px", fontWeight: "900", letterSpacing: "-0.5px", lineHeight: "1", color: "#0f172a" }, children: "E² Solutions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", marginTop: "3px", color: "#94a3b8" }, children: "Pvt Ltd" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "sidebar-nav", children: [
        sidebarNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: item.path,
              className: `sidebar-link ${isActive ? "active" : ""}`,
              style: { display: "flex", justifyContent: "space-between", alignItems: "center" },
              onClick: () => setIsSidebarOpen(false),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                ] }),
                item.hasDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            },
            item.path
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onLogout,
            className: "sidebar-link",
            style: { width: "100%", border: "none", background: "rgba(239, 68, 68, 0.1)", cursor: "pointer", textAlign: "left", color: "#ef4444", display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: "500" }, children: "Log Out" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-content-wrapper", children: [
      (showNotifications || showWalletDropdown) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dropdown-overlay", onClick: () => {
        setShowNotifications(false);
        setShowWalletDropdown(false);
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "top-bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-bar-left mobile-logo", style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn mobile-menu-btn", onClick: () => setIsSidebarOpen(!isSidebarOpen), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", style: { height: "34px", width: "48px" }, fill: "none", stroke: "url(#logo-gradient-mob)", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "logo-gradient-mob", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3b82f6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#8b5cf6" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px", fontWeight: "900", letterSpacing: "-0.5px", lineHeight: "1", color: "#0f172a" }, children: "E² Solutions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px", marginTop: "2px", color: "#94a3b8" }, children: "Pvt Ltd" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-bar-search hidden-mobile", style: { flex: 1, maxWidth: "400px", margin: "0 20px", position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, style: { position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search Users, Investments, Reports...",
              style: { width: "100%", padding: "10px 16px 10px 44px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", fontSize: "0.875rem", outline: "none" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-bar-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "icon-btn", onClick: () => {
              const isOpening = !showNotifications;
              setShowNotifications(isOpening);
              if (showWalletDropdown) setShowWalletDropdown(false);
              if (isOpening && notifications.length > 0) {
                api.put("/admin/notifications/mark-read").catch((err) => console.error("Failed to mark read", err));
              }
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 20 }),
              notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "notification-badge", children: notifications.length })
            ] }),
            showNotifications && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notifications-dropdown notification-panel card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, fontSize: "1rem", fontWeight: "600" }, children: "Notifications" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.75rem", color: "var(--color-primary)", cursor: "pointer", fontWeight: "500" }, onClick: () => {
                  setNotifications([]);
                  api.put("/admin/notifications/mark-read").catch((err) => console.error("Failed to mark read", err));
                }, children: "Mark all read" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "300px", overflowY: "auto" }, children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px", textAlign: "center", color: "var(--color-text-muted)" }, children: "No new notifications" }) : notifications.map((notif, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-item", style: { padding: "12px 16px", borderBottom: idx < notifications.length - 1 ? "1px solid var(--color-border)" : "none", cursor: "pointer" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 4px 0", fontSize: "0.875rem", fontWeight: "600", color: "var(--color-text)" }, children: notif.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontSize: "0.75rem", color: "var(--color-text-muted)" }, children: notif.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.65rem", color: "var(--color-text-muted)", display: "block", marginTop: "6px" }, children: notif.time })
              ] }, notif.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px", borderTop: "1px solid var(--color-border)", textAlign: "center", cursor: "pointer", color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: "600" }, children: "View All Notifications" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", onClick: () => {
              setShowWalletDropdown(!showWalletDropdown);
              if (showNotifications) setShowNotifications(false);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 20 }) }),
            showWalletDropdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notifications-dropdown wallet-panel card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "16px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 4px 0", fontSize: "0.875rem", color: "var(--color-text-muted)" }, children: "Platform Balance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "1.75rem", color: "var(--color-text)" }, children: "₹0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", style: { padding: "8px", fontSize: "0.875rem", borderRadius: "var(--radius-md)" }, children: "Add Funds" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-outline", style: { padding: "8px", fontSize: "0.875rem", borderRadius: "var(--radius-md)" }, children: "Withdraw" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-item", style: { padding: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderRadius: "4px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.875rem", color: "var(--color-text)" }, children: "Transaction History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-item", style: { padding: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderRadius: "4px", marginTop: "4px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.875rem", color: "var(--color-text)" }, children: "Wallet Settings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/settings", className: "profile-pic", style: { display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "linear-gradient(135deg, var(--color-primary), #8b5cf6)", color: "white", fontWeight: "bold", fontSize: "1.25rem", textDecoration: "none" }, children: "E²" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxWidth: "1200px", margin: "0 auto", width: "100%" }, children }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "bottom-nav", children: [
      bottomNavItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          distExports.Link,
          {
            to: item.path,
            className: `nav-item ${isActive ? "active" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ]
          },
          item.path
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-item-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fab", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 24, color: "white" }) }) }, "fab"),
      bottomNavItems.slice(2, 4).map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          distExports.Link,
          {
            to: item.path,
            className: `nav-item ${isActive ? "active" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ]
          },
          item.path
        );
      })
    ] })
  ] });
};
const mockChartData = [
  { name: "Mon", uv: 0, pv: 0, amt: 0 },
  { name: "Tue", uv: 0, pv: 0, amt: 0 },
  { name: "Wed", uv: 0, pv: 0, amt: 0 },
  { name: "Thu", uv: 0, pv: 0, amt: 0 },
  { name: "Fri", uv: 0, pv: 0, amt: 0 },
  { name: "Sat", uv: 0, pv: 0, amt: 0 },
  { name: "Sun", uv: 0, pv: 0, amt: 0 }
];
const Dashboard = () => {
  const [stats, setStats] = reactExports.useState({
    totalUsers: 0,
    activeUsers: 0,
    todayJoinings: 0,
    totalInvestments: 0,
    activeInvestments: 0,
    pendingWithdrawals: 0,
    todayROI: 0,
    todayBinary: 0,
    todayReferral: 0,
    totalRevenue: 0,
    recentActivity: [],
    chartData: mockChartData
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
        const res = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({
          ...res.data,
          chartData: res.data.chartData || mockChartData
        });
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: "Loading dashboard..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Platform overview and real-time metrics" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Total Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: stats.totalUsers.toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon purple-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Active Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: stats.activeUsers.toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Today's Joinings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-success", children: [
          "+",
          stats.todayJoinings.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Total Investments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value", children: [
          "₹",
          stats.totalInvestments.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon purple-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Active Investments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value", children: [
          "₹",
          stats.activeInvestments.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon red-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Pending Withdrawals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-danger", children: [
          "₹",
          stats.pendingWithdrawals.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Today's ROI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-success", children: [
          "₹",
          stats.todayROI.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Today's Binary Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-primary", children: [
          "₹",
          stats.todayBinary.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon purple-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Today's Referral" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value", children: [
          "₹",
          stats.todayReferral.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Total Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-success", children: [
          "₹",
          stats.totalRevenue.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "24px", justifyContent: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "User Growth" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: stats.chartData, margin: { top: 10, right: 0, left: -20, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorUv", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#5B3DF5", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#5B3DF5", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "uv", stroke: "#5B3DF5", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorUv)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Investment Growth" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats.chartData, margin: { top: 10, right: 0, left: -20, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: { fill: "rgba(91, 61, 245, 0.04)" }, contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pv", fill: "#05CD99", radius: [4, 4, 0, 0], barSize: 20 })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Binary vs Referral Income" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: stats.chartData, margin: { top: 10, right: 0, left: -20, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#94a3b8" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "uv", stroke: "#5B3DF5", strokeWidth: 3, dot: { r: 4 }, activeDot: { r: 6 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "pv", stroke: "#EE5D50", strokeWidth: 3, dot: { r: 4 } })
        ] }) }) })
      ] })
    ] })
  ] });
};
const Members = () => {
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const [members, setMembers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const tabs = ["All Members", "Active", "Inactive", "Pending"];
  reactExports.useEffect(() => {
    api.get("/admin/members").then((res) => {
      setMembers(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching members", err);
      setLoading(false);
    });
  }, []);
  const filteredMembers = members.filter((m) => {
    if (activeTab === "All" || activeTab === "All Members") return true;
    return m.status.toUpperCase() === activeTab.toUpperCase() || activeTab === "Pending" && m.status === "PENDING KYC";
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "members-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group search-input", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 20, className: "text-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search members by name or ID..." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabs-container", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `tab-btn ${activeTab === tab || activeTab === "All" && tab === "All Members" ? "active" : ""}`,
        onClick: () => setActiveTab(tab === "All Members" ? "All" : tab),
        children: tab
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary full-width-btn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { size: 20 }),
      "View Binary Tree"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "members-list-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "members-count", children: [
        "MEMBERS (",
        filteredMembers.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "export-btn", children: "Export CSV" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "members-list", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-4", children: "Loading members..." }) : filteredMembers.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "member-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "member-info-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "member-profile", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "member-avatar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: member.avatar, alt: member.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: member.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted", children: [
                "ID: ",
                member.id
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${member.status === "ACTIVE" ? "active" : member.status === "INACTIVE" ? "inactive" : "pending"}`, children: member.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "member-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "BUSINESS VOLUME" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: member.volume })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-group text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "PLACEMENT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value text-primary", children: member.placement })
          ] })
        ] })
      ] }, member.id)),
      !loading && filteredMembers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-4 text-muted", children: "No members found." })
    ] })
  ] });
};
const Transactions = () => {
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const [transactions, setTransactions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const tabs = ["All", "Deposits", "Withdrawals"];
  reactExports.useEffect(() => {
    api.get("/admin/transactions").then((res) => {
      setTransactions(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching transactions", err);
      setLoading(false);
    });
  }, []);
  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "All") return true;
    if (activeTab === "Deposits") return tx.type === "deposit";
    if (activeTab === "Withdrawals") return tx.type === "withdrawal";
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "transactions-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-cards", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "summary-label", children: "TOTAL PAYOUTS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "summary-value", children: "₹0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "summary-trend text-primary", children: "0%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-icon red-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "summary-label", children: "PENDING REQUESTS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "summary-value", children: transactions.filter((t) => t.status === "PENDING").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "summary-trend text-muted", children: "All Time" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "transactions-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Transactions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn-small", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 18, className: "text-primary" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabs-container", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `tab-btn ${activeTab === tab ? "active" : ""}`,
        onClick: () => setActiveTab(tab),
        children: tab
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "transactions-list", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-4", children: "Loading transactions..." }) : filteredTransactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "transaction-item card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `tx-icon ${tx.type === "withdrawal" ? "bg-danger-light" : "bg-primary-light"}`, children: tx.type === "withdrawal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 20, className: "text-danger" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 20, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tx-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: tx.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: tx.subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tx-date-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tx-date", children: tx.date }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tx-amount-status", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tx-amount ${tx.amount.startsWith("-") ? "text-danger" : "text-primary"}`, children: tx.amount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${tx.status === "COMPLETED" ? "active" : tx.status === "REJECTED" ? "inactive" : "pending"}`, children: tx.status })
        ] })
      ] }, tx.id)),
      !loading && filteredTransactions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted p-4", children: "No transactions found." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-outline full-width-btn", children: "View Transaction History" })
  ] });
};
const data = [
  { name: "01 SEP", uv: 0 },
  { name: "05 SEP", uv: 0 },
  { name: "10 SEP", uv: 0 },
  { name: "15 SEP", uv: 0 },
  { name: "20 SEP", uv: 0 },
  { name: "25 SEP", uv: 0 },
  { name: "30 SEP", uv: 0 }
];
const topNodes = [];
const Analytics = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Performance monitoring console" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Total Vol." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-val-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: "₹0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted text-sm", children: "0%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Active Nodes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-val-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted text-sm", children: "0%" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card revenue-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-title", children: "REVENUE DISTRIBUTION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "text-muted" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ROI Payouts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-val text-primary", children: "₹0 (0%)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-fill bg-primary", style: { width: "0%" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Binary Bonuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-val text-primary", children: "₹0 (0%)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-fill bg-primary-light2", style: { width: "0%" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Direct Referrals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-val text-primary", children: "₹0 (0%)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-fill bg-primary-light3", style: { width: "0%" } }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card chart-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: "1rem" }, children: "30-DAY GROWTH" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: "0 Users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-legend-dot" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, margin: { top: 20, right: 0, left: 0, bottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "barGradientAnalytics", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6D5CFF", stopOpacity: 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#4318FF", stopOpacity: 0.9 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "4 4", vertical: false, stroke: "#e2e8f0", opacity: 0.6 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "name",
            axisLine: false,
            tickLine: false,
            tick: { fontSize: 12, fill: "#94a3b8", fontWeight: 600 },
            dy: 15
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            cursor: { fill: "rgba(91, 61, 245, 0.04)" },
            contentStyle: { borderRadius: "12px", border: "none", boxShadow: "0 10px 30px rgba(91, 61, 245, 0.15)", padding: "12px 20px", fontWeight: "bold", color: "#1b254b" },
            itemStyle: { color: "#5B3DF5" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "uv", radius: [10, 10, 0, 0], barSize: 36, children: data.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Cell,
          {
            fill: index === 3 ? "url(#barGradientAnalytics)" : "#e0e7ff"
          },
          `cell-${index}`
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-nodes-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Top Nodes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary view-all", children: "View All" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-list", children: topNodes.map((node) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-item card", style: { padding: "12px 16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-icon-img", style: { width: "40px", height: "40px", borderRadius: "50%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: node.avatar, alt: node.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { fontSize: "0.9rem", marginBottom: "2px" }, children: node.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem" }, children: node.details })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: "700", fontSize: "0.9rem" }, children: node.amount }),
          node.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge active", style: { fontSize: "0.6rem", padding: "2px 6px", marginTop: "4px" }, children: node.badge })
        ] })
      ] }, node.id)) })
    ] })
  ] });
};
const Settings = () => {
  const [freezeWithdrawals, setFreezeWithdrawals] = reactExports.useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = reactExports.useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = reactExports.useState(false);
  const [isEditingProfile, setIsEditingProfile] = reactExports.useState(false);
  const [adminProfile, setAdminProfile] = reactExports.useState({
    email: "admin@e2solutions.com",
    phone: "+91 98765 43210"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Settings" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", padding: "24px 0 32px 0" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-avatar-large", style: { width: "90px", height: "90px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2.5rem", fontWeight: "bold", boxShadow: "0 4px 12px rgba(67, 24, 255, 0.2)" }, children: "E²" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-indicator", style: { width: "18px", height: "18px", bottom: "4px", right: "4px", borderWidth: "3px" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: "1.5rem", margin: "0 0 4px 0" }, children: "E² Solutions Pvt Ltd" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { margin: "0 0 12px 0", fontSize: "0.95rem" }, children: "System Administrator • ID: 8829" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-primary",
            style: { padding: "8px 24px", fontSize: "0.95rem", borderRadius: "var(--radius-full)" },
            onClick: () => setIsProfileExpanded(true),
            children: "View Profile"
          }
        )
      ] })
    ] }),
    isProfileExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-modal-overlay", onClick: () => setIsProfileExpanded(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-modal-card card", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Admin Details" }),
          !isEditingProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsEditingProfile(true), style: { background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", display: "flex" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: () => {
          setIsProfileExpanded(false);
          setIsEditingProfile(false);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", marginBottom: "4px" }, children: "Email Address" }),
          isEditingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: adminProfile.email, onChange: (e) => setAdminProfile({ ...adminProfile, email: e.target.value }), style: { width: "100%", padding: "6px", fontSize: "0.875rem", borderRadius: "4px", border: "1px solid var(--color-border)", outline: "none" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: "500", fontSize: "0.875rem" }, children: adminProfile.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", marginBottom: "4px" }, children: "Phone Number" }),
          isEditingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: adminProfile.phone, onChange: (e) => setAdminProfile({ ...adminProfile, phone: e.target.value }), style: { width: "100%", padding: "6px", fontSize: "0.875rem", borderRadius: "4px", border: "1px solid var(--color-border)", outline: "none" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: "500", fontSize: "0.875rem" }, children: adminProfile.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", marginBottom: "4px" }, children: "Account Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: "500", fontSize: "0.875rem", color: "var(--color-success)" }, children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", marginBottom: "4px" }, children: "Last Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: "500", fontSize: "0.875rem" }, children: (/* @__PURE__ */ new Date()).toLocaleDateString() })
        ] })
      ] }),
      isEditingProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setIsEditingProfile(false), style: { padding: "8px 16px", fontSize: "0.875rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "transparent" }, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: () => setIsEditingProfile(false), style: { padding: "8px 16px", fontSize: "0.875rem", borderRadius: "var(--radius-md)" }, children: "Save Changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-title", children: "PLATFORM SETTINGS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Referral Percentage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "10%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Binary Percentage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "8%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ROI Percentage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "1.5%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ROI Duration" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "200 Days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinMaxIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Income Ceiling/Day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹50,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-title", children: "WITHDRAWAL CONTROLS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinMaxIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Min Withdrawal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹500.00" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinMaxIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Max Withdrawal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹100,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap bg-danger-light-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionIcon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Withdrawal Charges" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "5%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap bg-danger-light-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16, className: "text-danger" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Freeze Withdrawals" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-item-value", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: freezeWithdrawals,
                onChange: () => setFreezeWithdrawals(!freezeWithdrawals)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-title", children: "SECURITY & KYC" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap bg-primary-light-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Two-Factor Auth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { fontSize: "0.65rem" }, children: "MANDATORY" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-item-value", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: twoFactorAuth,
                onChange: () => setTwoFactorAuth(!twoFactorAuth)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "KYC Requirements" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tier 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-item-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-icon-wrap bg-danger-light-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16, className: "text-danger" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Admin Access Logs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-item-value", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn logout-btn full-width-btn", onClick: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 20 }),
      "Logout from Admin"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "version-info", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Version 4.2.0-stable • Build 992" }) })
  ] });
};
const ActivityIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) });
const CommissionIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 18V6" })
] });
const MinMaxIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
] });
const UserSearch = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "User Search" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Welcome to the User Search interface. Data and tables will be rendered here." }) })
  ] });
};
const KYCManagement = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "KYC Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Welcome to the KYC Management interface. Data and tables will be rendered here." }) })
  ] });
};
const WalletManagement = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Wallet Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Welcome to the Wallet Management interface. Data and tables will be rendered here." }) })
  ] });
};
const IncomeManagement = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Income Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Welcome to the Income Management interface. Data and tables will be rendered here." }) })
  ] });
};
const UserManagement = () => {
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [placementModal, setPlacementModal] = reactExports.useState({ open: false, userId: null, currentPlacement: "" });
  const [newPlacement, setNewPlacement] = reactExports.useState("Left Side");
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/members");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchUsers();
  }, []);
  const handleUpdatePlacement = async () => {
    try {
      await api.put(
        `/admin/members/${placementModal.userId}/placement`,
        { placement: newPlacement }
      );
      setPlacementModal({ open: false, userId: null, currentPlacement: "" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update placement", error);
      alert("Failed to update placement");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "User Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: "View, search, and manage platform members" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", flex: 1, minWidth: "300px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", flex: 1, maxWidth: "400px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, style: { position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search by ID, Name or Mobile...", style: { width: "100%", padding: "10px 16px 10px 44px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", outline: "none" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-outline", style: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "var(--radius-md)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 18 }),
          " Filters"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse", textAlign: "left" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "1px solid var(--color-border)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Mobile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Sponsor ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Placement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Joined Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600 }, children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "8", style: { padding: "24px", textAlign: "center" }, children: "Loading users..." }) }) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "8", style: { padding: "24px", textAlign: "center" }, children: "No users found." }) }) : users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "1px solid var(--color-border)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", fontWeight: 600, color: "var(--color-primary)" }, children: user.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", fontWeight: 500 }, children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", color: "var(--color-text-muted)" }, children: user.mobile }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", color: "var(--color-text-muted)" }, children: user.sponsorId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px" }, children: user.placement === "Pending" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }, children: "Pending" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--color-text-muted)" }, children: user.placement }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", color: "var(--color-text-muted)" }, children: user.joined }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, backgroundColor: user.status === "Active" ? "rgba(5, 205, 153, 0.1)" : "rgba(238, 93, 80, 0.1)", color: user.status === "Active" ? "var(--color-success)" : "var(--color-danger)" }, children: user.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
            user.placement === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setPlacementModal({ open: true, userId: user.id, currentPlacement: user.placement }),
                className: "btn btn-primary",
                style: { padding: "4px 8px", fontSize: "0.75rem", borderRadius: "6px" },
                children: "Place"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/user-profile/${user.id}`, title: "View Profile", style: { color: "var(--color-primary)", cursor: "pointer", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Edit", style: { color: "var(--color-text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 18 }) }),
            user.status === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Block User", style: { color: "var(--color-danger)", cursor: "pointer", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldBan, { size: 18 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Activate User", style: { color: "var(--color-success)", cursor: "pointer", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 }) })
          ] }) })
        ] }, user.id)) })
      ] }) })
    ] }),
    placementModal.open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e3 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "90%", maxWidth: "400px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "16px", fontSize: "1.25rem", fontWeight: "bold" }, children: "Assign Placement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "16px", color: "var(--color-text-muted)", fontSize: "0.875rem" }, children: "Select which side of the tree this user should be placed on." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: newPlacement,
          onChange: (e) => setNewPlacement(e.target.value),
          style: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", marginBottom: "24px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Left Side", children: "Left Side" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Right Side", children: "Right Side" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPlacementModal({ open: false, userId: null, currentPlacement: "" }), className: "btn btn-outline", style: { padding: "8px 16px", borderRadius: "8px" }, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleUpdatePlacement, className: "btn btn-primary", style: { padding: "8px 16px", borderRadius: "8px" }, children: "Save Placement" })
      ] })
    ] }) })
  ] });
};
const UserProfile = () => {
  const { id } = distExports.useParams();
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/members/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-container", style: { padding: "24px" }, children: "Loading profile..." });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-container", style: { padding: "24px" }, children: "User not found." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", style: { display: "flex", alignItems: "center", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/user-management", className: "icon-btn", style: { textDecoration: "none", color: "var(--color-primary)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "User Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: [
          "Detailed view for ",
          user.id
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20, className: "text-primary" }),
          " Personal Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", gap: "16px", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, textAlign: "right", wordBreak: "break-word" }, children: user.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", gap: "16px", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "Mobile Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "4px", textAlign: "right", justifyContent: "flex-end", wordBreak: "break-word" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, style: { flexShrink: 0, marginTop: "4px" } }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.mobile })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", gap: "16px", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "4px", textAlign: "right", justifyContent: "flex-end", wordBreak: "break-all" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, style: { flexShrink: 0, marginTop: "4px" } }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", gap: "16px", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "Login Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "4px", textAlign: "right", justifyContent: "flex-end", wordBreak: "break-word" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14, style: { flexShrink: 0, marginTop: "4px" } }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.password })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", gap: "16px", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "Joined Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "4px", textAlign: "right", justifyContent: "flex-end", wordBreak: "break-word" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, style: { flexShrink: 0, marginTop: "4px" } }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.joined })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", paddingBottom: "8px", gap: "16px", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", style: { whiteSpace: "nowrap" }, children: "KYC Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, backgroundColor: "rgba(5, 205, 153, 0.1)", color: "var(--color-success)", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14 }),
              " ",
              user.kycStatus
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { size: 20, className: "text-primary" }),
          " Account Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Sponsor ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: "var(--color-primary)" }, children: user.sponsorId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Total Team Count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
              " ",
              user.teamCount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", paddingBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Wallet Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0, color: "var(--color-success)" }, children: [
              "₹",
              user.walletBalance.toLocaleString()
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: "16px", marginBottom: "8px" }, children: "Income Overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Binary Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-primary", children: [
          "₹",
          user.binaryIncome.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon purple-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Referral Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value", children: [
          "₹",
          user.referralIncome.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { size: 24 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "ROI Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "stat-value text-success", children: [
          "₹",
          user.roiIncome.toLocaleString()
        ] })
      ] })
    ] })
  ] });
};
const AdminProfile = () => {
  const [copiedLink, setCopiedLink] = reactExports.useState(false);
  const [copiedCode, setCopiedCode] = reactExports.useState(false);
  const [showQR, setShowQR] = reactExports.useState(false);
  const referralCode = "BMLM-1000";
  const referralLink = `http://localhost:5174/register?sponsor=${referralCode}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2e3);
  };
  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Admin Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: "Manage your account and referral links" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "32px", gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "96px", height: "96px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "36px", fontWeight: "bold", boxShadow: "0 10px 25px rgba(91, 61, 245, 0.2)" }, children: "A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "1.75rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", margin: 0 }, children: [
              "System Admin ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 24, color: "#3b82f6" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { padding: "4px 12px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600", marginTop: "8px", display: "inline-block" }, children: "Super Administrator" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 24, color: "var(--color-text-muted)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { margin: 0, fontSize: "0.875rem" }, children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontWeight: "600" }, children: "admin@ec2.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 24, color: "var(--color-text-muted)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { margin: 0, fontSize: "0.875rem" }, children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontWeight: "600" }, children: "+91 99999 99999" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24, color: "var(--color-text-muted)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { margin: 0, fontSize: "0.875rem" }, children: "Sponsor ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontWeight: "600" }, children: referralCode })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "32px", display: "flex", flexDirection: "column", minHeight: "400px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { fontSize: "1.25rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 24, color: "#8b5cf6" }),
          " Referral Center"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem", marginBottom: "24px" }, children: 'Share your link. Users will register as "Pending" and you can place them later.' }),
        !showQR ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed var(--color-border)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 48, color: "var(--color-text-muted)", style: { marginBottom: "12px", opacity: 0.5 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowQR(true),
              className: "btn btn-outline",
              style: { background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", border: "none" },
              children: "Show QR Code"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "24px", marginBottom: "24px", backgroundColor: "var(--color-bg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCodeUrl, alt: "Referral QR Code", style: { width: "160px", height: "160px", borderRadius: "8px", padding: "8px", background: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowQR(false),
              style: { marginTop: "16px", fontSize: "0.875rem", color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" },
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }, children: "Your Referral Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  readOnly: true,
                  value: referralCode,
                  style: { flex: 1, padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", fontSize: "0.875rem", outline: "none", color: "var(--color-text)", fontWeight: "bold" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: copyCode,
                  className: "btn btn-primary",
                  style: { width: "42px", height: "42px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" },
                  title: "Copy Code",
                  children: copiedCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 18 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }, children: "Your Referral Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  readOnly: true,
                  value: referralLink,
                  style: { flex: 1, padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", fontSize: "0.875rem", outline: "none", color: "var(--color-text)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: copyLink,
                  className: "btn btn-primary",
                  style: { width: "42px", height: "42px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" },
                  title: "Copy Link",
                  children: copiedLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 18 })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const OrgTreeStyles = () => /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: { __html: `
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
      border-top: 2px solid var(--color-border);
      width: 50%; height: 24px;
    }
    .org-tree li::after {
      right: auto; left: 50%;
      border-left: 2px solid var(--color-border);
    }
    .org-tree li:only-child::after, .org-tree li:only-child::before {
      display: none;
    }
    .org-tree li:only-child { padding-top: 0;}
    .org-tree li:first-child::before, .org-tree li:last-child::after {
      border: 0 none;
    }
    .org-tree li:last-child::before {
      border-right: 2px solid var(--color-border);
      border-radius: 0 6px 0 0;
    }
    .org-tree li:first-child::after {
      border-radius: 6px 0 0 0;
    }
    .org-tree ul ul::before {
      content: '';
      position: absolute; top: 0; left: 50%;
      border-left: 2px solid var(--color-border);
      width: 0; height: 24px;
      margin-left: -1px;
    }
    .org-tree li > div {
      display: inline-block;
    }
  ` } });
const BinaryNode = ({ user, isRoot = false }) => {
  if (!user || Object.keys(user).length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "16px", border: "1px dashed var(--color-border)", width: "120px", backgroundColor: "var(--color-bg)", color: "var(--color-text-muted)", height: "140px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px", fontWeight: "bold", opacity: 0.5, marginBottom: "4px" }, children: "+" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Empty" })
    ] });
  }
  const initials = user.initials || (user.name ? user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "U");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    borderRadius: "16px",
    border: isRoot ? "1px solid rgba(91, 61, 245, 0.2)" : "1px solid var(--color-border)",
    width: "140px",
    backgroundColor: isRoot ? "rgba(91, 61, 245, 0.1)" : "var(--color-card)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    position: "relative",
    zIndex: 10,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "#5B3DF5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      marginBottom: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }, children: initials }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: "bold", fontSize: "0.875rem", width: "100%", textAlign: "center", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: isRoot ? "You" : user.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", marginTop: "4px", backgroundColor: "var(--color-bg)", padding: "2px 8px", borderRadius: "6px", fontWeight: 500, margin: "4px 0 0 0" }, children: [
      "ID: ",
      user.id
    ] }),
    !isRoot && user.side && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { height: "8px", width: "8px", borderRadius: "50%", backgroundColor: user.side === "Left" ? "#22c55e" : "#3b82f6" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", fontWeight: "bold", color: "var(--color-text-muted)" }, children: user.side })
    ] }),
    isRoot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "8px", fontSize: "10px", fontWeight: "bold", color: "white", backgroundColor: "#5B3DF5", padding: "2px 12px", borderRadius: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "You" })
  ] });
};
const renderTree = (node, isRoot = true, side = null, level = 0) => {
  if (!node && level > 2) return null;
  const nodeWithSide = node ? { ...node, side } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BinaryNode, { user: nodeWithSide, isRoot }) }),
    node && (node.left || node.right || level < 2) && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      renderTree(node.left, false, "Left", level + 1),
      renderTree(node.right, false, "Right", level + 1)
    ] })
  ] }, node?.id || Math.random());
};
const BinaryNetwork = () => {
  const [treeData, setTreeData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await api.get("/admin/network");
        setTreeData(res.data);
      } catch (error) {
        console.error("Failed to fetch network tree", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Binary Network" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: "Interactive view of your binary tree" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blue-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Left Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: "0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon purple-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Right Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value", children: "0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon green-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Left Business Vol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value text-success", children: "₹0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon red-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Right Business Vol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stat-value text-danger", children: "₹0" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "40px 0", overflowX: "auto", minHeight: "400px", WebkitOverflowScrolling: "touch" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrgTreeStyles, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "max-content", margin: "0 auto", padding: "0 20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "org-tree", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "40px" }, children: "Loading tree..." }) : renderTree(treeData, true) }) }) })
    ] })
  ] });
};
const InvestmentPlans = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Investment Plans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const Investments = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Investments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const Withdrawals = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Withdrawals" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const Reports = () => {
  const [reports, setReports] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchId, setSearchId] = reactExports.useState("");
  const [searchName, setSearchName] = reactExports.useState("");
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/members");
      const reportData = res.data.map((user, index) => {
        const investment = 0;
        const binary = 0;
        const dr = 0;
        const total = 0;
        const payout = 0;
        const profit = 0;
        return {
          sno: index + 1,
          idNo: user.id,
          name: user.name,
          mobile: user.mobile,
          investment,
          binary,
          dr,
          total,
          payout,
          profit
        };
      });
      setReports(reportData);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchReports();
  }, []);
  const filteredReports = reports.filter((r) => {
    const matchId = searchId ? r.idNo.toLowerCase().includes(searchId.toLowerCase()) : true;
    const matchName = searchName ? r.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchId && matchName;
  });
  const handleDownloadCSV = () => {
    const headers = ["S.no", "ID No", "Name", "Mobile no", "investment", "binary", "dr", "total", "payout", "Profit"];
    const csvContent = [
      headers.join(","),
      ...filteredReports.map(
        (r) => [r.sno, r.idNo, `"${r.name}"`, r.mobile, r.investment, r.binary, r.dr, r.total, r.payout, r.profit].join(",")
      )
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customer_binary_referral_income.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const totals = filteredReports.reduce((acc, curr) => {
    acc.investment += curr.investment;
    acc.binary += curr.binary;
    acc.dr += curr.dr;
    acc.total += curr.total;
    acc.payout += curr.payout;
    acc.profit += curr.profit;
    return acc;
  }, { investment: 0, binary: 0, dr: 0, total: 0, payout: 0, profit: 0 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", background: "linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Customer Binary and Referral Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", style: { fontSize: "0.875rem" }, children: "View and download customer income reports" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDownloadCSV, className: "btn btn-primary", style: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "var(--radius-md)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
        " Download List"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px", backgroundColor: "var(--color-bg)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: 600, fontSize: "0.875rem" }, children: "ID No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchId,
              onChange: (e) => setSearchId(e.target.value),
              style: { padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)", outline: "none", width: "200px" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: 600, fontSize: "0.875rem" }, children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchName,
              onChange: (e) => setSearchName(e.target.value),
              style: { padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)", outline: "none", width: "200px" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", style: { padding: "8px 24px", borderRadius: "var(--radius-md)", fontWeight: 600 }, children: "go" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "0.875rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-bg)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "s.no" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "ID No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "Mobile no" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "investment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "binary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "dr" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "payout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { padding: "16px 8px", color: "var(--color-text-muted)", fontWeight: 600, border: "1px solid var(--color-border)" }, children: "Profit" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "10", style: { padding: "24px", border: "1px solid var(--color-border)" }, children: "Loading reports..." }) }) : filteredReports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "10", style: { padding: "24px", border: "1px solid var(--color-border)" }, children: "No records found." }) }) : filteredReports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", border: "1px solid var(--color-border)" }, children: r.sno }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", fontWeight: 600, color: "var(--color-primary)", border: "1px solid var(--color-border)" }, children: r.idNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", fontWeight: 500, border: "1px solid var(--color-border)" }, children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }, children: r.mobile }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", border: "1px solid var(--color-border)" }, children: r.investment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", border: "1px solid var(--color-border)" }, children: r.binary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", border: "1px solid var(--color-border)" }, children: r.dr }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", fontWeight: 600, border: "1px solid var(--color-border)" }, children: r.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", fontWeight: 600, color: "var(--color-success)", border: "1px solid var(--color-border)" }, children: r.payout }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 8px", fontWeight: 600, color: r.profit >= 0 ? "var(--color-success)" : "var(--color-danger)", border: "1px solid var(--color-border)" }, children: r.profit })
        ] }, r.sno)) }),
        !loading && filteredReports.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "var(--color-bg)", fontWeight: "bold" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: "4", style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: totals.investment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: totals.binary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: totals.dr }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: totals.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", border: "1px solid var(--color-border)" }, children: totals.payout }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "16px 8px", color: totals.profit >= 0 ? "var(--color-success)" : "var(--color-danger)", border: "1px solid var(--color-border)" }, children: totals.profit })
        ] }) })
      ] }) })
    ] })
  ] });
};
const Notifications = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Notifications" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const Announcements = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Announcements" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const SupportManagement = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Support Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Welcome to the Support Management interface. Data and tables will be rendered here." }) })
  ] });
};
const Messaging = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Messaging" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const AuditLogs = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Audit Logs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const RoleManagement = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "20px" }, children: "Role Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--color-text-muted)" }, children: "This module is currently under development." })
  ] });
};
const ExternalRedirect = ({ to }) => {
  reactExports.useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};
function App() {
  const urlToken = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("token") : null;
  const [isClient, setIsClient] = reactExports.useState(false);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(() => {
    if (urlToken) return true;
    if (typeof window !== "undefined") return !!localStorage.getItem("token");
    return false;
  });
  reactExports.useEffect(() => {
    setIsClient(true);
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [urlToken]);
  if (!isClient) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-theme", id: "admin-root", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.BrowserRouter, { basename: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      distExports.Route,
      {
        path: "/login",
        element: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "/", replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalRedirect, { to: "/login" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      distExports.Route,
      {
        path: "/*",
        element: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { onLogout: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Routes, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/profile", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProfile, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/user-management", element: /* @__PURE__ */ jsxRuntimeExports.jsx(UserManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/user-profile/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfile, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/binary-network", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BinaryNetwork, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/investment-plans", element: /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentPlans, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/investments", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Investments, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/income-management", element: /* @__PURE__ */ jsxRuntimeExports.jsx(IncomeManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/wallet-management", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WalletManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/withdrawals", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Withdrawals, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/kyc-management", element: /* @__PURE__ */ jsxRuntimeExports.jsx(KYCManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/reports", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Reports, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/notifications", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Notifications, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/announcements", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Announcements, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/support-center", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SupportManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/messaging", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Messaging, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/settings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/audit-logs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogs, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/role-management", element: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleManagement, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/members", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Members, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/transactions", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Transactions, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/analytics", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Analytics, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/user-search", element: /* @__PURE__ */ jsxRuntimeExports.jsx(UserSearch, {}) })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "/login", replace: true })
      }
    )
  ] }) }) });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(App, {});
export {
  SplitComponent as component
};
