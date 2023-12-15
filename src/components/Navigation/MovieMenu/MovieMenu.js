import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MovieMenu.css";

function MovieMenu() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  function handlerShowMobileMenu() {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  }

  return (
    <>
      <nav
        className={`movie-menu ${isOpenMobileMenu ? "movie-menu_show" : ""}`}
      >
        <div className="movie-menu__dummy"></div>
        <div className="movie-menu__links">
          <NavLink to="/" className="movie-menu__link show hover">
            Главная
          </NavLink>
          <NavLink to="/movies" className="movie-menu__link hover">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="movie-menu__link hover">
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink to="/profile" className="movie-menu__account-btn hover">
          Аккаунт
        </NavLink>
      </nav>
      <div
        className={`movie-menu__overlay ${isOpenMobileMenu ? "show" : "hide"}`}
      ></div>
      <div
        className={`movie-menu__mobile hover
        ${
          isOpenMobileMenu
            ? "movie-menu__mobile_type_cross"
            : "movie-menu__mobile_type_hamburger"
        }`}
        onClick={handlerShowMobileMenu}
      ></div>
    </>
  );
}

export default MovieMenu;
