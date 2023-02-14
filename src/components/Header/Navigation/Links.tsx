import NextJsLink from 'next/link';
import { useRouter } from 'next/router';

import { IconButton } from '@/components/Shared/Buttons';
import { FbSvg, TwSvg } from '@/components/Shared/Icons';

import { ActiveLink } from '../Link';

const a = 'a' as const;

const externalAttributes = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

const sledilnikLinks = [
  {
    href: 'https://covid-19.sledilnik.org/donate',
    label: 'Support!',
  },
  {
    href: 'https://covid-19.sledilnik.org',
    label: 'Sledilnik.org',
  },
].map(link => ({ ...link, as: a, hasLocale: false, ...externalAttributes }));

const pageLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/faq/',
    label: 'FAQ',
  },
  {
    href: '/about/',
    label: 'About',
  },
].map(link => ({ ...link, hasLocale: true, as: NextJsLink }));

const mainLinks = [...pageLinks, ...sledilnikLinks];

export const PageLinks = () => {
  const { locale } = useRouter();

  return (
    <>
      {mainLinks.map(({ href, label, as, hasLocale, ...rest }) => (
        <li key={href}>
          <ActiveLink
            as={as}
            href={href}
            locale={hasLocale ? locale : undefined}
            data-keep-focus="true"
            {...rest}
          >
            {label}
          </ActiveLink>
        </li>
      ))}
    </>
  );
};

const socialLinks = [
  {
    href: 'https://twitter.com/sledilnik',
    label: 'Twitter',
    icon: <TwSvg />,
  },
  {
    href: 'https://www.facebook.com/sledilnik',
    label: 'Facebook',
    icon: <FbSvg />,
  },
];

export const SocialLinks = () => {
  return (
    <>
      {socialLinks.map(({ href, label, icon }) => (
        <li key={href}>
          <IconButton
            as="a"
            href={href}
            aria-label={label}
            {...externalAttributes}
            data-keep-focus="true"
          >
            {icon}
          </IconButton>
        </li>
      ))}
    </>
  );
};
