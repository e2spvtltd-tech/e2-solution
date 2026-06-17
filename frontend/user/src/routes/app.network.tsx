import { createFileRoute } from "@tanstack/react-router";
import { memo, useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Search, Users, UserPlus, ArrowLeft, ArrowRight, GitMerge, Link as LinkIcon, Copy, QrCode } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { compact, teamGrowthSeries, topPerformers, inr } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

export const Route = createFileRoute("/app/network")({
  head: () => ({ meta: [{ title: "Network — E2 Solutions" }] }),
  component: NetworkPage,
});

const stats = [
  { icon: Users, label: "Total Team", value: "0", tone: "primary" },
  { icon: UserPlus, label: "Direct Referrals", value: "0", tone: "accent" },
  { icon: ArrowLeft, label: "Left Team", value: "0", tone: "accent" },
  { icon: ArrowRight, label: "Right Team", value: "0", tone: "accent" },
] as const;

const TeamChart = memo(function TeamChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={teamGrowthSeries} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
        <XAxis
          dataKey="d"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
        />
        <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="var(--primary)" />
      </BarChart>
    </ResponsiveContainer>
  );
});

const OrgTreeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    .org-tree ul {
      padding-top: 24px; 
      position: relative;
      display: flex;
      justify-content: center;
      padding-left: 0;
      margin: 0;
    }
    .org-tree li {
      text-align: center;
      list-style-type: none;
      position: relative;
      padding: 24px 12px 0 12px;
    }
    .org-tree li::before, .org-tree li::after {
      content: '';
      position: absolute; top: 0; right: 50%;
      border-top: 2px solid #cbd5e1;
      width: 50%; height: 24px;
    }
    .org-tree li::after {
      right: auto; left: 50%;
      border-left: 2px solid #cbd5e1;
    }
    .org-tree li:only-child::after, .org-tree li:only-child::before {
      display: none;
    }
    .org-tree li:only-child { padding-top: 0;}
    .org-tree li:first-child::before, .org-tree li:last-child::after {
      border: 0 none;
    }
    .org-tree li:last-child::before {
      border-right: 2px solid #cbd5e1;
      border-radius: 0 6px 0 0;
    }
    .org-tree li:first-child::after {
      border-radius: 6px 0 0 0;
    }
    .org-tree ul ul::before {
      content: '';
      position: absolute; top: 0; left: 50%;
      border-left: 2px solid #cbd5e1;
      width: 0; height: 24px;
      margin-left: -1px;
    }
    .org-tree li > div {
      display: inline-block;
    }
  `}} />
);

const TreeNodeCard = ({ node, isRoot = false, side = null }: { node: any, isRoot?: boolean, side?: "Left" | "Right" | null }) => {
  if (!node || Object.keys(node).length === 0) return (
     <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-border w-[120px] bg-accent/30 text-muted-foreground h-[140px]">
       <span className="text-[20px] font-semibold text-muted-foreground/40 mb-1">+</span>
       <span className="text-[10px] font-semibold uppercase tracking-wider">Empty</span>
     </div>
  );
  
  const initial = node.name ? node.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() : 'U';

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-4 rounded-2xl border shadow-soft w-[140px] transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer relative z-10",
      isRoot ? "bg-primary/10 border-primary/20" : "bg-card border-border"
    )}>
      <div className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center text-primary-foreground font-bold mb-2 shadow-sm",
        "bg-primary"
      )}>
        {initial}
      </div>
      <p className="font-bold text-sm truncate w-full text-center text-foreground">{isRoot ? "You" : node.name}</p>
      <p className="text-[10px] font-medium text-muted-foreground uppercase mt-0.5 bg-accent/50 px-2 py-0.5 rounded-md">ID: {node.id}</p>
      
      {!isRoot && side && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn("h-2 w-2 rounded-full", side === "Left" ? "bg-success" : "bg-primary")}></span>
          <span className="text-[10px] font-semibold text-muted-foreground">{side}</span>
        </div>
      )}
      {isRoot && (
        <div className="mt-2 text-[10px] font-bold text-primary-foreground bg-primary px-3 py-0.5 rounded-full uppercase tracking-wider">
          You
        </div>
      )}
    </div>
  );
};

const renderTree = (node: any, isRoot = true, side: "Left" | "Right" | null = null, level = 0) => {
  if (!node && level > 2) return null; // limit mock depth
  
  return (
    <li key={node?.id || Math.random()}>
      <div><TreeNodeCard node={node} isRoot={isRoot} side={side} /></div>
      {node && (node.left || node.right || level < 2) && (
        <ul>
          {renderTree(node.left, false, "Left", level + 1)}
          {renderTree(node.right, false, "Right", level + 1)}
        </ul>
      )}
    </li>
  );
};

function NetworkPage() {
  const [activeTab, setActiveTab] = useState<"tree" | "team" | "referrals">("team");
  const [treeData, setTreeData] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/user/network'),
      api.get('/user/referrals')
    ]).then(([treeRes, refRes]) => {
      setTreeData(treeRes.data);
      setReferrals(refRes.data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const statusTone: Record<string, string> = {
    active: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    inactive: "bg-muted text-muted-foreground",
  };

  return (
    <div className="no-scrollbar">
      <AppHeader title="Network" subtitle="Manage your binary structure and team" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "tree", label: "Binary Tree" },
            { id: "team", label: "Team" },
            { id: "referrals", label: "Referrals" },
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
        
        {activeTab === "team" && (
          <>
            <div className="md:flex md:gap-4 md:items-center space-y-4 md:space-y-0">
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-card px-3.5 py-1 md:py-2 shadow-soft">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                <input
                  placeholder="Search team members by name or ID"
                  className="h-11 md:h-12 flex-1 bg-transparent text-sm md:text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0 mt-4 md:mt-6">
              <div className="md:col-span-8 space-y-4 md:space-y-6">
                <section className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className={cn(
                        "rounded-2xl p-4 md:p-5 shadow-soft",
                        s.tone === "primary"
                          ? "bg-gradient-hero text-primary-foreground"
                          : "bg-card",
                      )}
                    >
                      <s.icon
                        className={cn(
                          "h-5 w-5 md:h-6 md:w-6",
                          s.tone === "primary" ? "text-primary-foreground/80" : "text-primary",
                        )}
                      />
                      <p className="mt-2 md:mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">{s.value}</p>
                      <p
                        className={cn(
                          "text-xs md:text-sm font-medium",
                          s.tone === "primary" ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </section>

                <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
                  <div className="mb-2 md:mb-4 flex items-center justify-between">
                    <p className="text-sm md:text-base font-bold text-foreground">Team Growth</p>
                    <span className="text-xs md:text-sm text-muted-foreground">Last 7 days</span>
                  </div>
                  <TeamChart />
                </section>
              </div>

              <div className="md:col-span-4">
                <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full">
                  <p className="mb-1 md:mb-4 text-sm md:text-base font-bold text-foreground">Top Performers</p>
                  <ul className="divide-y divide-border">
                    {topPerformers.map((m) => (
                      <li key={m.id} className="flex items-center gap-3 py-3 md:py-4">
                        <span className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-gradient-primary text-sm md:text-base font-bold text-primary-foreground">
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm md:text-base font-semibold text-foreground">{m.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Volume {inr(m.volume)} · {compact(m.team)} team
                          </p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[11px] md:text-xs font-semibold capitalize",
                            statusTone[m.status],
                          )}
                        >
                          {m.side}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </>
        )}

        {activeTab === "tree" && (
          <div className="flex flex-col items-center justify-center py-6 md:py-8 text-center space-y-6">
            <OrgTreeStyles />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Interactive Binary Tree</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Explore your left and right network structures visually. Expand nodes and view matching volume easily.
              </p>
            </div>
            <div className="w-full max-w-5xl rounded-3xl bg-card py-4 md:py-8 shadow-soft border border-border overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div style={{ width: 'max-content', margin: '0 auto', padding: '0 20px' }}>
                <div className="org-tree">
                  <ul>
                    {loading ? <div>Loading tree...</div> : renderTree(treeData, true)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "referrals" && (
          <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Your Referral Link</h2>
                <p className="text-primary-foreground/80 mt-1">Share this link to invite new members to your network.</p>
                <div className="mt-4 flex items-center gap-2 bg-background/20 p-2 pl-4 rounded-xl backdrop-blur-sm border border-primary-foreground/20">
                  <span className="text-sm font-medium truncate flex-1">https://e2solutions.com/ref/USER8829</span>
                  <Button size="sm" variant="secondary" className="font-bold shrink-0">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </div>
              <div className="shrink-0 flex justify-center">
                <div className="bg-white p-3 rounded-2xl shadow-soft">
                  <QrCode className="h-24 w-24 text-primary" />
                </div>
              </div>
            </section>
            
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft h-full">
              <p className="mb-4 text-sm md:text-base font-bold text-foreground">Direct Referrals ({referrals.length})</p>
              <ul className="divide-y divide-border">
                {loading ? <div className="py-4">Loading referrals...</div> : referrals.length === 0 ? <div className="py-4 text-muted-foreground">No referrals yet.</div> : referrals.map((r: any) => (
                  <li key={r.id} className="flex items-center gap-3 py-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                      {r.name.substring(0,2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">Joined: {r.joined}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">+ {inr(r.volume || 0)}</p>
                      <p className={cn("text-xs font-semibold capitalize", statusTone[r.status] || "text-muted-foreground")}>{r.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
