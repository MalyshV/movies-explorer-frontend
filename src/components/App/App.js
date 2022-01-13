import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import moviesApi from '../../utils/MoviesApi';
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
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';

const App = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({}); // - загрузка текущего юзера
  const [isRegistered, setIsRegistered] = useState(false); // - стейт регистрации
  const [isLoggedIn, setIsLoggedIn] = useState(false); // - стейт логина
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false); // - стейт модалки
  const [cards, setCards] = useState([]); // - все фильмы с сервера
  const [savedCards, setSavedCards] = useState([]);


  /*** загрузка ***/

  // проверка токена
  useEffect(()=> {
    if (token) {
      auth.getContent(token)
      .then((userInfo) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
    }
  }, [navigate, token]);

  // загрузка данных юзера и общих фильмов
  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), moviesApi.findMovies()])
      .then(([userData, cards]) => {
        localStorage.setItem('cards', JSON.stringify(cards));
        setCurrentUser(userData);
        setCards(cards);
        setSavedCards(savedCards);
      })
      .catch((error) => {console.log(error)});
    }
  }, [isLoggedIn, savedCards]);


  /*** юзеры ***/

  // регистрация нового юзера
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((error) => {
        setIsRegistered(false);
        console.log(error);
        handleOpenErrorPopup();
      })
  };

  // логин для зарегистрированного юзера
  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        localStorage.setItem('jwt', data.token)
        return navigate('/movies', {replace: true});
      })
      .catch((error) => {
        handleOpenErrorPopup();
        console.log(error);
      })
  };

  // обновление данных профиля
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then(data => {
        setCurrentUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        console.log(localStorage)
      })
      .catch((error) => {
        console.log(error);
        handleOpenErrorPopup();
      })
  };

  // выход из аккаунта
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    return navigate('/', {replace: true});
  };

  /*** фильмы ***/

  // сохранить фильм
  const handleSaveCard = (card) => {
    api.saveMovie(card)
    .then((res) => {
      setSavedCards([...savedCards, res])
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
      console.log(savedCards); // и вот здесь
    })
    .catch(err => console.log(err))
  }

  // удалить фильм
  const handleDeleteCard = (card) => {
    api.deleteMovie(card._id)
      .then(() => {
        localStorage.setItem('savedCards', JSON.stringify(savedCards.filter((item) => item !== card)));
        setSavedCards(savedCards.filter((item) => item !== card));
      })
      .catch(err => console.log(err))
  };

  /*** попапы ***/

  // открыть - закрыть попап на крестик
  const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
  const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

  // закрыть попап мимо попапа
  useEffect(() => {
    const closeErrorPopupByClick = (event) => {
        if (event.target.classList.contains('popup_is-opened')) {
          handleCloseErrorPopup();
        }
    };
    document.addEventListener('mousedown', closeErrorPopupByClick);

    return () => document.removeEventListener('mousedown', closeErrorPopupByClick);
  }, []);

  // закрыть попап на esc
  useEffect(() => {
    const closeErrorPopupByEscape = (event) => {
      if (event.key === 'Escape') {
        handleCloseErrorPopup();
      }
    }
    document.addEventListener('keydown', closeErrorPopupByEscape)
    return () => document.removeEventListener('keydown', closeErrorPopupByEscape)
  }, []);

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
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header type="loggedIn" />
              <Movies
                cards={cards}
                handleSaveCard={handleSaveCard}
              />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/saved-movies' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header type="loggedIn" />
              <SavedMovies
                cards={savedCards}
                savedCards={savedCards}
                onDelete={handleDeleteCard}
              />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header type="loggedIn" />
              <Profile
                isLoggedIn={token}
                onUpdateUser={handleUpdateUser}
                handleSignOut={handleSignOut}
              />
            </>
          </ProtectedRoute>
        } />
        <Route path='/signup' element={ <Register handleRegistration={handleRegistration} /> } />
        <Route path='/signin' element={ <Login handleAuthorization={handleAuthorization} /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </div>
    <ErrorPopup
      isOpen={isErrorPopupOpened}
      onClose={handleCloseErrorPopup}
      isRegistered={isRegistered}
    />
    </CurrentUserContext.Provider>
  );
};

export default App;
