import React, { useState } from 'react';
import "./index.css"
import { useTranslation } from 'react-i18next';
import Cooperation from '../../components/Cooperation';
// import SunnyBunny from '../../components/Projects/SunnyBunny';
// import UkrainianCeramics from '../../Components/Projects/UkrainianCeramics';
// import TabletopGiraffe from '../../Components/Projects/TabletopGiraffe';
// import Chokers from '../../Components/Projects/Chokers';
// import Trays from '../../Components/Projects/Trays';
// import CoffeeTables from '../../Components/Projects/CoffeeTables';
// import SoapHolders from '../../Components/Projects/SoapHolders';
// import Hypermobile from '../../Components/Projects/Hypermobile';
// import WelcomeBoards from '../../Components/Projects/WelcomeBoards';
// import Alltrueest from '../../Components/Projects/Alltrueest';
// import TableIvan from '../../Components/Projects/TableIvan';
// import GlassesAndNecklace from '../../Components/Projects/Glasses&Necklace';

import { 
  SunnyBunny, 
  UkrainianCeramics, 
  TabletopGiraffe, 
  Chokers, 
  Trays, 
  CoffeeTables, 
  SoapHolders, 
  Hypermobile, 
  WelcomeBoards, 
  Alltrueest, 
  TableIvan, 
  GlassesAndNecklace 
} from '../../components/Projects';

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const { t } = useTranslation();

  const projects = [
    <SunnyBunny />, <UkrainianCeramics/>, <TabletopGiraffe />,
    <Chokers />, <Trays/>, <CoffeeTables/>,
    <SoapHolders/>, <Hypermobile/>, <WelcomeBoards />,
    <Alltrueest />, <GlassesAndNecklace />, <TableIvan/>
  ];

  const changeProject = (direction) => {
    setCurrentProjectIndex((prevIndex) => 
      (prevIndex + direction + projects.length) % projects.length
    );
    window.scrollTo({ top: 164, behavior: 'smooth' });
  };


  return (
    <div className='content'>
      <p className='pathLink'>
        <span className='homeLink'>/HOME/</span>
        <span className='pageName'>{t('ProjectsPage.pageName')}</span>
      </p>

      <div className="projectsSlider">
        {projects[currentProjectIndex]}
      </div>

      <div className='sliderFooter-container'>
        <div onClick={() => changeProject(-1)}>
          <img src='/arrow-left.svg'></img><span>{t('ProjectsPage.back')}</span>
        </div>
        <div onClick={() => changeProject(1)}>
          <span>{t('ProjectsPage.next')}</span><img src='/arrow-right.svg'></img>
        </div>
      </div>
      <Cooperation />
    </div>
  );
};

export default Projects;