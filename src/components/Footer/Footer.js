import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__columns">
          <nav className="footer__links">
            <a className="footer__link" rel="noreferrer" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
            <a className="footer__link" rel="noreferrer" href="https://github.com/MalyshV" target="_blank">Github</a>
            <a className="footer__link" rel="noreferrer" href="https://www.facebook.com/profile.php?id=100013538104816" target="_blank">Facebook</a>
          </nav>
          <p className="footer__copyright">&copy; 2021</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
