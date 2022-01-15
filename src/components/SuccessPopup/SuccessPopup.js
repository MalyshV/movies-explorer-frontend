import React from 'react';
import { sucessMessages } from '../../utils/errorsConfig';
// import wrong from '../../images/popup_bg_icon.svg';

const SuccessPopup = ({ onUpdate }) => {
  return(
    <div className={`popup ${onUpdate ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <h3 className="popup__title">{sucessMessages.updateProfileSucsecc}</h3>
      </div>
    </div>
  )
};

export default SuccessPopup;

// toDo

// постараться найти сайт, с которого качала иконку, и подобрать подходящую
// <img className="popup__icon" src={wrong} alt="иконка модального окна" />