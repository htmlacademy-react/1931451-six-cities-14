import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../types';
import { useAuthorizationStatus } from '../../hooks';

type HeaderProps = {
  isLoginScreen?: boolean;
};

export default function Header({
  isLoginScreen
}: HeaderProps): JSX.Element {
  const isLogged = useAuthorizationStatus();

  const getStyleForNavLink = ({ isActive }: { isActive: boolean }): object =>
    isActive ? { pointerEvents: 'none' } : {};

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink
              to={AppRoute.Main}
              className="header__logo-link header__logo-link--active"
              style={getStyleForNavLink}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </NavLink>
          </div>
          {isLogged ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                    style={getStyleForNavLink}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li
                  className="header__nav-item user"
                  style={isLoginScreen ? { display: 'none' } : {}}
                >
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
