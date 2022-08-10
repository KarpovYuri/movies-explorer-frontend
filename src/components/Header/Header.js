import { React } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='header__logo' />
      <Navigation />
    </header>
  );
};

export default Header;
