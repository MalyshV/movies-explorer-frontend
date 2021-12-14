import React from "react";
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import NavMobile from '../NavMobile/NavMobile';
import accauntIcon from '../../images/icon__accaunt.svg';

const Navigation = ({ type, isMobile }) => {

  return (
    <>
      { type !== 'loggedIn' &&
        <ul className="nav__links">
          <Link className="nav__link" to="/signup">Регистрация</Link>
          <Link className="nav__link" to="/signin">Войти</Link>
        </ul>
      }
      { type === 'loggedIn' &&
      <div className="nav">
        <ul className="nav__pages">
          <Nav />
          { isMobile && <NavMobile /> }
        </ul>
        <Link className='nav__accaunt nav__accaunt_type_loggedIn' to="/profile">
          <img className="nav__icon" alt="иконка входа в аккаунт" src={accauntIcon} />
          <p className="nav__text">Аккаунт</p>
        </Link>
      </div>
      }
    </>
  )
};

export default Navigation;
