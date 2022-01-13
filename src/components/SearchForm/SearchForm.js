import React from 'react';
import img from '../../images/search_icon.svg';
import FormInput from '../FormInput/FormInput';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

const SearchForm = ({ isShortChecked, setIsShortChecked, onSubmit }) => {

  return (
    <form className="search" autoComplete="off" onSubmit={onSubmit} >
      <fieldset className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput minLength={2} placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies" required="false" />
        <Button textOnButton="Найти" buttonClassName="_place_search-form" />
      </fieldset>
      <FilterCheckbox setIsShortChecked={setIsShortChecked} isShortChecked={isShortChecked} />
    </form>
  )
};

export default SearchForm;
