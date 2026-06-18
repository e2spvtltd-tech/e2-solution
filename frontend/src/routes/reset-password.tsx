import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import { AuthShell, Field } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password â€” E2 Solutions" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated");
    navigate({ to: "/login" });
  };
  return (
    <AuthShell title="Reset Password" subtitle="Create a new secure password">
      <form onSubmit={submit} className="space-y-4">
        <Field label="New Password" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
        <Field label="Confirm Password" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
        <Button type="submit" variant="hero" className="w-full">
          Update Password
        </Button>
      </form>
    </AuthShell>
  );
}
