import React, { useState } from 'react';
import './index.css'
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next';
import SwitchLocalization from '../SwitchLocalization';
import ProductCounter from '../../components/ProductCounter'


// Заглушка!!!
import productImage from '/assets/productImages/prod1.png';


const Header = ({ isWhiteTheme = false }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closePopups = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${isWhiteTheme && 'headerAbsolute'}`}>
        <div className='header-container'>
          <div>
            <Link as={RouterLink} to="/">
              <img
                src={isWhiteTheme ? '/logo.svg' : '/logo-black.svg'}
                alt='Anumo Logo'>
              </img>
            </Link>
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
            <button className='cartPopupButton' onClick={toggleCart}>
              <img
                src= {isWhiteTheme ? '/shopping-bag.svg' : '/shopping-bag-black.svg'}
                alt='Shopping Bag'>
              </img>
            </button>
          </div>
        </div>
      </header>

      <div className={`sidebarMenu ${isMenuOpen ? 'open' : ''}`}>
        <div className={'sidebarMenu-container'}>
          <div className='textEnd'>
            <button className='cartPopupButton' onClick={toggleCart}>
              <img src='/shopping-bag-black.svg' alt='Shopping Bag'></img>
            </button>
          </div>
          <ul className='menuLinks'>
            <Link
              className='Link'
              as={RouterLink}
              to="/"
              onClick={handleLinkClick}
            ><li>{t('Header.homeLink')}</li></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="/shop"
              onClick={handleLinkClick}
            ><li>{t('Header.shopLink')}</li></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="/projects"
              onClick={handleLinkClick}
            ><li>{t('Header.projectsLink')}</li></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="/about-us"
              onClick={handleLinkClick}
            ><li>{t('Header.aboutLink')}</li></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="/contact-us"
              onClick={handleLinkClick}
            ><li>{t('Header.contactUsLink')}</li></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="/find-us"
              onClick={handleLinkClick}
            ><li>{t('Header.findUsLink')}</li></Link>
          </ul>
          <div className='menuFooter'>
            <div className='menuFooter-container'>
              <ul>
                <li>{t('Footer.privacyPolicyLink')}</li>
                <li>{t('Footer.paymentDeliveryLink')}</li>
                <li>{t('Footer.returnsLink')}</li>
              </ul>
              <SwitchLocalization/>
            </div>
          </div>
        </div>
      </div>

      <div className={`cartPopup ${isCartOpen ? 'open' : ''}`}>
        <div className='cartPopup-container'>
          <div className='title-container'>
            <p>{t('Header.cartTitle')}</p>
            <div
              className="crossBtn"
              onClick={toggleCart}
              aria-label="Close"
              role="button"
            ></div>
          </div>
          {/* <div className='emptyCartContent-container'>
            <p className='emptyCart'>{t('Header.emptyCart')}</p>
            <p className='emptyCartHint'>{t('Header.emptyCartHint')}</p>
            <div className='shopLink' as={Link} to="/shop">
              {t('Header.cartShopLink')}
            </div>
          </div> */}
          <div>
            <div className='productCartContent-container'>
              <div className='image-container'>
                  <img src={productImage} alt='Product' />
              </div>
              <div className='info-container'>
                  <p className='productTitle'>CARABINER FOR KEYS WITH HEART SHAPE</p>
                  <p className='productSizes'>75x55x6мм, 75x65x6мм</p>
                  <div className='infoFooter-container'>
                      <ProductCounter />
                      <div className='price'>$24</div>
                  </div>
              </div>
            </div>
            <div className='cartPopupBottom-container'>
              <div className='subtotal'>
                <div>{t('Checkout.orderSubtotal')}</div><div>$24</div>
              </div>
              <div className='checkoutBtn-container'>
                <p className='checkoutHint'>{t('Header.checkoutHint')}</p>
                <button>
                    {t('Checkout.placeOrder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(isMenuOpen || isCartOpen) && (
        <div className='overlay' onClick={closePopups}></div>
      )}
    </>
  );
};

export default Header;