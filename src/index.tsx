import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { AuthorizationStatusProvider } from './context/authorization-status';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthorizationStatusProvider>
            <App />
          </AuthorizationStatusProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// FIXME: Удалить версию ноды
// v18.17.1
