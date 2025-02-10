

import { useTranslation } from 'react-i18next';

import tabletop56x65 from "/assets/images/projects/tabletopGiraffe/tabletop56x65.png"
import tabletop54x55 from "/assets/images/projects/tabletopGiraffe/tabletop54x55.png"
import tabletop54x55_1 from "/assets/images/projects/tabletopGiraffe/tabletop54x55_1.png"
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


const BottomDescription = () => {const { t } = useTranslation(); return (
    <Flex
        direction="column"
        fontSize={["14px", "16px"]}
        alignContent="end"
        mt="20px"
        gap="12px"
        >
        <Text>{t('ProjectsPage.projects.tabletopGiraffe.option2')}</Text>
        <Text>{t('ProjectsPage.projects.tabletopGiraffe.description')}</Text>
    </Flex>
)}

const TabletopGiraffe = () => {
    const { t } = useTranslation();

    const isMobile = useBreakpointValue({ base: true, sm: false });
    const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" });

    return (
        <Container px="0">
            <Heading
                fontWeight="700"
                fontSize={titleFontSize}
                mb={["24px", "46px"]}
            >{t('ProjectsPage.projects.tabletopGiraffe.title')}
                <Badge
                    position="relative"
                    top={["-1px", "-.25rem"]}
                    pl={[".25rem", ".375rem"]}
                    fontWeight={["700", "600"]}
                    fontSize={["14px", "24px"]}
                    colorScheme="transparent"
                >/2021</Badge>
            </Heading>
            <Box>
                <Grid
                  templateColumns={["70%", "30%", "1fr 1fr"]}
                >
                    <GridItem>
                        <Image
                            src={tabletop56x65}
                            alt="TABLETOP MOBLE “GIRAFFE”"
                        ></Image>
                    </GridItem>
                    <GridItem></GridItem>
                </Grid>
                <Text
                    fontSize={["14px", "16px"]}
                    alignContent="end"
                    mt="20px"
                >{t('ProjectsPage.projects.tabletopGiraffe.option1')}</Text>
                <Grid
                    templateColumns="46% 50%"
                    gap={["16px", "46px"]}
                    justifyItems="end"
                    mt={["24px", "46px"]}
                >
                    <GridItem
                      w={["100%", "60%"]}
                    >
                        <Image
                            src={tabletop54x55_1}
                            alt="TABLETOP MOBLE “GIRAFFE”"
                            h={["100%", "auto"]}
                            objectFit="cover"
                        ></Image>
                        {!isMobile && <BottomDescription />}
                        
                    </GridItem>
                    <GridItem>
                        <Image
                            src={tabletop54x55}
                            alt="TABLETOP MOBLE “GIRAFFE”"
                            h="100%"
                            objectFit="cover"
                        >
                        </Image>
                    </GridItem>
                </Grid>
                {isMobile && <BottomDescription />}
            </Box>
        </Container>
    );
};

export default TabletopGiraffe;