import React from 'react';

const Button = ({ buttonClassName, textOnButton }) => {
  return(
    <button className={`button button${buttonClassName}`} type="submit">{textOnButton}</button>
  )
};

export default Button;
