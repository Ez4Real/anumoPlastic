import { ChakraProvider } from "@chakra-ui/react"
import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header/index.tsx"
import { CartProvider } from "../context/CartContext.tsx"
import "../index.css"
import { mainTheme } from "../theme.tsx"

export const Route = createFileRoute("/_main_layout")({
  component: MainLayout,
})

function MainLayout() {
  const router = useRouter()
  const [isWhiteTheme, setIsWhiteTheme] = useState(
    router.state.location.pathname === "/",
  )

  useEffect(() => {
    const unsubscribe = router.subscribe("onLoad", () => {
      setIsWhiteTheme(router.state.location.pathname === "/")
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  return (
    <div className="main-layout">
      <ChakraProvider theme={mainTheme}>
        <CartProvider>
          <Header isWhiteTheme={isWhiteTheme} />
          <Outlet />
          <Footer />
        </CartProvider>
      </ChakraProvider>
    </div>
  )
}
