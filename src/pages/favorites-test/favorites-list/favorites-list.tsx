import { OfferType } from '../../../types';
import FavoritesItems from '../favorites-items/favorites-items';

type FavoritesListProps = {
  offers: OfferType[];
};

export default function FavoritesList({
  offers,
}: FavoritesListProps): JSX.Element {
  const offersSorted = offers
    .slice()
    .sort((a, b) => (a.city.name < b.city.name ? -1 : 1));

  const rows: JSX.Element[] = [];
  let offersTempArray: OfferType[] = [];
  // let city: string | null = offersSorted[0].city.name; // FIXME: Удалить эту строчку
  let city: string | null = null;

  offersSorted.forEach((offer: OfferType, index) => {
    if (index === 0) {
      city = offer.city.name;
    }
    if (city !== offer.city.name) {
      rows.push(<FavoritesItems offers={offersTempArray} city={city}/>);
      city = offer.city.name;
      offersTempArray = [];
    }
    if (city === offer.city.name) {
      offersTempArray.push(offer);
    }
    if (index === offersSorted.length - 1) {
      rows.push(<FavoritesItems offers={offersTempArray} city={city}/>);
      offersTempArray = [];
      city = null;
    }
  });

  return <ul className="favorites__list">{rows}</ul>;
}

// FIXME: Вариант с вложенным циклом (можно без сортировки)
// FIXME: Вариант с children (передавать в items одно или несколько предложений через пропс)

// FIXME: Задача чтобы при любых входных данные тратить наименьшее количество памяти
