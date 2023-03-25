import type { URL } from 'url';

import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

type DoctorWebsiteProps = {
  href: URL['href'];
  text: string;
};

const DoctorWebsite = ({ href, text }: DoctorWebsiteProps) => {
  return (
    <Button
      as="a"
      href={href}
      container="span"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="LinkSvg" size="xxl" /> {text}
    </Button>
  );
};

export default DoctorWebsite;
