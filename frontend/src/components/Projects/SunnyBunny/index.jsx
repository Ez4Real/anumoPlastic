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
import sunnyBunnyImage from "/assets/images/projects/sunnyBunnyAward/image.png"

const SunnyBunny = () => {
  const { t } = useTranslation()

  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.sunnyBunny.title")}
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
      <Grid
        display={["flex", "grid"]}
        flexDirection={["column-reverse", "row"]}
        templateColumns="1fr 2fr 1fr"
        gap={["16px", "2.75rem"]}
      >
        <GridItem alignContent="end">
          <Text fontSize={["14px", "16px"]}>
            {t("ProjectsPage.projects.sunnyBunny.description")}
          </Text>
        </GridItem>
        <GridItem>
          <Box>
            <Image src={sunnyBunnyImage} alt="Sunny Bunny Award" />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default SunnyBunny
