import { addSeconds } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

export const useCountdown = (): number => {
  const targetDate = useRef(addSeconds(new Date(), 10)).current;

  const [countdown, setCountdown] = useState(
    targetDate.getTime() - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return (): void => clearInterval(interval);
  }, [countdown, targetDate]);

  return countdown;
};
