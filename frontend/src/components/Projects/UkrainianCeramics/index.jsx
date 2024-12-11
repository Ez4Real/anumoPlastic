

import "./index.css"
import { useTranslation } from 'react-i18next';

import gorschykX from "/assets/images/projects/ukrainianCeramics/gorschykX.png"
import gorschykH from "/assets/images/projects/ukrainianCeramics/gorschykH.png"
import gorschykH_1 from "/assets/images/projects/ukrainianCeramics/gorschykH_1.png"
import gorschykX_1 from "/assets/images/projects/ukrainianCeramics/gorschykX_1.png"
import gorschykX_2 from "/assets/images/projects/ukrainianCeramics/gorschykX_2.png"
import glechyk_1 from "/assets/images/projects/ukrainianCeramics/glechyk_1.png"
import glechyk_2 from "/assets/images/projects/ukrainianCeramics/glechyk_2.png"
import glechyk from "/assets/images/projects/ukrainianCeramics/glechyk.png"


const UkrainianCeramics = () => {
  const { t } = useTranslation();


  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.ukrainianCeramics.title')}<span >/2022</span></p>
        <div className="ukrainianCeramics-container">
            <div className="leftColumn">
                <div className="leftImage-container">
                    <img src={gorschykX} alt="Gorschyk X"></img>
                </div>
                <div className="leftImage-container">
                    <img src={gorschykH} alt="Gorschyk H"></img>
                </div>
                <div className="leftImage-container">
                    <img src={gorschykH_1} alt="Gorschyk H"></img>
                </div>
            </div>
            <div className="rightColumn">
                <div className="grid2x2Row">
                    <div><img src={gorschykX_1} alt="Gorschyk X"></img></div>
                    <div><img src={gorschykX_2} alt="Gorschyk X"></img></div>
                </div>
                <div className="grid2x2Row">
                    <div><img src={glechyk_1} alt="Glechyk"></img></div>
                    <div><img src={glechyk_2} alt="Glechyk"></img></div>
                </div>
                <div>
                    <div><img src={glechyk} alt="Glechyk"></img></div>
                </div>
                <div className="description-container">
                    <p className="projectDescription">{t('ProjectsPage.projects.ukrainianCeramics.description')}</p>
                </div>
            </div>
            
        </div>
    </div>

  );
};

export default UkrainianCeramics;