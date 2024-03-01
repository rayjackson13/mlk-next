import React from 'react';

import styles from './Background.module.scss';

import { Image } from 'components/Image';

export const Background = (): JSX.Element => (
  <div className={styles.bg}>
    <Image
      alt="mellamokostya"
      className={styles.img}
      sizes="(max-width: 767px) 700px, 1000px"
      src="/images/me.jpg"
    />
    <div className={styles.gradient} />
  </div>
);
