import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import { useAuthorizationStatus } from '../../context/authorization-status';
import { checkAuthorizationStatus, setCapitalLetter } from '../../utils/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormType } from './login-screen.type';
import { LoginFormFields, USER_ADMIN } from './login-screen.const';
import { LOCAL_STORAGE_KEY } from '../../const';

// FIXME: Добавить фокус на input:email при переходе на эту страница
// FIXME: Насроить переход на страницу с которой пользователь зашел после авторизации
export default function LoginScreen(): JSX.Element {
  const { authorizationStatus, setAuthorizationStatus } =
    useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  // TODO: Нужен ли здесь дженерик LoginFormType
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    [LoginFormFields.Email]: '',
    [LoginFormFields.Password]: '',
  });

  if (isLogged) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    // TODO: Здесь также используется анотация LoginFormType
    setLoginForm(
      (prevState): LoginFormType => ({
        ...prevState,
        [target.name]: target.value,
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
                <label className="visually-hidden">{setCapitalLetter(LoginFormFields.Email)}</label>
                <input
                  className="login__input form__input"
                  // type={LoginFormFields.Email}
                  type="text" // FIXME: Временно передаю type='text' здесь конечно же email
                  name={LoginFormFields.Email}
                  placeholder={setCapitalLetter(LoginFormFields.Email)}
                  required
                  onChange={handleChange}
                  value={loginForm.email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">{setCapitalLetter(LoginFormFields.Password)}</label>
                <input
                  className="login__input form__input"
                  type={LoginFormFields.Password}
                  name={LoginFormFields.Password}
                  placeholder={setCapitalLetter(LoginFormFields.Password)}
                  required
                  onChange={handleChange}
                  value={loginForm.password}
                  autoComplete='off'
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
