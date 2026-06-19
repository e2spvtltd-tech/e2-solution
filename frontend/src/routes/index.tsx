import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, TrendingUp, Network, ChevronRight, Fingerprint } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home Page - e2solution.in" },
      {
        name: "description",
        content:
          "Withdraw-to-grade binary network investment platform. Earn daily ROI, binary income and referral commissions.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-tr from-[#e0f2fe] via-[#f5f3ff] to-[#fce7f3] text-slate-900 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden font-sans">
      
      {/* Decorative background curves/glows matching the screenshot */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Soft background glows - Dual tone mesh */}
        <div className="absolute top-1/4 left-1/4 w-full max-w-4xl h-[400px] bg-indigo-300/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-full max-w-3xl h-[350px] bg-pink-300/20 rounded-full blur-[120px]" />
        
        {/* Bottom wave decoration using SVGs */}
        <svg 
          className="absolute bottom-0 left-0 w-full min-w-[1024px] opacity-[0.65] transition-all duration-500" 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="url(#wave-gradient-1)" 
            d="M0,192L80,186.7C160,181,320,171,480,186.7C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
          <path 
            fill="url(#wave-gradient-2)" 
            opacity="0.65"
            d="M0,256L80,245.3C160,235,320,213,480,218.7C640,224,800,256,960,266.7C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main container: centered, vertically balanced, compact and no-scroll */}
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center justify-between h-full max-h-[85vh] py-4 sm:py-6 gap-6 relative z-10">
        
        {/* Logo Header */}
        <header className="flex flex-col items-center shrink-0">
          <Logo layout="vertical" size="xl" />
        </header>

        {/* Hero Section */}
        <section className="text-center w-full flex flex-col items-center gap-4 sm:gap-6">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0efff] border border-[#e2e0ff] px-4 py-1.5 text-xs font-semibold text-[#5b3df5] shadow-[0_2px_10px_rgba(91,61,245,0.04)] select-none">
            <ShieldCheck className="h-3.5 w-3.5 text-[#5b3df5]" /> Withdraw-to-grade Platform
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.2] tracking-tight text-[#0f172a] select-none">
            Build Your Future.
            <br />
            <span className="bg-gradient-to-r from-[#5b3df5] via-[#6d5cff] to-[#806cfb] bg-clip-text text-transparent">
              Start Earning Now.
            </span>
          </h1>

          {/* Action Button - Sign In */}
          <div className="flex justify-center w-full mt-2">
            <Button 
              asChild 
              className="rounded-full px-12 py-6 text-base font-bold shadow-md bg-gradient-to-r from-[#5b3df5] to-[#806cfb] hover:from-[#4f35d9] hover:to-[#6d57e0] text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group w-fit cursor-pointer"
            >
              <Link to="/login">
                Sign In 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Feature Cards List */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4 shrink-0">
          
          {/* Card 1: Daily Payouts */}
          <div className="bg-white/80 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_12px_35px_rgba(91,61,245,0.1)] flex items-center justify-between w-full transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 bg-[#eef2ff] rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <TrendingUp className="h-5 w-5 text-[#5b3df5]" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Daily Payouts
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-[#5b3df5] transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>

          {/* Card 2: Binary Network */}
          <div className="bg-white/80 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_12px_35px_rgba(91,61,245,0.1)] flex items-center justify-between w-full transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 bg-[#eef2ff] rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Network className="h-5 w-5 text-[#5b3df5]" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Binary Network
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-[#5b3df5] transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>

          {/* Card 3: Secure System */}
          <div className="bg-white/80 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_12px_35px_rgba(91,61,245,0.1)] flex items-center justify-between w-full transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 bg-[#eef2ff] rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <ShieldCheck className="h-5 w-5 text-[#5b3df5]" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Secure System
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-[#5b3df5] transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>

        </div>

      </div>

      {/* Floating Fingerprint widget at bottom right */}
      <div className="absolute bottom-6 right-6 w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 z-20 group">
        <Fingerprint className="h-6 w-6 text-white group-hover:text-indigo-200 transition-colors" />
      </div>

    </div>
  );
}

