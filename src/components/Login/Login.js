import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';

const Login = () => {
  return (
    <>
      <Form name="loginForm" title="Рады видеть!" textOnButton="Войти" underFormQuestion="Ещё не зарегистрированы?" linkPath="/signup" linkName="Регистрация" >
        <FormInput inputType="email" labelName="E-mail" tabIndex="2"/>
        <FormInput inputType="password" labelName="Пароль" tabIndex="3"/>
      </Form>
    </>
  )
};

export default Login;
