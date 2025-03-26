import type { GetServerSidePropsContext } from 'next';

import { createClient } from './client';

const createServerPropsClient = (ctx: GetServerSidePropsContext) =>
  createClient('server', ctx);

export { createServerPropsClient };
