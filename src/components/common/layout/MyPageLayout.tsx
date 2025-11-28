import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SideNavigation from '../sideNavigation/SideNavigation'
import EditModal from '@/components/myPage/myInformation/modal/EditModal'
function MyPageLayout() {
  // 사이드바 상태
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  // 프로필 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
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
                isEditModalOpen: isEditModalOpen,
                setIsEditModalOpen: setIsEditModalOpen,
              }}
            />
          </div>
        </div>
      </div>
      {isSideBarOpen && (
        <div className="fixed top-[0px] left-0 h-full w-full bg-black opacity-50 md:hidden"></div>
      )}
      {isEditModalOpen && (
        <div className="fixed top-[0px] left-0 flex h-full w-full items-center justify-center bg-black/50">
          <EditModal setIsEditModalOpen={setIsEditModalOpen} />
        </div>
      )}
    </div>
  )
}
export default MyPageLayout
