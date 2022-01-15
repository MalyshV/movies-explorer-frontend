import React from 'react';
import img from '../../images/search_icon.svg';
import FormInput from '../FormInput/FormInput';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

const SearchForm = ({ isShortChecked, setIsShortChecked, onSubmit, onChange }) => {
  /* const [search, setIsSearch] = useState('');

  const handleSearch = (e) => {
    setIsSearch(e.target.value);
    console.log(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.prevent.default();
    handleSearchCard(search);
    setIsSearch('');
    console.log('поломалось')
  } */

  return (
    <form className="search" autoComplete="off" onSubmit={onSubmit} >
      <fieldset className="search__box">
        <img src={img} alt="иконка поиска" className="search__icon" />
        <FormInput onChange={onChange} required={false} placeholder="Фильм" inputType="search" tabIndex="1" inputName="search" labelClassName="_place_movies" inputClassName="_place_movies" />
        <Button textOnButton="Найти" buttonClassName="_place_search-form" />
      </fieldset>
      <FilterCheckbox setIsShortChecked={setIsShortChecked} isShortChecked={isShortChecked} />
    </form>
  )
};

export default SearchForm;

// из кнопки onClick={handleSubmit}
// убрала minLength, т.к. по чек-листу пользователь может отправить пустой запрос и получить на это попап с ошибкой
