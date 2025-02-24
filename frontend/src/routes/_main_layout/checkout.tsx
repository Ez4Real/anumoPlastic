import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  RadioGroup,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { FiMail } from "react-icons/fi"
import { v4 as uuidv4 } from "uuid"
import {
  type ApiError,
  type DeliveryTypeUkraine,
  OpenAPI,
  type OrderCreate,
  OrdersService,
  type PaymentCreate,
  PaymentsService,
} from "../../client"
import CustomIcon from "../../components/Common/CustomIcon"
import CustomRadio from "../../components/Common/CustomRadio"
import ProductCounter from "../../components/ProductCounter"
import { useCart } from "../../context/CartContext"

import AddressFormGroup from "../../components/Common/Forms/AddressFormGroup"
import BranchFormGroup, {
  type Branch,
} from "../../components/Common/Forms/BranchFormGroup"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

export const Route = createFileRoute("/_main_layout/checkout")({
  component: Checkout,
})

function Checkout() {
  const { t, i18n } = useTranslation()
  const currentLang: "en" | "ua" = i18n.language as "en" | "ua"
  const apiBaseUrl = OpenAPI.BASE
  const { state } = useCart()
  const showToast = useCustomToast()

  if (state.cartItems.length === 0) {
    window.location.href = "/#shopBlock-homepage"
  }

  const productPrice = currentLang === "en" ? "price_usd" : "price_uah"

  const basketOrder = state.cartItems.map((item) => ({
    productId: item.id,
    name: currentLang === "en" ? item.title_en : item.title_uk,
    qty: item.count,
    sum: (currentLang === "en" ? item[productPrice] : item[productPrice]) * 100,
    total:
      (currentLang === "en" ? item[productPrice] : item[productPrice]) *
      item.count *
      100,
    icon: `${apiBaseUrl}${item.image?.url}`,
    code: item.id,
    unit: "шт",
  }))

  const subtotal = state.cartItems.reduce(
    (sum, item) =>
      sum +
      (currentLang === "en" ? item[productPrice] : item[productPrice]) *
        item.count,
    0,
  )
  const deliveryPrice = currentLang === "en" ? 30 : 1250
  const total = subtotal + deliveryPrice

  const Currency: Record<
    "en" | "ua",
    {
      name: "USD" | "UAH"
      ccy: 840 | 980
    }
  > = {
    ua: {
      name: "UAH",
      ccy: 980,
    },
    en: {
      name: "USD",
      ccy: 840,
    },
  }

  const ccy = Currency[currentLang].ccy
  const currency = Currency[currentLang].name

  const methods = useForm<OrderCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      invoiceId: "",
      contacts: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      delivery: {
        region: null,
        country: "",
        city: "",
        postalCode: "",
        streetAddress: "",
        type: "branch",
        warehouse: "",
      },
      amount: total * 100,
      currency: currency,
      basketOrder: basketOrder,
      mailing: false,
      comment: "",
    },
  })

  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    setValue("currency", currency)
  }, [currentLang])

  const mailing = getValues("mailing")
  const [email] = useState<string>("")
  const deliveryRegion = watch("delivery.region")
  const deliveryMethod = getValues("delivery.type")

  const [warehouseNumber, setWarehouseNumber] = useState<any>("")
  const [warehouseOptions, setWarehouseOptions] = useState<Array<Branch>>([])

  const serialisePaymentData = (): PaymentCreate => ({
    amount: total * 100,
    // amount: 1,
    ccy: ccy,
    merchantPaymInfo: {
      reference: uuidv4(),
      destination: "Тестова Оплата",
      customerEmails: email ? [email] : [],
      basketOrder: basketOrder,
    },
    webHookUrl: `${OpenAPI.BASE}/api/v1/payments/callback`,
    redirectUrl: "http://localhost:5173/thank-you",
  })

  const mutation = useMutation({
    mutationFn: async (data: OrderCreate) => {
      try {
        const paymentResponse = await PaymentsService.createPayment({
          requestBody: serialisePaymentData(),
        })
        const orderData = { ...data, invoiceId: paymentResponse.invoiceId }
        const orderResponse = OrdersService.createOrder({
          requestBody: orderData,
        })

        window.open(paymentResponse.pageUrl, "_blank", "noopener,noreferrer")
        // window.location.href = paymentResponse.pageUrl;

        return orderResponse
      } catch (error) {
        console.error("❌ Error:", error)
        throw error
      }
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
  })

  const onSubmit: SubmitHandler<OrderCreate> = (data) => {
    mutation.mutate(data)
  }

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
              >
                {t("Checkout.contactFormTitle")}
              </Heading>
              <Grid
                templateColumns={["unset", "1fr 1fr"]}
                templateRows={["1fr", "unset"]}
                gap="12px"
                mt="16px"
              >
                <GridItem>
                  <FormControl>
                    <Input
                      {...register("contacts.first_name", {
                        required: "First name is required",
                        setValueAs: (value: string) => value.trim(),
                      })}
                      isRequired
                      border="1px solid #A4A2A2"
                      fontSize="14px"
                      p="12px"
                      height="-webkit-fill-available"
                      width="-webkit-fill-available"
                      placeholder={t("Checkout.firstNamePlaceholder")}
                    />
                  </FormControl>
                </GridItem>
                <FormControl>
                  <Input
                    {...register("contacts.last_name", {
                      required: "Last name is required",
                      setValueAs: (value: string) => value.trim(),
                    })}
                    isRequired
                    placeholder={t("Checkout.lastNamePlaceholder")}
                    border="1px solid #A4A2A2"
                    fontSize="14px"
                    p="12px"
                    height="-webkit-fill-available"
                  />
                </FormControl>
              </Grid>
              <FormControl mt="16px">
                <Input
                  type="email"
                  {...register("contacts.email", {
                    required: "Email is required",
                    setValueAs: (value: string) => value.trim(),
                  })}
                  isRequired
                  placeholder={t("Checkout.emailPlaceholder")}
                  border="1px solid #A4A2A2"
                  fontSize="14px"
                  padding="12px"
                />
              </FormControl>

              <FormControl mt="16px">
                <Controller
                  name="mailing"
                  control={control}
                  render={({ field }) => (
                    <Flex
                      {...field}
                      onClick={() => field.onChange(!field.value)}
                      alignItems="center"
                      h="24px"
                      cursor="pointer"
                    >
                      <Checkbox
                        isChecked={field.value}
                        icon={
                          <CustomIcon
                            icon={FiMail}
                            isChecked={mailing}
                            isIndeterminate={false}
                          />
                        }
                        boxSize="24px"
                        justifyContent="center"
                        borderRadius="6px"
                        border="1px solid black"
                        colorScheme="black"
                        _hover={{
                          bg: "rgba(0, 0, 0, 0.75)",
                          ".chakra-checkbox__control": {
                            color: "white",
                          },
                        }}
                        _checked={{
                          bg: "black",
                        }}
                        sx={{
                          ".chakra-checkbox__control": {
                            border: "none",
                            transition: "all 0.2s ease-in-out",
                            color: "black",
                          },
                          ".chakra-checkbox__control[data-checked]": {
                            color: "white",
                          },
                        }}
                      />
                      <Text fontSize="14px" ml="16px">
                        {t("Checkout.emailMeCheckbox")}
                      </Text>
                    </Flex>
                  )}
                />
              </FormControl>

              <FormControl mt="16px">
                <Input
                  {...register("contacts.phone", {
                    required: "Phone is required",
                    setValueAs: (value: string) => value.replace(/\D/g, ""),
                  })}
                  isRequired
                  type="tel"
                  placeholder={t("Checkout.phonePlaceholder")}
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
              >
                {t("Checkout.delivery.formTitle")}
              </Heading>

              <Controller
                name="delivery.region"
                control={control}
                rules={{ required: "Please select a delivery region" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(value) => {
                      // !!!!!!!!!!! КОСТЫЛЬ
                      if (value === "ukraine") {
                        setValue("delivery.country", "Ukraine")
                        setValue("delivery.type", "branch")
                      } else {
                        setValue("delivery.type", "address")
                        setValue("delivery.warehouse", "")
                      }
                      field.onChange(value)
                    }}
                    value={field.value as string | undefined}
                    fontWeight="600"
                    mt={["16px", "20px"]}
                  >
                    <VStack align="start">
                      <CustomRadio
                        value="ukraine"
                        label={t("Checkout.delivery.Ukraine.title")}
                      />
                      {deliveryRegion === "ukraine" && (
                        <>
                          <Select
                            {...register("delivery.type")}
                            onChange={(e) => {
                              setValue(
                                "delivery.type",
                                e.target.value as DeliveryTypeUkraine,
                              )
                              setWarehouseNumber("")
                              setWarehouseOptions([])
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
                            <option value="branch">
                              {t(
                                "Checkout.delivery.Ukraine.select.branchTitle",
                              )}
                            </option>
                            <option value="postomat">
                              {t(
                                "Checkout.delivery.Ukraine.select.postOfficeTitle",
                              )}
                            </option>
                            <option value="address">
                              {t(
                                "Checkout.delivery.Ukraine.select.addressDeliveryTitle",
                              )}
                            </option>
                          </Select>
                          <VStack w="100%" spacing={0}>
                            {/* City Selection */}
                            {deliveryMethod !== "address" && (
                              <FormControl mt="14px">
                                <FormLabel
                                  fontSize={["20px", "16px"]}
                                  fontWeight={["600", "700"]}
                                  mb="12px"
                                >
                                  {t(
                                    "Checkout.delivery.Ukraine.select.city.title",
                                  )}
                                </FormLabel>
                                <Input
                                  isRequired
                                  {...register("delivery.city", {
                                    setValueAs: (value: string) => value.trim(),
                                  })}
                                  placeholder={t(
                                    "Checkout.delivery.Ukraine.select.city.placeholder",
                                  )}
                                  border="1px solid #A4A2A2"
                                  color="#3A3A3A"
                                  fontSize="14px"
                                  padding="12px"
                                />
                              </FormControl>
                            )}

                            {/* Branch Selection */}
                            {deliveryMethod === "branch" && (
                              <BranchFormGroup
                                warehouses={warehouseOptions}
                                setWarehouses={setWarehouseOptions}
                                warehouseTypes={[
                                  "9a68df70-0267-42a8-bb5c-37f427e36ee4",
                                  "841339c7-591a-42e2-8233-7a0a00f0ed6f",
                                ]}
                                warehouseNumber={warehouseNumber}
                                setWarehouseNumber={setWarehouseNumber}
                                label={t(
                                  "Checkout.delivery.Ukraine.select.branch.title",
                                )}
                                placeholder={t(
                                  "Checkout.delivery.Ukraine.select.branch.placeholder",
                                )}
                                numberPlaceholder={t(
                                  "Checkout.delivery.Ukraine.select.branch.numberPlacehloder",
                                )}
                              />
                            )}
                            {deliveryMethod === "postomat" && (
                              <BranchFormGroup
                                warehouses={warehouseOptions}
                                setWarehouses={setWarehouseOptions}
                                warehouseTypes={[
                                  "f9316480-5f2d-425d-bc2c-ac7cd29decf0",
                                ]}
                                warehouseNumber={warehouseNumber}
                                setWarehouseNumber={setWarehouseNumber}
                                label={t(
                                  "Checkout.delivery.Ukraine.select.postOffice.title",
                                )}
                                placeholder={t(
                                  "Checkout.delivery.Ukraine.select.postOffice.placeholder",
                                )}
                                numberPlaceholder={t(
                                  "Checkout.delivery.Ukraine.select.postOffice.numberPlacehloder",
                                )}
                              />
                            )}
                            {deliveryMethod === "address" && (
                              <AddressFormGroup countryValue="Ukraine" />
                            )}
                          </VStack>
                        </>
                      )}

                      <CustomRadio
                        value="europe"
                        label={t("Checkout.delivery.europe.title")}
                        mt="1rem"
                      />
                      {deliveryRegion === "europe" && (
                        <AddressFormGroup apiEndpoint="/region/europe" />
                      )}
                      <CustomRadio
                        value="overseas"
                        label={t("Checkout.delivery.overseas.title")}
                        mt="1rem"
                      />
                      {deliveryRegion === "overseas" && (
                        <AddressFormGroup
                          regions={["americas", "oceania", "africa"]}
                        />
                      )}
                    </VStack>
                  </RadioGroup>
                )}
              />

              <FormControl mt="24px">
                <FormLabel
                  fontSize={["20px", "24px"]}
                  fontWeight={["600", "700"]}
                  mb="12px"
                >
                  {" "}
                  {t("Checkout.orderCommentTitle")}
                </FormLabel>
                <Textarea
                  {...register("comment", {
                    setValueAs: (value: string) => value.trim(),
                  })}
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
                <FormLabel fontSize="24px" fontWeight="700" mt="32px">
                  {" "}
                  {t("Checkout.paymentTitle")}
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
                >
                  {t("Checkout.cardPayment")}
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
                  {t("Checkout.placeOrder")}
                </Button>
              </Box>
            </Container>
          </FormProvider>
        </GridItem>

        <GridItem />

        <GridItem>
          {state.cartItems.length !== 0 && (
            <>
              <Heading
                fontSize={["20px", "24px"]}
                fontWeight={["600", "700"]}
                mb="1rem"
              >
                {t("Checkout.orderSummaryTitle")}
              </Heading>

              {state.cartItems.map((item, index) => {
                const itemTotal = item[productPrice] * item.count

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
                          />
                        </Box>
                      </GridItem>
                      <GridItem display="flex" flexDirection="column">
                        <Text
                          m={0}
                          mb="10px"
                          fontSize={["14px", "20px"]}
                          fontWeight={["600", "700"]}
                        >
                          {currentLang === "en" ? item.title_en : item.title_uk}
                        </Text>
                        <Text fontSize="1rem">{item.size}</Text>
                        <Flex
                          fontSize="1rem"
                          h="100%"
                          justifyContent="space-between"
                          alignItems="flex-end"
                        >
                          <ProductCounter
                            productId={item.id}
                            count={item.count}
                          />
                          <Box fontWeight="700">{itemTotal.toFixed(2)}</Box>
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
                  <Text>{t("Checkout.orderSubtotal")}</Text>
                  <Box>{subtotal}</Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>{t("Checkout.orderShipping")}</Text>
                  <Box>{deliveryPrice}</Box>
                </Flex>

                <Flex
                  justifyContent="space-between"
                  fontSize={["16px", "18px"]}
                  fontWeight={["600", "700"]}
                >
                  <Text>{t("Checkout.orderTotal")}</Text>
                  <Flex gap={[0, 4]} alignItems="center">
                    <Box
                      fontSize={["12px", "14px"]}
                      fontWeight="400"
                      color="#BBBBBB"
                    >
                      {t("Checkout.checkoutCurrency")}
                    </Box>
                    <Box>
                      {currentLang === "en" ? "$" : "₴"}
                      {total}
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
