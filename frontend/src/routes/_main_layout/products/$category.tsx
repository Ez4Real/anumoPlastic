import { 
  Box,
  Flex,
  Spinner,
  Grid,
  GridItem,
  Image,
  Button,
  Text,
  Container,
} from '@chakra-ui/react';
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from 'react-i18next';

import { ProductPublic, ProductsService } from '../../../client/index.ts';
import BreadCrumb from '../../../components/BreadCrumb/index.jsx';
import { OpenAPI, CarabinerTags } from "../../../client"
import { useEffect, useMemo, useState } from 'react';


export const Route = createFileRoute("/_main_layout/products/$category")({
  component: Product
});

function getProductsByCategoryQueryOptions({ category }: { category: string }) {
  return {
    queryFn: () =>
      ProductsService.readProductsByCategory({ category }),
    queryKey: ["products", { category }],
  };
}


function Product() {
  const { category } = Route.useParams<{ category: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const apiBaseUrl = OpenAPI.BASE

  const {data: products, isPending } = useQuery({
    ...getProductsByCategoryQueryOptions({ category }),
  })

  const [product, setProduct] = useState<ProductPublic | undefined>(undefined)
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0)
  const [tag, setTag] = useState<CarabinerTags | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (products && products.count > 0) {
      const initialProduct  = products.data[0];
      setProduct(initialProduct );
      if (initialProduct.images) setPreviewImageIndex(0)
      if (initialProduct.tag) setTag(initialProduct.tag)
      if (Array.isArray(initialProduct.size_en)) {
        setSize(initialProduct.size_en[0])
      } else {
        setSize(initialProduct.size_en)
      }
    }
  }, [products]);


  const productsByTag = useMemo(() => {
    if (!products || !products.data) return {};
    
    return products.data.reduce((acc, item) => {
      if (item.tag) {
        acc[item.tag] = item;
      }
      return acc;
    }, {} as Record<string, ProductPublic>);
  }, [products]);

  const handleTagSelection = (selectedTag: CarabinerTags) => {
    const matchedProduct = productsByTag[selectedTag];
    if (matchedProduct) {
      setProduct(matchedProduct);
      setPreviewImageIndex(0)
      setTag(selectedTag); 
    }
  };


  if (isPending) {
    return (
      <Flex justify="center" align="center" height="100vh" width="full">
        <Spinner boxSize={100} speed="1s" color="ui.main" />
      </Flex>
    );
  }

  return (
    <Container id='content' p="0 46px">
        <BreadCrumb pageName={category} />
        {product && (
          <Box>
            <Grid
              key={product.id}
              templateColumns="348px 444px 327px"
              gap="30px"
            >
              {product.images && (
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap="12px"
                  autoRows="206px"
                >
                  {product.images.map((image, index) => (
                    <GridItem
                      key={index}
                      onClick={() => setPreviewImageIndex(index)}
                      cursor="pointer"
                    >
                      <Image
                        src={`${apiBaseUrl}${image.url}`}
                        alt={product.category}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        opacity={previewImageIndex != index ? ".5" : "none"}
                      />
                    </GridItem>
                  ))}
                </Grid>
              )}


              <Box h="548px">
                {product.images && (
                  <Image
                    src={`${apiBaseUrl}${product.images[previewImageIndex].url}`}
                    alt={product.category}
                    objectFit="cover"
                    boxSize="100%"
                  />
                )}
              </Box>

              <Flex direction="column" fontSize="16px">
                <Text fontSize="20px" fontWeight="700" mt={0} mb="16px">
                  {currentLang === "en" ? product.title_en : product.title_uk}
                </Text>

                <Box pb="12px">
                  <Text fontSize="18px" fontWeight="700" mt={0} mb="8px">
                    {t("Product.material")}:
                  </Text>
                  {currentLang === "en" ? product.material_en : product.material_uk}
                </Box>

                {product.category === "Carabiner" && product.tag && (
                  <Box pb="12px">
                    <Text fontSize="18px" fontWeight="700" mt={0} mb="8px">
                      Tag:
                    </Text>
                    <Flex gap="12px">
                      {Object.values(CarabinerTags).map((productTag, index) => (
                        <Box
                          key={index}
                          boxSize="28px"
                          cursor="pointer"
                          onClick={() => handleTagSelection(productTag)}
                          borderBottom={tag === productTag ? "1px solid black" : "none"}
                        >
                          <Image
                            key={index}
                            src={`/assets/icons/${productTag}.svg`}
                            alt={productTag}
                          />
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                )}

                <Box pb="12px">
                  <Text fontSize="18px" fontWeight="700" mt={0} mb="8px">
                    {t("Product.size")}:
                  </Text>
                  {Array.isArray(currentLang === "en" ? product.size_en : product.size_uk) ? (
                    <Flex gap="12px" fontWeight="600" lineHeight="19px">
                      {(currentLang === "en"
                        ? (product.size_en as string[])
                        : (product.size_uk as string[])
                      ).map((productSize, index) => (
                        <Box
                          key={index}
                          boxSize="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          onClick={() => setSize(productSize)}
                          borderBottom={size === productSize ? "1px solid black" : "none"}
                        >
                          {productSize}
                        </Box>
                      ))}
                    </Flex>
                  ) : (
                    <Box>
                      {currentLang === "en" ? product.size_en : product.size_uk}
                    </Box>
                  )}
                </Box>

                {product.weight_en && product.weight_uk && (
                  <Box pb="12px">
                    <Text fontSize="18px" fontWeight="700" mt={0} mb="8px">
                      {t("Product.weight")}:
                    </Text>
                    {currentLang === "en" ? product.weight_en : product.weight_uk}
                  </Box>
                )}

                <Box>
                  <Text fontSize="18px" fontWeight="700" mt={0} mb="8px">
                    {t("Product.price")}:
                  </Text>
                  {currentLang === "en" ? `$${product.price_usd}` : `₴${product.price_uah}`}
                </Box>

                <Box className="addToCartBtn-container" pt="24px">
                  <Button
                    width="100%"
                    fontSize="14px"
                    fontWeight="600"
                    color="white"
                    bg="black"
                    p="12px"
                    cursor="pointer"
                    border="none"
                    textDecoration="underline"
                  >
                    {t("Product.addToCart")}
                  </Button>
                </Box>
              </Flex>
            </Grid>
          </Box>
        )} 
    </Container>
  );
};

export default Product;