import { useTranslation } from "react-i18next"

import {
  AspectRatio,
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import soapHolders from "/assets/images/projects/soapHolders/soapHolders.png"
import soapHolders_1 from "/assets/images/projects/soapHolders/soapHolders_1.png"
import soapHolders_2 from "/assets/images/projects/soapHolders/soapHolders_2.png"
import soapHolders_3 from "/assets/images/projects/soapHolders/soapHolders_3.png"

const ElementRowBlock = ({
  soapHolderImg1,
  soapHolderImg2,
  img1AspectRatio,
  img2AspectRatio,
  topColumnSpan = 1,
  bottomColumnSpan = 1,
}) => (
  <>
    <GridItem colSpan={topColumnSpan}>
      <AspectRatio ratio={img1AspectRatio} h="100%">
        <Image
          src={soapHolderImg1}
          alt="Soap Holder"
          objectFit='cover'
        />
      </AspectRatio>  
    </GridItem>
    <GridItem colSpan={bottomColumnSpan}>
      <AspectRatio ratio={img2AspectRatio} h="100%">
        <Image
          src={soapHolderImg2}
          alt="Soap Holder"
          objectFit='cover'
        />
      </AspectRatio>  
    </GridItem>
  </>
)

const SoapHolders = () => {
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.soapHolders.title")}
        <Badge
          position="relative"
          top={["-1px", "-.25rem"]}
          pl={[".25rem", ".375rem"]}
          fontWeight={["700", "600"]}
          fontSize={["14px", "24px"]}
          bg="transparent"
          color="black"
        >
          /2024
        </Badge>
      </Heading>
      {isMobile ? (
        <Grid templateColumns="1fr 1fr" gap="16px">
          <ElementRowBlock
            soapHolderImg1={soapHolders_3}
            soapHolderImg2={soapHolders_2}
            topColumnSpan={2}
            img1AspectRatio={342 / 243}
            img2AspectRatio={163 / 215}
          />
          <ElementRowBlock
            soapHolderImg1={soapHolders}
            soapHolderImg2={soapHolders_1}
            bottomColumnSpan={2}
            img1AspectRatio={163 / 215}
            img2AspectRatio={342 / 277}
          />
        </Grid>
      ) : (
        <Flex direction="column" gap="46px">
          <Grid
            gridTemplateColumns="283px 600px"
            gap="46px"
            justifyContent="end"
          >
            <ElementRowBlock
              soapHolderImg1={soapHolders_2}
              soapHolderImg2={soapHolders_3}
              img1AspectRatio={283 / 426}
              img2AspectRatio={600 / 425}
            />
          </Grid>
          <Grid gridTemplateColumns="415px 320px" gap="46px">
            <ElementRowBlock
              soapHolderImg1={soapHolders_1}
              soapHolderImg2={soapHolders}
              img1AspectRatio={415 /336}
              img2AspectRatio={20 / 21}
            />
          </Grid>
        </Flex>
      )}
    </Container>
  )
}

export default SoapHolders
