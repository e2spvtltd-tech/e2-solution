// Centralized formatting + mock data for the E2 Solutions frontend.
// Backend (Lovable Cloud) wiring replaces these in a later phase.

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const usd = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const compact = (n: number) =>
  Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export type Pkg = {
  id: string;
  name: string;
  price: number;
  dailyRoi: string;
  binaryBonus: string;
  referral: string;
  duration: string;
  ceiling: string;
  popular?: boolean;
  tier: "starter" | "growth" | "premium" | "advanced" | "elite";
};

export const packages: Pkg[] = [
  {
    id: "starter",
    name: "Starter",
    price: 20000,
    dailyRoi: "1% Daily ROI",
    binaryBonus: "8% Binary Bonus",
    referral: "5% Referral Commission",
    duration: "120 Days Duration",
    ceiling: "2x Income Ceiling",
    tier: "starter",
  },
  {
    id: "growth",
    name: "Growth",
    price: 30000,
    dailyRoi: "1.2% Daily ROI",
    binaryBonus: "9% Binary Bonus",
    referral: "6% Referral Commission",
    duration: "120 Days Duration",
    ceiling: "2.5x Income Ceiling",
    tier: "growth",
  },
  {
    id: "premium",
    name: "Premium",
    price: 50000,
    dailyRoi: "1.5% Daily ROI",
    binaryBonus: "10% Binary Bonus",
    referral: "8% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "3x Income Ceiling",
    popular: true,
    tier: "premium",
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 70000,
    dailyRoi: "2% Daily ROI",
    binaryBonus: "11% Binary Bonus",
    referral: "9% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "4x Income Ceiling",
    tier: "advanced",
  },
  {
    id: "elite",
    name: "Elite",
    price: 100000,
    dailyRoi: "2.5% Daily ROI",
    binaryBonus: "12% Binary Bonus",
    referral: "10% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "Unlimited Ceiling",
    tier: "elite",
  },
];

export const growthSeries = [
  { m: "Jan", v: 0 },
  { m: "Feb", v: 0 },
  { m: "Mar", v: 0 },
  { m: "Apr", v: 0 },
  { m: "May", v: 0 },
  { m: "Jun", v: 0 },
  { m: "Jul", v: 0 },
];

export const teamGrowthSeries = [
  { d: "Mon", v: 0 },
  { d: "Tue", v: 0 },
  { d: "Wed", v: 0 },
  { d: "Thu", v: 0 },
  { d: "Fri", v: 0 },
  { d: "Sat", v: 0 },
  { d: "Sun", v: 0 },
];

export type Activity = {
  id: string;
  title: string;
  time: string;
  amount: number;
  kind: "binary" | "roi" | "withdrawal" | "referral";
};

export const recentActivity: Activity[] = [
  { id: "1", title: "Binary Matching Bonus", time: "Today, 1:04 PM", amount: 0, kind: "binary" },
  { id: "2", title: "Daily ROI Payout", time: "Today, 9:00 AM", amount: 0, kind: "roi" },
  { id: "3", title: "Withdrawal Request", time: "Yesterday, 4:12 PM", amount: 0, kind: "withdrawal" },
  { id: "4", title: "Referral Commission", time: "Yesterday, 11:30 AM", amount: 0, kind: "referral" },
];

export type Member = {
  id: string;
  name: string;
  joined: string;
  volume: number;
  team: number;
  side: "left" | "right";
  status: "active" | "pending" | "inactive";
};

export const topPerformers: Member[] = [];

export type TreeNode = {
  id: string;
  name: string;
  username: string;
  status: "active" | "inactive";
  left?: TreeNode;
  right?: TreeNode;
};

export const treeData: TreeNode = {
  id: "581793",
  name: "Top User",
  username: "admin",
  status: "active",
  left: {
    id: "462158",
    name: "Test 1",
    username: "test1",
    status: "active",
    left: {
      id: "123456",
      name: "User A",
      username: "usera",
      status: "active"
    },
    right: {
      id: "654321",
      name: "User B",
      username: "userb",
      status: "inactive"
    }
  },
  right: {
    id: "630597",
    name: "Test 2",
    username: "test2",
    status: "active",
    left: {
      id: "789012",
      name: "User C",
      username: "userc",
      status: "active"
    }
  }
};
