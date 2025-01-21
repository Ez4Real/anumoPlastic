import './index.css'
import { useTranslation } from 'react-i18next';

interface SwitchLocalizationProps {
  containerWidth?: string;
  separatorLineColor?: string;
  fontSize?: string;
}

const SwitchLocalization = ({
  containerWidth="unset",
  separatorLineColor='black',
  fontSize='16px'
 }: SwitchLocalizationProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const lng = i18n.language === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className='languageCurrency-container'
      onClick={toggleLanguage}
      style={{
        width: containerWidth,
        fontSize: fontSize,
      }}
    >
      <div
        className='language'
        style={{ borderColor: separatorLineColor }}
      >
        {t('Footer.lang')}
      </div>
      <div className='currency'>{t('Footer.currency')}</div>
    </div>
  );
};

export default SwitchLocalization;