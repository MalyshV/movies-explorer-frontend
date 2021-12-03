import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="register">
      <div className="register__content">
        <Link className="register__link" to="/">
          <img className="register__logo" src={logo} alt="логотип сайта"/>
        </Link>
        <h2 className="register__title">Рады видеть!</h2>
        <form className="register__form">
          <fieldset className="register__container">
            <label className="register__label">E-mail</label>
            <input type="email" className="register__input" required tabIndex="2" />
            <span className="register__error" />
            <label className="register__label">Пароль</label>
            <input type="password" className="register__input" required tabIndex="3" />
            <span className="register__error" />
            <button className="register__button">Войти</button>
          </fieldset>
        </form>
        <div className="register__signin">
            <p className="register__text">Ещё не зарегистрированы?</p>
            <Link className="register__link" to="/signup">Регистрация</Link>
          </div>
      </div>
    </div>
  )
};

export default Login;
