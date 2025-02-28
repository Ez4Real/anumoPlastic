import { Box, ChakraProvider, Flex, Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { theme } from "../theme"

import Sidebar from "../components/Common/Sidebar"
import UserMenu from "../components/Common/UserMenu"
import useAuth, { isLoggedIn } from "../hooks/useAuth"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  const { isLoading } = useAuth()

  return (
    <ChakraProvider theme={theme}>
      <Flex maxW="large" h="auto" position="relative">
        <Sidebar />
        <Box flex="1" overflowX="hidden">
          {isLoading ? (
            <Flex justify="center" align="center" height="100vh" width="full">
              <Spinner size="xl" color="ui.main" />
            </Flex>
          ) : (
            <Outlet />
          )}
        </Box>
        <UserMenu />
      </Flex>
    </ChakraProvider>
  )
}
