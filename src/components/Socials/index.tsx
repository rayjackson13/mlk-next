import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

import styles from './Socials.module.scss';
import { getIcon } from './helpers/getIcon';
import socialInfo from './social.json';

import { LanguageSelect } from 'components/LanguageSelect';
import { Analytics, Events } from 'utils/analytics';
// import { Analytics, Events } from 'utils/analytics';

type MediaLink = {
  icon: string;
  name: string;
  url: string;
};

type ItemProps = {
  link: MediaLink;
};

const SocialItem = ({ link }: ItemProps): JSX.Element => {
  const onClick = useCallback((): void => {
    Analytics.track(Events.SocialClicked, {
      type: link.name,
      url: link.url,
    });
  }, [link.name, link.url]);

  return (
    <li>
      <a
        aria-label={link.name}
        className={styles.link}
        href={link.url}
        onClick={onClick}
        rel="nofollow noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon fixedWidth icon={getIcon(link.icon)} />
      </a>
    </li>
  );
};

export const Socials = (): JSX.Element => (
  <div className={styles.root}>
    <ul className={styles.social}>
      {socialInfo.socialMedia.map((link, key) => (
        <SocialItem key={key} link={link} />
      ))}
    </ul>

    <div className={styles.divider} />

    <ul className={styles.social}>
      {socialInfo.streamingPlatforms.map((link, key) => (
        <SocialItem key={key} link={link} />
      ))}
    </ul>

    <div className={styles.divider} />

    <LanguageSelect />
  </div>
);
