import { Icon } from 'leaflet';

type MarkerMapType = {
  Default: string;
  Current: string;
  Size: [number, number];
  Anchor: [number, number];
}

export const TileLayerSetting = {
  Url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
};

export const MarkerMap: MarkerMapType = {
  Default: '/img/pin.svg',
  Current: '/img/pin-active.svg',
  Size: [27, 39],
  Anchor: [14, 39]
};

export const defaultCustomIcon = new Icon({
  iconUrl: MarkerMap.Default,
  iconSize: MarkerMap.Size,
  iconAnchor: MarkerMap.Anchor
});

export const currentCustomIcon = new Icon({
  iconUrl: MarkerMap.Current,
  iconSize: MarkerMap.Size,
  iconAnchor: MarkerMap.Anchor
});
