import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  User,
  Lock,
  ShieldCheck,
  BadgeCheck,
  Landmark,
  Smartphone,
  Bell,
  Headset,
  MessageSquare,
  Globe,
  LogOut,
  ChevronRight,
  Settings,
  Upload,
  CheckCircle,
  FileText,
  Eye,
  EyeOff
} from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import api from "@/services/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "User Settings — E2 Solutions" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "support" | "security" | "settings">("personal");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    api.get("/user/profile")
      .then((res) => {
        setProfile(res.data);
        if (res.data.plain_password) {
          setCurrentPassword(res.data.plain_password);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/login" });
  };

  const handleSave = (message: string) => {
    toast.success(message);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    
    setIsChangingPassword(true);
    try {
      const res = await api.put("/user/password", { currentPassword, newPassword });
      toast.success(res.data.message || "Password updated successfully!");
      setCurrentPassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="no-scrollbar">
        <AppHeader title="Profile" subtitle="Manage your account" />
        <div className="flex justify-center p-10 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const referralCode = profile?.user_id || "BMLM-1284";
  const fullName = profile?.full_name || "Aanya Sharma";
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'AS';

  return (
    <div className="no-scrollbar">
      <AppHeader title="Profile" subtitle="Manage your account" />

      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "personal", label: "Personal Info" },
            { id: "kyc", label: "KYC Verification" },
            { id: "support", label: "Support Center" },
            { id: "security", label: "Security" },
            { id: "settings", label: "Settings" },
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
        
        <section className="flex items-center gap-4 rounded-3xl bg-gradient-hero p-5 md:p-8 text-primary-foreground shadow-glow">
          <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-primary-foreground/15 text-2xl md:text-3xl font-extrabold">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg md:text-2xl font-bold">{fullName}</p>
            <p className="text-xs md:text-sm text-primary-foreground/70 mt-0.5">ID: {referralCode} · Premium Plan</p>
            <span className="mt-2 md:mt-3 inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-semibold">
              <BadgeCheck className="h-3 w-3 md:h-4 md:w-4" /> KYC Verified
            </span>
          </div>
        </section>

        {activeTab === "personal" && (
          <div className="md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0">
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
              <h3 className="font-bold text-lg mb-4">Personal Details</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue={fullName} className="w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mobile Number</label>
                  <input type="text" defaultValue={profile?.phone || "+91 98765 43210"} className="w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue={profile?.email || "user@example.com"} className="w-full rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <Button className="w-full mt-2" onClick={() => handleSave("Profile updated successfully!")}>Save Changes</Button>
              </div>
            </section>
            
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft h-fit">
              <h3 className="font-bold text-lg mb-4">Account Information</h3>
              <ul className="divide-y divide-border">
                <li className="flex justify-between py-3">
                  <span className="text-muted-foreground text-sm">User ID</span>
                  <span className="font-bold text-sm">{referralCode}</span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="text-muted-foreground text-sm">Sponsor ID</span>
                  <span className="font-bold text-sm">BMLM-0001</span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="text-muted-foreground text-sm">Joining Date</span>
                  <span className="font-bold text-sm">15 Jan 2026</span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="text-muted-foreground text-sm">Current Plan</span>
                  <span className="font-bold text-sm text-primary">Premium</span>
                </li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === "kyc" && (
          <div className="md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0">
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">KYC Documents</h3>
                <span className="flex items-center gap-1 text-success text-xs font-bold uppercase tracking-wider bg-success/15 px-2 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" /> Approved
                </span>
              </div>
              <div className="space-y-4">
                <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm">Aadhaar Card</p>
                      <p className="text-xs text-success">Verified</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm">PAN Card</p>
                      <p className="text-xs text-success">Verified</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </section>
            
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
              <h3 className="font-bold text-lg mb-4">Bank & UPI Details</h3>
              <div className="space-y-4">
                <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Landmark className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm">State Bank of India</p>
                      <p className="text-xs text-muted-foreground">**** **** 1234</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm">UPI ID</p>
                      <p className="text-xs text-muted-foreground">user@upi</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "support" && (
          <div className="md:grid md:grid-cols-2 gap-4 md:gap-6 space-y-4 md:space-y-0">
            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                <Headset className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need Help?</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">Our support team is available 24/7 to assist you with any platform issues.</p>
              </div>
              <Button className="w-full max-w-xs mt-2"><MessageSquare className="h-4 w-4 mr-2" /> Raise a Ticket</Button>
            </section>

            <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft">
              <h3 className="font-bold text-lg mb-4">Support History</h3>
              <ul className="divide-y divide-border">
                {[
                  { id: "T-1029", issue: "Withdrawal Delay", status: "Resolved", date: "10 Jun 2026" },
                  { id: "T-0984", issue: "KYC Rejected", status: "Closed", date: "01 May 2026" },
                ].map((ticket) => (
                  <li key={ticket.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{ticket.issue}</p>
                      <p className="text-xs text-muted-foreground">ID: {ticket.id} · {ticket.date}</p>
                    </div>
                    <span className={cn(
                      "text-[10px] uppercase font-bold px-2 py-1 rounded-full",
                      ticket.status === "Resolved" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                    )}>
                      {ticket.status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === "security" && (
          <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Password</label>
                <div className="relative">
                  <input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-border bg-accent/50 pl-4 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-2" onClick={handlePasswordChange} disabled={isChangingPassword}>
                {isChangingPassword ? "Updating..." : "Change Password"}
              </Button>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Protect your account with an extra layer of security</p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 rounded text-primary focus:ring-primary border-border" defaultChecked />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="rounded-2xl bg-card p-4 md:p-6 shadow-soft max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-4">Application Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2"><Bell className="h-4 w-4" /> Notification Preferences</h4>
                <div className="flex items-center justify-between bg-accent/30 p-3 rounded-xl border border-border">
                  <span className="text-sm">Email Updates</span>
                  <input type="checkbox" className="h-4 w-4 rounded text-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between bg-accent/30 p-3 rounded-xl border border-border">
                  <span className="text-sm">Push Notifications</span>
                  <input type="checkbox" className="h-4 w-4 rounded text-primary" defaultChecked />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2"><Globe className="h-4 w-4" /> Language Settings</h4>
                <select className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option>English (US)</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div className="pt-6 border-t border-border">
                <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Log Out From All Devices
                </Button>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
