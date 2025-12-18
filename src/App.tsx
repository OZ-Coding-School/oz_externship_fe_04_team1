import AppRoutes from '@/routes/AppRoutes'

import { ToastContainer } from 'react-toastify'
import MoveToTop from '@/components/common/moveToTop/MoveToTop'

function App() {
  return (
    <>
      <ToastContainer />
      <MoveToTop />
      <AppRoutes />
    </>
  )
}
export default App
