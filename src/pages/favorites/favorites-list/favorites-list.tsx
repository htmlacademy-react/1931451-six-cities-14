import { CityNamesType, OfferType } from '../../../types';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesListProps = {
  offers: OfferType[];
};

const getFavoritesByCity = (favorites: OfferType[]) => {
  const favoritesSorted = favorites.toSorted((a, b) =>
    a.city.name > b.city.name ? 1 : -1
  );

  return favoritesSorted.reduce<{ [key: string]: OfferType[] }>((acc, curr) => {
    const city: CityNamesType = curr.city.name;

    if (!(city in acc)) {
      acc[city] = [];
    }

    acc[city].push(curr);

    return acc;
  }, {});
};

export default function FavoritesList({
  offers,
}: FavoritesListProps): JSX.Element {
  const favoritesByCity = getFavoritesByCity(offers);

  return (
    <ul className="favorites__list">
      {Object.entries(favoritesByCity).map(([city, groupedFavorites]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              {/* FIXME: Исправить тег а */}
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {groupedFavorites.map((offer) => (
              <FavoritesCard offer={offer} key={offer.id} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
