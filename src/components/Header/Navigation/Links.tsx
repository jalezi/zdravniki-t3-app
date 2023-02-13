import NextJsLink from 'next/link';
import { useRouter } from 'next/router';

import { IconButton } from '@/components/Shared/Buttons';
import { FbSvg, TwSvg } from '@/components/Shared/Icons';

import { ActiveLink } from '../Link';

const externalAttributes = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

const sledilnikLinks = [
  {
    href: 'https:://Covid-19.sledilnik.org/donate',
    label: 'Support!',
    ...externalAttributes,
  },
  {
    href: 'https://covid-19.sledilnik.org/',
    label: 'Sledilnik.org',
    ...externalAttributes,
  },
];

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
  ...sledilnikLinks,
].map(link => ({ ...link, hasLocale: true }));

export const PageLinks = () => {
  const { locale } = useRouter();

  return (
    <>
      {pageLinks.map(({ href, label, hasLocale, ...rest }) => (
        <li key={href}>
          <ActiveLink
            as={NextJsLink}
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
