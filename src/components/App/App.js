import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
  const [isNoSearchSavedQuery, setIsNoSearchSavedQuery] = useState(false);

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

        if (localStorage.getItem('searchedCardsData')) {
          setCards(JSON.parse(localStorage.getItem('searchedCardsData')));
        }
      })
      .catch((error) => console.log(error));
    }
  }, [currentUser, token]);


  /*** юзеры ***/
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
    setCards([]);
    setIsLoggedIn(false);
    setCurrentUser({});
    return navigate('/', {replace: true});
  };


  /*** фильмы ***/
  const handleSaveCard = (card) => {
    api.saveMovie(card)
      .then((res) => {
        setSavedCards([...savedCards, res]);
        localStorage.setItem('savedCardsData', JSON.stringify([...savedCards, res]));
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

  const handleDeleteLocalCard = (card) => {
    api.deleteMovie(card)
      .then(() => {
        setSavedCards(
          savedCards.filter((item) => item._id !== card._id)
        );

        const deleteResult = savedCards.filter((item) => item._id !== card._id);
        localStorage.setItem('savedCardsData', JSON.stringify(deleteResult));
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
        const result = savedCards.filter((i) => i._id !== item._id);
       localStorage.setItem('savedCardsData', JSON.stringify(result));
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleSearchCard = (searchQuery) => {
    if (localStorage.getItem('cardsData')) {
      const searchedData = JSON.parse(localStorage.getItem('cardsData'));
      const foundMoviesArray = filterCards(searchedData, searchQuery);

      foundMoviesArray.length === 0 ? setIsNoSearchQuery(!isNoSearchQuery) :

      setCards(filterCards(searchedData, searchQuery));
      localStorage.setItem('searchedCardsData', JSON.stringify(foundMoviesArray));
    } else {
      moviesApi.findMovies()
        .then((res) => {
          const foundMoviesArray = filterCards(res, searchQuery); // совпадение 1

          foundMoviesArray.length === 0 ? setIsNoSearchQuery(!isNoSearchQuery) : // совпадение 2

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

  const handleSavedSearchCard = (searchQuery) => {
    api.getSavedMovies()
      .then((res) => {
        const foundSavedMoviesArray = filterCards(res, searchQuery); // совпадение 1
        foundSavedMoviesArray.length === 0 ? setIsNoSearchSavedQuery(!isNoSearchSavedQuery) : // совпадение 2

        setSavedCards(foundSavedMoviesArray);
        localStorage.setItem('searchedSavedCardsData', JSON.stringify(res));
      })
      .catch((error) => {
        handleOpenErrorPopup();
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

  const renderMainLayout = () => {
    return (
      <>
        <Header isLoggedIn={token} />
        <Main />
        <Footer />
      </>
    )
  };

  const navigateLoggedInUser = () => {
    if (location.pathname === '/signup') {
      return isLoggedIn ? renderMainLayout() : <Register handleRegistration={handleRegistration} />
    }
    if (location.pathname === '/signin') {
      return isLoggedIn ? renderMainLayout() : <Login handleAuthorization={handleAuthorization} />
    }
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
      <Routes>
        <Route path='/' element={renderMainLayout()} />
        <Route path='/movies' element={
          <ProtectedRoute isLoggedIn={token}>
            <>
              <Header isLoggedIn={token} />
              <Movies
                cards={cards}
                savedCards={savedCards}
                setSavedCards={setSavedCards}
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
                setSavedCards={setSavedCards}
                onDelete={handleDeleteLocalCard}
                handleSavedSearchCard={handleSavedSearchCard}
                checkSavedCards={checkSavedCards}
                setCheckSavedCards={setCheckSavedCards}
                isNoSearchSavedQuery={isNoSearchSavedQuery}
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
        <Route path='/signup' element={navigateLoggedInUser()} />
        <Route path='/signin' element={navigateLoggedInUser()} />
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
