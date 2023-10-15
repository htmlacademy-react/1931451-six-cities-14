import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

type FavoritesScreenProps = {
  isEmpty?: boolean;
};

// FIXME: Добавить логику при отсутствующих обьявлениях в избранном, временно передаю пропом
// FIXME: Подумать над рефакторингом контейнера (через зависимоть classNames)
export default function FavoritesScreen({
  isEmpty,
}: FavoritesScreenProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 Cities: Favorites</title>
      </Helmet>

      <Header isLogged />
      {isEmpty ? (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList />
            </section>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
