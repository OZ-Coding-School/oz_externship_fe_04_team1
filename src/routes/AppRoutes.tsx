import Layout from '@/components/common/layout/Layout'
import MyPageLayout from '@/components/common/layout/MyPageLayout'
import LayoutWithoutFooter from '@/components/common/layout/LayoutWithoutFooter'
import { ROUTE_PATHS } from '@/constant/route'
import Main from '@/pages/main'
import MyPage from '@/pages/myPage'
import SignupPage from '@/pages/signupPage'
import { Route, Routes } from 'react-router'
import LoginPage from '@/pages/loginPage'
import SocialCallback from '@/pages/socialCallback'
function AppRoutes() {
  return (
    <Routes>
      {/* 기본 레이아웃 */}
      <Route element={<Layout />}>
        {/* 이곳에 라우팅 추가하기 */}
        <Route index element={<Main />} />
      </Route>
      {/* 마이페이지 레이아웃 */}
      <Route element={<MyPageLayout />}>
        <Route path={ROUTE_PATHS.MYPAGE} element={<MyPage />} />
      </Route>
      {/* 회원가입 */}
      <Route element={<LayoutWithoutFooter />}>
        <Route path={ROUTE_PATHS.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTE_PATHS.SOCIAL_CALLBACK}
          element={<SocialCallback />}
        />
      </Route>
    </Routes>
  )
}
export default AppRoutes
