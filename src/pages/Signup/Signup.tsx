import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ROUTES, REGEX } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { AuthForm, AuthInput } from '../../components';
import { register } from '../../utils/authApi';
import { useAppDispatch } from '../../app/store/hooks';
import { setUserIsLoading } from '../../app/store/user/slice';

import s from './Signup.module.scss';

const Signup = () => {
  const {
    values,
    handleChange,
    hadleShiftFocus,
    errors,
    inputsValidity,
    isValid,
  } = useFormAndValidation(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Register');

  async function handleSignup(): Promise<void> {
    dispatch(setUserIsLoading(true));
    setSignupErrorMessage('');
    setSubmitBtnText('Processing...');
    register(values.email, values.password)
      .then(() => {
        navigate(ROUTES.MAIN);
      })
      .catch((err) => {
        setSignupErrorMessage(err);
      })
      .finally(() => {
        dispatch(setUserIsLoading(false));
        setSubmitBtnText('Register');
      });
  }

  return (
    <main className={s['signup']}>
      <div className={s['signup__container']}>
        <AuthForm
          className={s['signup__auth-form']}
          name="signup"
          onSubmit={handleSignup}
          title="Welcome!"
          buttonText={submitBtnText}
          isValid={isValid}
          notification={signupErrorMessage}
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
            minLength={8}
            maxLength={undefined}
          />
        </AuthForm>
        <p className={s['signup__redirection']}>
          Already registered?
          <NavLink to={ROUTES.SIGNIN} className={s['signup__redirection-link']}>
            Log in
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Signup;
