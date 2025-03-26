import type { GetServerSideProps } from 'next';

import { HomePageProps } from '@/features/home/pages/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx, ['Home'])),
  },
})) satisfies GetServerSideProps<HomePageProps>;

export { default } from '@/features/home/pages/page';
