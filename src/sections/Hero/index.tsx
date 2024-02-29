import clsx from 'clsx';
import Image from 'next/image';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './Hero.module.scss';

import Arrow from 'assets/img/arrow-down.svg';
import Logo from 'assets/svg/logo.svg';

type Props = {
  nextSectionRef: RefObject<HTMLElement>;
};

export const Hero = ({ nextSectionRef }: Props): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const [isArrowVisible, setArrowVisible] = useState(true);

  const onContinueClick = (): void => {
    if (!nextSectionRef.current) return;

    const { y: yOffset } = nextSectionRef.current.getBoundingClientRect();
    const header = document.querySelector('nav.navbar');
    const headerRect = header?.getBoundingClientRect();
    const headerHeight = headerRect?.height ?? 96;

    window.scrollTo({
      behavior: 'smooth',
      top: yOffset - headerHeight + 4,
    });
  };

  const onScroll = useCallback(() => {
    const scrollExceedsThreshold = window.scrollY > window.innerHeight / 10;
    if (isArrowVisible && scrollExceedsThreshold) setArrowVisible(false);

    if (!isArrowVisible && !scrollExceedsThreshold) setArrowVisible(true);
  }, [isArrowVisible]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <header className={styles.root} ref={ref}>
      <div className={styles.content}>
        <div className={styles.about}>
          <div className={styles.imageContainer}>
            <Image
              alt="Ray 7ackson | Kostya"
              className={clsx(styles.aboutImg, styles.aboutImgCopy)}
              height={700}
              priority
              src="/images/me.jpg"
              width={700}
            />
            <Image
              alt="Ray 7ackson | Kostya"
              className={styles.aboutImg}
              height={700}
              priority
              src="/images/me.jpg"
              width={700}
            />
            <Image
              alt="Ray 7ackson | Kostya"
              className={clsx(styles.aboutImg, styles.aboutImgCopy)}
              height={700}
              priority
              src="/images/me.jpg"
              width={700}
            />
          </div>

          <div className={styles.captionWrap}>
            <Logo className={styles.aboutCaption} />
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <button
            aria-label="Scroll down"
            className={clsx(
              styles.button,
              !isArrowVisible && styles.buttonHidden,
            )}
            onClick={onContinueClick}
            type="button"
          >
            <Arrow className={styles.arrow} />
          </button>
        </div>
      </div>
    </header>
  );
};
