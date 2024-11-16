import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/glasses&necklace', false, /\.(png|jpe?g|svg)$/));


const GlassesAndNecklace = () => {
  const { t } = useTranslation();

  return (
    <div className='projectComponent-container'>
        <p className='projectTitle'>{t('ProjectsPage.projects.glasses&Necklace.title')}<span >/2021</span></p>
        <div className="glassesAndNecklace-container">
          <div className="left">
            <div><img src={images["glasses&necklace.png"]} alt="Glasses And Necklace"></img></div>
            <div><img src={images["glasses&necklace_1.png"]} alt="Glasses And Necklace"></img></div>
          </div>
          <div className="right">
            <div><img src={images["glasses&necklace_2.png"]} alt="Glasses And Necklace"></img></div>
            <p className="projectDescription">{t('ProjectsPage.projects.glasses&Necklace.description')}</p>
          </div>
        </div>
        
    </div>

  );
};

export default GlassesAndNecklace;