import { clsx } from 'clsx';
import { z } from 'zod';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Typography.module.css';

const allowedAsSchema = z.enum([
  'body1',
  'body2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
]);

const allowedElementSchema = z.enum([
  'address',
  'h1',
  'h2',
  'h3',
  'h4',
  'strong',
  'p',
]);

const customProps = z.object({
  as: allowedAsSchema.optional().default('h2').optional(),
  element: allowedElementSchema.optional().default('h3').optional(),
});

type AllowedAs = z.infer<typeof allowedAsSchema>;

type AllowedElement = z.infer<typeof allowedElementSchema>;

export type CustomProps = z.infer<typeof customProps>;

export type TypographyProps = CustomProps &
  Omit<PolymorphicComponentProps<AllowedElement>, 'as'>;

const CLASS_NAME = {
  body1: styles.Body1,
  body2: styles.Body2,
  h1: styles.H1,
  h2: styles.H2,
  h3: styles.H3,
  h4: styles.H4,
  h5: styles.H5,
  h6: styles.H6,
  strong: styles.Strong,
} satisfies Record<AllowedAs, string | undefined>;

const Typography = ({
  as = 'h2',
  element = 'h3',
  className,
  children,
  ...props
}: TypographyProps) => {
  const drNameStyles = clsx(styles.Typography, CLASS_NAME[`${as}`], className);

  return (
    <Polymorphic as={element} className={drNameStyles} {...props}>
      {children}
    </Polymorphic>
  );
};

export default Typography;
