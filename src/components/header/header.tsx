import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import { useAuthorizationStatus } from '../../context/authorization-status';
import { checkAuthorizationStatus } from '../../utils/utils';
import { PRIVATE_ROUTES } from '../../const';
import styles from './header.module.css';
import { useAppSelector } from '../../hooks';

type HeaderProps = {
  isLoginScreen?: boolean;
};

export default function Header({
  isLoginScreen,
}: HeaderProps): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const { authorizationStatus, setAuthorizationStatus } = useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getStyleForNavLink = ({ isActive }: { isActive: boolean }): object =>
    isActive ? { pointerEvents: 'none' } : {};

  const handleClick = () => {
    setAuthorizationStatus(AuthorizationStatus.NoAuth);
    localStorage.clear();

    if(PRIVATE_ROUTES.includes(pathname)) {
      navigate(AppRoute.Main);
    }
  };

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
                    <span className="header__favorite-count">{favorites.length}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <button
                    onClick={handleClick}
                    className={`header__nav-link ${styles.resetStyleButton}`}
                  >
                    <span className="header__signout">Sign out</span>
                  </button>
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
                    state={{from: pathname}}
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
