import type { I18nNamespaces } from '@/../i18next';
import { useTranslation } from 'next-i18next';

type AbbrWithTranslationProps = {
  abbr?: string;
  translationKey: keyof I18nNamespaces['abbreviations'];
};

// if you want to use it, you need to provide translation namespace in getStaticProps or getServerSideProps
const AbbrWithTranslation = ({
  abbr,
  translationKey,
}: AbbrWithTranslationProps) => {
  const { t } = useTranslation('abbreviations');

  return <abbr title={t(translationKey)}>{abbr}</abbr>;
};

export const Zzzs = () => (
  <AbbrWithTranslation abbr="ZZZS" translationKey="zzzs" />
);

export const Mz = () => <AbbrWithTranslation abbr="MZ" translationKey="mz" />;

export const Gurs = () => (
  <AbbrWithTranslation abbr="GURS" translationKey="gurs" />
);

export const Zd = () => <AbbrWithTranslation abbr="ZD" translationKey="zd" />;

AbbrWithTranslation.ZZZS = Zzzs;
AbbrWithTranslation.MZ = Mz;
AbbrWithTranslation.GURS = Gurs;
AbbrWithTranslation.ZD = Zd;

export default AbbrWithTranslation;
