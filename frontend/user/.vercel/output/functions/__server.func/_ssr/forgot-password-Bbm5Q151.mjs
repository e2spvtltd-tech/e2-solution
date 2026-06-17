import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AuthShell, F as Field } from "./AuthShell-DhnEZ502.mjs";
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
function ForgotPage() {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    toast.success("Reset code sent");
    navigate({
      to: "/reset-password"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { title: "Forgot Password", subtitle: "We'll send a reset code to your email", footer: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-semibold text-primary", children: "Back to Sign In" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email or User ID", type: "text", placeholder: "you@example.com", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "hero", className: "w-full", children: "Send Reset Code" })
  ] }) });
}
export {
  ForgotPage as component
};
