import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Register = ({ handleRegistration }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const isDisabled = values.email === '' || values.password === '' || !isValid || values.name === '';
  const registerButton = !isDisabled ? '' : ' button-disabled';

  const handleSubmit = (e) => {
    e.preventDefault();
    !isDisabled && handleRegistration(values.email, values.password, values.name);
  };

  return(
    <>
      <Form name="registerForm" title="Добро пожаловать!" underFormQuestion="Уже зарегистрированы?" linkPath="/signin" linkName="Войти" onSubmit={handleSubmit} >
        <FormInput required={true} minLength={2} maxLenght={30} inputType="text" inputName="name" labelName="Имя" inputId="name" labelFor="name" tabIndex="1" placeholder="" spanText={errors.name} value={values.name || ''} onChange={handleChange} />
        <FormInput required={true} inputType="email" inputName="email" labelName="E-mail" inputId="email" labelFor="email" tabIndex="2" placeholder="" spanText={errors.email} value={values.email || ''} onChange={handleChange} />
        <FormInput required={true} inputType="password" minLength={6} inputName="password" labelName="Пароль" inputId="password" labelFor="password" tabIndex="3" placeholder="" spanText={errors.password} value={values.password || ''} onChange={handleChange} />
        <Button buttonClassName={registerButton} textOnButton="Зарегистрироваться" tabIndex="4" />
      </Form>
    </>
  )
}

export default Register;
