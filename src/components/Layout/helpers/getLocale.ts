import { getLocaleFromURI } from 'utils/helpers/getLocaleFromURI';
import { getPreferredLanguage } from 'utils/helpers/usePreferredLanguage';

export const getLocale = (locale: string, pathname: string): string => {
  const localeURI = getLocaleFromURI(pathname);
  const preferredLocale = getPreferredLanguage();

  return locale ?? localeURI ?? preferredLocale ?? 'en';
};
