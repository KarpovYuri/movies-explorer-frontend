import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import authApi from '../../utils/authApi';
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
  const navigate = useNavigate();

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
          navigate('/movies');
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
          }
        })
        .catch(() => openPopup('Что-то пошло не так! Попробуйте ещё раз.'))
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Main isLogged={isLogged} />} />
          <Route path='/movies' element={
            <ProtectedRoute isLogged={isLogged}>
              <Movies />
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged}>
              <SavedMovies />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute isLogged={isLogged}>
              <Profile onLogout={onLogout} isLogged={isLogged} />
            </ProtectedRoute>
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
    </CurrentUserContext.Provider >
  );
};

export default App;
