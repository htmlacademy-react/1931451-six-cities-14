import classNames from 'classnames';
import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import { OfferType } from '../../types';
import { Helmet } from 'react-helmet-async';
import Cities from './cities/cities';

type MainScreenProps = {
  offers: OfferType[];
};

export default function MainScreen({ offers }: MainScreenProps): JSX.Element {
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
        <LocationsTabs />

        <h1 className="visually-hidden">Cities</h1>
        <Cities offers={offers} />
      </main>
    </div>
  );
}
