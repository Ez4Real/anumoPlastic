

import "./index.css"
import { useTranslation } from 'react-i18next';

import alltrueest from "/assets/images/projects/alltrueest/alltrueest.png"
import alltrueest_1 from "/assets/images/projects/alltrueest/alltrueest_1.png"
import alltrueest_2 from "/assets/images/projects/alltrueest/alltrueest_2.png"

const Alltrueest = () => {
  const { t } = useTranslation();
  

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.alltrueest.title')}<span >/2021</span></p>
        <div className="alltrueest-container">
          <div className="left">
                <img src={alltrueest} alt="Alltrueest"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.alltrueest.description')}</p>
          </div>
          <div className="right">
            <div>
                <img src={alltrueest_1} alt="Alltrueest"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.alltrueest.from')}</p>
            </div>
            <img src={alltrueest_2} alt="Alltrueest"></img>
          </div>
        </div>
        
    </div>

  );
};

export default Alltrueest;