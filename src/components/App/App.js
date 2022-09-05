import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import authApi from '../../utils/AuthApi';
import mainApi from '../../utils/MainApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import Popup from '../Popup/Popup';

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isResponseMessage, setIsResponseMessage] = useState('');
  const [isPopupMessage, setIsPopupMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState({});
  const [isCurrentMovies, setIsCurrentMovies] = useState([]);

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
      .then(() => {
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
          mainApi.getSavedMovies()
            .then((savedMovies) => setIsCurrentMovies(savedMovies))
            .catch((error) => {
              if (error === 404) openPopup('Вы еще не сохранили ни одного фильма. Начните поиск.')
              else openPopup('Что-то пошло не так! Попробуйте ещё раз.');
            });
        };
      })
      .catch((error) => {
        if (error === 401) {
          setIsResponseMessage('Неверная почта или пароль.');
        } else setIsResponseMessage('Что-то пошло не так! Попробуйте ещё раз.');
        removeResponseMessage();
      });
  };

  function onLogout() {
    authApi.logoutUser()
      .then(() => {
        localStorage.clear();
        setIsLogged(false);
        setIsCurrentUser({});
        setIsCurrentMovies([]);
      })
      .catch(() => openPopup('Что-то пошло не так! Попробуйте ещё раз.'));
  }

  // Проверка токена и авторизация пользователя
  useEffect(() => {
    if (localStorage.getItem('_id')) {
      authApi.checkToken()
        .then(data => {
          if (data) {
            setIsLogged(true);
            mainApi.getSavedMovies()
              .then((savedMovies) => setIsCurrentMovies(savedMovies));
          }
        })
        .catch(() => openPopup('Что-то пошло не так! Попробуйте ещё раз.'))
    }
  }, []);

  function onClickDeleteMovie(id) {
    mainApi.deleteMovie(id)
      .then((result) => {
        if (result._id) setIsCurrentMovies((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => {
        if (error === 400) openPopup('Что-то пошло не так! Фильм не может быть удален.');
        else openPopup('Что-то пошло не так! Попробуйте ещё раз.');
      });

  };

  function onClickSaveMovie(movie, typeBtn, id) {
    if (typeBtn === 'delete') {
      onClickDeleteMovie(id);
      return;
    }
    const savedMovie = {
      ...movie,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    };
    savedMovie.movieId = savedMovie.id;
    delete savedMovie.id;
    delete savedMovie.created_at;
    delete savedMovie.updated_at;
    mainApi.savеMovie(savedMovie)
      .then((result) => {
        if (result._id) setIsCurrentMovies((prev) => [...prev, result]);
      })
      .catch((error) => {
        if (error === 400) openPopup('Что-то пошло не так! Фильм не может быть сохранён.');
        else openPopup('Что-то пошло не так! Попробуйте ещё раз.');
      });
  };

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <CurrentSavedMoviesContext.Provider value={isCurrentMovies}>
        <div className='app'>
          <Routes>
            <Route exact path='/' element={<Main isLogged={isLogged} />} />
            <Route path='/movies' element={
              <Movies
                onClickSaveMovie={onClickSaveMovie}
                isLogged={isLogged}
              />
            } />
            <Route path='/saved-movies' element={
              <SavedMovies
                onClickDeleteMovie={onClickDeleteMovie}
                isLogged={isLogged}
              />
            } />
            <Route path='/profile' element={
              <Profile onLogout={onLogout} isLogged={isLogged} />
            }
            />
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
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Popup
            isOpen={isOpenPopup}
            onClose={closePopup}
            isPopupMessage={isPopupMessage}
          />
        </div>
      </CurrentSavedMoviesContext.Provider>
    </CurrentUserContext.Provider >
  );
};

export default App;
