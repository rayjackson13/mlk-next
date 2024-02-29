import clsx from 'clsx';
import React from 'react';

import styles from './NotFound.module.scss';

import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  countdown: number;
};

export const NotFound = ({ countdown }: Props): JSX.Element => {
  const seconds = Math.round(countdown / 1000);
  const title = getTranslation('notFoundTitle');
  const desc = getTranslation('notFoundDesc').replace('#', seconds.toString());

  return (
    <div className={clsx('section', styles.root)}>
      <div className={styles.wrap}>
        <h2 className={styles.text}>{title}</h2>
        <p className={styles.text}>{desc}</p>
      </div>
    </div>
  );
};
