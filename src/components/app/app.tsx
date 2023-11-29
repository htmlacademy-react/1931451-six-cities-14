import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';
import {
  checkAuthAction,
  fetchFavoritesAction,
  fetchOffersAction,
} from '../../store/api-action';
import { useEffect } from 'react';
import { store } from '../../store';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { getOffersLoadingStatus } from '../../store/slices/offers/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, []);

  useEffect(() => {
    store.dispatch(fetchOffersAction());

    if (authorizationStatus === AuthorizationStatus.Auth) {
      store.dispatch(fetchFavoritesAction());
    }

  }, [authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen />} />
      <Route path={AppRoute.Login} element={<LoginScreen />} />
      <Route path={AppRoute.Offer} element={<OfferScreen />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute redirectTo={AppRoute.Login}>
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;


// TODO: Пофиксить поведение, когда нет предложений, но отображается избранное ?
