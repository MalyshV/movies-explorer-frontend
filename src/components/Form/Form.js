import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Form = ({ name, title, textOnButton, underFormQuestion, linkName, children, linkPath }) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return(
    <div className="form">
      <div className="form__content">
        <Link className="form__link" to="/">
          <img className="form__logo" src={logo} alt="логотип сайта"/>
        </Link>
        <h2 className="form__title">{title}</h2>
        <form className="form__form" action="#" name={name} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form__container">
            {children}
            <button className="form__button" type="submit">{textOnButton}</button>
          </fieldset>
        </form>
        <div className="form__signin">
            <p className="form__text">{underFormQuestion}</p>
            <Link className="form__link" to={linkPath}>{linkName}</Link>
        </div>
      </div>
    </div>
  )
};

export default Form;
