import { http, HttpResponse } from 'msw'

import { getNotificationList, notificationStore } from './mockData'

export const notificationHandlers = [
  // 알림 목록 조회
  http.get('/api/v1/notifications', ({ request }) => {
    const url = new URL(request.url)
    const cursor =
      url.searchParams.get('cursor') || url.searchParams.get('cousor')
    const pageSize = Number(url.searchParams.get('page_size')) || 5
    const isReadParam = url.searchParams.get('is_read')
    const isRead =
      isReadParam === null ? undefined : isReadParam === 'true' ? true : false

    return HttpResponse.json(
      getNotificationList(url.origin, pageSize, cursor, isRead)
    )
  }),

  // 전체 읽기
  http.post('/api/v1/notifications/read-all', () => {
    // 모든 알림을 읽음 처리
    notificationStore.list = notificationStore.list.map((n) => ({
      ...n,
      is_read: true,
    }))
    return HttpResponse.json({ detail: '전체 알림을 읽음 처리했습니다.' })
  }),

  // 개별 읽기
  http.post('/api/v1/notifications/:id/read', ({ params }) => {
    const id = Number(params.id)
    const target = notificationStore.list.find((n) => n.id === id)

    if (!target) {
      return HttpResponse.json(
        { error_detail: '해당 알림 내역을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    notificationStore.list = notificationStore.list.map((n) =>
      n.id === id ? { ...n, is_read: true } : n
    )

    return HttpResponse.json({ detail: '알림을 읽음 처리했습니다.' })
  }),
]