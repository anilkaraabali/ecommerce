import type { NextApiRequest, NextApiResponse } from 'next';

import { createClient } from './client';

const createApiClient = (req: NextApiRequest, res: NextApiResponse) =>
  createClient('api', { req, res });

export { createApiClient };
