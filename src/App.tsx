import AppRoutes from '@/routes/AppRoutes'
import { useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify'
import MoveToTop from '@/components/common/moveToTop/MoveToTop'
import { ROUTE_PATHS } from './constant/route'

function App() {
  const { pathname } = useLocation()
  const isMyPage = pathname.startsWith(ROUTE_PATHS.MYPAGE)
  const isLoginPage = pathname.startsWith(ROUTE_PATHS.LOGIN)
  const isSignupPage = pathname.startsWith(ROUTE_PATHS.SIGNUP)
  const isSpecialPage = isMyPage || isLoginPage || isSignupPage
  return (
    <>
      <ToastContainer position={isSpecialPage ? 'top-right' : 'top-center'} />
      <MoveToTop />
      <AppRoutes />
    </>
  )
}
export default App
