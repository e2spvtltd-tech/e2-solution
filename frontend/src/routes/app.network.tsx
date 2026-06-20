import { createFileRoute } from "@tanstack/react-router";
import { memo, useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Search, Users, UserPlus, ArrowLeft, ArrowRight, GitMerge, Link as LinkIcon, Copy, QrCode, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { teamGrowthSeries, inr } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { toastWithSound as toast } from "@/lib/toast-with-sound";

export const Route = createFileRoute("/app/network")({
  head: () => ({ meta: [{ title: "Network - e2solution.in" }] }),
  component: NetworkPage,
});



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

interface TreeNodeCardProps {
  node: any;
  isRoot?: boolean;
  side?: "Left" | "Right" | null;
  parentNode?: any;
  onEmptyClick?: (parentId: string, side: "Left" | "Right") => void;
  isOpening?: boolean;
}

const TreeNodeCard = ({ node, isRoot = false, side = null, parentNode = null, onEmptyClick, isOpening = false }: TreeNodeCardProps) => {
  if (!node || Object.keys(node).length === 0) {
    const handleEmptyClick = () => {
      if (isOpening) return;
      if (onEmptyClick && parentNode && side) {
        onEmptyClick(parentNode.id, side);
      }
    };
    return (
       <button 
         onClick={handleEmptyClick}
         type="button"
         disabled={isOpening}
         className={cn(
           "flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-border w-[120px] bg-accent/30 text-muted-foreground h-[140px] hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-primary active:scale-95 active:bg-accent/70 duration-150",
           isOpening && "border-primary/60 bg-primary/5 text-primary scale-95"
         )}
       >
         {isOpening ? (
           <>
             <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
             <span className="text-[10px] font-bold uppercase tracking-wider animate-pulse">Opening...</span>
           </>
         ) : (
           <>
             <span className="text-[20px] font-semibold text-muted-foreground/40 mb-1">+</span>
             <span className="text-[10px] font-semibold uppercase tracking-wider">Empty</span>
           </>
         )}
       </button>
    );
  }
  
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
      <p className="text-[11px] font-bold text-success mt-1">Vol: ₹{(node.volume || 0).toLocaleString()}</p>
      
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

const renderTree = (
  node: any, 
  isRoot = true, 
  side: "Left" | "Right" | null = null, 
  level = 0, 
  parentNode: any = null,
  onEmptyClick?: (parentId: string, side: "Left" | "Right") => void,
  clickedSlot?: { parentId: string, side: "Left" | "Right" } | null
) => {
  const isOpening = !!(clickedSlot && clickedSlot.parentId === parentNode?.id && clickedSlot.side === side);
  
  return (
    <li key={node?.id || Math.random()}>
      <div>
        <TreeNodeCard 
          node={node} 
          isRoot={isRoot} 
          side={side} 
          parentNode={parentNode} 
          onEmptyClick={onEmptyClick}
          isOpening={isOpening}
        />
      </div>
      {node && (
        <ul>
          {renderTree(node.left, false, "Left", level + 1, node, onEmptyClick, clickedSlot)}
          {renderTree(node.right, false, "Right", level + 1, node, onEmptyClick, clickedSlot)}
        </ul>
      )}
    </li>
  );
};

function NetworkPage() {
  const [activeTab, setActiveTab] = useState<"tree" | "team">("team");
  const [treeData, setTreeData] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [placementModal, setPlacementModal] = useState({ open: false, userId: null, originalSponsor: '' });
  const [parentInput, setParentInput] = useState('');
  const [placementSide, setPlacementSide] = useState<'Left Side' | 'Right Side'>('Left Side');

  const [regModal, setRegModal] = useState({
    open: false,
    parentId: '',
    placement: 'Left Side' as 'Left Side' | 'Right Side',
  });
  const [regForm, setRegForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    investingAmount: '',
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [clickedSlot, setClickedSlot] = useState<{ parentId: string, side: "Left" | "Right" } | null>(null);

  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleResetZoom = () => setZoom(1);

  const handleEmptyNodeClick = (parentId: string, side: "Left" | "Right") => {
    setClickedSlot({ parentId, side });
    setTimeout(() => {
      setRegModal({
        open: true,
        parentId: parentId,
        placement: side === "Left" ? "Left Side" : "Right Side",
      });
      setRegForm({
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        investingAmount: '',
      });
      setClickedSlot(null);
    }, 450);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.mobile || !regForm.email || !regForm.password || !regForm.investingAmount) {
      toast.error("Please fill in all fields.");
      return;
    }
    setRegSubmitting(true);
    try {
      await api.post('/auth/register', {
        fullName: regForm.fullName,
        mobile: regForm.mobile,
        email: regForm.email,
        password: regForm.password,
        sponsorId: regModal.parentId,
        parentId: regModal.parentId,
        placement: regModal.placement,
        investingAmount: regForm.investingAmount
      });

      toast.success("User registered and placed successfully!");
      setRegModal(prev => ({ ...prev, open: false }));
      
      setLoading(true);
      const [treeRes, refRes] = await Promise.all([
        api.get('/user/network'),
        api.get('/user/referrals')
      ]);
      setTreeData(treeRes.data);
      setReferrals(refRes.data);
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register user");
    } finally {
      setRegSubmitting(false);
    }
  };

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

  const handleUserPlacement = async () => {
    try {
      await api.put(`/user/referrals/${placementModal.userId}/placement`, {
        placement: placementSide,
        parentId: parentInput
      });
      toast.success("Referral placed successfully!");
      setPlacementModal({ open: false, userId: null, originalSponsor: '' });
      setLoading(true);
      const [treeRes, refRes] = await Promise.all([
        api.get('/user/network'),
        api.get('/user/referrals')
      ]);
      setTreeData(treeRes.data);
      setReferrals(refRes.data);
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to place referral");
    }
  };

  const statusTone: Record<string, string> = {
    active: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    inactive: "bg-muted text-muted-foreground",
  };

  const getSubtreeStats = (node: any) => {
    if (!node) return { count: 0, volume: 0 };
    let count = 1;
    let volume = parseFloat(node.volume || 0);
    if (node.left) {
      const leftStats = getSubtreeStats(node.left);
      count += leftStats.count;
      volume += leftStats.volume;
    }
    if (node.right) {
      const rightStats = getSubtreeStats(node.right);
      count += rightStats.count;
      volume += rightStats.volume;
    }
    return { count, volume };
  };

  const leftStats = treeData?.left ? getSubtreeStats(treeData.left) : { count: 0, volume: 0 };
  const rightStats = treeData?.right ? getSubtreeStats(treeData.right) : { count: 0, volume: 0 };
  const totalTeam = leftStats.count + rightStats.count;
  const directReferrals = referrals.length;
  const matchingVolume = Math.min(leftStats.volume, rightStats.volume);

  const stats = [
    { icon: Users, label: "Total Team", value: totalTeam.toString(), tone: "primary" },
    { icon: UserPlus, label: "Direct Referrals", value: directReferrals.toString(), tone: "accent" },
    { icon: ArrowLeft, label: "Left Team", value: `${leftStats.count} (₹${leftStats.volume.toLocaleString()})`, tone: "accent" },
    { icon: ArrowRight, label: "Right Team", value: `${rightStats.count} (₹${rightStats.volume.toLocaleString()})`, tone: "accent" },
  ] as const;

  return (
    <div className="no-scrollbar">
      <AppHeader title="Network" subtitle="Manage your binary structure and team" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "tree", label: "Binary Tree" },
            { id: "team", label: "Team" },
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
              <div className="md:col-span-12 space-y-4 md:space-y-6">
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
                  <div className="rounded-2xl p-4 md:p-5 shadow-soft bg-card col-span-2 md:col-span-4 flex items-center justify-between border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <GitMerge className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Matching Vol (Weaker Leg)</p>
                        <p className="text-xl font-bold text-foreground">₹{matchingVolume.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/15 px-3 py-1 rounded-full">Active Pairing</span>
                  </div>
                </section>

                <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
                  <div className="mb-2 md:mb-4 flex items-center justify-between">
                    <p className="text-sm md:text-base font-bold text-foreground">Team Growth</p>
                    <span className="text-xs md:text-sm text-muted-foreground">Last 7 days</span>
                  </div>
                  <TeamChart />
                </section>
              </div>

            </div>
          </>
        )}

        {activeTab === "tree" && (
          <div className="flex flex-col items-center justify-center py-6 md:py-8 text-center space-y-6">
            <OrgTreeStyles />
            <h2 className="text-2xl font-bold">Interactive Binary Tree</h2>
            
            <div className="w-full max-w-5xl rounded-3xl bg-card py-4 md:py-8 shadow-soft border border-border overflow-x-auto no-scrollbar relative" style={{ WebkitOverflowScrolling: 'touch', minHeight: '600px' }}>
              
              <div className="sticky left-0 w-full flex justify-center mb-6 z-50 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto bg-card p-1.5 rounded-xl border border-border shadow-sm">
                  <button onClick={handleZoomOut} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" title="Zoom Out">
                    <ZoomOut size={18} />
                  </button>
                  <button onClick={handleResetZoom} className="px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center" title="Reset Zoom">
                    <span className="text-xs font-bold leading-none">{Math.round(zoom * 100)}%</span>
                  </button>
                  <button onClick={handleZoomIn} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" title="Zoom In">
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>

              <div style={{ width: 'max-content', minWidth: '100%', margin: '0 auto', padding: '0 20px', paddingBottom: '120px', zoom: zoom } as React.CSSProperties}>
                <div className="org-tree">
                  <ul>
                    {loading ? <div>Loading tree...</div> : renderTree(treeData, true, null, 0, null, handleEmptyNodeClick, clickedSlot)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>

      {placementModal.open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-foreground">Place Referral</h3>
            <p className="text-xs text-muted-foreground">Select the parent user and side of the tree this user should be placed on.</p>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">Parent ID</label>
              <input 
                type="text" 
                placeholder="e.g. E2S-1000" 
                value={parentInput} 
                onChange={(e) => setParentInput(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">Select Side</label>
              <select 
                value={placementSide} 
                onChange={(e) => setPlacementSide(e.target.value as any)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="Left Side">Left Side</option>
                <option value="Right Side">Right Side</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => setPlacementModal({ open: false, userId: null, originalSponsor: '' })}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleUserPlacement}>
                Save Placement
              </Button>
            </div>
          </div>
        </div>
      )}

      {regModal.open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-soft space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="text-lg font-bold text-foreground">Add New Member</h3>
            <p className="text-xs text-muted-foreground">Register and place a new member directly in this slot.</p>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter full name" 
                  value={regForm.fullName} 
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Enter mobile number" 
                  value={regForm.mobile} 
                  onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter email address" 
                  value={regForm.email} 
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="Enter password" 
                  value={regForm.password} 
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Investing Amount</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  placeholder="Enter investing amount" 
                  value={regForm.investingAmount} 
                  onChange={(e) => setRegForm({ ...regForm, investingAmount: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">Sponsor ID</label>
                  <input 
                    type="text" 
                    readOnly
                    value={regModal.parentId} 
                    className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground outline-none cursor-not-allowed opacity-80"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">Placement</label>
                  <input 
                    type="text" 
                    readOnly
                    value={regModal.placement} 
                    className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground outline-none cursor-not-allowed opacity-80"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2 justify-end">
                <Button type="button" size="sm" variant="outline" onClick={() => setRegModal(prev => ({ ...prev, open: false }))} disabled={regSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={regSubmitting}>
                  {regSubmitting ? "Registering..." : "Add Member"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
