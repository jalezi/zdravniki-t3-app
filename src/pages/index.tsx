import { type NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { HTMLAttributes } from 'react';
import { useRef } from 'react';

import IconButton from '@/components/Shared/Buttons/IconButton/IconButton';
import type { SelectRefProps } from '@/components/Shared/Select/Select';
import Select from '@/components/Shared/Select/Select';
import type { Locale } from '@/lib/types/i18n.js';

import nextI18nextConfig from '../../next-i18next.config.js';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  const tempDivStyle: HTMLAttributes<HTMLDivElement>['style'] = {
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: '1rem',
  };

  const ref = useRef<HTMLAnchorElement>(null);

  const selectRef = useRef<SelectRefProps>(null);

  return (
    <>
      <h1>{t`test`}</h1>
      <br />
      <div style={tempDivStyle}>
        <IconButton as={Link} href="/about">
          about
        </IconButton>
        <IconButton as={Link} href="/" locale="sl">
          SL
        </IconButton>
        <IconButton as={Link} href="/" locale="en">
          EN
        </IconButton>
        <IconButton as={Link} href="/" locale="it">
          IT
        </IconButton>
      </div>
      <div style={tempDivStyle}>
        <div style={{ display: 'inline-block', marginInline: 'auto' }}>
          <Select
            ref={selectRef}
            options={[
              { value: 'en', label: 'English' },
              { value: 'sl', label: 'Slovenščina' },
              { value: 'it', label: 'Italiano' },
            ]}
            name="language-selector"
          />
        </div>
      </div>
      <div style={tempDivStyle}>
        <IconButton type="button">Button</IconButton>
        <IconButton as="a" href="/sl" ref={ref}>
          Normal link
        </IconButton>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
      // Will be passed to the page component as props
    },
  };
}
