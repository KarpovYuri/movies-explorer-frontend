import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Form.css';

function Form({ title, type, button, text }) {

  const [isErrorMessage, setIsErrorMessage] = useState({ name: '', email: '', password: '' });
  const [isInputValue, setIsInputValue] = useState({ name: '', email: '', password: '' });

  const handleChangeValue = (evt) => {
    const { name, value } = evt.target;
    setIsInputValue((prev) => ({ ...prev, [name]: value }));
    setIsErrorMessage((prev) => ({ ...prev, [name]: evt.target.validationMessage }));
  };

  return (
    <form className='form'>
      <Link to='/' className='form__logo hover'></Link>
      <h1 className='form__title'>{title}</h1>
      <fieldset className='form__fieldset'>
        {type === 'signup' && (
          <div className='form__field'>
            <label htmlFor='name' className='form__label'>Имя</label>
            <input
              type='text'
              id='name'
              name='name'
              className={`form__input ${isErrorMessage.name && 'error'}`}
              placeholder='Имя'
              value={isInputValue.name}
              autoComplete='off'
              required
              minLength={2}
              maxLength={30}
              onChange={handleChangeValue}
            />
            <span className='form__error'>{isErrorMessage.name}</span>
          </div>
        )}
        <div className='form__field'>
          <label htmlFor='email' className='form__label'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            className={`form__input ${isErrorMessage.email && 'error'}`}
            placeholder='E-mail'
            value={isInputValue.email}
            autoComplete='off'
            required
            onChange={handleChangeValue}
          />
          <span className='form__error'>{isErrorMessage.email}</span>
        </div>
        <div className='form__field'>
          <label htmlFor='password' className='form__label'>Пароль</label>
          <input
            type='password'
            id='password'
            name='password'
            className={`form__input ${isErrorMessage.password && 'error'}`}
            placeholder='Пароль'
            value={isInputValue.password}
            autoComplete='off'
            required
            onChange={handleChangeValue}
          />
          <span className='form__error'>{isErrorMessage.password}</span>
        </div>
      </fieldset>
      <button type='submit' className='form__btn hover-btn'>{button}</button>
      <p className='form__link-wrapper'>
        {text}
        {type === 'signup'
          ? (<Link className='form__link hover' to='/signin'>Войти</Link>)
          : (<Link className='form__link hover' to='/signup'>Регистрация</Link>)
        }
      </p>
    </form>
  );
};

export default Form;
