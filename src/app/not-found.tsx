import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function NotFoundPage(): JSX.Element {
  const lang = headers().get('x-site-locale') ?? 'en';
  redirect(`/${lang}/404`);

  return <main />;
}
