
import { useTranslation } from 'react-i18next';

import chokers from "/assets/images/projects/chokers/chokers.png"
import chokers_1 from "/assets/images/projects/chokers/chokers_1.png"
import chokers_2 from "/assets/images/projects/chokers/chokers_2.png"
import chokers_2Mb from "/assets/images/projects/chokers/chokers_2Mb.png"
import { Badge, Box, Container, Flex, Grid, GridItem, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";


const Chokers = () => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" });
  const gridGap = useBreakpointValue({ base: "16px", sm: "46px" });
  const chocker2Img = useBreakpointValue({ base: chokers_2Mb, sm: chokers_2 });

  return (
    <Container px="0">
      <Heading
        fontWeight="700"
        fontSize={titleFontSize}
        mb={["24px", "46px"]}
      >{t('ProjectsPage.projects.chokers.title')}
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
        display={["flex", "grid"]}
        flexDirection={["column", "row"]}
        templateColumns={["none", "50% 46%"]}
        gap={gridGap}
      >
        <Flex
          direction={["row", "column"]}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box><Image src={chokers} alt="Choker"></Image></Box>
          {!isMobile && (
            <Text
              fontSize="16px"
            >{t('ProjectsPage.projects.chokers.description')}</Text>
          )}
        </Flex>
        <Flex
          direction={["row-reverse", "column"]}
          gap={gridGap}
        >
          <Box w="100%">
            <Image
              src={chokers_1}
              alt="Choker"
              h="100%"
              objectFit="cover"
            ></Image></Box>
          <Box w="100%">
            <Image
              src={chocker2Img}
              alt="Choker"
              h="100%"
              objectFit="cover"
            ></Image>
          </Box>
        </Flex>
      </Grid>
      {isMobile && (
        <Text
          fontSize="12px" mt="16px"
        >{t('ProjectsPage.projects.chokers.description')}</Text>
      )}
    </Container>
  );
};

export default Chokers;