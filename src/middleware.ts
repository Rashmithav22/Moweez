import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/profile', '/settings'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedPaths.includes(path);
  const user = request.cookies.get('user');

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
