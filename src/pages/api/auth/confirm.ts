import type { NextApiRequest, NextApiResponse } from 'next';

import { createApiClient } from '@/utils/supabase';
import { type EmailOtpType } from '@supabase/supabase-js';

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item;
}

const METHOD_NOT_ALLOWED = 405;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(METHOD_NOT_ALLOWED).appendHeader('Allow', 'GET').end();

    return;
  }
  const queryParams = req.query;
  const token_hash = stringOrFirstString(queryParams.token_hash);
  const type = stringOrFirstString(queryParams.type);
  let next = '/error';

  if (token_hash && type) {
    const supabase = createApiClient(req, res);
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as EmailOtpType,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error verifying OTP:', error.message);
    } else {
      next = stringOrFirstString(queryParams.next) || '/';
    }
  }
  res.redirect(next);
}
