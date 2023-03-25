import type { URL } from 'url';

import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

type WebsiteProps = {
  href: URL['href'];
  text: string;
};

const Website = ({ href, text }: WebsiteProps) => {
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

export default Website;
