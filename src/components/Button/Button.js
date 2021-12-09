import React from 'react';

const Button = ({ buttonClassName, textOnButton, tabIndex, onClick }) => {
  return(
    <button onClick={onClick} className={`button button${buttonClassName}`} type="submit" tabIndex={tabIndex}>{textOnButton}</button>
  )
};

export default Button;
