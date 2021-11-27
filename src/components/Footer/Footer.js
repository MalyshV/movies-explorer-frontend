import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__columns">
        <nav className="footer__links">
          <Link className="footer__link" to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
          <Link className="footer__link" to="https://github.com/MalyshV" target="_blank">Github</Link>
          <Link className="footer__link" to="https://www.facebook.com/profile.php?id=100013538104816" target="_blank">Facebook</Link>
        </nav>
        <p class="footer__copyright">&copy; 2021</p>
      </div>
    </div>
  )
};

export default Footer;

