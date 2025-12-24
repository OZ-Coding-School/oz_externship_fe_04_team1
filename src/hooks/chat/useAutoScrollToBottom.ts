import { useCallback, useEffect, useRef } from 'react'

interface AutoScrollToBottomOptions {
  onlyIfAtBottom?: boolean
  threshold?: number
  behavior?: ScrollBehavior
}

// 메시지 변경 시 하단 자동 스크롤 훅 (초기 1회는 무조건 하단 + 조건부)
export function useAutoScrollToBottom(
  messageCount: number,
  options: AutoScrollToBottomOptions = {}
) {
  const { onlyIfAtBottom = false, threshold = 20, behavior = 'auto' } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const isFirstScroll = useRef(true)

  // 현재 스크롤 위치가 하단 근처인지 판단
  const isAtBottom = useCallback(() => {
    const element = containerRef.current
    if (!element) return true
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <
      threshold
    )
  }, [threshold])

  // 필요 시 강제로 하단으로 스크롤
  const scrollToBottom = useCallback(
    (behaviorOverride: ScrollBehavior = behavior) => {
      bottomRef.current?.scrollIntoView({ behavior: behaviorOverride })
    },
    [behavior]
  )

  useEffect(() => {
    if (messageCount === 0) return

    // 첫 데이터 로드 시에는 즉시 하단 이동
    if (isFirstScroll.current) {
      scrollToBottom('auto')
      isFirstScroll.current = false
      return
    }

    // 이후엔 사용자가 하단 근처일 때만 자동 스크롤
    if (onlyIfAtBottom && !isAtBottom()) return
    scrollToBottom()
  }, [messageCount, onlyIfAtBottom, isAtBottom, scrollToBottom])

  return { containerRef, bottomRef, isAtBottom, scrollToBottom }
}
