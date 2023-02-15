import { clsx } from 'clsx';
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
  SL: 'Slovenščina',
  IT: 'Italiano',
};

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
  const options = Object.entries(langs).map(([value, label]) => ({
    value,
    label,
  }));

  const position = isMediumMediaQuery ? 'bottom-right' : 'top-right';

  return (
    <Select
      options={options}
      name="language-selector"
      value={router.locale?.toUpperCase()}
      onChange={value => {
        void router.push(router.asPath, router.asPath, {
          locale: value.toLowerCase(),
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
