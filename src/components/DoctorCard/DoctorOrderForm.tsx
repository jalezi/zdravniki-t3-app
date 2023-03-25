import type { URL } from 'url';

import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import type { UrlOrEmailTransformSchema } from '@/lib/types/doctors';

type DoctorOrderFormProps = {
  href: URL['href'];
  variant: UrlOrEmailTransformSchema['type'];
  text: string;
};

const DoctorOrderForm = ({ href, text, variant }: DoctorOrderFormProps) => {
  const target = variant === 'url' ? '_blank' : undefined;
  const rel = variant === 'url' ? 'noopener noreferrer' : undefined;

  return (
    <Button as="a" href={href} container="span" target={target} rel={rel}>
      <Icon name="BookingSvg" size="xxl" /> {text}
    </Button>
  );
};

export default DoctorOrderForm;
