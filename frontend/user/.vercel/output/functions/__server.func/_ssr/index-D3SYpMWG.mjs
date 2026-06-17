import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo, B as Button } from "./button-BKD2xzZ9.mjs";
import { S as ShieldCheck, A as ArrowRight, T as TrendingUp, c as Users } from "../_libs/lucide-react.mjs";
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
function Landing() {
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const intervalId = setInterval(() => {
      if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
      if (isAtEnd) {
        scrollContainer.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      } else {
        scrollContainer.scrollBy({
          left: window.innerWidth * 0.85 + 16,
          behavior: "smooth"
        });
      }
    }, 3e3);
    return () => clearInterval(intervalId);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full min-h-[100dvh] bg-background overflow-x-hidden flex flex-col pb-4 md:pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 py-4 lg:py-6 max-w-6xl mx-auto w-full relative z-10 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "hero", className: "rounded-full px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Sign In" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 text-center max-w-6xl mx-auto w-full flex-1 flex flex-col relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center items-center w-full py-8 md:py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/20 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
          " Institutional-grade Platform"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 md:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-tight tracking-tight text-foreground", children: [
          "Build Your Future.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: "Start Earning Now." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "A smart platform for investment growth, binary networking, and financial rewards. Secure your financial future today with our automated ROI system." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 md:mt-10 flex flex-col sm:flex-row justify-center w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", className: "rounded-full px-8 md:px-12 h-14 md:h-16 text-base md:text-lg shadow-glow w-full sm:w-auto font-bold transition-transform hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", children: [
          "Get Started Now ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5 md:h-6 md:w-6" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mt-auto md:mt-8 lg:mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex md:grid md:grid-cols-3 gap-4 md:gap-8 text-left w-[100vw] md:w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pt-2 px-6 md:px-0 -mx-5 md:mx-0 scroll-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 md:h-7 md:w-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl lg:text-2xl font-bold text-foreground", children: "Daily Returns" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed", children: "Earn consistent daily ROI on your active investment packages with automated payouts directly to your wallet." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 md:h-7 md:w-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl lg:text-2xl font-bold text-foreground", children: "Binary Network" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed", children: "Build your team and earn lucrative binary matching bonuses from your weaker leg volume every single day." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 md:h-7 md:w-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl lg:text-2xl font-bold text-foreground", children: "Secure System" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed", children: "Enterprise-grade security architecture protecting your assets and personal data with end-to-end encryption." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 shrink-0 md:hidden" })
      ] }) })
    ] })
  ] });
}
export {
  Landing as component
};
