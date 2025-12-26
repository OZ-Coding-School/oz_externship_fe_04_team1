import {
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Check,
  Clock3,
  FileText,
  FileSignature,
  Megaphone,
  UserPlus,
  UsersRound,
  X,
} from 'lucide-react'

// 도메인별 아이콘 그룹
const notificationIcons = {
  apply: UserPlus,
  approved: Check,
  rejected: X,
  newMember: UsersRound,
  studyEnd: CalendarCheck,
  upcoming: CalendarRange,
  today: CalendarDays,
  note: FileSignature,
}

const manageIcons = {
  total: FileText,
  open: Megaphone,
  closed: Clock3,
}

// 평탄화된 맵 (어디서든 재사용)
const iconByType = {
  ...notificationIcons,
  ...manageIcons,
}

export type NotificationIconName = keyof typeof notificationIcons
export type ManageIconName = keyof typeof manageIcons
export type IconName = keyof typeof iconByType

export const getTypeIcon = (iconType: IconName, size = 16) => {
  const IconComp = iconByType[iconType] ?? iconByType.apply
  return <IconComp size={size} />
}
