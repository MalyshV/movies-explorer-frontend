import React from 'react';

const Button = ({ buttonClassName, textOnButton, tabIndex, onClick, buttonDisabled }) => {
  return(
    <button
      onClick={onClick}
      className={`button button${buttonClassName}`}
      type="submit"
      disabled={buttonDisabled}
      tabIndex={tabIndex}>
        {textOnButton}
    </button>
  )
};

export default Button;
