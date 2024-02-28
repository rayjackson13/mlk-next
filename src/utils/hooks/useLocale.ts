import { useContext } from 'react';

import { LocaleContext } from 'context/locale';

export const useLocale = (): string => useContext(LocaleContext);
