import { Container, Flex, Image, Link } from "@chakra-ui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import BreadCrumb from "../../../components/BreadCrumb"
import Cooperation from "../../../components/Cooperation"
import {
  Alltrueest,
  Chokers,
  CoffeeTables,
  // TableIvan,
  GlassesAndNecklace,
  Hypermobile,
  SoapHolders,
  SunnyBunny,
  TabletopGiraffe,
  Trays,
  UkrainianCeramics,
  WelcomeBoards,
} from "../../../components/Projects"
import { customSmoothScroll } from "../../../utils"
import "./index.css"

export const Route = createFileRoute("/_main_layout/projects/$index")({
  component: Projects,
})

function Projects() {
  const { index } = Route.useParams<{ index: string }>()
  const navigate = useNavigate({ from: "/projects" })
  const { t } = useTranslation()

  const projects = useMemo(
    () => [
      <SunnyBunny />,
      <UkrainianCeramics />,
      <TabletopGiraffe />,
      <Chokers />,
      <Trays />,
      <CoffeeTables />,
      <SoapHolders />,
      <Hypermobile />,
      <WelcomeBoards />,
      <Alltrueest />,
      <GlassesAndNecklace />,
      // <TableIvan />,
    ],
    [],
  )

  const initialIndex =
    Number(index) >= 0 && Number(index) < projects.length ? Number(index) : 0
  const [currentProjectIndex, setCurrentProjectIndex] =
    useState<number>(initialIndex)

  useEffect(() => {
    const projectIndex = Number(index)
    if (
      Number.isNaN(projectIndex) ||
      projectIndex < 0 ||
      projectIndex >= projects.length
    ) {
      navigate({
        to: "/projects/$index",
        params: { index: "0" },
      })
    } else if (projectIndex !== currentProjectIndex) {
      setCurrentProjectIndex(projectIndex)
    }
  }, [index, navigate, projects.length, currentProjectIndex])

  const changeProject = (direction: number) => {
    setCurrentProjectIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + projects.length) % projects.length
      navigate({
        to: "/projects/$index",
        params: { index: String(newIndex) },
      })
      return newIndex
    })
    customSmoothScroll(200, 600)
  }

  return (
    <Container id="content" p={["0 24px", "0 46px"]}>
      <BreadCrumb pageName={t("ProjectsPage.pageName")} />
      <div className="projectsSlider" id="projectsSlider">
        {projects[currentProjectIndex]}
      </div>

      <Flex m="4.5rem 0 4.375rem 0" justifyContent="space-between">
        <Flex
          onClick={() => changeProject(-1)}
          cursor="pointer"
          alignItems="center"
        >
          <Image src="/arrow-left.svg" h={["12px", "100%"]} />
          <Link
            fontSize={["12px", "24px"]}
            fontWeight="700"
            padding={["0 .5rem", "0 1rem"]}
          >
            {t("ProjectsPage.back")}
          </Link>
        </Flex>

        <Flex
          onClick={() => changeProject(1)}
          cursor="pointer"
          alignItems="center"
        >
          <Link
            fontSize={["12px", "24px"]}
            fontWeight="700"
            padding={["0 .5rem", "0 1rem"]}
          >
            {t("ProjectsPage.next")}
          </Link>
          <Image src="/arrow-right.svg" h={["12px", "100%"]} />
        </Flex>
      </Flex>

      <Cooperation />
    </Container>
  )
}

export default Projects
