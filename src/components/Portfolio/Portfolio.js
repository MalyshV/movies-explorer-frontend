import React from 'react';
import linkIcon from '../../images/text__COLOR_font-main.svg';

const Portfolio = () => {
  return (
    <nav className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__links">
          <li><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://www.facebook.com/">Статичный сайт<img className="portfolio__icon" src={linkIcon} alt="Логотип Инстаграм"/></a></li>
          <li><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://malyshv.github.io/russian-travel/">Адаптивный сайт<img className="portfolio__icon" src={linkIcon} alt="Логотип Инстаграм"/></a></li>
          <li><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://express.mesto.nomoredomains.icu/">Одностраничное приложение<img className="portfolio__icon" src={linkIcon} alt="Логотип Инстаграм"/></a></li>
        </ul>
    </nav>
  )
};


export default Portfolio;
