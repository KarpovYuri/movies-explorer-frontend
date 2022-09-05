import { useState, useContext, useEffect } from 'react';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ResponseSection from '../ResponseSection/ResponseSection';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

import { searchSavedMovie } from '../../utils/searchMovie';
import { notFoundMessage } from '../../utils/constants'

function SavedMovies({ onClickDeleteMovie, isLogged }) {

  const savedMovies = useContext(CurrentSavedMoviesContext);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [isFoundMovies, setIsFoundMovies] = useState([]);
  const [isResponseMessage, setIsResponseMessage] = useState('');

  function renderMovies() {
    setIsPreloader(true);
    const foundMovies = searchSavedMovie(savedMovies);
    if (foundMovies.length === 0) {
      setIsRender(false);
      setIsPreloader(false);
      setIsResponseMessage(notFoundMessage);
    }
    else {
      setIsRender(true);
      setIsPreloader(false);
      setIsFoundMovies(foundMovies);
    }
  };

  function onSubmitSearchMovies(searchText, shortMovieSwitch) {
    localStorage.setItem('savedMovieSearchText', searchText);
    localStorage.setItem('shortSavedMovieSwitch', shortMovieSwitch);
    renderMovies();
  };

  function onClickShortMovie(shortMovieSwitch) {
    localStorage.setItem('shortSavedMovieSwitch', shortMovieSwitch);
    renderMovies();
  };

  useEffect(() => {
    localStorage.setItem('savedMovieSearchText', '');
    setIsPreloader(true);
    renderMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);

  return (
    <>
      <Header isLogged={isLogged} />
      <main>
        <SearchForm
          displayOption={'save'}
          onSubmitSearchMovies={onSubmitSearchMovies}
          onClickShortMovie={onClickShortMovie}
        />
        {isPreloader ? <Preloader /> :
          isRender ?
            <MoviesCardList
              movies={isFoundMovies}
              displayOption={'save'}
              onClickMovieBtn={onClickDeleteMovie}
            /> :
            isResponseMessage && <ResponseSection
              isResponseMessage={isResponseMessage}
            />
        }
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
