import { Chip } from '@/components/Shared/Chip';
import { Tooltip } from '@/components/Shared/Tooltip';

type DoctorOverrideProps = {
  overrideChipText: string;
  changedOnText: string;
  note: string;
  overrideId: string;
  overideChipClassName?: string | undefined;
};

const DoctorOverride = ({
  overrideChipText,
  changedOnText,
  note,
  overrideId,
  overideChipClassName,
}: DoctorOverrideProps) => {
  return (
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
  );
};

export default DoctorOverride;
