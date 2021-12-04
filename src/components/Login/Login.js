import React from 'react';
import Form from '../Form/Form';

const Login = () => {
  return (
    <Form name="loginForm" title="Рады видеть!" textOnButton="Войти" underFormQuestion="Ещё не зарегистрированы?" linkPath="/signup" linkName="Регистрация" >
      <label className="form__label">E-mail</label>
      <input type="email" className="form__input" required tabIndex="2" />
      <span className="form__error" />
      <label className="form__label">Пароль</label>
      <input type="password" className="form__input" required tabIndex="3" />
      <span className="form__error" />
    </Form>
  )
};

export default Login;
