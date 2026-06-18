import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "default",
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "primary" | "success" | "warning";
  className?: string;
}) {
  const toneMap = {
    default: "bg-accent text-accent-foreground",
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
  } as const;

  return (
    <div className={cn("rounded-2xl bg-card p-4 shadow-soft", className)}>
      <div className="flex items-center justify-between">
        <span className={cn("grid h-9 w-9 place-items-center rounded-xl", toneMap[tone])}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {delta && (
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
            {delta}
          </span>
        )}
      </div>
      <p className="mt-3 text-xl font-extrabold tracking-tight text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
