import { OfferType } from '../../../types';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesItemsProps = {
  offers: OfferType[];
  city: string | null;
};

export default function FavoritesItems({
  offers,
  city
}: FavoritesItemsProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoritesCard offer={offer} key={offer.id} />
        ))}
      </div>
    </li>
  );
}
