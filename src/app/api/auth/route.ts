// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/oauth';

export async function GET(req: NextRequest) {
  const provider = 'github';
  const host = req.headers.get('host')!;
  const client = createClient(provider);

  // callback URL harus sesuai dengan rute callback di bawah
  const redirectUri = `https://${host}/api/callback?provider=${provider}`;
  const authorizationUri = client.authorizeURL({
    redirect_uri: redirectUri,
    scope: 'public_repo,user',              // scope yang dibutuhkan:contentReference[oaicite:16]{index=16}
    state: Math.random().toString(16).substring(2),
  });

  return NextResponse.redirect(authorizationUri, 302);
}
