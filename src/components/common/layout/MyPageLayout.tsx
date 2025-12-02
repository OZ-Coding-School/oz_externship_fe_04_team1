import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SideNavigation from '@/components/common/sideNavigation/SideNavigation'
import EditModal from '@/components/myPage/myInformation/modal/EditModal'
import EditPhoneNumber from '@/components/myPage/myInformation/modal/EditPhoneNumber'
import EditPassWordModal from '@/components/myPage/myInformation/modal/EditPassWordModal'
import WithDrawModal from '@/components/myPage/myInformation/modal/WithDrawModal'
import ApplyListModal from '@/components/myPage/applyList/ApplyListModal'
function MyPageLayout() {
  // 사이드바 상태
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  // 프로필 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // 휴대폰 전화변경 모달 상태
  const [isEditPhoneModalOpen, setIsEditPhoneModalOpen] = useState(false)
  // 비밀번호 변경 모달 상태
  const [isEditPassWordModalOpen, setIsEditPassWordModalOpen] = useState(false)
  // 회원 탈퇴 모달 상태
  const [isWithDrawModalOpen, setIsWithDrawModalOpen] = useState(false)
  // 지원 내역 상세 모달 상태
  const [isApplyListModalOpen, setIsApplyListModalOpen] = useState(false)
  // 선택된 항목에 대한 id 상태 관리
  const [applyListId, setApplyListId] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex w-full flex-1 bg-gray-50 p-8">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row">
          <SideNavigation />
          <div className="flex-1">
            {/* Outlet 요소에 props를 전달하기 위해 context사용 */}
            <Outlet
              context={{
                setIsEditModalOpen: setIsEditModalOpen,
                setIsEditPhoneModalOpen: setIsEditPhoneModalOpen,
                setIsEditPassWordModalOpen: setIsEditPassWordModalOpen,
                setIsWithDrawModalOpen: setIsWithDrawModalOpen,
                setIsApplyListModalOpen: setIsApplyListModalOpen,
                setApplyListId: setApplyListId,
              }}
            />
          </div>
        </div>
      </div>
      {isSideBarOpen && (
        <div className="fixed inset-0 h-full w-full bg-black opacity-50 md:hidden"></div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
          <EditModal setIsEditModalOpen={setIsEditModalOpen} />
        </div>
      )}
      {isEditPhoneModalOpen && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
          <EditPhoneNumber setIsEditPhoneModalOpen={setIsEditPhoneModalOpen} />
        </div>
      )}
      {isEditPassWordModalOpen && (
        <div className="tinset-0 fixed flex h-full w-full items-center justify-center bg-black/50 px-5">
          <EditPassWordModal
            setIsEditPassWordModalOpen={setIsEditPassWordModalOpen}
          />
        </div>
      )}
      {isWithDrawModalOpen && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
          <WithDrawModal setIsWithDrawModalOpen={setIsWithDrawModalOpen} />
        </div>
      )}
      {isApplyListModalOpen && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
          <ApplyListModal
            setIsApplyListModalOpen={setIsApplyListModalOpen}
            applyListId={applyListId}
          />
        </div>
      )}
    </div>
  )
}
export default MyPageLayout
