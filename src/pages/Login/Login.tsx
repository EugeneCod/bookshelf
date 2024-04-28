import { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

import { ROUTES, REGEX, AUTH_ERROR_MESSAGES } from '../../utils/constants';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { AuthForm, AuthInput } from '../../components';

import s from './Login.module.scss';

const Login = () => {
  const {
    values,
    handleChange,
    hadleShiftFocus,
    errors,
    inputsValidity,
    isValid,
  } = useFormAndValidation(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Войти');

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    // TODO добавить логику запроса на авторизацию
    // fetchLogin(values.email, values.password);
    setSubmitBtnText('Выполнение...');
    setLoginErrorMessage(AUTH_ERROR_MESSAGES.UNIDENTIFIED);
    setTimeout(() => {
      <Navigate to={`/${ROUTES.MAIN}`} />;
    }, 4000);
  }

  return (
    <main className={s['login']}>
      <div className={s['login__container']}>
        <AuthForm
          className={s['login__auth-form']}
          name="login"
          onSubmit={handleSubmit}
          title="We are glad to see you!"
          buttonText={submitBtnText}
          isValid={isValid}
          notification={loginErrorMessage}
        >
          <AuthInput
            value={values.email}
            error={errors.email}
            isValid={inputsValidity.email}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="email"
            name="email"
            label="E-mail"
            minLength={undefined}
            maxLength={undefined}
            pattern={REGEX.EMAIL}
          />
          <AuthInput
            value={values.password}
            error={errors.password}
            isValid={inputsValidity.password}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="password"
            name="password"
            label="Пароль"
            minLength={undefined}
            maxLength={undefined}
          />
        </AuthForm>
        <p className="login__redirection">
          Ещё не зарегистрированы?
          <NavLink to={ROUTES.SIGNUP} className="login__redirection-link">
            Регистрация
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Login;
