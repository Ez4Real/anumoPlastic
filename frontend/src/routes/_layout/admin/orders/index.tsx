import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    } from "@chakra-ui/react"
  import { useQuery, useQueryClient } from "@tanstack/react-query"
  import { createFileRoute, useNavigate } from "@tanstack/react-router"
  import { useEffect, useRef } from "react"
  import { z } from "zod"
  
  import { OrdersService } from "../../../../client"
  import { PaginationFooter } from "../../../../components/Common/PaginationFooter"
  import { useTranslation } from "react-i18next"
  import { FiFileText } from "react-icons/fi"
    
    const ordersSearchSchema = z.object({
      page: z.number().catch(1),
    })
    
    export const Route = createFileRoute("/_layout/admin/orders/")({
      component: Orders,
      validateSearch: (search) => ordersSearchSchema.parse(search),
    })
    
    const PER_PAGE = 9
    
    function getOrdersQueryOptions({ page }: { page: number }) {
      return {
        queryFn: () =>
          OrdersService.readOrders({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
        queryKey: ["orders", { page }],
      }
    }
    
    function OrdersTable() {
      const { t } = useTranslation();
      const queryClient = useQueryClient()
      const { page } = Route.useSearch()
      const scrollContainerRef = useRef<HTMLDivElement | null>(null);
      const scrollbarColor = useColorModeValue("ui.main", 'ui.dim')
      const navigate = useNavigate({ from: Route.fullPath })
  
      const setPage = (page: number) =>
        navigate({ search: (prev: {[key: number]: string}) => ({ ...prev, page }) })
    
      const {
        data: orders,
        isPending,
        isPlaceholderData,
      } = useQuery({
        ...getOrdersQueryOptions({ page }),
        placeholderData: (prevData) => prevData,
      })
    
      const hasNextPage = !isPlaceholderData && orders?.data.length === PER_PAGE
      const hasPreviousPage = page > 1
    
      useEffect(() => {
        if (hasNextPage) {
          queryClient.prefetchQuery(getOrdersQueryOptions({ page: page + 1 }))
        }
      }, [page, queryClient, hasNextPage])
  
      
      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
    
        const handleWheel = (evt: WheelEvent) => {
          evt.preventDefault();
          container.scrollLeft += evt.deltaY / 3;
        };
    
        container.addEventListener("wheel", handleWheel);
        return () => container.removeEventListener("wheel", handleWheel);
      }, []);
    
      return (
        <>
          <TableContainer
            ref={scrollContainerRef}
            sx={{
              "::-webkit-scrollbar-thumb": {
                background: scrollbarColor,
              },
            }}
          >
            <Table
              sx={{
                "th, td": { padding: "1rem 1rem" },
                "td.imagesHStack": { padding: ".25rem 1rem"}
              }}
            >
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>ID</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.date')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.status')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.invoiceId')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.customerName')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.deliveryRegion')}</Th>
                  <Th>Email</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.customerPhone')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.currency')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.amount')}</Th>
                  <Th>{t('AdminPanel.orders.tableHeads.products')}</Th>
                </Tr>
              </Thead>
              {isPending ? (
                <Tbody>
                  <Tr>
                    {new Array(4).fill(null).map((_, index) => (
                      <Td key={index}>
                        <SkeletonText noOfLines={1} paddingBlock="16px" />
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  {orders?.data.map((order) => {
                    const displayCurrency = order.currency === "USD" ? "$" : "₴";
                    const displayAmount = (order.amount / 100).toFixed(2);
                    return (
                      <Tr key={order.id} opacity={isPlaceholderData ? 0.5 : 1}>
                        <Td sx={{ padding: '0 !important' }}>
                          <Button
                            onClick={() => {
                              navigate({
                                to: '/admin/orders/$id',
                                params: { id: order.id },
                              });
                            }}
                            p=".5rem"
                          ><FiFileText /></Button>
                        </Td>
                        <Td>{order.id}</Td>
                        <Td isTruncated maxWidth="215px">
                          {new Date(order.created_at).toLocaleString()}
                        </Td>
                        <Td
                          isTruncated
                          maxWidth="150px"
                          textTransform="capitalize"
                        >
                          <Flex gap={2}>
                            <Box
                              w="2"
                              h="2"
                              borderRadius="50%"
                              bg={`paymentStatus.${order.payment_status}`}        
                              alignSelf="center"
                            />
                            {order.payment_status}
                          </Flex>
                          
                        </Td>
                        <Td>{ order.invoiceId }</Td>
                        <Td>{ order.contacts.first_name } { order.contacts.last_name }</Td>
                        <Td>{t(`AdminPanel.orders.delivery.regions.${order.delivery.region}`)}</Td>
                        <Td>{ order.contacts.email }</Td>
                        <Td>{ order.contacts.phone }</Td>
                        <Td>{ order.currency }</Td>
                        <Td>{displayCurrency}{displayAmount}</Td>
                        <Td className="imagesHStack">
                        <HStack spacing={1} >
                          { order.basketOrder.slice(0, 4).map((order, index) => (
                              <Box key={index}>
                                <Image
                                  src={order.icon}
                                  boxSize="60px"
                                  minW="60px"
                                  objectFit="cover"
                                  borderRadius="md"
                                />
                              </Box>
                            ))
                          }
                        </HStack>
                        </Td>
                      </Tr>
                  )})}
                </Tbody>
              )}
            </Table>
          </TableContainer>
          <PaginationFooter
            page={page}
            onChangePage={setPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </>
      )
    }
    
    function Orders() {
      const { t } = useTranslation();
      return (
        <Container maxW="full">
          <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={6} pb={2}>
              {t('AdminPanel.title.orders')}
          </Heading>
    
          <OrdersTable />
        </Container>
      )
    }
    