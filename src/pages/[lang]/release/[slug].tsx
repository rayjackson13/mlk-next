import { GetStaticPaths, GetStaticProps } from 'next';

import { Locales } from 'constants/locales';
import { Album } from 'types';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';
import { loadLocale } from 'utils/helpers/loadLocale';

type Params = {
  lang: string;
  slug: string;
};

type Props = {
  lang: string;
  release: Album | undefined;
};

const ReleasePage = ({ lang, release }: Props): JSX.Element => {
  console.log(release, lang);
  return <main>Test</main>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const releases = loadAllReleases();

  // Get the paths we want to pre-render based on posts
  const paths = Locales.map((lang) =>
    releases.map((post) => ({
      params: {
        lang: lang.locale,
        slug: post.slug,
      },
    })),
  ).flat();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const lang = params?.lang ?? 'en';
  const releases = loadAllReleases();
  const translations = loadLocale(lang);

  if (!params) return { props: { lang: 'en', release: undefined } };

  return {
    props: {
      lang: params.lang,
      release: releases.find((val) => val.slug === params.slug),
      translations,
    },
  };
};

export default ReleasePage;
