import dynamic from 'next/dynamic';

const H1 = dynamic(() =>
  import('@/components/Shared/SrOnly').then(mod => mod.SrOnly.H1)
);
const H2 = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.H2)
);
const H3 = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.H3)
);
const H4 = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.H4)
);
const P = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.P)
);
const Ul = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Ul)
);
const Ol = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Ol)
);
const Strong = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Strong)
);
const A = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.A)
);
const Table = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Table)
);
const THead = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.THead)
);
const TBody = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.TBody)
);
const Tr = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Tr)
);
const Th = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Th)
);
const Td = dynamic(() =>
  import('./ComponentsMDX').then(mod => mod.ComponentsMDX.Td)
);

export const componentsMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  strong: Strong,
  a: A,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: Tr,
  th: Th,
  td: Td,
};
