import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import styles from './Navbar.module.scss';

import Logo from 'assets/svg/logo.svg';
import { Socials } from 'components/Socials';

type Props = {
  isIndexPage?: boolean;
};

export const Navbar = ({ isIndexPage = false }: Props): JSX.Element => {
  const ref = useRef<HTMLElement>(null);

  const handleScroll = (): void => {
    if (window.scrollY > 0) {
      ref.current?.classList.add('navbar-scroll');
      return;
    }

    ref.current?.classList.remove('navbar-scroll');
  };

  const setHeaderHeight = (): void => {
    const root = document.querySelector(':root');

    if (!ref.current || !root) return;

    const { height } = ref.current?.getBoundingClientRect();
    (root as HTMLElement).style.setProperty('--header-height', `${height}px`);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    /* eslint-disable-next-line compat/compat */
    const resizeObserver = new ResizeObserver(setHeaderHeight);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header className={styles.root}>
      <nav
        className={clsx('navbar', styles.navbar, isIndexPage && 'navbar-index')}
        ref={ref}
      >
        <div className={styles.container}>
          <Link
            aria-label="Go to homepage"
            className={clsx('brand', styles.logo)}
            href="/"
          >
            <Logo />
          </Link>

          <div className={styles.right}>
            <Socials />
          </div>
        </div>
      </nav>
    </header>
  );
};
