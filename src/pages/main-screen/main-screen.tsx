import classNames from 'classnames';
import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import { OfferType } from '../../types';
import { Helmet } from 'react-helmet-async';
import Cities from './cities/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type MainScreenProps = {
  offers: OfferType[];
};

export default function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
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
          'page__main--index-empty': Boolean(!offers.length),
        })}
      >
        <LocationsTabs
          activeCity={activeCity}
          onActiveCity={(city) => dispatch(changeCity({ city }))}
        />

        <h1 className="visually-hidden">Cities</h1>
        <Cities offers={filteredOffersByCity} />
      </main>
    </div>
  );
}
