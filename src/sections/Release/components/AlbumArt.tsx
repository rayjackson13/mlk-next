import styles from '../Release.module.scss';

import { Image } from 'components/Image';

type Props = {
  src: string;
  title: string;
};

export const AlbumArt = ({ src, title }: Props): JSX.Element => (
  <div className={styles.album}>
    {src && (
      <Image
        alt={`${title} album art`}
        className={styles.albumArt}
        sizes="(max-width: 767px) 250px, (max-width: 1399px) 400px, 700px"
        src={src}
      />
    )}
  </div>
);
