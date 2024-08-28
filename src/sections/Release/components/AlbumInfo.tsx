import { getYear } from 'date-fns';
import { useCallback } from 'react';

import styles from '../Release.module.scss';

import { StreamLink } from 'components/StreamLink';
import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  album: Album;
};

export const AlbumInfo = ({ album }: Props): JSX.Element => {
  const type = getTranslation(album.type);

  const renderLinks = useCallback(
    (): JSX.Element[] | null =>
      album.links.map(({ service, url }, index) => (
        <li key={index}>
          <StreamLink href={url} releaseName={album.title} variant={service} />
        </li>
      )),
    [album],
  );

  return (
    <div className={styles.right}>
      <div className={styles.summary}>
        <p className={styles.desc}>{album?.title}</p>
        <p className={styles.date}>
          {type} • {getYear(album.date)}
        </p>
      </div>

      <ul className={styles.links}>{renderLinks()}</ul>
    </div>
  );
};
