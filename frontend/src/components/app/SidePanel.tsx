import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { 
  Home, 
  ShoppingBag, 
  MapPin, 
  User, 
  Network, 
  Receipt, 
  BadgeDollarSign, 
  Trophy, 
  Headset,
  Menu,
  X,
  LogOut
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

const links = [
  { icon: Home, label: "Dashboard", to: "/app" },
  { icon: Network, label: "Network", to: "/app/network" },
  { icon: Receipt, label: "Investments", to: "/app/invest" },
  { icon: BadgeDollarSign, label: "Earnings", to: "/app/earnings" },
  { icon: User, label: "Profile", to: "/app/profile" },
];

import api from "@/services/api";
import { useEffect } from "react";

export function SidePanel() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>(() => {
    try {
      const cached = localStorage.getItem('user_profile');
      if (cached) return JSON.parse(cached);
    } catch {}
    return null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile").then(res => {
      setProfile(res.data);
      localStorage.setItem('user_profile', JSON.stringify(res.data));
    }).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate({ to: "/login" });
  };

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() 
    : "";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-soft hover:bg-accent transition-colors">
          <Menu className="h-[18px] w-[18px]" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-sm gap-4 border-r border-border/40 bg-background p-6 shadow-glow transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between shrink-0">
            <Dialog.Title className="text-lg font-bold text-foreground">Navigation</Dialog.Title>
            <Dialog.Description className="sr-only">Main navigation menu</Dialog.Description>
            <Dialog.Close asChild>
              <button className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          
          <div className="flex flex-col items-center mt-6 shrink-0">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-primary text-4xl font-extrabold text-primary-foreground shadow-glow">
              {initials}
            </span>
          </div>
          
          <nav className="mt-8 flex flex-col gap-2 shrink-0">
            {links.map((link, idx) => (
              <Dialog.Close asChild key={idx}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/app" }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-foreground [&.active]:bg-primary [&.active]:text-primary-foreground shadow-sm [&.active]:shadow-glow"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-auto pt-8 shrink-0 pb-4">
            <Button onClick={handleLogout} variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" /> Log Out
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
