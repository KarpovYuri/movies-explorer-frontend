import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

import moviesApi from '../../utils/MoviesApi';
import searchMovie from '../../utils/searchMovie';

function Movies({ onClickSaveMovie, openPopup }) {

  const [isPreloader, setIsPreloader] = useState(false);
  const [isFoundMovies, setIsFoundMovies] = useState([]);
  const [isRender, setIsRender] = useState(true);

  function renderMovies() {
    const foundMovies = searchMovie();
    if (foundMovies.length === 0) {
      openPopup('По данному запросу ничего не найдено.');
      setIsRender(false);
      setIsPreloader(false);
    }
    else {
      setIsFoundMovies(foundMovies);
      setIsRender(true);
      setIsPreloader(false);
    }
  };

  async function onSubmitSearchMovies(searchText, shortMovieSwitch) {
    setIsPreloader(true);
    localStorage.setItem('searchText', searchText.toLowerCase());
    localStorage.setItem('shortMovieSwitch', shortMovieSwitch);
    if (!localStorage.getItem('movieDataBase')) {
      await moviesApi.getMovies()
        .then(result => localStorage.setItem('movieDataBase', JSON.stringify(result)))
        .catch(() => openPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.Подождите немного и попробуйте ещё раз'))
    }
    renderMovies();
  };

  function onClickShortMovie(shortMovieSwitch) {
    localStorage.setItem('shortMovieSwitch', shortMovieSwitch);
    if (localStorage.getItem('movieDataBase')) renderMovies();
  };

  useEffect(() => {
    if (localStorage.getItem('movieDataBase')) {
      setIsRender(true);
      renderMovies();
    } else setIsRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header isLogged={true} />
      <main>
        <SearchForm
          onSubmitSearchMovies={onSubmitSearchMovies}
          onClickShortMovie={onClickShortMovie}
          openPopup={openPopup}
        />
        {isPreloader ? <Preloader /> :
          isRender && (
            <MoviesCardList
              movies={isFoundMovies}
              type={'all'}
              onClickButtonMovie={onClickSaveMovie}
            />
          )
        }
      </main>
      <Footer />
    </>
  );
};

export default Movies;
