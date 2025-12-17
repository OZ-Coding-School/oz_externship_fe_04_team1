import BookMarkAnnouncementDesktop from './BookMarkAnnounceMentDesktop'
import MobileBookMark from './MobileBookMark'

function BookMarkAnnouncement() {
  return (
    <>
      <div className="hidden md:block">
        <BookMarkAnnouncementDesktop />
      </div>
      <div className="block md:hidden">
        <MobileBookMark />
      </div>
    </>
  )
}
export default BookMarkAnnouncement
