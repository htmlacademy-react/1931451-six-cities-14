import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useMap, useMapPoints } from '../../hooks';
import { OfferType } from '../../types';

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
  const map = useMap(mapRef, city);
  const mapPoints = useMapPoints(map, offers, activeOffer);

  useEffect(() => {
    if (!mapPoints) {
      return;
    }

    if (activeOffer && !isNeedZoom) {
      mapPoints.flyTo(
        [activeOffer.location.latitude, activeOffer.location.longitude],
        activeOffer.location.zoom
      );
    } else {
      mapPoints.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    if (activeOffer && isNeedZoom) {
      mapPoints.setView(
        [activeOffer.location.latitude, activeOffer.location.longitude],
        activeOffer.location.zoom
      );
    }

  }, [mapPoints, activeOffer, isNeedZoom, city]);

  return <section className={classNames('map', className)} ref={mapRef} />;
};
