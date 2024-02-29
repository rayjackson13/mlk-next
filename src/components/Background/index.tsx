import Image from 'next/image';
import React from 'react';

import styles from './Background.module.scss';

import backgroundImage from 'assets/img/me.jpeg';

export const Background = (): JSX.Element => (
  <div className={styles.bg}>
    <Image
      alt=""
      className={styles.img}
      height={1000}
      sizes="(max-height: 767px) 100vw, 1000px"
      src={backgroundImage}
      width={1000}
    />
    <div className={styles.gradient} />
  </div>
);
