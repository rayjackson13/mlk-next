import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

import SEO from 'components/SEO';
import { Discography } from 'sections/Discography';
import { Hero } from 'sections/Hero';
import { Release } from 'sections/Release';
import { Album } from 'types';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';
import { loadLocale } from 'utils/helpers/loadLocale';

type Props = {
  releases: Album[];
};

const Home = ({ releases }: Props): JSX.Element => {
  const { asPath: path } = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const latestAlbum = useMemo(() => releases[0], [releases]);

  return (
    <>
      <SEO path={path} />
      <Hero nextSectionRef={sectionRef} />
      <Release album={latestAlbum} ref={sectionRef} />
      <Discography albums={releases} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const lang = locale ?? 'en';
  const releases = loadAllReleases();
  const translations = loadLocale(lang);

  return {
    props: {
      lang,
      releases,
      translations,
    },
  };
};

export default Home;
