import { Map } from '@/components/Shared/Map';
import type { MapProps } from '@/components/Shared/Map/Map';

import BigMapEvents from './BigMapEvents';

export type BigMapProps = MapProps;

function withMap(Component: typeof Map) {
  function BigMap(props: MapProps) {
    return (
      <Component setMap={props.setMap} {...props}>
        <BigMapEvents />
      </Component>
    );
  }

  return BigMap;
}

export default withMap(Map);
