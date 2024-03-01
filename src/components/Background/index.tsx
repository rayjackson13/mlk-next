import React from 'react';

import styles from './Background.module.scss';

import { Image } from 'components/Image';

export const Background = (): JSX.Element => (
  <div className={styles.bg}>
    <Image
      alt=""
      className={styles.img}
      sizes="(max-width: 767px) 700w, 1000px"
      src="/images/me.jpg"
    />
    <div className={styles.gradient} />
  </div>
);
