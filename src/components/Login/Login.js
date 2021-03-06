import React from 'react';
import { Form, FormInput, Button } from '../index';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Login = ({ handleAuthorization }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const isDisabled = values.email === '' || values.password === '' || !isValid;
  const loginButton = !isDisabled ? '' : ' button-disabled';

  const handleSubmit = (event) => {
    event.preventDefault();
    !isDisabled && handleAuthorization(values.email, values.password);
    resetForm();
  };

  return (
    <>
      <Form name='loginForm' title='Рады видеть!' textOnButton='Войти' underFormQuestion='Ещё не зарегистрированы?' linkPath='/signup' linkName='Регистрация' onSubmit={handleSubmit}>
        <FormInput
          inputType='email'
          inputName='email'
          labelName='Email'
          inputId='email'
          labelFor='email'
          tabIndex='1'
          placeholder=''
          required={true}
          value={values.email || ''}
          onChange={handleChange}
          spanText={errors.email}
        />
        <FormInput
          inputType='password'
          inputName='password'
          labelName='Пароль'
          inputId='password'
          labelFor='password'
          tabIndex='2'
          placeholder=''
          required={true}
          value={values.password || ''}
          onChange={handleChange}
          spanText={errors.password}
        />
        <Button buttonClassName={loginButton} textOnButton='Войти' tabIndex='3' />
      </Form>
    </>
  )
};

export default Login;
