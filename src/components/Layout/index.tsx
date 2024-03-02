import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';

import { getLocale } from './helpers/getLocale';

import { Background } from 'components/Background';
import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';
import { LocaleContext } from 'context/locale';
import { Translations } from 'types';
import { Analytics, Events } from 'utils/analytics';

Analytics.init();

type LayoutProps = {
  children: React.ReactElement;
  locale: string;
  path: string;
  translations: Translations;
};

export const Layout = ({
  children,
  locale,
  path,
  translations,
}: LayoutProps): React.ReactElement => {
  global.translations = translations;
  const lang = getLocale(locale, path);

  useEffect(() => {
    Analytics.track(Events.PageVisited, {
      path,
      language: lang,
    });
  }, [lang, path]);

  return (
    <>
      <LocaleContext.Provider value={lang}>
        <>
          <Navbar path={path} />
          <Background />
          <main>{children}</main>
          <Footer />
        </>
      </LocaleContext.Provider>

      <SpeedInsights />
    </>
  );
};
