import { Map, Marker, layerGroup } from 'leaflet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfferType } from '../../types';
import { getPathToOffer } from '../../utils/utils';
import { currentCustomIcon, defaultCustomIcon } from '../../components/map/map.const';

export function useMapPoints(
  map: Map | null,
  points: OfferType[],
  activePoint?: OfferType | null
) {
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
}
