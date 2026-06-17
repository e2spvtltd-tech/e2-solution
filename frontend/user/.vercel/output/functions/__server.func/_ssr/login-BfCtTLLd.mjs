import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as Infinity, S as ShieldCheck, L as Lock, M as Mail, E as EyeOff, b as Eye } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [emailOrId, setEmailOrId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = (await import("./api-B0BjSyJe.mjs")).default;
      const res = await api.post("/auth/login", {
        emailOrId,
        password
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      navigate({
        to: "/app"
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen w-full items-center justify-center p-0 md:p-8 font-sans", style: {
    backgroundColor: "#f8fafc"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-[1000px] min-h-[100vh] md:min-height-[700px] md:h-[700px] bg-white rounded-none md:rounded-[24px] shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex-col md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 lg:flex-[0.45] bg-gradient-to-br from-[#1f165a] to-[#100b2e] text-white p-10 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden hidden md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-[150px] -left-[150px] w-[400px] h-[400px] rounded-full border border-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full border border-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[50px] right-[50px] w-[60px] h-[60px]", style: {
        backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "15px 15px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[80px] left-[40px] w-[60px] h-[60px]", style: {
        backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "15px 15px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Infinity, { size: 64, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[28px] font-bold tracking-wide m-0", children: "E² Solutions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] text-[#a3aed0] mt-1", children: "Pvt Ltd" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mt-10 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[#4f46e5] text-[20px] font-semibold mb-4", children: "User Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#e2e8f0] text-[13px] leading-relaxed", children: [
          "Manage your investments, network",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "and business with ease."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-[260px] mt-auto mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-4 h-[160px] flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[28px] h-[28px] bg-[#4f46e5] rounded-full flex flex-col items-center justify-end overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[10px] h-[10px] bg-white rounded-full mb-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[20px] h-[10px] bg-white rounded-t-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[60%] h-[4px] bg-white/20 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[40%] h-[4px] bg-white/10 rounded-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 bg-white/20 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 bg-white/20 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 bg-white/20 rounded-full" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[60%] h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 100 40", preserveAspectRatio: "none", className: "w-full h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,30 Q15,40 30,20 T60,25 T100,5", fill: "none", stroke: "#5a48e7", strokeWidth: "2.5", strokeLinecap: "round" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[40%] flex justify-end items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[45px] h-[45px] rounded-full relative", style: {
              background: "conic-gradient(#4f46e5 0% 75%, rgba(255, 255, 255, 0.1) 75% 100%)"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-[10px] bg-[#17113e] rounded-full" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-4 left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-gradient-to-br from-[#4f46e5] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(59,130,246,0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 32, color: "white", strokeWidth: 2 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[1.2] p-8 sm:p-12 md:p-16 flex flex-col justify-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[400px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[60px] h-[60px] bg-[#f5f3ff] border-[1.5px] border-[#e0e7ff] rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 28, className: "text-[#4f46e5]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#1e293b] mb-2", children: "Welcome Back!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#64748b]", children: "Sign in to continue to User Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-semibold text-[#1e293b] mb-2", children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "absolute left-3.5 text-[#94a3b8]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "you@example.com", value: emailOrId, onChange: (e) => setEmailOrId(e.target.value), required: true, className: "w-full py-3 pl-[40px] pr-3.5 border border-[#e2e8f0] rounded-xl text-[14px] text-[#1e293b] outline-none focus:border-[#4f46e5] focus:ring-[3px] focus:ring-[#4f46e5]/10 transition-all bg-transparent" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[12px] font-semibold text-[#1e293b]", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-[12px] font-semibold text-[#4f46e5] hover:underline", children: "Forgot Password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "absolute left-3.5 text-[#94a3b8]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full py-3 pl-[40px] pr-10 border border-[#e2e8f0] rounded-xl text-[14px] text-[#1e293b] outline-none focus:border-[#4f46e5] focus:ring-[3px] focus:ring-[#4f46e5]/10 transition-all bg-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 text-[#94a3b8] hover:text-[#475569]", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center relative pl-7 cursor-pointer text-[12px] font-medium text-[#1e293b]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "peer absolute opacity-0 w-0 h-0", defaultChecked: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-[#cbd5e1] rounded peer-checked:bg-[#4f46e5] peer-checked:border-[#4f46e5] transition-all flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) }),
          "Remember me"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full py-3.5 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] text-white rounded-xl text-[14px] font-semibold shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-6", children: loading ? "Signing in..." : "Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border-b border-[#e2e8f0]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 text-[12px] text-[#94a3b8]", children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border-b border-[#e2e8f0]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "w-full py-3 bg-transparent text-[#4f46e5] border border-[#e0e7ff] rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#f8fafc] hover:border-[#4f46e5] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
          "Login with OTP"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] text-[#64748b]", children: [
          "Don't have an account? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-semibold text-[#4f46e5] hover:underline", children: "Request Access" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#64748b] mt-4", children: "© 2024 E² Solutions Pvt Ltd. All rights reserved." })
      ] })
    ] }) })
  ] }) });
}
export {
  LoginPage as component
};
