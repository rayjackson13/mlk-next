import { Locales } from 'constants/locales';

export const getLocaleFromURI = (uri: string): string | undefined => {
  const appLocales = Locales.map(({ locale }) => locale);
  const regexResult = uri.match(new RegExp(`\/(${appLocales.join('|')})\/`));
  if (!regexResult) return undefined;

  return regexResult[1];
};
