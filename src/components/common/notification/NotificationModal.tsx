import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, useAnimation } from 'framer-motion'

import {
  useNotificationActions,
  useNotifications,
} from '@/hooks/quries/useNotifications'

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
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>(
    'all'
  )
  const { data, isLoading, error, refetch } = useNotifications(activeFilter)
  const { markAllRead, markRead } = useNotificationActions()
  const navigate = useNavigate()
  const alarms = data?.alarms ?? []
  const errorMessage = error ? error.message : null
  const totalCount = data?.totalCount ?? 0
  const unreadCount = data?.unreadCount ?? 0
  const readCount = totalCount - unreadCount
  const controls = useAnimation()
  const originalOverflow = useRef<string>('')

  // 모달이 열려있는 동안 배경 스크롤 잠금 + 진입 위치 초기화
  useEffect(() => {
    originalOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    controls.start({ y: 0, opacity: 1 })
    return () => {
      document.body.style.overflow = originalOverflow.current
    }
  }, [controls])

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
      className="fixed inset-x-0 bottom-0 z-50 h-[70dvh] w-full overflow-hidden rounded-t-2xl border border-gray-200 bg-white pb-[45px] shadow-[0_-10px_30px_rgba(0,0,0,0.14)] md:absolute md:inset-auto md:top-10 md:right-0 md:h-[475px] md:w-[384px] md:rounded-lg md:shadow-xl"
    >
      <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-200 md:hidden" />
      <div className="flex-between h-[60px] border-b border-gray-100 px-4">
        <div className="flex items-center gap-2">
          <h5>알림</h5>
        </div>
        <button
          className="text-primary-600 text-sm"
          onClick={() => {
            // 전체 읽기 요청 후 목록을 새로 불러온다
            markAllRead().finally(() => {
              refetch()
            })
          }}
        >
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
      <div className="no-scrollbar h-[323px] overflow-y-auto">
        {isLoading && (
          <div className="p-4 text-sm text-gray-500">불러오는 중...</div>
        )}
        {errorMessage && (
          <div className="p-4 text-sm text-red-500">{errorMessage}</div>
        )}
        {!isLoading && !errorMessage && (
          <>
            {alarms.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-sm text-gray-500">
                <span className="text-base font-semibold text-gray-700">
                  알림이 없습니다
                </span>
                <span className="text-xs text-gray-400">
                  새로운 알림이 오면 이곳에 표시됩니다
                </span>
              </div>
            )}
            {alarms.length > 0 &&
              alarms.map((alarm) => (
                <NotificationCard
                  key={alarm.id}
                  message={alarm.message}
                  date={alarm.date}
                  isRead={alarm.isRead}
                  accent={alarm.accent}
                  iconType={alarm.iconType}
                  onClick={() => {
                    // 개별 읽기 요청 후 목록 새로고침
                    // TODO: 백엔드에서 내려주는 back_url_link로 이동시키기
                    markRead(alarm.id).finally(() => {
                      refetch()
                      navigate('/')
                    })
                  }}
                />
              ))}
          </>
        )}
      </div>
    </motion.div>
  )
}
