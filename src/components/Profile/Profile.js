import React, { useState }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Profile = () => {
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [userName, setUserName] = useState('Виталий');
  const [userEmail, setUserEmail] = useState('pochta@yandex.ru');

  const showPopupForRewier = (e) => {
    e.preventDefault();
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  const handleClosePopup = () => setIsErrorPopupOpen(false);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange =(e) => {
    setUserEmail(e.target.value);
  };

  return (
    <>
      <Form logo="" name="profileForm" title="Привет, Виталий!" titleClassName="_place_profile" linkPath="/"  underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile" onSubmit={showPopupForRewier}>
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value={userName} placeholder="" spanText={errors.nameErr} onChange={handleUserNameChange} />
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" tabIndex="2" value={userEmail} placeholder="" spanText={errors.mailErr} onChange={handleUserEmailChange} />
        <Button textOnButton="Редактировать" buttonClassName="_place_profile" tabIndex="3" />
      </Form>
      { isErrorPopupOpen && <ErrorPopup popupClassName="popup popup_is-opened" popupText={errors.updateProfileErr} onClose={handleClosePopup} /> }
    </>
  )
}

export default Profile;
