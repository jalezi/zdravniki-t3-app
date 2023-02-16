import { clsx } from 'clsx';
// import {
//   IT as ItalianFlag,
//   SL as SloFlag,
//   US as USAFlag,
// } from 'country-flag-icons/string/3x2';
import { useRouter } from 'next/router';
import { useWindowSize } from 'usehooks-ts';

import { type localesMap } from '@/../next-i18next.config';
import Select from '@/components/Shared/Select/Select';

import styles from './LanguageSelector.module.css';

type OnlyLangs = Omit<typeof localesMap, 'default'>;

type Langs = {
  [key in keyof OnlyLangs as Uppercase<key>]: Capitalize<OnlyLangs[key]>;
};

const langs: Langs = {
  EN: 'English',
  IT: 'Italiano',
  SL: 'Slovenščina',
};

const flags = {
  EN: '🇬🇧',
  SL: '🇸🇮',
  IT: '🇮🇹',
} as const;

// should match breakpoints in src/styles/variables.css
const BREAKPOINTS = {
  xxs: 0,
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

const LanguageSelector = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const options = Object.entries(langs).map(([value, label]) => {
    const flag = flags[`${value as keyof typeof flags}`];
    return {
      value: flag + ' ' + value,
      label: flag + ' ' + label,
    };
  });

  const position = isMediumMediaQuery ? 'bottom-right' : 'top-right';

  const localeUpperCase = router.locale?.toUpperCase() as keyof typeof langs;
  const flag = flags[`${localeUpperCase}`] as keyof typeof flags;
  const value = flag + ' ' + localeUpperCase;

  return (
    <Select
      options={options}
      name="language-selector"
      value={value}
      onChange={value => {
        const lang = value.split(' ')?.[1]?.toLowerCase();
        if (!lang) return;
        void router.push(router.asPath, router.asPath, {
          locale: lang,
        });
      }}
      placeholder="Select language"
      position={position}
      selectedStyle={clsx(styles.LanguageSelector, styles.SelectedOption)}
      dropdownStyle={clsx(styles.LanguageSelector, styles.Dropdown)}
      dropdownItemStyle={clsx(styles.LanguageSelector, styles.DropdownItem)}
    />
  );
};

export default LanguageSelector;
