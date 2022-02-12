import React from 'react';
import { useLocation } from 'react-router-dom';
import { errors } from '../../utils/configs/index';
import wrong from '../../images/popup_bg_icon.svg'

const ErrorPopup = ({ onClose, isOpen }) => {
  const location = useLocation();

  const showMessage = (popupText) => {
    if (location.pathname === '/profile') {
      return popupText = errors.updateProfileErr;
    } else if (location.pathname === '/signin') {
      return popupText = errors.invalidEmailErr;
    } else if (location.pathname === '/signup') {
      return popupText = errors.invalidAuthErr;
    } else if (location.pathname === '/movies') {
      return popupText = errors.showMoviesErr;
    } else if (location.pathname === '/saved-movies') {
      return popupText = errors.serverErr;
    }
  };

  return(
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className='popup__content'>
        <button className='popup__close' type='button' onClick={onClose}></button>
        <img className='popup__icon' src={wrong} alt='иконка модального окна' />
        <h3 className='popup__title'>{showMessage()}</h3>
      </div>
    </div>
  )
};

export default ErrorPopup;
