import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import { useAuthorizationStatus } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormType } from './login-screen.type';
import { USER_ADMIN } from './login-screen.const';
import { LOCAL_STORAGE_KEY } from '../../const';

// FIXME: Добавить фокус на input:email при переходе на эту страница
// FIXME: Насроить переход на страницу с которой пользователь зашел после авторизации
export default function LoginScreen(): JSX.Element {
  const { authorizationStatus, setAuthorizationStatus } =
    useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  if (isLogged) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLoginForm(
      (prevState): LoginFormType => ({
        ...prevState,
        [evt.target.name]: evt.target.value,
      })
    );
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password } = loginForm;
    if (email === password && password === USER_ADMIN) {
      setAuthorizationStatus(AuthorizationStatus.Auth);
      localStorage.setItem(LOCAL_STORAGE_KEY, AuthorizationStatus.Auth);
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities: Login</title>
      </Helmet>

      <Header isLoginScreen />
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
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  // type="email"
                  type="text" // FIXME: Временно передаю type='text' здесь конечно же email
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={loginForm.email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  value={loginForm.password}
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
