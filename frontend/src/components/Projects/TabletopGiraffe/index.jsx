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
import tabletop54x55 from "/assets/images/projects/tabletopGiraffe/tabletop54x55.png"
import tabletop54x55_1 from "/assets/images/projects/tabletopGiraffe/tabletop54x55_1.png"
import tabletop56x65 from "/assets/images/projects/tabletopGiraffe/tabletop56x65.png"

const BottomDescription = () => {
  const { t } = useTranslation()
  return (
    <Flex
      direction="column"
      fontSize={["14px", "16px"]}
      alignContent="end"
      mt="20px"
      gap="12px"
    >
      <Text>{t("ProjectsPage.projects.tabletopGiraffe.option2")}</Text>
      <Text>{t("ProjectsPage.projects.tabletopGiraffe.description")}</Text>
    </Flex>
  )
}

const TabletopGiraffe = () => {
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.tabletopGiraffe.title")}
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
      <Box>
        <Grid templateColumns={["70%", "30%", "1fr 1fr"]}>
          <GridItem>
            <AspectRatio ratio={[120 / 131, 465 / 508]}>
              <Image
                src={tabletop56x65}
                alt="TABLETOP MOBLE “GIRAFFE”"
                objectFit='cover'
              />
            </AspectRatio>
          </GridItem>
          <GridItem />
        </Grid>
        <Text fontSize={["14px", "16px"]} alignContent="end" mt="20px">
          {t("ProjectsPage.projects.tabletopGiraffe.option1")}
        </Text>
        <Grid
          templateColumns={["1fr 1fr", ".9fr 1fr"]}
          gap={["16px", "46px"]}
          justifyItems="end"
          mt={["24px", "46px"]}
        >
          <GridItem w={["100%", "60%"]}>
            <AspectRatio
              ratio={[10 / 13, 256 / 307]}
              h={["100%", "auto"]}
            >
              <Image
                src={tabletop54x55_1}
                alt="TABLETOP MOBLE “GIRAFFE”"
                objectFit='cover'
              />
            </AspectRatio>
            {!isMobile && <BottomDescription />}
          </GridItem>
          <GridItem w="100%">
            <AspectRatio
              ratio={[10 / 13, 231 / 278]}
            >
              <Image
                src={tabletop54x55}
                alt="TABLETOP MOBLE “GIRAFFE”"
                objectFit='cover'
              />
            </AspectRatio>
          </GridItem>
        </Grid>
        {isMobile && <BottomDescription />}
      </Box>
    </Container>
  )
}

export default TabletopGiraffe
