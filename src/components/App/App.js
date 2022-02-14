import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/api/auth';
import { moviesApi, api } from '../../utils/api/index';
import { filterCards } from '../../helpers/index';
import { ErrorPopup, Footer, Header, Login, Main, Movies, PageNotFound, Popup, Profile, Register, SavedMovies} from '../index';
import './App.css';

const App = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [checkSavedCards, setCheckSavedCards] = useState(false);
  const [isNoSearchQuery, setIsNoSearchQuery] = useState(false);

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
          setCurrentUser(userInfo);
        })
        .catch((error) => console.log(error))
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      api.getSavedMovies()
      .then((res) => {
        setSavedCards(res.filter((card) => card.owner === currentUser._id));
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
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
        alert('hi');
      })
      .catch((error) => {
        setIsRegistered(false);
        handleOpenErrorPopup();
      })
  };

  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        localStorage.setItem('jwt', data.token);
        return navigate('/movies', {replace: true});
      })
      .catch((error) => {
        handleOpenErrorPopup();
        console.log(error);
      })
  };

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

  const handleSignOut = () => {
    localStorage.clear();
    setSearchedCards([]);
    setIsLoggedIn(false);
    setCurrentUser({});
    return navigate('/', {replace: true});
  };

  /*** фильмы ***/
  const handleSearchCard = (searchQuery) => {
    if (localStorage.getItem('cardsData')) {
      const searchedData = JSON.parse(localStorage.getItem('cardsData'));
      const foundMoviesArray = filterCards(searchedData, searchQuery);

      foundMoviesArray.length === 0 ? setIsNoSearchQuery(!isNoSearchQuery) :

      setCards(filterCards(searchedData, searchQuery));
      localStorage.setItem('searchedCardsData', JSON.stringify(searchedCards));
    } else {
      moviesApi.findMovies()
        .then((res) => {
          const foundMoviesArray = filterCards(res, searchQuery);

          foundMoviesArray.length === 0 ? setIsNoSearchQuery(!isNoSearchQuery) :

          setCards(filterCards(res, searchQuery));
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
  const handleSavedSearchCard = (searchQuery) => {
    api.getSavedMovies()
      .then((res) => {
        const foundSavedMoviesArray = filterCards(res, searchQuery);

        foundSavedMoviesArray.length === 0 ? setIsNoSearchQuery(!isNoSearchQuery) :

        setSavedCards(filterCards(res, searchQuery));
        localStorage.setItem('savedCardsData', JSON.stringify(res));
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

  const getLocalCardFromGlobal = (card) => {
    if (savedCards && card) {
      return savedCards.find((item) => {
        return (item.movieId === card.id) && (item.owner === currentUser._id) ? true : false;
      });
    }
  };

  // удалить фильм
  const handleDeleteLocalCard = (card) => {
    api.deleteMovie(card)
      .then(() => {
        setSavedCards(
          savedCards.filter((item) => item._id !== card._id)
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
      return;
    }
    api.deleteMovie(item)
      .then(() => {
        setSavedCards(
          savedCards.filter((i) => i._id !== item._id)
        );
        localStorage.setItem('savedCardsData', JSON.stringify(savedCards.data));
      })
      .catch((error) => {
        console.log(error);
      })
  };

  /*** попапы ***/
  const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
  const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

  const showProfileUpdatePopup = () => {
    setIsSuccessPopupOpened(true)
    setTimeout(() => setIsSuccessPopupOpened(false), 1900);
  };

  useEffect(() => {
    const closeErrorPopupByClick = (event) => {
        if (event.target.classList.contains('popup_is-opened')) {
          handleCloseErrorPopup();
        }
    };
    document.addEventListener('mousedown', closeErrorPopupByClick);

    return () => document.removeEventListener('mousedown', closeErrorPopupByClick);
  }, []);

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
    <div className='page'>
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
                searchedCards={searchedCards}
                isNoSearchQuery={isNoSearchQuery}
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
                onDelete={handleDeleteLocalCard}
                handleSavedSearchCard={handleSavedSearchCard}
                checkbox={checkSavedCards}
                setCheckbox={setCheckSavedCards}
                isNoSearchQuery={isNoSearchQuery}
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
