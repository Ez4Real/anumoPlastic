import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Container, Text, VStack, OrderedList, ListItem, UnorderedList, Heading } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb";
import { OpenAPI } from "../../client";

export const Route = createFileRoute("/_main_layout/privacy-policy")({
  component: ThankYou,
})

function ThankYou() {
  const { t } = useTranslation();

  return (
  <Container px={["24px", "48px"]}>
    <BreadCrumb pageName={t('PrivacyPolicy.pageName')} />
    
    <VStack
      fontSize={["16px", "18px"]}
      alignItems="flex-start"
      spacing={0}
    >
      <OrderedList my={0}>
        <ListItem>{t("PrivacyPolicy.rules.1")}</ListItem>
        <ListItem>{t("PrivacyPolicy.rules.2")}</ListItem>
      </OrderedList>

      <UnorderedList
        styleType='none'
        m={0}
        mt="16px"
      >
        <ListItem>Mail address: ...</ListItem>
        <ListItem>Visiting address: ....</ListItem>
        <ListItem>Phone: ....</ListItem>
        <ListItem>E-mail: ....</ListItem>
      </UnorderedList>

    
      <Heading
        fontWeight="600"
        fontSize={["16px", "18px"]}
        lineHeight="19px"
        mt='20px'
      >1. {t("PrivacyPolicy.dataPolicy.personalDetails.title")}</Heading>
      
      <Text mt="16px">
        <Heading
          as="span"
          fontWeight="600"
          fontSize={["16px", "18px"]}
          lineHeight="19px"
        >
          {t("PrivacyPolicy.dataPolicy.personalDetails.contactDetails.title")}:
        </Heading>{" "}
        {t("PrivacyPolicy.dataPolicy.personalDetails.contactDetails.policy")}:
      </Text>

      <UnorderedList styleType='none' m={0} mt="16px" spacing="16px">
        <ListItem>1) {t("PrivacyPolicy.dataPolicy.personalDetails.contactDetails.1")}</ListItem>
        <ListItem>
          2) {t("PrivacyPolicy.dataPolicy.personalDetails.contactDetails.2")} {" "}
          <Text
            as="span"
            textDecoration="underline"
            sx={{ textUnderlinePosition: "under" }}
          >{ OpenAPI.ANUMO_EMAIL }</Text>
        </ListItem>
      </UnorderedList>

      <Text mt="16px">
        <Heading
          as="span"
          fontWeight="600"
          fontSize={["16px", "18px"]}
          lineHeight="19px"
        >
          {t("PrivacyPolicy.dataPolicy.personalDetails.creditCardDetails.title")}:
        </Heading>{" "}
        {t("PrivacyPolicy.dataPolicy.personalDetails.creditCardDetails.policy")}
      </Text>

      <Heading
        fontWeight="600"
        fontSize={["16px", "18px"]}
        lineHeight="19px"
        mt='20px'
      >2. {t("PrivacyPolicy.dataPolicy.newsletter.title")}</Heading>

      <Text mt="16px">
        {t("PrivacyPolicy.dataPolicy.newsletter.policy")} {" "}
        <Text
          as="span"
          textDecoration="underline"
          sx={{ textUnderlinePosition: "under" }}
        >{ OpenAPI.ANUMO_EMAIL }</Text>
      </Text>

    </VStack>
  </Container>
  );
};