import "./index.css"
import { useTranslation } from 'react-i18next';

import coffeeTables from "/assets/images/projects/coffeeTables/coffeeTables.png"
import coffeeTables_1 from "/assets/images/projects/coffeeTables/coffeeTables_1.png"
import coffeeTables_2 from "/assets/images/projects/coffeeTables/coffeeTables_2.png"


const CoffeeTables = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.coffeeTables.title')}<span >/2021</span></p>
        <div className="coffeeTables-container">
          <div><img src={coffeeTables} alt="Coffee Table"></img></div>
          <div><img src={coffeeTables_1} alt="Coffee Table"></img></div>
          <div className="leftBottom">
            <div></div>
            <img src={coffeeTables_2} alt="Coffee Table"></img>
          </div>
          <p className="projectDescription">{t('ProjectsPage.projects.coffeeTables.description')}</p>
        </div>
    </div>

  );
};

export default CoffeeTables;