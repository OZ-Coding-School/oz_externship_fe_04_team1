import { fetchChatRooms } from '@/api/chat'
import { useChatStore } from '@/store/useChatStore'
import { useQuery } from '@tanstack/react-query'

export function useChatRooms() {
  const isOpen = useChatStore((state) => state.isOpen)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => fetchChatRooms({ page_size: 10 }),
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  return {
    chatRooms: data?.results || [],
    isLoading,
    isError,
    error,
    refetch,
  }
}
