import { Container, Heading, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { OpenAPI } from "../../client"
import BreadCrumb from "../../components/BreadCrumb"

export const Route = createFileRoute("/_main_layout/returns-policy")({
  component: ThankYou,
})

function ThankYou() {
  const { t } = useTranslation()

  return (
    <Container px={["24px", "48px"]}>
      <BreadCrumb pageName={t("RefundPolicy.pageName")} />

      <VStack fontSize={["16px", "18px"]} spacing={0} alignItems="flex-start">
        <Text>{t("RefundPolicy.shanovni")},</Text>

        <Heading fontSize={["16px", "18px"]} fontWeight="600" mt="16px">
          {t("RefundPolicy.returnPeriod.title")}
        </Heading>
        <VStack mt="10px" spacing="10px" alignItems="flex-start">
          <Text>{t("RefundPolicy.returnPeriod.info.1")}</Text>
          <Text>
            {t("RefundPolicy.returnPeriod.info.2")}
            {OpenAPI.ANUMO_EMAIL}.
          </Text>
          <Text>{t("RefundPolicy.returnPeriod.info.3")}</Text>
        </VStack>

        <Heading fontSize={["16px", "18px"]} fontWeight="600" mt="16px">
          {t("RefundPolicy.damagesAndIssues.title")}
        </Heading>
        <Text mt="10px">{t("RefundPolicy.damagesAndIssues.info")}</Text>

        <Heading fontSize={["16px", "18px"]} fontWeight="600" mt="16px">
          {t("RefundPolicy.exceptions.title")}
        </Heading>
        <VStack mt="10px" spacing="10px" alignItems="flex-start">
          <Text>{t("RefundPolicy.exceptions.info.1")}</Text>
          <Text>{t("RefundPolicy.exceptions.info.2")}</Text>
        </VStack>

        <Heading fontSize={["16px", "18px"]} fontWeight="600" mt="16px">
          {t("RefundPolicy.exchanges.title")}
        </Heading>
        <VStack mt="10px" spacing="10px">
          <Text>{t("RefundPolicy.exchanges.info.1")}</Text>
          <Text>{t("RefundPolicy.exchanges.info.2")}</Text>
        </VStack>

        <Heading fontSize={["16px", "18px"]} fontWeight="600" mt="16px">
          {t("RefundPolicy.refunds.title")}
        </Heading>
        <VStack mt="10px" spacing="10px" alignItems="flex-start">
          <Text>{t("RefundPolicy.refunds.info.1")}</Text>
          <Text>
            {t("RefundPolicy.refunds.info.2")}
            {OpenAPI.ANUMO_EMAIL}.
          </Text>
        </VStack>
      </VStack>
    </Container>
  )
}
