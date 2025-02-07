import SwitchLocalization from '../SwitchLocalization';
import { Box, Container, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, Link, List, ListItem } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container as="footer" p="90px 46px">
      <Grid templateColumns="50% 50%">
        <GridItem>
          <Box mb="48px">
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
            >{t('Footer.newsletter')}
            </FormLabel>
            <Input
              type="email"
              border="none"
              borderBottom="1px solid black"
              placeholder={t('Footer.emailPlaceholder')}
              fontSize="12px"
              h="auto"
              w="75%"
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
            mt="72px"
            mb="1rem"
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
            <SwitchLocalization />
          </Flex>
        </GridItem>
      </Grid>
      <Flex
        fontWeight="500"
        fontSize="16px"
        gap="22px"
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
    </Container>


  );
};

export default Footer;