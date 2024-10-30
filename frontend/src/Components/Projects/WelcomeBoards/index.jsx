

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/welcomeBoards', false, /\.(png|jpe?g|svg)$/));


const WelcomeBoards = () => {
  const { t } = useTranslation();
  

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.welcomeBoards.title')}<span >/2021</span></p>
        <div className="welcomeBoards-container">
          <div className="left">
            <img src={images["welcomeBoards.png"]} alt="Welcome Boards"></img>
          </div>
          <div className="right">
            <img src={images["welcomeBoards_1.png"]} alt="Welcome Boards"></img>
            <div>
                <img src={images["welcomeBoards_2.png"]} alt="Welcome Boards"></img>
                <p className="projectDescription">{t('ProjectsPage.projects.welcomeBoards.description')}</p>
            </div>
          </div>

          
        </div>
    </div>

  );
};

export default WelcomeBoards;