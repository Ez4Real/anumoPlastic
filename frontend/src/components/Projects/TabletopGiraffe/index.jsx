

import "./index.css"
import { useTranslation } from 'react-i18next';

import tabletop56x65 from "/assets/images/projects/tabletopGiraffe/tabletop56x65.png"
import tabletop54x55 from "/assets/images/projects/tabletopGiraffe/tabletop54x55.png"
import tabletop54x55_1 from "/assets/images/projects/tabletopGiraffe/tabletop54x55_1.png"


const TabletopGiraffe = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.tabletopGiraffe.title')}<span >/2021</span></p>
        <div className="tabletopGiraffe-container">
            <div className="topLeft-container">
                <div>
                    <img className="topLeftImg"
                         src={tabletop56x65}
                         alt="TABLETOP MOBLE “GIRAFFE”">
                    </img>
                    <p className="projectDescription">{t('ProjectsPage.projects.tabletopGiraffe.option1')}</p>
                </div>
            </div>
            <div className="bottom-container">
                <div className="left">
                    <div>
                        <img src={tabletop54x55_1} alt="TABLETOP MOBLE “GIRAFFE”"></img>
                    </div>
                    <p className="projectDescription p-20-12">{t('ProjectsPage.projects.tabletopGiraffe.option2')}</p>
                    <p className="projectDescription">{t('ProjectsPage.projects.tabletopGiraffe.description')}</p>
                </div>
                <div className="right">
                    <img
                        src={tabletop54x55}
                        alt="TABLETOP MOBLE “GIRAFFE”"
                    ></img>
                </div>
            </div>
        </div>
    </div>

  );
};

export default TabletopGiraffe;