export type AccentKey =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'orange'
  | 'indigo'
  | 'pink'
  | 'teal'

import type { IconName } from '@/helpers/icons'

export type AlarmItem = {
  id: string
  message: string
  date: string
  isRead: boolean
  accent: AccentKey
  iconType: IconName
  backUrl?: string
}
