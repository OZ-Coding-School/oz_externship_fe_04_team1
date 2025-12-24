import Button from '@/components/common/Button'
import { useAutoScrollToBottom } from '@/hooks/chat/useAutoScrollToBottom'
import { useChatMessageScroll } from '@/hooks/chat/useChatMessageScroll'
import type { ChatMessage } from '@/types/chat'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ChatMessageItem } from './ChatMessageItem'

interface ChatMessageListProps {
  messages: ChatMessage[]
  currentUserId: number
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
}

export function ChatMessageList({
  messages,
  currentUserId,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: ChatMessageListProps) {
  const prevMessagesLength = useRef(messages.length)
  const lastMessageIdRef = useRef<number | undefined>(undefined)

  const { containerRef, isAtBottom, scrollToBottom, bottomRef } =
    useAutoScrollToBottom(messages.length, {
      onlyIfAtBottom: true,
      behavior: 'auto',
    })

  const { hasNewMessage, handleScroll, clearNewMessage } = useChatMessageScroll(
    {
      messagesLength: messages.length,
      lastMessageId: messages[messages.length - 1]?.id,
      isAtBottom,
      containerRef,
      hasMore,
      isLoadingMore,
      onLoadMore,
      topThreshold: 20,
    }
  )

  // 새 메시지 감지
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    const currentLastId = lastMessage?.id
    const prevLastId = lastMessageIdRef.current

    // 마지막 메시지 ID가 변경되지 않았으면 무시
    if (currentLastId === prevLastId) {
      prevMessagesLength.current = messages.length
      return
    }

    // 초기 로딩이면 무시
    if (prevLastId === undefined) {
      lastMessageIdRef.current = currentLastId
      prevMessagesLength.current = messages.length
      return
    }

    // 새 메시지일 때만 스크롤 처리
    if (lastMessage?.sender?.id === currentUserId) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else if (isAtBottom()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }

    lastMessageIdRef.current = currentLastId
    prevMessagesLength.current = messages.length
  }, [messages, currentUserId, bottomRef, isAtBottom])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
    >
      {isLoadingMore && (
        <div className="flex justify-center">
          <Loader2 size={16} className="text-primary-500 animate-spin" />
        </div>
      )}

      {messages.map((msg) => (
        <ChatMessageItem
          key={msg.id}
          message={msg}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={bottomRef} className="h-0"></div>

      {hasNewMessage && (
        <Button
          variant="primary"
          onClick={() => {
            scrollToBottom('smooth')
            clearNewMessage()
          }}
          className="bg-primary-500/70 hover:bg-primary-500 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full shadow-sm"
        >
          새로운 메시지 보기
        </Button>
      )}
    </div>
  )
}
