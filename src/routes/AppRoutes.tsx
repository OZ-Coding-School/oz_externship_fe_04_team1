import Layout from '@/components/common/layout/Layout'
import MyPageLayout from '@/components/common/layout/MyPageLayout'
import ApplyList from '@/components/myPage/ApplyList'
import BookMarkAnnouncement from '@/components/myPage/bookmarkAnnouncement/BookMarkAnnouncement'
import BookMarkStudy from '@/components/myPage/BookMarkStudy'
import CompleteStudy from '@/components/myPage/CompleteStudy'
import { ROUTE_PATHS } from '@/constant/route'
import Main from '@/pages/main'
import MyPage from '@/pages/myPage'
import SignupPage from '@/pages/signupPage'
import { Route, Routes } from 'react-router'
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
        <Route path={ROUTE_PATHS.MYPAGE.MY_INFORMATION} element={<MyPage />} />
        <Route
          path={ROUTE_PATHS.MYPAGE.BOOKMARK_ANNOUNCEMENT}
          element={<BookMarkAnnouncement />}
        />
        <Route
          path={ROUTE_PATHS.MYPAGE.BOOKMARK_STUDY}
          element={<BookMarkStudy />}
        />
        <Route path={ROUTE_PATHS.MYPAGE.APPLY_LIST} element={<ApplyList />} />
        <Route
          path={ROUTE_PATHS.MYPAGE.COMPLETE_STUDY}
          element={<CompleteStudy />}
        />
      </Route>
      {/* 회원가입 */}
      <Route path={ROUTE_PATHS.SIGNUP} element={<SignupPage />} />
    </Routes>
  )
}
export default AppRoutes
