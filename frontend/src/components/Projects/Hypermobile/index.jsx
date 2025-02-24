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
import hypermobile from "/assets/images/projects/hypermobile/hypermobile.png"
import hypermobile_1 from "/assets/images/projects/hypermobile/hypermobile_1.png"
import hypermobile_2 from "/assets/images/projects/hypermobile/hypermobile_2.png"
import hypermobile_3 from "/assets/images/projects/hypermobile/hypermobile_3.png"
import hypermobile_4 from "/assets/images/projects/hypermobile/hypermobile_4.png"

const GridItemImg = ({ imgSrc, order = 1, rowSpan = 1 }) => {
  return (
    <GridItem order={order} rowSpan={rowSpan}>
      <Image src={imgSrc} alt="Hypermobile" h="100%" objectFit="cover" />
    </GridItem>
  )
}

const Hypermobile = () => {
  const { t } = useTranslation()

  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" })
  const gridGap = useBreakpointValue({ base: "16px", sm: "26px" })

  return (
    <Container px="0">
      <Heading fontWeight="700" fontSize={titleFontSize} mb={["20px", "46px"]}>
        {t("ProjectsPage.projects.hypermobile.title")}
        <Badge
          position="relative"
          top={["-1px", "-.25rem"]}
          pl={[".25rem", ".375rem"]}
          fontWeight={["700", "600"]}
          fontSize={["14px", "24px"]}
          colorScheme="transparent"
        >
          /2024
        </Badge>
      </Heading>

      <Grid templateColumns={["1fr", "1fr 1fr"]} gap={gridGap}>
        <GridItemImg imgSrc={hypermobile} order={[4, 0]} />
        <GridItemImg imgSrc={hypermobile_2} order={[0, 1]} rowSpan={[1, 2]} />
        <GridItemImg imgSrc={hypermobile_1} order={[2, 2]} />
        <GridItemImg imgSrc={hypermobile_3} order={[1, 3]} />
        <GridItemImg imgSrc={hypermobile_4} order={[3, 4]} />
        <GridItem order={5}>
          <Text fontSize={["12px", "16px"]}>
            {t("ProjectsPage.projects.hypermobile.description")}
          </Text>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default Hypermobile
