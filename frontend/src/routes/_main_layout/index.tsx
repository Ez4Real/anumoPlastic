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
import mbHomepageImg from '/assets/images/mbHomepage.png';
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

  const slidesSpaceBetween = useBreakpointValue({ base: 12, sm: 32 })
  const slidesPerView = useBreakpointValue({ base: 2.25, sm: 2.5 })

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
      <Box h={["840px", "auto"]}>
        <Image
         src={useBreakpointValue({ base: mbHomepageImg, sm: homepageImg })}
         alt="Anumo banner"
         objectFit="cover"
         boxSize="100%"
        />
      </Box>
      <Container>
        <Heading
          as="h1"
          textAlign="center"
          fontSize={["40px", "135px"]}
          fontWeight="800"
          lineHeight={["53px", "181.53px"]}
          mb={["50px", "4rem"]}
          mt={["46px", 0]}
        >
          ANUMO PLASTIC
        </Heading>

        <Grid
          templateColumns={["146px 172px", "50% 50%"]}
          gap={'1rem'}
        >
          <GridItem fontWeight="600" flex="1"
          >
            <Text
              m={0}
              fontWeight={["500", "600"]}
              fontSize={["16px", "32px"]}
              lineHeight={["19px", "normal"]}
            >[Anúmo] — (ukr. ану́мо) a decisive and bold call to action.</Text>
          </GridItem>
          <GridItem flex="1">
            <Text
              m={0}
              fontSize={["16px", "32px"]}
              lineHeight={["19px", "normal"]}
            >{t('HomePage.anumoAbout')}.</Text>
            <List
              spacing={[0, ".5rem"]}
              style={{
                textUnderlinePosition: "under"
              }}
              mb="24px"
            >
              {['material', 'production', 'inspiration', 'values'].map((item) => (
                <ListItem
                  key={item}
                >
                  <Link
                    onClick={() => toggleDropdown(item)}
                    textDecoration="underline"
                    display={["list-item", "flex"]}
                    mt='12px'
                    fontWeight={["500", "600"]}
                    fontSize={["16px", "28px"]}
                    cursor="pointer"
                  >
                    {t(`HomePage.${item}.title`)}
                  </Link>
                  {dropdowns[item] && (
                    <Box
                      fontSize={["14px", "24px"]}
                      m={["8px 0 12px 0", "16px 0 24px 0"]}
                    >
                      {t(`HomePage.${item}.description`)}
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </GridItem>
        </Grid>
        <Text 
          m={0}
          fontSize={["1rem", "2rem"]}
        >{t('HomePage.aboutPolicy')}.</Text>
        <Heading
          id='shopBlock-homepage'
          as="h3"
          size="xl"
          fontSize={["32px", "64px"]}
          fontWeight={["600", "700"]}
          mt={["90px", "4rem"]}
          mb={["24px", "2rem"]}
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
              spaceBetween={slidesSpaceBetween}
              slidesPerView={slidesPerView}
              loop={true}
              style={{
                overflow: 'visible'
              }}
            >
              {products?.data
                .slice()
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((product) =>
                  product.images ? (
                    <SwiperSlide key={product.id}>
                      <Box
                        w={["146px", "auto"]}
                        h={["180px", "586px"]}
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
            <Flex m={["24px 0 32px", "3rem 0 4rem"]}>
              <Box
                /* @ts-ignore */
                onClick={() => {sliderRef?.current?.swiper.slideNext()}}
                w={["46px", "auto"]}
              >
                <Image src="/arrow-right.svg" alt="Next Slide" />
              </Box>
            </Flex>
          </Box>
        )}

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap='1rem'
        >
          <GridItem
            fontSize={["16px", "40px"]}
            fontWeight="600"
          >/{t('HomePage.enjoyResponsibility')}/</GridItem>
          <GridItem mb={["4rem", 0]}>
            <Text
              m={0}
              fontSize={["16px", "40px"]}
              fontWeight="600"
              textAlign={["end", "start"]}
            >{t('HomePage.categoriesTitle')}</Text>
            <List
              display={["flex", "block"]}
              flexDirection="column"
              alignItems={["flex-end", "unset"]}
              spacing={[0, ".75rem"]}
              p={0}
              my={[0, "1em"]}
            >
              {['Carabiner', 'Book holder', 'Choker', 'Plate', 'Soap holder', 'Ivan the table']
               .map((category, index) => (
                <ListItem key={category}>
                  <Link
                    as={RouterLink}
                    to={`/products/${category}`}
                    hash="root"
                    fontSize={["14px", "32px"]}
                    display={["list-item", "flex"]}
                    mt='10px'
                    color="black"
                    mr={0}
                    // mr={[index % 3 === 2 ? "10px" : 0, 0]}
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
            fontSize={["32px", "64px"]}
            fontWeight={["600", "700"]}
            mb={["24px", "2rem"]}
          >
            {t('HomePage.projectsTitle')}
          </Heading>
          <Grid
            templateColumns='repeat(2, 1fr)'
            display={["flex", "grid"]}
            flexDirection={["column", "unset"]}>
            <GridItem mb={["20px","4rem"]}>
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
                  fontWeight={["600", "700"]}
                  fontSize={["12px", "24px"]}
                  display="block"
                  mt={["16px", "24px"]}
                >
                  {t('HomePage.alltrueestTitle')}
                </Link>
                <Text
                  m=".75rem 0"
                  fontSize={["12px", "20px"]}
                  lineHeight={["15px", "normal"]}
                >{t('HomePage.alltrueestDesc')}.
                </Text>
                <Text
                  m=".75rem 0"
                  fontSize={["12px", "20px"]}
                >{t('HomePage.alltrueestFrom')}.
                </Text>
              </Box>
            </GridItem>
              <Grid
                templateColumns='repeat(2, 1fr)'
                gap={["24px", "40px"]}
                pl={["0", "40px"]}
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
                    fontWeight={["600", "800"]}
                    fontSize={["12px", "16px"]}
                    lineHeight={["15px", "19px"]}
                    my="1em"
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
                    fontWeight={["600", "800"]}
                    fontSize={["12px", "16px"]}
                    lineHeight={["15px", "19px"]}
                    my="1em"
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
            fontWeight={["600", "700"]}
            fontSize={["12px", "16px"]}
            m={["60px 0 90px", "4rem 0 6rem"]}
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
