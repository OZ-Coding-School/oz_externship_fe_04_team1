import useCompleteStudyData from '@/hooks/quries/useCompleteStudy'
import StudyCompleteCard from '@/components/common/cards/StudyCompleteCard'
import ReviewOverLay from '../overlay/ReviewOverLay'
import { ReviewModalProvider } from '@/store/context/reviewModalContext'
import NoData from '@/components/common/notFound/noData'
import { useRef, useState } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Loading from '@/components/common/loading'
const PAGE_SIZE = 6
function CompleteStudy() {
  const { data: completeStudyData } = useCompleteStudyData()
  const now = new Date()
  // 현재 시간 기준으로 완료된 스터디 목록 필터링
  const filteredData = completeStudyData.filter((value) => {
    const endAt = new Date(value.end_at)
    return value.status === 'ENDED' && now > endAt
  })
  // api에 페이지네이션이 없어 직접 6개씩 잘라서 구현
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  // 보여줄 항목
  const end = page * PAGE_SIZE
  const visibleStudies = filteredData.slice(0, page * PAGE_SIZE)
  const hasMore = end < filteredData.length
  const loadMore = () => {
    if (!hasMore || isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 500)
  }
  useInfiniteScroll(loadMoreRef, loadMore)
  return (
    <ReviewModalProvider>
      <ReviewOverLay />
      {/* 제목 부분 */}
      <div className="flex flex-col gap-1 sm:gap-2">
        <span className="text-lg font-semibold text-gray-900 sm:text-2xl">
          완료된 스터디
        </span>
        <span className="hidden sm:block sm:text-base sm:text-gray-600">
          종료된 스터디 그룹에 대한 리뷰를 작성해보세요
        </span>
        <span className="text-sm text-gray-600 sm:hidden">
          종료된 스터디 리뷰
        </span>
      </div>
      {/* 카드 부분 */}
      {visibleStudies.length > 0 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-6 xl:justify-start">
          {visibleStudies.map((value) => (
            <StudyCompleteCard key={value.id} studyCompleteCardData={value} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <NoData />
        </div>
      )}
      <div ref={loadMoreRef} className="h-4" />
      {isLoading && <Loading />}
    </ReviewModalProvider>
  )
}
export default CompleteStudy
