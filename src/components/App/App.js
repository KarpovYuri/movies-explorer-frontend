import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [isPopupMessage, setIsPopupMessage] = useState('');

  function closePopup() {
    setIsOpenPopup(false);
    setIsPopupMessage('');
  };

  function openPopup(message) {
    setIsPopupMessage(message);
    setIsOpenPopup(true);
  };

  return (
    <div className='app'>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/movies' element={
          <Movies
            openPopup={openPopup}
          />
        } />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <Popup
        isOpen={isOpenPopup}
        onClose={closePopup}
        isPopupMessage={isPopupMessage}
      />
    </div>
  );
};

export default App;
