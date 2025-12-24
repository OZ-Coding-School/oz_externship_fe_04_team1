import type { ChatRoomListItem } from '@/types/chat'
import { ChatBadge } from '../common/ChatBadge'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

function formatMonthDay(dateStr: string) {
  return format(new Date(dateStr), 'M월 d일', { locale: ko })
}

interface ChatListItemProps {
  chatRoom: ChatRoomListItem
  onClick?: (roomId: number) => void
}

export function ChatListItem({ chatRoom, onClick }: ChatListItemProps) {
  const latestMessage = chatRoom.last_message

  const previewMessage = latestMessage
    ? `${latestMessage.sender.nickname}: ${latestMessage.content}`
    : `(대화가 없습니다. 대화를 시작해보세요.)`

  const dateLabel = latestMessage
    ? formatMonthDay(latestMessage.created_at)
    : ''

  return (
    <li className="group border-t border-gray-200 first:border-t-0">
      <button
        type="button"
        onClick={() => onClick?.(chatRoom.group_id)}
        className="flex w-full flex-col gap-1 p-3 pb-4"
      >
        <div className="flex items-center justify-between">
          <span className="group-hover:text-primary-600 text-sm text-gray-900 transition-colors duration-150">
            {chatRoom.group_name}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">{dateLabel}</span>
            <span>
              <ChatBadge count={chatRoom.unread_count} />
            </span>
          </div>
        </div>
        <span className="truncate text-start text-xs text-gray-600">
          {previewMessage}
        </span>
      </button>
    </li>
  )
}
