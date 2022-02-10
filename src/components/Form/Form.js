import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_icon.svg';

const Form = ({ name, onSubmit, onClick, title, titleClassName, underFormQuestion, linkName, children, linkPath, linkClassName, profileLinkClassName }) => {

  return(
    <div className="form">
      <div className="form__content">
        <Link className={`form__link form__link${linkClassName}`} to="/">
          <img className="form__logo" src={logo} alt="логотип сайта"/>
        </Link>
        <h2 className={`form__title form__title${titleClassName}`}>{title}</h2>
        <form autoComplete="off" className="form__form" action="#" name={name} onSubmit={onSubmit}>
          <fieldset className="form__container">
            {children}
          </fieldset>
        </form>
        <div className="form__signin">
          <p className="form__text">{underFormQuestion}</p>
          <Link onClick={onClick} className={`form__link form__link${profileLinkClassName}`} to={linkPath}>{linkName}</Link>
        </div>
      </div>
    </div>
  )
};

export default Form;
