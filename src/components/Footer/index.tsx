import React, { useRef } from 'react';

import styles from './Footer.module.scss';

import { getTranslation } from 'utils/helpers/getTranslation';

export const Footer = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);

  const getRightsLine = (): string =>
    getTranslation('rights').split(/\s/).join('&nbsp;');

  return (
    <aside ref={ref}>
      <div className={styles.navbar}>
        <p className={styles.copy}>
          © mellamokostya 2015—{new Date().getFullYear()}.{' '}
          <span dangerouslySetInnerHTML={{ __html: getRightsLine() }} />.
        </p>
      </div>
    </aside>
  );
};
