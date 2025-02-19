import {
    Badge,
    Box,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Image,
    Spinner,
    Text,
    useColorModeValue,
    VStack,
    } from "@chakra-ui/react"
  import { useQuery } from "@tanstack/react-query"
  import { createFileRoute } from "@tanstack/react-router"
//   import { useTranslation } from "react-i18next"
  import { ProductsService } from "../../../../client/services.ts"
  import { ProductPublic } from "../../../../client/models.ts"
import { OpenAPI } from "../../../../client/index.ts"
    
    
  export const Route = createFileRoute("/_layout/admin/products/$id")({
    component: Product
  })
    
    
    function getProductQueryOptions({ id }: { id: string }) {
      return {
        queryFn: () =>
          ProductsService.readProductById({ id }),
        queryKey: ["product"],
      }
    }
  
  
function Product() {
    const { id } = Route.useParams<{ id: string }>();
    // const { t } = useTranslation();
    const scrollbarColor = useColorModeValue("ui.main", 'ui.dim')
    
    const {
        data: product,
        isPending,
    } = useQuery<ProductPublic, Error>({
        ...getProductQueryOptions({ id }),
    });
    
    if (isPending || !product) {
        return (
        <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner boxSize={100} speed="1s" color="ui.main" />
        </Flex>
        );
    }

    return (
        <Container maxW="full" maxH="100vh" overflow="hidden" px={2}>
            <Grid
            templateColumns={["1fr", "1fr auto 1fr"]}
            gap={4}
            >
              <Box
                overflowY="auto"
                maxH="100vh"
                mt={4}
                p="0 0 24px 8px"
                
                sx={{
                    '::-webkit-scrollbar-thumb':{
                      background: scrollbarColor,
                      position: "relative",
                      left: "50px"
                    },
                    "direction": "rtl"
                }}
            >
                {/* Left: Product Images */}
                <Grid
                    templateColumns={["1fr", "repeat(2, 1fr)"]}
                    gap={3}
                >
                {product.images?.length ? (
                    product.images.map((img, index) => (
                    <GridItem
                      h="300px"
                      w="100%"
                      key={index}
                    >
                        <Image
                            src={`${OpenAPI.BASE}${img.url}`}
                            alt={product.title_en}
                            shadow="md"
                            borderRadius=".5rem"
                            w="100%"
                            h="100%"
                            objectFit="cover"
                        />
                    </GridItem>
                    ))
                ) : (
                    <Text>No images available</Text>
                )}
                </Grid>
              </Box>

            <GridItem>
                <Divider orientation="vertical" height="100%" borderWidth="1px" borderColor="gray.300" />
            </GridItem>
    
            {/* Right: Product Details */}
            <VStack
              align="start"
              spacing={4}
              pt={[0, "1.5rem"]}
            >
                <Flex
                  align="center"
                  gap={2}
                >
                    <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="14px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                        >
                        CATEGORY: 
                    </Text>
                    <Badge colorScheme="blue" px={2} py={1} rounded="md">
                        {product.category}
                    </Badge>
                        {product.tag && (<> -
                      <Badge colorScheme="green" px={2} py={1} rounded="md">
                        {product.tag}
                      </Badge>
                    </>
                    )}
                </Flex>
                <Flex
                  align="center"
                  gap={2}
                >
                    <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="14px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                        >
                        Order ID: 
                    </Text>
                    <Badge
                        borderRadius="4px"
                        fontSize="1em"
                    >{ product.id }
                    </Badge>
                </Flex>
                <Flex
                    alignItems="flex-start"
                    gap={2}
                >
                    <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="14px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                        minWidth="5rem"
                    >
                        EN NAME: 
                    </Text>
                    <Text fontSize="16px" fontWeight="bold">
                        {product.title_en}
                    </Text>
                </Flex>
                <Flex
                    alignItems="flex-start"
                    gap={2}
                >
                    <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="14px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                        minWidth="5rem"
                    >
                        UK NAME: 
                    </Text>
                    <Text fontSize="16px" fontWeight="bold">
                        {product.title_uk}
                    </Text>
                </Flex>
                <Grid
                  w="100%"
                  templateColumns={["1fr", "repeat(2, 1fr)"]}
                  rowGap={4}
                >
                    <Flex
                      align="center"
                      gap={2}
                    >
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            USD: 
                        </Text>
                        <Text fontSize="lg" fontWeight="bold">
                            ${product.price_usd}
                        </Text>
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                    >
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            UAH: 
                        </Text>
                        <Text fontSize="lg" fontWeight="bold">
                          ₴{product.price_uah}
                        </Text>
                    </Flex>

                    <Flex direction="column">
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            EN MATERIAL
                        </Text>
                        <Text fontSize={["14px", "16px"]}>
                            {product.material_en}
                        </Text>
                    </Flex>
                    <Flex direction="column">
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            UK MATERIAL
                        </Text>
                        <Text fontSize={["14px", "16px"]}>
                            {product.material_uk}
                        </Text>
                    </Flex>
                    <Flex direction="column">
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            EN SIZE
                        </Text>
                        <Text fontSize={["14px", "16px"]}>
                            {Array.isArray(product.size_en) ? product.size_en.join(", ") : product.size_en}
                        </Text>
                    </Flex>
                    <Flex direction="column">
                        <Text
                            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                            fontSize="14px"
                            fontWeight="700"
                            letterSpacing="0.05em"
                            color="#A0AEC0"
                            >
                            UK SIZE
                        </Text>
                        <Text fontSize={["14px", "16px"]}>
                            {Array.isArray(product.size_uk) ? product.size_uk.join(", ") : product.size_uk}
                        </Text>
                    </Flex>
                    { product.weight_en && product.weight_uk && (<>
                        <Flex direction="column">
                            <Text
                                fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                                fontSize="14px"
                                fontWeight="700"
                                letterSpacing="0.05em"
                                color="#A0AEC0"
                                >
                                EN WEIGHT
                            </Text>
                            <Text fontSize={["14px", "16px"]}>
                                {product.weight_en}
                            </Text>
                        </Flex>
                        <Flex direction="column">
                            <Text
                                fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                                fontSize="14px"
                                fontWeight="700"
                                letterSpacing="0.05em"
                                color="#A0AEC0"
                                >
                                UK WEIGHT
                            </Text>
                            <Text fontSize={["14px", "16px"]}>
                                {product.weight_uk}
                            </Text>
                        </Flex>
                    </>)}
                </Grid>

                <Divider />
        
                <Text fontSize="sm" color="gray.500">
                    Created At: {new Date(product.created_at).toLocaleString()}
                </Text>
            </VStack>
        </Grid>
        </Container>
    );
}
        
export default Product;