import { createFileRoute } from "@tanstack/react-router"
import Product from "../../pages/Product"

export const Route = createFileRoute("/_main_layout/product")({
  component: Product,
})
