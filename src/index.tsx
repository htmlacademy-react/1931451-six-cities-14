import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { Provider } from 'react-redux';
import { store } from './store';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <ScrollToTop />
          <App />
        </HistoryRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// FIXME: Удалить версию ноды
// v18.17.1
