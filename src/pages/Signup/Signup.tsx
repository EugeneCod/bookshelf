import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';

import { ROUTES, REGEX, AUTH_ERROR_MESSAGES } from '../../utils/constants';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { AuthForm, AuthInput } from '../../components';

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

  const navigate = useNavigate();
  const auth = getAuth();
  
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [submitBtnText, setSubmitBtnText] = useState('Register');

  function register(email: string, password: string) {
    setSubmitBtnText('Processing...');
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate(ROUTES.SIGNIN);
    })
    .catch((error) => {
      setSubmitBtnText('Register');
      error.code === 'auth/email-already-in-use'
      ? setSignupErrorMessage(AUTH_ERROR_MESSAGES.EMAIL_CONFLICT)
      : setSignupErrorMessage(AUTH_ERROR_MESSAGES.UNIDENTIFIED)
    });
  }

  function handleSignup() {
    register(values.email, values.password);
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
          <NavLink
            to={ROUTES.SIGNIN}
            className={s['signup__redirection-link']}
          >
            Log in
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Signup;
