import {
    Box,
    Container,
    Flex,
    Heading,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react"
  import { useQuery, useQueryClient } from "@tanstack/react-query"
  import { createFileRoute, useNavigate } from "@tanstack/react-router"
  import { useEffect } from "react"
  import { z } from "zod"
  
  import { SubscribersService } from "../../../client/index.ts"
  import { PaginationFooter } from "../../../components/Common/PaginationFooter.tsx"
import { useTranslation } from "react-i18next"
  
  const subscribersSearchSchema = z.object({
    page: z.number().catch(1),
  })
  
  export const Route = createFileRoute("/_layout/admin/subscribers")({
    component: Subscribers,
    validateSearch: (search) => subscribersSearchSchema.parse(search),
  })
  
  const PER_PAGE = 9
  
  function getSubscribersQueryOptions({ page }: { page: number }) {
    return {
      queryFn: () =>
        SubscribersService.readSubscribers({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
      queryKey: ["subscribers", { page }],
    }
  }
  
  function SubscribersTable() {
    const { t } = useTranslation();
    const queryClient = useQueryClient()
    const { page } = Route.useSearch()
    const navigate = useNavigate({ from: Route.fullPath })
    const setPage = (page: number) =>
      navigate({ search: (prev: {[key: number]: string}) => ({ ...prev, page }) })
  
    const {
      data: subscribers,
      isPending,
      isPlaceholderData,
    } = useQuery({
      ...getSubscribersQueryOptions({ page }),
      placeholderData: (prevData) => prevData,
    })
  
    const hasNextPage = !isPlaceholderData && subscribers?.data.length === PER_PAGE
    const hasPreviousPage = page > 1
  
    useEffect(() => {
      if (hasNextPage) {
        queryClient.prefetchQuery(getSubscribersQueryOptions({ page: page + 1 }))
      }
    }, [page, queryClient, hasNextPage])
  
    return (
      <>
        <TableContainer>
          <Table size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>{t('AdminPanel.subscribers.tableHeads.language')}</Th>
                <Th>{t('AdminPanel.subscribers.tableHeads.status')}</Th>
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
                {subscribers?.data.map((subscriber) => (
                  <Tr key={subscriber.id} opacity={isPlaceholderData ? 0.5 : 1}>
                    <Td>{subscriber.id}</Td>
                    <Td isTruncated maxWidth="200px">
                      {subscriber.email}
                    </Td>
                    <Td
                      color={!subscriber.mailing_language ? "ui.dim" : "inherit"}
                      isTruncated
                      maxWidth="150px"
                    >
                    {subscriber.mailing_language
                      ? { en: "English", uk: "Ukrainian" }[subscriber.mailing_language]
                      : "N/A"}
                    </Td>
                    <Td>
                    <Flex gap={2}>
                      <Box
                        w="2"
                        h="2"
                        borderRadius="50%"
                        bg={subscriber.is_active ? "ui.success" : "ui.danger"}
                        alignSelf="center"
                      />
                      {subscriber.is_active ? "Active" : "Inactive"}
                    </Flex>
                  </Td>
                  </Tr>
                ))}
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
  
  function Subscribers() {
    const { t } = useTranslation();
    return (
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12} pb={2}>
         {t('AdminPanel.title.subscribers')}
        </Heading>
  
        <SubscribersTable />
      </Container>
    )
  }
  