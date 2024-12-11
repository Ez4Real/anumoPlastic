

import "./index.css"
import { useTranslation } from 'react-i18next';

import trays from "/assets/images/projects/trays/trays.png"
import trays_1 from "/assets/images/projects/trays/trays_1.png"
import trays_2 from "/assets/images/projects/trays/trays_2.png"
import trays_3 from "/assets/images/projects/trays/trays_3.png"


const Trays = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
      <p className='projectTitle'>{t('ProjectsPage.projects.trays.title')}<span >/2021</span></p>
      <div className="trays-container">
        <div className="row">
          <div><img src={trays_3} alt="Tray"></img></div>
          <div><img src={trays} alt="Tray"></img></div>
          <div></div>
        </div>
        <div className="row">
          <p className="projectDescription">{t('ProjectsPage.projects.trays.description')}</p>
          <div><img src={trays_1} alt="Tray"></img></div>
          <div><img src={trays_2} alt="Tray"></img></div>
        </div>
      </div>
    </div>

  );
};

export default Trays;