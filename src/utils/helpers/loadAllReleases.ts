import path from 'path';

import fs from 'fs-extra';
import matter from 'gray-matter';

import { Album } from 'types';

export const loadAllReleases = (): Album[] => {
  const directory = path.resolve('src/data/releases');
  const files = fs.readdirSync(directory);
  return files
    .map((file) => {
      const contents = fs.readFileSync(path.resolve(directory, file), 'utf-8');
      return matter(contents).data as Album;
    })
    .filter((album) => !album.hidden)
    .toSorted((a, b) => (b.date > a.date ? 1 : -1));
};
