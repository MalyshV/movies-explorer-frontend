import React from "react";

const FormInput = ({ labelClassName, inputClassName, labelName, inputType, inputName, spanText, tabIndex, value }) => {
  return(
    <>
      <label className={`form__label form__label${labelClassName}`}>{labelName}</label>
      <input type={inputType} name={inputName} className={`form__input form__input${inputClassName}`} required tabIndex={tabIndex} value={value}/>
      <span className="form__error">{spanText}</span>
    </>
  )
};

export default FormInput;