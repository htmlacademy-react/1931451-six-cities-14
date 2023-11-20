import { PreviewOfferType } from '../../types';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: PreviewOfferType[];
};

export default function OffersList({
  offers
}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          className="cities__card"
        />
      ))}
    </div>
  );
}
