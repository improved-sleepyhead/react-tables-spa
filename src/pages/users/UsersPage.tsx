import { useUsersQueryParams } from "./model"

export function UsersPage() {
  const { params, setParams } = useUsersQueryParams()

  return (
    <div>
      <h1 className="text-xl font-semibold">Users</h1>
      <p className="mt-2 text-gray-500">
        page={params.page} perPage={params.perPage} search=&quot;
        {params.search}&quot; sortBy={params.sortBy} sortDir={params.sortDir}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          onClick={() => setParams({ search: "ann" })}
        >
          Search &quot;ann&quot;
        </button>
        <button
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          onClick={() => setParams({ sortBy: "email", sortDir: "desc" })}
        >
          Sort email desc
        </button>
        <button
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          onClick={() => setParams({ page: 2 })}
        >
          Page 2
        </button>
        <button
          className="rounded bg-gray-300 px-3 py-1 text-sm"
          onClick={() =>
            setParams({
              page: 1,
              perPage: 10,
              search: "",
              sortBy: "name",
              sortDir: "asc",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  )
}
