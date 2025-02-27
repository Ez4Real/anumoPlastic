import { useTranslation } from "react-i18next"

import {
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
import glassesAndNecklace from "/assets/images/projects/glasses&necklace/glasses&necklace.png"
import glassesAndNecklace_1 from "/assets/images/projects/glasses&necklace/glasses&necklace_1.png"
import glassesAndNecklace_2 from "/assets/images/projects/glasses&necklace/glasses&necklace_2.png"

const GlassesAndNecklace = () => {
  const { t } = useTranslation()

  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["20px", "46px"]}>
        {t("ProjectsPage.projects.glasses&Necklace.title")}
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
      <Grid templateColumns="1fr 1fr" gap={gridGap}>
        <GridItem order={[2, 0]} colSpan={[2, 1]}>
          <Image src={glassesAndNecklace} alt="Glasses And Necklace" />
        </GridItem>
        <GridItem order={[0, 1]} rowSpan={2}>
          <Image src={glassesAndNecklace_2} alt="Glasses And Necklace" />
        </GridItem>
        <GridItem order={[1, 2]} rowSpan={2}>
          <Image src={glassesAndNecklace_1} alt="Glasses And Necklace" />
        </GridItem>
        <GridItem order={3} colSpan={[2, 1]}>
          <Text fontSize={["12px", "16px"]}>
            {t("ProjectsPage.projects.glasses&Necklace.description")}
          </Text>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default GlassesAndNecklace
