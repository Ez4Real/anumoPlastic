import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Container, Flex, Text, Link } from "@chakra-ui/react";

export const Route = createFileRoute("/_main_layout/thank-you")({
  component: ThankYou,
})

function ThankYou() {
  const { t } = useTranslation();

  return (
  <Container>
    <Flex
      margin="224px 0"
      alignItems="center"
      flexDirection="column"
    >
      <Text
        fontSize={["19px", "20px"]}
        fontWeight="500"
        m={0}
      >{t('ThankYou.title')}!</Text>
      <Text fontSize="14px" pt="12px" pb="2rem">{t('ThankYou.info')}</Text>
      <Link
        as={RouterLink}
        to="/"
        fontSize="14px"
        fontWeight="600"
        color="black"
        style={{
          textUnderlinePosition: "under"
        }}
        
        
      >{t('ThankYou.mainPageLink')}</Link>
    </Flex>
  </Container>
  );
};