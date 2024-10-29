import React, { useState } from 'react';
import "./index.css"
import { useTranslation } from 'react-i18next';
import SunnyBunny from '../../Components/Projects/SunnyBunny';
import Cooperation from '../../Components/Cooperation';
import UkrainianCeramics from '../../Components/Projects/UkrainianCeramics';
import TabletopGiraffe from '../../Components/Projects/TabletopGiraffe';

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const { t } = useTranslation();
  
  const goToNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const projects = [<SunnyBunny />, <UkrainianCeramics/>, <TabletopGiraffe />, ];

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
        <div onClick={goToPreviousProject}>
          <img src='/arrow-left.svg'></img><span>{t('ProjectsPage.back')}</span>
        </div>
        <div onClick={goToNextProject}>
          <span>{t('ProjectsPage.next')}</span><img src='/arrow-right.svg'></img>
        </div>
      </div>

      <Cooperation />
    </div>
  );
};

export default Projects;