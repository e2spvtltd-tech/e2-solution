const inr = (n) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
const compact = (n) => Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 2e4,
    dailyRoi: "1% Daily ROI",
    binaryBonus: "8% Binary Bonus",
    referral: "5% Referral Commission",
    duration: "120 Days Duration",
    ceiling: "2x Income Ceiling",
    tier: "starter"
  },
  {
    id: "growth",
    name: "Growth",
    price: 3e4,
    dailyRoi: "1.2% Daily ROI",
    binaryBonus: "9% Binary Bonus",
    referral: "6% Referral Commission",
    duration: "120 Days Duration",
    ceiling: "2.5x Income Ceiling",
    tier: "growth"
  },
  {
    id: "premium",
    name: "Premium",
    price: 5e4,
    dailyRoi: "1.5% Daily ROI",
    binaryBonus: "10% Binary Bonus",
    referral: "8% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "3x Income Ceiling",
    popular: true,
    tier: "premium"
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 7e4,
    dailyRoi: "2% Daily ROI",
    binaryBonus: "11% Binary Bonus",
    referral: "9% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "4x Income Ceiling",
    tier: "advanced"
  },
  {
    id: "elite",
    name: "Elite",
    price: 1e5,
    dailyRoi: "2.5% Daily ROI",
    binaryBonus: "12% Binary Bonus",
    referral: "10% Referral Commission",
    duration: "180 Days Duration",
    ceiling: "Unlimited Ceiling",
    tier: "elite"
  }
];
const growthSeries = [
  { m: "Jan", v: 0 },
  { m: "Feb", v: 0 },
  { m: "Mar", v: 0 },
  { m: "Apr", v: 0 },
  { m: "May", v: 0 },
  { m: "Jun", v: 0 },
  { m: "Jul", v: 0 }
];
const teamGrowthSeries = [
  { d: "Mon", v: 0 },
  { d: "Tue", v: 0 },
  { d: "Wed", v: 0 },
  { d: "Thu", v: 0 },
  { d: "Fri", v: 0 },
  { d: "Sat", v: 0 },
  { d: "Sun", v: 0 }
];
const topPerformers = [];
export {
  teamGrowthSeries as a,
  compact as c,
  growthSeries as g,
  inr as i,
  packages as p,
  topPerformers as t
};
