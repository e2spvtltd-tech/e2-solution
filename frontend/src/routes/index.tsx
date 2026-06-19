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
    <div className="relative mx-auto w-full min-h-screen md:h-screen bg-background text-foreground overflow-hidden flex flex-col justify-between p-6 md:p-8 lg:p-10 font-sans">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Nav - Placed somewhat down using padding-top */}
      <header className="flex items-center justify-center pt-8 md:pt-14 relative z-10 shrink-0">
        <Logo layout="vertical" size="xl" />
      </header>

      {/* Hero Section - Space is loosened slightly */}
      <section className="px-4 text-center max-w-3xl mx-auto w-full relative z-10 mt-4 md:mt-6 flex flex-col items-center">
        
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm select-none">
          <ShieldCheck className="h-4 w-4 text-primary" /> Institutional-grade Platform
        </span>

        {/* Heading */}
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.15] tracking-tight text-foreground">
          Build Your Future.
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Start Earning Now.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          An invitation-only, institutional-grade binary network investment platform. Contact your sponsor to get registered directly inside the binary tree and start earning daily returns.
        </p>

        {/* Action Button */}
        <div className="mt-6 flex justify-center w-full">
          <Button asChild variant="hero" className="rounded-full px-12 h-12 md:h-14 text-sm md:text-base shadow-glow w-fit font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center">
            <Link to="/login">
              Sign In <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards - Statically aligned close to the CTA with a clean gap */}
      <div className="w-full mt-8 md:mt-12 shrink-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left w-full max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="bg-card/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_15px_35px_rgba(91,61,245,0.12)] hover:-translate-y-0.5 flex items-start gap-4 group">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-5.5 w-5.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-foreground">Daily Returns</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Earn consistent daily ROI on active packages with automated payouts to your wallet.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-card/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_15px_35px_rgba(91,61,245,0.12)] hover:-translate-y-0.5 flex items-start gap-4 group">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Users className="h-5.5 w-5.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-foreground">Binary Network</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Build your team and earn lucrative binary matching bonuses from weaker leg volume.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-card/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300 shadow-[0_10px_30px_rgba(91,61,245,0.06)] hover:shadow-[0_15px_35px_rgba(91,61,245,0.12)] hover:-translate-y-0.5 flex items-start gap-4 group">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="h-5.5 w-5.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-foreground">Secure System</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Enterprise-grade security protecting your assets with end-to-end encryption.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
