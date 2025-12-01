import Search from '@/components/common/search/Search'
import StudyBookmark from '@/components/common/cards/StudyBookmark'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
function MobileBookMark() {
  const { data } = useBookmarkAnnouncement()
  return (
    <div className="bg-basic-white flex w-full min-w-[352px] flex-col gap-3 rounded-xl border-2 border-solid border-gray-200 px-4 py-4">
      {/* 제목 */}
      <div className="mb-1 flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-900">북마크</span>
        <span className="text-sm text-gray-600">
          저장한 스터디 공고 및 강의
        </span>
      </div>
      {/* 드롭다운? */}

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
      </div>
    </div>
  )
}
export default MobileBookMark
