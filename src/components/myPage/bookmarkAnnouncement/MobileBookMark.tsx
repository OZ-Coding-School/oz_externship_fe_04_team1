import Search from '@/components/common/search/Search'
import StudyBookmark from '@/components/common/cards/StudyBookmark'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
import useBookmarkStudy from '@/hooks/quries/useBookMarkStudy'
import CourseBookmark from '@/components/common/cards/CourseBookmark'
function MobileBookMark() {
  const { data } = useBookmarkAnnouncement()
  const { data: studyData } = useBookmarkStudy()
  // 추후 북마크한 항목 없을때 항목 없음 컴포넌트 렌더링해야함
  // 추후 무한 스크롤 구현하기
  return (
    <>
      {/* 제목 */}
      <div className="mb-1 flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-900">북마크</span>
        <span className="text-sm text-gray-600">
          저장한 스터디 공고 및 강의
        </span>
      </div>
      {/* 검색모달 */}
      <Search placeHolder="공고 및 강의 검색..." className="w-full" />
      {/* 카드 컴포넌트 */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {data?.map((value) =>
          value.recruitment.map((v) => (
            <StudyBookmark
              key={value.id}
              title={v.title}
              thumbnail_img_url={v.thumbnail_img_url}
              expected_headcount={v.expected_headcount}
              close_at={v.close_at.slice(0, 10)}
              // Api 명세서에 맞추어서 slice 사용
              view_count={v.views_count}
              bookmark_count={v.bookmark_count}
              lectures={v.lecture}
              tags={v.tags}
              isBookmarked
              onBookmarkClick={() => console.log('bookmark clicked')}
              // 추후에 북마크 클릭시 북마크 목록에서 삭제되게 구현하기
              onViewClick={() => console.log('view clicked')}
              // 공고 보기 클릭시 해당 url로 이동시키게 구현해야함
            />
          ))
        )}
        {/* 추후 강의도 추가해야함 */}
        {studyData.map((value) => (
          <CourseBookmark
            key={value.id}
            title={value.title}
            instructor={value.instructor}
            total_class_time={value.total_class_time}
            original_price={value.original_price}
            discounted_price={value.discounted_price}
            difficulty={value.difficulty}
            thumbnail_img_url={value.thumbnail_img_url}
            platform={value.platform}
            isBookmarked
            onBookmarkClick={() => console.log('bookmark clicked')}
            onViewClick={() => console.log('view clicked')}
          />
        ))}
      </div>
    </>
  )
}
export default MobileBookMark
