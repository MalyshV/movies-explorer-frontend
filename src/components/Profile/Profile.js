import React from 'react';
import Form from '../Form/Form';

const Profile = () => {
  return (
    <Form name="profileForm" title="Привет, Виталий!" textOnButton="Редактировать" underFormQuestion="Уже зарегистрированы?" linkPath="/" linkName="Выйти из аккаунта">
      <label className="form__label form__label_type_loggedin">Имя</label>
      <input type="text" name="userName" className="form__input form__input_type_loggedin" required tabIndex="1" value={'Виталий'} />
      <span className="form__error" />
      <input type="email" className="form__input form__input_type_loggedin" required tabIndex="2" value={'pochta@yandex.ru'} />
      <label className="form__label form__label_type_loggedin">E-mail</label>
      <span className="form__error" />
    </Form>
  )
}

export default Profile;
