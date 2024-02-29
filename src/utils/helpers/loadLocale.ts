import path from 'path';

import fs from 'fs-extra';
import matter from 'gray-matter';

import { Translations } from 'types';

export const loadLocale = (locale: string): Translations => {
  if (locale === 'default') {
    return {};
  }

  const file = path.resolve(process.cwd(), 'src/data/locales', `${locale}.md`);
  const contents = fs.readFileSync(file, 'utf-8');
  return matter(contents).data;
};
