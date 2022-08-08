import { Routes, Route } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import './App.css';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route exact path='/' component={Main} />
        <Route path='/movies' component={Movies} />
        <Route path='/saved-movies' component={SavedMovies} />
        <Route path='/profile' component={Profile} />
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={Register} />
      </Routes>
    </div>
  );
};

export default App;
