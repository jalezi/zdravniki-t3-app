import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

type CountdownProps = {
  deadline: number;
};

const Countdown = ({ deadline }: CountdownProps) => {
  const { t } = useTranslation('common');

  const [count, setCount] = useState(deadline / 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <span>
      {t('seconds.inSecondsWithCount', {
        count,
        defaultValue: 'seconds',
      })}
    </span>
  );
};

export default Countdown;
