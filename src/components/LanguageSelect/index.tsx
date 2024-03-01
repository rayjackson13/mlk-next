import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';

import styles from './LanguageSelect.module.scss';

import { Lang, Locales } from 'constants/locales';
import { useLocale } from 'utils/hooks/useLocale';

type Props = {
  locale: string;
  onSelect: () => unknown;
  path: string;
  preview: string;
};

const Option = ({ locale, onSelect, path, preview }: Props): JSX.Element => (
  <Link
    className={styles.option}
    href={path}
    hrefLang={locale}
    locale={locale}
    onClick={onSelect}
  >
    {preview}
  </Link>
);

export const LanguageSelect = (): JSX.Element => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const currentLocale = useLocale();

  const localePreview = useMemo(
    () =>
      Locales.find(({ locale }) => locale === currentLocale)?.preview ??
      currentLocale,
    [currentLocale],
  );

  const close = useCallback(() => setOpen(false), []);

  const toggleDropdown = useCallback(() => setOpen((open) => !open), []);

  const renderOption = useCallback(
    ({ locale, preview }: Lang): JSX.Element => (
      <li key={locale}>
        <Option
          locale={locale}
          onSelect={close}
          path={router.asPath}
          preview={preview}
        />
      </li>
    ),
    [close, router.asPath],
  );

  return (
    <div className={styles.root}>
      <button
        className={clsx(styles.button, isOpen && styles.buttonOpen)}
        onClick={toggleDropdown}
        type="button"
      >
        {localePreview}
        <span className={styles.arrow}>
          <FontAwesomeIcon fixedWidth icon={faChevronDown} />
        </span>
      </button>

      <ul className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)}>
        {Locales.map(renderOption)}
      </ul>
    </div>
  );
};
