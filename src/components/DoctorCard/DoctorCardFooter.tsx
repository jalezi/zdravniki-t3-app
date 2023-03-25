import { Button } from '@/components/Shared/Buttons';
import { Chip } from '@/components/Shared/Chip';
import { Icon } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';
import type { Doctor } from '@/server/api/routers/doctors';

type DoctorFooterCommonProps = {
  backToHomeText: string;
  goBack: () => void;
};

type DoctorFooterWithoutDateOverrideProps = DoctorFooterCommonProps & {
  variant?: 'default';
  changedOnText?: undefined;
  note?: undefined;
  overrideId?: undefined;
  overideChipClassName?: undefined;
  overrideChipText?: undefined;
};

type DoctorFooterWithDateOverrideProps = DoctorFooterCommonProps & {
  variant: 'override';
  changedOnText: string;
  note: Doctor['override']['note'];
  overrideId: string;
  overideChipClassName: string;
  overrideChipText: string;
};

type DoctorCardFooterProps =
  | DoctorFooterWithoutDateOverrideProps
  | DoctorFooterWithDateOverrideProps;

const DoctorCardFooter = ({
  variant,
  backToHomeText,
  goBack,
  overrideChipText,
  changedOnText,
  note,
  overrideId,
  overideChipClassName,
}: DoctorCardFooterProps) => {
  return (
    <>
      <Button type="button" onClick={goBack} container="span">
        <Icon name="BackSvg" size="xxl" /> {backToHomeText}
      </Button>
      {variant === 'override' && (
        <>
          <Chip
            id={overrideId}
            iconName="EditSvg"
            iconSize="lg"
            text={overrideChipText}
            className={overideChipClassName}
          />
          <Tooltip.Tooltip anchorSelect={`#${overrideId ?? ''}`} place="bottom">
            <Tooltip.TooltipContent weight="700">
              {changedOnText}
              {overrideChipText}
            </Tooltip.TooltipContent>
            {note ? (
              <>
                <Tooltip.TooltipDivider />
                <Tooltip.TooltipContent>{note}</Tooltip.TooltipContent>
              </>
            ) : null}
          </Tooltip.Tooltip>
        </>
      )}
    </>
  );
};

export default DoctorCardFooter;
