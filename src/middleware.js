import { NextResponse } from 'next/server';

// Paths that should remain public
const PUBLIC_PATHS = [
  '/_next/',
  '/api/',
  '/static/',
  '/favicon.ico',
  '/login',
  '/app/login',
  '/_vercel',
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public assets and API
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check auth cookie
  const cookie = req.cookies.get('site_auth')?.value;
  const expected = process.env.SITE_PASSWORD;

  if (expected && cookie === expected) {
    return NextResponse.next();
  }

  // Redirect to login page
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.rewrite(url);
}

// Apply middleware to all routes except static/_next/api
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
