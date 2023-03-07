import { clsx } from 'clsx';

import styles from './CircleChart.module.css';
import type { PolymorphicComponentProps } from '../Polymorphic';

export type CircleChartProps = {
  value: number;
} & Omit<PolymorphicComponentProps<'span'>, 'children' | 'as'>;

const CircleChart = ({ value, className, ...props }: CircleChartProps) => {
  const percentage = value * 100;

  const circleChartStyles = clsx(styles.CircleChart, className);

  return (
    <span className={circleChartStyles} {...props}>
      <svg className={styles.Svg} width="1em" height="1em" viewBox="0 0 36 36">
        <path
          className={styles.Path1}
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={styles.Path2}
          fill="none"
          strokeDasharray={`${percentage} 100`}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </span>
  );
};

export default CircleChart;
