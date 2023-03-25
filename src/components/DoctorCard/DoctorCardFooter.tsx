import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

type DoctorCardFooterProps = {
  children?: React.ReactNode;
  backToHomeText: string;
  goBack: () => void;
};

const DoctorCardFooter = ({
  children,
  backToHomeText,
  goBack,
}: DoctorCardFooterProps) => {
  return (
    <>
      <Button type="button" onClick={goBack} container="span">
        <Icon name="BackSvg" size="xxl" /> {backToHomeText}
      </Button>
      {children}
    </>
  );
};

export default DoctorCardFooter;
