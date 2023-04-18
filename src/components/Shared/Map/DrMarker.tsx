import type { CircleMarker as CMarker } from 'leaflet';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { CircleMarkerProps } from 'react-leaflet';
import { CircleMarker } from 'react-leaflet';

import type { LatLngLiteral } from '@/lib/types/Map';

type CustomProps = {
  accepts: 'y' | 'n';
  center: LatLngLiteral;
  children?: React.ReactNode;
  className?: string;
};

type DrMarkerProps = CustomProps & Omit<CircleMarkerProps, keyof CustomProps>;

const DrMarker = (
  { center, children, className, accepts, ...props }: DrMarkerProps,
  ref: Ref<CMarker>
) => {
  return (
    <CircleMarker
      ref={ref}
      center={center}
      fillColor="currentColor"
      fillOpacity={0.7}
      stroke={false}
      radius={12}
      className={className}
      data-accepts={accepts}
      {...props}
    >
      {children}
    </CircleMarker>
  );
};

export default forwardRef(DrMarker);
