import classNames from 'classnames';
import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import { Helmet } from 'react-helmet-async';
import Cities from './cities/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActiveCity, getOffers } from '../../store/slices/offers/selectors';
import { setActiveCity } from '../../store/slices/offers/offers';
import { useMemo } from 'react';
import { CITY_NAMES, CITY_PARAM_NAME } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { CityNamesType } from '../../types';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCityState = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();
  const sortParam = CITY_NAMES.find(
    (city) => city === searchParams.get(CITY_PARAM_NAME)
  )
    ? searchParams.get(CITY_PARAM_NAME)
    : null;
  const activeCity = sortParam ?? activeCityState;

  const filteredOffersByCity = useMemo(
    () => offers.filter((offer) => offer.city.name === activeCity),
    [activeCity, offers]
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
          activeCity={activeCity as CityNamesType}
          onActiveCity={(city) => {
            dispatch(setActiveCity(city));
            setSearchParams((params) => {
              params.set(CITY_PARAM_NAME, city);
              return params;
            });
          }}
        />

        <h1 className="visually-hidden">Cities</h1>
        <Cities offers={filteredOffersByCity} />
      </main>
    </div>
  );
}
