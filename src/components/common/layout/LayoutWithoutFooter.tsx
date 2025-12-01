import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'

function LayoutWithoutFooter() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  return (
    <>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Outlet />
    </>
  )
}
export default LayoutWithoutFooter
