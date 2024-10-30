

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/coffeeTables', false, /\.(png|jpe?g|svg)$/));


const CoffeeTables = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.coffeeTables.title')}<span >/2021</span></p>
        <div className="coffeeTables-container">
          <div><img src={images["coffeeTables.png"]} alt="Coffee Table"></img></div>
          <div><img src={images["coffeeTables_1.png"]} alt="Coffee Table"></img></div>
          <div className="leftBottom">
            <div></div>
            <img src={images["coffeeTables_2.png"]} alt="Coffee Table"></img>
          </div>
          <p className="projectDescription">{t('ProjectsPage.projects.coffeeTables.description')}</p>
        </div>
    </div>

  );
};

export default CoffeeTables;