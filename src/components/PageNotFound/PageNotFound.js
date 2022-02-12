import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../index';

const PageNotFound = () => {
  const navigate = useNavigate();

  const returnPreviousPage = () => navigate(-1);

  return (
    <div className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>
        Страница не найдена
      </p>
      <Button onClick={returnPreviousPage} buttonClassName='_place_not-found' textOnButton='Назад' />
    </div>
  )
};

export default PageNotFound;
