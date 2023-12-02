import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import { checkAuthorizationStatus } from '../../utils/utils';
import { PRIVATE_ROUTES } from '../../const';
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUser } from '../../store/slices/user/selectors';
import { getFavorites } from '../../store/slices/favorites/selectors';

type HeaderProps = {
  isLoginScreen?: boolean;
};

export default function Header({ isLoginScreen }: HeaderProps): JSX.Element {
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const getStyleForNavLink = ({ isActive }: { isActive: boolean }): object =>
    isActive ? { pointerEvents: 'none' } : {};

  const handleClick = () => {
    dispatch(logoutAction());

    if (PRIVATE_ROUTES.includes(pathname)) {
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
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                      style={{ backgroundImage: user?.avatarUrl }}
                    >
                    </div>
                    <span className="header__user-name user__name">
                      {user?.email}
                    </span>
                    <span className="header__favorite-count">
                      {favorites.length}
                    </span>
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
                    state={{ from: pathname }}
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
