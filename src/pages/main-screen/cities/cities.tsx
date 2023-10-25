import { OfferType } from '../../../types';
import { Map } from '../../../components/map/map';
import OffersList from '../../../components/offers-list/offers-list';
import OffersSort from '../../../components/offers-sort/offers-sort';
import { useState } from 'react';

type CitiesProps = {
  offers: OfferType[];
};

export default function Cities({ offers }: CitiesProps): JSX.Element {
  // FIXME: Убрать eslint-disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      {offers.length ? (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Paris
              </b>
              <OffersSort />
              <OffersList
                offers={offers}
                onActiveOffer={(offer) => setActiveOffer(offer)}
              />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" />
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
                  We could not find any property available at the moment in
                  Paris
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      )}
    </>
  );
}
