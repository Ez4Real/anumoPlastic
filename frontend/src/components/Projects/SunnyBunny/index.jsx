

import "./index.css"
import { useTranslation } from 'react-i18next';

import sunnyBunnyImage from "/assets/images/projects/sunnyBunnyAward/image.png"


const SunnyBunny = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.sunnyBunny.title')}<span >/2024</span></p>
        <div className="sunnyBunny-container">
            <p className="projectDescription">{t('ProjectsPage.projects.sunnyBunny.description')}</p>
            <img src={sunnyBunnyImage} alt="Sunny Bunny Award"></img>
        </div>
    </div>

  );
};

export default SunnyBunny;