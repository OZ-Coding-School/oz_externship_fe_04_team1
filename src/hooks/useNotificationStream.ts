import { useEffect, useRef } from 'react'
import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { API_BASE_URL } from '@/constant/api'
import {
  alarmMapper,
  type NotificationApiItem,
} from '@/mappers/notification/mapper'
import { useAuthStore } from '@/store/userStore'

type StreamMessage =
  | (NotificationApiItem & { id: number | string })
  | { type: 'connected'; id?: undefined }

type UseNotificationStreamOptions = {
  onMessage?: (data: ReturnType<typeof alarmMapper>) => void
  onUnauthorized?: () => void
}

export function useNotificationStream(options?: UseNotificationStreamOptions) {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((s) => s.accessToken)
  const optionsRef = useRef(options)
  const handledUnauthorizedRef = useRef(false)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    if (!accessToken) return

    const streamUrl = `${API_BASE_URL}/v1/notifications/stream`
    const es = new EventSourcePolyfill(streamUrl, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    es.onmessage = (event: MessageEvent) => {
      try {
        const raw = JSON.parse(event.data) as StreamMessage
        const msgType = (raw as StreamMessage)['type']
        // keepalive/connected 이벤트는 무시
        if (!raw.id || msgType === 'connected') {
          return
        }
        const alarm = alarmMapper(raw)
        // 새 알림 로그로 식별 가능하게 기록
        // eslint-disable-next-line no-console
        console.log('[SSE] new notification', raw)
        // 새 알림을 캐시에 바로 반영해 추가 페칭을 줄입니다.
        const filters: Array<'all' | 'unread' | 'read'> = [
          'all',
          'unread',
          'read',
        ]
        filters.forEach((filterKey) => {
          if (filterKey === 'unread' && alarm.isRead) return
          if (filterKey === 'read' && !alarm.isRead) return
          type CursorPage = {
            next: string | null
            previous: string | null
            results: ReturnType<typeof alarmMapper>[]
            total?: number
            unread_total?: number
          }
          queryClient.setQueryData<InfiniteData<CursorPage>>(
            ['notifications', filterKey],
            (prev) => {
              if (!prev) return prev
              // 중복 알림은 추가하지 않음
              const exists = prev.pages.some((p) =>
                p.results.some((item) => item.id === alarm.id)
              )
              if (exists) return prev
              const [firstPage, ...rest] = prev.pages
              const isUnread = !alarm.isRead
              const nextTotal = (firstPage.total ?? 0) + 1
              const nextUnread =
                filterKey !== 'read' && isUnread
                  ? (firstPage.unread_total ?? 0) + 1
                  : firstPage.unread_total
              const updatedFirstPage = {
                ...firstPage,
                total: nextTotal,
                unread_total: nextUnread,
                results: [alarm, ...firstPage.results],
              }
              return {
                ...prev,
                pages: [updatedFirstPage, ...rest],
              }
            }
          )
        })
        optionsRef.current?.onMessage?.(alarm)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('SSE parse error', e)
      }
    }

    type SSEErrorEvent = Event & { status?: number }

    es.onerror = (event: SSEErrorEvent) => {
      if (event.status === 401 && !handledUnauthorizedRef.current) {
        handledUnauthorizedRef.current = true
        optionsRef.current?.onUnauthorized?.()
      }
      es.close()
    }

    return () => {
      es.close()
    }
  }, [accessToken, queryClient])
}
