import { React } from 'react';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import './Profile.css';

import { Link } from 'react-router-dom';

function Profile({ onLogout, isLogged, onSubmitForm, isResponseMessage }) {

  const currentUser = useContext(CurrentUserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUserData, setIsUserData] = useState({});
  const [isErorrMessage, setIsErorrMessage] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setIsUserData((prev) => ({ ...prev, [name]: value }));
    setIsErorrMessage((prev) => ({ ...prev, [name]: evt.target.validationMessage }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitForm(isUserData);
    currentUser.name = isUserData.name;
    currentUser.email = isUserData.email;
    setIsDisabled(!isDisabled);
    setIsValid(false);

  }

  useEffect(() => {
    if (isErorrMessage.name || isErorrMessage.email) {
      setIsValid(false);
    } else if (currentUser.name === isUserData.name &&
      currentUser.email === isUserData.email) {
      setIsValid(false);
    } else setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErorrMessage, isUserData]);


  useEffect(() => {
    setIsUserData({ name: currentUser.name, email: currentUser.email })
  }, [currentUser]);

  return (
    <>
      <Header isLogged={isLogged} />
      <main className='profile'>
        <h1 className='profile__title'>{`Привет, ${isUserData.name}!`}</h1>
        <form
          className='profile__form'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='profile__field'>
            <label htmlFor='name' className='profile__label'>Имя</label>
            <input
              className='profile__input'
              type='text'
              id='name'
              name='name'
              placeholder='Имя'
              defaultValue={isUserData.name}
              values={isUserData.name}
              required
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              minLength={2}
              maxLength={30}
              disabled={isDisabled}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          <div className='profile__input-error' >{isErorrMessage.name}</div>
          <hr className='line line_place_profile'></hr>
          <div className='profile__field'>
            <label htmlFor='email' className='profile__label'>E-mail</label>
            <input
              className='profile__input'
              type='email'
              id='email'
              name='email'
              placeholder='E-mail'
              defaultValue={isUserData.email}
              values={isUserData.email}
              required
              pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
              disabled={isDisabled}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          <div className='profile__input-error profile__input-error_email' >{isErorrMessage.email}</div>
          <div className='profile__error'>{isResponseMessage}</div>
          {isDisabled
            ?
            <>
              <p className='profile__edit hover' onClick={() => setIsDisabled(!isDisabled)}>Редактировать</p>
              <Link to='/'
                className='profile__logout hover'
                onClick={onLogout}
              >
                Выйти из аккаунта
              </Link>
            </>
            :
            <button
              type='submit'
              className={`profile__save-btn ${!isValid ? 'profile__save-btn_disable' : 'hover-btn'}`}
              disabled={!isValid}
            >
              Сохранить
            </button>
          }
        </form>
      </main>
    </>
  );
};

export default Profile;
