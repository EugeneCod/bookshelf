import classNames from 'classnames/bind';

import s from './AuthForm.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  name: string;
  onSubmit: () => void;
  title: string;
  buttonText: string;
  isValid: boolean;
  className: string;
  notification: string;
}

const AuthForm = (props: Props) => {
  const {
    children,
    name,
    onSubmit,
    title,
    buttonText,
    isValid,
    className,
    notification,
  } = props;

  const cx = classNames.bind(s);

  const formClassNames = cx({
    'auth-form': true,
    [className]: true,
  });

  const buttonClassNames = cx({
    'auth-form__button': true,
    // TODO Добавить глобальный стейт isLoading
    'auth-form__button_inactive': !isValid, // || isLoading
  });

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      name={name}
      className={formClassNames}
      id={name}
    >
      <fieldset className={s['auth-form__fieldset']} form={name}>
        <legend className={s['auth-form__legend']}>{title}</legend>
        <div className={s['auth-form__inputs-stack']}>{children}</div>
        <p className={s['auth-form__notification-block']}>{notification}</p>
        <button
          type="submit"
          className={buttonClassNames}
          // TODO Добавить глобальный стейт isLoading
          disabled={!isValid} // || isLoading
        >
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
};

export default AuthForm;
