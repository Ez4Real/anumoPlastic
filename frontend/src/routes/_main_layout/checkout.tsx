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
  RadioGroup,
  Select,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CustomIcon from "../../components/Common/CustomIcon";
import { FiMail } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import ProductCounter from "../../components/ProductCounter";
import { ApiError, OpenAPI, PaymentCreate, PaymentsService } from "../../client";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form"
import CustomRadio from "../../components/Common/CustomRadio";
import { debounce } from "lodash";

// !!!!!
import axios from "axios";
import BranchFormGroup, { Branch } from "../../components/Common/Forms/BranchFormGroup";
import PostOfficeFormGroup from "../../components/Common/Forms/postOfficeFormGroup";
import AddressFormGroup from "../../components/Common/Forms/AddressFormGroup";
// import BranchFormGroup from "../../components/Common/Forms/BranchFormGroup"


export const Route = createFileRoute("/_main_layout/checkout")({
  component: Checkout,
})


function Checkout() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const apiBaseUrl = OpenAPI.BASE
  const { state, closeCart } = useCart();

  const [mailing, setMailing] = useState<boolean>(false);
  const [deliveryRegion, setDeliveryRegion] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Branch");
  const [city, setCity] = useState("");
  const [branchNumber, setBranchNumber] = useState<string>("");
  const [branchOptions, setBranchOptions] = useState<Array<Branch>>([]);


  useEffect(() => {
    const fetchWarehouses = debounce(async () => {
      if (city && branchNumber) {
        console.log("\nCity: ", city);
        console.log("\nbranchNumber", branchNumber);
        console.log("\nbranchNumber", branchNumber);

        try {
          const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: OpenAPI.NOVA_POSHTA_TOKEN,
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
              CityName: city,
              // FindByString: deliberyMeth
              WarehouseId: branchNumber
            },
          });
          setBranchOptions(response.data.data); 
          console.log(response.data.data); 
        } catch (error) {
          console.error('Error fetching branches:', error);
        }
      }
    }, 500);

    fetchWarehouses();
  }, [city, branchNumber]);





  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + (
      currentLang === "en"
        ? item.price_usd
        : item.price_uah) * item.count, 0
  )
  const deliveryPrice = currentLang === "en" ? 30 : 1250
  const total = subtotal + deliveryPrice;

  // console.log(state.cartItems)

  const methods = useForm<PaymentCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      amount: total * 100,
      ccy: currentLang === "en" ? 840 : 980,
      merchantPaymInfo: {
        reference: "84d0070ee4e44667b31371d8f8813947",
        destination: "Оплата за товар(и)",
        customerEmails: ["butilka05roma@gmail.com"],
        basketOrder: state.cartItems.map((item) => ({
          name: currentLang === "en" ? item.title_en : item.title_uk,
          qty: item.count,
          sum: (currentLang === "en" ? item.price_usd : item.price_uah) * 100,
          total: (currentLang === "en" ? item.price_usd : item.price_uah) * item.count * 100,
          icon: `${apiBaseUrl}${item.image?.url}`, 
          code: "SOME PRODUCT CODE", 
        })),
      },
      // webHookUrl: `${OpenAPI.BASE}/api/v1/payments/callback`,
      webHookUrl: "http://127.0.0.1:8000/api/v1/payments/callback",
      // redirectUrl: '/thank-you',
      redirectUrl: 'http://localhost:5173/thank-you',
      // displayType: "iframe",
      paymentType: "debit"

    },
  })


  const mutation = useMutation({
    mutationFn: (data: PaymentCreate) =>
      PaymentsService.createPayment({ requestBody: data })
        .then(response => 
          // @ts-ignore
          window.location.href = response.pageUrl
          // console.log(response)
        )
        .catch(error => console.error("Payment Failed:", error)),
    onSuccess: (data, variables, context) => {
      // if (response) {
        console.log("\n\nVariables", variables);
        console.log(variables);
      //   console.log(response);
        
        // window.location.href = response.pageUrl; // Redirect to Monobank payment page

        // navigate({ to: "/login" })
    },
    onError: (err: ApiError) => {
      console.log("\n\nFAILED!!!");
      console.log(err);
    }
  })

  const onSubmit: SubmitHandler<PaymentCreate> = async (data) => {
      mutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods


  return (
    <Container px={["24px", "46px"]}>
      <Grid
        display={["flex", "grid"]}
        flexDirection={["column-reverse", "row"]}
        templateColumns="1fr 108px 50%"
      >
        <GridItem>
          <FormProvider {...methods}>
            <Container
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              mt={["36px", 0]}
              p="0 !important"
            >
              <Heading
                m={0}
                fontSize={["20px", "24px"]}
                fontWeight={["600", "700"]}
              >{t('Checkout.contactFormTitle')}</Heading>
              <Grid
                templateColumns={["unset", "1fr 1fr"]}
                templateRows={["1fr", "unset"]}
                gap="12px"
                mt="16px"
              >
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
                  />
                </FormControl>

              </Grid>
              <FormControl mt="16px">
                <Input
                  placeholder={t('Checkout.emailPlaceholder')}
                  border="1px solid #A4A2A2"
                  fontSize="14px"
                  padding="12px"
                />
              </FormControl>

              <Flex mt="16px" alignItems="center" h="24px">
                <Checkbox
                  isChecked={mailing}
                  onChange={() => setMailing(!mailing)}
                  icon={<CustomIcon
                    icon={FiMail}
                    isChecked={mailing}
                    isIndeterminate={false}
                  />}
                  isRequired={false}
                  boxSize="24px"
                  justifyContent="center"
                  borderRadius="6px"
                  border="1px solid black"
                  colorScheme="black"
                  _hover={{
                    bg: "rgba(0, 0, 0, 0.75)",
                    ".chakra-checkbox__control": {
                      color: "white"
                    }
                  }}
                  _checked={{
                    bg: "black",
                  }}
                  sx={{
                    ".chakra-checkbox__control": {
                      border: "none",
                      transition: "all 0.2s ease-in-out",
                      color: "black"
                    },
                    ".chakra-checkbox__control[data-checked]": {
                      color: "white",
                    },
                  }}
                >
                </Checkbox>
                <Text
                  fontSize="14px"
                  ml="16px"
                >{t('Checkout.emailMeCheckbox')}</Text>
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
                fontSize={["20px", "24px"]}
                fontWeight={["600", "700"]}
                mt="24px"
              >{t('Checkout.delivery.formTitle')}</Heading>

              <CSSReset />

              <RadioGroup
                onChange={setDeliveryRegion}
                value={deliveryRegion}
                fontWeight="600"
                mt={["16px", "20px"]}
              >
                <VStack align="start">
                  <CustomRadio value="ukraine" label={t("Checkout.delivery.Ukraine.title")}/>
                  {deliveryRegion === "ukraine" && (
                  <>
                    <Select
                      value={deliveryMethod}
                      onChange={(e) => {
                        setDeliveryMethod(e.target.value)
                        setBranchNumber("")
                      }}
                      borderRadius={0}
                      fontSize="14px"
                      borderColor="#A4A2A2"
                      color="#3A3A3A"
                      display="flex"
                      mt="1rem"
                      sx={{
                        "option:checked": {
                          background: "#F1F1F1",
                        },
                      }}
                    >
                      <option value='Branch'>
                        {t("Checkout.delivery.Ukraine.select.branchTitle")}
                      </option>
                      <option value='Postomat'>
                        {t("Checkout.delivery.Ukraine.select.postOfficeTitle")}
                      </option>
                      <option value='address-delivery'>
                        {t("Checkout.delivery.Ukraine.select.addressDeliveryTitle")}
                      </option>
                    </Select>
                    <VStack w="100%" spacing={0}>
                      {/* City Selection */}
                      { deliveryMethod !== "address-delivery" && (
                      <FormControl mt="14px">
                        <FormLabel fontSize={["20px", "16px"]} fontWeight={["600", "700"]} mb="12px">
                          {t('Checkout.delivery.Ukraine.select.city.title')}
                        </FormLabel>
                        <Input
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          placeholder={t('Checkout.delivery.Ukraine.select.city.placeholder')}
                          border="1px solid #A4A2A2"
                          color="#3A3A3A"
                          fontSize="14px"
                          padding="12px"
                        />
                      </FormControl>
                      )}

                      {/* Branch Selection */}
                      { deliveryMethod === "Branch" && (
                        <BranchFormGroup
                          branchOptions={branchOptions}
                          setBranchNumber={setBranchNumber}
                        />
                      )}
                      { deliveryMethod === "Postomat" && (
                        <PostOfficeFormGroup
                          titleLabel={t("Checkout.delivery.Ukraine.select.postOffice.title")}
                          placeholder={t('Checkout.delivery.Ukraine.select.postOffice.placeholder')}
                          branchOptions={branchOptions}
                        />
                      )}
                      { deliveryMethod === "address-delivery" && (
                        <AddressFormGroup
                          countryValue="UA"
                        />
                      )}
                    </VStack>
                  </>
                  )}
                  
                  <CustomRadio value="europe" label={t("Checkout.delivery.europe.title")}  mt="1rem"/>
                  { deliveryRegion === "europe" && (
                    <AddressFormGroup apiEndpoint="/region/europe" />
                  )}
                  <CustomRadio value="overseas" label={t("Checkout.delivery.overseas.title")}  mt="1rem"/>
                  { deliveryRegion === "overseas" && (
                    <AddressFormGroup regions={["americas", "oceania", "africa"]} />
                  )}
                </VStack >
              </RadioGroup>

              <FormControl mt="24px">
                <FormLabel
                  fontSize={["20px", "24px"]}
                  fontWeight={["600", "700"]}
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
                  my={["12px", "1rem"]}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    ".chakra-checkbox__control": {
                      boxSize: "16px",
                      border: "1px solid #3A3A3A !important",
                      borderRadius: "50%",
                      position: "relative",
                      background: "white !important",
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
                  type="submit"
                  isLoading={isSubmitting}
                  variant="unstyled"
                  width="100%"
                  fontSize="14px"
                  fontWeight="600"
                  color="white"
                  bg="black"
                  p="12px"
                  textDecoration="underline"
                  _hover={{ backgroundColor: "black" }}
                  _active={{ backgroundColor: "black" }}
                >
                  {t('Checkout.placeOrder')}
                </Button>
              </Box>

            </Container>
          </ FormProvider>
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
                fontSize={["20px", "24px"]}
                fontWeight={["600", "700"]}
                mb="1rem"
              >{t('Checkout.orderSummaryTitle')}</Heading>

              {state.cartItems.map((item, index) => {
                const itemTotalUSD = item.price_usd * item.count;
                const itemTotalUAH = item.price_uah * item.count;

                return (
                  <Box key={index} mb={["1rem", "1.5rem"]}>
                    <Grid
                      templateColumns={["32% 64%", "1fr 1fr"]}
                      gap={["12px", "1rem"]}
                    >
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
                        <Text
                          m={0}
                          mb="10px"
                          fontSize={["14px", "20px"]}
                          fontWeight={["600", "700"]}>
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
                fontSize={["14px", "1rem"]}
                direction="column"
                gap="16px"
                mt={["66px", 0]}
              >
                <Flex justifyContent="space-between">
                  <Text>{t('Checkout.orderSubtotal')}</Text>
                  <Box>
                    {subtotal}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>{t('Checkout.orderShipping')}</Text>
                  <Box>
                    {deliveryPrice}
                  </Box>
                </Flex>

                <Flex
                  justifyContent="space-between"
                  fontSize={["16px", "18px"]}
                  fontWeight={["600", "700"]}

                >
                  <Text>{t('Checkout.orderTotal')}</Text>
                  <Flex gap={[0, 4]} alignItems="center">
                    <Box
                      fontSize={["12px", "14px"]}
                      fontWeight="400" color="#BBBBBB"
                    >{t('Checkout.checkoutCurrency')}</Box>
                    <Box>
                      {currentLang === "en"
                        ? '$'
                        : '₴'}{total}
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