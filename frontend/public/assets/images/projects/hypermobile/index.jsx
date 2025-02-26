import { useTranslation } from "react-i18next"
import { importAll } from "../../utils/importRecources"
import "./index.css"

const images = importAll(
  require.context(
    "../../assets/images/projects/soapHolders",
    false,
    /\.(png|jpe?g|svg)$/,
  ),
)

const Hypermobile = () => {
  const { t } = useTranslation()

  return (
    <div className="projectComponent-container">
      <p className="projectTitle">
        {t("ProjectsPage.projects.soapHolders.title")}
        <span>/2024</span>
      </p>
      <div className="soapHolders-container">
        <div className="top">
          <img alt="Soap Holder" src={images["soapHolders_1.png"]} />
          <img alt="Soap Holder" src={images["soapHolders.png"]} />
        </div>
        <div className="bottom">
          <img alt="Soap Holder" src={images["soapHolders_2.png"]} />
          <img alt="Soap Holder" src={images["soapHolders_3.png"]} />
        </div>
      </div>
    </div>
  )
}

export default Hypermobile
