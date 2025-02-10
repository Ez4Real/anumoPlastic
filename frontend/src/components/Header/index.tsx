import { useCallback } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Link,
  ListItem,
  UnorderedList,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next';
import SwitchLocalization from '../SwitchLocalization';
import Cart from '../Cart';
import { useCart } from '../../context/CartContext';


const Header = ({ isWhiteTheme = false }) => {
  const { t } = useTranslation();
  const { isOpen: isMenuOpen, onToggle: toggleMenu, onClose: closeMenu } = useDisclosure();
  const { isCartOpen, openCart, closeCart } = useCart();
  
  const logoSrc = isWhiteTheme ? '/logo.svg' : '/logo-black.svg'
  const menuIconSrc = isWhiteTheme ? '/menu-burger.svg' : '/menu-burger-black.svg'
  const cartIconSrc = isWhiteTheme ? '/shopping-bag.svg' : '/shopping-bag-black.svg'

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const drawerHeight = useBreakpointValue({ base: "100vh", sm: "700px" }); 

  
  const handleLinkClick = useCallback(() => {
    closeMenu();
    closeCart();
  }, []);

  
  return (
    <>
      <Box
        as="header"
        p={["48px 24px", "48px 46px"]}
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
              p="6px"
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
            height={drawerHeight}
            maxW="430px"
          >
            <DrawerBody
              display="flex"
              flexDirection="column"
              p={["60px 24px 2rem", "3.5rem 3rem 2rem"]}
              flex={1}
            >
              <Flex
                justify="space-between"
                align="center"
              >
                { isMobile && (
                <>
                  <Box w="100%">
                    <Link as={RouterLink} to="/">
                      <Image
                        src="/logo-black.svg"
                        alt="Anumo Logo" />
                    </Link>
                  </Box>
                  <Box w="100%" textAlign="center">
                    <Button
                      bg="none"
                      border="none"
                      cursor="pointer"
                      onClick={toggleMenu}
                      p="6px"
                    >
                      <Image src="/menu-burger-black.svg" alt="Burger Menu" />
                    </Button>
                  </Box>
                </>
                )}
                <Box w="100%" textAlign="end">
                  <Button
                    bg="none"
                    border="none"
                    cursor="pointer"
                    onClick={openCart}
                    p=".5rem"
                  >
                    <Image src="/shopping-bag-black.svg" alt="Shopping Bag" />
                  </Button>
                </Box>
              </Flex>

              <UnorderedList
                fontSize="26px"
                fontWeight="700"
                listStyleType="none"
                textAlign="right"
                mt={["136px", "32px"]}
                mx={0}
                mb="32px"
                p="1.5rem"

                display={["flex", "block"]}
                alignItems={["center", "stretch"]}
                flexDirection="column"
              > {[
                    { to: "/", hash: "root", label: t("Header.homeLink") },
                    { to: "/", hash: "shopBlock-homepage", label: t("Header.shopLink") },
                    { to: "/projects/$index", params: { index: "0" }, hash: "projectsSlider", label: t("Header.projectsLink") },
                    { to: "/contact-us", hash: "root", label: t("Header.contactUsLink") },
                    // { to: "/about-us", label: t("Header.aboutLink") },
                    // { to: "/find-us", label: t("Header.findUsLink") },
                ].map(({ to, hash, params, label }, index) => (
                    <ListItem
                      key={index}
                      pb={["24px", ".75rem"]}
                    >
                      <Link
                      as={RouterLink}
                      to={to}
                      params={params}
                      hash={hash}
                      color="black"
                      onClick={handleLinkClick}
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
        <Cart
          isOpen={isCartOpen}
          onClose={closeCart} 
          toggleMenu={toggleMenu}
          handleLinkClick={handleLinkClick}
        />
      </Box>
    </>
  );
};

export default Header;



