import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
    Link,
    useBreakpointValue
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import ProductCounter from "../ProductCounter";
import { OpenAPI } from "../../client";


interface CartProps {
  isOpen: boolean
  onClose: () => void
  handleLinkClick: () => void
  toggleMenu: () => void
}

const Cart = ({ isOpen, onClose, handleLinkClick, toggleMenu }: CartProps) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const { state, closeCart, toggleCart } = useCart();
    const navigate = useNavigate();
    const apiBaseUrl = OpenAPI.BASE

    const isMobile = useBreakpointValue({ base: true, sm: false });

    const totalUSD = state.cartItems.reduce((sum, item) => sum + item.price_usd * item.count, 0);
    const totalUAH = state.cartItems.reduce((sum, item) => sum + item.price_uah * item.count, 0);

    const drawerHeight = useBreakpointValue({ base: "100vh", sm: "700px" }); 
    return (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          blockScrollOnMount={false}
          autoFocus={false} 
          returnFocusOnClose={false}
        >
          <DrawerOverlay />
          <DrawerContent
            bg="white"
            maxH="100vh"
            height={drawerHeight}
            maxW="430px"
          >
            <DrawerBody
              fontFamily="Inter, sans-serif"
              display="flex"
              flexDirection="column"
              h="100%"
              p="46px 24px"
              sx={{
                "::-webkit-scrollbar": {
                  width: ".5rem !important",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "black",
                },
              }}
            >

            <Flex
              justify="space-between"
              align="center"
              mb="24px"
            >
              { isMobile && (
              <>
                <Box w="100%">
                  <Link as={RouterLink} to="/">
                    <Image
                      w="192px"
                      src="/logo-black.svg"
                      alt="Anumo Logo"
                    />
                  </Link>
                </Box>
                <Flex
                  justifyContent="center"
                  w="100%"
                  textAlign="center"
                >
                  <Button
                    onClick={toggleMenu}
                    variant="unstyled"
                    display="flex"
                    p="6px"
                  >
                    <Image
                      src="/menu-burger-black.svg"
                      alt="Burger Menu"
                    />
                  </Button>
                </Flex>
              </>
              )}
              <Flex
                justifyContent="flex-end"
                w="100%"
              >
                <Button
                  onClick={toggleCart}
                  variant="unstyled"
                  display="flex"
                >
                  <Image
                    src="/shopping-bag-black.svg"
                    alt="Shopping Bag"
                  />
                </Button>
              </Flex>
            </Flex>


            <Flex
              justify="space-between"
              align="center"
              mb={["16px", "24px"]}
            >
              <Text
                m={0}
                fontSize={["14px", "24px"]}
                fontWeight={["600", "700"]}
              >
                  {t('Header.cartTitle')}
              </Text>
              <Flex
                boxSize="40px"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  onClick={onClose}
                  aria-label="Close"
                  role="button"
                  position="relative"
                  boxSize="16px"
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
            </Flex>

            {state.cartItems.length === 0 ? (
              <Flex
                h="100%"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
              >
                <Text fontSize="16px" fontWeight="600">{t('Header.emptyCart')}</Text>
                <Text fontSize="14px" >{t('Header.emptyCartHint')}</Text>
                <Link
                  as={RouterLink}
                  to="/"
                  hash="shopBlock-homepage"
                  onClick={handleLinkClick}
                  color="black"
                  fontSize="14px"
                  fontWeight="600"
                  mt="4rem"
                  textDecoration="underline"
                  style={{
                      textUnderlinePosition: "under"
                  }}
                >{t('Header.cartShopLink')}</Link>
              </Flex>
            ) : (
              <Flex
                h="100%"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                {state.cartItems.map((item, index) => {
                  const itemTotalUSD = item.price_usd * item.count;
                  const itemTotalUAH = item.price_uah * item.count;

                  return (
                  <Box key={index} mb="1.5rem">
                    <Grid templateColumns="2fr 3fr" gap="1rem"> 
                      <GridItem>
                        <Box>
                          <Image
                            src={`${apiBaseUrl}${item.image?.url}`}
                            alt={item.image?.alt_text}
                            w="100%"
                          ></Image>
                        </Box>
                      </GridItem>
                      <GridItem
                        display="flex"
                        flexDirection="column"
                      >
                        <Text m={0} fontWeight="700" mb="10px">
                          {currentLang === "en" ? item.title_en : item.title_uk}
                        </Text>
                        <Text fontSize="14px">
                          { item.size }
                        </Text>
                        <Flex
                          h="100%"
                          justifyContent="space-between"
                          alignItems="flex-end"
                        >
                          <ProductCounter productId={item.id} count={item.count} />
                          <Box>
                            {currentLang === "en"
                            ? `$${itemTotalUSD.toFixed(2)}`
                            : `₴${itemTotalUAH.toFixed(2)}`}
                          </Box>
                        </Flex>
                      </GridItem>
                    </Grid>
                  </Box>
                )})}
                  <Flex
                    justifyContent="space-between"
                    fontWeight="600"
                    mt="2.875rem"
                    mb="4rem"
                  >
                    <Text m={0}>{t('Checkout.orderSubtotal')}</Text>
                    <Text m={0}>
                      {currentLang === "en"
                      ? `$${totalUSD.toFixed(2)}`
                      : `₴${totalUAH.toFixed(2)}`}
                    </Text>
                  </Flex>
                </Box>

                <Box pb="2rem" textAlign="center">
                  <Text
                    m={0}
                    fontSize="10px"
                    color="#606060"
                    pb="20px"
                  >{t('Header.checkoutHint')}</Text>
                  <Button
                    onClick={() => {
                      navigate({ to: "/checkout" })
                      closeCart()
                    }}
                    w="100%"
                    fontSize="14px"
                    fontWeight="600"
                    color="white"
                    p="12px"
                    border="none"
                    background="black"
                    textDecoration="underline"
                    _hover={{ backgroundColor: "black" }}
                    _active={{ backgroundColor: "black" }}
                    >{t('Checkout.placeOrder')}</Button>
                </Box>
              </Flex> 
            )}
            </DrawerBody>
          </DrawerContent>
        </Drawer> 
    )
};

export default Cart;