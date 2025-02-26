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
  Text,
  Textarea,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import BreadCrumb from "../../components/BreadCrumb"

export const Route = createFileRoute("/_main_layout/contact-us")({
  component: ContactUs,
})

function ContactUs() {
  const { t } = useTranslation()

  return (
    <Container className="content">
      <BreadCrumb pageName={t("ContactUs.pageName")} />

      <Grid
        display={["flex", "grid"]}
        flexDirection={["column-reverse", "row"]}
        gridTemplateColumns={"1fr 1fr"}
        gap={["1rem", "13.5rem"]}
      >
        <GridItem>
          <Container as="form" p="0 !important">
            <Box>
              <Text fontWeight="700" fontSize="14px" mb="6px">
                {t("ContactUs.nameLabel")}
              </Text>
              <Flex gap="25px">
                <FormControl>
                  <Input
                    border="1px solid #A4A2A2"
                    fontSize="14px"
                    padding="12px"
                    width="-webkit-fill-available"
                    w="100%"
                  />
                  <FormLabel
                    fontSize="10px"
                    fontWeight="400"
                    color="#6E6E70"
                    mt="6px"
                    mb={0}
                  >
                    {t("ContactUs.firstNameLabel")}
                  </FormLabel>
                </FormControl>
                <FormControl>
                  <Input
                    border="1px solid #A4A2A2"
                    fontSize="14px"
                    padding="12px"
                    width="-webkit-fill-available"
                    w="100%"
                  />
                  <FormLabel
                    fontSize="10px"
                    fontWeight="400"
                    color="#6E6E70"
                    mt="6px"
                    mb={0}
                  >
                    {t("ContactUs.lastNameLabel")}
                  </FormLabel>
                </FormControl>
              </Flex>
            </Box>
            <FormControl mt="20px">
              <FormLabel fontWeight="700" fontSize="14px" mb="6px">
                {t("ContactUs.emailLabel")}
              </FormLabel>
              <Input
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
              />
            </FormControl>
            <FormControl mt="20px">
              <FormLabel fontWeight="700" fontSize="14px" mb="6px">
                {t("ContactUs.subjectLabel")}
              </FormLabel>
              <Input
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
              />
            </FormControl>
            <FormControl mt="20px">
              <FormLabel fontWeight="700" fontSize="14px" mb="10px">
                {t("ContactUs.messageLabel")}
              </FormLabel>
              <Textarea
                resize="none"
                fontSize="14px"
                border="1px solid rgb(164, 162, 162)"
                minH="240px"
                w="100%"
                p="12px"
              />
            </FormControl>
            <Box textAlign="end" mt="30px">
              <Button
                type="submit"
                variant="unstyled"
                fontSize="14px"
                fontWeight="700"
                textDecoration="underline"
              >
                {t("ContactUs.submitLabel")}
              </Button>
            </Box>
          </Container>
        </GridItem>
        <Grid gridTemplateColumns={"1fr 1fr"} gap={["25px", 0]}>
          <GridItem order={[2, 1]}>
            <Box>
              <Image src="/contact-us.png" alt="Anumo Carabiner" />
            </Box>
          </GridItem>
          <GridItem order={[1, 2]} />
        </Grid>
      </Grid>
    </Container>
  )
}
