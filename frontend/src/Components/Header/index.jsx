import React, { useState } from 'react';
import './index.css'

import { useTranslation } from 'react-i18next';
import SwitchLocalization from '../SwitchLocalization';

const Header = ({ isWhiteTheme = false }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`${isWhiteTheme && 'headerAbsolute'}`}>
        <div className='header-container'>
          <div>
            <img
              src={isWhiteTheme ? '/logo.svg' : '/logo-black.svg'}
              alt='Anumo Logo'>
            </img>
          </div>
          <div className='textCenter'>
            <button className='burgerMenuButton' onClick={toggleMenu}>
              <img
                src={isWhiteTheme ? '/menu-burger.svg' : '/menu-burger-black.svg'}
                alt='Burger Menu'>
              </img>
            </button>
          </div>
          <div className='textEnd'>
            <img
              src= {isWhiteTheme ? '/shopping-bag.svg' : '/shopping-bag-black.svg'}
              alt='Shopping Bag'>
            </img>
          </div>
        </div>
      </header>

      <div className={`sidebarMenu ${isMenuOpen ? 'open' : ''}`}>
        <div className={'sidebarMenu-container'}>
          <div className='textEnd'><img src='/shopping-bag-black.svg' alt='Anumo Logo'></img></div>
          <ul className='menuLinks'>           
            <li><a href='#'>{t('Header.homeLink')}</a></li>
            <li><a href='#'>{t('Header.shopLink')}</a></li>
            <li><a href='#'>{t('Header.projectsLink')}</a></li>
            <li><a href='#'>{t('Header.aboutLink')}</a></li>
            <li><a href='#'>{t('Header.contactUsLink')}</a></li>
            <li><a href='#'>{t('Header.findUsLink')}</a></li>
          </ul>
          <div className='menuFooter'>
            <div className='menuFooter-container'>
              <ul>
                <li>{t('Footer.privacyPolicyLink')}</li>
                <li>{t('Footer.paymentDeliveryLink')}</li>
                <li>{t('Footer.returnsLink')}</li>
              </ul>
              {/* <div className='languageCurrency-container'>
                <div className='language'>{t('Footer.lang')}</div>
                <div className='currency'>{t('Footer.currency')}</div>
              </div> */}
              <SwitchLocalization/>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className='overlay' onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;