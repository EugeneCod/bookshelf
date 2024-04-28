import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Login');

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    // TODO добавить логику запроса на авторизацию
    // fetchLogin(values.email, values.password);
    setSubmitBtnText('Processing...');
    setLoginErrorMessage(AUTH_ERROR_MESSAGES.UNIDENTIFIED);
    setTimeout(() => {
      navigate(ROUTES.MAIN)
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
            maxLength={50}
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
            label="Password"
            minLength={undefined}
            maxLength={undefined}
          />
        </AuthForm>
        <p className={s['login__redirection']}>
          Not registered yet?
          <NavLink to={ROUTES.SIGNUP} className={s['login__redirection-link']}>
            Sign up
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Login;
