export type NotificationType =
  | 'STUDY_NOTE_CREATE'
  | 'TODAY_SCHEDULE'
  | 'UPCOMING_SCHEDULE'
  | 'STUDY_JOIN'
  | 'APPLICATION_CREATED'
  | 'APPLICATION_ACCEPT'
  | 'APPLICATION_REJECT'
  | 'STUDY_REVIEW_REQUEST'

export type NotificationApiItem = {
  id: number
  type: NotificationType
  content: string
  back_url_link: string
  is_read: boolean
  created_at: string
}

export type NotificationListResponse = {
  next: string | null
  previous: string | null
  results: NotificationApiItem[]
  total_count: number
  unread_count: number
}

const notifications: NotificationApiItem[] = [
  {
    id: 1,
    type: 'STUDY_NOTE_CREATE',
    content: '파이썬 스터디에 새로운 노트가 기록되었습니다! 확인해보세요!',
    back_url_link: '/main',
    is_read: false,
    created_at: '2025-11-20T00:00:05.875842+09:00',
  },
  {
    id: 2,
    type: 'TODAY_SCHEDULE',
    content: '오늘 14:00에 예정된 회의를 잊지 마세요.',
    back_url_link: '/main',
    is_read: false,
    created_at: '2025-11-19T08:00:00.000000+09:00',
  },
  {
    id: 3,
    type: 'UPCOMING_SCHEDULE',
    content: '다가오는 스케줄이 내일 오후 3시에 있어요.',
    back_url_link: '/main',
    is_read: true,
    created_at: '2025-11-18T18:30:00.000000+09:00',
  },
  {
    id: 4,
    type: 'STUDY_JOIN',
    content: '신규 멤버가 스터디에 참여했습니다. 환영 메시지를 남겨보세요.',
    back_url_link: '/main',
    is_read: true,
    created_at: '2025-11-17T09:20:00.000000+09:00',
  },
  {
    id: 5,
    type: 'APPLICATION_CREATED',
    content: '구인 공고에 새 지원이 도착했습니다.',
    back_url_link: '/main',
    is_read: false,
    created_at: '2025-11-16T11:10:00.000000+09:00',
  },
  {
    id: 6,
    type: 'APPLICATION_ACCEPT',
    content: '지원이 승인되었습니다! 다음 단계를 진행하세요.',
    back_url_link: '/main',
    is_read: true,
    created_at: '2025-11-15T10:00:00.000000+09:00',
  },
  {
    id: 7,
    type: 'APPLICATION_REJECT',
    content: '지원이 반려되었습니다. 내용을 확인해 주세요.',
    back_url_link: '/main',
    is_read: false,
    created_at: '2025-11-14T16:45:00.000000+09:00',
  },
  {
    id: 8,
    type: 'STUDY_REVIEW_REQUEST',
    content: '스터디 리뷰 요청이 도착했습니다. 후기를 남겨주세요.',
    back_url_link: '/main',
    is_read: true,
    created_at: '2025-11-13T14:15:00.000000+09:00',
  },
]

// 상태 변경(읽음 처리 등)을 위해 배열을 래핑해 둡니다.
export const notificationStore = {
  list: notifications,
}

export const getNotificationList = (
  baseUrl: string,
  pageSize = 5,
  cursor?: string | null,
  isRead?: boolean
): NotificationListResponse => {
  const totalCount = notificationStore.list.length
  const unreadCount = notificationStore.list.filter((n) => !n.is_read).length

  // 읽음 여부 필터가 있을 때만 필터링
  const filtered =
    typeof isRead === 'boolean'
      ? notificationStore.list.filter((n) => n.is_read === isRead)
      : notificationStore.list

  // 커서 기반 슬라이싱 (cursor/cousor는 다음 페이지 시작 인덱스)
  const startIndex = cursor ? Number(cursor) : 0
  const slice = filtered.slice(startIndex, startIndex + pageSize)
  const nextIndex = startIndex + pageSize

  const buildUrl = (index: number) =>
    `${baseUrl}/api/v1/notifications?cursor=${index}&page_size=${pageSize}`

  return {
    // 다음/이전 페이지 링크
    next: nextIndex < filtered.length ? buildUrl(nextIndex) : null,
    previous:
      startIndex > 0 ? buildUrl(Math.max(0, startIndex - pageSize)) : null,
    // 실제 응답 데이터
    results: slice,
    total_count: totalCount,
    unread_count: unreadCount,
  }
}
