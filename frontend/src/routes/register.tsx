import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AuthShell, Field } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account â€” E2 Solutions" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(window.location.search);
  const initialSponsor = searchParams.get('sponsor') || "";
  const isReferred = Boolean(initialSponsor);

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorId, setSponsorId] = useState(initialSponsor);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = (await import("@/services/api")).default;
      const res = await api.post('/auth/register', { fullName, mobile, email, password, sponsorId, placement: 'Pending' });
      localStorage.setItem('token', res.data.token);
      toast.success("Account created successfully");
      navigate({ to: "/app" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };
  return (
    <AuthShell
      title="Account Creation"
      subtitle="Join the network in a few quick steps"
      footer={
        <div className="flex flex-col gap-4">
          <div>
            Already a member?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </div>
          <Link to="/" className="inline-flex items-center justify-center gap-2 font-medium hover:text-foreground transition-colors py-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full Name" type="text" placeholder="Your full name" value={fullName} onChange={(e: any) => setFullName(e.target.value)} required />
        <Field label="Mobile Number" type="tel" placeholder="+91 00000 00000" value={mobile} onChange={(e: any) => setMobile(e.target.value)} required />
        <Field label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
        <Field label="Password" type="password" placeholder="Create a password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
        <Field 
          label={isReferred ? "Sponsor ID (Locked)" : "Sponsor ID (optional)"} 
          type="text" 
          placeholder="BMLM-0000" 
          value={sponsorId} 
          onChange={(e: any) => !isReferred && setSponsorId(e.target.value)} 
          disabled={isReferred}
        />
        <Button type="submit" variant="hero" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Complete Registration"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthShell>
  );
}
