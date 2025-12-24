import type { ChatRoomListItem } from '@/types/chat'
import { ChatHeader } from '../common/ChatHeader'
import { ChatList } from './ChatList'

interface ChatListPanelProps {
  rooms: ChatRoomListItem[]
  onClose: () => void
  onSelectRoom: (roomId: number) => void
}

export function ChatListPanel({
  rooms,
  onClose,
  onSelectRoom,
}: ChatListPanelProps) {
  const handleSelectRoom = (roomId: number) => {
    onSelectRoom(roomId)
  }

  const hasNoRooms = rooms.length === 0

  return (
    <div className="flex h-full flex-col">
      <ChatHeader title="채팅방" onClose={onClose} />
      {hasNoRooms ? (
        <div className="centralize flex-1 flex-col gap-1 text-sm text-gray-600">
          <p>현재 참여 중인 채팅방이 없습니다.</p>
          <p>스터디에 들어가면 채팅방이 생깁니다.</p>
        </div>
      ) : (
        <div className="scroll-hide flex-1 overflow-y-auto">
          <ChatList rooms={rooms} onSelectRoom={handleSelectRoom} />
        </div>
      )}
    </div>
  )
}
