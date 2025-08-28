// src/app/api/callback/route.ts
import type { NextRequest } from "next/server";
import { AuthorizationCode, type ModuleOptions } from "simple-oauth2";

export const runtime = "nodejs"; // pastikan pakai Node runtime (bukan edge) untuk simple-oauth2

type Provider = "github";
type OAuthStatus = "success" | "error";

type SuccessPayload = { token: string; provider: Provider };
type ErrorPayload = { error?: string; provider: Provider };

function moduleOptions(provider: Provider): ModuleOptions {
  // saat ini hanya github; jika nanti ada provider lain, bisa switch-case di sini
  return {
    client: {
      id: process.env.OAUTH_GITHUB_CLIENT_ID ?? "",
      secret: process.env.OAUTH_GITHUB_CLIENT_SECRET ?? "",
    },
    auth: {
      tokenHost: "https://github.com",
      tokenPath: "/login/oauth/access_token",
      authorizePath: "/login/oauth/authorize",
    },
    options: {
      authorizationMethod: "body",
    },
  };
}

function renderBody(status: OAuthStatus, payload: SuccessPayload | ErrorPayload): string {
  // kirim token kembali ke window opener (Decap CMS popup flow)
  return `
    <script>
      (function () {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:${(payload as any).provider}:${status}:${JSON.stringify(payload)}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:${(payload as any).provider}", "*");
      })();
    </script>
  `;
}

export async function GET(req: NextRequest): Promise<Response> {
  const host = req.headers.get("host") ?? "";
  const provider = (req.nextUrl.searchParams.get("provider") ?? "github") as Provider;
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    const html = renderBody("error", { error: "Missing code", provider });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
  }

  try {
    const client = new AuthorizationCode(moduleOptions(provider));
    const tokenParams = {
      code,
      redirect_uri: `https://${host}/api/callback?provider=${provider}`,
    } as const; // <-- penuhi aturan prefer-as-const

    const accessToken = await client.getToken(tokenParams);
    const token = (accessToken.token as { access_token: string }).access_token;

    const html = renderBody("success", { token, provider });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
  } catch (e) {
    const html = renderBody("error", { error: "Token exchange failed", provider });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
  }
}
