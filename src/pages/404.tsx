import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

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

export default function NotFoundPage(): JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const countdown = useCountdown();

  const redirect = useCallback(() => {
    router.push(`/${locale}/`);
  }, [locale, router]);

  useEffect(() => {
    if (countdown > 0) return;

    redirect();
  }, [countdown, redirect]);

  return <NotFound countdown={countdown} />;
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ locale }) => {
  const lang = locale ?? 'en';
  const translations = loadLocale(lang);

  return {
    props: {
      lang: lang,
      translations,
    },
  };
};
