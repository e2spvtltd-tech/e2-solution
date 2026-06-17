import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AuthShell, F as Field } from "./AuthShell-DhnEZ502.mjs";
import { B as Button } from "./button-BKD2xzZ9.mjs";
import { A as ArrowRight, a as ArrowLeft } from "../_libs/lucide-react.mjs";
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
function RegisterPage() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const initialSponsor = searchParams.get("sponsor") || "";
  const isReferred = Boolean(initialSponsor);
  const [loading, setLoading] = reactExports.useState(false);
  const [fullName, setFullName] = reactExports.useState("");
  const [mobile, setMobile] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [sponsorId, setSponsorId] = reactExports.useState(initialSponsor);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = (await import("./api-B0BjSyJe.mjs")).default;
      const res = await api.post("/auth/register", {
        fullName,
        mobile,
        email,
        password,
        sponsorId,
        placement: "Pending"
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully");
      navigate({
        to: "/app"
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { title: "Account Creation", subtitle: "Join the network in a few quick steps", footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Already a member?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-semibold text-primary hover:underline", children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center gap-2 font-medium hover:text-foreground transition-colors py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Home"
    ] })
  ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", type: "text", placeholder: "Your full name", value: fullName, onChange: (e) => setFullName(e.target.value), required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mobile Number", type: "tel", placeholder: "+91 00000 00000", value: mobile, onChange: (e) => setMobile(e.target.value), required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email Address", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", type: "password", placeholder: "Create a password", value: password, onChange: (e) => setPassword(e.target.value), required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: isReferred ? "Sponsor ID (Locked)" : "Sponsor ID (optional)", type: "text", placeholder: "BMLM-0000", value: sponsorId, onChange: (e) => !isReferred && setSponsorId(e.target.value), disabled: isReferred }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", variant: "hero", className: "w-full", disabled: loading, children: [
      loading ? "Registering..." : "Complete Registration",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
