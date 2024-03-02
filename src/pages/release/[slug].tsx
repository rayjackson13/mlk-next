import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import SEO from 'components/SEO';
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
  release: Album | null;
};

const ReleasePage = ({ release }: Props): JSX.Element => {
  const { asPath: path, locale } = useRouter();
  const pageTitle = `${release?.title} | MELLAMOKOSTYA`;
  const pageDesc = getTranslation('releasePageDesc').replace(
    '#',
    release?.title ?? '',
  );

  if (!release) {
    return <></>;
  }

  return (
    <>
      <SEO
        description={pageDesc}
        imagePath={release?.art}
        lang={locale}
        path={path}
        title={pageTitle}
      />

      <Release album={release} hasBorder={false} />
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

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({
  locale,
  params,
}) => {
  const lang = locale ?? 'en';
  const releases = loadAllReleases();
  const translations = loadLocale(lang);

  const release =
    (params && releases.find((val) => val.slug === params.slug)) ?? null;

  return {
    props: {
      lang,
      release,
      translations,
    },
  };
};

export default ReleasePage;
