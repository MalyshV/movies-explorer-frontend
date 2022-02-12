import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavMobile } from '../index';
import accauntIcon from '../../images/accaunt_icon.svg';

const Navigation = ({ type }) => {
  return (
    <>
      { type !== 'loggedIn' &&
        <ul className='nav__links'>
          <Link className='nav__link' to='/signup'>Регистрация</Link>
          <Link className='nav__link' to='/signin'>Войти</Link>
        </ul>
      }
      { type === 'loggedIn' &&
      <>
        <Nav />
        <NavMobile />
        <Link className='nav__accaunt nav__accaunt_type_loggedIn' to='/profile'>
          <img className='nav__icon' alt='иконка входа в аккаунт' src={accauntIcon} />
          <p className='nav__text'>Аккаунт</p>
        </Link>
      </>
      }
    </>
  );
};

export default Navigation;
