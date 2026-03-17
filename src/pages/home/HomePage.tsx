import { Link } from "react-router"

export function HomePage() {
  return (
    <div className="py-8 text-center">
      <h1 className="mb-2 text-2xl font-bold">User Management SPA</h1>
      <p className="mb-6 text-gray-600">
        Manage users and groups in one place.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/users"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Users
        </Link>
        <Link
          to="/groups"
          className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          Groups
        </Link>
      </div>
    </div>
  )
}
