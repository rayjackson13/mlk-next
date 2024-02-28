import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import React, { useCallback, useMemo, useState } from 'react';

import * as styles from './LanguageSelect.module.scss';

import { Lang, Locales } from 'constants/locales';
import { useLocale } from 'utils/hooks/useLocale';

type Props = {
  locale: string;
  onSelect: (lang: string) => unknown;
  preview: string;
};

const Option = ({ locale, onSelect, preview }: Props): JSX.Element => {
  const onClick = (): unknown => onSelect(locale);

  return (
    <button className={styles.option} onClick={onClick} type="button">
      {preview}
    </button>
  );
};

export const LanguageSelect = (): JSX.Element => {
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

  const changeLang = useCallback(
    (locale: string): void => {
      if (currentLocale === locale) return;

      const { origin, href } = window.location;
      const url = href.replace(origin, '').replace(currentLocale, locale);
      navigate(url);
    },
    [currentLocale],
  );

  const onSelect = useCallback(
    (locale: string): void => {
      changeLang(locale);
      close();
    },
    [changeLang, close],
  );

  const renderOption = useCallback(
    ({ locale, preview }: Lang): JSX.Element => (
      <Option
        key={locale}
        locale={locale}
        onSelect={onSelect}
        preview={preview}
      />
    ),
    [onSelect],
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

      <div className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)}>
        {Locales.map(renderOption)}
      </div>
    </div>
  );
};
