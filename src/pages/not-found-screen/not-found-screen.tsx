import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute } from '../../types';
import { Helmet } from 'react-helmet-async';
import styles from './not-found-screen.module.css';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities: 404 Page not found</title>
      </Helmet>

      <Header />
      <main className="page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="cities">
          <div className={`cities__places-container container ${styles.container}`}>
            <div className="cities__status-wrapper">
              <b className={`cities__status ${styles.title}`}>404</b>
              <p className={`cities__status-description ${styles.desc}`}>
                Page not found
              </p>
              <Link to={AppRoute.Main} className={styles.btn}>Go to main page</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
