import type { GetServerSideProps } from 'next';

import { productService } from '@/features/product/services';
import { SearchPageProps } from '@/features/search/pages/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const searchResult = await productService.fetchProducts('/home/index');

  if (!searchResult.ok) {
    throw new Error('Failed to fetch product listing');
  }

  return {
    props: {
      ...(await getSSRPageProps(ctx, ['Product'])),
      searchResult: searchResult.data,
    },
  };
}) satisfies GetServerSideProps<SearchPageProps>;

export { default } from '@/features/search/pages/page';
