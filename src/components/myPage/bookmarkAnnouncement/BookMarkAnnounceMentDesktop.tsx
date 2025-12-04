import StudyBookmark from '@/components/common/cards/StudyBookmark'
import Search from '@/components/common/search/Search'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
function BookMarkAnnouncementDesktop() {
  const { data } = useBookmarkAnnouncement()
  // pc버전 북마크한 공고
  // 추후 북마크한 항목 없을때 항목 없음 컴포넌트 렌더링해야함
  // 추후에 무한스크롤 구현하기
  return (
    <>
      {/* 제목 및 검색 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold text-gray-900">
            북마크한 공고
          </span>
          <span className="text-base text-gray-600">
            나중에 지원할 스터디 공고들을 모아두었습니다
          </span>
        </div>
        {/* 검색 컴포넌트 */}
        <Search placeHolder="공고 제목으로 검색..." />
      </div>
      {/* 카드 컴포넌트들 */}
      <div className="mt-6 flex flex-col gap-4">
        {data?.map((value) =>
          value.recruitment.map((v) => (
            <StudyBookmark
              key={value.id}
              studyBookmarkData={v}
              onBookmarkClick={() => console.log('bookmark clicked')}
              // 추후에 북마크 클릭시 북마크 목록에서 삭제되게 구현하기
              onViewClick={() => console.log('view clicked')}
              // 공고 보기 클릭시 해당 url로 이동시키게 구현해야함
            />
          ))
        )}
      </div>
    </>
  )
}
export default BookMarkAnnouncementDesktop
