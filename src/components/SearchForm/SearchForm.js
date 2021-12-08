import React from 'react';
import img from '../../images/searchIcon.svg';
import FormInput from '../FormInput/FormInput';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

const SearchForm = () => {
  return (
    <form className="search">
      <fieldset className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies"></FormInput>
        <Button textOnButton="Найти" buttonClassName="_place_search-form"/>
      </fieldset>
      <FilterCheckbox />
    </form>
  )
};

export default SearchForm;
