import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Network, TrendingUp, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/network", label: "Network", icon: Network },
  { to: "/app/invest", label: "Invest", icon: TrendingUp },
  { to: "/app/wallet", label: "Wallet", icon: Wallet },
  { to: "/app/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/app" ? pathname === "/app" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl transition-colors",
                    active && "bg-accent",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
