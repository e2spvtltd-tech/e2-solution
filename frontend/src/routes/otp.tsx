import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/otp")({
  head: () => ({ meta: [{ title: "Verify OTP - e2solution.in" }] }),
  component: OtpPage,
});

function OtpPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Verified successfully");
    navigate({ to: "/app" });
  };

  return (
    <AuthShell title="OTP Verification" subtitle="Enter the 6-digit code sent to your number">
      <form onSubmit={verify} className="space-y-5">
        <div className="flex justify-between gap-2">
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-border bg-background text-center text-xl font-bold outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          ))}
        </div>
        <Button type="submit" variant="hero" className="w-full">
          Verify & Continue
        </Button>
        <button
          type="button"
          onClick={() => toast.success("New code sent")}
          className="w-full text-center text-xs font-semibold text-primary"
        >
          Resend Code
        </button>
      </form>
    </AuthShell>
  );
}
