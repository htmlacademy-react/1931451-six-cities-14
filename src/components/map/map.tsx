import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useMapWithPoints } from '../../hooks';
import { OfferType } from '../../types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferType[];
  className: string;
  activeOffer?: OfferType | null;
  isNeedZoom?: boolean;
};

export const Map: React.FC<MapProps> = ({
  className,
  offers,
  activeOffer,
  isNeedZoom,
}) => {
  const { city } = offers[0];
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMapWithPoints(mapRef, city, offers, activeOffer);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (activeOffer && !isNeedZoom) {
      map.flyTo(
        [activeOffer.location.latitude, activeOffer.location.longitude],
        activeOffer.location.zoom
      );
    } else {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    if (activeOffer && isNeedZoom) {
      map.setView(
        [activeOffer.location.latitude, activeOffer.location.longitude],
        activeOffer.location.zoom
      );
    }

  }, [map, activeOffer, isNeedZoom, city]);

  return <section className={classNames('map', className)} ref={mapRef} />;
};
