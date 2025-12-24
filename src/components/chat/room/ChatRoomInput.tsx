import { useChatInput } from '@/hooks/chat/useChatInput'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'

interface ChatRoomInputProps {
  onSend: (message: string) => void
}

export function ChatRoomInput({ onSend }: ChatRoomInputProps) {
  const { message, handleChange, handleKeyDown, handleSend } =
    useChatInput(onSend)

  const hasMessage = message.trim().length > 0

  return (
    <div className="flex items-center gap-2 border-t border-t-gray-200 p-3 pt-[11px]">
      <textarea
        rows={1}
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="scrollbar-hide focus:ring-primary-500 focus:border-primary-500 flex-1 resize-none rounded-full border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:outline-none"
      />

      <button
        onClick={handleSend}
        disabled={!hasMessage}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-full',
          hasMessage
            ? 'bg-primary-500 hover:bg-primary-600 text-white'
            : 'bg-gray-300 text-gray-50'
        )}
      >
        <Send className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
