import { Link } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidation'
import './Form.css';

function Form({ title, type, button, text }) {

  const { values, handleChange, errors, isValid } = useFormAndValidation();

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
              className={`form__input ${errors.name && 'error'}`}
              placeholder='Имя'
              value={values.name || ''}
              autoComplete='off'
              required
              minLength={2}
              maxLength={30}
              onChange={handleChange}
            />
            <span className='form__error'>{errors.name}</span>
          </div>
        )}
        <div className='form__field'>
          <label htmlFor='email' className='form__label'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            className={`form__input ${errors.email && 'error'}`}
            placeholder='E-mail'
            value={values.email || ''}
            autoComplete='off'
            required
            onChange={handleChange}
          />
          <span className='form__error'>{errors.email}</span>
        </div>
        <div className='form__field'>
          <label htmlFor='password' className='form__label'>Пароль</label>
          <input
            type='password'
            id='password'
            name='password'
            className={`form__input ${errors.password && 'error'}`}
            placeholder='Пароль'
            value={values.password || ''}
            autoComplete='off'
            required
            onChange={handleChange}
          />
          <span className='form__error'>{errors.password}</span>
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
