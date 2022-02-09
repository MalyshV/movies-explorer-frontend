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
import Popup from '../Popup/Popup';
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import { filterMovies } from '../../utils/constants';

const App = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({}); // - загрузка текущего юзера
  const [cards, setCards] = useState([]); // - все фильмы с сервера
  const [savedCards, setSavedCards] = useState([]); // - сохраненные фильмы
  const [searchedCards, setSearchedCards] = useState([]); // - фильмы после поиска
  const [isRegistered, setIsRegistered] = useState(false); // - стейт регистрации
  const [isLoggedIn, setIsLoggedIn] = useState(false); // - стейт логина
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false); // - стейт модалки
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = useState(false); // - обновление профиля
  const [checkbox, setCheckbox] = useState(false);
  const [checkSavedCards, setCheckSavedCards] = useState(false);

  // для показа ошибки
  const [checkIsEmpty, setCheckIsEmpty] = useState(false);

  /*** загрузка данных ***/
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
  }, [token]);

  useEffect(() => {
    if (isLoggedIn === true) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo)
        })
        .catch((error) => console.log(error))
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      api.getSavedMovies()
      .then((res) => {
        setSavedCards(res.filter((card) => card.owner === currentUser._id))
        localStorage.setItem('savedCardsData', JSON.stringify(res));
      })
      .catch((error) => console.log(error));
    }
  }, [currentUser, token]);

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('ckeckboxCardsData')));
    setSearchedCards(JSON.parse(localStorage.getItem('searchedCardsData')));
  }, []);


  /*** юзеры ***/
  // регистрация нового юзера
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((error) => {
        setIsRegistered(false);
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
        showProfileUpdatePopup();
      })
      .catch((error) => {
        console.log(error);
        handleOpenErrorPopup();
      })
  };

  // выход из аккаунта
  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    return navigate('/', {replace: true});
  };

  /*** фильмы ***/
  // поиск
  const handleSearchCard = (searchQuery) => {
    if (localStorage.getItem('cardsData')) {
      const afterSearchData = JSON.parse(localStorage.getItem('cardsData'));
      setCards(filterMovies(afterSearchData, searchQuery));
      localStorage.setItem('searchedCardsData', JSON.stringify(searchedCards));
    } else {
      moviesApi.findMovies()
        .then((res) => {
          setCards(filterMovies(res, searchQuery));
          localStorage.setItem('cardsData', JSON.stringify(res));
          api.getSavedMovies();
        })
        .catch((error) => {
          handleOpenErrorPopup();
          console.log(error);
        })
    };
  };

  // поиск по сохраненным
  const handleSavedMoviesSearchCard = (searchQuery) => {
    api.getSavedMovies()
      .then((res) => {
        setSavedCards(filterMovies(res, searchQuery));
        localStorage.setItem('savedCardsdata', JSON.stringify(res))
      })
      .catch((error) => {
        handleOpenErrorPopup();
        console.log(error);
      })
  };

  // сохранить фильм
  const handleSaveCard = (card) => {
    api.saveMovie(card)
      .then((res) => {
        setSavedCards([...savedCards, res]);
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.data));
      })
      .catch(err => console.log(err))
  };

  function checkIfCardIsSaved(card) {
    if (savedCards && card) {
      return savedCards.some((item) => {
        return item.movieId === card.id;
      });
    }
  };

  // удалить фильм
  const handleDeleteCard = (card) => {
    console.log(card._id)
    api.deleteMovie(card)
      .then(() => {
        console.log('я тут')
        setSavedCards(
          savedCards.filter((item) => item._id !== card._id)
        );
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.data));
      })
      .catch((error) => {
        console.log(error);
      })
  };

  /*** попапы ***/
  // открыть/закрыть попап на крестик
  const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
  const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

  const showProfileUpdatePopup = () => {
    setIsSuccessPopupOpened(true)
    setTimeout(() => setIsSuccessPopupOpened(false), 1900);
  };

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
            <Header isLoggedIn={token} />
            <Main />
            <Footer />
          </>
        } />
        <Route path='/movies' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header isLoggedIn={token} />
              <Movies
                cards={cards}
                savedCards={savedCards}
                handleSaveCard={handleSaveCard}
                handleSearchCard={handleSearchCard}
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                onDelete={handleDeleteCard}
                isMovieSaved={checkIfCardIsSaved}
                searchedCards={searchedCards}
              />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/saved-movies' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header isLoggedIn={token} />
              <SavedMovies
                cards={savedCards}
                savedCards={savedCards}
                onDelete={handleDeleteCard}
                handleSavedMoviesSearchCard={handleSavedMoviesSearchCard}
                checkbox={checkSavedCards}
                setCheckbox={setCheckSavedCards}
                isMovieSaved={checkIfCardIsSaved}
              />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header isLoggedIn={token} />
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
    <Popup onUpdate={isSuccessPopupOpened} />
    </CurrentUserContext.Provider>
  );
};

export default App;
