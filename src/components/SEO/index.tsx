import Head from 'next/head';

import { Locales } from 'constants/locales';
import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  description?: string;
  image?: string;
  path: string;
  title?: string;
};

export default function SEO({
  path,
  title,
  description,
  image,
}: Props): JSX.Element {
  const titleText = title ?? getTranslation('title');
  const descText = description ?? getTranslation('pageDescription');
  const imageURL = image ?? '/images/me.jpeg';

  const renderAlternateLinks = (): JSX.Element[] => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return Locales.map(({ locale }) => {
      const url = `${baseURL}/${locale}${path}`;
      return <link href={url} hrefLang={locale} key={locale} rel="alternate" />;
    });
  };

  return (
    <Head>
      <title>{titleText}</title>
      <meta content={descText} name="description" />
      <meta content={descText} name="og:description" />
      <meta content={titleText} name="og:title" />
      <meta content="website" name="og:type" />
      <meta content={imageURL} name="og:image" />
      {renderAlternateLinks()}
    </Head>
  );
}
