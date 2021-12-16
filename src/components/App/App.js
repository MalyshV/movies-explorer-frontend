import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from '../Movies/Movies';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import errors from '../../utils/errorsConfig';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo()])
      .then(([userData]) => {
        console.log(userData);
        setCurrentUser(userData);
      })
      .catch((error) => console.log(error));
    }
  }, [isLoggedIn]);

  useEffect(()=> {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth.getContent(token)
      .then((userInfo) => {
        setIsLoggedIn(true);
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
    }
  }, [navigate]);

  // регистрация
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        console.log(email, password, name);
        setIsRegistered(true);
        return navigate('/movies');
      })
      .catch((error) => {
        setIsRegistered(false);
        console.log(error);
        handleOpenErrorPopup();
      })
      .finally(() => {
        //handleOpenErrorPopup();
      })
  };

  // логин
  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setIsLoggedIn(true);
        return navigate('/movies');
      })
      .catch((error) => {
        handleOpenErrorPopup();
        console.log(error);
      })
      .finally(() => {
        //andleOpenErrorPopup();
      })
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    console.log('Разлогинился');
    return navigate('/');
  };

  // обновление данных профиля
  // поправить вывод ошибки + саму верстку
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(error));
      handleOpenErrorPopup(errors.updateProfileErr);
  };

  const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
  const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            <Profile name={currentUser.name} onUpdateUser={handleUpdateUser} handleSignOut={handleSignOut} />
          </>
        } />
        <Route path='/signup' element={ <Register handleRegistration={handleRegistration} /> } />
        <Route path='/signin' element={ <Login handleAuthorization={handleAuthorization} /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </div>
    <ErrorPopup isOpen={isErrorPopupOpened} onClose={handleCloseErrorPopup} isRegistered={isRegistered} />
    </CurrentUserContext.Provider>
  );
};

export default App;
