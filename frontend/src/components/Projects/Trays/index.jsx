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
import trays from "/assets/images/projects/trays/trays.png"
import trays_1 from "/assets/images/projects/trays/trays_1.png"
import trays_2 from "/assets/images/projects/trays/trays_2.png"
import trays_3 from "/assets/images/projects/trays/trays_3.png"

const Trays = () => {
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.trays.title")}
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
      <Flex direction="column" gap={gridGap}>
        <Grid
          templateColumns={["1fr 1fr", "1fr 1fr 1fr"]}
          gap={gridGap}
          columnGap={[0, "46px"]}
        >
          <GridItem colSpan={[2, 1]} order={0}>
            <Image src={trays_3} alt="Tray" />
          </GridItem>
          <GridItem order={[2, 1]}>
            <Image src={trays} alt="Tray" />
          </GridItem>
          <GridItem order={[1, 2]} />
        </Grid>

        <Grid
          templateColumns={["1fr 1fr", "1fr 1fr 1fr"]}
          gap={gridGap}
          columnGap={[0, "46px"]}
        >
          <GridItem order={[2, 0]} fontSize="16px" alignContent="end">
            <Text fontSize={["12px", "16px"]} ml={["16px", 0]}>
              {t("ProjectsPage.projects.trays.description")}
            </Text>
          </GridItem>
          <GridItem order={[1, 1]} colSpan={[2, 1]}>
            <Image src={trays_1} alt="Tray" />
          </GridItem>
          <GridItem order={[1, 2]}>
            <Image src={trays_2} alt="Tray" />
          </GridItem>
        </Grid>
      </Flex>
    </Container>
  )
}

export default Trays
