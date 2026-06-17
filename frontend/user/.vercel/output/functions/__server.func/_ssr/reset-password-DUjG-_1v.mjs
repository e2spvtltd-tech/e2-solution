import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
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
function ResetPage() {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    toast.success("Password updated");
    navigate({
      to: "/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { title: "Reset Password", subtitle: "Create a new secure password", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "New Password", type: "password", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirm Password", type: "password", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "hero", className: "w-full", children: "Update Password" })
  ] }) });
}
export {
  ResetPage as component
};
