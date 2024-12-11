import { createFileRoute } from "@tanstack/react-router"
import ThankYou from "../../pages/ThankYou"

export const Route = createFileRoute("/_main_layout/thank-you")({
  component: ThankYou,
})
