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
import './App.css';

import Popup from '../Popup/Popup';
import { messageDisplayTime } from '../../utils/config';
import {
  successfulRegistration,
  successfullyUserUpdated,
  movieNotDeleted,
  movieNotSaved,
  badRequestErrorCode,
  authErrorCode,
  authErrorMessage,
  conflictErrorCode,
  conflictErrorMessage,
  serverErrorMessage,
} from '../../utils/constants'

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isResponseMessage, setIsResponseMessage] = useState('');
  const [isPopupMessage, setIsPopupMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState({});
  const [isCurrentMovies, setIsCurrentMovies] = useState([]);

  function removeResponseMessage() {
    setTimeout(() => setIsResponseMessage(''), messageDisplayTime);
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
        openPopup(successfulRegistration);
        delete userData.name;
        onLogin(userData);
      })
      .catch((error) => {
        if (error === conflictErrorCode) {
          setIsResponseMessage(conflictErrorMessage);
        } else setIsResponseMessage(serverErrorMessage);
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
        if (error === authErrorCode) {
          setIsResponseMessage(authErrorMessage);
        } else setIsResponseMessage(serverErrorMessage);
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
      .catch(() => openPopup(serverErrorMessage));
  }

  function onUpdateUser(userData) {
    mainApi.addUserInfo(userData)
      .then(() => { openPopup(successfullyUserUpdated) })
      .catch(() => {
        setIsResponseMessage(serverErrorMessage);
        removeResponseMessage();
      });
  };

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
        .catch(() => openPopup(serverErrorMessage))
    }
  }, []);

  // Получение данных текущего пользователя
  useEffect(() => {
    if (isLogged) {
      mainApi.getUserInfo()
        .then((userData) => setIsCurrentUser(userData))
        .catch(error => console.log(error));
    }
  }, [isLogged]);

  // Получение сохраненных фильмов
  useEffect(() => {
    if (isLogged) {
      mainApi.getSavedMovies()
        .then((savedMovies) => setIsCurrentMovies(savedMovies))
        .catch(error => console.log(error));
    }
  }, [isLogged]);

  function onClickDeleteMovie(id) {
    mainApi.deleteMovie(id)
      .then((result) => {
        if (result._id) setIsCurrentMovies((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => {
        if (error === badRequestErrorCode) openPopup(movieNotDeleted);
        else openPopup(serverErrorMessage);
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
        if (error === badRequestErrorCode) openPopup(movieNotSaved);
        else openPopup(serverErrorMessage);
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
              <Profile
                onLogout={onLogout}
                isLogged={isLogged}
                onSubmitForm={onUpdateUser}
                isResponseMessage={isResponseMessage}
              />
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
