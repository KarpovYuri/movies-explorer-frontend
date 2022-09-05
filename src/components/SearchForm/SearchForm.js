import { useEffect, useState } from 'react';
import './SearchForm.css';

import { validationMessage } from '../../utils/constants'

function SearchForm({ onSubmitSearchMovies, onClickShortMovie, displayOption }) {

  const [isSearchValue, setIsSearchValue] = useState('');
  const [isShortSwitch, setIsShortSwitch] = useState(false);
  const [isValidationError, setIsValidationError] = useState('');

  function handleChangeSearch(evt) {
    setIsValidationError(evt.target.validationMessage);
    setIsSearchValue(evt.target.value);
  };

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (isSearchValue === '') setIsValidationError(validationMessage);
    else onSubmitSearchMovies(isSearchValue, isShortSwitch);
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
      const shortSavedMovieSwitch = localStorage.getItem('shortSavedMovieSwitch');
      shortSavedMovieSwitch === 'true' ? setIsShortSwitch(true) : setIsShortSwitch(false);
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
            className='search__button hover-btn'
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
