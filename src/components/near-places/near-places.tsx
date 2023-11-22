import { PreviewOfferType } from '../../types';
import OfferCard from '../offer-card/offer-card';
import { MAX_NEAR_PLACES_COUNT, MIN_NEAR_PLACES_COUNT, ONE_ELEMENT } from './near-places.const';

type NearPlacesType = {
  offers: PreviewOfferType[];
};

export default function NearPlaces({
  offers,
}: NearPlacesType): JSX.Element {
  return offers.length ? (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other {offers.length > ONE_ELEMENT ? 'places' : 'place'} in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {offers.slice(MIN_NEAR_PLACES_COUNT, MAX_NEAR_PLACES_COUNT).map((offer) => (
            <OfferCard
              offer={offer}
              key={offer.id}
              className='cities'
            />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          There are no other places in the neighborhood
        </h2>
      </section>
    </div>
  );
}
