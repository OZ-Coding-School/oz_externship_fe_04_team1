import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SideNavigation from '../sideNavigation/SideNavigation'
function MyPageLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
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
            <Outlet />
          </div>
        </div>
      </div>
      {isSideBarOpen && (
        <div className="fixed top-[0px] left-0 h-full w-full bg-black opacity-50 md:hidden"></div>
      )}
    </div>
  )
}
export default MyPageLayout
