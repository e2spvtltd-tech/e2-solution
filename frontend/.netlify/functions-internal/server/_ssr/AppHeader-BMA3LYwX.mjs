import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { R as Root, T as Trigger, P as Portal, O as Overlay, C as Content, a as Title, b as Close, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { L as Logo, B as Button } from "./button-BKD2xzZ9.mjs";
import api from "./api-C4AJ10yd.mjs";
import { r as Search, X, o as Bell, I as Info, J as Menu, H as House, N as Network, K as Receipt, O as BadgeDollarSign, W as Wallet, U as User, q as LogOut } from "../_libs/lucide-react.mjs";
const links = [
  { icon: House, label: "Dashboard", to: "/app" },
  { icon: Network, label: "Network", to: "/app/network" },
  { icon: Receipt, label: "Investments", to: "/app/invest" },
  { icon: BadgeDollarSign, label: "Earnings", to: "/app/earnings" },
  { icon: Wallet, label: "Wallet", to: "/app/wallet" },
  { icon: User, label: "Profile", to: "/app/profile" }
];
function SidePanel() {
  const [open, setOpen] = reactExports.useState(false);
  const [profile, setProfile] = reactExports.useState(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    api.get("/user/profile").then((res) => setProfile(res.data)).catch(() => {
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate({ to: "/login" });
  };
  const initials = profile?.full_name ? profile.full_name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "FK";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-[18px] w-[18px]" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Portal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { className: "fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-sm gap-4 border-r border-border/40 bg-background p-6 shadow-glow transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left flex flex-col overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-lg font-bold text-foreground", children: "Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { className: "sr-only", children: "Main navigation menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center mt-6 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-24 w-24 place-items-center rounded-full bg-primary text-4xl font-extrabold text-primary-foreground shadow-glow", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-8 flex flex-col gap-2 shrink-0", children: links.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: link.to,
            activeOptions: { exact: link.to === "/app" },
            className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-foreground [&.active]:bg-primary [&.active]:text-primary-foreground shadow-sm [&.active]:shadow-glow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "h-5 w-5" }),
              link.label
            ]
          }
        ) }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-8 shrink-0 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleLogout, variant: "outline", className: "w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
          " Log Out"
        ] }) })
      ] })
    ] })
  ] });
}
function AppHeader({
  title,
  subtitle
}) {
  const [isSearchOpen, setIsSearchOpen] = reactExports.useState(false);
  const [isNotifOpen, setIsNotifOpen] = reactExports.useState(false);
  const [hasNewNotif, setHasNewNotif] = reactExports.useState(false);
  const [notifications, setNotifications] = reactExports.useState([]);
  const [profile, setProfile] = reactExports.useState(null);
  reactExports.useEffect(() => {
    api.get("/user/profile").then((res) => setProfile(res.data)).catch(() => {
    });
  }, []);
  const initials = profile?.full_name ? profile.full_name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "FK";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-20 bg-background/90 px-4 pb-3 pt-8 backdrop-blur-md border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidePanel, {}),
      title ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 truncate", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-extrabold tracking-tight text-foreground truncate", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: subtitle })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { open: isSearchOpen, onOpenChange: setIsSearchOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-[18px] w-[18px]" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Portal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { className: "fixed left-[50%] top-[20%] z-50 grid w-[90%] max-w-sm translate-x-[-50%] gap-4 border bg-background p-6 shadow-glow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-lg font-bold", children: "Search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full p-1 text-muted-foreground hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search users, offers, history...",
                  className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30",
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-2", onClick: () => setIsSearchOpen(false), children: "Search" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { open: isNotifOpen, onOpenChange: (open) => {
        setIsNotifOpen(open);
        if (open) setHasNewNotif(false);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-[18px] w-[18px]" }),
          hasNewNotif && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background animate-pulse" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Portal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { className: "fixed left-[50%] top-[50%] z-50 grid w-[90%] max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-glow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-lg font-bold", children: "Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full p-1 text-muted-foreground hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-8 w-8 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You have no notifications yet." })
            ] }) : notifications.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 bg-accent/50 p-3 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: notif.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: notif.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-1 font-medium uppercase tracking-wider", children: notif.time })
              ] })
            ] }, notif.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app/profile",
          className: "ml-1 md:ml-2 grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 transition-all shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-base md:text-lg", children: initials })
        }
      )
    ] })
  ] }) });
}
export {
  AppHeader as A
};
