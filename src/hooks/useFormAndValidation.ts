import { useState, useCallback } from 'react';

const initialValues = {
  email: '',
  password: '',
  name: '',
};

const initialErrors = {
  email: '',
  password: '',
  name: '',
};

const initialValidity = {
  email: true,
  password: true,
  name: true,
};

export default function useFormAndValidation(validity: boolean) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [inputsValidity, setInputsValidity] = useState(initialValidity);
  const [isValid, setIsValid] = useState(validity);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setInputsValidity({ ...inputsValidity, [name]: true });
    const closestForm = evt.target.closest('form');
    closestForm && setIsValid(closestForm.checkValidity());
  };

  const hadleShiftFocus = (
    evt: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    const { name } = evt.target;
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setInputsValidity({ ...inputsValidity, [name]: evt.target.validity.valid });
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = initialErrors, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    setValues,
    handleChange,
    hadleShiftFocus,
    errors,
    setErrors,
    inputsValidity,
    setInputsValidity,
    isValid,
    setIsValid,
    resetForm,
  };
}
