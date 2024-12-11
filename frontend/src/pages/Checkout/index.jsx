import './index.css'
import { useTranslation } from 'react-i18next';

import productImage from '/assets/productImages/prod1.png';
import ProductCounter from '../../components/ProductCounter';

const Checkout = () => {
  const { t } = useTranslation();

  return (
    <div className='content'>
        <div className='checkout-container'>
            <div className='left'>
                <form className='checkout-form'>
                    <div className='contact-container'>
                        <p className='title'>{t('Checkout.contactFormTitle')}</p>
                            <div className='nameFields-container form-group'>
                                <div>
                                    <input
                                        className='field'
                                        type='text'
                                        name='firstName'
                                        placeholder={t('Checkout.firstNamePlaceholder')}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        className='field'
                                        type='text'
                                        name='lastName'
                                        placeholder={t('Checkout.lastNamePlaceholder')}
                                        required
                                    />
                                </div>
                            </div>
                                <div className='form-group'>
                                    <input
                                        className='field'
                                        type='email'
                                        name='email'
                                        placeholder={t('Checkout.emailPlaceholder')}
                                        required
                                    />
                                </div>
                            <div className='emailMeCheckbox-container form-group'>
                                <input
                                    className='checkbox'
                                    type="checkbox"
                                    id="emailMe"
                                    name="emailMe"
                                />
                                <label htmlFor="emailMe">{t('Checkout.emailMeCheckbox')}</label>
                            </div>
                            <div>
                                <input
                                    className='field'
                                    type='tel'
                                    name='email'
                                    placeholder={t('Checkout.phonePlaceholder')}
                                    required
                                />
                            </div>
                    </div>
                    <div className='delivery-container'>
                        <p className='title'>{t('Checkout.deliveryFormTitle')}</p>
                        <div className="deliveryOptions-container">                        
                            <label className='option'>
                                <input
                                    className='checkbox'
                                    type="radio"
                                    name="delivery"
                                    value="ukraine"
                                />
                                <span className="circle-checkbox"></span>
                                <div>{t('Checkout.deliveryUkraine')}</div>
                            </label>
                            
                            <label className='option'>
                                <input
                                    className='checkbox'
                                    type="radio"
                                    name="delivery"
                                    value="europe"
                                />
                                <span className="circle-checkbox"></span>
                                <div>{t('Checkout.deliveryEurope')}</div>
                            </label>
                            
                            <label className='option'>
                                <input
                                    className='checkbox'
                                    type="radio"
                                    name="delivery"
                                    value="overseas"
                                />
                                <span className="circle-checkbox"></span>
                                <div>{t('Checkout.deliveryOverseas')}</div>
                            </label>
                        </div>
                    </div>
                    <div className='addComment-container'>
                        <p className='title'>{t('Checkout.orderCommentTitle')}</p>
                        <textarea name='message' required />
                    </div>
                    <div className='payment-container'>
                        <p className='title'>{t('Checkout.paymentTitle')}</p>
                        <label className="option">
                            <input
                                defaultChecked="true"
                                className='checkbox'
                                type="checkbox"
                                name="delivery"
                                value="ukraine"
                            />
                            <span className="circle-checkbox"></span>
                            <div>{t('Checkout.cardPayment')}</div>
                        </label>
                    </div>
                    <div className='placeOrderBtn-container'>
                        <button>
                            {t('Checkout.placeOrder')}
                        </button>
                    </div>
                </form>
            </div>
            <div className='right'>
                <p className='title'>{t('Checkout.orderSummaryTitle')}</p>
                <div className='productCheckout-container'>
                    <div className='image-container'>
                        <img src={productImage} alt='Product' />
                    </div>
                    <div className='info-container'>
                        <p className='productTitle'>CARABINER FOR KEYS WITH HEART SHAPE</p>
                        <p>75x55x6мм, 75x65x6мм</p>
                        <div className='infoFooter-container'>
                            <ProductCounter />
                            <div className='price'>$24</div>
                        </div>
                    </div>
                </div>
                <div className='productCheckoutSummary-container'>
                    <div className='subtotal'>
                        <div>{t('Checkout.orderSubtotal')}</div><div>$24</div>
                    </div>
                    <div className='shipping'>
                        <div>{t('Checkout.orderShipping')}</div><div>$30</div>
                    </div>
                    <div className='total'>
                        <div className='totalTitle'>{t('Checkout.orderTotal')}</div>
                        <div className='currencyAmount'><span>{t('Checkout.checkoutCurrency')}</span><div>$54</div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Checkout;