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
import chokers from "/assets/images/projects/chokers/chokers.png"
import chokers_1 from "/assets/images/projects/chokers/chokers_1.png"
import chokers_2 from "/assets/images/projects/chokers/chokers_2.png"
import chokers_2Mb from "/assets/images/projects/chokers/chokers_2Mb.png"

const Chokers = () => {
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })
  const chocker2Img = useBreakpointValue({ base: chokers_2Mb, sm: chokers_2 })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.chokers.title")}
        <Badge
          position="relative"
          top={["-1px", "-.25rem"]}
          pl={[".25rem", ".375rem"]}
          fontWeight={["700", "600"]}
          fontSize={["14px", "24px"]}
          bg="transparent"
          color="black"
        >
          /2021
        </Badge>
      </Heading>
      <Grid
        display={["flex", "grid"]}
        flexDirection={["column", "row"]}
        templateColumns={["none", "1.1fr 1fr"]}
        gap={gridGap}
      >
        <Flex
          direction={["row", "column"]}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <AspectRatio ratio={[226 / 287, 465 / 590]} w="100%">
            <Image
              src={chokers}
              alt="Choker"
              objectFit='cover'
            />
          </AspectRatio>  
          {!isMobile && (
            <Text fontSize="16px">
              {t("ProjectsPage.projects.chokers.description")}
            </Text>
          )}
        </Flex>
        <Flex direction={["row-reverse", "column"]} gap={gridGap}>
          <AspectRatio
            ratio={[105 / 125, 420 / 500]}
            w="100%"
          >
            <Image
              src={chokers_1}
              alt="Choker"
              objectFit='cover'
            />
          </AspectRatio>  
          <AspectRatio
            ratio={[105 / 125, 420 / 350]}
            w="100%"
          >
            <Image
              src={chocker2Img}
              alt="Choker"
              objectFit='cover'
            />
          </AspectRatio>
        </Flex>
      </Grid>
      {isMobile && (
        <Text fontSize="12px" mt="16px">
          {t("ProjectsPage.projects.chokers.description")}
        </Text>
      )}
    </Container>
  )
}

export default Chokers
