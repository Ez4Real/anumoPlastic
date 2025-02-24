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
import glechyk from "/assets/images/projects/ukrainianCeramics/glechyk.png"
import glechyk_1 from "/assets/images/projects/ukrainianCeramics/glechyk_1.png"
import glechyk_2 from "/assets/images/projects/ukrainianCeramics/glechyk_2.png"
import gorschykH from "/assets/images/projects/ukrainianCeramics/gorschykH.png"
import gorschykH_1 from "/assets/images/projects/ukrainianCeramics/gorschykH_1.png"
import gorschykX from "/assets/images/projects/ukrainianCeramics/gorschykX.png"
import gorschykX_1 from "/assets/images/projects/ukrainianCeramics/gorschykX_1.png"
import gorschykX_2 from "/assets/images/projects/ukrainianCeramics/gorschykX_2.png"

const LeftBlockColumn = () => {
  return (
    <>
      <Box order={[0, 0]}>
        <Image src={gorschykX} alt="Gorschyk X" />
      </Box>
      <Box order={[3, 1]}>
        <Image src={gorschykH} alt="Gorschyk H" />
      </Box>
      <Box
        order={[4, 2]}
        display={["flex", "block"]}
        justifyContent={["flex-end", "flex-start"]}
      >
        <Image width={["50%", "100%"]} src={gorschykH_1} alt="Gorschyk H" />
      </Box>
    </>
  )
}

const RightBlockColumn = ({ gridGap }) => {
  const { t } = useTranslation()
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={gridGap} order={[1, 0]}>
        <Box>
          <Image h="100%" src={gorschykX_1} alt="Gorschyk X" />
        </Box>
        <Box>
          <Image h="100%" src={gorschykX_2} alt="Gorschyk X" />
        </Box>
        <Box>
          <Image h="100%" src={glechyk_1} alt="Glechyk" />
        </Box>
        <Box>
          <Image h="100%" src={glechyk_2} alt="Glechyk" />
        </Box>
      </Grid>
      <Box order={[2, 1]}>
        <Image src={glechyk} alt="Glechyk" />
      </Box>
      <Text fontSize={["12px", "16px"]} order={[5, 2]}>
        {t("ProjectsPage.projects.ukrainianCeramics.description")}
      </Text>
    </>
  )
}

const UkrainianCeramics = () => {
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })
  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.ukrainianCeramics.title")}
        <Badge
          position="relative"
          top="-0.25rem"
          pl="0.375rem"
          fontWeight="600"
          fontSize="24px"
          colorScheme="transparent"
        >
          /2022
        </Badge>
      </Heading>
      <Grid templateColumns={["1fr", ".45fr .55fr"]} gap={gridGap}>
        {isMobile ? (
          <LeftBlockColumn />
        ) : (
          <Flex flexDirection="column" gap={gridGap}>
            <LeftBlockColumn />
          </Flex>
        )}

        {isMobile ? (
          <RightBlockColumn gridGap={gridGap} />
        ) : (
          <Flex flexDirection="column" gap={gridGap}>
            <RightBlockColumn gridGap={gridGap} />
          </Flex>
        )}
      </Grid>
    </Container>
  )
}

export default UkrainianCeramics
