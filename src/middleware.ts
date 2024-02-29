import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest): Promise<unknown> {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    // ['', '/', '/en/', '/ru/'].includes(req.nextUrl.pathname) ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/en${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }
}
