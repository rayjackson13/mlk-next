import Image from 'next/image';
import React from 'react';

import styles from './Background.module.scss';

export const Background = (): JSX.Element => (
  <div className={styles.bg}>
    <Image
      alt=""
      className={styles.img}
      height={1000}
      sizes="(max-height: 767px) 100vw, 1000px"
      src="/images/me.jpg"
      width={1000}
    />
    <div className={styles.gradient} />
  </div>
);
