
import { useTranslation } from 'react-i18next';

import alltrueest from "/assets/images/projects/alltrueest/alltrueest.png"
import alltrueest_1 from "/assets/images/projects/alltrueest/alltrueest_1.png"
import alltrueest_2 from "/assets/images/projects/alltrueest/alltrueest_2.png"
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
  useBreakpointValue
} from "@chakra-ui/react";


const Alltrueest = () => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" });
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" });


  return (
      <Container px="0">
        <Heading
          fontWeight="700"
          fontSize={titleFontSize}
          mb={["20px", "46px"]}
        >{t('ProjectsPage.projects.alltrueest.title')}
          <Badge
            position="relative"
            top={["-1px", "-.25rem"]}
            pl={[".25rem", ".375rem"]}
            fontWeight={["700", "600"]}
            fontSize={["14px", "24px"]}
            colorScheme="transparent"
          >/2021</Badge>
        </Heading>

        <Grid
          templateColumns={["1fr 1fr", "36% 60%"]}
          gap={gridGap}
        >
          <GridItem rowSpan={[1, 2]}>
            <Image
              src={alltrueest}
              alt="Alltrueest"
            ></Image>
          </GridItem>
          <Flex gap="24px">
            <Box flex={1}>
              <Image
                src={alltrueest_1}
                alt="Alltrueest"
              ></Image>
            </Box>
            { !isMobile && (<Text
              fontSize={["12px", "16px"]}
              flex={1}
              alignContent="end"
            >
              {t('ProjectsPage.projects.alltrueest.from')}
            </Text>)}
          </Flex>
          <GridItem
            rowSpan={[1, 2]}
            colSpan={[2, 1]}
          >
            <Image
              src={alltrueest_2}
              alt="Alltrueest"
            ></Image>
          </GridItem>
          <GridItem
            colSpan={[2, 1]}
            alignContent="end"
          >
            <Text
              fontSize={["12px", "16px"]}
            >{t('ProjectsPage.projects.alltrueest.description')}
            </Text>
            { isMobile && (<Text
              fontSize={["12px", "16px"]}
              flex={1}
              alignContent="end"
            >
              {t('ProjectsPage.projects.alltrueest.from')}
            </Text>)}
          </GridItem>
        </Grid>
      </Container>
  );
};

export default Alltrueest;