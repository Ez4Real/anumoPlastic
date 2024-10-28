import SwitchLocalization from '../SwitchLocalization';
import './index.css'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
        <div className='footer-container'>
            <div className='footerLogo-container'>
                <img src='/footer-logo-black.svg' alt='Anumo Logo Black'></img>
            </div>
            <div className='footerContent-container'>
                <div className='signUp-container'>
                    <p>{t('Footer.newsletter')}</p>
                    <input type="email" placeholder={t('Footer.emailPlaceholder')}></input>
                </div>
                <div className='linksLocalization-container'>
                    <div className='footerLinks-container'>
                        <ul>
                            <li>{t('Footer.privacyPolicyLink')}</li>
                            <li>{t('Footer.paymentDeliveryLink')}</li>
                            <li>{t('Footer.returnsLink')}</li>
                        </ul>
                    </div>
                    <SwitchLocalization/>
                </div>
            </div>
            <div className='socialLinks'>
                <span>INSTAGRAM</span>
                <span>TIKTOK</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;