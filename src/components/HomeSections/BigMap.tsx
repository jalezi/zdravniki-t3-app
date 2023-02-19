import { Map } from '../Shared/Map';
import type { MapProps } from '../Shared/Map/Map';

export type BigMapProps = MapProps;

function withMap(Component: typeof Map) {
  function BigMap(props: MapProps) {
    return <Component setMap={props.setMap} {...props} />;
  }

  return BigMap;
}

export default withMap(Map);
