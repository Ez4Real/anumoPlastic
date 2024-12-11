

import "./index.css"
import { useTranslation } from 'react-i18next';

import hypermobile from "/assets/images/projects/hypermobile/hypermobile.png"
import hypermobile_1 from "/assets/images/projects/hypermobile/hypermobile_1.png"
import hypermobile_2 from "/assets/images/projects/hypermobile/hypermobile_2.png"
import hypermobile_3 from "/assets/images/projects/hypermobile/hypermobile_3.png"
import hypermobile_4 from "/assets/images/projects/hypermobile/hypermobile_4.png"


const Hypermobile = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.hypermobile.title')}<span >/2024</span></p>
        <div className="hypermobile-container">
          <div className="left">
            <img src={hypermobile} alt="Hypermobile"></img>
            <img src={hypermobile_1} alt="Hypermobile"></img>
            <img src={hypermobile_3} alt="Hypermobile"></img>
          </div>
          <div className="right">
            <img src={hypermobile_2} alt="Hypermobile"></img>
            <img src={hypermobile_4} alt="Hypermobile"></img>
          </div>
        </div>
        <p className="projectDescription">{t('ProjectsPage.projects.hypermobile.description')}</p>
    </div>

  );
};

export default Hypermobile;