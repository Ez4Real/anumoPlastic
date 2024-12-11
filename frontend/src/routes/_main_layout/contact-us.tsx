import { createFileRoute } from "@tanstack/react-router"
import ContactUs from "../../pages/ContactUs"

export const Route = createFileRoute("/_main_layout/contact-us")({
  component: ContactUs,
})
