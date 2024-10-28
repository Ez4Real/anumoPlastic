import { useTranslation } from 'react-i18next';

const Cooperation = () => {
  const { t } = useTranslation();

  return (
    <div className='cooperationBlock'>
        <h3 className='blockTitle'>{t('HomePage.cooperation')}</h3>
        <div className='emailContainer'>
            <span>anumoplastic@gmail.com</span>
        </div>
    </div>
  );
};

export default Cooperation;