import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate, /*useLocation*/ } from 'react-router-dom';
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
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import moviesApi from '../../utils/MoviesApi';
import { invalidAuthErr, updateProfileErr, invalidEmailErr} from '../../utils/errorsConfig';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const navigate = useNavigate();
  // const location = useLocation();
  // const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), moviesApi.findMovies()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        localStorage.setItem('cards', JSON.stringify(cards));
        setCards(cards); // надо ли? или оставить только верхнюю строку?
      })
      .catch((error) => {console.log(error)});
    }
  }, [isLoggedIn]);

  useEffect(()=> {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth.getContent(token)
      .then((userInfo) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
    }
  }, [navigate]);

  useEffect(() => {
    const closeErrorPopupByEscape = (event) => {
      if (event.key === 'Escape') {
        handleCloseErrorPopup();
      }
    }
    document.addEventListener('keydown', closeErrorPopupByEscape)
    return () => document.removeEventListener('keydown', closeErrorPopupByEscape)
  }, []);

  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        // console.log(email, password, name);
        setIsRegistered(true);
        setIsLoggedIn(true);
        return navigate('/signin');
      })
      .catch((error) => {
        setIsRegistered(false);
        console.log(error);
        handleOpenErrorPopup(invalidAuthErr);
      })
      .finally(() => {
        //handleOpenErrorPopup();
      })
  };

  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        return navigate('/movies', {replace: true});
      })
      .catch((error) => {
        handleOpenErrorPopup(invalidEmailErr);
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
    return navigate('/', {replace: true});
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
        handleOpenErrorPopup(updateProfileErr);
      })
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
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Header type="loggedIn" />
              <Movies cards={cards} />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/saved-movies' element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Header type="loggedIn" />
              <SavedMovies cards={cards} />
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Header type="loggedIn" />
              <Profile name={currentUser.name} onUpdateUser={handleUpdateUser} handleSignOut={handleSignOut} />
            </>
          </ProtectedRoute>
        } />
        <Route path='/signup' element={ <Register handleRegistration={handleRegistration} /> } />
        <Route path='/signin' element={ <Login handleAuthorization={handleAuthorization} /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </div>
    <ErrorPopup popupText={[invalidEmailErr || updateProfileErr || invalidAuthErr]} isOpen={isErrorPopupOpened} onClose={handleCloseErrorPopup} isRegistered={isRegistered} />
    </CurrentUserContext.Provider>
  );
};

export default App;
