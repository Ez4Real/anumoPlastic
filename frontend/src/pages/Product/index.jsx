import './index.css'
import { useTranslation } from 'react-i18next';

import prod1 from "/assets/productImages/prod1.png"
import prod1_1 from "/assets/productImages/prod1_1.png"
import prod1_2 from "/assets/productImages/prod1_2.png"
import prod1_3 from "/assets/productImages/prod1_3.png"
import prod1_4 from "/assets/productImages/prod1_4.png"


const Product = () => {
  const { t } = useTranslation();

  return (
    <div className='content'>
        <p className='pathLink'>
            <span className='homeLink'>/HOME/</span>
            <span className='pageName'>Carabiners</span>
        </p>
        <div className='product-container'>
          <div className='left'>
            <img src={prod1_1} alt='Carabiner'></img>
            <img src={prod1_2} alt='Carabiner'></img>
            <img src={prod1_3} alt='Carabiner'></img>
            <img src={prod1_4} alt='Carabiner'></img>
          </div>
          <div className='middle'>
            <img src={prod1} alt='Carabiner'></img>
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
                    <img src={"/assets/icons/shuriken.svg"}></img>
                    <img src={"/assets/icons/bunny.svg"}></img>
                    <img src={"/assets/icons/heart.svg"}></img>
                    <img src={"/assets/icons/spikelet.svg"}></img>
                </div>
            </div>
            <div className='size'>
              <div className='block-title'>Size:</div>
              <div className='sizeContent'>75x55x6mm, 75x65x6mm</div>
            </div>
            <div className='weight'>
              <div className='block-title'>Weight:</div>
              <div className='sizeContent'>2.4 kg/ 5.3 lbs</div>
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