import { Box, Heading } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { OpenAPI } from "../../client"
import "./index.css"

const Cooperation = () => {
  const { t } = useTranslation()

  return (
    <Box className="cooperationBlock">
      <Heading
        className="blockTitle"
        fontSize={["42px", "48px"]}
        lineHeight={["51px", "58px"]}
      >
        {t("HomePage.cooperation")}?
      </Heading>
      <div className="emailContainer">
        <span>{OpenAPI.ANUMO_EMAIL}</span>
      </div>
    </Box>
  )
}

export default Cooperation
