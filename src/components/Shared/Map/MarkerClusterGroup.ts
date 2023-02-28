/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// see: https://github.com/yuzhva/react-leaflet-markercluster/blob/master/src/react-leaflet-markercluster.js
import 'leaflet.markercluster';
import { createPathComponent } from '@react-leaflet/core';
import type { PropsWithChildren } from '@react-leaflet/core/lib/component';
import type {
  CircleMarker,
  LeafletEventHandlerFn,
  MarkerClusterGroup as LeafletMarkerClusterGroup,
  Marker,
  MarkerClusterGroupOptions,
  MarkerOptions,
} from 'leaflet';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export const createClusterCustomIcon = (cluster: {
  getChildCount: () => number;
  getAllChildMarkers: () => Marker<CircleMarker>[];
}) => {
  let acceptsCnt = 0;

  Object.values(cluster.getAllChildMarkers()).forEach(marker => {
    const options = marker.options as MarkerOptions & {
      ['data-accepts']: 'y' | 'n';
    };

    acceptsCnt += options['data-accepts'] === 'y' ? 1 : 0;
  });

  let acceptsPercentage =
    Math.round(((acceptsCnt / cluster.getChildCount()) * 10) / 2.5) * 25;
  if (acceptsPercentage === 100 && acceptsCnt !== cluster.getChildCount()) {
    acceptsPercentage = 75;
  } else if (acceptsPercentage === 0 && acceptsCnt > 0) {
    acceptsPercentage = 25;
  }

  return L.divIcon({
    html: `<div><span>${cluster.getChildCount()}</span></div>`,
    className: `marker-cluster marker-cluster-small marker-cluster-accepts-${acceptsPercentage}`,
    // eslint-disable-next-line no-undef
    iconSize: L.point(40, 40, true),
  });
};

/*
  There is a next version of react-leaflet-markercluster that supports React 17 and 18
  but not sure if it will be released yet.
  https://www.npmjs.com/package/@changey/react-leaflet-markercluster
*/
const CustomMarkerClusterGroup = createPathComponent<
  LeafletMarkerClusterGroup,
  MarkerClusterGroupOptions & PropsWithChildren
>(({ children: _c, ...props }, ctx) => {
  const clusterProps: Record<string, unknown> = {};
  const clusterEvents: Record<string, unknown> = {};
  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) => {
    if (propName.startsWith('on')) {
      clusterEvents[`${propName}`] = prop;
    } else {
      clusterProps[`${propName}`] = prop;
    }
  });

  // Creating markerClusterGroup Leaflet element
  const markerClusterGroup = L.markerClusterGroup(clusterProps);

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(`${clusterEvent}`, callback as LeafletEventHandlerFn);
  });

  return {
    instance: markerClusterGroup,
    context: { ...ctx, layerContainer: markerClusterGroup },
  };
});

export default CustomMarkerClusterGroup;
