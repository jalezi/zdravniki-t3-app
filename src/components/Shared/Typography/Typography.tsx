import { clsx } from 'clsx';
import { z } from 'zod';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Typography.module.css';

const allowedAsSchema = z.enum(['body2', 'h2', 'strong']);

const allowedElementSchema = z.enum(['address', 'h3', 'h4']);

const customProps = z.object({
  as: allowedAsSchema.optional().default('h2').optional(),
  element: allowedElementSchema.optional().default('h3').optional(),
});

type AllowedAs = z.infer<typeof allowedAsSchema>;

type AllowedElement = z.infer<typeof allowedElementSchema>;

type CustomProps = z.infer<typeof customProps>;

export type TypographyProps = CustomProps &
  Omit<PolymorphicComponentProps<AllowedElement>, 'as'>;

const CLASS_NAME = {
  body2: styles.Body2,
  h2: styles.H2,
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
