import { useQuery } from "@tanstack/react-query"
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Spinner,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { OpenAPI, ProductsService } from "../../client";
import { useTranslation } from 'react-i18next';
import Cooperation from '../../components/Cooperation'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import homepageImg from '/assets/images/homepage.png';
import prod4 from "/assets/images/projects/alltrueest/alltrueest_2.png"
import prod5 from "/assets/images/projects/tabletopGiraffe/tabletop56x65.png"
import prod6 from '/assets/productImages/prod6.png'


export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})

function getProductsQueryOptions() {
  return {
    queryFn: () =>
      ProductsService.readProducts(),
    queryKey: ["products"],
  }
}


type DropdownsState = {
  [key: string]: boolean;
};

function Main() {
  const { t } = useTranslation();
  const apiBaseUrl = OpenAPI.BASE
  const sliderRef = useRef(null)
  const [dropdowns, setDropdowns] = useState<DropdownsState>({});

  const {
    data: products,
    isPending,
  } = useQuery({
    ...getProductsQueryOptions(),
  })


  const toggleDropdown = (dropdownName: string) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <>
      <Box>
        <Image src={homepageImg} alt="Anumo banner" objectFit="cover" width="100%" />
      </Box>
      <Container px="46px">
        <Heading
          as="h1"
          textAlign="center"
          fontSize="135px"
          fontWeight="800"
          lineHeight="181.53px"
          mb="4rem"
        >
          ANUMO PLASTIC
        </Heading>

        <Flex justify="space-between" gap="1rem">
          <Box fontWeight="600" flex="1">
            <Text m={0}>[Anúmo] — (ukr. ану́мо) a decisive and bold call to action.</Text>
          </Box>
          <Box flex="1">
            <Text m={0}>{t('HomePage.anumoAbout')}.</Text>
            <List
              spacing=".75rem"
              pl={0}
              style={{
                textUnderlinePosition: "under"
              }}
            >
              {['material', 'production', 'inspiration', 'values'].map((item) => (
                <ListItem key={item}>
                  <Link
                    onClick={() => toggleDropdown(item)}
                    textDecoration="underline"
                    fontWeight="600"
                    fontSize="28px"
                    cursor="pointer"
                  >
                    {t(`HomePage.${item}.title`)}
                  </Link>
                  {dropdowns[item] && (
                    <Box fontSize="24px" m="16px 0 24px 0">
                      {t(`HomePage.${item}.description`)}
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>
        <Text m={0}>{t('HomePage.aboutPolicy')}.</Text>
        <Heading
          id='shopBlock-homepage'
          as="h3"
          size="xl"
          fontSize="64px"
          fontWeight="700"
          mb="2rem"
        >
          {t('HomePage.shopTitle')}
        </Heading>

        {isPending ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" speed="1s" color="ui.main" />
          </Flex>
        ) : (
          <Box >
            <Swiper
              ref={sliderRef}
              autoplay
              spaceBetween={32}
              slidesPerView={2.5}
              loop={true}
            >
              {products?.data
                .slice()
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((product) =>
                  product.images ? (
                    <SwiperSlide key={product.id}>
                      <Box
                        h="586px"
                        cursor="pointer"
                      >
                        <Link
                          as={RouterLink}
                          to="/products/$category"
                          params={{ category: product.category }}
                          hash='root'
                        >
                          <Image
                            src={`${apiBaseUrl}${product.images[0].url}`}
                            alt="Product Image"
                            h="100%"
                            w="100%"
                            objectFit="cover"
                          />
                        </Link>
                      </Box>
                    </SwiperSlide>
                  ) : null
                )}
            </Swiper>
            <Flex p="3rem 0 4rem">
              {/* @ts-ignore */}
              <Box onClick={() => {sliderRef?.current?.swiper.slideNext()}}>
                <Image src="/arrow-right.svg" alt="Next Slide" />
              </Box>
            </Flex>
          </Box>
        )}

        <Grid templateColumns='repeat(2, 1fr)' gap='1rem'>
          <GridItem
            fontSize="40px"
            fontWeight="600"
          >/{t('HomePage.enjoyResponsibility')}/</GridItem>
          <GridItem>
            <Text
              m={0}
              fontSize="40px"
              fontWeight="600"
            >{t('HomePage.categoriesTitle')}</Text>
            <List spacing={12} p={0}>
              {['Carabiner', 'Book holder', 'Choker', 'Plate', 'Soap holder'].map((category) => (
                <ListItem key={category}>
                  <Link
                    as={RouterLink}
                    to={`/products/${category}`}
                    hash="root"
                    color="black"
                  > {t(`HomePage.${category}`)}
                  </Link>
                </ListItem>
              ))}
            </List>
          </GridItem>
        </Grid>

        <Box>
          <Heading
            as="h1"
            fontSize="64px"
            fontWeight="700"
            mb="2rem"
          >
            {t('HomePage.projectsTitle')}
          </Heading>
          <Grid templateColumns='repeat(2, 1fr)'>
            <GridItem pb="4rem">
              <Box>
                <Image
                  src={prod4}
                  alt="productImage"
                  w="100%"
                ></Image>
                <Link
                  as={RouterLink}
                  to="/projects/$index"
                  params={{ index: '9' }}
                  hash="projectsSlider"
                  color="black"
                  fontWeight="700"
                  fontSize="24px"
                  lineHeight="30px"
                  textDecoration="underline"
                  display="block"
                  mt="1rem"
                >
                  {t('HomePage.alltrueestTitle')}
                </Link>
                <Text
                  m=".75rem 0"
                  fontSize="20px"
                >{t('HomePage.alltrueestDesc')}.
                </Text>
                <Text
                  m=".75rem 0"
                  fontSize="20px"
                >{t('HomePage.alltrueestFrom')}.
                </Text>
              </Box>
            </GridItem>
              <Grid
                templateColumns='repeat(2, 1fr)'
                gap="40px"
                pl="40px"
                alignItems="end"
              >
                <GridItem>
                  <Image
                    src={prod5}
                    w="100%"
                  ></Image>
                  <Link
                    as={RouterLink}
                    to="/projects/$index"
                    params={{ index: '2' }}
                    hash="projectsSlider"
                    color="black"
                    fontWeight="800"
                    fontSize="16px"
                    my="1em"
                    lineHeight="19px"
                    display="block"
                    height="1.75rem"
                  >
                    {t('HomePage.giraffeTitle')}
                  </Link>
                </GridItem>
                <GridItem>
                  <Image
                    src={prod6}
                    w="100%"
                  ></Image>
                  <Link
                    as={RouterLink}
                    to="/projects/$index"
                    params={{ index: '7' }}
                    hash="projectsSlider"
                    color="black"
                    fontWeight="800"
                    fontSize="16px"
                    my="1em"
                    lineHeight="19px"
                    display="block"
                    height="1.75rem"
                  >
                    {t('HomePage.hypermobileTitle')}
                  </Link>
                </GridItem>
              </Grid>
          </Grid>
          <Text
            textAlign="end"
            fontWeight="700"
            fontSize="16px"
            m="4rem 0 6rem"
          >
            <Link
              as={RouterLink}
              to="/projects/$index"
              params={{ index: '0' }}
              hash="projectsSlider"
              color="black"
              style={{
                textUnderlinePosition: "under"
              }}
            >
              {t('HomePage.viewAll')}
            </Link>
          </Text>
        </Box>

        <Cooperation />

      </Container>
    </>
  );
};
