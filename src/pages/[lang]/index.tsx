import { GetStaticPaths, GetStaticProps } from 'next';
import { useMemo, useRef } from 'react';

import { Locales } from 'constants/locales';
import { Discography } from 'sections/Discography';
import { Hero } from 'sections/Hero';
import { Release } from 'sections/Release';
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

const Home = ({ releases }: Props): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const latestAlbum = useMemo(() => releases[0], [releases]);

  return (
    <>
      <Hero nextSectionRef={sectionRef} />
      <Release album={latestAlbum} ref={sectionRef} />
      <Discography albums={releases} />
    </>
  );
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
