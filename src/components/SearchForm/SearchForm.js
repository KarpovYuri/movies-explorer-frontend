import { useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSubmitSearchMovies, onClickShortMovie, openPopup }) {

  const [isSearchValue, setIsSearchValue] = useState('');
  const [isShortSwitch, setIsShortSwitch] = useState(false);

  function handleChangeSearch(evt) {
    setIsSearchValue(evt.target.value);
  };

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (isSearchValue === '') openPopup('Введите поисковый запрос.');
    else
      if (isSearchValue === localStorage.getItem('searchText')) {
        openPopup('Введите новый поисковый запрос.');
      } else onSubmitSearchMovies(isSearchValue, isShortSwitch);
  };

  function handleChangeShortSwitch() {
    if (isSearchValue === '') openPopup('Введите поисковый запрос.');
    else {
      onClickShortMovie(!isShortSwitch);
      setIsShortSwitch(!isShortSwitch);
    }
  };

  useEffect(() => {
    const searchText = localStorage.getItem('searchText');
    const shortMovieSwitch = localStorage.getItem('shortMovieSwitch');
    if (searchText && shortMovieSwitch) {
      setIsSearchValue(searchText);
      shortMovieSwitch === 'true' ? setIsShortSwitch(true) : setIsShortSwitch(false);
    }
  }, []);

  return (
    <section className='search'>
      <form
        className='search__form'
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
      <hr className='line line_place_search'></hr>
    </section>
  );
};

export default SearchForm;
