/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next';

import type about from './public/locales/sl/about.json';
import type common from './public/locales/sl/common.json';
import type doctor from './public/locales/sl/doctor.json';
import type map from './public/locales/sl/map.json';
import type seo from './public/locales/sl/seo.json';

interface I18nNamespaces {
  about: typeof about;
  common: typeof common;
  doctor: typeof doctor;
  map: typeof map;
  seo: typeof seo;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }
}
