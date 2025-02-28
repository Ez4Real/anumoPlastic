import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import "./index.css"

const BreadCrumb = ({ pageName }) => {
  const { t } = useTranslation()

  return (
    <Breadcrumb
      sx={{ ol: { p: 0, m: 0 } }}
      fontSize="1rem"
      pb={["24px", "46px"]}
    >
      <BreadcrumbItem sx={{ span: { ml: 0, mr: ".25rem", fontWeight: "800" } }}>
        <BreadcrumbLink
          className="homeLink"
          href="/"
          textDecoration="initial !important"
        >
          /HOME
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          className="pageName"
          textDecoration="initial !important"
        >
          {pageName}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadCrumb
