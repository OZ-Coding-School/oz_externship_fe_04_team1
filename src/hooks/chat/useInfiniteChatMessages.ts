import { fetchChatMessages } from '@/api/chat'
import type { ChatMessage } from '@/types/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

const getCursor = (url: string | null) => {
  if (!url) return undefined
  return new URL(url).searchParams.get('cursor') ?? undefined
}

export function useInfiniteChatMessages(groupId: number | string) {
  const query = useInfiniteQuery({
    queryKey: ['chatMessages', groupId],
    enabled: groupId != null,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      fetchChatMessages(groupId, {
        cursor: pageParam,
        page_size: 20,
      }),
    // next가 과거 (위로 스크롤)
    getNextPageParam: (lastPage) => getCursor(lastPage.next),
  })

  const messages: ChatMessage[] =
    query.data?.pages
      ?.flatMap((page) => page.results)
      .sort((a, b) => a.id - b.id) ?? []

  return {
    ...query,
    messages,
  }
}
