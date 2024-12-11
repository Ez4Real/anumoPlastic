import { createFileRoute } from "@tanstack/react-router"
import Checkout from "../../pages/Checkout"

export const Route = createFileRoute("/_main_layout/checkout")({
  component: Checkout,
})
