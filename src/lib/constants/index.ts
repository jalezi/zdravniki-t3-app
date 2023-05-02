// should match breakpoints in src/lib/styles/variables.css
export const BREAKPOINTS = {
  xxs: 0,
  xs: 375,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  xxl: 1400,
} as const;

export const GIT_REPO_URL = 'https://github.com/jalezi/zdravniki-t3-app';

export * as DATA_URL from './data-url';

export * as MAP from './map';
