import path from 'path';

import fs from 'fs-extra';
import sharp from 'sharp';

const paths = [
  path.resolve(process.cwd(), 'public/images'),
  path.resolve(process.cwd(), 'public/images/music'),
];
const ImageSizes = [250, 400, 700, 1000];
const ImageExtRegex = /.png|.jpg|.jpeg/;
const outputDir = path.resolve(process.cwd(), 'public/images/_optimized');

const quality = 80;

const getFilesFromDirectory = (dir) =>
  fs
    .readdirSync(dir)
    .map((file) => path.resolve(process.cwd(), dir, file))
    .filter(
      (file) => !fs.lstatSync(file).isDirectory() && file.match(ImageExtRegex),
    );

const getFilesArray = () => paths.map(getFilesFromDirectory).flat();

const files = getFilesArray();
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir);

files.forEach((file) => {
  const localPath = file.split('/images/')[1].replace(ImageExtRegex, '');
  const dirPath = path.resolve(outputDir, localPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  ImageSizes.forEach((size) => {
    sharp(file)
      .resize(size)
      .toFormat('png')
      .png({ progressive: true, quality })
      .toFile(`${dirPath}/${size}w.png`);
    sharp(file)
      .resize(size)
      .toFormat('webp')
      .toFile(`${dirPath}/${size}w.webp`);
  });
});
