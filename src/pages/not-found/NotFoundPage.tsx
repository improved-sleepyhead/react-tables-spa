import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-400">404</h1>
      <p className="mb-6 text-gray-600">Page not found.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go home
      </Link>
    </div>
  )
}
