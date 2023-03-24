import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.locatecontrol';

import 'leaflet.locatecontrol/dist/L.Control.Locate.css';

function createLocateControl(props) {
  return L.control.locate(props);
}

const LocateControl = createControlComponent(createLocateControl);

export default LocateControl;
