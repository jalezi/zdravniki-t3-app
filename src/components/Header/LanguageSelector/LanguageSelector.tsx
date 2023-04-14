import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useWindowSize } from 'usehooks-ts';

import { type localesMap } from '@/../next-i18next.config';
import type { SelectBaseOption } from '@/components/Shared/Selects/SelectBase';
import { SelectBase } from '@/components/Shared/Selects/SelectBase';
import { BREAKPOINTS } from '@/lib/constants';

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

const LanguageSelector = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const options = Object.entries(langs).map(([value, label]) => {
    return {
      value,
      label,
      valueToShow: value.toUpperCase(),
    };
  }) satisfies SelectBaseOption[];

  const position = isMediumMediaQuery ? 'bottom-right' : 'top-right';

  const localeUpperCase = router.locale?.toUpperCase() as keyof typeof langs;

  return (
    <SelectBase
      options={options}
      name="language-selector"
      value={localeUpperCase}
      onChange={value => {
        void router.push(router.asPath, router.asPath, {
          locale: value.toLowerCase(),
        });
      }}
      placeholder="Select language"
      position={position}
      selectedStyle={clsx(
        styles.LanguageSelector,
        styles.SelectBase__selected_option
      )}
      dropdownStyle={clsx(styles.LanguageSelector, styles.SelectBase__dropdown)}
      dropdownItemStyle={clsx(
        styles.LanguageSelector,
        styles.SelectBase__dropdown_item
      )}
    />
  );
};

export default LanguageSelector;
