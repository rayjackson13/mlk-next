import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { Locales } from 'constants/locales';
import { Release } from 'sections/Release';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';
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
  const pageTitle = `${release?.title} | MELLAMOKOSTYA`;
  const pageDesc = getTranslation('releasePageDesc').replace(
    '#',
    release?.title ?? '',
  );

  return (
    <>
      <Head>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta content={pageTitle} name="og:title" />
        <meta content={pageDesc} name="description" />
        <meta content={pageDesc} name="og:description" />
        <meta content={release?.art} name="og:image" />
        <meta content="website" name="og:type" />
      </Head>

      {release && <Release album={release} hasBorder={false} />}
    </>
  );
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
