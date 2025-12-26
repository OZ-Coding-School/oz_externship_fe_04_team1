import { getTypeIcon } from '@/helpers/icons'
import type { AccentKey } from '@/types/alarm'
import type { IconName } from '@/helpers/icons'

type NotificationCardProps = {
  message: string
  date: string
  isRead?: boolean
  accent?: AccentKey
  iconType?: IconName
  onClick?: () => void
}

const accentClasses: Record<AccentKey, string> = {
  blue: 'accent-blue',
  green: 'accent-green',
  red: 'accent-red',
  purple: 'accent-purple',
  orange: 'accent-orange',
  indigo: 'accent-indigo',
  pink: 'accent-pink',
  teal: 'accent-teal',
}

export default function NotificationCard({
  message,
  date,
  isRead = false,
  accent = 'blue',
  iconType = 'apply',
  onClick,
}: NotificationCardProps) {
  const icon = getTypeIcon(iconType)

  return (
    <div
      className={`relative flex items-start gap-3 border-b border-gray-100 p-4 last:border-b-0 ${
        isRead ? 'bg-white' : 'bg-[#fefce8]'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${accentClasses[accent]}`}
      >
        {icon}
      </div>
      <div className="pr-6">
        <p className="mb-1 line-clamp-2 text-sm leading-5 text-gray-800">
          {message}
        </p>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      {!isRead && (
        <span className="bg-primary-500 absolute top-1/4 right-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full" />
      )}
    </div>
  )
}
