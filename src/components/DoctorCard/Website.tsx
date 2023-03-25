import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import { urlTransformSchema } from '@/lib/types/doctors';

const Website = ({ website }: { website: string }) => {
  const websiteUrl = urlTransformSchema.safeParse(website);

  if (websiteUrl.success) {
    return (
      <Button
        key={website}
        as="a"
        href={websiteUrl.data.href}
        container="span"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="LinkSvg" size="xxl" />{' '}
        {websiteUrl.data.host.replaceAll('www.', '')}
      </Button>
    );
  }

  return null;
};

export default Website;
