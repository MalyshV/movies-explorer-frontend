import React from 'react';
import Section from '../Section/Section';
import studentPic from '../../images/students_pic.jpg';
import studentsConfig from '../../utils/studentsConfig';

const AboutMe = () => {
  return (
    <Section title="Студент">
      <article className="student__info">
        <div className="student__block">
          <h4 className="stunent__subtitle">{studentsConfig.name}</h4>
          <p className="student__about">{studentsConfig.info}</p>
          <p className="student__text">{studentsConfig.about}
          </p>
          <ul className="student__links">
            <li><a className="student__link" target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=100013538104816">Facebook</a></li>
            <li><a className="student__link" target="_blank" rel="noreferrer" href="https://github.com/MalyshV">Github</a></li>
          </ul>
        </div>
        <img className="student__image" alt="фото студента" src={studentPic} />
      </article>
    </Section>
  )
};

export default AboutMe;
