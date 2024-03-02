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
          href="/icon/apple-touch-icon.png?v=1"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/icon/favicon-32x32.png?v=1"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/icon/favicon-16x16.png?v=1"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/icon/site.webmanifest?v=1" rel="manifest" />
        <link
          color="#3f9ea3"
          href="/icon/safari-pinned-tab.svg?v=1"
          rel="mask-icon"
        />
        <link href="/icon/favicon.ico?v=1" rel="shortcut icon" />
        <meta content="#a8d3d5" name="msapplication-TileColor" />
        <meta
          content="/icon/browserconfig.xml?v=1"
          name="msapplication-config"
        />
        <meta content="#2e2e2e" name="theme-color" />
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
