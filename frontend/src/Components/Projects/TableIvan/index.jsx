

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";
import { useState } from "react";

const images = importAll(require.context('../../../assets/images/projects/tableIvan', false, /\.(png|jpe?g|svg)$/));


const TableIvan = () => {
  const { t, i18n } = useTranslation();

  const [expandDescription, setExpandDescription] = useState(false);
  const description_1 = t('ProjectsPage.projects.tableIvan.description_1');
  const sliceEndNumber = i18n.language === 'en' ? 455 : 478;
  const truncatedDescription = `${description_1.slice(0, sliceEndNumber)} ...`;   

  
  return (
    <div className='projectComponent-container'>
      <p className='projectTitle'>{t('ProjectsPage.projects.tableIvan.title')}<span >/2024</span></p>
      <p className="projectDescription top">{t('ProjectsPage.projects.tableIvan.description')}</p>
      <div className="tableIvan-container">
        <div className="left">
          <img src={images["tableIvan.png"]} alt="Table Ivan"></img>
          <img src={images["tableIvan_1.png"]} alt="Table Ivan"></img>
        </div>
        <div className="right">
          <img src={images["tableIvan_2.png"]} alt="Table Ivan"></img>
          <img src={images["tableIvan_4.png"]} alt="Table Ivan"></img>
          <img src={images["tableIvan_3.png"]} alt="Table Ivan"></img>
          <img src={images["tableIvan_5.png"]} alt="Table Ivan"></img>
        </div>
      </div>
      <p className="projectDescription bottom">
        {expandDescription ? description_1 : truncatedDescription}
      </p>
      {expandDescription && <div className="characteristics-container">
        <p className="title">{t('ProjectsPage.projects.tableIvan.characteristics.title')}:</p>
        <p className="list projectDescription">{t('ProjectsPage.projects.tableIvan.characteristics.list')}</p>
      </div>}

      {!expandDescription &&
        <div
          className="seeAll-container"
          onClick={() => setExpandDescription((prev) => !prev)}
        > {t('ProjectsPage.seeAll')}
        </div>
      }
    </div>

  );
};

export default TableIvan;