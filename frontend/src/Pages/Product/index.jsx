import './index.css'
import { useTranslation } from 'react-i18next';

import { importAll } from "../../utils/importRecources";

const images = importAll(require.context('../../assets/productImages', false, /\.(png|jpe?g|svg)$/));
const icons = importAll(require.context('../../assets/icons', false, /\.(png|jpe?g|svg)$/));


const Product = () => {
  const { t } = useTranslation();
  console.log(images)

  return (
    <div className='content'>
        <p className='pathLink'>
            <span className='homeLink'>/HOME/</span>
            <span className='pageName'>Carabiners</span>
        </p>
        <div className='product-container'>
          <div className='left'>
            <img src={images["prod1_1.png"]} alt='Carabiner'></img>
            <img src={images["prod1_2.png"]} alt='Carabiner'></img>
            <img src={images["prod1_3.png"]} alt='Carabiner'></img>
            <img src={images["prod1_4.png"]} alt='Carabiner'></img>
          </div>
          <div className='middle'>
            <img src={images["prod1.png"]} alt='Carabiner'></img>
          </div>
          <div className='right'>
            <p className='title'>CARABINER FOR KEYS WITH HEART SHAPE</p>
            <div className='material'>
                <div className='block-title'>Material:</div>
                -recycled HDPE plastic<br/>
                -nylon thread<br/>
                -metal ring<br/>
            </div>
            <div className='tag'>
                <div className='block-title'>Tag:</div>
                <div className='tagIconsContainer'>
                    <img src={icons["shuriken.svg"]}></img>
                    <img src={icons["bunny.svg"]}></img>
                    <img src={icons["heart.svg"]}></img>
                    <img src={icons["spikelet.svg"]}></img>
                </div>
            </div>
            <div className='size'>
              <div className='block-title'>Size:</div>
              <div className='sizeContent'>75x55x6mm, 75x65x6mm</div>
            </div>
            <div className='price'>
              <div className='block-title'>Price:</div>
              <div>$24</div>
            </div>
            <div className='addToCartBtn-container'>
              <button>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Product;