import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Invitation-Only Network - e2solution.in" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthShell
      title="Invitation-Only Network"
      subtitle="E2 Solutions is an exclusive investment network"
      footer={
        <div className="flex flex-col gap-4">
          <Link to="/login" className="inline-flex items-center justify-center gap-2 font-medium hover:text-foreground transition-colors py-2">
            <ArrowLeft className="h-4 w-4" /> Go to Sign In
          </Link>
        </div>
      }
    >
      <div className="text-center space-y-4 py-4 flex flex-col items-center">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-sm animate-pulse">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <p className="text-sm font-semibold text-foreground">
          Public registration is disabled.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
          E2 Solutions operates as an exclusive, direct-placement binary network. Please contact an existing network member (your sponsor) to get registered and placed directly inside the binary structure.
        </p>
        <Button asChild className="w-full mt-4 rounded-full h-11" variant="hero">
          <Link to="/login">Sign In to Dashboard</Link>
        </Button>
      </div>
    </AuthShell>
  );
}
