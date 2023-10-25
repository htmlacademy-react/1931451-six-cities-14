import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersData } from './mocks/offers.data';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { AuthorizationStatusProvider } from './context';
import { reviewsData } from './mocks/reviews.data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthorizationStatusProvider>
          <App offers={offersData} reviews={reviewsData} />
        </AuthorizationStatusProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// FIXME: Исправить все теги <a> на компонент <Link>
// FIXME: Удалить лишний экран favorites-test
// v18.17.1

// TODO: Можно ли делать колбек функцию в обработчике необязательным пропов? onMouseEnter={() => onActiveOffer && onActiveOffer(offer)}
