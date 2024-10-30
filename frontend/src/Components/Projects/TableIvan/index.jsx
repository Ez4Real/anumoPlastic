

import "./index.css"
import { useTranslation } from 'react-i18next';
import { importAll } from "../../../utils/importRecources";

const images = importAll(require.context('../../../assets/images/projects/tableIvan', false, /\.(png|jpe?g|svg)$/));


const TableIvan = () => {
  const { t } = useTranslation();
  

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
        <p className="projectDescription bottom">{t('ProjectsPage.projects.tableIvan.description_1')}</p>
    </div>

  );
};

export default TableIvan;