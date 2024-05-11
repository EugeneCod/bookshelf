import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/store/hooks';
import { ROUTES, REGEX } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { AuthForm, AuthInput } from '../../components';
import { login } from '../../utils/authApi';
import { setUserIsLoading } from '../../app/store/user/slice';

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
  const dispatch = useAppDispatch();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Login');

  async function handleLogin(): Promise<void> {
    dispatch(setUserIsLoading(true));
    setLoginErrorMessage('');
    setSubmitBtnText('Processing...');
    login(values.email, values.password)
      .then(() => {
        navigate(ROUTES.MAIN);
      })
      .catch((err) => {
        setLoginErrorMessage(err);
      })
      .finally(() => {
        dispatch(setUserIsLoading(false));
        setSubmitBtnText('Login');
      });
  }

  return (
    <main className={s['login']}>
      <div className={s['login__container']}>
        <AuthForm
          className={s['login__auth-form']}
          name="login"
          onSubmit={handleLogin}
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
