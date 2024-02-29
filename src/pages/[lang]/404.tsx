import { addSeconds } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { Locales } from 'constants/locales';
import { NotFound } from 'sections/NotFound';
import { loadLocale } from 'utils/helpers/loadLocale';
import { useCountdown } from 'utils/hooks/useCountdown';
import { useLocale } from 'utils/hooks/useLocale';

type Params = {
  lang: string;
};

type Props = {
  lang: string;
};

const initialDate = new Date();

export default function NotFoundPage(): JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const countdown = useCountdown(addSeconds(initialDate, 10));

  const redirect = useCallback(() => {
    router.push(`/${locale}/`);
  }, [locale, router]);

  useEffect(() => {
    if (countdown > 0) return;

    redirect();
  }, [countdown, redirect]);

  return <NotFound countdown={countdown} />;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Locales.map((lang) => ({
    params: {
      lang: lang.locale,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = (rest) => {
  const { params } = rest;
  console.log(rest);
  const lang = params?.lang ?? 'en';
  const translations = loadLocale(lang);

  return {
    props: {
      lang: params?.lang ?? 'en',
      translations,
    },
  };
};
