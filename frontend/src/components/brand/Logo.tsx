import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
  layout = "horizontal",
  size = "default",
}: {
  className?: string;
  variant?: "default" | "light";
  layout?: "horizontal" | "vertical";
  size?: "default" | "lg" | "xl";
}) {
  const isVertical = layout === "vertical";

  // Size mapping for SVG
  const svgSizes = {
    default: "h-8 w-11",
    lg: "h-11 w-15",
    xl: "h-14 w-20",
  };

  // Size mapping for Title text
  const titleSizes = {
    default: "text-xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
  };

  // Size mapping for Subtitle text
  const subtitleSizes = {
    default: "text-[11px] mt-0.5",
    lg: "text-xs md:text-sm mt-1",
    xl: "text-sm md:text-base mt-1.5",
  };

  return (
    <div
      className={cn(
        "flex",
        isVertical ? "flex-col items-center text-center gap-3" : "items-center gap-2.5",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className={svgSizes[size]}
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
      </div>
      <div className={cn("flex flex-col", isVertical ? "items-center text-center" : "justify-center")}>
        <span
          className={cn(
            titleSizes[size],
            "font-black tracking-tight leading-none",
            variant === "light" ? "text-primary-foreground" : "text-[#0f172a]"
          )}
        >
          E² Solutions
        </span>
        <span
          className={cn(
            subtitleSizes[size],
            "font-semibold tracking-wide",
            variant === "light" ? "text-primary-foreground/70" : "text-slate-400"
          )}
        >
          Pvt Ltd
        </span>
      </div>
    </div>
  );
}

