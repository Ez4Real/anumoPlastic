

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";


const images = importAll(require.context('../../../assets/images/projects/chokers', false, /\.(png|jpe?g|svg)$/));


const Chokers = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.chokers.title')}<span >/2021</span></p>
        <div className="chokers-container">
            <div className="left">
                <img src={images["chokers.png"]} alt="Choker"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.chokers.description')}</p>
            </div>
            <div className="right">
                <img src={images["chokers_1.png"]} alt="Choker"></img>
                <img src={images["chokers_2.png"]} alt="Choker"></img>
            </div>
        </div>
    </div>

  );
};

export default Chokers;