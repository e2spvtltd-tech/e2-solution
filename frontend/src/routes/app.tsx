import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";

export const Route = createFileRoute("/app")({
  // Auth guard — redirect to login if no token found
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 pb-4 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
