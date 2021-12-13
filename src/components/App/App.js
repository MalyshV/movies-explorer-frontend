import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
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
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

// <Header />