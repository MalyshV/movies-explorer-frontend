import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Profile = () => {
  return (
    <>
      <Form logo="" name="profileForm" title="Привет, Виталий!" titleClassName="_place_profile" linkPath="/"  underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile">
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value="Виталий" placeholder="" spanText={errors.nameErr} />
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" tabIndex="2" value="pochta@yandex.ru" placeholder="" spanText={errors.mailErr} />
        <Button textOnButton="Редактировать" buttonClassName="_place_profile" tabIndex="3" />
      </Form>
      <ErrorPopup popupText={errors.updateProfileErr} />
    </>
  )
}

export default Profile;
