import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';

const Profile = () => {
  return (
    <Form logo="" name="profileForm" title="Привет, Виталий!" textOnButton="Редактировать" linkPath="/" underFormQuestion="" linkName="Выйти из аккаунта">
      <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value="Виталий"/>
      <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" tabIndex="2" value="pochta@yandex.ru"/>
    </Form>
  )
}

export default Profile;
