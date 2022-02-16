import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, FilterCheckbox, FormInput } from '../index';
import img from '../../images/search_icon.svg';

const SearchForm = ({ onSubmit, onChange, checkbox, setCheckbox }) => {
  const location = useLocation();

  const handleCheckbox = () => {
    localStorage.setItem('checkboxData', JSON.stringify(!checkbox));
    setCheckbox(!checkbox);
  };

  const setSearchValue = () => {
    return location.pathname === '/movies' ? localStorage.getItem('searchQuery') : localStorage.getItem('savedSearchQuery');
  };

  return (
    <form className='search' autoComplete='off' onSubmit={onSubmit} >
      <fieldset className='search__box'>
        <img src={img} alt='иконка поиска' className='search__icon' />
        <FormInput
          onChange={onChange}
          required={false}
          placeholder='Фильм'
          inputType='search'
          tabIndex='1'
          inputName='search'
          labelClassName='_place_movies'
          inputClassName='_place_movies'
          defaultValue = {setSearchValue() || ''}
        />
        <Button textOnButton='Найти' buttonClassName='_place_search-form' />
      </fieldset>
      <FilterCheckbox onClick={handleCheckbox} defaultChecked={checkbox} />
    </form>
  )
};

export default SearchForm;
