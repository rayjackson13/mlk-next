import { Locales } from 'constants/locales';

export const isIndexPage = (uri: string): boolean => {
  const appLocales = Locales.map(({ locale }) => locale);
  const regex = new RegExp(`^\/(${appLocales.join('|')})?(\/)?$`);
  if (!uri || uri.match(regex)) return true;

  return false;
};
