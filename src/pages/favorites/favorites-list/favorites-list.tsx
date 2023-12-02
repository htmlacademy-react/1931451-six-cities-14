import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { setActiveCity } from '../../../store/slices/offers/offers';
import { AppRoute, CityNamesType, PreviewOfferType } from '../../../types';
import OfferCard from '../../../components/offer-card/offer-card';

type FavoritesListProps = {
  offers: PreviewOfferType[];
};

const getFavoritesByCity = (favorites: PreviewOfferType[]) => {
  const favoritesSorted = favorites.toSorted((a, b) =>
    a.city.name > b.city.name ? 1 : -1
  );

  return favoritesSorted.reduce<{ [key: string]: PreviewOfferType[] }>((acc, curr) => {
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
  const dispatch = useAppDispatch();
  const favoritesByCity = getFavoritesByCity(offers);

  return (
    <ul className="favorites__list">
      {Object.entries(favoritesByCity).map(([city, groupedFavorites]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                onClick={() => dispatch(setActiveCity(city as CityNamesType))}
                to={AppRoute.Main}
              >
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {groupedFavorites.map((offer) => (
              <OfferCard offer={offer} key={offer.id} className='favorites' />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
