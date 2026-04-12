import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "ru", "de"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getLocaleFromAcceptLanguage(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (LOCALES.includes(tag as Locale)) return tag as Locale;
  }
  return DEFAULT_LOCALE;
}

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Cookie preference (set when user clicks a language)
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && LOCALES.includes(cookie as Locale)) return cookie as Locale;
  // 2. Accept-Language header
  return getLocaleFromAcceptLanguage(request);
}

// ─── Middleware entry point ──────────────────────────────────────────────────
// Next.js requires this file to be named middleware.ts at src/ or root level.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Skip internal paths ──────────────────────────────────────────────────
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // ── Admin auth ───────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Always allow login page through
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const sessionCookie = request.cookies.get("admin_session");
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    // Admin is authenticated — pass through (no locale redirect for admin)
    return NextResponse.next();
  }

  // ── Locale routing ───────────────────────────────────────────────────────
  // Check if the path already starts with a known locale segment
  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the preferred locale (e.g. / → /en or /fr/about)
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico, icon.svg
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)).*)",
  ],
};
