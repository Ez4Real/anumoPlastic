import React from 'react';
import './index.css'

const Header = () => {
  return (
    <header>
      <div className='header-container'>
        <div><img src='/logo.svg' alt='Anumo Logo'></img></div>
        <div className='textCenter'><img src='/menu-burger.svg' alt='Burger Menu'></img>
        </div>
        <div className='textEnd'><img src='/logo.svg' alt='Anumo Logo'></img></div>
      </div>
    </header>
  );
};

export default Header;