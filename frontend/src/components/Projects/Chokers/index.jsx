

import "./index.css"
import { useTranslation } from 'react-i18next';

import chokers from "/assets/images/projects/chokers/chokers.png"
import chokers_1 from "/assets/images/projects/chokers/chokers_1.png"
import chokers_2 from "/assets/images/projects/chokers/chokers_2.png"


const Chokers = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.chokers.title')}<span >/2021</span></p>
        <div className="chokers-container">
            <div className="left">
                <img src={chokers} alt="Choker"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.chokers.description')}</p>
            </div>
            <div className="right">
                <img src={chokers_1} alt="Choker"></img>
                <img src={chokers_2} alt="Choker"></img>
            </div>
        </div>
    </div>

  );
};

export default Chokers;