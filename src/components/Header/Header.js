import { React } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLogged }) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo hover' />
      <Navigation isLogged={isLogged} />
    </header>
  );
};

export default Header;
