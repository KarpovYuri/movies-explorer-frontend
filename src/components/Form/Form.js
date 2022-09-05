import { Link } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidation'
import './Form.css';

function Form({
  title,
  pageType,
  button,
  text,
  onSubmitForm,
  isResponseMessage,
}) {

  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitForm(values);
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
      noValidate
    >
      <Link to='/' className='form__logo hover'></Link>
      <h1 className='form__title'>{title}</h1>
      <fieldset className='form__fieldset'>
        {pageType === 'signup' && (
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
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              minLength={2}
              maxLength={30}
              onChange={handleChange}
            />
            <span className='form__input-error'>{errors.name}</span>
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
            pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
            onChange={handleChange}
          />
          <span className='form__input-error'>{errors.email}</span>
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
          <span className='form__input-error'>{errors.password}</span>
        </div>
      </fieldset>
      <div className='form__response-error'>{isResponseMessage}</div>
      <button
        type='submit'
        className={`form__btn ${isValid ? 'hover-btn' : 'profile__btn_disable'}`}
        disabled={!isValid}
      >
        {button}
      </button>
      <p className='form__link-wrapper'>
        {text}
        {pageType === 'signup'
          ? <Link className='form__link hover' to='/signin'>Войти</Link>
          : <Link className='form__link hover' to='/signup'>Регистрация</Link>
        }
      </p>
    </form>
  );
};

export default Form;
