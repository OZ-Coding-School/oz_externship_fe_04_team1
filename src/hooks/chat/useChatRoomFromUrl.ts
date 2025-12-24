import { useChatStore } from '@/store/useChatStore'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function useChatRoomFromUrl() {
  const location = useLocation()
  const openGroup = useChatStore((state) => state.openGroup)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const groupIdParam = searchParams.get('group_id')

    // group_id가 있으면 채팅방 열기
    if (groupIdParam) {
      const groupId = parseInt(groupIdParam, 10)
      openGroup(groupId)
    }
  }, [location.search, openGroup])
}
