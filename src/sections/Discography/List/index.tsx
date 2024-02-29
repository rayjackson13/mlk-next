/* eslint-disable react-hooks/exhaustive-deps */
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from './ReleaseList.module.scss';

import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';
import { getYear } from 'utils/helpers/getYear';

type Props = {
  albums: Album[];
};

export const ReleaseList = ({ albums }: Props): JSX.Element => (
  <div className={styles.grid}>
    {albums.map((album) => {
      const type = getTranslation(album.type);

      return (
        <Link
          className={styles.album}
          href={`/release/${album.slug}`}
          key={album.slug}
        >
          <div className={styles.imageWrap}>
            {album.art && (
              <Image
                alt="image"
                sizes="(max-width: 570px) 250px, 400px"
                src={album.art}
              />
            )}

            <div className={styles.iconHolder}>
              <FontAwesomeIcon color="#fff" fontSize={36} icon={faPlay} />
            </div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{album.title}</h3>
            <p className={styles.date}>
              {type} • {getYear(album.date)}
            </p>
          </div>
        </Link>
      );
    })}
  </div>
);
