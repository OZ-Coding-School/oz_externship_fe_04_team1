import CourseBookmark from '@/components/common/cards/CourseBookmark'
import Search from '@/components/common/search/Search'
import useBookmarkStudy from '@/hooks/quries/useBookMarkStudy'

function BookMarkStudyDesktop() {
  const { data } = useBookmarkStudy()
  // 추후 북마크한 항목 없을때 항목 없음 컴포넌트 렌더링해야함
  // 추후 무한 스크롤 구현하기
  return (
    <>
      {/* 제목 및 검색 컴포넌트 파트 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-semibold text-gray-900">
            북마크한 강의
          </span>
          <span className="text-base text-gray-600">
            나중에 수강할 강의들을 모아두었습니다.
          </span>
        </div>
        <Search placeHolder="강의명이나 강사로 검색..." />
      </div>
      {/* 카드 컴포넌트 */}
      <div className="mt-6 flex flex-col gap-4">
        {data.map((value) => (
          <CourseBookmark
            key={value.id}
            studyBookMarkData={value}
            onBookmarkClick={() => console.log('bookmark clicked')}
            onViewClick={() => console.log('view clicked')}
          />
        ))}
      </div>
    </>
  )
}
export default BookMarkStudyDesktop
