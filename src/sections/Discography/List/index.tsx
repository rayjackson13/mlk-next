/* eslint-disable react-hooks/exhaustive-deps */
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import * as styles from './ReleaseList.module.scss';

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
      const image = getImage(album.imageSmall);
      const type = getTranslation(album.type);

      return (
        <Link
          className={styles.album}
          key={album.id}
          to={`/release/${album.slug}`}
        >
          <div className={styles.imageWrap}>
            {image && <GatsbyImage alt="image" image={image} />}

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
