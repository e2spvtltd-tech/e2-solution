import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "default",
  className
}) {
  const toneMap = {
    default: "bg-accent text-accent-foreground",
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-2xl bg-card p-4 shadow-soft", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-9 w-9 place-items-center rounded-xl", toneMap[tone]), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]" }) }),
      delta && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success", children: delta })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-extrabold tracking-tight text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
export {
  StatCard as S
};
