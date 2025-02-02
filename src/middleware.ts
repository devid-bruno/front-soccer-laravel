// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if(request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));

  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}