import type { GetServerSideProps } from 'next';

import { AccountPageProps } from '@/features/auth/pages/account/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const pageProps = await getSSRPageProps(ctx, ['Account']);

  if (!pageProps.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...pageProps,
    },
  };
}) satisfies GetServerSideProps<AccountPageProps>;

export { default } from '@/features/auth/pages/account/page';
