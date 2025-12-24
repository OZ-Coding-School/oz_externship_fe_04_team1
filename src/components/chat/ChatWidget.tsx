import { useChatRoomFromUrl } from '@/hooks/chat/useChatRoomFromUrl'
import { useChatRooms } from '@/hooks/chat/useChatRooms'
import { SocketStatus, useChatSocket } from '@/hooks/chat/useChatSocket'
import useUserData from '@/hooks/quries/useUserData'
import AuthStateStore from '@/store/authStateStore'
import { useChatStore } from '@/store/useChatStore'
import { MessageCircle, X } from 'lucide-react'
import { ChatListPanel } from './list/ChatListPanel'
import { ChatRoomPanel } from './room/ChatRoomPanel'
import { ChatBadge } from './common/ChatBadge'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

export function ChatWidget() {
  const {
    isOpen,
    currentView,
    selectedGroupId,
    toggleOpen,
    openGroup,
    openList,
  } = useChatStore()

  useBodyScrollLock(isOpen)
  useChatRoomFromUrl()

  const { chatRooms } = useChatRooms()
  const accessToken = AuthStateStore((state) => state.accessToken)
  const { data: userData } = useUserData()

  // 클릭한 채팅방 찾기
  const selectedRoom =
    selectedGroupId != null
      ? chatRooms.find((room) => room.group_id === selectedGroupId)
      : null

  const isRoomView = currentView === 'room' && !!selectedRoom

  const currentUserId = userData?.id ?? null
  const isLoggedIn = !!accessToken && currentUserId !== null
  const canRenderRoom = isRoomView && isLoggedIn
  const socketEnabled = true

  const { status, participants, sendMessage } = useChatSocket({
    groupId: selectedGroupId ?? 0,
    accessToken,
    enabled: socketEnabled && canRenderRoom,
  })

  // 위젯 버튼 클릭
  const handleClickWidget = () => {
    toggleOpen()
  }

  // 리스트에서 채팅방 선택
  const handleSelectRoom = (groupId: number) => {
    openGroup(groupId)
  }

  // 패널 닫기
  const handleClosePanel = () => {
    toggleOpen()
  }

  // 미읽음 메세지
  const unreadCount = chatRooms.reduce(
    (sum, room) => sum + room.unread_count,
    0
  )

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 flex h-96 w-80 flex-col overflow-hidden rounded-lg bg-white shadow-[0px_25px_50px_-12px_#00000040]">
          {/* 채팅 리스트 View */}
          {currentView === 'list' && (
            <ChatListPanel
              rooms={chatRooms}
              onClose={handleClosePanel}
              onSelectRoom={handleSelectRoom}
            />
          )}

          {currentView === 'room' && selectedRoom && !accessToken && (
            <div className="flex h-full items-center justify-center p-4 text-sm text-gray-600">
              로그인 후 채팅을 이용할 수 있어요.
            </div>
          )}

          {socketEnabled && status === SocketStatus.CONNECTING && (
            <div className="flex h-full items-center justify-center p-4 text-sm text-gray-600">
              채팅방에 연결 중...
            </div>
          )}

          {/* 채팅방 View */}
          {canRenderRoom && selectedRoom && (
            <ChatRoomPanel
              groupId={selectedGroupId!}
              roomName={selectedRoom.group_name}
              participants={participants}
              currentUserId={currentUserId}
              onClose={toggleOpen}
              onSend={sendMessage}
              onBack={openList}
            />
          )}
        </div>
      )}

      {/* 위젯 버튼 */}
      <button
        onClick={handleClickWidget}
        className="bg-primary-500 relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0px_10px_15px_-3px_#0000001A,0px_4px_6px_-4px_#0000001A]"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}

        {/* 채팅 뱃지 */}
        <ChatBadge count={unreadCount} className="absolute -top-2 -right-2" />
      </button>
    </div>
  )
}
