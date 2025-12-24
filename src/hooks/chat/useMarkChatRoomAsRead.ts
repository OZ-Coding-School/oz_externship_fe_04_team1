import { markChatRoomAsRead } from '@/api/chat'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMarkChatRoomAsRead(groupId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => markChatRoomAsRead(groupId),
    onSuccess: () => {
      // 채팅방 목록 unread_count 갱신
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] })
    },
  })
}
