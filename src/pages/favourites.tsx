import type { GetServerSideProps } from 'next';

import { FavouritesPageProps } from '@/features/favourites/pages/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx, ['Product', 'Favourites'])),
  },
})) satisfies GetServerSideProps<FavouritesPageProps>;

export { default } from '@/features/favourites/pages/page';
