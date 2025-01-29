import './index.css';
import { Link as RouterLink } from "@tanstack/react-router"
import { Link } from '@chakra-ui/react';

// Product cringe
import homepageImg from '/assets/images/homepage.png';
import prod1 from '/assets/productImages/prod1.png'
import prod2 from '/assets/productImages/prod2.png'
import prod3 from '/assets/productImages/prod3.png'
import prod4 from "/assets/images/projects/alltrueest/alltrueest_2.png"
import prod5 from "/assets/images/projects/tabletopGiraffe/tabletop56x65.png"
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
            <div className='shopBlock-homepage' id='shopBlock-homepage'>
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
                        <li>
                            <Link as={RouterLink} to="/products/Carabiner" color="black">
                                {t('HomePage.carabiners')}
                            </Link>
                        </li>
                        <li>
                            <Link as={RouterLink} to="/products/Book holder" color="black">
                                {t('HomePage.bookHolders')}
                            </Link>
                        </li>
                        <li>
                            <Link as={RouterLink} to="/products/Choker" color="black">
                                {t('HomePage.chokers')}
                            </Link>
                        </li>
                        <li>
                            <Link as={RouterLink} to="/products/Plate" color="black">
                                {t('HomePage.plates')}
                            </Link>
                        </li>
                        <li>
                            <Link as={RouterLink} to="/products/Soap holder" color="black">
                                {t('HomePage.soapHolders')}
                            </Link>
                        </li>
                      </ul>
                    </div>
                </div>
            </div>
            <div className='projectsBlock-homepage'>
                <p className='blockTitle'>{t('HomePage.projectsTitle')}</p>
                <div className='projectsInner-container'>
                    <div className='projectsInnerLeft'>
                        <img src={prod4} alt="productImage"></img>
                        <Link
                          as={RouterLink}
                          to="/projects/$index"
                          params={{ index: '9' }}
                          hash="projectsSlider"
                          color="black"
                        >
                            {t('HomePage.alltrueestTitle')}
                        </Link>
                        <p>{t('HomePage.alltrueestDesc')}.</p>
                        <p>{t('HomePage.alltrueestFrom')}</p>
                    </div>
                    <div className='projectsInnerRight'>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod5} alt="productImage"></img>
                            </div>
                            <Link
                              as={RouterLink}
                              to="/projects/$index"
                              params={{ index: '2' }}
                              hash="projectsSlider"
                              color="black"
                            >
                                {t('HomePage.giraffeTitle')}
                            </Link>
                        </div>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod6} alt="productImage"></img>
                            </div>
                            <Link
                              as={RouterLink}
                              to="/projects/$index"
                              params={{ index: '7' }}
                              hash="projectsSlider"
                              color="black"
                            >
                                {t('HomePage.hypermobileTitle')}
                            </Link>
                        </div>
                    </div>
                </div>
                <p className="vievAllProjectsLink">
                    <Link
                      as={RouterLink}
                      to="/projects/$index"
                      params={{ index: '0' }}
                      hash="projectsSlider"
                      color="black"
                    >
                        {t('HomePage.viewAll')}
                    </Link>
                </p>
            </div>
            
            <Cooperation />

        </div>
    </>
  );
};

export default Main;