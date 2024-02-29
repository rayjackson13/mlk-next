import LinkBase from 'next/link';
import React, { ComponentProps } from 'react';

import { useLocale } from 'utils/hooks/useLocale';

type Props = Omit<ComponentProps<typeof LinkBase>, 'ref'>;

export const Link = (props: Props): JSX.Element => {
  const locale = useLocale();
  const path = `/${locale}${props.href}`;

  return <LinkBase {...props} href={path} />;
};

Link.displayName = 'LocalizedLink';
