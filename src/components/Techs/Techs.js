import React from 'react';
import { Section } from '../index';
import { techs } from '../../utils/constants';

const Techs = () => {
  return(
    <Section title='Технологии'>
      <article className='techs'>
        <h4 className='techs__subtitle'>7 технологий</h4>
        <p className='techs__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в  дипломном проекте.
        </p>
        <ul className='techs__items'>
          { techs.map((item) => {
            return (
              <li key={item.id} className='techs__item'>{item.name}</li>
            )
          }) }
        </ul>
      </article>
    </Section>
  )
};

export default Techs;
