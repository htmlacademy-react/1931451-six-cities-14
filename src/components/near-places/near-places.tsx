import { OfferType } from '../../types/offers.type';
import OfferCard from '../offer-card/offer-card';
import { ONE_ELEMENT } from './near-places.const';

type NearPlacesType = {
  offers: OfferType[];
  currentOffer: OfferType;
};

export default function NearPlaces({
  offers,
  currentOffer,
}: NearPlacesType): JSX.Element {
  const nearOffers = offers.filter((item) => {
    if (item.id !== currentOffer.id) {
      return item.city.name === currentOffer.city.name ? item : null;
    }
  });

  return nearOffers.length ? (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other {nearOffers.length > ONE_ELEMENT ? 'places' : 'place'} in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {nearOffers.map((offer) => (
            <OfferCard
              offer={offer}
              key={offer.id}
              className="near-places__card"
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
