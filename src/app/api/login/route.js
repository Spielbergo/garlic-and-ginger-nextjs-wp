import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const expected = process.env.SITE_PASSWORD;

    if (expected && password === expected) {
      const res = NextResponse.json({ ok: true });
      // set a cookie valid for 7 days
      res.cookies.set('site_auth', expected, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
