import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Container, Text, VStack, ListItem, UnorderedList, Heading } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb";

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
      <Text>
        {t('PaymentAndDelivery.shanovni')},
      </Text>
      <Text mt="16px">
        {t('PaymentAndDelivery.general')}
      </Text>

      <UnorderedList>
        <ListItem fontWeight="600">{t('PaymentAndDelivery.delivery.exclude')}</ListItem>
      </UnorderedList>

      <Heading
        fontSize={["16px", "18px"]}
        fontWeight="600"
      >{t('PaymentAndDelivery.delivery.international.title')}:</Heading>
      <Text mt="16px">
        {t('PaymentAndDelivery.delivery.international.info')}
      </Text>

      <UnorderedList>
        <ListItem>{t('PaymentAndDelivery.delivery.international.cost.standard')}</ListItem>
        <ListItem>{t('PaymentAndDelivery.delivery.international.cost.express')}</ListItem>
      </UnorderedList>

      <Heading
        fontSize={["16px", "18px"]}
        fontWeight="600"
      >{t('PaymentAndDelivery.delivery.Ukraine.title')}:</Heading>
      <Text mt="16px">
        {t('PaymentAndDelivery.delivery.Ukraine.info')}
      </Text>

    </VStack>
  </Container>
  );
};