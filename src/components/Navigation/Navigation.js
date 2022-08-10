import { React } from 'react';
import AuthMenu from './components/AuthMenu/AuthMenu';
import MovieMenu from './components/MovieMenu/MovieMenu';

function Navigation() {
  const isLogin = false; // Переделать на level-3

  return isLogin ? <MovieMenu /> : <AuthMenu />;
};

export default Navigation;
