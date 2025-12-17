import MyPageStateStore from '@/store/mypageStateStore'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

// 페이지 이동시 제일 상단으로 이동하는 컴포넌트
function MoveToTop() {
  const { pathname } = useLocation()
  const myPageState = MyPageStateStore()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, myPageState])
  return null
}
export default MoveToTop
