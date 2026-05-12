import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session');
  const userSession = request.cookies.get('user_session')?.value;
  const isAdmin = adminSession || (userSession && userSession.startsWith('admin_'));

  const { pathname } = request.nextUrl;

  // Si on essaie d'accéder à l'admin (sauf login) sans session
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si on est déjà connecté et qu'on essaie d'aller sur login
  if (pathname === '/admin/login' && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
