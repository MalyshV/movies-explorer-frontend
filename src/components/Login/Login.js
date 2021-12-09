import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Login = () => {
  return (
    <>
      <Form name="loginForm" title="Рады видеть!" textOnButton="Войти" underFormQuestion="Ещё не зарегистрированы?" linkPath="/signup" linkName="Регистрация" >
        <FormInput inputType="email" labelName="Email" inputId="email" labelFor="email" tabIndex="1" placeholder="" spanText={errors.mailErr} />
        <FormInput inputType="password" labelName="Пароль" inputId="psw" labelFor="psw" tabIndex="2" placeholder="" />
        <Button textOnButton="Войти" tabIndex="3" />
      </Form>
      <ErrorPopup popupText={errors.invalidEmailErr} />
    </>
  )
};

export default Login;
