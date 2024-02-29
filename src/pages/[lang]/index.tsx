import { GetStaticPaths, GetStaticProps } from 'next';

import { Locales } from 'constants/locales';
import { Album } from 'types';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';
import { loadLocale } from 'utils/helpers/loadLocale';

type Params = {
  lang: string;
};

type Props = {
  lang: string;
  releases: Album[];
};

const Home = (props: Props): JSX.Element => {
  console.log('Home');

  return <main />;
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Locales.map((lang) => ({
    params: {
      lang: lang.locale,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const lang = params?.lang ?? 'en';
  const releases = loadAllReleases();
  const translations = loadLocale(lang);

  return {
    props: {
      lang: params?.lang ?? 'en',
      releases,
      translations,
    },
  };
};

export default Home;
