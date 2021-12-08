import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

const Profile = () => {
  return (
    <Form logo="" name="profileForm" title="Привет, Виталий!" titleClassName="_place_profile" linkPath="/" underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile">
      <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value="Виталий" placeholder="" />
      <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" tabIndex="2" value="pochta@yandex.ru" placeholder="" />
      <Button textOnButton="Редактировать" buttonClassName="_place_profile"/>
    </Form>
  )
}

export default Profile;
