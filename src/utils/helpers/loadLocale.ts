import path from 'path';

import fs from 'fs-extra';
import matter from 'gray-matter';

import { Translations } from 'types';

export const loadLocale = (locale: string): Translations => {
  const file = path.resolve('src/data/locales', `${locale}.md`);
  const contents = fs.readFileSync(file, 'utf-8');
  return matter(contents).data;
};
