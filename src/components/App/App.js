import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Route path='/'></Route>
      <Route path='/movies'></Route>
      <Route path='/saved-movies'></Route>
      <Route path='/profile'></Route>
      <Route path='/signup'></Route>
      <Route path='/signin'></Route>
    </>
  );
}

export default App;
