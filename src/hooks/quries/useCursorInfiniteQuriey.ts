import {
  keepPreviousData,
  useInfiniteQuery,
  type QueryKey,
} from '@tanstack/react-query'

type CursorPage<T> = {
  next: string | null
  previous: string | null
  results: T[]
  total?: number
  unread_total?: number
}

type UseCursorInfiniteQueryParams<T> = {
  queryKey: QueryKey
  // pageParam: cursor 문자열(undefined면 첫 페이지, 혹은 next URL 그대로)
  queryFn: (cursor?: string) => Promise<CursorPage<T>>
  enabled?: boolean
}

export function useCursorInfiniteQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseCursorInfiniteQueryParams<T>) {
  return useInfiniteQuery<CursorPage<T>, Error>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    enabled,
    placeholderData: keepPreviousData,
  })
}
