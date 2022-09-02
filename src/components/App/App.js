import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isPopupMessage, setIsPopupMessage] = useState('');
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isAccept, setIsAccept] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  let messageClean;

  function closePopup() {
    setIsOpenPopup(false);
    setIsPopupMessage('');
  };

  function openPopup(message) {
    setIsPopupMessage(message);
    setIsOpenPopup(true);
  };

  const onRegister = async (userData) => {
    setIsPopupMessage('');
    setIsAccept(false);

    const response = await authApi.registerUser(userData);

    if (response._id) {
      setIsAccept(true);
      setIsPopupMessage('Вы успешно зарегистрировались!');
      setIsAccept(false);
      messageClean = setTimeout(() => {
        setIsAccept(true);
        setIsPopupMessage('');
      }, 5000);
      return onLogin(userData);
    }
    if (response.message === 409) {
      setIsPopupMessage('Пользователем с данным email уже зарегистрирован');
    } else {
      setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
    }
    setIsAccept(false);
    messageClean = setTimeout(() => {
      setIsAccept(true);
      setIsPopupMessage('');
    }, 5000);
  };

  const onLogin = async (userData) => {
    setIsPopupMessage('');
    setIsAccept(false);

    const userDataAuth = { email: userData.email, password: userData.password };
    const response = await authApi.loginUser(userDataAuth);

    if (response.token) {
      localStorage.setItem('token', response.token);
      // headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      setIsLogin(true);
      const user = await mainApi.getUserInfo();
      // const cards = await getMovies();
      // setCurrentMovies(cards);
      setCurrentUser(user);
      navigate('/movies');
    }
    if (response.message === 401) {
      setIsPopupMessage('Неправильные почта или пароль');
      setIsAccept(false);
    } else {
      setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAccept(false);
    }
    messageClean = setTimeout(() => {
      setIsAccept(true);
      setIsPopupMessage('');
    }, 5000);
  };

  const onClickDeleteMovie = async (id) => {
    const response = await mainApi.deleteMovie(id);
    if (response.message === 'Фильм удалён') {
      setCurrentMovies((prev) => prev.filter((el) => el._id !== id));
    } else {
      setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
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
      setIsPopupMessage('Что-то пошло не так! Данный фильм не может быть сохранён');
      openPopup(true);
    } else {
      setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
      openPopup(true);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentSavedMoviesContext.Provider value={currentMovies}>
        <div className='app'>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path='/movies' element={<Movies onClickMovieBtn={onClickMovieBtn} />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signin' element={<Login />} />
            <Route
              path='/signup'
              element={
                isLogin
                  ? <Navigate to='/movies' />
                  : <Register
                    onRegister={onRegister}
                    isPopupMessage={isPopupMessage}
                    isAccept={isAccept}
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
