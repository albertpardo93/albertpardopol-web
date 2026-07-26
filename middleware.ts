import { NextResponse, type NextRequest } from "next/server";

const locales = ["es", "ca", "en"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Redirect root to /es
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets (with extension)
     * - Next.js generated image routes (apple-icon, icon, opengraph-image, twitter-image)
     */
    "/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|apple-icon|icon|opengraph-image|twitter-image|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|json)$).*)",
  ],
};
