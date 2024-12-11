import { Link } from 'react-router-dom';
import './index.css'
import { useTranslation } from 'react-i18next';

const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <div className='content'>
        <div className='thankYou-container'>
            <p className='title'>{t('ThankYou.title')}!</p>
            <p className='info'>{t('ThankYou.info')}</p>
            <p className='mainPageLink'>
                <Link to="/">{t('ThankYou.mainPageLink')}</Link>
            </p>
        </div>
    </div>
  );
};

export default ThankYou;