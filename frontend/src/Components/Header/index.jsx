import React, { useState } from 'react';
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className='header-container'>
          <div><img src='/logo.svg' alt='Anumo Logo'></img></div>
          <div className='textCenter'>
            <button className='burgerMenuButton' onClick={toggleMenu}>
              <img src='/menu-burger.svg' alt='Burger Menu'></img>
            </button>
          </div>
          <div className='textEnd'><img src='/shopping-bag.svg' alt='Anumo Logo'></img></div>
        </div>
      </header>

      <div className={`sidebarMenu ${isMenuOpen ? 'open' : ''}`}>
        <div className={'sidebarMenu-container'}>
          <div className='textEnd'><img src='/shopping-bag-black.svg' alt='Anumo Logo'></img></div>
          <ul className='menuLinks'>           
            <li><a href='#'>HOME</a></li>
            <li><a href='#'>SHOP</a></li>
            <li><a href='#'>PROJECTS</a></li>
            <li><a href='#'>ABOUT</a></li>
            <li><a href='#'>CONTACT US</a></li>
            <li><a href='#'>FIND US</a></li>
          </ul>
          <div className='menuFooter'>
            <div className='menuFooter-container'>
              <ul>
                <li>Privacy Policy</li>
                <li>Payment and Delivery</li>
                <li>Returns</li>
              </ul>
              <div className='languageCurrency-container'>
                <div className='language'>ENG</div>
                <div className='currency'>USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className='overlay' onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;