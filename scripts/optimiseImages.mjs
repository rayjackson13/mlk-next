import path from 'path';

import fs from 'fs-extra';
import sharp from 'sharp';

const startTime = performance.now();
console.debug('   📷  Optimizing images:');

const formatPath = (pathString) => pathString.replace(/\//g, path.sep);

const paths = [
  path.resolve(process.cwd(), formatPath('public/images')),
  path.resolve(process.cwd(), formatPath('public/images/music')),
];
const ImageSizes = [250, 400, 700, 1000];
const ImageExtRegex = /.png|.jpg|.jpeg/;
const outputDir = path.resolve(
  process.cwd(),
  formatPath('public/images/_optimized'),
);

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
const promises = [];

files.forEach((file) => {
  const imagesPath = formatPath('/images/');
  const fileName = file.split(imagesPath)[1];
  console.debug(`   - ${fileName}`);
  const localPath = fileName.replace(ImageExtRegex, '');
  const dirPath = path.resolve(outputDir, localPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  ImageSizes.forEach((size) => {
    promises.push(
      sharp(file)
        .resize(size)
        .toFormat('png')
        .png({ progressive: true, quality })
        .toFile(formatPath(`${dirPath}/${size}w.png`)),
      sharp(file)
        .resize(size)
        .toFormat('webp')
        .toFile(formatPath(`${dirPath}/${size}w.webp`)),
    );
  });
});

Promise.all(promises).then(() => {
  const finishTime = performance.now() - startTime;
  console.debug(
    '\n',
    `  ✅  Image optimization finished in ${(finishTime / 1000).toFixed(2)}`,
    '\n',
  );
});
