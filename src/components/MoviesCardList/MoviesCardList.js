import React, { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard/MoviesCard";
import More from "./More/More";
import "./MoviesCardList.css";

import {
  WINDOW_WIDTH_1279,
  WINDOW_WIDTH_989,
  WINDOW_WIDTH_629,
  QTY_MOVIES_WIDTH_MORE_1279,
  QTY_MOVIES_WIDTH_MORE_989,
  QTY_MOVIES_WIDTH_MORE_629,
  QTY_MOVIES_WIDTH_MOBILE,
  QTY_ADD_MOVIES_WIDTH_MORE_1279,
  QTY_ADD_MOVIES_WIDTH_MORE_989,
  QTY_ADD_MOVIES_WIDTH_MORE_629,
  QTY_ADD_MOVIES_WIDTH_MORE_MOBILE,
} from "../../utils/config";

function MoviesCardList({ movies, displayOption, onClickMovieBtn }) {
  const [isMoviesCounter, setIsMoviesCounter] = useState(0);
  const [isQtyAddMovies, setIsQtyAddMovies] = useState(0);

  function setNumberMovies(windowWidth) {
    switch (true) {
      case windowWidth > WINDOW_WIDTH_1279:
        setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_1279);
        setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_1279);
        break;
      case windowWidth > WINDOW_WIDTH_989:
        setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_989);
        setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_989);
        break;
      case windowWidth > WINDOW_WIDTH_629:
        setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_629);
        setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_629);
        break;
      default:
        setIsMoviesCounter(QTY_MOVIES_WIDTH_MOBILE);
        setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_MOBILE);
    }
  }

  function incMoviesCounter() {
    setIsMoviesCounter(isMoviesCounter + isQtyAddMovies);
  }

  // Функция уменьшения частоты Resize
  function slowDownResize(callback) {
    let blockedCall = false;
    return function () {
      if (blockedCall) return;
      const context = this;
      const args = arguments;
      blockedCall = true;
      setTimeout(() => {
        callback.apply(context, args);
        blockedCall = false;
      }, 500);
    };
  }

  useEffect(() => {
    setNumberMovies(window.innerWidth);
    window.addEventListener(
      "resize",
      (window.fn = slowDownResize((evt) =>
        setNumberMovies(evt.currentTarget.innerWidth)
      ))
    );
    return () => window.removeEventListener("resize", window.fn);
  }, []);

  return (
    <>
      <section className="movie-card-list">
        <ul className="movie-card-list__cards">
          {displayOption === "all"
            ? movies.slice(0, isMoviesCounter).map((item) => {
                return (
                  <MoviesCard
                    movie={item}
                    key={item.id}
                    displayOption="all"
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
      {movies.length > isMoviesCounter && displayOption === "all" ? (
        <More incMoviesCounter={incMoviesCounter} />
      ) : (
        <More isBtnHiden={true} />
      )}
    </>
  );
}

export default MoviesCardList;
