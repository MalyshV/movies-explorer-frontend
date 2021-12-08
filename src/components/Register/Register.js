import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';

const Register = () => {
  return(
    <Form name="registerForm" title="Добро пожаловать!" textOnButton="Зарегистрироваться" underFormQuestion="Уже зарегистрированы?" linkPath="/signin" linkName="Войти" >
      <FormInput inputType="text" labelName="Имя" tabIndex="1" placeholder="" />
      <FormInput inputType="email" labelName="E-mail" tabIndex="2" placeholder="" />
      <FormInput inputType="password" labelName="Пароль" tabIndex="3" placeholder="" />
    </Form>
  )
}

export default Register;
