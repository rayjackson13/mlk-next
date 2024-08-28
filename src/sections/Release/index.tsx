import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Release.module.scss';
import { AlbumArt } from './components/AlbumArt';
import { AlbumInfo } from './components/AlbumInfo';

import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  album: Album;
  hasBorder?: boolean;
};

export const Release = forwardRef<HTMLElement, Props>(
  ({ album, hasBorder = true }, ref): JSX.Element | null => {
    const title = getTranslation('newRelease');
    const rootStyle = clsx('section', !hasBorder && styles.noBorder);

    return (
      <section className={rootStyle} ref={ref}>
        <div className="container">
          <h2 className="section__title">{title}</h2>

          <div className={styles.wrap}>
            <div className={styles.grid}>
              <AlbumArt src={album.art} title={album.title} />

              <AlbumInfo album={album} />
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Release.displayName = 'Latest Release';
