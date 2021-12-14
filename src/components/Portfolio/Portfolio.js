import React from 'react';
import linkIcon from '../../images/text__COLOR_font-main.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__links">
          <li className='portfolio__border'><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://malyshv.github.io/how_to_learn/">Статичный сайт<img className="portfolio__icon" src={linkIcon} alt="иконка для перехода по ссылке"/></a></li>
          <li className='portfolio__border'><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://malyshv.github.io/russian-travel/">Адаптивный сайт<img className="portfolio__icon" src={linkIcon} alt="иконка для перехода по ссылке"/></a></li>
          <li className='portfolio__border'><a className="portfolio__link" target="_blank" rel="noreferrer" href="https://express.mesto.nomoredomains.icu/">Одностраничное приложение<img className="portfolio__icon" src={linkIcon} alt="иконка для перехода по ссылке"/></a></li>
        </ul>
      </div>
    </section>
  )
};

export default Portfolio;
