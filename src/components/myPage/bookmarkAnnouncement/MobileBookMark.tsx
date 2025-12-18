import Search from '@/components/common/search/Search'
import StudyBookmark from '@/components/common/cards/StudyBookmark'
import useBookmarkAnnouncement from '@/hooks/quries/useBookMarkAnnouncement'
import useBookmarkStudy from '@/hooks/quries/useBookMarkStudy'
import CourseBookmark from '@/components/common/cards/CourseBookmark'
import { useSearchParams } from 'react-router'
import { useAnnouncementSearchFilter } from '@/hooks/useAnnouncementSearchFilter'
import { useStudySearchFilter } from '@/hooks/useStudySearchFilter'
import NoSearchReult from '@/components/common/notFound/noSearchResult'
import DeleteReasonModal from '@/components/common/DeleteReasonModal'
import { useEffect, useRef, useState } from 'react'
import { useDeleteBookmarkAnnouncement } from '@/hooks/quries/useDeleteBookmarkAnnouncement'
import { useDeleteBookmarkStudy } from '@/hooks/quries/useDeleteBookmarkStudy'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Loading from '@/components/common/loading'
import NoData from '@/components/common/notFound/noData'
function MobileBookMark() {
  const {
    data: bookmarkAnnouncementdata,
    fetchNextPage: announceFetchNextPage,
    hasNextPage: announceHasNextPage,
    isFetchingNextPage: announceIsFetchingNextPage,
  } = useBookmarkAnnouncement()
  const {
    data: bookmarkStudyData,
    fetchNextPage: studyFetchNextPage,
    hasNextPage: studyHasNextPage,
    isFetchingNextPage: studyIsFetchingNextPage,
  } = useBookmarkStudy()
  const allAnnouncementResults =
    bookmarkAnnouncementdata?.pages.flatMap((page) => page.results) ?? []
  const allStudyResults =
    bookmarkStudyData?.pages.flatMap((page) => page.results) ?? []
  const [searchParams] = useSearchParams()
  const { mutate: deleteBookMarkAnnouncement } = useDeleteBookmarkAnnouncement()
  const { mutate: deleteBookmarkStudy } = useDeleteBookmarkStudy()
  const announcementFilteredData = useAnnouncementSearchFilter(
    allAnnouncementResults
  )
  const studyFilteredData = useStudySearchFilter(allStudyResults)
  const [options, setOptions] = useState([
    `공고 (${allAnnouncementResults.length})`,
    `강의 (${allStudyResults.length})`,
  ])
  // 드롭다운 선택된 항목 상태
  const [optionIsSelected, setOptionIsSelected] = useState<
    'ANNOUNCEMENT' | 'STUDY'
  >('ANNOUNCEMENT')
  const handleDropDownChange = (value: string) => {
    if (value.startsWith('공고')) setOptionIsSelected('ANNOUNCEMENT')
    else if (value.startsWith('강의')) setOptionIsSelected('STUDY')
  }
  // 추후 북마크한 항목 없을때 항목 없음 컴포넌트 렌더링해야함
  const loadMoreRef = useRef<HTMLDivElement>(null)
  // useInfiniteScroll 훅 사용
  useInfiniteScroll(
    loadMoreRef,
    () => {
      if (!searchParams.get('search')) {
        if (optionIsSelected === 'ANNOUNCEMENT') {
          if (announceHasNextPage && !announceIsFetchingNextPage)
            announceFetchNextPage()
        } else if (optionIsSelected === 'STUDY') {
          if (studyHasNextPage && !studyIsFetchingNextPage) studyFetchNextPage()
        }
      }
    },
    300
  )
  useEffect(() => {
    setOptions([
      `공고 (${allAnnouncementResults.length})`,
      `강의 (${allStudyResults.length})`,
    ])
  }, [allAnnouncementResults.length, allStudyResults.length])
  return (
    <>
      {/* 제목 */}
      <div className="mb-4 flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-900">북마크</span>
        <span className="text-sm text-gray-600">
          저장한 스터디 공고 및 강의
        </span>
      </div>
      {/* 드롭다운 모달 */}
      <DeleteReasonModal
        options={options}
        defaultValue={`공고 (${allAnnouncementResults.length})`}
        className="mb-3"
        onChange={handleDropDownChange}
      />
      {/* 검색모달 */}
      <Search placeHolder="공고 및 강의 검색..." className="w-full" />
      {/* 카드 컴포넌트 */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {searchParams.get('search') ? (
          announcementFilteredData.length > 0 ||
          studyFilteredData.length > 0 ? (
            <>
              {announcementFilteredData.map((value) => (
                <StudyBookmark
                  key={value.id}
                  announcementBookmarkData={value.recruitment}
                  onBookmarkClick={() => deleteBookMarkAnnouncement(value.id)}
                  onViewClick={() => console.log('view clicked')}
                  className={
                    optionIsSelected === 'ANNOUNCEMENT' ? 'block' : 'hidden'
                  }
                />
              ))}
              {studyFilteredData.map((value) => (
                <CourseBookmark
                  key={value.id}
                  studyBookMarkData={value}
                  onBookmarkClick={() => deleteBookmarkStudy(value.id)}
                  onViewClick={() => console.log('view clicked')}
                  className={optionIsSelected === 'STUDY' ? 'block' : 'hidden'}
                />
              ))}
            </>
          ) : (
            <NoSearchReult searchResult={searchParams.get('search') ?? ''} />
          )
        ) : (
          <>
            {allAnnouncementResults.length > 0 ? (
              allAnnouncementResults.map((value) => (
                <StudyBookmark
                  key={value.id}
                  announcementBookmarkData={value.recruitment}
                  onBookmarkClick={() => deleteBookMarkAnnouncement(value.id)}
                  onViewClick={() => console.log('view clicked')}
                  className={
                    optionIsSelected === 'ANNOUNCEMENT' ? 'block' : 'hidden'
                  }
                />
              ))
            ) : (
              <div
                className={
                  optionIsSelected === 'STUDY' ? 'hidden' : 'mt-4 block w-full'
                }
              >
                <NoData />
              </div>
            )}
            {allStudyResults.length > 0 ? (
              allStudyResults.map((value) => (
                <CourseBookmark
                  key={value.id}
                  studyBookMarkData={value}
                  onBookmarkClick={() => deleteBookmarkStudy(value.id)}
                  onViewClick={() => console.log('view clicked')}
                  className={optionIsSelected === 'STUDY' ? 'block' : 'hidden'}
                />
              ))
            ) : (
              <div
                className={
                  optionIsSelected === 'ANNOUNCEMENT'
                    ? 'hidden'
                    : 'mt-4 block w-full'
                }
              >
                <NoData />
              </div>
            )}
          </>
        )}
      </div>
      <div ref={loadMoreRef} className="h-4" />
      {/* 마지막 항목 도달시 */}
      {!searchParams.get('search') &&
        optionIsSelected === 'ANNOUNCEMENT' &&
        announceHasNextPage && <Loading />}
      {!searchParams.get('search') &&
        optionIsSelected === 'STUDY' &&
        studyHasNextPage && <Loading />}
    </>
  )
}
export default MobileBookMark
