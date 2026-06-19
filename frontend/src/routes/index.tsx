import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home Page - e2solution.in" },
      {
        name: "description",
        content:
          "Institutional-grade binary network investment platform. Earn daily ROI, binary income and referral commissions.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative mx-auto w-full h-screen bg-background text-foreground overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 font-sans">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[250px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Grouping all contents in a compact flex container */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-5 md:gap-7 relative z-10">
        
        {/* Nav */}
        <header className="flex items-center justify-center w-full shrink-0">
          <Logo layout="vertical" size="xl" />
        </header>

        {/* Hero Section */}
        <section className="px-2 text-center w-full flex flex-col items-center gap-3">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/20 px-3 py-1 text-xs font-semibold text-primary shadow-sm select-none">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Institutional-grade Platform
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.15] tracking-tight text-foreground">
            Build Your Future.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Start Earning Now.</span>
          </h1>

          {/* Action Button */}
          <div className="mt-2 flex justify-center w-full">
            <Button asChild variant="hero" className="rounded-full px-10 h-11 md:h-14 text-sm md:text-base shadow-glow w-fit font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center">
              <Link to="/login">
                Sign In <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Feature Cards - Compact vertical stack on mobile, horizontal grid on desktop */}
        <div className="w-full shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-4 text-left w-full">
            
            {/* Card 1 */}
            <div className="bg-card/70 backdrop-blur-xl p-3 md:p-5 rounded-xl md:rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_8px_25px_rgba(91,61,245,0.05)] hover:shadow-[0_12px_30px_rgba(91,61,245,0.1)] flex flex-row md:flex-col items-center md:items-start text-left gap-3.5 group">
              <div className="h-9 w-9 md:h-11 md:w-11 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <TrendingUp className="h-5 w-5 md:h-5.5 md:w-5.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs md:text-base font-bold text-foreground">Daily Returns</h3>
                <p className="hidden md:block text-xs text-muted-foreground mt-1 leading-normal">
                  Earn consistent daily ROI on active packages with automated payouts to your wallet.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-card/70 backdrop-blur-xl p-3 md:p-5 rounded-xl md:rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_8px_25px_rgba(91,61,245,0.05)] hover:shadow-[0_12px_30px_rgba(91,61,245,0.1)] flex flex-row md:flex-col items-center md:items-start text-left gap-3.5 group">
              <div className="h-9 w-9 md:h-11 md:w-11 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Users className="h-5 w-5 md:h-5.5 md:w-5.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs md:text-base font-bold text-foreground">Binary Network</h3>
                <p className="hidden md:block text-xs text-muted-foreground mt-1 leading-normal">
                  Build your team and earn lucrative binary matching bonuses from weaker leg volume.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-card/70 backdrop-blur-xl p-3 md:p-5 rounded-xl md:rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_8px_25px_rgba(91,61,245,0.05)] hover:shadow-[0_12px_30px_rgba(91,61,245,0.1)] flex flex-row md:flex-col items-center md:items-start text-left gap-3.5 group">
              <div className="h-9 w-9 md:h-11 md:w-11 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-5 w-5 md:h-5.5 md:w-5.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs md:text-base font-bold text-foreground">Secure System</h3>
                <p className="hidden md:block text-xs text-muted-foreground mt-1 leading-normal">
                  Enterprise-grade security protecting your assets with end-to-end encryption.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
