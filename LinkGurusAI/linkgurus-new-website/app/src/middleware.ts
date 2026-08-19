import { NextResponse, type NextRequest } from "next/server";

/** Header carrying the locale-stripped path, read by the layout to build the
 *  language toggle without string-replacing the locale prefix at render time. */
export const PATH_HEADER = "x-lg-path";

/**
 * URL contract (spec 2.1): Arabic is served from the root, English from /en/.
 * Internally both trees render from app/[locale], so a root request is
 * rewritten — never redirected — onto the Arabic segment. An explicit /ar/
 * request is redirected away so only one canonical URL per page exists.
 *
 * There is deliberately no language detection here: spec 2.1 forbids
 * redirecting a visitor by IP, geography or Accept-Language.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const stripped = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(`${stripped}${search}`, request.url), 308);
  }

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const bare = isEnglish ? pathname.slice(3) || "/" : pathname;

  const headers = new Headers(request.headers);
  headers.set(PATH_HEADER, bare);

  if (isEnglish) {
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.rewrite(new URL(`/ar${pathname}${search}`, request.url), {
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|fonts|logos|icons|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
