import React from 'react';
import { NavLink } from 'react-router-dom';
import './AuthMenu.css';

function AuthMenu() {
  return (
    <nav className='auth-menu'>
      <NavLink to='/signup' className='auth-menu__link'>Регистрация</NavLink>
      <NavLink to='/signin' className='auth-menu__button'>Войти</NavLink>
    </nav>
  );
};

export default AuthMenu;
