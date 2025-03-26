import type { GetServerSideProps } from 'next';

import { PdfPageProps } from '@/features/pdf/pages/page';
import { getSSRPageProps } from '@/utils';

export const getServerSideProps = (async (ctx) => ({
  props: {
    ...(await getSSRPageProps(ctx)),
    fileName:
      'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
    title: 'Terms & Conditions Customer Rate & Review',
  },
})) satisfies GetServerSideProps<PdfPageProps>;

export { default } from '@/features/pdf/pages/page';
