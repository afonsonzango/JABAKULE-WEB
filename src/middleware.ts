import { parse } from 'cookie';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axiosAuthed from './components/cui/hooks/axiosInstances/axiosAuth';

export async function middleware(request: NextRequest) {
  const cookies = request.headers.get('cookie');
  let token = '';

  if (cookies) {
    const parsedCookies = parse(cookies);
    token = parsedCookies.token || '';
  }

  try {
    const verifyToken = await axiosAuthed.post(`/user/auth/status`, {}, {
      headers: {
        token: token
      }
    });

    if (verifyToken.data.valid) {
      return NextResponse.redirect(new URL('/get-started', request.url));
    }
  } catch (error) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/login'],
};