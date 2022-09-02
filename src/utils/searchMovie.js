function searchMovie() {
  const movieDataBase = JSON.parse(localStorage.getItem('movieDataBase'));
  const searchText = localStorage.getItem('searchText');
  const shortMovieSwitch = localStorage.getItem('shortMovieSwitch');

  const foundMovies = movieDataBase.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0);
  if (shortMovieSwitch === 'true') return foundMovies.filter((movie) => movie.duration < 40);
  else return foundMovies;
};

export default searchMovie;
