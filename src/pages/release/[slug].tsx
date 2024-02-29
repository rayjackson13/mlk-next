import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { Locales } from 'constants/locales';
import { Release } from 'sections/Release';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';
import { loadLocale } from 'utils/helpers/loadLocale';

type Params = {
  slug: string;
};

type Props = {
  release: Album | undefined;
};

const ReleasePage = ({ release }: Props): JSX.Element => {
  const pageTitle = `${release?.title} | MELLAMOKOSTYA`;
  const pageDesc = getTranslation('releasePageDesc').replace(
    '#',
    release?.title ?? '',
  );

  return (
    <>
      <Head>
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
  const paths = Locales.map(({ locale }) =>
    releases.map((post) => ({
      params: {
        slug: post.slug,
      },
      locale,
    })),
  ).flat();

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({
  locale,
  params,
}) => {
  const lang = locale ?? 'en';
  const releases = loadAllReleases();
  const translations = loadLocale(lang);

  if (!params) return { props: { lang, release: undefined, translations } };

  return {
    props: {
      lang,
      release: releases.find((val) => val.slug === params.slug),
      translations,
    },
  };
};

export default ReleasePage;
