import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { axiosInstance } from '@/api/axios'
import {
  readAllNotificationsApi,
  readNotificationApi,
} from '@/api/notification'
import {
  alarmMapper,
  type NotificationListResponse,
} from '@/mappers/notification/mapper'
import type { AlarmItem } from '@/types/alarm'

type FilterKey = 'all' | 'unread' | 'read'

// 알림 목록을 가져와서 AlarmItem 배열로 변환 + 카운트 메타 반환
const fetchNotifications = async (filter: FilterKey) => {
  const isReadParam = filter === 'all' ? undefined : filter === 'read'

  try {
    const { data } = await axiosInstance.get<NotificationListResponse>(
      '/api/v1/notifications',
      {
        params: {
          page_size: 10,
          ...(typeof isReadParam === 'boolean' ? { is_read: isReadParam } : {}),
        },
      }
    )
    return {
      alarms: data.results.map(alarmMapper),
      totalCount: data.total_count,
      unreadCount: data.unread_count,
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const detail = (
        err.response?.data as { error_detail?: string } | undefined
      )?.error_detail
      throw new Error(detail || '알림을 불러오지 못했습니다.')
    }
    throw err
  }
}

export const useNotifications = (filter: FilterKey) =>
  useQuery<
    { alarms: AlarmItem[]; totalCount: number; unreadCount: number },
    Error
  >({
    queryKey: ['notifications', filter],
    queryFn: () => fetchNotifications(filter),
    // 초기 로딩 중에도 안전하게 사용
    initialData: { alarms: [] as AlarmItem[], totalCount: 0, unreadCount: 0 },
    staleTime: 0, // 실시간성을 위해 캐싱하지 않고 매번 신선하게 취급
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

export const useNotificationActions = () => {
  // 전체 읽기 요청
  const markAllRead = () => readAllNotificationsApi()
  // 개별 읽기 요청
  const markRead = (id: string) => readNotificationApi(id)

  return { markAllRead, markRead }
}
