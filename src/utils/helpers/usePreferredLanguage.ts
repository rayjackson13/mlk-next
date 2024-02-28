export const getPreferredLanguage = (): string => {
  if (!global.navigator) return 'en';

  return global.navigator.language;
};
