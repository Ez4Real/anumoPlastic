import React from 'react';
import { useTranslation } from 'react-i18next';

const SwitchLocalization = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ua')}>Ukrainian</button>
    </div>
  );
};

export default SwitchLocalization;