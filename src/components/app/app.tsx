import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../types';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const { offers, reviews, favorites } = useAppSelector((state) => state);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen offers={offers} />} />
      <Route path={AppRoute.Login} element={<LoginScreen />} />
      <Route
        path={AppRoute.Offer}
        element={<OfferScreen offers={offers} reviews={reviews} />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute redirectTo={AppRoute.Login}>
            <FavoritesScreen offers={favorites} />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;
