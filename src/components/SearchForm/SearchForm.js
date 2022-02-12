import React from 'react';
import { Button, FilterCheckbox, FormInput } from '../index';
import img from '../../images/search_icon.svg';

const SearchForm = ({ onSubmit, onChange, checkbox, setCheckbox }) => {
  const handleCheckbox = () => {
    localStorage.setItem('checkboxData', JSON.stringify(!checkbox));
    setCheckbox(!checkbox);
  };

  return (
    <form className='search' autoComplete='off' onSubmit={onSubmit} >
      <fieldset className='search__box'>
        <img src={img} alt='иконка поиска' className='search__icon' />
        <FormInput onChange={onChange} required={false} placeholder='Фильм' inputType='search' tabIndex='1' inputName='search' labelClassName='_place_movies' inputClassName='_place_movies' />
        <Button textOnButton='Найти' buttonClassName='_place_search-form' />
      </fieldset>
      <FilterCheckbox onClick={handleCheckbox} defaultChecked={checkbox} />
    </form>
  )
};

export default SearchForm;
