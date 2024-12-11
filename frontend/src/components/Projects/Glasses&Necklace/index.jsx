import "./index.css"
import { useTranslation } from 'react-i18next';

import glassesAndNecklace from "/assets/images/projects/glasses&necklace/glasses&necklace.png"
import glassesAndNecklace_1 from "/assets/images/projects/glasses&necklace/glasses&necklace_1.png"
import glassesAndNecklace_2 from "/assets/images/projects/glasses&necklace/glasses&necklace_2.png"


const GlassesAndNecklace = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.glasses&Necklace.title')}<span >/2021</span></p>
        <div className="glassesAndNecklace-container">
          <div className="left">
            <div><img src={glassesAndNecklace} alt="Glasses And Necklace"></img></div>
            <div><img src={glassesAndNecklace_1} alt="Glasses And Necklace"></img></div>
          </div>
          <div className="right">
            <div><img src={glassesAndNecklace_2} alt="Glasses And Necklace"></img></div>
            <p className="projectDescription">{t('ProjectsPage.projects.glasses&Necklace.description')}</p>
          </div>
        </div>
        
    </div>

  );
};

export default GlassesAndNecklace;