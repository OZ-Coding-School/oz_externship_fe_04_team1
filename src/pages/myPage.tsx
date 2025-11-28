import ApplyList from '@/components/myPage/ApplyList'
import BookMarkAnnouncement from '@/components/myPage/BookMarkAnnouncement'
import BookMarkStudy from '@/components/myPage/BookMarkStudy'
import CompleteStudy from '@/components/myPage/CompleteStudy'
import MyInformation from '@/components/myPage/myInformation/MyInformation'
import MyPageStateStore from '@/store/mypageStateStore'

function MyPage() {
  const myPageState = MyPageStateStore((state) => state.myPageState)
  return (
    <>
      {myPageState === 'MY_INFORMATION' && <MyInformation />}
      {myPageState === 'BOOKMARK_ANNOUNCEMENT' && <BookMarkAnnouncement />}
      {myPageState === 'BOOKMARK_STUDY' && <BookMarkStudy />}
      {myPageState === 'APPLY_LIST' && <ApplyList />}
      {myPageState === 'COMPLETE_STUDY' && <CompleteStudy />}
    </>
  )
}
export default MyPage
