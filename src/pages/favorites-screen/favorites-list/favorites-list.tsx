import { OfferType } from '../../../types';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesListProps = {
  offers: OfferType[];
};

export default function FavoritesList({
  offers,
}: FavoritesListProps): JSX.Element {
  const uniqCitiesList = [
    ...new Set(offers.map((offer) => offer.city.name)),
  ].sort((a, b) => (a > b ? 1 : -1));

  return (
    <ul className="favorites__list">
      {uniqCitiesList.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers
              .filter((offer) => offer.city.name === city)
              .map((offer) => (
                <FavoritesCard offer={offer} key={offer.id} />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
