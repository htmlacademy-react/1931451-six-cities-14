import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersData } from './mocks/offers.data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offersData} />
  </React.StrictMode>
);

// FIXME: Исправить все теги <a> на компонент <Link>
// v18.17.1

// FIXME: Provider
