import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from '../Movies/Movies';
// import api from '../../utils/MoviesApi';
import * as auth from '../../utils/MainApi';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // регистрация
  const handleRegistration = (email, password, name) => {
    console.log(email, password, name);
    auth.register(email, password, name)
      .then(() => {
        setIsRegistered(true);
        return navigate('/movies');
      })
      .catch((error) => {
        setIsRegistered(false);
        console.log(error);
      })
      .finally(() => {
        console.log('ПОКАЖИ ПОПАП!!!');
      })
  };

  // логин
  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        return navigate('/movies');
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="page">
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        } />
        <Route path='/movies' element={
          <>
            <Header type="loggedIn" />
            <Movies />
            <Footer />
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <Header type="loggedIn" />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Header type="loggedIn" />
            <Profile />
          </>
        } />
        <Route path='/signup' element={ <Register handleRegistration={handleRegistration} /> } />
        <Route path='/signin' element={ <Login handleAuthorization={handleAuthorization} /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </div>
  );
};

export default App;
