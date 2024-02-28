export const getTranslation = (id: string): string =>
  global.translations?.[id] ?? id;
