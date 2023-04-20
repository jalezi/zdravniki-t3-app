import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { SkipLink } from '@/components/Shared/SkipLink';
import { BREAKPOINTS } from '@/lib/constants';
import { getDefaultFontSize } from '@/lib/utils/common';

const SkipLinks = () => {
  const [view, setView] = useState<string | null | undefined>(null);

  const { t } = useTranslation('common');
  const skipLinks = t('skipLinks', { returnObjects: true });

  const fontSize = getDefaultFontSize() ?? 16;
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= (BREAKPOINTS.md * fontSize) / 16;

  const _view =
    typeof window !== 'undefined'
      ? window.document
          .getElementById('view-toggler')
          ?.getAttribute('data-view')
      : null;

  useEffect(() => {
    setView(_view);
  }, [_view]);

  return (
    <>
      {isMediumMediaQuery ? (
        <>
          <SkipLink href="#main-nav">{skipLinks.navigation}</SkipLink>
          <SkipLink href="#filters">{skipLinks.options}</SkipLink>
          <SkipLink href="#map">{skipLinks.map}</SkipLink>
          <SkipLink href="#list">{skipLinks.list}</SkipLink>
        </>
      ) : (
        <>
          <SkipLink href="#menu-toggler">{skipLinks.menuToggler}</SkipLink>
          <SkipLink href="#dr-opt-toggler">{skipLinks.options}</SkipLink>
          {view === 'map' && <SkipLink href="#map">{skipLinks.map}</SkipLink>}
          {view === 'list' && (
            <SkipLink href="#list">{skipLinks.list}</SkipLink>
          )}
          <SkipLink href="#view-toggler">{skipLinks.viewToggler}</SkipLink>
        </>
      )}
      <SkipLink href="#search">{skipLinks.search}</SkipLink>
    </>
  );
};

export default SkipLinks;
