import { useEffect, useRef } from "react"
import {
  Box,
  Container,
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
import { useTranslation } from 'react-i18next';
import { z } from "zod"

import { ProductsService } from "../../../client/index.ts"
import ActionsMenu from "../../../components/Common/ActionsMenu.tsx"
import Navbar from "../../../components/Common/Navbar.tsx"
import AddProduct from "../../../components/Products/AddProduct.tsx"
import { PaginationFooter } from "../../../components/Common/PaginationFooter.tsx"
import { OpenAPI } from "../../../client"

const productsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/admin/products")({
  component: Products,
  validateSearch: (search) => productsSearchSchema.parse(search),
})

const PER_PAGE = 10

function getProductsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ProductsService.readProducts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["products", { page }],
  }
}

function ProductsTable() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollbarColor = useColorModeValue("ui.main", 'ui.dim')
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({search: (prev: { [key: number]: string }) => ({...prev, page: page }),
  });
  

  const {
    data: products,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getProductsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  
  const hasNextPage = !isPlaceholderData && products?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getProductsQueryOptions({ page: page + 1 }))
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
      <TableContainer ref={scrollContainerRef} 
        sx={{
          "::-webkit-scrollbar-thumb": {
            background: scrollbarColor,
          },
        }}
      >
        <Table size={{ base: "sm", md: "md" }}
          sx={{
            "th, td": { padding: "1rem 1rem" },
            "td.imagesHStack": { padding: "0 1rem"}
          }}
        >
          <Thead>
            <Tr>
              <Th></Th>
              <Th>ID</Th>
              <Th>{t('AdminPanel.products.tableHeads.category')}</Th>
              <Th>{t('AdminPanel.products.tableHeads.title')}</Th>
              <Th>Images</Th>
              <Th>USD</Th>
              <Th>UAH</Th>
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
              {products?.data.map((product) => (
                <Tr key={product.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td sx={{ padding: '1rem .25rem !important' }}>
                    <ActionsMenu type={"Product"} value={product} />
                  </Td>
                  <Td>{product.id}</Td>
                  <Td isTruncated maxWidth="135px">
                    {product.category}
                  </Td>
                  <Td isTruncated maxWidth="225px">
                    {currentLang === 'en' && product.title_en}
                    {currentLang === 'ua' && product.title_uk}
                  </Td>
                  <Td className="imagesHStack">
                    <HStack spacing={1} >
                      {product.images && product.images.length > 0 ? (
                        product.images.slice(0, 4).map((img, index) => (
                          <Box key={index}>
                            <Image
                              src={`${OpenAPI.BASE}${img.url}`}
                              boxSize="60px"
                              minW="60px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                          </Box>
                        ))
                      ) : (
                        "N/A"
                      )}
                    </HStack>
                  </Td>
                  <Td maxWidth="125px">
                    ${product.price_usd.toFixed(2)}
                  </Td>
                  <Td maxWidth="125px">
                    ₴{product.price_uah.toFixed(2)}
                  </Td>

                  {/* Not Required Field!!!
                  <Td
                    color={!product.description ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {product.description || "N/A"}
                  </Td> */}
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

function Products() {
  const { t } = useTranslation();

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={6}>
        {t('AdminPanel.title.products')}
      </Heading>

      <Navbar type={"Product"} addModalAs={AddProduct} />
      <ProductsTable />
    </Container>
  )
}
