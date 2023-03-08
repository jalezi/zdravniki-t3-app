import dynamic from 'next/dynamic';

const ToolTipNoSsr = dynamic(
  () => import('./Tooltips').then(mod => mod.Tooltip),
  { ssr: false }
);

export const Tooltip = ToolTipNoSsr;

export type { TooltipProps } from './Tooltips';
