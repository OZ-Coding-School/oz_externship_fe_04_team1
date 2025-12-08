import Search from '@/components/common/search/Search'
import StudyBookmark from '@/components/common/cards/StudyBookmark'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
import useBookmarkStudy from '@/hooks/quries/useBookMarkStudy'
import CourseBookmark from '@/components/common/cards/CourseBookmark'
import { useSearchParams } from 'react-router'
import { useAnnouncementSearchFilter } from '@/hooks/useAnnouncementSearchFilter'
import { useStudySearchFilter } from '@/hooks/useStudySearchFilter'
import NoSearchReult from '@/components/common/notFound/noSearchResult'
function MobileBookMark() {
  const { data: bookmarkAnnouncementdata } = useBookmarkAnnouncement()
  const { data: studyData } = useBookmarkStudy()
  const [searchParams] = useSearchParams()
  const announcementFilteredData = useAnnouncementSearchFilter(
    bookmarkAnnouncementdata
  )
  const studyFilteredData = useStudySearchFilter(studyData)
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
        {searchParams.get('search') ? (
          announcementFilteredData.length > 0 ||
          studyFilteredData.length > 0 ? (
            <>
              {announcementFilteredData.map((value) =>
                value.recruitment.map((v) => (
                  <StudyBookmark
                    key={value.id}
                    announcementBookmarkData={v}
                    onBookmarkClick={() => console.log('bookmark clicked')}
                    onViewClick={() => console.log('view clicked')}
                  />
                ))
              )}
              {studyFilteredData.map((value) => (
                <CourseBookmark
                  key={value.id}
                  studyBookMarkData={value}
                  onBookmarkClick={() => console.log('bookmark clicked')}
                  onViewClick={() => console.log('view clicked')}
                />
              ))}
            </>
          ) : (
            <NoSearchReult searchResult={searchParams.get('search') ?? ''} />
          )
        ) : (
          <>
            {bookmarkAnnouncementdata?.map((value) =>
              value.recruitment.map((v) => (
                <StudyBookmark
                  key={value.id}
                  announcementBookmarkData={v}
                  onBookmarkClick={() => console.log('bookmark clicked')}
                  onViewClick={() => console.log('view clicked')}
                />
              ))
            )}
            {studyData.map((value) => (
              <CourseBookmark
                key={value.id}
                studyBookMarkData={value}
                onBookmarkClick={() => console.log('bookmark clicked')}
                onViewClick={() => console.log('view clicked')}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
export default MobileBookMark
