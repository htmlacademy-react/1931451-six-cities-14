import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types';
import { useAuthorizationStatus } from '../../context/authorization-status';
import { checkAuthorizationStatus, setCapitalLetter } from '../../utils/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormType } from './login-screen.type';
import { LoginFormFields, USER_ADMIN } from './login-screen.const';
import { LOCAL_STORAGE_KEY } from '../../const';

type LocationType = {
  state: { from: AppRoute};
}

export default function LoginScreen(): JSX.Element {
  const { authorizationStatus, setAuthorizationStatus } =
    useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const navigate = useNavigate();
  const { state } = useLocation() as LocationType;

  const [loginForm, setLoginForm] = useState<LoginFormType>({ // TODO: Нужен ли здесь дженерик LoginFormType
    [LoginFormFields.Email]: '',
    [LoginFormFields.Password]: '',
  });

  if (isLogged) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLoginForm(
      (prevState): LoginFormType => ({ // TODO: Здесь также используется анотация LoginFormType
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
      navigate(state.from, {replace: true});
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
                <label className="visually-hidden" htmlFor={LoginFormFields.Email}>
                  {setCapitalLetter(LoginFormFields.Email)}
                </label>
                <input
                  className="login__input form__input"
                  // type={LoginFormFields.Email}
                  type="text" // FIXME: Временно передаю type='text' здесь конечно же email
                  name={LoginFormFields.Email}
                  placeholder={setCapitalLetter(LoginFormFields.Email)}
                  required
                  onChange={handleChange}
                  value={loginForm.email}
                  autoFocus
                  id={LoginFormFields.Email}
                  autoComplete='on'
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor={LoginFormFields.Password}>
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
              {/* FIXME: Исправить тег а */}
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
