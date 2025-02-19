import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
  } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { OrdersService } from "../../../../client/services.ts"
import { OrderPublic } from "../../../../client/models.ts"
  
  
export const Route = createFileRoute("/_layout/admin/orders/$id")({
  component: Order
})
  

function getOrderQueryOptions({ id }: { id: string }) {
  return {
    queryFn: () =>
      OrdersService.readOrderById({ id }),
    queryKey: ["order"],
  }
}

function Order() {
  const { id } = Route.useParams<{ id: string }>();
  const { t } = useTranslation();
  const scrollbarColor = useColorModeValue("ui.main", 'ui.dim')

  const {
    data: order,
    isPending,
  } = useQuery<OrderPublic, Error>({
    ...getOrderQueryOptions({id: id})
  })
  
  if (isPending || !order) {
    return (
      <Flex justify="center" align="center" height="100vh" width="full">
        <Spinner boxSize={100} speed="1s" color="ui.main" />
      </Flex>
    );
  }

    const displayCurrency = order.currency === "USD" ? "$" : "₴";
    const displayAmount = (order.amount / 100).toFixed(2);

    return (

      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={6} pb={2}>
          Order Details
        </Heading>
        
        <Divider />
        
        <Flex justify="space-between" align="center" mt={2}>
          <Text
            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
            fontSize="14px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.05em"
            color="#A0AEC0"
            >
            Order ID: { order.id }
          </Text>
          <Badge
            bg="#8c9baeba"
            color={`paymentStatus.${order.payment_status}`}
            borderRadius="8px"
            fontSize="1em"
          >{order.payment_status.toUpperCase()}
          </Badge>
        </Flex>
        <Flex justify="space-between" align="center" mt={2}>
          <Text
            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
            fontSize="14px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.05em"
            color="#A0AEC0"
          >
            Invoice ID: {order.invoiceId}
          </Text>
          <Text color="gray.500">
            Created: {new Date(order.created_at).toLocaleString()}
          </Text>
        </Flex>
       
        <Box
          border="1px solid"
          borderRadius="12px"
          mt="1rem"
        >
          <Grid
            display={["flex", "grid"]}
            flexDirection={["column", "row"]}
            templateColumns="1fr 1fr 1fr"
          >
            <GridItem>
              {/* Payment Info */}
              <VStack
                h="100%"
                p="1rem"
                spacing={2}
                justifyContent="space-between"
              >
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontSize="lg" fontWeight="bold">Currency:</Text>
                  <Badge fontSize="lg">
                    { order.currency }
                  </Badge>
                </Flex>
              </VStack>
            </GridItem>
            {/* Customer Info */}
            <GridItem>
              <VStack align="start" p="1rem" spacing={2}>
                <Text fontSize="lg" fontWeight="bold">Customer Info:</Text>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Name:</Text>
                  <Text>{order.contacts.first_name} {order.contacts.last_name}</Text>
                </Flex>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Email:</Text>
                  <Text>{order.contacts.email}</Text>
                </Flex>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Phone:</Text>
                  <Text>{order.contacts.phone}</Text>
                </Flex>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Mailing:</Text>
                  <Flex gap={2}>
                    <Box
                      w="2"
                      h="2"
                      borderRadius="50%"
                      bg={order.mailing ? "ui.success" : "ui.danger"}
                      alignSelf="center"
                    />
                    {order.mailing ? "Active" : "Inactive"}
                  </Flex>
                </Flex>
              </VStack>
            </GridItem>
            {/* Delivery Info */}
            <GridItem>
              <VStack align="start" p="1rem" spacing={2}>
                <Text fontSize="lg" fontWeight="bold">Delivery:</Text>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Region:</Text>
                  <Text>{t(`AdminPanel.orders.delivery.regions.${order.delivery.region}`)}</Text>
                </Flex>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Type:</Text>
                  <Text>{t(`AdminPanel.orders.delivery.types.${order.delivery.type}`)}</Text>
                </Flex>
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    color="#A0AEC0"
                  >Country:</Text>
                  <Text>{order.delivery.country}</Text>
                </Flex>
                { order.delivery.type === "address" && (
                <>
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="14px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >Street Adress:</Text>
                    <Text>{order.delivery.streetAddress}</Text>
                  </Flex>
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="14px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >Postal Code:</Text>
                    <Text>{order.delivery.postalCode}</Text>
                  </Flex>
                </>
                )}
              </VStack> 
            </GridItem>
          </Grid>
          { order.delivery.type !== "address" && (
            <Flex
              w="100%"
              alignItems="center"
              px="1rem"
              gap="2rem"
            >
              <Text
                fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                fontSize="14px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.05em"
                color="#A0AEC0"
              >{order.delivery.type}</Text>
              <Text>{order.delivery.warehouse}</Text>
            </Flex>
          )}
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            p="0 1rem 1rem"
          >
            <Text fontSize="lg" fontWeight="bold">Total Amount:</Text>
            <Text fontSize="xl" fontWeight="bold">
              {displayCurrency}{displayAmount}
            </Text>
          </Flex>
        </Box>
        

        { order.comment && (
          <Text
            fontSize="lg"
            mt={4}
            fontWeight="bold"
          >Comment: {order.comment}</Text>
        )}
        

        {/* Order Items */}
        <Text
          fontSize="lg"
          fontWeight="bold"
          mt={2}
        >Products:</Text>
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr"]}
          gap={4}
          overflowY="auto"
          maxH="330px"
          py=".5rem"
          sx={{
            '::-webkit-scrollbar-thumb':{
              background: scrollbarColor,
            },               
          }}
        >
          {order.basketOrder.map((item, index) => (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              align="center">
              <Box
                boxSize="90px"
                minW="90px"
              >
                <Image
                  w="100%" h="100%"
                  src={item.icon}
                  objectFit="cover"
                  borderRadius="md" />
              </Box>
              <Box p=".5rem 1rem" maxW="350px">
                <Text fontWeight="bold">{item.name}</Text>
                <Text>Qty: {item.qty} {item.unit} | Price: {(item.sum / 100).toFixed(2)} {order.currency}</Text>
              </Box>
            </Flex>
          ))}
        </Grid>

        
    {/* </Box> */}
    </Container>
    )
  }
  