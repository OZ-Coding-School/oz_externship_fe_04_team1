import type { AlarmItem } from '@/types/alarm'
import type { IconName } from '@/helpers/icons'

export type NotificationApiItem = {
  id: number
  type:
    | 'STUDY_NOTE_CREATE'
    | 'TODAY_SCHEDULE'
    | 'UPCOMING_SCHEDULE'
    | 'STUDY_JOIN'
    | 'APPLICATION_CREATED'
    | 'APPLICATION_ACCEPT'
    | 'APPLICATION_REJECT'
    | 'STUDY_REVIEW_REQUEST'
  content: string
  back_url_link: string
  is_read: boolean
  created_at: string
}

export type NotificationListResponse = {
  results: NotificationApiItem[]
  next: string | null
  previous: string | null
  total?: number
  unread_total?: number
}

// ISO 날짜 문자열을 "12월 1일" 형태로 포맷
const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return ''
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}월 ${day}일`
}

// 타입별 배경/텍스트 컬러 지정
const typeToAccent = {
  STUDY_NOTE_CREATE: 'teal',
  TODAY_SCHEDULE: 'pink',
  UPCOMING_SCHEDULE: 'indigo',
  STUDY_JOIN: 'purple',
  APPLICATION_CREATED: 'blue',
  APPLICATION_ACCEPT: 'green',
  APPLICATION_REJECT: 'red',
  STUDY_REVIEW_REQUEST: 'orange',
} as const

// 타입별 아이콘 지정
const typeToIcon: Record<string, IconName> = {
  STUDY_NOTE_CREATE: 'note',
  TODAY_SCHEDULE: 'today',
  UPCOMING_SCHEDULE: 'upcoming',
  STUDY_JOIN: 'newMember',
  APPLICATION_CREATED: 'apply',
  APPLICATION_ACCEPT: 'approved',
  APPLICATION_REJECT: 'rejected',
  STUDY_REVIEW_REQUEST: 'studyEnd',
} as const

export const alarmMapper = (item: NotificationApiItem): AlarmItem => {
  const accent = typeToAccent[item.type as keyof typeof typeToAccent] ?? 'blue'
  const iconType = typeToIcon[item.type as keyof typeof typeToIcon] ?? 'apply'

  return {
    id: String(item.id ?? crypto.randomUUID()),
    message: item.content ?? '',
    date: formatDate(item.created_at ?? ''),
    isRead: !!item.is_read,
    accent,
    iconType,
    backUrl: item.back_url_link ?? '',
  }
}
