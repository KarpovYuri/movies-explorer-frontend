import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

import movies from '../../utils/dataMovies';

function SavedMovies() {

  const isPreloader = false;
  const savedMovies = movies.filter((item) => item.saved);

  return (
    <>
      <Header isLogged={true} />
      <SearchForm />
      {isPreloader ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList movies={savedMovies} type={'save'} />
          <More isShowMore={false} />
        </>
      )}
      <Footer />
    </>
  );
};

export default SavedMovies;
