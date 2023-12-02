import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../types';
import { checkAuthorizationStatus, setCapitalLetter } from '../../utils/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LOGIN_CITY_LINK, LoginFormFields } from './login-screen.const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { setActiveCity } from '../../store/slices/offers/offers';

type LocationType = {
  state: { from: AppRoute };
};

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const { state } = useLocation() as LocationType;

  const [loginForm, setLoginForm] = useState({
    [LoginFormFields.Email]: '',
    [LoginFormFields.Password]: '',
  });

  if (isLogged) {
    return state ? <Navigate to={state.from} replace /> : <Navigate to={AppRoute.Main} />;
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(loginForm));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities: Login</title>
      </Helmet>
      <Header isLoginScreen />
      <ToastContainer />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label
                  className="visually-hidden"
                  htmlFor={LoginFormFields.Email}
                >
                  {setCapitalLetter(LoginFormFields.Email)}
                </label>
                <input
                  className="login__input form__input"
                  type={LoginFormFields.Email}
                  name={LoginFormFields.Email}
                  placeholder={setCapitalLetter(LoginFormFields.Email)}
                  required
                  onChange={handleChange}
                  value={loginForm.email}
                  autoFocus
                  id={LoginFormFields.Email}
                  autoComplete="on"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label
                  className="visually-hidden"
                  htmlFor={LoginFormFields.Password}
                >
                  {setCapitalLetter(LoginFormFields.Password)}
                </label>
                <input
                  className="login__input form__input"
                  type={LoginFormFields.Password}
                  name={LoginFormFields.Password}
                  placeholder={setCapitalLetter(LoginFormFields.Password)}
                  required
                  onChange={handleChange}
                  value={loginForm.password}
                  autoComplete="off"
                  id={LoginFormFields.Password}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                onClick={() => dispatch(setActiveCity(LOGIN_CITY_LINK))}
                to={AppRoute.Main}
              >
                <span>{LOGIN_CITY_LINK}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
