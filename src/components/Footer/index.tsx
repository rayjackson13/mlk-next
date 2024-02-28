import React, { useEffect, useRef } from 'react';

import * as styles from './Footer.module.scss';

import { getTranslation } from 'utils/helpers/getTranslation';

export const Footer = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);

  const setFooterHeight = (): void => {
    const root = document.querySelector(':root');

    if (!ref.current || !root) return;

    const { height } = ref.current?.getBoundingClientRect();
    (root as HTMLElement).style.setProperty('--footer-height', `${height}px`);
  };

  useEffect(() => {
    if (!ref.current) return;

    /* eslint-disable-next-line compat/compat */
    const resizeObserver = new ResizeObserver(setFooterHeight);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
