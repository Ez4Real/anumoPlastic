import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute('/_auth_layout')({
  component: AuthLayout,
});

function AuthLayout() {

    return (
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    );
}