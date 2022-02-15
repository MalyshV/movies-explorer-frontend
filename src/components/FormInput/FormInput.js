import React from 'react';

const FormInput = ({ labelClassName, inputClassName, labelName, inputType, inputName, spanText, spanClassName, tabIndex, value, placeholder, labelFor, inputId, onChange, minLength, maxLenght, pattern, required, defaultValue }) => {
  return(
    <>
      <label htmlFor={labelFor} className={`form__label form__label${labelClassName}`}>{labelName}</label>
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        className={`form__input form__input${inputClassName}`}
        required={required}
        pattern={pattern}
        tabIndex={tabIndex}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxlenght={maxLenght}
        autoComplete='off'
        defaultValue={defaultValue}
      />
      <span className={`form__error form__error${spanClassName}`}>{spanText}</span>
    </>
  )
};

export default FormInput;
