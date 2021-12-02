import React from 'react';
import img from '../../images/searchIcon.svg';

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__box">
          <img src={img} alt="иконка поиска" className="search__icon" />
          <h3 className="search__title">Фильм</h3>
          <button className="search__button">Найти</button>
        </div>
        <fieldset className="search__container">
          <input type="search" placeholder="Фильм" className="search__input" />
        </fieldset>
      </form>
    </section>
  )
};

export default SearchForm;
