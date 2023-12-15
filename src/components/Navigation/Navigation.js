import { React } from "react";
import AuthMenu from "./AuthMenu/AuthMenu";
import MovieMenu from "./MovieMenu/MovieMenu";

function Navigation({ isLogged }) {
  return isLogged ? <MovieMenu /> : <AuthMenu />;
}

export default Navigation;
