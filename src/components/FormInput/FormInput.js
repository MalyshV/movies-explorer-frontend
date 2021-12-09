import React from "react";

const FormInput = ({ labelClassName, inputClassName, labelName, inputType, inputName, spanText, tabIndex, value, placeholder, children, labelFor, inputId }) => {
  return(
    <>
      <label htmlFor={labelFor} className={`form__label form__label${labelClassName}`}>{labelName}</label>
      <input id={inputId} type={inputType} name={inputName} className={`form__input form__input${inputClassName}`} required tabIndex={tabIndex} value={value} placeholder={placeholder}/>
      <span className="form__error">{spanText}</span>
      { children }
    </>
  )
};

export default FormInput;
