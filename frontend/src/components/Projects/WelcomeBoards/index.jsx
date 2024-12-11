

import "./index.css"
import { useTranslation } from 'react-i18next';

import welcomeBoards from "/assets/images/projects/welcomeBoards/welcomeBoards.png"
import welcomeBoards_1 from "/assets/images/projects/welcomeBoards/welcomeBoards_1.png"
import welcomeBoards_2 from "/assets/images/projects/welcomeBoards/welcomeBoards_2.png"


const WelcomeBoards = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
      <p className='projectTitle'>{t('ProjectsPage.projects.welcomeBoards.title')}<span >/2021</span></p>
      <div className="welcomeBoards-container">
        <div className="left">
          <img src={welcomeBoards} alt="Welcome Boards"></img>
        </div>
        <div className="right">
          <img src={welcomeBoards_1} alt="Welcome Boards"></img>
          <div>
            <img src={welcomeBoards_2} alt="Welcome Boards"></img>
            <p className="projectDescription">{t('ProjectsPage.projects.welcomeBoards.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBoards;