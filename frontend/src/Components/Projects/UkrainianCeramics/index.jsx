

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";


const images = importAll(require.context('../../../assets/images/projects/ukrainianCeramics/', false, /\.(png|jpe?g|svg)$/));


const UkrainianCeramics = () => {
  const { t } = useTranslation();


  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.ukrainianCeramics.title')}<span >/2022</span></p>
        <div className="ukrainianCeramics-container">
            <div className="leftColumn">
                <div className="leftImage-container">
                    <img src={images["gorschykX.png"]} alt="Gorschyk X"></img>
                </div>
                <div className="leftImage-container">
                    <img src={images["gorschykH.png"]} alt="Gorschyk H"></img>
                </div>
                <div className="leftImage-container">
                    <img src={images["gorschykH_1.png"]} alt="Gorschyk H"></img>
                </div>
            </div>
            <div className="rightColumn">
                <div className="grid2x2Row">
                    <div><img src={images["gorschykX_1.png"]} alt="Gorschyk X"></img></div>
                    <div><img src={images["gorschykX_2.png"]} alt="Gorschyk X"></img></div>
                </div>
                <div className="grid2x2Row">
                    <div><img src={images["glechyk_1.png"]} alt="Glechyk"></img></div>
                    <div><img src={images["glechyk_2.png"]} alt="Glechyk"></img></div>
                </div>
                <div>
                    <div><img src={images["glechyk.png"]} alt="Glechyk"></img></div>
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