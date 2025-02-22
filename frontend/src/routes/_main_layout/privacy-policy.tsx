import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Container, Text, VStack, Heading } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb";

export const Route = createFileRoute("/_main_layout/privacy-policy")({
  component: ThankYou,
})

function ThankYou() {
  const { t } = useTranslation();

  return (
  <Container px={["24px", "48px"]}>
    <BreadCrumb pageName={t('PrivacyPolicy.pageName')} />
    
    <Heading
      fontWeight="700"
      fontSize={["14px", "16px"]}
      lineHeight="17px"
    >ANUMO</Heading>
    <VStack
      fontSize={["16px", "18px"]}
      alignItems="flex-start"
      spacing="10px"
      mt="10px"
    >
      

      <Text>{t('PrivacyPolicy.rules.1')}</Text>
      <Text>{t('PrivacyPolicy.rules.2')}</Text>
      <Text>{t('PrivacyPolicy.rules.3')}</Text>
      <Text>{t('PrivacyPolicy.rules.4')}</Text>
      <Text>{t('PrivacyPolicy.rules.5')}</Text>
      
      
    </VStack>
  </Container>
  );
};