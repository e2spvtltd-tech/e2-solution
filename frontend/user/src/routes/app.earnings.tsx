import { createFileRoute } from "@tanstack/react-router";
import { useState, memo } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { cn } from "@/lib/utils";
import { inr, growthSeries } from "@/lib/mock-data";
import { StatCard } from "@/components/app/StatCard";
import { TrendingUp, Calendar, CalendarDays, Wallet2 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/app/earnings")({
  head: () => ({ meta: [{ title: "Earnings — E2 Solutions" }] }),
  component: EarningsPage,
});

const GrowthChart = memo(function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={growthSeries} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="g-earnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="m"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
        />
        <Tooltip
          cursor={{ stroke: "var(--primary)", strokeWidth: 1 }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid var(--border)",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#g-earnings)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

function EarningsPage() {
  const [activeTab, setActiveTab] = useState<"roi" | "binary" | "referral">("roi");

  const renderKPIs = (multiplier: number) => (
    <section className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4 mt-6">
      <StatCard icon={TrendingUp} label="Today's Earnings" value={inr(1200 * multiplier)} tone="success" />
      <StatCard icon={CalendarDays} label="Weekly Earnings" value={inr(8400 * multiplier)} tone="primary" />
      <StatCard icon={Calendar} label="Monthly Earnings" value={inr(36000 * multiplier)} tone="warning" />
      <StatCard icon={Wallet2} label="Total Earnings" value={inr(145000 * multiplier)} tone="default" />
    </section>
  );

  return (
    <div className="no-scrollbar">
      <AppHeader title="Earnings" subtitle="Track your income growth" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "roi", label: "ROI Income" },
            { id: "binary", label: "Binary Income" },
            { id: "referral", label: "Referral Income" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 pt-4 pb-20 md:space-y-6 md:p-8 md:pb-24 mx-auto max-w-7xl">
        
        {activeTab === "roi" && (
          <div>
            <div className="rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground">
              Daily passive income generated from your active investment plans.
            </div>
            {renderKPIs(1)}
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6">
              <div className="mb-2 md:mb-4 flex items-center justify-between">
                <p className="text-sm md:text-base font-bold text-foreground">ROI Analytics</p>
                <span className="text-xs md:text-sm text-muted-foreground">Monthly Growth</span>
              </div>
              <GrowthChart />
            </section>
          </div>
        )}

        {activeTab === "binary" && (
          <div>
            <div className="rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground">
              Matching bonus earned from your left and right team volume pairing.
            </div>
            {renderKPIs(1.5)}
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6">
              <div className="mb-2 md:mb-4 flex items-center justify-between">
                <p className="text-sm md:text-base font-bold text-foreground">Binary Analytics</p>
                <span className="text-xs md:text-sm text-muted-foreground">Monthly Growth</span>
              </div>
              <GrowthChart />
            </section>
          </div>
        )}

        {activeTab === "referral" && (
          <div>
            <div className="rounded-2xl bg-accent p-4 text-sm md:text-base text-accent-foreground">
              Direct commission earned from the investments of members you invite.
            </div>
            {renderKPIs(0.8)}
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft mt-6">
              <div className="mb-2 md:mb-4 flex items-center justify-between">
                <p className="text-sm md:text-base font-bold text-foreground">Referral Analytics</p>
                <span className="text-xs md:text-sm text-muted-foreground">Monthly Growth</span>
              </div>
              <GrowthChart />
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
