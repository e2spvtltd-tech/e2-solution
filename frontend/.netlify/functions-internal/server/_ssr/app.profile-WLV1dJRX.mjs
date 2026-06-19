import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppHeader } from "./AppHeader-BMA3LYwX.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import api from "./api-C4AJ10yd.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { B as BadgeCheck, C as CircleCheckBig, F as FileText, k as Landmark, l as Smartphone, m as Headset, n as MessageSquare, E as EyeOff, b as Eye, o as Bell, p as Globe, q as LogOut } from "../_libs/lucide-react.mjs";
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
function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("personal");
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [isChangingPassword, setIsChangingPassword] = reactExports.useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = reactExports.useState(true);
  const [showNewPassword, setShowNewPassword] = reactExports.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = reactExports.useState(false);
  reactExports.useEffect(() => {
    api.get("/user/profile").then((res) => {
      setProfile(res.data);
      if (res.data.plain_password) {
        setCurrentPassword(res.data.plain_password);
      }
      setLoading(false);
    }).catch(() => {
      toast.error("Failed to load profile");
      setLoading(false);
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({
      to: "/login"
    });
  };
  const handleSave = (message) => {
    toast.success(message);
  };
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    setIsChangingPassword(true);
    try {
      const res = await api.put("/user/password", {
        currentPassword,
        newPassword
      });
      toast.success(res.data.message || "Password updated successfully!");
      setCurrentPassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsChangingPassword(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Profile", subtitle: "Manage your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-10 text-muted-foreground", children: "Loading..." })
    ] });
  }
  const referralCode = profile?.user_id || "BMLM-1284";
  const fullName = profile?.full_name || "Aanya Sharma";
  const initials = fullName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "AS";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Profile", subtitle: "Manage your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar pb-1", children: [{
      id: "personal",
      label: "Personal Info"
    }, {
      id: "kyc",
      label: "KYC Verification"
    }, {
      id: "support",
      label: "Support Center"
    }, {
      id: "security",
      label: "Security"
    }, {
      id: "settings",
      label: "Settings"
    }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"), children: tab.label }, tab.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex items-center gap-4 rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-primary-foreground/15 text-2xl md:text-3xl font-extrabold", children: initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-2xl font-bold", children: fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs md:text-sm text-primary-foreground/70 mt-0.5", children: [
            "ID: ",
            referralCode,
            " · Premium Plan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 md:mt-3 inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3 w-3 md:h-4 md:w-4" }),
            " KYC Verified"
          ] })
        ] })
      ] }),
      activeTab === "personal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Personal Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", defaultValue: fullName, className: "w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Mobile Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", defaultValue: profile?.phone || "+91 98765 43210", className: "w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", defaultValue: profile?.email || "user@example.com", className: "w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-2", onClick: () => handleSave("Profile updated successfully!"), children: "Save Changes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft h-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Account Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "divide-y divide-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "User ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: referralCode })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Sponsor ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "BMLM-0001" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Joining Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "15 Jan 2026" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Current Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-primary", children: "Premium" })
            ] })
          ] })
        ] })
      ] }),
      activeTab === "kyc" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "KYC Documents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-success text-xs font-bold uppercase tracking-wider bg-success/15 px-2 py-1 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
              " Approved"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "Aadhaar Card" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-success", children: "Verified" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Update" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "PAN Card" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-success", children: "Verified" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Update" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Bank & UPI Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-6 w-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "State Bank of India" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "**** **** 1234" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Edit" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-6 w-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "UPI ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "user@upi" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Edit" })
            ] })
          ] })
        ] })
      ] }),
      activeTab === "support" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft flex flex-col items-center justify-center text-center space-y-4 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Headset, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Need Help?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Our support team is available 24/7 to assist you with any platform issues." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full max-w-xs mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 mr-2" }),
            " Raise a Ticket"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Support History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: [{
            id: "T-1029",
            issue: "Withdrawal Delay",
            status: "Resolved",
            date: "10 Jun 2026"
          }, {
            id: "T-0984",
            issue: "KYC Rejected",
            status: "Closed",
            date: "01 May 2026"
          }].map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-3 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: ticket.issue }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "ID: ",
                ticket.id,
                " · ",
                ticket.date
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] uppercase font-bold px-2 py-1 rounded-full", ticket.status === "Resolved" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"), children: ticket.status })
          ] }, ticket.id)) })
        ] })
      ] }),
      activeTab === "security" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Security Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Current Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showCurrentPassword ? "text" : "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), placeholder: "••••••••", className: "w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowCurrentPassword(!showCurrentPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showCurrentPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showNewPassword ? "text" : "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "••••••••", className: "w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowNewPassword(!showNewPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showNewPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Confirm Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showConfirmPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "••••••••", className: "w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showConfirmPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-2", onClick: handlePasswordChange, disabled: isChangingPassword, children: isChangingPassword ? "Updating..." : "Change Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm", children: "Two-Factor Authentication" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Protect your account with an extra layer of security" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-5 w-5 rounded text-primary focus:ring-primary border-border", defaultChecked: true })
          ] }) })
        ] })
      ] }),
      activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 md:p-6 shadow-soft max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "Application Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              " Notification Preferences"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-accent/30 p-3 rounded-xl border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Email Updates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 rounded text-primary", defaultChecked: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-accent/30 p-3 rounded-xl border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Push Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 rounded text-primary", defaultChecked: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
              " Language Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "English (US)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Hindi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Spanish" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive", onClick: handleLogout, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
            " Log Out From All Devices"
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProfilePage as component
};
