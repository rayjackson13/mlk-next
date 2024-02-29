/* eslint-disable @next/next/no-img-element */

import { useCallback } from 'react';

import { ImageExtRegex, ImageSizes } from 'constants/images';

type Props = {
  alt: string;
  className?: string;
  sizes?: string;
  src: string;
};

export const Image = ({
  alt,
  className,
  sizes = '(max-width: 767px) 400px, 700px',
  src,
}: Props): JSX.Element => {
  const fileName = src
    .replace(ImageExtRegex, '')
    .replace('/images', '/images/_optimized');

  const getSrcSet = useCallback(
    (ext: string): string =>
      ImageSizes.map((size) => `${fileName}/${size}w.${ext} ${size}w`).join(
        ', ',
      ),
    [fileName],
  );

  return (
    <picture>
      <source sizes={sizes} srcSet={getSrcSet('webp')} type="image/webp" />

      <img
        alt={alt}
        className={className}
        loading="lazy"
        sizes={sizes}
        src={src}
        srcSet={getSrcSet('png')}
      />
    </picture>
  );
};
