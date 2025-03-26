import { PageProps } from '@/types';
import { NextPage } from 'next';

import { HomeHero } from '../components/HomeHero';

interface HomePageProps extends PageProps {}

const HomePage: NextPage<HomePageProps> = () => (
  <main>
    <HomeHero />
  </main>
);

export type { HomePageProps };
export default HomePage;
