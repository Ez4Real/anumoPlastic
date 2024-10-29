

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";


const images = importAll(require.context('../../../assets/images/projects/tabletopGiraffe', false, /\.(png|jpe?g|svg)$/));


const TabletopGiraffe = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.tabletopGiraffe.title')}<span >/2021</span></p>
        <div className="tabletopGiraffe-container">
            <div className="topLeft-container">
                <div>
                    <img className="topLeftImg" src={images["tabletop56x65.png"]}></img>
                    <p className="projectDescription">{t('ProjectsPage.projects.tabletopGiraffe.option1')}</p>
                </div>
            </div>
            <div className="bottom-container">
                <div className="left">
                    <div>
                        <img src={images["tabletop54x55_1.png"]}></img>
                    </div>
                    <p className="projectDescription p-20-12">{t('ProjectsPage.projects.tabletopGiraffe.option2')}</p>
                    <p className="projectDescription">{t('ProjectsPage.projects.tabletopGiraffe.description')}</p>
                </div>
                <div className="right"><img src={images["tabletop54x55.png"]}></img></div>
            </div>
        </div>
    </div>

  );
};

export default TabletopGiraffe;