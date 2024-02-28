import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

import * as styles from './StreamLink.module.scss';

import { StreamingServices } from 'constants/streamServices';
import { Analytics, Events } from 'utils/analytics';

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

  const onClick = useCallback(() => {
    Analytics.track(Events.StreamClicked, {
      songName: releaseName,
      type: name,
      url: href,
    });
  }, [href, name, releaseName]);

  return (
    <a
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
