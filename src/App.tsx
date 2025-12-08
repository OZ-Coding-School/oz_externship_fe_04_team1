import AppRoutes from '@/routes/AppRoutes'
import { useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify'
import MoveToTop from '@/components/common/moveToTop/MoveToTop'

function App() {
  const { pathname } = useLocation()
  const isSpecialPage = pathname.startsWith('/mypage')
  return (
    <>
      <ToastContainer position={isSpecialPage ? 'top-left' : 'top-center'} />
      <MoveToTop />
      <AppRoutes />
    </>
  )
}
export default App
