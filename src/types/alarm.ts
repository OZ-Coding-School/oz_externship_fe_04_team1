export type AccentKey =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'orange'
  | 'indigo'
  | 'pink'
  | 'teal'

export type AlarmIconType =
  | 'apply'
  | 'approved'
  | 'rejected'
  | 'newMember'
  | 'studyEnd'
  | 'upcoming'
  | 'today'
  | 'note'

export type AlarmItem = {
  id: string
  message: string
  date: string
  isRead: boolean
  accent: AccentKey
  iconType: AlarmIconType
}
