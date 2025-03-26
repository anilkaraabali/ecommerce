import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import {
  createBrowserClient,
  createServerClient,
  serializeCookieHeader,
} from '@supabase/ssr';
import { createClient as createClientPrimitive } from '@supabase/supabase-js';

type ClientType = 'api' | 'browser' | 'server' | 'static';

const createUrlAnonKeys = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anonKey) {
    throw new Error(
      'Missing env variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return { anonKey, url };
};

const createBrowserSupabaseClient = (url: string, anonKey: string) =>
  createBrowserClient(url, anonKey);

const createStaticSupabaseClient = (url: string, anonKey: string) =>
  createClientPrimitive(url, anonKey);

const createServerSupabaseClient = (
  url: string,
  anonKey: string,
  ctx: { req: NextApiRequest; res: NextApiResponse } | GetServerSidePropsContext
) => {
  if (!ctx) {
    throw new Error('Supabase server client requires context (req, res)');
  }
  const { req, res } = 'req' in ctx ? ctx : ctx;

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () =>
        Object.entries(req.cookies).map(([name, value]) => ({
          name,
          value: value || '',
        })),
      setAll: (cookiesToSet) => {
        res.setHeader(
          'Set-Cookie',
          cookiesToSet.map(({ name, options, value }) =>
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });
};

const createClient = (
  type: ClientType,
  ctx?:
    | { req: NextApiRequest; res: NextApiResponse }
    | GetServerSidePropsContext
) => {
  const { anonKey, url } = createUrlAnonKeys();

  switch (type) {
    case 'browser':
      return createBrowserSupabaseClient(url, anonKey);
    case 'static':
      return createStaticSupabaseClient(url, anonKey);
    case 'api':
    case 'server':
      return createServerSupabaseClient(url, anonKey, ctx!);
    default:
      throw new Error(`Unsupported client type: ${type}`);
  }
};

export { createClient };
