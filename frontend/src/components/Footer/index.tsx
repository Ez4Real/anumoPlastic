import SwitchLocalization from '../SwitchLocalization';
import { Box, Container, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, Link, List, ListItem, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Container
      as="footer"
      p={["180px 24px 80px", "90px 46px"]}
      
    >
      <Grid
        display={["flex", "grid"]}
        flexDirection={["column", "row"]}
        templateColumns="50% 50%"
      >
        <GridItem
          display={["flex", "block"]}
          flexDirection={["column-reverse", "row"]}
        >
          <Box
            mt={["48px", 0]}
            mb="48px"
          >
            <Image
              src='/footer-logo-black.svg'
              alt='Anumo Logo Black'
            ></Image>
          </Box>
          <Box>
          <FormControl>
            <FormLabel
              fontSize="14px"
              fontWeight="400"
              m={0}
              mb={-2}
            >{t('Footer.newsletter')}
            </FormLabel>
            <Input
              type="email"
              border="none"
              borderBottom="1px solid black"
              placeholder={t('Footer.emailPlaceholder')}
              fontSize="12px"
              h="auto"
              w={["100%", "75%"]}
              p=".5rem 0"
            />
          </FormControl>
          </Box>
          
        </GridItem>
        <GridItem
          display="flex"
          alignItems="end"
        >
          <Flex
            w="100%"
            justifyContent="space-between"
            mt={[0, "72px"]}
            mb={["36px", "1rem"]}
          >
            <List
              spacing=".5rem"
              fontWeight="500"
              fontSize="16px"
              textDecoration="underline"
              m={0}
            >
              <ListItem>{t('Footer.privacyPolicyLink')}</ListItem>
              <ListItem>{t('Footer.paymentDeliveryLink')}</ListItem>
              <ListItem>{t('Footer.returnsLink')}</ListItem>
            </List>
            { !isMobile && <SwitchLocalization />}
          </Flex>
        </GridItem>
      </Grid>
      <Flex justifyContent={["space-between", "flex-start"]}>
        <Flex
          fontWeight="500"
          fontSize="16px"
          flexDirection={["column", "row"]}
          gap={["12px", "22px"]}
        >
          <Link
              className='Link'
              as={RouterLink}
              to="https://www.instagram.com/anumoplastic"
              isExternal
            ><span>INSTAGRAM</span></Link>
            <Link
              className='Link'
              as={RouterLink}
              to="https://www.tiktok.com/@anumoplastic"
              isExternal
            ><span>TIKTOK</span></Link>
        </Flex>
        { isMobile && <SwitchLocalization />}
      </Flex>
    </Container>


  );
};

export default Footer;