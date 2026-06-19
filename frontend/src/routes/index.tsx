import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const intervalId = setInterval(() => {
      // Only scroll if we have horizontal overflow (mobile)
      if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;

      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

      if (isAtEnd) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by roughly one card width (85vw) + gap
        scrollContainer.scrollBy({ left: window.innerWidth * 0.85 + 16, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative mx-auto w-full min-h-[100dvh] bg-background overflow-x-hidden flex flex-col pb-4 md:pb-12">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Nav */}
      <header className="flex items-center justify-between px-5 py-4 lg:py-6 max-w-6xl mx-auto w-full relative z-10 shrink-0">
        <Logo />
        <Button asChild size="sm" variant="hero" className="rounded-full px-6 md:px-8">
          <Link to="/login">Sign In</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="px-5 text-center max-w-6xl mx-auto w-full flex-1 flex flex-col relative z-10">

        {/* Main Text Content - Centered */}
        <div className="flex-1 flex flex-col justify-center items-center w-full py-8 md:py-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/20 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary shadow-sm">
            <ShieldCheck className="h-4 w-4" /> Institutional-grade Platform
          </span>

          <h1 className="mt-6 md:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-tight tracking-tight text-foreground">
            Build Your Future.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Start Earning Now.</span>
          </h1>

          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A smart platform for investment growth, binary networking, and financial rewards. Secure your
            financial future today with our automated ROI system.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center w-full sm:w-auto">
            <Button asChild variant="hero" className="rounded-full px-8 md:px-12 h-14 md:h-16 text-base md:text-lg shadow-glow w-full sm:w-auto font-bold transition-transform hover:scale-105">
              <Link to="/register">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards replacing the image - Anchored to bottom */}
        <div className="w-full mt-auto md:mt-8 lg:mt-12">
          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 text-left w-[100vw] md:w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pt-2 px-6 md:px-0 -mx-5 md:mx-0 scroll-smooth"
          >
            <div className="w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">Daily Returns</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed">
                Earn consistent daily ROI on your active investment packages with automated payouts directly to your wallet.
              </p>
            </div>

            <div className="w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                <Users className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">Binary Network</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed">
                Build your team and earn lucrative binary matching bonuses from your weaker leg volume every single day.
              </p>
            </div>

            <div className="w-[80vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none bg-card/60 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl shadow-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 whitespace-normal break-words">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                <ShieldCheck className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">Secure System</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3 leading-relaxed">
                Enterprise-grade security architecture protecting your assets and personal data with end-to-end encryption.
              </p>
            </div>

            {/* Spacer to ensure the last card isn't cut off on the right edge on mobile */}
            <div className="w-2 shrink-0 md:hidden"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
