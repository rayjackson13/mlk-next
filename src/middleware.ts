import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest): Promise<unknown> {
  const headers = new Headers(req.headers);
  const { pathname, locale, search } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  if (locale !== 'default') {
    headers.set('x-site-locale', locale);
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.redirect(new URL(`/en${pathname}${search}`, req.url));
}
