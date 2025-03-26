import type { GetServerSideProps } from 'next';

import { InboxPageProps } from '@/features/auth/pages/inbox/page';
import { getReferer, getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const pageProps = await getSSRPageProps(ctx, ['Auth']);

  if (pageProps.user) {
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
      referer: getReferer({
        headers: ctx.req.headers,
        redirect: '/',
      }),
    },
  };
}) satisfies GetServerSideProps<InboxPageProps>;

export { default } from '@/features/auth/pages/inbox/page';
