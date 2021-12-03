import React from 'react';

const AboutMe = () => {
  return (
    <section className="student">
      <div className="student__content">
        <h3 className="student__title">Студент</h3>
        <article className="student__info">
          <div className="student__block">
            <h4 className="stunent__subtitle">Виталий</h4>
            <p className="student__about">Фронтенд-разработчик, 30 лет</p>
            <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="student__links">
              <li><a className="student__link" target="_blank" rel="noreferrer" href="https://www.facebook.com/">Facebook</a></li>
              <li><a className="student__link" target="_blank" rel="noreferrer" href="https://github.com/MalyshV">Github</a></li>
            </ul>
          </div>
          <img className="student__image" alt="фото студента"/>
        </article>
      </div>
    </section>
  )
};

export default AboutMe;
