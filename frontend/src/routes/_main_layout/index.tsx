import { createFileRoute } from "@tanstack/react-router"
import Main from "../../pages/Main"

export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})
