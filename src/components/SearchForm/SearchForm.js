import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import img from '../../images/search_icon.svg';
import FormInput from '../FormInput/FormInput';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

const SearchForm = (props) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([]);

  const filterMovies = cards.filter(card => {

    return card.nameRU.toLowerCase().includes(search.toLocaleLowerCase())
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hi');
  }

  return (
    <form className="search" autoComplete="off" onSubmit={handleSubmit} >
      <fieldset className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput onChange={ e => setSearch(e.target.value) } placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies" required="false"></FormInput>
        <Button textOnButton="Найти" buttonClassName="_place_search-form"/>
      </fieldset>
      <FilterCheckbox />
    </form>
  )
};

export default SearchForm;
