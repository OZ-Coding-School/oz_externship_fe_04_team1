import MobileBookMark from '@/components/myPage/bookmarkAnnouncement/MobileBookMark'
import BookMarkStudyDesktop from '@/components/myPage/bookmarkStudy/BookMarkStudyDesktop'

function BookMarkStudy() {
  return (
    <>
      <div className="hidden md:block">
        <BookMarkStudyDesktop />
      </div>
      <div className="block md:hidden">
        <MobileBookMark />
      </div>
    </>
  )
}
export default BookMarkStudy
