import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import { filterMovies } from '../../utils/constants';

const App = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({}); // - загрузка текущего юзера
  const [cards, setCards] = useState([]); // - все фильмы с сервера
  const [savedCards, setSavedCards] = useState([]); // - сохраненные фильмы
  const [searchedCards, setSearchedCards] = useState([]); // - фильмы после поиска
  const [isRegistered, setIsRegistered] = useState(false); // - стейт регистрации
  const [isLoggedIn, setIsLoggedIn] = useState(false); // - стейт логина
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false); // - стейт модалки
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = useState(false); // - для профиля

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
  }, [navigate, token]);

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
        // console.log(localStorage, 'фильмы сохраненные????'); // добрались! грузится в консоль 3 раза?? Но у нового юзера правильно подгружается пустой массив
      })
      .catch((error) => console.log(error));
    }
  }, [currentUser, token]);


  /*** юзеры ***/

  // регистрация нового юзера
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((error) => {
        console.log(error);
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

  // if (location.pathname === '/movies') && есть

  // поиск
  const handleSearchCard = (searchQuery) => {
    if (isLoggedIn === true) {
      if (location.pathname === '/movies') {

        if (localStorage.getItem('cardsData')) {
          const afterSearchData = JSON.parse(localStorage.getItem('cardsData'));
          setCards(filterMovies(afterSearchData, searchQuery));
          localStorage.setItem('searchedCardsData', JSON.stringify(searchedCards));
        }
      }
    };
  };

  // сохранить фильм
  const handleSaveCard = (card) => {
    api.saveMovie(card)
      .then((res) => {
        setSavedCards([...savedCards, res])
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards));
      })
      .catch(err => console.log(err))
  };

  // удалить фильм
  const handleDeleteCard = (card) => {
    api.deleteMovie(card._id)
      .then(() => {
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.filter((item) => item !== card)));
        setSavedCards(savedCards.filter((item) => item !== card));
      })
      .catch(err => console.log(err))
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
                handleSaveCard={handleSaveCard}
                handleSearchCard={handleSearchCard}
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
                handleSearchCard={handleSearchCard}
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
    <SuccessPopup onUpdate={isSuccessPopupOpened} />
    </CurrentUserContext.Provider>
  );
};

export default App;

// todo

// Перенести функцию поиска в MoviesCardList, как рекомендовано в ТЗ?
// Убедиться, что заливка на нажатой кнопке остается при переходе между страницами
// Добавить проверку на id при сохранении карточки, чтобы не сохранялись дубли
// Добавить удаление карточки из сохраненных по повторному клику на кнопку
// Кнопка еще должна исчезать при отсутствии карточек для выгрузки
// Разобраться, откуда в консоли ошибка с key на /saved-movies
// Разобраться, почему в консоль грузится массив сохраненных карточек трижды. Мешает ли это?
// Добавить функционал для сортировки короткометражек
// Выводить карточки п
// resize при монтировании карточек??
// Инпут в SearchForm не обязательный к заполнению!! Валидация должна происходить после сабмита. При попытке отправить пустой запрос - ошибка "Нужно ввести ключевое слово"
// Тогда мне наверное надо поправить логику попапа...
// Перечитать еще раз чек-лист. Найти, где там "Во время запроса произошла ошибка..."
// Не забыть про текст "Ничего не найдено", если данных по запросу фильмов нет
// Проверить все файлы на неиспользуемый код
// Проверить названия всех функций и переменных
// В чек листе есть конфиг для постоянных значений. Добавить?
// Сейчас в файле constants лежат общие функции. Может вынести их оттуда?
