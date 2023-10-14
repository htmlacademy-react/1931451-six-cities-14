import Header from '../../components/header/header';
import LocationsTabs from '../../components/locations-tabs/locations-tabs';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import OffersSort from '../../components/offers-sort/offers-sort';
import { OfferType } from '../../types/offers.type';

type MainScreenProps = {
  offers: OfferType[];
}

// FIXME: Добавить логику при отсутствующих обьявлениях
export default function MainScreen({offers}: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header isLogged/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsTabs />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <OffersSort />
              <OffersList offers={offers} />
            </section>
            <Map />
          </div>
        </div>
      </main>
    </div>
  );
}
