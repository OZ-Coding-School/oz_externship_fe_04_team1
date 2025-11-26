import Layout from '@/components/common/layout/Layout'
import Main from '@/pages/main'
import { Route, Routes } from 'react-router'
function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 이곳에 라우팅 추가하기 */}
        <Route index element={<Main />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
