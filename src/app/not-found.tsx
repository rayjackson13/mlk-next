'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromURI } from 'utils/helpers/getLocaleFromURI';

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const lang = getLocaleFromURI(pathname ?? '');

  useEffect(() => {
    router.replace(`/${lang}/404`);
  }, [lang, router]);

  return <main />;
}
