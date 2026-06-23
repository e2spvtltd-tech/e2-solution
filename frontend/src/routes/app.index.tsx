import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  TrendingUp,
  Users,
  Wallet2,
  Repeat,
  Plus,
} from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { StatCard } from "@/components/app/StatCard";
import { inr, growthSeries } from "@/lib/mock-data";
import api from "@/services/api";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard - e2solution.in" }] }),
  component: Dashboard,
});

const kindIcon: Record<string, any> = {
  binary: Repeat,
  roi: TrendingUp,
  withdrawal: ArrowUpRight,
  referral: Gift,
  deposit: Plus,
  payout: Wallet2,
  kyc: Users,
};

const GrowthChart = memo(function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={growthSeries} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#g)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const res = await api.get('/user/dashboard');
        return res.data;
      } catch (err: any) {
        // Only clear token and redirect on 401 (unauthorized) or 404 (user deleted)
        // Don't clear on network errors or other failures
        if (err.response?.status === 401 || err.response?.status === 404) {
          localStorage.removeItem('token');
          navigate({ to: '/login' });
        }
        throw err;
      }
    },
    refetchInterval: 30000, // Poll every 30 seconds (was 1s — caused mobile lag)
    staleTime: 10000, // Keep data fresh for 10 seconds
    retry: 2, // Retry failed requests twice before giving up
  });

  const handleRenew = async () => {
    if (!window.confirm("Renewing your plan will deduct your original investment amount from your main wallet to extend your daily ROI for another 100 days. Do you want to proceed?")) return;
    try {
      const res = await api.post('/investments/renew');
      alert(res.data.message);
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to renew plan. Please ensure you have sufficient balance in your Main Wallet.");
    }
  };

  if (loading || !data) return <div className="p-4 text-center">Loading dashboard...</div>;

  return (
    <div className="no-scrollbar">
      <AppHeader />

      <div className="space-y-4 px-4 pt-8 pb-20 md:space-y-6 md:p-8 md:pt-12 md:pb-24 mx-auto max-w-7xl">
        {/* Portfolio hero */}
        <section className="overflow-hidden rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow">
          <div className="flex items-center justify-between">
            <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-primary-foreground/70">
              Total Portfolio Value
            </p>
            <div className="flex gap-2">
              <button onClick={handleRenew} className="rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors px-3 py-0.5 text-[11px] md:text-xs font-semibold cursor-pointer">
                Renew Plan
              </button>
              <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] md:text-xs font-semibold">
                0%
              </span>
            </div>
          </div>
          <p className="mt-1 text-3xl md:text-5xl font-extrabold tracking-tight">{inr(Number(data.totalEarnings || 0) + Number(data.walletBalance || 0))}</p>
          <div className="mt-4 md:mt-6 flex items-center justify-between rounded-2xl bg-primary-foreground/10 px-4 md:px-6 py-2.5 md:py-4 text-sm md:text-base mb-2">
            <span className="text-primary-foreground/80">Days Left</span>
            <span className="font-bold">{data.daysLeft || 0} Days</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-primary-foreground/10 px-4 md:px-6 py-2.5 md:py-4 text-sm md:text-base">
            <span className="text-primary-foreground/80">Pending Volume</span>
            <span className="font-bold">{inr(0)}</span>
          </div>
        </section>

        <div className="md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0">
          <div className="md:col-span-12 space-y-4 md:space-y-6">
            {/* Stat grid */}
            <section className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3">
              <StatCard icon={TrendingUp} label="Total Earnings" value={inr(data.totalEarnings || 0)} delta="0%" tone="primary" />
              <StatCard icon={Wallet2} label="Wallet Balance" value={inr(data.walletBalance || 0)} tone="default" />
              <StatCard icon={Gift} label="Today's Earnings" value={inr(data.todayEarning || 0)} tone="success" />
              <StatCard icon={Repeat} label="Binary Income" value={inr(data.binaryIncome || 0)} tone="success" />
              <StatCard icon={Users} label="Total Team" value={(data.teamMembers || 0).toString()} tone="warning" />
              <StatCard icon={ArrowUpRight} label="Total Investment" value={inr(data.totalInvestment || 0)} tone="default" />
            </section>
          </div>



          <div className="md:col-span-12 space-y-4 md:space-y-6 mt-4 md:mt-0">
            {/* Growth analytics */}
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
              <div className="mb-2 md:mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm md:text-base font-bold text-foreground">Growth Analytics</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Monthly ROI Performance</p>
                </div>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] md:text-xs font-semibold text-success">
                  0%
                </span>
              </div>
              <GrowthChart />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
