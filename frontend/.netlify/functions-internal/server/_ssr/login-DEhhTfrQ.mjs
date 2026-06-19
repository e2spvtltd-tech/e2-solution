import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import api from "./api-C4AJ10yd.mjs";
import { a as ArrowLeft, L as Lock, M as Mail, E as EyeOff, b as Eye, c as LogIn, S as Shield } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [emailOrId, setEmailOrId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", {
        emailOrId,
        password
      });
      const userRole = res.data.role || res.data.user?.role;
      if (userRole === "ADMIN") {
        window.location.href = `/admin?token=${res.data.token}`;
      } else {
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome back!");
        navigate({
          to: "/app"
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.");
      toast.error(err.response?.data?.message || err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-page-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-card", style: {
    maxWidth: "450px"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-right-panel", style: {
    width: "100%",
    padding: "50px 30px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "back-to-home-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "back-to-home-link", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to Home" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-form-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lock-circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 28, color: "#6d28d9" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Welcome Back!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please sign in to continue to your panel." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-message", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "input-icon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "you@example.com", value: emailOrId, onChange: (e) => setEmailOrId(e.target.value), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "label-flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "forgot-link", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "input-icon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "eye-btn", onClick: () => setShowPassword(!showPassword), children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group remember-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "custom-checkbox", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "checkmark" }),
          "Remember me"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "submit-btn", disabled: loading, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 18 }),
          loading ? "Signing In..." : "Sign In"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "secure-info-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 20, className: "secure-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Secure Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All activities are monitored and recorded." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px]", style: {
          color: "#64748b",
          fontSize: "12px",
          marginTop: "20px"
        }, children: [
          "Don't have an account? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-semibold hover:underline", style: {
            color: "#6d28d9",
            fontWeight: 600,
            marginLeft: "4px",
            textDecoration: "none"
          }, children: "Sign up" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", style: {
          marginTop: "10px",
          fontSize: "11px",
          color: "#94a3b8"
        }, children: "© 2024 E² Solutions Pvt Ltd. All rights reserved." })
      ] })
    ] })
  ] }) }) });
}
export {
  LoginPage as component
};
