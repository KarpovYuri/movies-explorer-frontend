import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';
import './Movies.css';

import movies from '../../utils/dataMovies';

function Movies() {

  const isPreloader = false;

  return (
    <>
      <Header isLogged={true} />
      <SearchForm />
      {isPreloader ? <Preloader /> :
        <>
          <MoviesCardList movies={movies} type='all' />
          <More />
        </>
      }
      <Footer />
    </>
  );
};

export default Movies;
