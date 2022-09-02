import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';

function MoviesCardList({ movies, type }) {
  return (
    <section className='movie-card-list'>
      <ul className='movie-card-list__cards'>
        {movies.map(item => <MoviesCard movie={item} key={item.id} type={type} />)}
      </ul>
    </section>
  );
};

export default MoviesCardList;
