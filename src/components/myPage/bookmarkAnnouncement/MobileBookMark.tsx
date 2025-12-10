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
import { useState } from 'react'
import { showToast } from '@/components/common/toast/Toast'
import { axiosInstance } from '@/api/axios'
function MobileBookMark() {
  const { data: bookmarkAnnouncementdata } = useBookmarkAnnouncement()
  const { data: studyData } = useBookmarkStudy()
  const [searchParams] = useSearchParams()
  const announcementFilteredData = useAnnouncementSearchFilter(
    bookmarkAnnouncementdata
  )
  const studyFilteredData = useStudySearchFilter(studyData)
  const options = [
    `전체 (${bookmarkAnnouncementdata.length + studyData.length})`,
    `공고 (${bookmarkAnnouncementdata.length})`,
    `강의 (${studyData.length})`,
  ]
  // 드롭다운 선택된 항목 상태
  const [optionIsSelected, setOptionIsSelected] = useState<
    'ALL' | 'ANNOUNCEMENT' | 'STUDY'
  >('ALL')
  const handleDropDownChange = (value: string) => {
    if (value.startsWith('전체')) setOptionIsSelected('ALL')
    else if (value.startsWith('공고')) setOptionIsSelected('ANNOUNCEMENT')
    else if (value.startsWith('강의')) setOptionIsSelected('STUDY')
  }
  // 추후 북마크한 항목 없을때 항목 없음 컴포넌트 렌더링해야함
  // 추후 무한 스크롤 구현하기
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
        defaultValue={`전체 (${bookmarkAnnouncementdata.length + studyData.length})`}
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
              {announcementFilteredData.map((value) =>
                value.recruitment.map((v) => (
                  <StudyBookmark
                    key={value.id}
                    announcementBookmarkData={v}
                    onBookmarkClick={async () => {
                      try {
                        await axiosInstance.delete(
                          `/api/v1/recruitment-bookmarks/${v.uuid}`
                        )
                        showToast.success('성공', '북마크가 제거되었습니다.')
                      } catch (err) {
                        console.log(err)
                      }
                    }}
                    onViewClick={() => console.log('view clicked')}
                    className={
                      optionIsSelected === 'ALL' ||
                      optionIsSelected === 'ANNOUNCEMENT'
                        ? 'block'
                        : 'hidden'
                    }
                  />
                ))
              )}
              {studyFilteredData.map((value) => (
                <CourseBookmark
                  key={value.id}
                  studyBookMarkData={value}
                  onBookmarkClick={async () => {
                    try {
                      await axiosInstance.delete(
                        `/api/v1/lecture-bookmarks/${value.id}`
                      )
                      showToast.success('성공', '북마크가 제거되었습니다.')
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                  onViewClick={() => console.log('view clicked')}
                  className={
                    optionIsSelected === 'ALL' || optionIsSelected === 'STUDY'
                      ? 'block'
                      : 'hidden'
                  }
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
                  onBookmarkClick={async () => {
                    try {
                      await axiosInstance.delete(
                        `/api/v1/recruitment-bookmarks/${v.uuid}`
                      )
                      showToast.success('성공', '북마크가 제거되었습니다.')
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                  onViewClick={() => console.log('view clicked')}
                  className={
                    optionIsSelected === 'ALL' ||
                    optionIsSelected === 'ANNOUNCEMENT'
                      ? 'block'
                      : 'hidden'
                  }
                />
              ))
            )}
            {studyData.map((value) => (
              <CourseBookmark
                key={value.id}
                studyBookMarkData={value}
                onBookmarkClick={async () => {
                  try {
                    await axiosInstance.delete(
                      `/api/v1/lecture-bookmarks/${value.id}`
                    )
                    showToast.success('성공', '북마크가 제거되었습니다.')
                  } catch (err) {
                    console.log(err)
                  }
                }}
                onViewClick={() => console.log('view clicked')}
                className={
                  optionIsSelected === 'ALL' || optionIsSelected === 'STUDY'
                    ? 'block'
                    : 'hidden'
                }
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
export default MobileBookMark
