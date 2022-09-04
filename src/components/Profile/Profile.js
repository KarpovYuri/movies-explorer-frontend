import { React } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';

import userData from '../../utils/dataUser';

function Profile({ onLogout, isLogged }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const isError = false;

  const { name, email } = userData;

  return (
    <>
      <Header isLogged={isLogged} />
      <main className='profile'>
        <h1 className='profile__title'>{`Привет, ${name}!`}</h1>
        <form className='profile__form'>
          <div className='profile__field'>
            <label htmlFor='name' className='profile__label'>Имя</label>
            <input
              className='profile__input'
              type='text'
              id='name'
              name='name'
              placeholder='Имя'
              defaultValue={name}
              required
              minLength={2}
              maxLength={30}
              disabled={isDisabled}
              autoComplete='off'
            />
          </div>
          <hr className='line line_place_profile'></hr>
          <div className='profile__field'>
            <label htmlFor='email' className='profile__label'>E-mail</label>
            <input
              className='profile__input'
              type='email'
              id='email'
              name='email'
              placeholder='E-mail'
              defaultValue={email}
              required
              disabled={isDisabled}
              autoComplete='off'
            />
          </div>
          {isError && <span className='profile__error'>При обновлении профиля произошла ошибка.</span>}
          {isDisabled
            ?
            <>
              <p className='profile__edit hover' onClick={() => setIsDisabled(!isDisabled)}>Редактировать</p>
              <p
                className='profile__logout hover'
                onClick={onLogout}
              >
                Выйти из аккаунта
              </p>
            </>
            :
            <button
              type='submit'
              className={`profile__save-btn ${isError ? 'profile__save-btn_disable' : 'hover-btn'}`}
              disabled={isError}
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
