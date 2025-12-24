import { useState, useCallback } from 'react'

export function useChatInput(onSend: (message: string) => void) {
  const [message, setMessage] = useState('')

  // 메시지 전송
  const handleSend = useCallback(() => {
    if (!message.trim()) return
    onSend(message)
    setMessage('')
  }, [message, onSend])

  // 입력값 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  // Enter → 전송 / Shift+Enter → 줄바꿈
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing) {
        return
      }
      e.preventDefault()
      handleSend()
    }
  }

  return {
    message,
    handleChange,
    handleKeyDown,
    handleSend,
  }
}
