/* eslint-disable @typescript-eslint/explicit-function-return-type */

import path from 'path';

import fs from 'fs-extra';
import sharp from 'sharp';

const paths = [path.resolve(process.cwd(), 'public/images')];

const sizes = [250, 400, 700, 1000];
const quality = 80;

const getFilesFromDirectory = (dir) =>
  fs
    .readdirSync(dir)
    .map((file) => path.resolve(process.cwd(), dir, file))
    .filter((file) => !fs.lstatSync(file).isDirectory());

const getFilesArray = () => paths.map(getFilesFromDirectory).flat();

const files = getFilesArray();

files.forEach((file) => {
  // const split = file.split('/');
  // const filePath = split[split.length - 1];
  const dirPath = file.replace(/.png|.jpg|.jpeg/, '');
  fs.mkdirSync(dirPath);

  sizes.forEach((size) => {
    sharp(file)
      .resize(size)
      .toFormat('png')
      .png({ progressive: true, quality: 80 })
      .toFile(`${dirPath}/${size}w.png`);
    sharp(file)
      .resize(size)
      .toFormat('webp')
      .toFile(`${dirPath}/${size}w.webp`);
  });
});
