import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

type DoctorFooterProps = {
  children?: React.ReactNode;
  backToHomeText: string;
  goBack: () => void;
};

const DoctorFooter = ({
  children,
  backToHomeText,
  goBack,
}: DoctorFooterProps) => {
  return (
    <>
      <Button type="button" onClick={goBack} container="span">
        <Icon name="BackSvg" size="xxl" /> {backToHomeText}
      </Button>
      {children}
    </>
  );
};

export default DoctorFooter;
