import { format } from 'date-fns';

export const getYear = (date: string): string => format(date, 'yyyy');
