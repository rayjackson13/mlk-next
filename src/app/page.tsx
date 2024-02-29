'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromURI } from 'utils/helpers/getLocaleFromURI';
import { getPreferredLanguage } from 'utils/helpers/usePreferredLanguage';

export default function IndexPage(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const lang =
    getLocaleFromURI(pathname ?? '') ?? getPreferredLanguage() ?? 'en';

  useEffect(() => {
    router.replace(`/${lang}/`);
  }, [lang, router]);

  return <main />;
}
