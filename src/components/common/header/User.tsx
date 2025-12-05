import notificationIcon from '@/assets/icons/notification.svg'
import profileIcon from '@/assets/icons/profileImg.svg'
import topArrow from '@/assets/icons/topArrow.svg'
import useUserData from '@/hooks/quries/useUserData'
import useIsDesktop from '@/hooks/useIsDesktop'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import UserModal from './UserModal'
import NotificationModal from '../notification/NotificationModal'
function User() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)
  const [isAlarmAnimating, setIsAlarmAnimating] = useState(false)
  const isDesktop = useIsDesktop()
  // 로그인했을때의 모달 상태 관리
  const handleUserModal = () => {
    setIsUserModalOpen((prev) => !prev)
  }
  // 알림 모달 토글 (애니메이션 중에는 연타 방지)
  const handleAlarmModal = () => {
    if (isAlarmAnimating) return
    setIsAlarmAnimating(true)
    setIsAlarmOpen((prev) => !prev)
    if (isUserModalOpen) {
      setIsUserModalOpen(false)
    }
  }
  const { data: userData } = useUserData()
  return (
    <div className="ml-auto flex">
      <div className="flex items-center gap-8 text-base text-gray-700">
        <div className="hidden md:flex md:gap-8">
          <a href="" className="hover:text-primary-600 cursor-pointer">
            강의 목록
          </a>
          {/* 클릭하면 강의목록 페이지 렌더링 */}
          <a href="" className="hover:text-primary-600 cursor-pointer">
            스터디 그룹
          </a>
          {/* 클릭하면 스터디그룹 페이지로 렌더링 */}
          <a href="" className="hover:text-primary-600 cursor-pointer">
            구인 공고
          </a>
          {/* 클릭하면 구인공고 페이지 렌더링 */}
        </div>
        <div className="relative">
          <img
            src={notificationIcon}
            alt="notificationIcon"
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={handleAlarmModal}
          />
          {/* 알림 모달,바텀시트 오픈 */}
          {/* 모바일일 때만 배경 오버레이 렌더링 */}
          {!isDesktop && isAlarmOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 md:bg-transparent"
              onClick={() => {
                setIsAlarmAnimating(true)
                setIsAlarmOpen(false)
              }}
            />
          )}
          <AnimatePresence
            mode="wait"
            onExitComplete={() => setIsAlarmAnimating(false)}
          >
            {isAlarmOpen && (
              <NotificationModal
                isDesktop={isDesktop}
                onClose={() => {
                  setIsAlarmAnimating(true)
                  setIsAlarmOpen(false)
                }}
                onAnimationComplete={() => setIsAlarmAnimating(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* 클릭하면 유저 모달 나오게 */}
      <div
        className="relative ml-4 flex cursor-pointer items-center gap-2"
        onClick={handleUserModal}
      >
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#FEF9C3]">
          <img
            src={profileIcon}
            alt="profileIcon"
            className="h-[25px] w-[25px]"
          />
        </div>
        <div className="text-primary-600 text-base">{userData[0]?.name}</div>
        {isUserModalOpen ? (
          <img
            src={topArrow}
            alt="topArrow"
            className="hidden md:block md:h-[17px] md:w-[17px]"
          />
        ) : (
          <img
            src={topArrow}
            alt="bottomArrow"
            className="hidden md:block md:h-[17px] md:w-[17px] md:rotate-180"
          />
        )}
        {isUserModalOpen && <UserModal />}
        {/* 추후 목업데이터로 먼저 구현예정 */}
      </div>
    </div>
  )
}
export default User
