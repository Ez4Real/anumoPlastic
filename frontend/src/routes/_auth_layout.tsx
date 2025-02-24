import { ChakraProvider } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { theme } from "../theme"

export const Route = createFileRoute("/_auth_layout")({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <ChakraProvider theme={theme}>
      <Outlet />
    </ChakraProvider>
  )
}
