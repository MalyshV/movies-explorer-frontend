import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Profile = () => {
  return (
    <div className="page">
      <Header />
      <div className="register">
        <div className="register__content register__content_type_loggedin">
          <h2 className="register__title register__title_type_loggedin">Привет, Виталий!</h2>
          <form className="register__form">
            <fieldset className="register__container register__container_type_loggedin">
              <label className="register__label register__label_type_loggedin">Имя</label>
              <input type="text" className="register__input register__input_type_loggedin" required tabIndex="1" value={'Виталий'} />
              <span className="register__error" />
              <input type="email" className="register__input register__input_type_loggedin" required tabIndex="2" value={'pochta@yandex.ru'} />
              <label className="register__label register__label_type_loggedin">E-mail</label>
              <span className="register__error" />
              <button className="register__button register__button_type_loggedin">Редактировать</button>
            </fieldset>
          </form>
          <div className="register__signin">
              <p className="register__text"></p>
              <Link className="register__link register__link_type_loggedin" to="/">Выйти из аккаунта</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
