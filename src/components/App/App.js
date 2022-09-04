import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import authApi from '../../utils/authApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPage from '../ErrorPage/ErrorPage';
import './App.css';

import Popup from '../Popup/Popup';

function App() {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isResponseMessage, setIsResponseMessage] = useState('');
  const [isPopupMessage, setIsPopupMessage] = useState('');
  const [isCurrentMovies, setCurrentMovies] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState({});

  function removeResponseMessage() {
    setTimeout(() => setIsResponseMessage(''), 5000);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setIsPopupMessage('');
  };

  function openPopup(message) {
    setIsPopupMessage(message);
    setIsOpenPopup(true);
  };

  function onRegister(userData) {
    authApi.registerUser(userData)
      .then((res) => {
        openPopup('Регистрация прошла успешно!');
        delete userData.name;
        onLogin(userData);
      })
      .catch((error) => {
        if (error === 409) {
          setIsResponseMessage('Пользователем с данным email уже зарегистрирован.');
        } else setIsResponseMessage('Что-то пошло не так! Попробуйте ещё раз.');
        removeResponseMessage();
      });
  };


  function onLogin(userData) {
    authApi.loginUser(userData)
      .then((result) => {
        if (result._id) {
          localStorage.setItem('_id', result._id);
          setIsLogged(true);
        };
      })
      .catch((error) => {
        if (error === 401) {
          setIsResponseMessage('Неверная почта или пароль.');
        } else setIsResponseMessage('Что-то пошло не так! Попробуйте ещё раз.');
        removeResponseMessage();
      });
  };

  const onClickDeleteMovie = async (id) => {
    const response = await mainApi.deleteMovie(id);
    if (response.message === 'Фильм удалён') {
      setCurrentMovies((prev) => prev.filter((el) => el._id !== id));
    } else {
      setIsResponseMessage('Что-то пошло не так! Попробуйте ещё раз.');
    }
  };

  const onClickMovieBtn = async (movie, status, id) => {
    if (status === 'delete') {
      onClickDeleteMovie(id);
      return;
    }
    const movieNew = {
      ...movie,
      image: `https://api.movies.project.nomoredomains.sbs${movie.image.url}`,
      thumbnail: `https://api.movies.project.nomoredomains.sbs${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    delete movieNew.id;
    delete movieNew.created_at;
    delete movieNew.updated_at;
    const response = await mainApi.savеMovie(movieNew);
    console.log(response);
    if (response._id) {
      setCurrentMovies((prev) => [...prev, response]);
    } else if (response.message === 400) {
      setIsResponseMessage('Что-то пошло не так! Данный фильм не может быть сохранён');
      openPopup(true);
    } else {
      setIsResponseMessage('Что-то пошло не так! Попробуйте ещё раз.');
      openPopup(true);
    }
  };

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <CurrentSavedMoviesContext.Provider value={isCurrentMovies}>
        <div className='app'>
          <Routes>
            <Route exact path='/' element={<Main isLogged={isLogged} />} />
            <Route path='/movies' element={<Movies onClickMovieBtn={onClickMovieBtn} />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile />} />
            <Route
              path='/signin'
              element={
                isLogged ? (
                  <Navigate to='/movies' />
                ) : (
                  <Login
                    onLogin={onLogin}
                    isResponseMessage={isResponseMessage}
                  />
                )
              }
            />
            <Route
              path='/signup'
              element={
                isLogged
                  ? <Navigate to='/movies' />
                  : <Register
                    onRegister={onRegister}
                    isResponseMessage={isResponseMessage}
                  />
              }
            />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
          <Popup
            isOpen={isOpenPopup}
            onClose={closePopup}
            isPopupMessage={isPopupMessage}
          />
        </div>
      </CurrentSavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
