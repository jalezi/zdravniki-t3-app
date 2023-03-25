import { Button } from '@/components/Shared/Buttons';
import { Chip } from '@/components/Shared/Chip';
import { Icon } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';
import type { Doctor } from '@/server/api/routers/doctors';

type DoctorCardFooterProps = {
  backToHomeText: string;
  changedOnText: string;
  goBack: () => void;
  isDateOverride: boolean;
  note: Doctor['override']['note'];
  overrideId: string;
  overideChipClassName: string | undefined;
  overrideChipText: string;
};

const DoctorCardFooter = ({
  backToHomeText,
  changedOnText,
  goBack,
  isDateOverride,
  note,
  overrideId,
  overideChipClassName,
  overrideChipText,
}: DoctorCardFooterProps) => {
  return (
    <>
      <Button type="button" onClick={goBack} container="span">
        <Icon name="BackSvg" size="xxl" /> {backToHomeText}
      </Button>
      {isDateOverride && (
        <>
          <Chip
            id={overrideId}
            iconName="EditSvg"
            iconSize="lg"
            text={overrideChipText}
            className={overideChipClassName}
          />
          <Tooltip.Tooltip anchorSelect={`#${overrideId}`} place="bottom">
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
