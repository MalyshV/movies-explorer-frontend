import React from 'react';
import { errors, successMessages } from '../../utils/configs/index';
import { useLocation } from 'react-router-dom';

const SuccessPopup = ({ onUpdate }) => {
  const location = useLocation();

  const showMessage = (popupText) => {
    if (location.pathname === '/profile') {
      return popupText = successMessages.updateProfilesuccess;
    } else if (location.pathname === '/movies' || '/saved-movies') {
      return popupText = errors.emptySearchErr;
    }
  };

  return(
    <div className={`popup ${onUpdate ? 'popup_is-opened' : ''}`}>
      <div className='popup__content'>
        <h3 className='popup__title'>{showMessage()}</h3>
      </div>
    </div>
  )
};

export default SuccessPopup;
