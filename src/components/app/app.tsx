import { Routes, Route } from 'react-router-dom';
import { OfferType, AppRoute, ReviewType } from '../../types';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
};

function App({ offers, reviews }: AppProps): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainScreen offers={offers} />} />
      <Route path={AppRoute.Login} element={<LoginScreen />} />
      <Route
        path={AppRoute.Offer}
        element={<OfferScreen offers={offers} reviews={reviews} />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute redirectTo={AppRoute.Login}>
            <FavoritesScreen offers={offers} />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;
