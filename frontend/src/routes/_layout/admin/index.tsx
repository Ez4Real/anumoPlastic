import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../../hooks/useAuth"

export const Route = createFileRoute("/_layout/admin/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Привіт, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Це твоя адмін панель. Тут ти можеш менеджити користувачів та товари.</Text>
        </Box>
      </Container>
    </>
  )
}
