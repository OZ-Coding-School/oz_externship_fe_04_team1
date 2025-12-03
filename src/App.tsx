import AppRoutes from '@/routes/AppRoutes'
import { useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify'

function App() {
  const { pathname } = useLocation()

  const isSpecialPage = pathname.startsWith('/mypage')
  return (
    <>
      <ToastContainer position={isSpecialPage ? 'top-left' : 'top-center'} />
      <AppRoutes />
    </>
  )
}
export default App
