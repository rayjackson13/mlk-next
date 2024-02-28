import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import * as styles from './Background.module.scss';

export const Background = (): JSX.Element => (
  <div className={styles.bg}>
    <StaticImage
      alt=""
      className={styles.img}
      height={1000}
      src="../../assets/img/me.jpeg"
      width={1000}
    />
    <div className={styles.gradient} />
  </div>
);
