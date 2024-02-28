import clsx from 'clsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { forwardRef, useCallback } from 'react';

import * as styles from './Release.module.scss';

import { StreamLink } from 'components/StreamLink';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';
import { getYear } from 'utils/helpers/getYear';

type Props = {
  album: Album;
  hasBorder?: boolean;
};

export const Release = forwardRef<HTMLElement, Props>(
  ({ album, hasBorder = true }, ref): JSX.Element | null => {
    const title = getTranslation('newRelease');
    const image = getImage(album.imageLarge);
    const type = getTranslation(album.type);

    const renderLinks = useCallback((): JSX.Element[] | null => {
      if (!album) return null;

      return album.links.map(({ service, url }, index) => (
        <li key={index}>
          <StreamLink href={url} releaseName={album.title} variant={service} />
        </li>
      ));
    }, [album]);

    const rootStyle = clsx('section', !hasBorder && styles.noBorder);

    return (
      <section className={rootStyle} ref={ref}>
        <div className="container">
          <h2 className="section__title">{title}</h2>

          <div className={styles.wrap}>
            <div className={styles.grid}>
              <div className={styles.album}>
                {image && (
                  <GatsbyImage
                    alt="image"
                    className={styles.albumArt}
                    image={image}
                  />
                )}
              </div>

              <div className={styles.right}>
                <div className={styles.summary}>
                  <p className={styles.desc}>{album?.title}</p>
                  <p className={styles.date}>
                    {type} • {getYear(album.date)}
                  </p>
                </div>

                <ul className={styles.links}>{renderLinks()}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Release.displayName = 'Latest Release';
