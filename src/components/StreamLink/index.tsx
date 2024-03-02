import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

import styles from './StreamLink.module.scss';

import { StreamingServices } from 'constants/streamServices';
import { Analytics, Events } from 'utils/analytics';
import { getTranslation } from 'utils/helpers/getTranslation';

type Variant = 'apple' | 'spotify' | 'youtube' | 'soundcloud' | 'deezer';

type Props = {
  href: string;
  releaseName: string;
  variant: Variant;
};

export const StreamLink = ({
  href,
  releaseName,
  variant,
}: Props): JSX.Element => {
  const { backgroundColor, color, name, icon } = StreamingServices[variant];
  const label = getTranslation('releasePageStream')
    .replace('$title', releaseName)
    .replace('$service', name);

  const onClick = useCallback(() => {
    Analytics.track(Events.StreamClicked, {
      songName: releaseName,
      type: name,
      url: href,
    });
  }, [releaseName, name, href]);

  return (
    <a
      aria-label={label}
      className={styles.root}
      href={href}
      onClick={onClick}
      rel="noreferrer noopener nofollow"
      target="_blank"
    >
      <span className={styles.icon} style={{ backgroundColor, color }}>
        <FontAwesomeIcon fixedWidth icon={icon} />
      </span>

      <span className={styles.title}>{name}</span>

      <span className={styles.arrow}>
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </a>
  );
};
