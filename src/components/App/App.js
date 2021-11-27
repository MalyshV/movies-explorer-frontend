import './App.css';
import { Route } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

const App = () => {
  return (
    <>
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