import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-8 w-11" fill="none" stroke="url(#logo-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "text-xl font-black tracking-tight leading-none",
            variant === "light" ? "text-primary-foreground" : "text-[#0f172a]",
          )}
        >
          E² Solutions
        </span>
        <span className={cn(
          "text-[11px] font-semibold tracking-wide mt-0.5",
          variant === "light" ? "text-primary-foreground/70" : "text-slate-400"
        )}>
          Pvt Ltd
        </span>
      </div>
    </div>
  );
}
