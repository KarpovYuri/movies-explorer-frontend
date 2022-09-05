import React, { useEffect, useState } from 'react';
import MoviesCard from './MoviesCard/MoviesCard';
import More from './More/More';
import './MoviesCardList.css';

import {
  windowWidth_1279,
  windowWidth_989,
  windowWidth_629,
  moviesCounter_16,
  moviesCounter_12,
  moviesCounter_8,
  moviesCounter_5,
  qtyAddMovies_4,
  qtyAddMovies_3,
  qtyAddMovies_2,
} from '../../utils/config';

function MoviesCardList({ movies, displayOption, onClickMovieBtn }) {

  const [isMoviesCounter, setIsMoviesCounter] = useState(0);
  const [isQtyAddMovies, setIsQtyAddMovies] = useState(0);

  function setNumberMovies(windowWidth) {
    switch (true) {
      case (windowWidth > windowWidth_1279):
        setIsMoviesCounter(moviesCounter_16);
        setIsQtyAddMovies(qtyAddMovies_4);
        break;
      case (windowWidth > windowWidth_989):
        setIsMoviesCounter(moviesCounter_12);
        setIsQtyAddMovies(qtyAddMovies_3);
        break;
      case (windowWidth > windowWidth_629):
        setIsMoviesCounter(moviesCounter_8);
        setIsQtyAddMovies(qtyAddMovies_2);
        break;
      default:
        setIsMoviesCounter(moviesCounter_5);
        setIsQtyAddMovies(qtyAddMovies_2);
    }
  };

  function incMoviesCounter() {
    setIsMoviesCounter(isMoviesCounter + isQtyAddMovies);
  }

  // Функция уменьшения частоты Resize
  function slowDownResize(callback) {
    let blockedCall
      = false;
    return function () {
      if (blockedCall) return;
      const context = this;
      const args = arguments;
      blockedCall = true;
      setTimeout(() => {
        callback.apply(context, args);
        blockedCall = false;
      }, 500);
    }
  }

  useEffect(() => {
    setNumberMovies(window.innerWidth);
    window.addEventListener('resize', slowDownResize((evt) => {
      setNumberMovies(evt.currentTarget.innerWidth);
    }));
  }, []);

  return (
    <>
      <section className='movie-card-list'>
        <ul className='movie-card-list__cards'>
          {displayOption === 'all'
            ? movies.slice(0, isMoviesCounter).map((item) => {
              return (
                <MoviesCard
                  movie={item}
                  key={item.id}
                  displayOption='all'
                  onClickMovieBtn={onClickMovieBtn}
                />
              );
            })
            : movies.map((item) => {
              return (
                <MoviesCard
                  movie={item}
                  key={item._id}
                  onClickMovieBtn={onClickMovieBtn}
                />
              );
            })}
        </ul>
      </section>
      {
        movies.length > isMoviesCounter && displayOption === 'all'
          ? <More incMoviesCounter={incMoviesCounter} />
          : <More isBtnHiden={true} />
      }
    </>
  );
};

export default MoviesCardList;
