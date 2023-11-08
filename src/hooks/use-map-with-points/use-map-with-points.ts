import { Map, TileLayer, Marker, layerGroup } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityType, OfferType } from '../../types';
import { TileLayerSetting, currentCustomIcon, defaultCustomIcon } from './use-map-with-points.const';
import { getPathToOffer } from '../../utils/utils';

export function useMapWithPoints(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType,
  points: OfferType[],
  activePoint?: OfferType | null
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    points.forEach((point) => {
      const marker = new Marker({
        lat: point.location.latitude,
        lng: point.location.longitude,
      }).on('click', () => navigate(getPathToOffer(point.id)));

      marker
        .setIcon(
          activePoint?.id === point.id ? currentCustomIcon : defaultCustomIcon
        )
        .addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, points, activePoint, navigate]);

  return map;
}
