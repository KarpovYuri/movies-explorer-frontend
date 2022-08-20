import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {

  return (
    <>
      <Header isLogged={true} />
      <SearchForm />
      <Footer />
    </>
  );
};

export default Movies;
