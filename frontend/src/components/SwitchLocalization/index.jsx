import './index.css'
import { useTranslation } from 'react-i18next';

const SwitchLocalization = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const lng = i18n.language === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(lng);
  };


  return (
    <div className='languageCurrency-container' onClick={toggleLanguage}>
      <div className='language'>{t('Footer.lang')}</div>
      <div className='currency'>{t('Footer.currency')}</div>
    </div>
  );
};

export default SwitchLocalization;