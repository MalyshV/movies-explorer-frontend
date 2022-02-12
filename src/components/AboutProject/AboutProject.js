import React from 'react';
import { Section } from '../index';

const AboutProject = () => {
  return(
    <Section title='О проекте'>
      <article className='project__info'>
        <ul className='project__columns'>
          <li className='project__column'>
            <h4 className='project__subtitle'>Дипломный проект включал 5 этапов</h4>
            <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className='project__column'>
            <h4 className='project__subtitle'>На выполнение диплома ушло 5 недель</h4>
            <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
      </article>
      <ul className='project__items'>
        <li className='project__item project__item_type_small'>
          <p className='project__text project__text_color_green project__text_size_small'>1 неделя</p>
          <p className='project__text project__text_size_large'>4 недели</p>
        </li>
        <li className='project__item'>
          <p className='project__text project__text_size_small project__text_type_grey'>Back-end</p>
          <p className='project__text project__text_type_grey project__text_size_large'>Front-end</p>
        </li>
      </ul>
    </Section>
  )
};

export default AboutProject;
