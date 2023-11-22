import { memo } from 'react';
import { PreviewOfferType } from '../../types';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: PreviewOfferType[];
  onActiveOffer: (offer: PreviewOfferType | null) => void;
};

function OffersList({
  offers,
  onActiveOffer
}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          onActiveOffer={onActiveOffer}
          offer={offer}
          key={offer.id}
          className='cities'
        />
      ))}
    </div>
  );
}

const OffersListMemo = memo(OffersList);
export default OffersListMemo;
