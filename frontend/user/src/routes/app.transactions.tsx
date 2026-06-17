import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Repeat, Gift, Download } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { inr } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/transactions")({
  head: () => ({ meta: [{ title: "Transactions — E2 Solutions" }] }),
  component: TransactionsPage,
});

type Txn = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer" | "income";
  status: "completed" | "pending" | "rejected";
};

const txns: Txn[] = [
  { id: "1", title: "Withdrawal Request", date: "10 Jun, 2:14 PM", amount: -15000, type: "withdrawal", status: "completed" },
  { id: "2", title: "Crypto Deposit", date: "09 Jun, 11:02 AM", amount: 50000, type: "deposit", status: "completed" },
  { id: "3", title: "Monthly ROI Payout", date: "08 Jun, 9:00 AM", amount: 24500, type: "income", status: "completed" },
  { id: "4", title: "Internal Transfer", date: "07 Jun, 6:30 PM", amount: -8000, type: "transfer", status: "pending" },
  { id: "5", title: "Referral Commission", date: "06 Jun, 1:45 PM", amount: 3250, type: "income", status: "completed" },
  { id: "6", title: "Withdrawal Request", date: "05 Jun, 4:20 PM", amount: -20000, type: "withdrawal", status: "rejected" },
];

const typeIcon = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  transfer: Repeat,
  income: Gift,
} as const;

const filters = ["All", "Deposits", "Withdrawals", "Transfers", "Income"] as const;

function TransactionsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const map: Record<string, Txn["type"]> = {
    Deposits: "deposit",
    Withdrawals: "withdrawal",
    Transfers: "transfer",
    Income: "income",
  };
  const list = filter === "All" ? txns : txns.filter((t) => t.type === map[filter]);

  const statusTone = {
    completed: "bg-success/15 text-success",
    pending: "bg-warning/20 text-warning-foreground",
    rejected: "bg-destructive/15 text-destructive",
  };

  return (
    <div>
      <AppHeader title="Transactions" subtitle="All deposits, withdrawals & income" />
      <div className="space-y-4 px-4">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-soft",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground shadow-soft">
          <Download className="h-4 w-4 text-primary" /> Export PDF / Excel
        </button>

        <ul className="space-y-2">
          {list.map((t) => {
            const Icon = typeIcon[t.type];
            const positive = t.amount >= 0;
            return (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-soft"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl",
                    positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-sm font-bold", positive ? "text-success" : "text-destructive")}>
                    {positive ? "+" : "−"}
                    {inr(Math.abs(t.amount))}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                      statusTone[t.status],
                    )}
                  >
                    {t.status}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
