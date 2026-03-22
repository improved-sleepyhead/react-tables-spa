import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router"
import { z } from "zod"

const SORT_BY_VALUES = ["name", "account", "email", "group", "phone"] as const
const SORT_DIR_VALUES = ["asc", "desc"] as const

export type SortBy = (typeof SORT_BY_VALUES)[number]
export type SortDir = (typeof SORT_DIR_VALUES)[number]

export const DEFAULTS = {
  page: 1,
  perPage: 10,
  search: "",
  sortBy: "name" as SortBy,
  sortDir: "asc" as SortDir
} as const

const usersQueryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).catch(DEFAULTS.page),
  perPage: z.coerce.number().int().min(5).max(100).catch(DEFAULTS.perPage),
  search: z.string().catch(DEFAULTS.search),
  sortBy: z.enum(SORT_BY_VALUES).catch(DEFAULTS.sortBy),
  sortDir: z.enum(SORT_DIR_VALUES).catch(DEFAULTS.sortDir)
})

export type UsersQueryParams = z.infer<typeof usersQueryParamsSchema>

export function parseUsersQueryParams(
  searchParams: URLSearchParams
): UsersQueryParams {
  const raw = {
    page: searchParams.get("page") ?? undefined,
    perPage: searchParams.get("perPage") ?? undefined,
    search: searchParams.get("search") ?? DEFAULTS.search,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortDir: searchParams.get("sortDir") ?? undefined
  }
  return usersQueryParamsSchema.parse(raw)
}

function toSearchParams(params: UsersQueryParams): URLSearchParams {
  const sp = new URLSearchParams()

  if (params.page !== DEFAULTS.page) sp.set("page", String(params.page))
  if (params.perPage !== DEFAULTS.perPage)
    sp.set("perPage", String(params.perPage))
  if (params.search !== DEFAULTS.search) sp.set("search", params.search)
  if (params.sortBy !== DEFAULTS.sortBy) sp.set("sortBy", params.sortBy)
  if (params.sortDir !== DEFAULTS.sortDir) sp.set("sortDir", params.sortDir)

  return sp
}

export function useUsersQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(
    () => parseUsersQueryParams(searchParams),
    [searchParams]
  )

  const setParams = useCallback(
    (
      updater:
        | Partial<UsersQueryParams>
        | ((prev: UsersQueryParams) => Partial<UsersQueryParams>)
    ) => {
      setSearchParams(prev => {
        const current = parseUsersQueryParams(prev)
        const patch = typeof updater === "function" ? updater(current) : updater

        const resetsPage =
          "search" in patch ||
          "sortBy" in patch ||
          "sortDir" in patch ||
          "perPage" in patch

        const next: UsersQueryParams = {
          ...current,
          ...patch,
          ...(resetsPage && !("page" in patch) ? { page: 1 } : {})
        }

        return toSearchParams(next)
      })
    },
    [setSearchParams]
  )

  return { params, setParams } as const
}
