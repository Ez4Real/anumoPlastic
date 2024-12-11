import './index.css';

// Product cringe
import homepageImg from '/assets/images/homepage.png';
import prod1 from '/assets/productImages/prod1.png'
import prod2 from '/assets/productImages/prod2.png'
import prod3 from '/assets/productImages/prod3.png'
import prod4 from '/assets/productImages/prod4.png'
import prod5 from '/assets/productImages/prod5.png'
import prod6 from '/assets/productImages/prod6.png'

import { useTranslation } from 'react-i18next';
import Cooperation from '../../components/Cooperation'
import { useState } from 'react';

const Main = () => {
  const { t } = useTranslation();

  const [dropdowns, setDropdowns] = useState({});

  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevState) => ({
        ...prevState,
        [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <>
        <div className='homepageImg-container'>
          <img src={homepageImg} alt="Homepage Img" className='homepageImg' />
        </div>
        <div className='mainContent-container'>
            <h1 className='homepageTitle'>ANUMO PLASTIC</h1>
            <div className='homepageInfo-container'>
                <div className='homepageInfoLeft'>
                    <>[Anúmo] — (ukr. ану́мо) a decisive and bold call to action.</>
                </div>
                <div className='homepageInfoRight'>
                    <>{t('HomePage.anumoAbout')}.</>
                    <div>
                    <ul className="dropdownList">
                        <li>
                            <span onClick={() => toggleDropdown('material')}>
                                {t('HomePage.material.title')}
                            </span>
                            {dropdowns.material && (
                                <div className="dropdown-content">
                                    {t('HomePage.material.description')}
                                </div>
                            )}
                        </li>
                        <li>
                            <span onClick={() => toggleDropdown('production')}>
                                {t('HomePage.production.title')}
                            </span>
                            {dropdowns.production && (
                                <div className="dropdown-content">
                                    {t('HomePage.production.description')}
                                </div>
                            )}
                        </li>
                        <li>
                            <span onClick={() => toggleDropdown('inspiration')}>
                                {t('HomePage.inspiration.title')}
                            </span>
                            {dropdowns.inspiration && (
                                <div className="dropdown-content">
                                    {t('HomePage.inspiration.description')}
                                </div>
                            )}
                        </li>
                        <li>
                            <span onClick={() => toggleDropdown('values')}>
                                {t('HomePage.values.title')}
                            </span>
                            {dropdowns.values && (
                                <div className="dropdown-content">
                                    {t('HomePage.values.description')}
                                </div>
                            )}
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div>{t('HomePage.aboutPolicy')}.</div>
            <div className='shopBlock-homepage'>
                <p className='blockTitle'>{t('HomePage.shopTitle')}</p>
                <div className='shopBlockImage-container'>
                    <img src={prod1} alt="Product" className='shopBlockProductImage'></img>
                    <img src={prod2} alt="Product" className='shopBlockProductImage'></img>
                    <img src={prod3} alt="Product" className='shopBlockProductImage'></img>
                </div>
                <div className='goToShopArrow'>
                    <img src='/arrow-right.svg'></img>
                </div>
            </div>
            <div className='homepageCategories-container'>
                <div className='CategoriesLeft-homepage'>
                    <>/{t('HomePage.enjoyResponsibility')}/</>
                </div>
                <div className='CategoriesRight-homepage'>
                    <p>{t('HomePage.categoriesTitle')}</p>
                    <div>
                        <ul>
                            <li>{t('HomePage.carabiners')}</li>
                            <li>{t('HomePage.bookHolders')}</li>
                            <li>{t('HomePage.chokers')}</li>
                            <li>{t('HomePage.plates')}</li>
                            <li>{t('HomePage.soapDishes')}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='projectsBlock-homepage'>
                <p className='blockTitle'>{t('HomePage.projectsTitle')}</p>
                <div className='projectsInner-container'>
                    <div className='projectsInnerLeft'>
                        <img src={prod4} alt="productImage"></img>
                        <h4>{t('HomePage.alltrueestTitle')}</h4>
                        <p>{t('HomePage.alltrueestDesc')}.</p>
                        <p>{t('HomePage.alltrueestFrom')}</p>
                    </div>
                    <div className='projectsInnerRight'>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod5} alt="productImage"></img>
                            </div>
                            <p>{t('HomePage.giraffeTitle')}</p>
                        </div>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod6} alt="productImage"></img>
                            </div>
                            <p>{t('HomePage.hypermobileTitle')}</p>
                        </div>
                    </div>
                </div>
                <p className="vievAllProjectsLink">{t('HomePage.viewAll')}</p>
            </div>
            
            <Cooperation />

        </div>
    </>
  );
};

export default Main;