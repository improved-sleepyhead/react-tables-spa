import { StrictMode } from "react"
// eslint-disable-next-line import/no-internal-modules
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import { router } from "../routes"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
