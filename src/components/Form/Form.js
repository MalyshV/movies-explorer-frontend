import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Form = ({ name, title, textOnButton, underFormQuestion, linkName, children, linkPath }) => {

  const logoClass = "form__logo" || "form__logo_type_loggedin";

  return(
    <div className="form">
      <div className="form__content">
        <Link className="form__link" to="/">
          <img className={logoClass} src={logo} alt="логотип сайта"/>
        </Link>
        <h2 className="form__title">{title}</h2>
        <form className="form__form" action="#" name={name}>
          <fieldset className="form__container">
            {children}
            <button className="form__button" type="button">{textOnButton}</button>
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
