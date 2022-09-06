import { useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSubmitSearchMovies, onClickShortMovie, displayOption }) {

  const [isSearchValue, setIsSearchValue] = useState('');
  const [isShortSwitch, setIsShortSwitch] = useState(false);
  const [isValidationError, setIsValidationError] = useState('');
  const [isValid, setIsValid] = useState(false);

  function handleChangeSearch(evt) {
    setIsValidationError(evt.target.validationMessage);
    setIsSearchValue(evt.target.value);
    setIsValid(evt.target.closest("form").checkValidity());
  };

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onSubmitSearchMovies(isSearchValue, isShortSwitch);
    setIsValid(false);
  };

  function handleChangeShortSwitch() {
    onClickShortMovie(!isShortSwitch);
    setIsShortSwitch(!isShortSwitch);
  };

  useEffect(() => {
    if (displayOption === 'all') {
      const searchText = localStorage.getItem('searchText');
      const shortMovieSwitch = localStorage.getItem('shortMovieSwitch');
      if (searchText && shortMovieSwitch) {
        setIsSearchValue(searchText);
        shortMovieSwitch === 'true' ? setIsShortSwitch(true) : setIsShortSwitch(false);
      }
    } else {
      localStorage.setItem('savedMovieSearchText', '');
      localStorage.setItem('shortSavedMovieSwitch', 'false');
      setIsShortSwitch(false);
    }
  }, [displayOption]);

  return (
    <section className='search'>
      <form
        className={`search__form ${isValidationError && 'search__form-error'}`}
        onSubmit={onSubmitSearch}
        noValidate
      >
        <div className='search__find-icon'></div>
        <div className='search__input-wrapper'>
          <input
            className='search__input'
            type='text'
            required
            placeholder='Фильм'
            value={isSearchValue}
            onChange={handleChangeSearch}
          />
          <div
            className={`search__button ${isValid ? 'hover-btn' : 'search__button_disabled'}`}
            onClick={onSubmitSearch}
          >
          </div>
        </div>
        <div className='search__checkbox-wrapper'>
          <label className='search__label-wrapper'>
            <input
              className='search__checkbox-default'
              checked={isShortSwitch ? true : false}
              type='checkbox'
              value='shortMovieSwitch'
              onChange={handleChangeShortSwitch}
            />
            <span className='search__checkbox-custom'></span>
          </label>
          <p className='search__checkbox-label'>Короткометражки</p>
        </div>
      </form>
      <div className='search__error'>{isValidationError}</div>
      <hr className='line'></hr>
    </section>
  );
};

export default SearchForm;
