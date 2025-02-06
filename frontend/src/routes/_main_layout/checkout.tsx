import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import {
  Box,
  Button,
  Checkbox,
  Container,
  CSSReset,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Link,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CustomIcon from "../../components/Common/CustomIcon";
import { FiMail } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import ProductCounter from "../../components/ProductCounter";
import { OpenAPI } from "../../client";

export const Route = createFileRoute("/_main_layout/checkout")({
  component: CheckoutNew,
})


function CheckoutNew() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const apiBaseUrl = OpenAPI.BASE
  const { state, closeCart } = useCart();

  const [mailing, setMailing] = useState<boolean>(false);
  const [deliveryMethod, setDeliveryMethod] = useState<string>("ukraine");

  const subtotalUSD = state.cartItems.reduce((sum, item) => sum + item.price_usd * item.count, 0);
  const subtotalUAH = state.cartItems.reduce((sum, item) => sum + item.price_uah * item.count, 0);
  const deliveryPrice = { en: 30, uk: 1250 };
  const totalUSD = subtotalUSD + deliveryPrice.en
  const totalUAH = subtotalUAH + deliveryPrice.uk

  return (
    <Container px="46px">
      <Grid templateColumns="1fr 108px 50%">
        
        <GridItem>
          <Container as="form" >
            <Heading
              m={0}
              fontSize="24px"
              fontWeight="700"
            >{t('Checkout.contactFormTitle')}</Heading>
            <Grid templateColumns="1fr 1fr" gap="12px" mt="16px">
              <GridItem>
                <FormControl>
                  <Input
                    border="1px solid #A4A2A2"
                    fontSize="14px"
                    p="12px"
                    height="-webkit-fill-available"
                    width="-webkit-fill-available"
                    placeholder={t('Checkout.firstNamePlaceholder')}
                  />
                </FormControl>
              </GridItem>
              <FormControl>
                <Input
                  placeholder={t('Checkout.lastNamePlaceholder')}
                  border="1px solid #A4A2A2"
                  fontSize="14px"
                  p="12px"
                  height="-webkit-fill-available"
                  width="-webkit-fill-available"
                />
              </FormControl>

            </Grid>
            <FormControl mt="16px">
              <Input
                placeholder={t('Checkout.emailPlaceholder')}
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
              />
            </FormControl>

            <Flex mt="16px" alignItems="center" h="24px">
              <Checkbox
                isChecked={mailing}
                onChange={() => setMailing(!mailing)}
                isRequired={false}
                boxSize="24px"
                justifyContent="center"
                icon={<CustomIcon
                  icon={FiMail}
                  isChecked={mailing}
                  isIndeterminate={false}
                />}
                borderRadius="4px"
                _hover={{
                  bg: "rgba(0, 0, 0, 0.75)",
                  color: "white",
                }}
                _checked={{
                  bg: "black",
                  borderColor: "black",
                  color: "white",
                }}
              >
              </Checkbox>
              <Text fontSize="14px" ml="16px">{t('Checkout.emailMeCheckbox')}</Text>
            </Flex>

            <FormControl mt="16px">
              <Input
                type="tel"
                placeholder={t('Checkout.phonePlaceholder')}
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
              />
            </FormControl>

            <Heading
              m={0}
              fontSize="24px"
              fontWeight="700"
              mt="24px"
            >{t('Checkout.deliveryFormTitle')}</Heading>

            <CSSReset />

            <RadioGroup
              onChange={setDeliveryMethod}
              value={deliveryMethod}
              fontSize="14px"
              fontWeight="600"
              mt="1rem"
            >
              <VStack align="start" spacing="16px">
                {[
                  { value: "ukraine", label: t("Checkout.deliveryUkraine") },
                  { value: "europe", label: t("Checkout.deliveryEurope") },
                  { value: "overseas", label: t("Checkout.deliveryOverseas") },
                ].map(({ value, label }, index) => (
                  <Radio
                    key={index}
                    value={value}
                    spacing={10}
                    sx={{
                      "&.chakra-radio__control": {
                        boxSize: "16px",
                        border: "1px solid #3A3A3A",
                        borderRadius: "50%",
                        position: "relative",
                      },
                      _checked: {
                        _before: {
                          content: '""',
                          backgroundColor: "#3A3A3A",
                          boxSize: "10px",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        },
                      },
                    }}
                  >{label}</Radio>
                ))}
              </VStack >
            </RadioGroup>

            <FormControl mt="24px">
              <FormLabel
                fontSize="24px"
                fontWeight="700"
                mb="12px"
              > {t('Checkout.orderCommentTitle')}
              </FormLabel>
              <Textarea
                resize="vertical"
                fontSize="14px"
                border="1px solid rgb(164, 162, 162)"
                h="160px"
                minH="160px"
                maxH="260px"
                w="100%"
                p="12px"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize="24px"
                fontWeight="700"
                mt="32px"
              > {t('Checkout.paymentTitle')}
              </FormLabel>
              <Checkbox
                isChecked
                icon={<></>}
                my="1rem"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  ".chakra-checkbox__control": {
                    boxSize: "16px",
                    border: "1px solid #3A3A3A",
                    borderRadius: "50%",
                    position: "relative",
                  },
                  ".chakra-checkbox__control[data-checked]::after": {
                    content: '""',
                    backgroundColor: "#3A3A3A",
                    boxSize: "10px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
              >{t('Checkout.cardPayment')}
              </Checkbox>
            </FormControl>

            <Box pt="32px" pb="220px">
              <Button
                width="100%"
                fontSize="14px"
                fontWeight="600"
                color="white"
                bg="black"
                p="12px"
                cursor="pointer"
                border="none"
                textDecoration="underline"
                style={{
                  textUnderlinePosition: "under"
                }}
              >
                {t('Checkout.placeOrder')}
              </Button>
            </Box>

          </Container>
        </GridItem>

        <GridItem></GridItem>

        <GridItem>
          {state.cartItems.length === 0 ? (
            <Flex
              flexDirection="column"
              justifyContent="flex-start"
              textAlign="center"
            >
              <Text fontSize="16px" fontWeight="600">{t('Header.emptyCart')}</Text>
              <Text fontSize="14px" >{t('Header.emptyCartHint')}</Text>
              <Link
                as={RouterLink}
                to="/"
                hash="shopBlock-homepage"
                onClick={closeCart}
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
            <>
              <Heading
                fontSize="24px"
                fontWeight="700"
                mb="1rem"
              >{t('Checkout.orderSummaryTitle')}</Heading>

              {state.cartItems.map((item, index) => {
                const itemTotalUSD = item.price_usd * item.count;
                const itemTotalUAH = item.price_uah * item.count;

                return (
                  <Box key={index} mb="1.5rem">
                    <Grid templateColumns="1fr 1fr" gap="1rem">
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
                        <Text m={0} fontSize="20px" fontWeight="700">
                          {currentLang === "en" ? item.title_en : item.title_uk}
                        </Text>
                        <Text fontSize="1rem">
                          {item.size}
                        </Text>
                        <Flex
                          fontSize="1rem"
                          h="100%"
                          justifyContent="space-between"
                          alignItems="flex-end"
                        >
                          <ProductCounter productId={item.id} count={item.count} />
                          <Box fontWeight="700">
                            {currentLang === "en"
                              ? `$${itemTotalUSD.toFixed(2)}`
                              : `₴${itemTotalUAH.toFixed(2)}`}
                          </Box>
                        </Flex>
                      </GridItem>
                    </Grid>
                  </Box>
                )
              })}

              <Flex
                fontSize="1rem"
                direction="column"
                gap="16px"
              >
                <Flex justifyContent="space-between">
                  <Text>{t('Checkout.orderSubtotal')}</Text>
                  <Box>
                    {currentLang === "en"
                      ? `$${subtotalUSD}`
                      : `₴${subtotalUAH}`}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>{t('Checkout.orderShipping')}</Text>
                  <Box>
                    {currentLang === "en"
                      ? `$${deliveryPrice.en}`
                      : `₴${deliveryPrice.uk}`}
                  </Box>
                </Flex>

                <Flex
                  justifyContent="space-between"
                  fontSize="18px"
                  fontWeight="700"
                >
                  <Text>{t('Checkout.orderTotal')}</Text>
                  <Flex gap={4} alignItems="center">
                    <Box
                      fontSize="14px"
                      fontWeight="400" color="#BBBBBB"
                    >{t('Checkout.checkoutCurrency')}</Box>
                    <Box>
                      {currentLang === "en"
                        ? `$${totalUSD.toFixed(2)}`
                        : `₴${totalUAH.toFixed(2)}`}
                    </Box>
                  </Flex>
                </Flex>

              </Flex>
            </>
          )}

        </GridItem>
      </Grid>
    </Container>
  )
}