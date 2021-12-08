import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

const Form = ({ name, title, titleClassName, textOnButton, underFormQuestion, linkName, children, linkPath, linkClassName, buttonClassName, profileLinkClassName }) => {
  return(
    <div className="form">
      <div className="form__content">
        <Link className={`form__link form__link${linkClassName}`} to="/">
          <img className="form__logo" src={logo} alt="логотип сайта"/>
        </Link>
        <h2 className={`form__title form__title${titleClassName}`}>{title}</h2>
        <form className="form__form" action="#" name={name}>
          <fieldset className="form__container">
            {children}
            <button className={`form__button form__button${buttonClassName}`} type="submit">{textOnButton}</button>
          </fieldset>
        </form>
        <div className="form__signin">
          <p className="form__text">{underFormQuestion}</p>
          <Link className={`form__link form__link${profileLinkClassName}`} to={linkPath}>{linkName}</Link>
        </div>
      </div>
    </div>
  )
};

export default Form;
