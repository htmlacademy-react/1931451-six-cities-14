import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { OfferType, AppRoute } from '../../types';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AuthorizationStatusProvider } from '../../context';

type AppProps = {
  offers: OfferType[];
};

function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthorizationStatusProvider>
          <Routes>
            <Route path="/" element={<MainScreen offers={offers} />} />
            <Route path={AppRoute.Login} element={<LoginScreen />} />
            <Route
              path={AppRoute.Offer}
              element={<OfferScreen offers={offers} />}
            />
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
        </AuthorizationStatusProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
