/**
 * This Middleware skips adding the default prefix to API Routes and public files like fonts or images.
 * If a request is made to the default locale, we redirect to our prefix /sl.
 * @link https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return null;
  }

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/sl${req.nextUrl.pathname}`, req.url)
    );
  }
  return null;
}
