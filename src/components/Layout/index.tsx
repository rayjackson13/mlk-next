// import * as Vercel from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/react';
import { getLocale } from './helpers/getLocale';

import { Background } from 'components/Background';
import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';
import { LocaleContext } from 'context/locale';
// import { Analytics, Events } from 'utils/analytics';
import { Translations } from 'types';

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

  // useEffect(() => {
  //   Analytics.track(Events.PageVisited, {
  //     url: href,
  //     language: lang,
  //   });
  // }, [lang, href]);

  return (
    <>
      <LocaleContext.Provider value={lang}>
        <>
          <Navbar locale={locale} path={path} />
          <Background />
          <main>{children}</main>
          <Footer />
        </>
      </LocaleContext.Provider>

      {/* <Vercel.Analytics />
      <SpeedInsights /> */}
    </>
  );
};
