import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

// import { StrictMode } from "react"
import { OpenAPI } from "./client"
import './i18n';

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.MONO_API_DOMAIN = import.meta.env.VITE_API_MONO_DOMAIN
OpenAPI.MONO_ACQ_TOKEN = import.meta.env.VITE_API_MONO_TOKEN
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const queryClient = new QueryClient()

const router = createRouter({ routeTree })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  // </StrictMode>
)
