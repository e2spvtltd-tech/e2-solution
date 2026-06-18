import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";

export const Route = createFileRoute("/app")({
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
