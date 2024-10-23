import './index.css';

// Product cringe
import prod1 from '../../assets/productImages/prod1.png'
import prod2 from '../../assets/productImages/prod2.png'
import prod3 from '../../assets/productImages/prod3.png'
import prod4 from '../../assets/productImages/prod4.png'
import prod5 from '../../assets/productImages/prod5.png'
import prod6 from '../../assets/productImages/prod6.png'

import homepageImg from '../../assets/images/homepage.png';

const Main = () => {
  return (
    <>
        <div className='homepageImg-container'>
          <img src={homepageImg} alt="Homepage Img" className='homepageImg' />
        </div>
        <div className='mainContent-container'>
            <h1 className='homepageTitle'>ANUMO PLASIC</h1>
            <div className='homepageInfo-container'>
                <div className='homepageInfoLeft'>
                    <>[Anúmo] — (ukr. ану́мо) a decisive and bold call to action.</>
                </div>
                <div className='homepageInfoRight'>
                    <>We are a design studio of objects made from recycled plastic. Established in 2020 in Kyiv. We explore the possibilities of plastic recycling and reuse, transforming it into unique accessories and interior items.</>
                    <div>
                        <ul>
                            <li>MATERIAL</li>
                            <li>PRODUCTION</li>
                            <li>INSPIRATION</li>
                            <li>VALUES</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>We advocate for open and honest cooperation, built on horizontal hierarchy and principles of mutual respect. We do not support exploitation or product testing on animals. We do not cooperate with terrorist countries.</div>
            <div className='shopBlock-homepage'>
                <p className='blockTitle'>SHOP</p>
                <div className='shopBlockImage-container'>
                    <img src={prod1} alt="Product" className='shopBlockProductImage'></img>
                    <img src={prod2} alt="Product" className='shopBlockProductImage'></img>
                    <img src={prod3} alt="Product" className='shopBlockProductImage'></img>
                </div>
                <div className='goToShopArrow'>
                    <svg width="84" height="30" viewBox="0 0 84 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 13C0.89543 13 0 13.8954 0 15C0 16.1046 0.89543 17 2 17V13ZM83.4142 16.4142C84.1953 15.6332 84.1953 14.3668 83.4142 13.5858L70.6863 0.857864C69.9052 0.0768156 68.6389 0.0768156 67.8579 0.857864C67.0768 1.63891 67.0768 2.90524 67.8579 3.68629L79.1716 15L67.8579 26.3137C67.0768 27.0948 67.0768 28.3611 67.8579 29.1421C68.6389 29.9232 69.9052 29.9232 70.6863 29.1421L83.4142 16.4142ZM2 17H82V13H2V17Z" fill="black"/>
                    </svg>
                </div>
            </div>
            <div className='homepageCategories-container'>
                <div className='CategoriesLeft-homepage'>
                    <>/ENJOY RESPONSIBILITY/</>
                </div>
                <div className='CategoriesRight-homepage'>
                    <p>CATEGORIES</p>
                    <div>
                        <ul>
                            <li>CARABINERS</li>
                            <li>BOOK HOLDERS</li>
                            <li>CHOKERS</li>
                            <li>PLATES</li>
                            <li>SOAP DISHES</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='projectsBlock-homepage'>
                <p className='blockTitle'>PROJECTS</p>
                <div className='projectsInner-container'>
                    <div className='projectsInnerLeft'>
                        <img src={prod4} alt="productImage"></img>
                        <h4>ALLTRUEEST</h4>
                        <p>Large dining table and coffee table made of recycled plastic
                        for Alltrueast cafe.</p>
                        <p>Pattern made by Anumo Plastic</p>
                    </div>
                    <div className='projectsInnerRight'>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod5} alt="productImage"></img>
                            </div>
                            <p>TABLE TOP MOBLE “GIRAFFE”</p>
                        </div>
                        <div className='projectSmallCard'>
                            <div className='imgContainer'>
                                <img src={prod6} alt="productImage"></img>
                            </div>
                            <p>HYPERMOBILE</p>
                        </div>
                    </div>
                </div>
                <p className="vievAllProjectsLink">VIEW ALL</p>
            </div>
            <div className='partnershipBlock'>
                <h3 className='blockTitle'>Partnership</h3>
                <div className='emailContainer'>
                    <span>anumoplastic@gmail.com</span>
                </div>
            </div>

        </div>
    </>
  );
};

export default Main;