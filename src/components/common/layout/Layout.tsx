import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'

function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  return (
    <>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Outlet />
      <Footer />
      {isSideBarOpen && (
        <div className="fixed inset-0 h-full w-full bg-black opacity-50 md:hidden"></div>
      )}
    </>
  )
}
export default Layout
