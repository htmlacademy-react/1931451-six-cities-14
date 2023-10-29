import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersData } from './mocks/offers.data';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { AuthorizationStatusProvider } from './context/authorization-status';
import { reviewsData } from './mocks/reviews.data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// FIXME: Исправить HashRouter на BrowserRouter
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <AuthorizationStatusProvider>
          <App offers={offersData} reviews={reviewsData} />
        </AuthorizationStatusProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// FIXME: Исправить все теги <a> на компонент <Link>
// v18.17.1
