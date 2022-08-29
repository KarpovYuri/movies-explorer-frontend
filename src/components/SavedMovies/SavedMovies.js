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
      <main>
        <SearchForm />
        {isPreloader ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList movies={savedMovies} type={'save'} />
            <More isShowMore={false} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
