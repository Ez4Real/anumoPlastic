import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Container, Text, VStack, ListItem, UnorderedList, Heading } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb";
import { OpenAPI } from "../../client";

export const Route = createFileRoute("/_main_layout/payment-and-delivery")({
  component: ThankYou,
})

function ThankYou() {
  const { t } = useTranslation();

  return (
  <Container px={["24px", "48px"]}>
    <BreadCrumb pageName={t('PaymentAndDelivery.pageName')} />
    
    <VStack
      fontSize={["16px", "18px"]}
      alignItems="flex-start"
      spacing={0}
    >
      <Heading
        fontSize={["16px", "18px"]}
        fontWeight="600"
      >{t('PaymentAndDelivery.Ukraine.title')}:</Heading>
      <Text mt="10px">
        {t('PaymentAndDelivery.Ukraine.info')}
      </Text>

      <Heading
        fontSize={["16px", "18px"]}
        fontWeight="600"
        mt="16px"
      >{t('PaymentAndDelivery.international.title')}:</Heading>
      <Text mt="10px">
        {t('PaymentAndDelivery.international.info')}
      </Text>

      <UnorderedList spacing={6}>
        <ListItem>{t('PaymentAndDelivery.international.cost')}</ListItem>
        <ListItem fontWeight="600">{t('PaymentAndDelivery.international.exclude')}</ListItem>
      </UnorderedList>

      <Text mt="6px">
        {t('PaymentAndDelivery.general')}{ OpenAPI.ANUMO_EMAIL }.
      </Text>
    </VStack>
  </Container>
  );
};