import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import { Outlet } from 'react-router'
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
export default Layout
