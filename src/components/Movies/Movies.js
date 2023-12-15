import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import ResponseSection from "../ResponseSection/ResponseSection";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

import moviesApi from "../../utils/MoviesApi";
import { searchMovie } from "../../utils/searchMovie";
import {
  NOT_FOUND_MESSAGE,
  REQUEST_ERROR_MESSAGE,
} from "../../utils/constants";

function Movies({ onClickSaveMovie, isLogged }) {
  const [isPreloader, setIsPreloader] = useState(false);
  const [isFoundMovies, setIsFoundMovies] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [isResponseMessage, setIsResponseMessage] = useState("");

  function renderMovies() {
    setIsPreloader(false);
    const foundMovies = searchMovie();
    if (foundMovies.length === 0) {
      setIsResponseMessage(NOT_FOUND_MESSAGE);
      setIsRender(false);
    } else {
      setIsFoundMovies(foundMovies);
      setIsRender(true);
    }
  }

  function onSubmitSearchMovies(searchText, shortMovieSwitch) {
    setIsPreloader(true);
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("shortMovieSwitch", shortMovieSwitch);
    if (!localStorage.getItem("movieDataBase")) {
      moviesApi
        .getMovies()
        .then((result) => {
          localStorage.setItem("movieDataBase", JSON.stringify(result));
          renderMovies();
        })
        .catch(() => {
          setIsPreloader(false);
          setIsResponseMessage(REQUEST_ERROR_MESSAGE);
        });
    } else renderMovies();
  }

  function onClickShortMovie(shortMovieSwitch) {
    localStorage.setItem("shortMovieSwitch", shortMovieSwitch);
    if (localStorage.getItem("movieDataBase")) renderMovies();
  }

  useEffect(() => {
    if (localStorage.getItem("movieDataBase")) {
      setIsPreloader(true);
      setIsRender(true);
      renderMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header isLogged={isLogged} />
      <main>
        <SearchForm
          displayOption={"all"}
          onSubmitSearchMovies={onSubmitSearchMovies}
          onClickShortMovie={onClickShortMovie}
        />
        {isPreloader ? (
          <Preloader />
        ) : isRender ? (
          <MoviesCardList
            movies={isFoundMovies}
            displayOption={"all"}
            onClickMovieBtn={onClickSaveMovie}
          />
        ) : (
          isResponseMessage && (
            <ResponseSection isResponseMessage={isResponseMessage} />
          )
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
