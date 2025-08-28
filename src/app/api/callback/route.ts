// src/app/api/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/oauth';

function renderBody(status: string, content: any) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:' + content.provider + ':' + status + ':' + JSON.stringify(content),
          message.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:' + content.provider, '*');
    </script>
  `;
}

export async function GET(req: NextRequest) {
  const provider: 'github' = 'github';
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const host = req.headers.get('host')!;

  const client = createClient(provider);

  try {
    const accessToken = await client.getToken({
      code: code!,
      redirect_uri: `https://${host}/api/callback?provider=${provider}`,
    });
    const token = (accessToken.token as any)['access_token'];
    const body = renderBody('success', { token, provider });
    return new NextResponse(body, { status: 200, headers: { 'content-type': 'text/html' } });
  } catch (err) {
    const body = renderBody('error', { provider, message: (err as any).message });
    return new NextResponse(body, { status: 200, headers: { 'content-type': 'text/html' } });
  }
}
