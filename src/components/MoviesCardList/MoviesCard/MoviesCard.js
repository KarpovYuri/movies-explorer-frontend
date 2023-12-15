import { useContext } from "react";
import { CurrentSavedMoviesContext } from "../../../contexts/CurrentSavedMoviesContext";
import "./MoviesCard.css";

function MoviesCard({ movie, displayOption, onClickMovieBtn }) {
  const CurrentSavedMovies = useContext(CurrentSavedMoviesContext);
  const { nameRU, duration, image } = movie;
  const movieData = CurrentSavedMovies.filter(
    (item) => item.movieId === movie.id
  );
  const isSaved = movieData.length > 0;

  function getFormattedTime(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  return (
    <section className="movie-card">
      <a
        className="movie-card__trailer hover"
        href={movie.trailerLink}
        target={"_blank"}
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={
            displayOption === "all"
              ? `https://api.nomoreparties.co${image.url}`
              : movie.image
          }
          alt={nameRU}
        />
      </a>
      <div className="movie-card__info">
        <div className="movie-card__wrapper">
          <h2 className="movie-card__title">{nameRU}</h2>
          {displayOption === "all" ? (
            isSaved ? (
              <button
                type="button"
                className="movie-card__btn movie-card__btn_type_saved hover-btn"
                onClick={() =>
                  onClickMovieBtn(movie, "delete", movieData[0]._id)
                }
              ></button>
            ) : (
              <button
                type="button"
                className="movie-card__btn movie-card__btn_type_unsaved hover-btn"
                onClick={() => onClickMovieBtn(movie, "save", null)}
              ></button>
            )
          ) : (
            <button
              type="button"
              className="movie-card__btn movie-card__btn_type_close hover-btn"
              onClick={() => onClickMovieBtn(movie._id)}
            ></button>
          )}
        </div>
        <hr className="line line_place_movie"></hr>
        <p className="movie-card__duration">{getFormattedTime(duration)}</p>
      </div>
    </section>
  );
}

export default MoviesCard;
