import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__find-icon'></div>
        <div className='search__input-wrapper'>
          <input className='search__input' type='text' placeholder='Фильм' />
          <button className='search__button hover-btn' type='button'></button>
        </div>
        <div className='search__checkbox-wrapper'>
          <label className='search__label-wrapper'>
            <input className='search__checkbox-default' type='checkbox' value='short' />
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
