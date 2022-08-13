import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Main />
      <Routes>
        <Route exact path='/' component={Main} />
        <Route path='/movies' component={Movies} />
        <Route path='/saved-movies' component={SavedMovies} />
        <Route path='/profile' component={Profile} />
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={Register} />
        <Route path='/*' component={ErrorPage} />
      </Routes>
    </div>
  );
};

export default App;
