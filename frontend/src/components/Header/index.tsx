import { useCallback } from 'react';
import './index.css'
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Grid, GridItem, Image, Link, ListItem, Text, UnorderedList, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next';
import SwitchLocalization from '../SwitchLocalization';
import ProductCounter from '../../components/ProductCounter'


// Заглушка!!!
import productImage from '/assets/productImages/prod1.png';


const Header = ({ isWhiteTheme = false }) => {
  const { t } = useTranslation();
  const { isOpen: isMenuOpen, onToggle: toggleMenu, onClose: closeMenu } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: openCart, onToggle: toggleCart, onClose: closeCart } = useDisclosure();
  const logoSrc = isWhiteTheme ? '/logo.svg' : '/logo-black.svg'
  const menuIconSrc = isWhiteTheme ? '/menu-burger.svg' : '/menu-burger-black.svg'
  const cartIconSrc = isWhiteTheme ? '/shopping-bag.svg' : '/shopping-bag-black.svg'
  
  const handleCloseMenu = useCallback(() => {
    closeMenu();
    closeCart();
  }, [toggleMenu]);

  return (
    <>
      <Box
        as="header"
        p="48px 46px"
        position={isWhiteTheme ? "absolute": "static"}
        width="-webkit-fill-available"
      >
        <Flex
          justify="space-between"
          align="center"
        >
          <Box w="100%">
            <Link as={RouterLink} to="/">
              <Image src={logoSrc} alt="Anumo Logo" />
            </Link>
          </Box>
          <Box w="100%" textAlign="center">
            <Button
              bg="none"
              border="none"
              cursor="pointer"
              onClick={toggleMenu}
            >
              <Image src={menuIconSrc} alt="Burger Menu" />
            </Button>
          </Box>
          <Box w="100%" textAlign="end">
            <Button
              bg="none"
              border="none"
              cursor="pointer"
              onClick={openCart}
            >
              <Image src={cartIconSrc} alt="Shopping Bag" />
            </Button>
          </Box>
        </Flex>
        
        {/* Sidebar Menu */}
        <Drawer
          isOpen={isMenuOpen}
          placement="right"
          onClose={toggleMenu}
          blockScrollOnMount={false}
          autoFocus={false} 
          returnFocusOnClose={false}
        >
          <DrawerOverlay  />
          <DrawerContent
            bg="white"
            maxH="100vh"
            height="700px"
            maxW="430px"
            containerProps={{
                zIndex: 2,
                h: "100vh"
            }}
          >
            <DrawerBody
              display="flex"
              flexDirection="column"
              p="3.5rem 3rem 2rem"
              flex={1}
            >
              <Box textAlign="end">
                <Button
                  onClick={openCart}
                  boxSize="36px"
                  border="none"
                  background="none"
                >
                <Image src="/shopping-bag-black.svg" alt="Shopping Bag" />
                </Button>
              </Box>
                <UnorderedList
                  fontSize="26px"
                  fontWeight="700"
                  listStyleType="none"
                  textAlign="right"
                  m="32px 0"
                  p="1.5rem"
                >
                {[
                    { to: "/", hash: "root", label: t("Header.homeLink") },
                    { to: "/", hash: "shopBlock-homepage", label: t("Header.shopLink") },
                    { to: "/projects/$index", params: { index: "0" }, hash: "projectsSlider", label: t("Header.projectsLink") },
                    { to: "/contact-us", hash: "root", label: t("Header.contactUsLink") },
                    // { to: "/about-us", label: t("Header.aboutLink") },
                    // { to: "/find-us", label: t("Header.findUsLink") },
                ].map(({ to, hash, params, label }) => (
                    <ListItem key={to} pb=".75rem">
                      <Link
                      as={RouterLink}
                      to={to}
                      params={params}
                      hash={hash}
                      color="black"
                      onClick={handleCloseMenu}
                      > {label}
                      </Link>
                    </ListItem>
                ))}
                </UnorderedList>
                <Box mt="auto">
                <Flex
                    justify="space-between"
                    align="flex-start"
                >
                    <UnorderedList
                      fontWeight="500"
                      textDecoration="underline"
                      sx={{
                        textUnderlinePosition: "under"
                      }}
                      pb=".375rem"
                      listStyleType="none"
                      p={0}
                      m={0}
                    >
                    <ListItem pb=".375rem">{t('Footer.privacyPolicyLink')}</ListItem>
                    <ListItem pb=".375rem">{t('Footer.paymentDeliveryLink')}</ListItem>
                    <ListItem pb=".375rem">{t('Footer.returnsLink')}</ListItem>
                    </UnorderedList>
                    
                    <SwitchLocalization />
                </Flex>
                </Box>
            </DrawerBody>
        </DrawerContent>
        </Drawer>
        

        {/* Cart Popup */}
        <Drawer
          isOpen={isCartOpen}
          placement="right"
          onClose={closeCart}
          blockScrollOnMount={false}
          autoFocus={false} 
          returnFocusOnClose={false}
        >
          <DrawerOverlay />
          <DrawerContent
            bg="white"
            maxH="100vh"
            height="700px"
            maxW="430px"
            containerProps={{
                zIndex: 2,
                h: "100vh"
            }}
          >
            <DrawerBody p="46px 24px" h="100%" display="flex" flexDirection="column" fontFamily="Inter, sans-serif">
            <Flex justify="space-between" align="center" pb="24px">
                <Text m={0} fontSize="24px" fontWeight="700">
                    {t('Header.cartTitle')}
                </Text>
                <Box
                    onClick={toggleCart}
                    aria-label="Close"
                    role="button"
                    position="relative"
                    width="16px"
                    height="16px"
                    cursor="pointer"
                    transition="transform 0.3s ease"
                    _hover={{ transform: 'rotate(90deg)' }}
                    _before={{
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'black',
                    borderRadius: '1rem',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    }}
                    _after={{
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'black',
                    borderRadius: '1rem',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    }}
                />

            </Flex>

            <Box>
                <Grid templateColumns="2fr 3fr" gap="1rem"> 
                    <GridItem>
                        <Box>
                            <Image src={productImage} w="100%"></Image>
                        </Box>
                    </GridItem>
                    <GridItem
                        display="flex"
                        flexDirection="column"
                    >
                        <Text m={0} fontWeight="700"
                        >CARABINER FOR KEYS WITH HEART SHAPE</Text>
                        <Text fontSize="14px">75x55x6мм, 75x65x6мм</Text>
                        <Flex
                            h="100%"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            <ProductCounter />
                            <Box>$24</Box>
                        </Flex>
                    </GridItem>

                </Grid>
                <Flex h="100%" justifyContent="space-between" flexDirection="column">
                    <Flex
                    pt="46px"
                    justifyContent="space-between"
                    fontWeight="600"
                    >
                        <Text m={0}>{t('Checkout.orderSubtotal')}</Text>
                        <Text m={0}>$24</Text>
                    </Flex>
                    <Box textAlign="center">
                        <Text
                        m={0}
                        fontSize="10px"
                        color="#606060"
                        pb="20px"
                        >{t('Header.checkoutHint')}</Text>
                        <Button
                        w="100%"
                        fontSize="14px"
                        fontWeight="600"
                        color="white"
                        textDecoration="underline"
                        p="12px"
                        border="none"
                        background="black"
                        >
                        {t('Checkout.placeOrder')}
                        </Button>
                    </Box>
                </Flex>
            </Box> 

            {/* EMPTY CART
            <Flex
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              flex={1}
            >
                <Text fontSize="16px" fontWeight="600">{t('Header.emptyCart')}</Text>
                <Text fontSize="14px" >{t('Header.emptyCartHint')}</Text>
                <Link
                  as={RouterLink}
                  to="/"
                  hash="shopBlock-homepage"
                  onClick={handleCloseMenu}
                  color="black"
                  fontSize="14px"
                  fontWeight="600"
                  mt="4rem"
                >{t('Header.cartShopLink')}</Link>
            </Flex> */}


            </DrawerBody>
          </DrawerContent>
        </Drawer> 
     
      </Box>

      
    </>
  );
};

export default Header;



