import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "sonner";
import { NoInternetPopup } from "@/components/app/NoInternetPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "E2 Solutions â€” Institutional-grade Network Investing" },
      {
        name: "description",
        content:
          "E2 Solutions is a binary network investment platform with daily ROI, binary income, referral commissions, and real-time team analytics.",
      },
      { name: "author", content: "E2 Solutions" },
      { name: "theme-color", content: "#5B3DF5" },
      { property: "og:title", content: "E2 Solutions â€” Institutional-grade Network Investing" },
      {
        property: "og:description",
        content: "Build your future with daily ROI, binary income and a powerful referral network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "binary network, investment platform, daily ROI, referral commissions, E2 Solutions, MLM" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "E2 Solutions",
              "url": "https://e2solutions.com",
              "description": "Binary network investment platform with daily ROI and referral commissions."
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalFetch = window.fetch;
              window.fetch = async function(...args) {
                let url = '';
                if (typeof args[0] === 'string') {
                  url = args[0];
                } else if (args[0] && args[0].url) {
                  url = args[0].url;
                }
                if (url && url.includes('useblackbox.io')) {
                  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                return originalFetch.apply(this, args);
              };

              // Suppress the "Uncaught (in promise) TypeError: Failed to fetch" from the extension
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message === 'Failed to fetch') {
                  const stack = event.reason.stack || '';
                  if (stack.includes('index.iife.js') || stack.includes('useblackbox.io')) {
                    event.preventDefault();
                  }
                }
              });
              
              // Also intercept console.error for this specific error just in case
              const originalConsoleError = console.error;
              console.error = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('useblackbox.io')) {
                  return;
                }
                return originalConsoleError.apply(console, args);
              };
            `
          }}
        />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />

        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* Offline guard — blocks non-whitelisted pages when no internet */}
      <NoInternetPopup />
    </QueryClientProvider>
  );
}
