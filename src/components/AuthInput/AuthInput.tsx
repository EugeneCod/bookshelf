import classNames from 'classnames/bind';

import { useAppSelector } from '../../app/store/hooks';
import { selectUserIsLoading } from '../../app/store/user/selectors';

import s from './AuthInput.module.scss';

interface Props {
  value: string;
  error: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  type: string;
  name: string;
  label: string;
  minLength: number | undefined;
  maxLength: number | undefined;
  pattern?: string;
}

const AuthInput = (props: Props) => {
  const {
    value,
    error,
    isValid,
    onChange,
    onBlur,
    type,
    name,
    label,
    minLength,
    maxLength,
    pattern,
  } = props;

  const cx = classNames.bind(s);

  const inputClassNames = cx({
    'auth-input__input-line': true,
    'auth-input__input-line_invalid': !isValid,
  });

  const isLoading = useAppSelector(selectUserIsLoading);
  //const isLoading =true;

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    onChange(evt);
  }

  function handleBlur(evt: React.FocusEvent<HTMLInputElement, Element>): void {
    onBlur(evt);
  }

  return (
    <div className={s['auth-input']}>
      <label className={s['auth-input__label']} htmlFor={name}>
        {label}
      </label>
      <input
        required
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        type={type}
        name={name}
        id={name}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        readOnly={isLoading}
        className={inputClassNames}
      />
      <span className={s['auth-input__input-error']}>{error}</span>
    </div>
  );
};

export default AuthInput;
