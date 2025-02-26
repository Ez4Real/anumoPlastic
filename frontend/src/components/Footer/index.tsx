import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Link,
  List,
  ListItem,
  VisuallyHidden,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import {
  type ApiError,
  type SubscriberCreate,
  SubscribersService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"
import SwitchLocalization from "../SwitchLocalization"

const Footer = () => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const showToast = useCustomToast()

  const methods = useForm<SubscriberCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  })

  const { register, handleSubmit } = methods

  const mutation = useMutation({
    mutationFn: async (data: SubscriberCreate) => {
      await SubscribersService.createSubscriber({ requestBody: data })

      showToast(
        t("HomePage.mailing.onSuccessToast.success"),
        t("HomePage.mailing.onSuccessToast.created"),
        "success",
      )
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
  })

  const onSubmit: SubmitHandler<SubscriberCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <Container as="footer" p={["180px 24px 80px", "90px 46px"]}>
      <Grid
        display={["flex", "grid"]}
        flexDirection={["column", "row"]}
        templateColumns="50% 50%"
      >
        <GridItem
          display={["flex", "block"]}
          flexDirection={["column-reverse", "row"]}
        >
          <Box mt={["48px", 0]} mb="48px">
            <Image src="/logo-black.svg" alt="Anumo Logo Black" h="24px" />
          </Box>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel fontSize="14px" fontWeight="400" m={0} mb={-2}>
                {t("Footer.newsletter")}
              </FormLabel>
              <Input
                {...register("email", {
                  setValueAs: (value: string) => value.trim(),
                })}
                type="email"
                isRequired
                border="none"
                borderBottom="1px solid black"
                placeholder={t("Footer.emailPlaceholder")}
                fontSize="14px"
                h="auto"
                w={["100%", "75%"]}
                p=".5rem 0"
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     // e.preventDefault();
                //     handleSubmit(onSubmit)();
                //   }
                // }}
              />
              <VisuallyHidden>
                <Button type="submit">Submit</Button>
              </VisuallyHidden>
            </FormControl>
          </Box>
        </GridItem>
        <GridItem display="flex" alignItems="end">
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
              <ListItem as={RouterLink} to="/privacy-policy/" display="block">
                {t("Footer.privacyPolicyLink")}
              </ListItem>
              <ListItem
                as={RouterLink}
                to="/payment-and-delivery/"
                display="block"
              >
                {t("Footer.paymentDeliveryLink")}
              </ListItem>
              <ListItem as={RouterLink} to="/returns-policy/" display="block">
                {t("Footer.returnsLink")}
              </ListItem>
            </List>
            {!isMobile && <SwitchLocalization />}
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
            className="Link"
            as={RouterLink}
            to="https://www.instagram.com/anumoplastic"
            isExternal
          >
            <span>INSTAGRAM</span>
          </Link>
          <Link
            className="Link"
            as={RouterLink}
            to="https://www.tiktok.com/@anumoplastic"
            isExternal
          >
            <span>TIKTOK</span>
          </Link>
        </Flex>
        {isMobile && <SwitchLocalization />}
      </Flex>
    </Container>
  )
}

export default Footer
