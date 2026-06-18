import { useState, useEffect } from "react";
import { Bell, Search, Wallet2, X, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { SidePanel } from "./SidePanel";
import { Button } from "@/components/ui/button";

import api from "@/services/api";

export function AppHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  // Real notifications will be wired up via backend sockets later
  useEffect(() => {
    // Socket listener placeholder
    api.get("/user/profile").then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() 
    : "FK";

  return (
    <header className="sticky top-0 z-20 bg-background/90 px-4 pb-3 pt-8 backdrop-blur-md border-b border-border/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <SidePanel />
          {title ? (
            <div className="min-w-0 truncate">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
          ) : (
            <Logo />
          )}
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Search Modal */}
          <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <Dialog.Trigger asChild>
              <button className="grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors">
                <Search className="h-[18px] w-[18px]" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-[50%] top-[20%] z-50 grid w-[90%] max-w-sm translate-x-[-50%] gap-4 border bg-background p-6 shadow-glow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-3xl">
                <div className="flex justify-between items-center mb-2">
                  <Dialog.Title className="text-lg font-bold">Search</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-1 text-muted-foreground hover:bg-accent">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search users, offers, history..." 
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                    autoFocus
                  />
                </div>
                <Button className="w-full mt-2" onClick={() => setIsSearchOpen(false)}>
                  Search
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Notifications Modal */}
          <Dialog.Root open={isNotifOpen} onOpenChange={(open) => {
            setIsNotifOpen(open);
            if (open) setHasNewNotif(false);
          }}>
            <Dialog.Trigger asChild>
              <button className="relative grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors">
                <Bell className="h-[18px] w-[18px]" />
                {hasNewNotif && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background animate-pulse" />
                )}
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-[90%] max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-glow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-3xl">
                <div className="flex justify-between items-center mb-2">
                  <Dialog.Title className="text-lg font-bold">Notifications</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-1 text-muted-foreground hover:bg-accent">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm flex flex-col items-center gap-2">
                      <Bell className="h-8 w-8 opacity-20" />
                      <p>You have no notifications yet.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="flex gap-3 bg-accent/50 p-3 rounded-xl">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Info className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1 font-medium uppercase tracking-wider">{notif.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Profile Logo */}
          <Link
            to="/app/profile"
            className="ml-1 md:ml-2 grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 transition-all shrink-0"
          >
            <span className="font-extrabold text-base md:text-lg">{initials}</span>
          </Link>

        </div>
      </div>
    </header>
  );
}
