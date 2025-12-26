import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import {
  useNotificationActions,
  useNotifications,
} from '@/hooks/quries/useNotifications'
import { getAccessTokenApi } from '@/api/userInformation'
import { useNotificationStream } from '@/hooks/useNotificationStream'
import type { AlarmItem } from '@/types/alarm'
import { useAuthStore } from '@/store/userStore'

import NotificationCard from './NotificationCard'

type NotificationModalProps = {
  isDesktop: boolean
  onClose?: () => void
  onAnimationComplete?: () => void
}

export default function NotificationModal({
  isDesktop,
  onClose,
  onAnimationComplete,
}: NotificationModalProps) {
  const navigate = useNavigate()
  const SCROLL_THRESHOLD = 80
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>(
    'all'
  )
  const {
    alarms,
    isLoading,
    errorMessage,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    unreadCount,
    readCount,
  } = useNotifications(activeFilter)
  const { markAllRead, markRead } = useNotificationActions()
  const listRef = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const setAccessToken = useAuthStore((s) => s.setAccessToken)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  useNotificationStream({
    onUnauthorized: async () => {
      try {
        const newToken = await getAccessTokenApi()
        setAccessToken(newToken)
      } catch (err) {
        clearAuth()
      }
    },
  })

  // 진입 위치 초기화
  useEffect(() => {
    controls.start({ y: 0, opacity: 1 })
  }, [controls])

  // 스크롤 끝에 가까워지면 다음 페이지 요청
  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const handleScroll = () => {
      const isNearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_THRESHOLD
      if (!isNearBottom) return
      if (!hasNextPage || isFetchingNextPage) return
      fetchNextPage()
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleMarkAll = () => {
    markAllRead().finally(() => {
      refetch()
    })
  }

  const handleMarkOne = (alarm: AlarmItem) => {
    markRead(alarm.id)
      .then(() => {
        if (!alarm.backUrl) return
        // 채팅방 이동: backUrl이 "group_id:{study_group_id}" 형태일 때 현재 페이지에 쿼리 파라미터로 붙여 이동
        const groupMatch = alarm.backUrl.match(/^study_group_id\s*:\s*(.+)$/)
        if (groupMatch?.[1]) {
          const targetGroupId = groupMatch[1].trim()
          const url = new URL(window.location.href)
          url.searchParams.set('group_id', targetGroupId)
          window.history.replaceState({}, '', url.toString())
          return
        }

        const urlObj = new URL(alarm.backUrl, window.location.origin)
        const isSameOrigin = urlObj.origin === window.location.origin
        if (isSameOrigin) {
          navigate(urlObj.pathname + urlObj.search + urlObj.hash)
        } else {
          // 도메인이 다르면 현재 창에서 이동
          window.location.href = urlObj.toString()
        }
      })
      .catch(() => {
        // 읽기 실패 시에는 이동하지 않음
      })
  }

  const renderList = () => {
    if (isLoading) {
      return <div className="p-4 text-sm text-gray-500">불러오는 중...</div>
    }
    if (errorMessage) {
      return <div className="p-4 text-sm text-red-500">{errorMessage}</div>
    }
    if (alarms.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-sm text-gray-500">
          <span className="text-base font-semibold text-gray-700">
            알림이 없습니다
          </span>
          <span className="text-xs text-gray-400">
            새로운 알림이 오면 이곳에 표시됩니다
          </span>
        </div>
      )
    }
    return (
      <>
        {alarms.map((alarm: any) => (
          <NotificationCard
            key={alarm.id}
            message={alarm.message}
            date={alarm.date}
            isRead={alarm.isRead}
            accent={alarm.accent}
            iconType={alarm.iconType}
            onClick={() => handleMarkOne(alarm)}
          />
        ))}
        {isFetchingNextPage && (
          <div className="p-4 text-xs text-gray-400">불러오는 중...</div>
        )}
      </>
    )
  }

  const filterOptions = [
    { key: 'all' as const, label: '전체보기', count: totalCount },
    { key: 'unread' as const, label: '읽지않음', count: unreadCount },
    { key: 'read' as const, label: '읽음', count: readCount },
  ]
  // 뷰포트 전환 시 보이지 않게 되는 걸 방지: 항상 보이는 위치/opacity로 맞춰줌
  useEffect(() => {
    controls.start({ y: 0, opacity: 1 })
  }, [controls, isDesktop])

  return (
    <motion.div
      initial={isDesktop ? { y: 20, opacity: 0 } : { y: '100%', opacity: 0 }}
      animate={controls}
      exit={isDesktop ? { y: 20, opacity: 0 } : { y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
      drag={isDesktop ? false : 'y'}
      dragConstraints={isDesktop ? undefined : { top: 0, bottom: 800 }}
      dragElastic={isDesktop ? undefined : 0.2}
      dragMomentum={false}
      onDragEnd={
        isDesktop
          ? undefined
          : (_, info) => {
              if (info.offset.y > 80 && onClose) {
                onClose()
              } else {
                controls.start({ y: 0, opacity: 1 })
              }
            }
      }
      onAnimationComplete={onAnimationComplete}
      className="fixed inset-x-0 bottom-0 z-50 h-fit max-h-[70dvh] w-full overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.14)] md:absolute md:inset-auto md:top-10 md:right-0 md:max-h-[475px] md:w-[384px] md:rounded-lg md:shadow-xl"
    >
      <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-200 md:hidden" />
      <div className="flex-between h-[60px] border-b border-gray-100 px-4">
        <div className="flex items-center gap-2">
          <h5>알림</h5>
        </div>
        <button className="text-primary-600 text-sm" onClick={handleMarkAll}>
          모두 읽음
        </button>
      </div>
      <div className="flex h-[47px] items-center border-b border-gray-100 bg-white text-sm font-medium">
        {filterOptions.map(({ key, label, count }) => {
          const isActive = activeFilter === key
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`relative flex h-full flex-1 items-center justify-center border-b-2 transition-colors ${
                isActive
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-1">{label}</span>
              <span>({count})</span>
            </button>
          )
        })}
      </div>
      <div className="no-scrollbar h-[323px] overflow-y-auto" ref={listRef}>
        {renderList()}
      </div>
      <div className="h-[45px] border-t border-gray-200 bg-gray-50"></div>
    </motion.div>
  )
}
