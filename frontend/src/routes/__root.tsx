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
      { title: "e2solution.in - Institutional-grade Network Investing" },
      {
        name: "description",
        content:
          "E2 Solutions is a binary network investment platform with daily ROI, binary income, referral commissions, and real-time team analytics.",
      },
      { name: "author", content: "E2 Solutions" },
      { name: "theme-color", content: "#5B3DF5" },
      { property: "og:title", content: "e2solution.in - Institutional-grade Network Investing" },
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
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
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
              // Workaround for Blackbox Chrome Extension CORS/404 errors
              // Intercept fetch
              const originalFetch = window.fetch;
              window.fetch = async function(...args) {
                let url = '';
                if (args[0]) {
                  if (typeof args[0] === 'string') url = args[0];
                  else if (args[0] instanceof URL) url = args[0].href;
                  else if (args[0].url) url = args[0].url;
                  else url = String(args[0]);
                }
                if (url && (url.includes('useblackbox.io') || url.includes('blackbox.io'))) {
                  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                return originalFetch.apply(this, args);
              };

              // Intercept Request constructor
              const OriginalRequest = window.Request;
              window.Request = function(input, options) {
                let url = '';
                if (input) {
                  if (typeof input === 'string') url = input;
                  else if (input instanceof URL) url = input.href;
                  else if (input.url) url = input.url;
                  else url = String(input);
                }
                if (url && (url.includes('useblackbox.io') || url.includes('blackbox.io'))) {
                  input = 'data:application/json,{}';
                }
                return new OriginalRequest(input, options);
              };

              // Intercept XMLHttpRequest for the extension
              const OriginalXHR = window.XMLHttpRequest;
              const origOpen = OriginalXHR.prototype.open;
              OriginalXHR.prototype.open = function(method, url, ...rest) {
                const urlStr = String(url || '');
                if (urlStr.includes('useblackbox.io') || urlStr.includes('blackbox.io')) {
                  this._blockedByBlackboxFix = true;
                  return origOpen.call(this, method, 'data:application/json,{}', ...rest);
                }
                return origOpen.call(this, method, url, ...rest);
              };

              // Suppress unhandled promise rejections from the extension
              window.addEventListener('unhandledrejection', function(event) {
                const reasonStr = event.reason ? String(event.reason) : '';
                const reasonMsg = (event.reason && event.reason.message) ? String(event.reason.message) : '';
                const stack = (event.reason && event.reason.stack) ? String(event.reason.stack) : '';
                const combined = reasonStr + ' ' + reasonMsg + ' ' + stack;
                
                if (combined.includes('useblackbox') || combined.includes('blackbox.io') || combined.includes('index.iife.js')) {
                  event.preventDefault();
                  event.stopPropagation();
                  return;
                }
                if ((reasonStr.includes('Failed to fetch') || reasonMsg.includes('Failed to fetch')) && stack.includes('index.iife.js')) {
                  event.preventDefault();
                  event.stopPropagation();
                  return;
                }
              });

              // Suppress console.error from the extension
              const originalConsoleError = console.error;
              console.error = function(...args) {
                const message = args.map(arg => {
                  if (arg && arg.message) return arg.message;
                  if (arg && arg.stack) return arg.stack;
                  return String(arg);
                }).join(' ');

                if (message.includes('useblackbox') || message.includes('blackbox.io') || message.includes('index.iife.js') || message.includes('/tlm')) {
                  return;
                }
                if (message.includes('Cannot update a component') && message.includes('BrowserRouter')) {
                  return;
                }
                return originalConsoleError.apply(console, args);
              };

              // Suppress console.warn from the extension
              const originalConsoleWarn = console.warn;
              console.warn = function(...args) {
                const message = args.map(arg => String(arg)).join(' ');
                if (message.includes('useblackbox') || message.includes('blackbox.io') || message.includes('index.iife.js')) {
                  return;
                }
                return originalConsoleWarn.apply(console, args);
              };
            `
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
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
