/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next';

import type abbreviations from './public/locales/sl/abbreviations.json';
import type about from './public/locales/sl/about.json';
import type common from './public/locales/sl/common.json';
import type doctor from './public/locales/sl/doctor.json';
import type dr_report_error from './public/locales/sl/dr-report-error.json';
import type faq from './public/locales/sl/faq.json';
import type map from './public/locales/sl/map.json';
import type seo from './public/locales/sl/seo.json';

interface I18nNamespaces {
  abbreviations: typeof abbreviations;
  about: typeof about;
  common: typeof common;
  doctor: typeof doctor;
  ['dr-report-error']: typeof dr_report_error;
  faq: typeof faq;
  map: typeof map;
  seo: typeof seo;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }
}
