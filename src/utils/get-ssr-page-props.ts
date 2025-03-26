import { LocaleType, PageProps } from '@/types';
import { GetServerSidePropsContext } from 'next';

import { getMessages } from './get-messages';
import { createServerPropsClient } from './supabase';

const getSSRPageProps = async (
  ctx: GetServerSidePropsContext,
  tScopes: string[] = []
): Promise<PageProps> => {
  const locale = ctx.locale as LocaleType;

  const supabase = createServerPropsClient(ctx);
  const { data, error } = await supabase.auth.getUser();

  return {
    messages: await getMessages(locale, tScopes),
    user: error || !data ? null : data.user,
  };
};

export { getSSRPageProps };
