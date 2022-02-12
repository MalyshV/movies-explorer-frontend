import React from 'react';
import picture from '../../images/promo_bg_icon.svg';

const Promo = () => {
  return(
    <section className='promo'>
      <div className='promo__content'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <img className='promo__image' src={picture} alt='декоративный фоновый элемент' />
      </div>
    </section>
  )
};

export default Promo;
