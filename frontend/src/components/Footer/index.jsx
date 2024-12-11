import './index.css'
import SwitchLocalization from '../SwitchLocalization';
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
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
              <Link
                className='Link'
                as={RouterLink}
                to="https://www.instagram.com/anumoplastic"
                isExternal
              ><span>INSTAGRAM</span></Link>
              <Link
                className='Link'
                as={RouterLink}
                to="https://www.tiktok.com/@anumoplastic"
                isExternal
              ><span>TIKTOK</span></Link>
            </div>
        </div>
    </footer>
  );
};

export default Footer;