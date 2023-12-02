import { OffersSortMapType, PreviewOfferType } from '../../../types';
import { Map } from '../../../components/map/map';
import OffersList from '../../../components/offers-list/offers-list';
import OffersSort from '../../../components/offers-sort/offers-sort';
import { useCallback, useMemo, useState } from 'react';
import { addPluralEnding, sortingOffers } from '../../../utils/utils';
import { fetchOffersAction } from '../../../store/api-action';
import { store } from '../../../store';
import styles from './cities.module.css';
import { useSearchParams } from 'react-router-dom';
import { SORT_PARAM_NAME } from '../../../const';


type CitiesProps = {
  offers: PreviewOfferType[];
};

export default function Cities({ offers }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<PreviewOfferType | null>(null);
  const [sortParams] = useSearchParams();
  const defaultSortType = sortParams.get(SORT_PARAM_NAME) as OffersSortMapType ?? null;
  const [sortType, setSortType] = useState<OffersSortMapType | null>(defaultSortType);

  const handleSetSortType = useCallback(
    (data: OffersSortMapType) => setSortType(data),
    []
  );

  const handleSetActiveOffer = useCallback(
    (offer: PreviewOfferType | null) => setActiveOffer(offer),
    []
  );

  const sortedOffers = useMemo(
    () => sortingOffers(offers, sortType),
    [offers, sortType]
  );

  return offers.length ? (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} place{addPluralEnding(offers.length)} to stay in{' '}
            {offers[0].city.name}
          </b>
          <OffersSort onSortType={handleSetSortType} />
          <OffersList
            offers={sortedOffers}
            onActiveOffer={handleSetActiveOffer}
          />
        </section>
        <div className="cities__right-section">
          <Map
            className="cities__map"
            offers={offers}
            activeOffer={activeOffer}
          />
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
            <button
              className={styles.button}
              tabIndex={0}
              onClick={() => {
                store.dispatch(fetchOffersAction());
              }}
            >
              Try Again
            </button>
          </div>
        </section>
        <div className="cities__right-section" />
      </div>
    </div>
  );
}
