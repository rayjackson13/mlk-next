import 'styles/style.scss';

import * as Vercel from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useEffect } from 'react';

import { getLocale } from './helpers/getLocale';

import { Background } from 'components/Background';
import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';
import { LocaleContext } from 'context/locale';
import { LocalizedPageProps } from 'types';
import { Analytics, Events } from 'utils/analytics';
import { isIndexPage } from 'utils/helpers/isIndexPage';
import { useTranslationLoader } from 'utils/hooks/useTranslationLoader';

type LayoutProps = Omit<LocalizedPageProps, 'children'> & {
  children: React.ReactElement;
};

type LocalizedLayoutProps = {
  children: React.ReactElement;
};

Analytics.init();

const LocalizedLayout = ({ children }: LocalizedLayoutProps): JSX.Element => {
  useTranslationLoader();

  return <>{children}</>;
};

export const Layout = ({
  children,
  pageContext: { locale },
  location: { href, pathname },
}: LayoutProps): React.ReactElement => {
  const isIndex = isIndexPage(pathname);
  const lang = getLocale(locale, pathname);
  console.log('aaaa', process.env.GATSBY_MIXPANEL_TOKEN);

  useEffect(() => {
    Analytics.track(Events.PageVisited, {
      url: href,
      language: lang,
    });
  }, [lang, href]);

  return (
    <>
      <LocaleContext.Provider value={lang}>
        <LocalizedLayout>
          <>
            <Navbar isIndexPage={isIndex} />
            <Background />
            <main>{children}</main>
            <Footer />
          </>
        </LocalizedLayout>
      </LocaleContext.Provider>

      <Vercel.Analytics />
      <SpeedInsights />
    </>
  );
};
