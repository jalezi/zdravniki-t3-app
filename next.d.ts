import type {
  NextComponentType,
  NextLayoutComponentType,
  NextPageContext,
} from 'next';
import type { AppProps } from 'next/app';

declare module 'next' {
  type NextLayoutComponentType<P = unknown> = NextComponentType<
    NextPageContext,
    unknown,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = unknown> = AppProps & {
    Component: NextLayoutComponentType<P>;
  };
}
