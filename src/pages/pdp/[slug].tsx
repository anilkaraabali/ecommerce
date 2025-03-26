import type { GetServerSideProps } from 'next';

import { ProductPageProps } from '@/features/product/pages/page';
import { productService } from '@/features/product/services';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const { query } = ctx;

  if (!query.slug) {
    return {
      notFound: true,
    };
  }

  if (!query.pid) {
    return {
      notFound: true,
    };
  }

  const detailResult = await productService.fetchProductById(
    query.pid as string
  );

  if (!detailResult.ok) {
    throw new Error('Failed to fetch product detail');
  }

  return {
    props: {
      ...(await getSSRPageProps(ctx, ['Product'])),
      detailResult: detailResult.data,
    },
  };
}) satisfies GetServerSideProps<ProductPageProps>;

export { default } from '@/features/product/pages/page';
