import { Link as LinkBase } from 'gatsby';
import React, { ComponentProps } from 'react';

import { useLocale } from 'utils/hooks/useLocale';

type Props = Omit<ComponentProps<typeof LinkBase<unknown>>, 'ref'>;

export const Link = (props: Props): JSX.Element => {
  const locale = useLocale();
  const path = `/${locale}${props.to}`;

  return <LinkBase {...props} to={path} />;
};

Link.displayName = 'LocalizedLink';
