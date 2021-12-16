import React, { useState } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';

const Login = ({ handleAuthorization }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleChangeEmail = (e) => setUserEmail(e.target.value);
  const handleChangePassword = (e) => setUserPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = userEmail;
    const password = userPassword;

    handleAuthorization(email, password);
  }

  return (
    <>
      <Form name="loginForm" title="Рады видеть!" textOnButton="Войти" underFormQuestion="Ещё не зарегистрированы?" linkPath="/signup" linkName="Регистрация" onSubmit={handleSubmit}>
        <FormInput inputType="email" labelName="Email" inputId="email" labelFor="email" tabIndex="1" placeholder="" spanText={errors.mailErr} value={userEmail} onChange={handleChangeEmail} />
        <FormInput inputType="password" labelName="Пароль" inputId="psw" labelFor="psw" tabIndex="2" placeholder="" value={userPassword} onChange={handleChangePassword} />
        <Button textOnButton="Войти" tabIndex="3" />
      </Form>
    </>
  )
};

export default Login;
