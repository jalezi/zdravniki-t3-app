import { memo } from 'react';

import { Map } from '@/components/Shared/Map';
import type { MapProps } from '@/components/Shared/Map/Map';

import BigMapEvents from './BigMapEvents';

export type BigMapProps = MapProps;

function withMap(Component: typeof Map) {
  function BigMap(props: BigMapProps) {
    const { setMap, ...rest } = props;

    return (
      <Component setMap={setMap} {...rest}>
        <BigMapEvents />
      </Component>
    );
  }

  return memo(BigMap);
}

export default withMap(Map);
