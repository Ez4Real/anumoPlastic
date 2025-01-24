import React, { useState } from 'react';
import "./index.css"
import { useTranslation } from 'react-i18next';
import Cooperation from '../../components/Cooperation';

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
import { customSmoothScroll } from '../../utils';
import BreadCrumb from '../../components/BreadCrumb';

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
    customSmoothScroll(164, 350);
  };


  return (
    <div className='content'>
      <BreadCrumb pageName={t('ProjectsPage.pageName')} />
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