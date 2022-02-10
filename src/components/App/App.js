import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import { ErrorPopup, Footer, Header, Login, Main, Movies, PageNotFound, Popup, Profile, Register, SavedMovies} from '../index';
import * as auth from '../../utils/api/auth';
import { moviesApi, api } from '../../utils/api/index';
import { filterMovies } from '../../helpers/index';
import './App.css';

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
      const searchList = (filterMovies(afterSearchData, searchQuery));

      if (searchList.length === 0) {
        setCheckIsEmpty(!checkIsEmpty);
      } else {
        setCards(filterMovies(afterSearchData, searchQuery));
        localStorage.setItem('searchedCardsData', JSON.stringify(searchedCards));
      }
    } else {
      moviesApi.findMovies()
        .then((res) => {
          const searchList = filterMovies(res, searchQuery);

          if (searchList.length === 0) {
            setCheckIsEmpty(!checkIsEmpty);
          } else {
            setCards(filterMovies(res, searchQuery));
            localStorage.setItem('cardsData', JSON.stringify(res));
            api.getSavedMovies();
          }
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
        const searchList = filterMovies(res, searchQuery);

        if (searchList.length === 0) {
          setCheckIsEmpty(!checkIsEmpty);
        } else {
          setSavedCards(filterMovies(res, searchQuery));
          localStorage.setItem('savedCardsdata', JSON.stringify(res))
        }
      })
      .catch((error) => {
        handleOpenErrorPopup();
        console.log(error);
      })
  };

  // сохранить фильм
  const handleSaveCard = (card) => {
    console.log(card, 'сохраняем');
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

  function getLocalCardFromGlobal(card) {
    if (savedCards && card) {
      return savedCards.find((item) => {
        if ((item.movieId === card.id) && (item.owner === currentUser._id)) {
          return true;
        }
      });
    }
  };

  // удалить фильм
  const handleDeleteCard = (card) => {
    console.log(card, 'удаляем');
    api.deleteMovie(card)
      .then(() => {
        setSavedCards(
          savedCards.filter((item) => item._id !== card._id)
          // savedCards.filter((item) => item.movieId === card.id)
        );
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.data));
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleDeleteGlobalCard = (card) => {
    const item = getLocalCardFromGlobal(card);
    if (item === null) {
      console.log('картинка не найдена');
      return;
    }
    console.log(item, 'удаляем');
    api.deleteMovie(item)
      .then(() => {
        setSavedCards(
          savedCards.filter((i) => i._id !== item._id)
          // savedCards.filter((item) => item.movieId === card.id)
        );
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.data));
      })
      .catch((error) => {
        console.log(error);
      })
  };

  /*** попапы ***/
  // открыть/закрыть на крестик
  const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
  const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

  const showProfileUpdatePopup = () => {
    setIsSuccessPopupOpened(true)
    setTimeout(() => setIsSuccessPopupOpened(false), 1900);
  };

  // закрыть мимо попапа
  useEffect(() => {
    const closeErrorPopupByClick = (event) => {
        if (event.target.classList.contains('popup_is-opened')) {
          handleCloseErrorPopup();
        }
    };
    document.addEventListener('mousedown', closeErrorPopupByClick);

    return () => document.removeEventListener('mousedown', closeErrorPopupByClick);
  }, []);

  // закрыть на esc
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
                onDelete={handleDeleteGlobalCard}
                isMovieSaved={checkIfCardIsSaved}
                searchedCards={searchedCards}
                checkIsEmpty={checkIsEmpty}
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
                checkIsEmpty={checkIsEmpty}
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
