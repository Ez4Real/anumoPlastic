import { useTranslation } from "react-i18next"

import coffeeTables from "/assets/images/projects/coffeeTables/coffeeTables.png"
import coffeeTables_1 from "/assets/images/projects/coffeeTables/coffeeTables_1.png"
import coffeeTables_2 from "/assets/images/projects/coffeeTables/coffeeTables_2.png"

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

const CoffeeTables = () => {
  const { t } = useTranslation()

  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["24px", "46px"]}>
        {t("ProjectsPage.projects.coffeeTables.title")}
        <Badge
          position="relative"
          top={["-1px", "-.25rem"]}
          pl={[".25rem", ".375rem"]}
          fontWeight={["700", "600"]}
          fontSize={["14px", "24px"]}
          colorScheme="transparent"
        >
          /2021
        </Badge>
      </Heading>
      <Grid templateColumns={["1fr 1fr", "594px 369px"]} gap={gridGap}>
        <GridItem colSpan={[2, 1]}>
          <Image src={coffeeTables} alt="Coffee Table" />
        </GridItem>
        <GridItem>
          <Image src={coffeeTables_1} alt="Coffee Table" />
        </GridItem>
        <Grid templateColumns={["1fr", "1fr 1fr"]}>
          <GridItem />
          <GridItem>
            <Image src={coffeeTables_2} alt="Coffee Table" />
          </GridItem>
        </Grid>
        <GridItem colSpan={[2, 1]} alignContent="end">
          <Text fontSize={["14px", "16px"]}>
            {t("ProjectsPage.projects.coffeeTables.description")}
          </Text>
        </GridItem>
      </Grid>
    </Container>
  )
}
export default CoffeeTables
