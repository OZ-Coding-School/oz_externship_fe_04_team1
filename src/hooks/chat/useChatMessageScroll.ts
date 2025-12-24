import { useCallback, useEffect, useRef, useState } from 'react'

interface useChatMessageScrollProps {
  messagesLength: number
  lastMessageId?: number
  isAtBottom: () => boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
  topThreshold?: number
}

export function useChatMessageScroll({
  messagesLength,
  lastMessageId,
  isAtBottom,
  containerRef,
  hasMore,
  isLoadingMore,
  onLoadMore,
  topThreshold = 20,
}: useChatMessageScrollProps) {
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const prevLastIdRef = useRef(lastMessageId)
  const prevScrollHeightRef = useRef(0)
  const loadLockRef = useRef(false)

  // 로딩 끝나면 락 해제
  useEffect(() => {
    if (!isLoadingMore) loadLockRef.current = false
  }, [isLoadingMore])

  // 새 메시지 감지 (마지막 id 변경 시)
  useEffect(() => {
    const prevLastId = prevLastIdRef.current

    if (lastMessageId !== prevLastId && lastMessageId && !isAtBottom()) {
      setHasNewMessage(true)
    }

    prevLastIdRef.current = lastMessageId
  }, [lastMessageId, isAtBottom])

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    if (hasNewMessage && isAtBottom()) {
      setHasNewMessage(false)
    }

    const nearTop = container.scrollTop <= topThreshold

    if (
      nearTop &&
      hasMore &&
      !isLoadingMore &&
      onLoadMore &&
      !loadLockRef.current
    ) {
      loadLockRef.current = true
      prevScrollHeightRef.current = container.scrollHeight
      onLoadMore()
    }
  }, [
    containerRef,
    hasNewMessage,
    isAtBottom,
    hasMore,
    isLoadingMore,
    onLoadMore,
    topThreshold,
  ])

  // 과거 메시지 prepend 후 스크롤 위치 유지
  useEffect(() => {
    const container = containerRef.current
    if (!container || !prevScrollHeightRef.current) return

    const diff = container.scrollHeight - prevScrollHeightRef.current
    if (diff > 0) container.scrollTop = diff

    prevScrollHeightRef.current = 0
  }, [messagesLength, containerRef])

  const clearNewMessage = useCallback(() => setHasNewMessage(false), [])

  return {
    hasNewMessage,
    handleScroll,
    clearNewMessage,
  }
}
