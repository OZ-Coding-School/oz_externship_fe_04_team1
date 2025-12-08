import StudyBookmark from '@/components/common/cards/StudyBookmark'
import NoSearchReult from '@/components/common/notFound/noSearchResult'
import Search from '@/components/common/search/Search'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
import { useAnnouncementSearchFilter } from '@/hooks/useAnnouncementSearchFilter'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
function BookMarkAnnouncementDesktop() {
  const { data: bookmarkAnnouncementdata } = useBookmarkAnnouncement()
  const [searchParams, setSearchParams] = useSearchParams()
  const filteredData = useAnnouncementSearchFilter(bookmarkAnnouncementdata)
  // 새로고침시 검색 기록 초기화
  useEffect(() => {
    setSearchParams({ search: '' })
  }, [])
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
        {/* 검색 목록이 존재한다면 해당 목록 렌더링, 검색 하지 않았을시 전체 렌더링, 만약 검색 결과가 없다면 검색 결과 없음 컴포넌트 보여주기*/}
        {searchParams.get('search') ? (
          filteredData && filteredData.length > 0 ? (
            filteredData.map((value) =>
              value.recruitment.map((v) => (
                <StudyBookmark
                  key={value.id}
                  announcementBookmarkData={v}
                  onBookmarkClick={() => console.log('bookmark clicked')}
                  onViewClick={() => console.log('view clicked')}
                />
              ))
            )
          ) : (
            <NoSearchReult searchResult={searchParams.get('search') ?? ''} />
          )
        ) : (
          bookmarkAnnouncementdata?.map((value) =>
            value.recruitment.map((v) => (
              <StudyBookmark
                key={value.id}
                announcementBookmarkData={v}
                onBookmarkClick={() => console.log('bookmark clicked')}
                onViewClick={() => console.log('view clicked')}
              />
            ))
          )
        )}
      </div>
    </>
  )
}
export default BookMarkAnnouncementDesktop
