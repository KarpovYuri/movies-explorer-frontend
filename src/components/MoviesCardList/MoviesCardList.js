import React, { useEffect, useState } from 'react';
import MoviesCard from './MoviesCard/MoviesCard';
import More from './More/More';
import './MoviesCardList.css';

function MoviesCardList({ movies, displayOption }) {

  const [isMoviesCounter, setIsMoviesCounter] = useState(0);
  const [isQtyAddMovies, setIsQtyAddMovies] = useState(0);

  function setNumberMovies(windowWidth) {
    switch (true) {
      case (windowWidth > 1279):
        setIsMoviesCounter(16);
        setIsQtyAddMovies(4);
        break;
      case (windowWidth > 989):
        setIsMoviesCounter(12);
        setIsQtyAddMovies(3);
        break;
      case (windowWidth > 629):
        setIsMoviesCounter(8);
        setIsQtyAddMovies(2);
        break;
      default:
        setIsMoviesCounter(5);
        setIsQtyAddMovies(2);
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
                />
              );
            })
            : movies.map((item) => {
              return (
                <MoviesCard
                  movie={item}
                  key={item._id}
                />
              );
            })}
        </ul>
      </section>
      {
        movies.length > isMoviesCounter
          ? <More incMoviesCounter={incMoviesCounter} />
          : <More isBtnHiden={true} />
      }
    </>
  );
};

export default MoviesCardList;
