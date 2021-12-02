import './App.css';
import { Route } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from '../Movies/Movies';

import Techs from '../Techs/Techs';

const App = () => {
  return (
    /* <CurrentUserContext.Provider> */
      <div className="page">
        <Header />
        <Register />
        <Login />
        <Profile />
        <Movies />
        <SavedMovies />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <PageNotFound />
        <Footer />
      </div>
    /* </CurrentUserContext.Provider> */
  );
}

export default App;

/* <Route path='/'></Route>
      <Route path='/movies'></Route>
      <Route path='/saved-movies'></Route>
      <Route path='/profile'></Route>
      <Route path='/signup'></Route>
      <Route path='/signin'></Route> */
