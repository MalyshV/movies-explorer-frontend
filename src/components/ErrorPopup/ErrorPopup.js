import React from 'react';
import wrong from '../../images/2.svg';

/* пока проверка через файл .css */

const ErrorPopup = ({ isOpen, onClose, popupText }) => {

  return(
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__icon" src={wrong} alt="иконка модального окна" />
        <h3 className="popup__title">{popupText}</h3>
      </div>
    </div>
  )
};

export default ErrorPopup;
