import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// prtsist를 이용해서 새로고침해도 안바뀌게 설정 + session storage를 사용하여 재 접속할때는 초기화되게 설정
type MyPageState =
  | 'MY_INFORMATION'
  | 'BOOKMARK_ANNOUNCEMENT'
  | 'BOOKMARK_STUDY'
  | 'APPLY_LIST'
  | 'COMPLETE_STUDY'
interface MyPageStore {
  myPageState: MyPageState
  setMyPageState: (set: MyPageState) => void
}
// 마이페이지 상태 저장용
const MyPageStateStore = create(
  persist<MyPageStore>(
    (set) => ({
      myPageState: 'MY_INFORMATION',
      setMyPageState: (state) => set({ myPageState: state }),
    }),
    {
      name: 'mypage-state',
    }
  )
)
export default MyPageStateStore
