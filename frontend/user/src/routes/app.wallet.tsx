import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowDownLeft, ArrowUpRight, Repeat, Wallet2, Gift, TrendingUp, RefreshCw, Send, CheckCircle, Clock, XCircle } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import api from "@/services/api";

export const Route = createFileRoute("/app/wallet")({
  head: () => ({ meta: [{ title: "Wallet — E2 Solutions" }] }),
  component: WalletPage,
});

function WalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "withdrawals">("overview");
  const [activeWallet, setActiveWallet] = useState("main");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    api.get('/user/dashboard').then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(() => {
      navigate({ to: '/login' });
    });
  }, [navigate]);

  if (loading) return <div className="p-4 text-center">Loading wallet...</div>;

  const wallets = [
    { key: "main", label: "Main Wallet", value: data.wallets.main, icon: Wallet2 },
    { key: "roi", label: "ROI Wallet", value: 0, icon: TrendingUp },
    { key: "binary", label: "Binary Wallet", value: 0, icon: Repeat },
    { key: "referral", label: "Referral Wallet", value: 0, icon: Gift },
  ];

  const current = wallets.find((w) => w.key === activeWallet)!;

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      setWithdrawing(true);
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000));
      toast.success(`Withdrawal request of ${inr(Number(withdrawAmount))} submitted`);
      setWithdrawAmount("");
      setActiveTab("withdrawals");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Withdrawal failed");
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <div className="no-scrollbar">
      <AppHeader title="Wallet" subtitle="Manage funds & withdrawals" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "overview", label: "Balance Overview" },
            { id: "transactions", label: "Transactions" },
            { id: "withdrawals", label: "Withdrawals" },
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
        
        {activeTab === "overview" && (
          <div className="md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0">
            <div className="md:col-span-8 space-y-4 md:space-y-6">
              <section className="rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow">
                <p className="text-xs md:text-sm uppercase tracking-wide text-primary-foreground/70">
                  {current.label}
                </p>
                <p className="mt-1 text-3xl md:text-5xl font-extrabold tracking-tight">{inr(current.value)}</p>
                <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-4 md:w-2/3">
                  <Button
                    variant="secondary"
                    onClick={() => setActiveTab("withdrawals")}
                    className="w-full"
                  >
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 mr-1" /> Withdraw
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toast.success("Transfer feature coming soon")}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 md:h-5 md:w-5 mr-1" /> Transfer
                  </Button>
                </div>
              </section>

              <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {wallets.map((w) => (
                  <button
                    key={w.key}
                    onClick={() => setActiveWallet(w.key)}
                    className={cn(
                      "rounded-2xl p-3 md:p-5 text-left shadow-soft transition-colors",
                      activeWallet === w.key ? "bg-primary text-primary-foreground shadow-glow" : "bg-card hover:bg-accent",
                    )}
                  >
                    <w.icon className="h-4 w-4 md:h-5 md:w-5" />
                    <p className="mt-2 md:mt-3 text-sm md:text-xl font-bold">{inr(w.value)}</p>
                    <p
                      className={cn(
                        "text-[10px] md:text-xs mt-0.5",
                        activeWallet === w.key ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {w.label}
                    </p>
                  </button>
                ))}
              </section>
            </div>

            <div className="md:col-span-4">
              <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full flex flex-col justify-center items-center text-center space-y-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <Send className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">P2P Transfer</h3>
                  <p className="text-sm text-muted-foreground mt-1">Send funds directly to other users instantly.</p>
                </div>
                <Button className="w-full mt-2" variant="outline">Coming Soon</Button>
              </section>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft min-h-[50vh]">
            <p className="mb-4 text-sm md:text-base font-bold text-foreground">Recent Transactions</p>
            <ul className="divide-y divide-border">
              {[].map((tx) => (
                <li key={tx.id} className="flex items-center gap-3 py-3 md:py-4">
                  <div className={cn(
                    "grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl",
                    tx.status === "success" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  )}>
                    {tx.status === "success" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm md:text-base truncate">{tx.title}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className={cn("font-bold text-sm md:text-base whitespace-nowrap", `text-${tx.status}`)}>
                    {tx.amount}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === "withdrawals" && (
          <div className="md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0">
            <div className="md:col-span-5 space-y-4 md:space-y-6">
              <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft border border-border">
                <h3 className="font-bold text-lg mb-4">Request Withdrawal</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">From Wallet</label>
                    <select 
                      className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                      value={activeWallet}
                      onChange={(e) => setActiveWallet(e.target.value)}
                    >
                      {wallets.map(w => <option key={w.key} value={w.key}>{w.label} ({inr(w.value)})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Amount (INR)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5000" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Min: {inr(500)}</span>
                      <span className="text-xs text-muted-foreground">Fee: 5%</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full py-6 font-bold" 
                    onClick={handleWithdraw}
                    disabled={withdrawing || current.value <= 0}
                  >
                    {withdrawing ? "Processing..." : "Submit Request"}
                  </Button>
                </div>
              </section>
            </div>
            <div className="md:col-span-7 space-y-4 md:space-y-6">
              <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full">
                <h3 className="font-bold text-lg mb-4">Withdrawal History</h3>
                <ul className="divide-y divide-border">
                  {[].map((w) => (
                    <li key={w.id} className="py-3 md:py-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">{w.date}</span>
                        <span className={cn("flex items-center gap-1 text-xs font-bold uppercase", w.color)}>
                          <w.icon className="h-3 w-3" /> {w.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Requested: {inr(w.amount)}</span>
                        <span className="font-bold text-foreground">Net: {inr(w.net)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
