import { cn } from '@/lib/utils'

interface ChatBadgeProps {
  count: number
  className?: string
}

export function ChatBadge({ count, className }: ChatBadgeProps) {
  if (!count || count <= 0) return null

  return (
    <span
      className={cn(
        'bg-danger-500 centralize h-6 w-6 rounded-full px-1 text-xs text-white shadow-md',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
