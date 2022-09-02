import './MoviesCard.css';

function MoviesCard({ movie, type }) {

  const { nameRU, duration, image, saved } = movie;

  function getFormattedTime(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  return (
    <section className='movie-card'>
      <img className='movie-card__image' src={`https://api.nomoreparties.co${image.url}`} alt={nameRU} />
      <div className='movie-card__info'>
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>{nameRU}</h2>
          {
            type === 'all'
              ? saved
                ? <button type='button' className='movie-card__btn movie-card__btn_type_saved  hover-btn'></button>
                : <button type='button' className='movie-card__btn movie-card__btn_type_unsaved  hover-btn'></button>
              : <button type='button' className='movie-card__btn movie-card__btn_type_close hover-btn'></button>
          }
        </div>
        <hr className='line line_place_movie'></hr>
        <p className='movie-card__duration'>{getFormattedTime(duration)}</p>
      </div>
    </section>
  );
};

export default MoviesCard;
