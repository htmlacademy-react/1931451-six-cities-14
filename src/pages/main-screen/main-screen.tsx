import classNames from 'classnames';
import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import { Helmet } from 'react-helmet-async';
import Cities from './cities/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActiveCity, getOffers } from '../../store/slices/offers/selectors';
import { setActiveCity } from '../../store/slices/offers/offers';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  const filteredOffersByCity = offers.filter(
    (offer) => offer.city.name === activeCity
  );

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities: Main</title>
      </Helmet>

      <Header />
      <main
        className={classNames('page__main--index', {
          'page__main--index-empty': Boolean(!filteredOffersByCity.length),
        })}
      >
        <LocationsTabs
          activeCity={activeCity}
          onActiveCity={(city) => dispatch(setActiveCity(city))}
        />

        <h1 className="visually-hidden">Cities</h1>
        <Cities offers={filteredOffersByCity} />
      </main>
    </div>
  );
}
