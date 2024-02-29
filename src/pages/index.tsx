import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo, useRef } from 'react';

import { Discography } from 'sections/Discography';
import { Hero } from 'sections/Hero';
import { Release } from 'sections/Release';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';
import { loadLocale } from 'utils/helpers/loadLocale';

type Props = {
  releases: Album[];
};

const Home = ({ releases }: Props): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const latestAlbum = useMemo(() => releases[0], [releases]);
  const title = getTranslation('title');
  const description = getTranslation('pageDescription');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={description} name="og:description" />
        <meta content={title} name="og:title" />
        <meta content="website" name="og:type" />
        <meta content="/images/me.jpeg" name="og:image" />
      </Head>

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
