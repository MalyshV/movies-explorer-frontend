import './App.css';
import { Route } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';

import Techs from '../Techs/Techs';

const App = () => {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <PageNotFound />
      <Footer />
    </>
  );
}

export default App;

/* <Route path='/'></Route>
      <Route path='/movies'></Route>
      <Route path='/saved-movies'></Route>
      <Route path='/profile'></Route>
      <Route path='/signup'></Route>
      <Route path='/signin'></Route> */