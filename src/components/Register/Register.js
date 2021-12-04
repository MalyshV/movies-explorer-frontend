import React from 'react';
import Form from '../Form/Form';

const Register = () => {
  return(
    <Form name="registerForm" title="Добро пожаловать!" textOnButton="Зарегистрироваться" underFormQuestion="Уже зарегистрированы?" linkPath="/signin" linkName="Войти" >
      <label className="form__label">Имя</label>
      <input type="text" className="form__input" required tabIndex="1" />
      <span className="form__error">Что-то пошло не так...</span>
      <label className="form__label">E-mail</label>
      <input type="email" className="form__input" required tabIndex="2" />
      <span className="form__error" />
      <label className="form__label">Пароль</label>
      <input type="password" className="form__input" required tabIndex="3" />
      <span className="form__error" />
    </Form>
  )
}

export default Register;
