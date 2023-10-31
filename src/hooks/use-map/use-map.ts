import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CityType } from '../../types';
import { TileLayerSetting } from './use-map.const';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType
) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    if (isRenderedRef.current) {
      return;
    }

    const mapInstance = new Map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });

    const layer = new TileLayer(TileLayerSetting.Url, {
      attribution: TileLayerSetting.Attribution,
    });

    mapInstance.addLayer(layer);

    setMap(mapInstance);
    isRenderedRef.current = true;
  }, [mapRef, city]);

  return map;
}
