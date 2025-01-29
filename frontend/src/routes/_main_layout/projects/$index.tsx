import "./index.css"
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import Cooperation from '../../../components/Cooperation';
import BreadCrumb from '../../../components/BreadCrumb';
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
} from '../../../components/Projects';
import { customSmoothScroll } from '../../../utils';


export const Route = createFileRoute("/_main_layout/projects/$index")({
    component: Projects,
})

function Projects() {
    const { index } = Route.useParams<{ index: string }>();
    const navigate = useNavigate({ from: "/projects" });
    const { t } = useTranslation();

    const projects = useMemo(() => [
        <SunnyBunny />, <UkrainianCeramics />, <TabletopGiraffe />,
        <Chokers />, <Trays />, <CoffeeTables />,
        <SoapHolders />, <Hypermobile />, <WelcomeBoards />,
        <Alltrueest />, <GlassesAndNecklace />, <TableIvan />,
    ], []);

    const initialIndex = Number(index) >= 0 && Number(index) < projects.length ? Number(index) : 0;
    const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(initialIndex);

    useEffect(() => {
      const projectIndex = Number(index);
      if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {
        navigate({
        to: "/projects/$index",
        params: { index: "0" },
        // replace: true,
        });
      } else if (projectIndex !== currentProjectIndex) {
        setCurrentProjectIndex(projectIndex);
      }
    }, [index, navigate, projects.length, currentProjectIndex]);

    const changeProject = (direction: number) => {
      setCurrentProjectIndex((prevIndex) => {
        const newIndex = (prevIndex + direction + projects.length) % projects.length;
        navigate({
        to: '/projects/$index',
        params: { index: String(newIndex) },
        });
        return newIndex;
      });
    customSmoothScroll(200, 600);
    };


    return (
        <div className='content'>
            <BreadCrumb pageName={t('ProjectsPage.pageName')} />
            <div className="projectsSlider" id="projectsSlider">
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