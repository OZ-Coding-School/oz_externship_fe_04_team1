import notificationIcon from '@/assets/icons/notification.svg'
import profileIcon from '@/assets/icons/profileImg.svg'
import topArrow from '@/assets/icons/topArrow.svg'
import UserModal from '@/components/common/header/UserModal'
import useUserData from '@/hooks/quries/useUserData'
import { useState } from 'react'
function User() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  // 로그인했을때의 모달 상태 관리
  const handleUserModal = () => {
    setIsUserModalOpen((prev) => !prev)
  }
  const { data } = useUserData()
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
        <img
          src={notificationIcon}
          alt="notificationIcon"
          className="h-[30px] w-[30px] cursor-pointer"
        />
        {/* 이것도 알림개수 연동시키기 */}
        {/* 클릭하면 알림 모달 창 나타나게 */}
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
        <div className="text-primary-600 text-base">{data[0].name}</div>
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
