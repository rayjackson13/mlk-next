import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest): Promise<unknown> {
  const { pathname, locale } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
    return;
  }

  if (PUBLIC_FILE.test(pathname)) {
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=86400');
    return NextResponse.next({
      headers,
    });
  }

  if (pathname === '/' && locale === 'default') {
    const url = req.nextUrl.clone();
    url.locale = 'en';
    return NextResponse.redirect(url, 301);
  }

  if (locale !== 'default') {
    const headers = new Headers(req.headers);
    headers.set('x-site-locale', locale);
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }
}
