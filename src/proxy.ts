import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "ru", "de"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Middleware entry point â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Next.js 16: export name must be 'proxy', file must be named 'proxy.ts'.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // â”€â”€ Skip internal paths â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // â”€â”€ Admin auth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    // Admin is authenticated â€” pass through (no locale redirect for admin)
    return NextResponse.next();
  }

  // â”€â”€ Locale routing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Check if the path already starts with a known locale segment
  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the preferred locale (e.g. / â†’ /en or /fr/about)
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
