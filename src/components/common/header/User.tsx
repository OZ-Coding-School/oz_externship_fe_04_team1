import notificationIcon from '@/assets/icons/notification.svg'
import profileIcon from '@/assets/icons/profileImg.svg'
import topArrow from '@/assets/icons/topArrow.svg'
import { useState } from 'react'
import UserModal from '@/components/common/header/UserModal'

function User() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  // 로그인했을때의 모달 상태 관리
  const handleUserModal = () => {
    setIsUserModalOpen((prev) => !prev)
  }
  return (
    <>
      <div className="ml-auto flex">
        <div className="flex items-center gap-[32px] text-[17px] text-[#374151]">
          <div className="hidden md:flex md:gap-[32px]">
            <span className="cursor-pointer hover:text-[#CA8A04]">
              강의 목록
            </span>
            {/* 클릭하면 강의목록 페이지 렌더링 */}
            <span className="cursor-pointer hover:text-[#CA8A04]">
              스터디 그룹
            </span>
            {/* 스터디 그룹은 로그인 안되어있으면 로그인 페이지 알림 ui */}
            <span className="cursor-pointer hover:text-[#CA8A04]">
              구인 공고
            </span>
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
          className="relative ml-[16px] flex cursor-pointer items-center gap-[8px]"
          onClick={handleUserModal}
        >
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#FEF9C3]">
            <img
              src={profileIcon}
              alt="profileIcon"
              className="h-[25px] w-[25px]"
            />
          </div>
          <div className="text-[16px] text-[#CA8A04]">김개발</div>
          {isUserModalOpen ? (
            <img src={topArrow} alt="topArrow" className="h-[17px] w-[17px]" />
          ) : (
            <img
              src={topArrow}
              alt="bottomArrow"
              className="h-[17px] w-[17px] rotate-180"
            />
          )}

          {/* 추후 목업데이터로 먼저 구현예정 */}
        </div>
      </div>
      {isUserModalOpen && <UserModal />}
    </>
  )
}
export default User
