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

  const currentPath = useMemo(
    (): string => `${baseURL}/${lang}${path}`,
    [baseURL, lang, path],
  );

  return (
    <Head>
      <title>{titleText}</title>
      <meta content={titleText} name="og:title" />
      <meta content={titleText} property="twitter:title" />
      <meta content={descText} name="description" />
      <meta content={descText} name="og:description" />
      <meta content={descText} property="twitter:description" />
      <meta content={imageURL} name="og:image" />
      <meta content={imageURL} name="twitter:image" />
      <meta content="summary" property="twitter:card" />
      <meta content="website" name="og:type" />
      <meta content={currentPath} property="og:url" />
      {renderAlternateLinks()}
    </Head>
  );
}
