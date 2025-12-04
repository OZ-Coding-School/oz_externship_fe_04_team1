import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SideNavigation from '@/components/common/sideNavigation/SideNavigation'
import { MyInformationModalProvider } from '@/store/context/myInformationModalContext'
function MyPageLayout() {
  // 사이드바 상태
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <MyInformationModalProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div className="flex w-full flex-1 bg-gray-50 p-8">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row">
            <SideNavigation />
            {/* Outlet 요소에 props를 전달하기 위해 context사용 */}
            <div className="bg-basic-white w-full rounded-xl border border-solid border-gray-200 px-8 py-8">
              <Outlet />
            </div>
          </div>
        </div>
        {isSideBarOpen && (
          <div className="fixed inset-0 h-full w-full bg-black opacity-50 md:hidden"></div>
        )}
      </div>
    </MyInformationModalProvider>
  )
}
export default MyPageLayout
