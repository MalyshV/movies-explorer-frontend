import React from 'react';
import img from '../../images/searchIcon.svg';
import FormInput from '../FormInput/FormInput';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

/* const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies"></FormInput>
        <button className="search__button">Найти</button>
      </div>
      <FilterCheckbox />
    </section>
  )
}; */

const SearchForm = () => {
  return (
    <form className="search">
      <fieldset className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies"></FormInput>
        <button className="search__button">Найти</button>
      </fieldset>
      <FilterCheckbox />
    </form>
  )
};

export default SearchForm;
