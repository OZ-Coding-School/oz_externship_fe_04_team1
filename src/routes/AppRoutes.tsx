import Layout from '@/components/common/layout/Layout'
import MyPageLayout from '@/components/common/layout/MyPageLayout'
import LayoutWithoutFooter from '@/components/common/layout/LayoutWithoutFooter'
import { ROUTE_PATHS } from '@/constant/route'
import Main from '@/pages/main'
import MyPage from '@/pages/myPage'
import SignupPage from '@/pages/signupPage'
import { Route, Routes, useLocation } from 'react-router'
import LoginPage from '@/pages/loginPage'
import SocialCallback from '@/pages/socialCallback'
import FindEmailPage from '@/pages/findEmailPage'
import FindPasswordPage from '@/pages/findPasswordPage'
import { ChatWidget } from '@/components/chat/ChatWidget'
import LoginStateStore from '@/store/loginStateStore'

function AppRoutes() {
  const location = useLocation()
  const loginState = LoginStateStore((state) => state.loginState)

  const exceptChat = [
    ROUTE_PATHS.SIGNUP,
    ROUTE_PATHS.FIND_EMAIL,
    ROUTE_PATHS.FIND_PASSWORD,
    ROUTE_PATHS.LOGIN,
    ROUTE_PATHS.SOCIAL_CALLBACK,
  ].includes(location.pathname)

  return (
    <>
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
          <Route path={ROUTE_PATHS.FIND_EMAIL} element={<FindEmailPage />} />
          <Route
            path={ROUTE_PATHS.FIND_PASSWORD}
            element={<FindPasswordPage />}
          />
        </Route>
      </Routes>
      {loginState === 'USER' && !exceptChat && <ChatWidget />}
    </>
  )
}
export default AppRoutes
