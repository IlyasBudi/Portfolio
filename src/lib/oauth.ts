// src/lib/oauth.ts
import { AuthorizationCode } from 'simple-oauth2';

const auth = {
  github: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
};

export interface ProviderConfig {
  client: { id: string; secret: string };
  auth: { tokenHost: string; tokenPath: string; authorizePath: string };
}

const clientConfig = {
  github: {
    id: process.env.OAUTH_GITHUB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITHUB_CLIENT_SECRET as string,
  },
};

export const getConfig = (provider: 'github'): ProviderConfig => ({
  client: clientConfig[provider],
  auth: auth[provider],
});

export const createClient = (provider: 'github') => new AuthorizationCode(getConfig(provider));
