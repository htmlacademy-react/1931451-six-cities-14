import { Icon } from 'leaflet';

type MarkerMapType = {
  Default: string;
  Current: string;
  Size: [number, number];
  Anchor: [number, number];
}

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
