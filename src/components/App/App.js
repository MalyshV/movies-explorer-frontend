import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
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

const App = () => {
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
        <Route path='/signup' element={ <Register /> } />
        <Route path='/signin' element={ <Login /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </div>
  );
};

export default App;
