

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/trays', false, /\.(png|jpe?g|svg)$/));


const Trays = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.trays.title')}<span >/2021</span></p>
        <div className="trays-container">
            <div className="row">
                <div><img src={images["trays_3.png"]} alt="Tray"></img></div>
                <div><img src={images["trays.png"]} alt="Tray"></img></div>
                <div></div>
            </div>
            <div className="row">
                <p className="projectDescription">{t('ProjectsPage.projects.trays.description')}</p>
                <div><img src={images["trays_1.png"]} alt="Tray"></img></div>
                <div><img src={images["trays_2.png"]} alt="Tray"></img></div>
            </div>
        </div>
    </div>

  );
};

export default Trays;