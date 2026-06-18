import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useRouterState } from "@tanstack/react-router";
import { WifiOff, RefreshCw } from "lucide-react";
import { useState } from "react";

/**
 * Routes that are allowed to render offline (no blocking popup).
 * The Home page `/` is fully static. The login page `/login` renders
 * its UI offline (form submit will naturally fail with a toast).
 */
const OFFLINE_ALLOWED_ROUTES = ["/", "/login"];

/**
 * Full-screen overlay popup that blocks interaction when the user is
 * offline and on a page that requires internet.
 */
export function NoInternetPopup() {
  const isOnline = useOnlineStatus();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [retrying, setRetrying] = useState(false);

  // Normalize pathname — remove trailing slash for comparison
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  // Don't show popup if online OR if on an allowed offline route
  const isAllowedOffline = OFFLINE_ALLOWED_ROUTES.some(
    (route) => normalizedPath === route,
  );

  if (isOnline || isAllowedOffline) return null;

  const handleRetry = () => {
    setRetrying(true);
    // Small delay to show the spinner, then reload
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="no-internet-overlay">
      <div className="no-internet-popup">
        {/* Animated icon */}
        <div className="no-internet-icon-wrapper">
          <div className="no-internet-icon-ring" />
          <WifiOff className="no-internet-icon" />
        </div>

        <h2 className="no-internet-title">No Internet Connection</h2>
        <p className="no-internet-desc">
          Please check your network connection and try again. This page requires
          an active internet connection to load.
        </p>

        <button
          className="no-internet-retry-btn"
          onClick={handleRetry}
          disabled={retrying}
        >
          <RefreshCw
            className={`no-internet-retry-icon ${retrying ? "no-internet-spin" : ""}`}
          />
          {retrying ? "Reconnecting..." : "Try Again"}
        </button>

        <p className="no-internet-hint">
          Tip: The Home page is available offline.
        </p>
      </div>
    </div>
  );
}
