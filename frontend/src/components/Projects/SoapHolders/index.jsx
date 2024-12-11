

import "./index.css"
import { useTranslation } from 'react-i18next';

import soapHolders from "/assets/images/projects/soapHolders/soapHolders.png"
import soapHolders_1 from "/assets/images/projects/soapHolders/soapHolders_1.png"
import soapHolders_2 from "/assets/images/projects/soapHolders/soapHolders_2.png"
import soapHolders_3 from "/assets/images/projects/soapHolders/soapHolders_3.png"


const SoapHolders = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
      <p className='projectTitle'>{t('ProjectsPage.projects.soapHolders.title')}<span>/2024</span></p>
      <div className="soapHolders-container">
        <div className="top">
            <img alt="Soap Holder" src={soapHolders_1}></img>
            <img alt="Soap Holder" src={soapHolders}></img>
        </div>
        <div className="bottom">
            <img alt="Soap Holder" src={soapHolders_2}></img>
            <img alt="Soap Holder" src={soapHolders_3}></img>
        </div>
      </div>
    </div>

  );
};

export default SoapHolders;