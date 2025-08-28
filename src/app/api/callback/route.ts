// src/app/api/callback/route.ts
import type { NextRequest } from "next/server";
import { AuthorizationCode, type ModuleOptions } from "simple-oauth2";

export const runtime = "nodejs"; // simple-oauth2 butuh Node runtime

type Provider = "github";
type OAuthStatus = "success" | "error";

type BasePayload = { provider: Provider };
type SuccessPayload = BasePayload & { token: string };
type ErrorPayload = BasePayload & { error: string };

const oauthConfig: ModuleOptions = {
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

function renderBody(status: OAuthStatus, payload: SuccessPayload | ErrorPayload): string {
  // Serialize payload aman (hindari '</script>')
  const payloadJson = JSON.stringify(payload).replace(/</g, "\\u003c");
  const provider = payload.provider;

  return `
    <script>
      (function () {
        var payload = ${payloadJson};
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:${provider}:${status}:' + JSON.stringify(payload),
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:${provider}", "*");
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
    const client = new AuthorizationCode(oauthConfig);

    const tokenParams = {
      code,
      redirect_uri: `https://${host}/api/callback?provider=${provider}`,
    } as const; // penuhi @typescript-eslint/prefer-as-const

    const accessToken = await client.getToken(tokenParams);
    // ketik akses token tanpa any
    const token = (accessToken.token as Record<string, string>)["access_token"];

    const html = renderBody("success", { token, provider });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Token exchange failed";
    const html = renderBody("error", { error: message, provider });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
  }
}
