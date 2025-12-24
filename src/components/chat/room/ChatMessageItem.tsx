import type { ChatMessage } from '@/types/chat'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

function formatTimeHHmm(dateStr: string) {
  return format(new Date(dateStr), 'HH:mm', { locale: ko })
}
const CHAT_BUBBLE = {
  outgoing:
    'bg-primary-500 text-gray-50 rounded-lg whitespace-pre-wrap rounded-br-xs px-3 py-2 text-sm',
  incoming:
    'bg-gray-100 text-gray-900 whitespace-pre-wrap rounded-lg rounded-bl-xs px-3 py-2 text-sm',
} as const

interface ChatMessageItemProps {
  message: ChatMessage
  currentUserId: number
}

export function ChatMessageItem({
  message,
  currentUserId,
}: ChatMessageItemProps) {
  const isOutgoing = message.sender.id === currentUserId
  const timeLabel = formatTimeHHmm(message.created_at)

  // 내 메시지
  if (isOutgoing) {
    return (
      <div className="flex max-w-[80%] flex-col gap-1 self-end">
        <p className={CHAT_BUBBLE.outgoing}>{message.content}</p>
        <span className="text-end text-xs text-gray-500">{timeLabel}</span>
      </div>
    )
  }

  // 상대 메시지
  return (
    <div className="flex max-w-[80%] flex-col gap-1 self-start">
      <span className="text-xs text-gray-600">{message.sender.nickname}</span>
      <p className={CHAT_BUBBLE.incoming}>{message.content}</p>
      <span className="text-xs text-gray-500">{timeLabel}</span>
    </div>
  )
}
