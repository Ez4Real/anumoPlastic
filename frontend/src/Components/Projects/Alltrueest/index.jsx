

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/alltrueest', false, /\.(png|jpe?g|svg)$/));


const Alltrueest = () => {
  const { t } = useTranslation();
  

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.alltrueest.title')}<span >/2021</span></p>
        <div className="alltrueest-container">
          <div className="left">
                <img src={images["alltrueest.png"]} alt="Alltrueest"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.alltrueest.description')}</p>
          </div>
          <div className="right">
            <div>
                <img src={images["alltrueest_1.png"]} alt="Alltrueest"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.alltrueest.from')}</p>
            </div>
            <img src={images["alltrueest_2.png"]} alt="Alltrueest"></img>
          </div>
        </div>
        
    </div>

  );
};

export default Alltrueest;