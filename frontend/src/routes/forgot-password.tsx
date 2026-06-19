import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import { AuthShell, Field } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password - e2solution.in" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reset code sent");
    navigate({ to: "/reset-password" });
  };
  return (
    <AuthShell
      title="Forgot Password"
      subtitle="We'll send a reset code to your email"
      footer={
        <Link to="/login" className="font-semibold text-primary">
          Back to Sign In
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email or User ID" type="text" placeholder="you@example.com" required />
        <Button type="submit" variant="hero" className="w-full">
          Send Reset Code
        </Button>
      </form>
    </AuthShell>
  );
}
