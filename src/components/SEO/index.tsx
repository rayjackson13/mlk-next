import Head from 'next/head';
import { useCallback, useMemo } from 'react';

import { Locales } from 'constants/locales';
import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  description?: string;
  imagePath?: string;
  lang?: string;
  path: string;
  title?: string;
};

export default function SEO({
  lang = 'en',
  path,
  title,
  description,
  imagePath,
}: Props): JSX.Element {
  const titleText = title ?? getTranslation('title');
  const descText = description ?? getTranslation('pageDescription');
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const image = imagePath ?? '/images/me.jpg';
  const imageURL = baseURL?.concat(image) ?? image;

  const renderAlternateLinks = useCallback(
    (): JSX.Element[] =>
      Locales.map(({ locale }) => {
        const url = `${baseURL}/${locale}${path}`;
        return (
          <link href={url} hrefLang={locale} key={locale} rel="alternate" />
        );
      }),
    [baseURL, path],
  );

  const renderIcons = useCallback(
    (): JSX.Element => (
      <>
        <link
          href="/icon/apple-icon-57x57.png"
          rel="apple-touch-icon"
          sizes="57x57"
        />
        <link
          href="/icon/apple-icon-60x60.png"
          rel="apple-touch-icon"
          sizes="60x60"
        />
        <link
          href="/icon/apple-icon-72x72.png"
          rel="apple-touch-icon"
          sizes="72x72"
        />
        <link
          href="/icon/apple-icon-76x76.png"
          rel="apple-touch-icon"
          sizes="76x76"
        />
        <link
          href="/icon/apple-icon-114x114.png"
          rel="apple-touch-icon"
          sizes="114x114"
        />
        <link
          href="/icon/apple-icon-120x120.png"
          rel="apple-touch-icon"
          sizes="120x120"
        />
        <link
          href="/icon/apple-icon-144x144.png"
          rel="apple-touch-icon"
          sizes="144x144"
        />
        <link
          href="/icon/apple-icon-152x152.png"
          rel="apple-touch-icon"
          sizes="152x152"
        />
        <link
          href="/icon/apple-icon-180x180.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/icon/android-icon-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="/icon/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/icon/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link
          href="/icon/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/manifest.json" rel="manifest" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/icon/ms-icon-144x144.png"
          name="msapplication-TileImage"
        />
        <meta content="#ffffff" name="theme-color" />
      </>
    ),
    [],
  );

  const currentPath = useMemo(
    (): string => `${baseURL}/${lang}${path}`,
    [baseURL, lang, path],
  );

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <meta content={titleText} name="og:title" />
        <meta content={titleText} property="twitter:title" />
        <meta content={descText} name="description" />
        <meta content={descText} name="og:description" />
        <meta content={descText} property="twitter:description" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        {renderIcons()}
        <meta content={imageURL} name="og:image" />
        <meta content={imageURL} name="twitter:image" />
        <meta content="summary" property="twitter:card" />
        <meta content="website" name="og:type" />
        <meta content={currentPath} property="og:url" />
        {renderAlternateLinks()}
        <meta content="e9f5bba3f5bb1649" name="yandex-verification" />
      </Head>

      <h1 className="visuallyhidden">{titleText}</h1>
      <p className="visuallyhidden">{descText}</p>
    </>
  );
}
