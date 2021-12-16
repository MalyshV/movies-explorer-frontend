import React, { useState } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';

// import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Register = ({ handleRegistration }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleChangeName = (e) => setUserName(e.target.value);
  const handleChangeEmail = (e) => setUserEmail(e.target.value);
  const handleChangePassword = (e) => setUserPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = userName;
    const email = userEmail;
    const password = userPassword;

    handleRegistration(email, password, name);
    console.log('И я submitted');

    // reset(); ??
  };

  return(
    <>
      <Form name="registerForm" title="Добро пожаловать!" underFormQuestion="Уже зарегистрированы?" linkPath="/signin" linkName="Войти" onSubmit={handleSubmit} >
        <FormInput inputType="text" labelName="Имя" inputId="name" labelFor="name" tabIndex="1" placeholder="" spanText={errors.nameErr} value={userName} onChange={handleChangeName} />
        <FormInput inputType="email" labelName="E-mail" inputId="email" labelFor="email" tabIndex="2" placeholder="" spanText={errors.mailErr} value={userEmail} onChange={handleChangeEmail} />
        <FormInput inputType="password" labelName="Пароль" inputId="psw" labelFor="psw" tabIndex="3" placeholder="" spanText={errors.pswErr} value={userPassword} onChange={handleChangePassword} />
        <Button textOnButton="Зарегистрироваться" tabIndex="4" />
      </Form>
    </>
  )
}

export default Register;

// убираем попаз попапа с ошибкой для ревью

  /* const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const showPopupForRewier = (e) => {
    e.preventDefault();
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  const handleClosePopup = () => setIsErrorPopupOpen(false); */

  /*
      { isErrorPopupOpen && <ErrorPopup popupClassName="popup popup_is-opened" popupText={errors.dubbleEmailErr} onClose={handleClosePopup} /> }
  */
