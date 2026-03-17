import { createBrowserRouter } from "react-router"

import { RootLayout } from "app/layouts"
import { GroupsPage } from "pages/groups"
import { HomePage } from "pages/home"
import { NotFoundPage } from "pages/not-found"
import { UsersPage } from "pages/users"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/groups", element: <GroupsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
