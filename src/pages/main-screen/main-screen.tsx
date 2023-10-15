import classNames from 'classnames';
import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import { Map } from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import OffersSort from '../../components/offers-sort/offers-sort';
import { OfferType } from '../../types/offers.type';
import { Helmet } from 'react-helmet-async';

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
        className={classNames({
          'page__main--index': true,
          'page__main--index-empty': Boolean(!offers.length),
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <LocationsTabs />
        {offers.length ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in Paris
                </b>
                <OffersSort />
                <OffersList offers={offers} />
              </section>
              <div className="cities__right-section">
                <Map className='cities__map' />
              </div>
            </div>
          </div>
        ) : (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in
                    Paris
                  </p>
                </div>
              </section>
              <div className="cities__right-section" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
