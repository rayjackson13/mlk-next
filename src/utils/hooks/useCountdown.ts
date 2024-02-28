import { useEffect, useState } from 'react';

export const useCountdown = (targetDate: Date): number => {
  const targetTime = targetDate.getTime();

  const [countdown, setCountdown] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(targetTime - new Date().getTime());
    }, 1000);

    return (): void => clearInterval(interval);
  }, [countdown, targetTime]);

  return countdown;
};
