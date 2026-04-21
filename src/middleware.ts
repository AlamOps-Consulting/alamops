import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SPANISH_COUNTRIES } from "@/lib/i18n";

function detectLocale(req: NextRequest): "en" | "es" {
  // 1) Vercel/Next edge geolocation
  const geoCountry =
    // @ts-expect-error — geo is available on NextRequest at the edge
    req.geo?.country ??
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    "";
  if (geoCountry && SPANISH_COUNTRIES.has(geoCountry.toUpperCase())) {
    return "es";
  }

  // 2) Accept-Language header fallback
  const al = (req.headers.get("accept-language") ?? "").toLowerCase();
  if (al.startsWith("es") || al.includes(",es") || al.includes(";es")) {
    return "es";
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin protection — unchanged
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Set initial lang cookie once, based on IP geo / Accept-Language
  const res = NextResponse.next();
  const existing = request.cookies.get("lang")?.value;
  if (existing !== "en" && existing !== "es") {
    const detected = detectLocale(request);
    res.cookies.set("lang", detected, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: [
    // apply to everything except _next static/image, api and files with an extension
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
