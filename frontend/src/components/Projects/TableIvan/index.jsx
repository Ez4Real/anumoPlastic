import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./index.css"

import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import tableIvan from "/assets/images/projects/tableIvan/tableIvan.png"
import tableIvan_1 from "/assets/images/projects/tableIvan/tableIvan_1.png"
import tableIvan_2 from "/assets/images/projects/tableIvan/tableIvan_2.png"
import tableIvan_3 from "/assets/images/projects/tableIvan/tableIvan_3.png"
import tableIvan_4 from "/assets/images/projects/tableIvan/tableIvan_4.png"
import tableIvan_5 from "/assets/images/projects/tableIvan/tableIvan_5.png"

// const TableIvan = () => {
//   const { t, i18n } = useTranslation();

//   const [expandDescription, setExpandDescription] = useState(false);
//   const description_1 = t('ProjectsPage.projects.tableIvan.description_1');
//   const sliceEndNumber = i18n.language === 'en' ? 455 : 478;
//   const truncatedDescription = `${description_1.slice(0, sliceEndNumber)} ...`;

//   const isMobile = useBreakpointValue({ base: true, sm: false });
//   const titleFontSize = useBreakpointValue({ base: "18px", sm: "60px" });
//   const gridGap = useBreakpointValue({ base: "16px", sm: "46px" });

//   return (
//     <>
//     <Container px="0">
//       <Heading
//         fontWeight="700"
//         fontSize={titleFontSize}
//         mb={["20px", "46px"]}
//       >{t('ProjectsPage.projects.tableIvan.title')}
//         <Badge
//           position="relative"
//           top={["-1px", "-.25rem"]}
//           pl={[".25rem", ".375rem"]}
//           fontWeight={["700", "600"]}
//           fontSize={["14px", "24px"]}
//           colorScheme="transparent"
//         >/2024</Badge>
//       </Heading>
//     </Container>

//     <div className='projectComponent-container'>
//       <p className='projectTitle'>{t('ProjectsPage.projects.tableIvan.title')}<span >/2024</span></p>
//       <p className="projectDescription top">{t('ProjectsPage.projects.tableIvan.description')}</p>
//       <div className="tableIvan-container">
//         <div className="left">
//           <img src={tableIvan} alt="Table Ivan"></img>
//           <img src={tableIvan_1} alt="Table Ivan"></img>
//         </div>
//         <div className="right">
//           <img src={tableIvan_2} alt="Table Ivan"></img>
//           <img src={tableIvan_4} alt="Table Ivan"></img>
//           <img src={tableIvan_3} alt="Table Ivan"></img>
//           <img src={tableIvan_5} alt="Table Ivan"></img>
//         </div>
//       </div>
//       <p className="projectDescription bottom">
//         {expandDescription ? description_1 : truncatedDescription}
//       </p>
//       {expandDescription && <div className="characteristics-container">
//         <p className="title">{t('ProjectsPage.projects.tableIvan.characteristics.title')}:</p>
//         <p className="list projectDescription">{t('ProjectsPage.projects.tableIvan.characteristics.list')}</p>
//       </div>}

//       {!expandDescription &&
//         <div
//           className="seeAll-container"
//           onClick={() => setExpandDescription((prev) => !prev)}
//         > {t('ProjectsPage.seeAll')}
//         </div>
//       }
//     </div>

//     </>
//   );
// };

// export default TableIvan;
