import { React } from 'react';
import AuthMenu from './components/AuthMenu/AuthMenu';
import MovieMenu from './components/MovieMenu/MovieMenu';

function Navigation({ isLogged }) {

  return isLogged ? <MovieMenu /> : <AuthMenu />;
};

export default Navigation;
