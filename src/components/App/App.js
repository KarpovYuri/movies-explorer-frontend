import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import ErrorPage from '../ErrorPage/ErrorPage';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={Register} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
