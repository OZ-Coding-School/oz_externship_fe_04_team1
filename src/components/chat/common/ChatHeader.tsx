import Button from '@/components/common/Button'
import { ArrowLeft, X } from 'lucide-react'

interface ChatHeaderProps {
  title: string
  onlineCount?: number
  totalUnreadCount?: number
  showBackButton?: boolean
  onBack?: () => void
  onClose: () => void
}

export function ChatHeader({
  title,
  onlineCount,
  totalUnreadCount = 0,
  showBackButton,
  onBack,
  onClose,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between gap-2 border-b border-b-gray-200 bg-gray-50 p-4">
      {showBackButton && (
        <Button variant="ghost" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      <div className="flex-1">
        <div className="flex flex-col">
          <span className="truncate text-sm font-semibold text-gray-900">
            {title}
          </span>

          {!showBackButton && (
            <span className="text-primary-600 text-xs">
              {totalUnreadCount}개의 읽지 않은 메시지
            </span>
          )}
        </div>

        {typeof onlineCount === 'number' && (
          <div className="text-xs text-gray-600">
            <span className="bg-success-500 mr-1 inline-block h-2 w-2 rounded-full" />
            <span>{onlineCount}명 온라인</span>
          </div>
        )}
      </div>

      <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
        <X className="h-4 w-4 text-gray-400" />
      </Button>
    </header>
  )
}
