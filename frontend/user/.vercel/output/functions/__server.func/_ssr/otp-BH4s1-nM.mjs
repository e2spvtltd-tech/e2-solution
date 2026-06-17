import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AuthShell } from "./AuthShell-DhnEZ502.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
function OtpPage() {
  const navigate = useNavigate();
  const [code, setCode] = reactExports.useState(["", "", "", "", "", ""]);
  const refs = reactExports.useRef([]);
  const set = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const verify = (e) => {
    e.preventDefault();
    toast.success("Verified successfully");
    navigate({
      to: "/app"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { title: "OTP Verification", subtitle: "Enter the 6-digit code sent to your number", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: verify, className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between gap-2", children: code.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: (el) => {
      refs.current[i] = el;
    }, value: d, onChange: (e) => set(i, e.target.value), inputMode: "numeric", maxLength: 1, className: "h-14 w-12 rounded-xl border border-border bg-background text-center text-xl font-bold outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "hero", className: "w-full", children: "Verify & Continue" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toast.success("New code sent"), className: "w-full text-center text-xs font-semibold text-primary", children: "Resend Code" })
  ] }) });
}
export {
  OtpPage as component
};
