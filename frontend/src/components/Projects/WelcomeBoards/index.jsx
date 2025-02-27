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
import welcomeBoards from "/assets/images/projects/welcomeBoards/welcomeBoards.png"
import welcomeBoards_1 from "/assets/images/projects/welcomeBoards/welcomeBoards_1.png"
import welcomeBoards_2 from "/assets/images/projects/welcomeBoards/welcomeBoards_2.png"

const WelcomeBoards = () => {
  const { t } = useTranslation()

  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["20px", "46px"]}>
        {t("ProjectsPage.projects.welcomeBoards.title")}
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
      <Grid templateColumns={["1fr 1fr", "46% .5fr .5fr"]} gap={gridGap}>
        <GridItem order={[1, 0]} rowSpan={[1, 2]}>
          <Image
            src={welcomeBoards}
            alt="Hypermobile"
            h={["190px", "100%"]}
            w="100%"
            objectFit="cover"
          />
        </GridItem>
        <GridItem order={[0, 1]} colSpan={2}>
          <Image src={welcomeBoards_1} alt="Hypermobile" />
        </GridItem>
        <GridItem order={2}>
          <Image
            src={welcomeBoards_2}
            alt="Hypermobile"
            h={["190px", "100%"]}
            w="100%"
            objectFit="cover"
          />
        </GridItem>
        <GridItem order={2} alignContent="end" colSpan={[2, 1]}>
          <Text fontSize={["12px", "16px"]}>
            {t("ProjectsPage.projects.welcomeBoards.description")}
          </Text>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default WelcomeBoards
