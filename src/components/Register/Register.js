import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/constants';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Register = () => {
  return(
    <>
      <Form name="registerForm" title="Добро пожаловать!" underFormQuestion="Уже зарегистрированы?" linkPath="/signin" linkName="Войти" >
        <FormInput inputType="text" labelName="Имя" inputId="name" labelFor="name" tabIndex="1" placeholder="" spanText={errors.nameErr} />
        <FormInput inputType="email" labelName="E-mail" inputId="email" labelFor="email" tabIndex="2" placeholder="" spanText={errors.mailErr} />
        <FormInput inputType="password" labelName="Пароль" inputId="psw" labelFor="psw" tabIndex="3" placeholder="" spanText={errors.pswErr} />
        <Button textOnButton="Зарегистрироваться" tabIndex="4" />
      </Form>
      <ErrorPopup popupText={errors.dubbleEmailErr} />
    </>
  )
}

export default Register;
