

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/hypermobile', false, /\.(png|jpe?g|svg)$/));


const Hypermobile = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.hypermobile.title')}<span >/2024</span></p>
        <div className="hypermobile-container">
          <div className="left">
            <img src={images["hypermobile.png"]} alt="Hypermobile"></img>
            <img src={images["hypermobile_1.png"]} alt="Hypermobile"></img>
            <img src={images["hypermobile_3.png"]} alt="Hypermobile"></img>
          </div>
          <div className="right">
            <img src={images["hypermobile_2.png"]} alt="Hypermobile"></img>
            <img src={images["hypermobile_4.png"]} alt="Hypermobile"></img>
          </div>
        </div>
        <p className="projectDescription">{t('ProjectsPage.projects.hypermobile.description')}</p>
    </div>

  );
};

export default Hypermobile;