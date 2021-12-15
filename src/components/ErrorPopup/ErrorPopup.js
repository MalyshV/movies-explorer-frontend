import React from 'react';
import wrong from '../../images/popup_bg_icon.svg';

// проверка по путям /signup, /signin и /profile

const ErrorPopup = ({ onClose, popupText, popupClassName }) => {
  return(
    <div className={popupClassName}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__icon" src={wrong} alt="иконка модального окна" />
        <h3 className="popup__title">{popupText}</h3>
      </div>
    </div>
  )
};

export default ErrorPopup;
