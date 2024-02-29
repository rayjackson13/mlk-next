import 'styles/style.scss';
import '@fortawesome/fontawesome-free/js/all';

import { AppProps } from 'next/app';

import { Layout } from 'components/Layout';
import { Translations } from 'types';

type Props = AppProps<{ lang: string; translations: Translations }>;

const App = ({ Component, pageProps, router }: Props): JSX.Element => (
  <Layout
    locale={pageProps.lang}
    path={router.asPath}
    translations={pageProps.translations}
  >
    <Component {...pageProps} />
  </Layout>
);

export default App;
