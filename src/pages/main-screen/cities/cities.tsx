import { OffersSortMapType, PreviewOfferType } from '../../../types';
import { Map } from '../../../components/map/map';
import OffersList from '../../../components/offers-list/offers-list';
import OffersSort from '../../../components/offers-sort/offers-sort';
import { useState } from 'react';
import { addPluralEnding, getSortedOffers } from '../../../utils/utils';

type CitiesProps = {
  offers: PreviewOfferType[];
};

export default function Cities({ offers }: CitiesProps): JSX.Element {
  const [sortType, setSortType] = useState<OffersSortMapType | null>(null);

  return offers.length ? (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} place{addPluralEnding(offers.length)} to stay in {offers[0].city.name}
          </b>
          <OffersSort onSortType={(data: OffersSortMapType) => setSortType(data)} />
          <OffersList
            offers={getSortedOffers(offers, sortType)}
          />
        </section>
        <div className="cities__right-section">
          <Map className="cities__map" offers={offers} />
        </div>
      </div>
    </div>
  ) : (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property available at the moment in Paris
            </p>
          </div>
        </section>
        <div className="cities__right-section" />
      </div>
    </div>
  );
}
