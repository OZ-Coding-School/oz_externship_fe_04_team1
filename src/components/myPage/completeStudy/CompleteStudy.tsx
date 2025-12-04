import useCompleteStudyData from '@/hooks/quries/useCompleteStudy'
import StudyCompleteCard from '@/components/common/cards/StudyCompleteCard'
import ReviewOverLay from '../overlay/ReviewOverLay'
import { ReviewModalProvider } from '@/store/context/reviewModalContext'
function CompleteStudy() {
  const { data } = useCompleteStudyData()
  const now = new Date()
  // 현재 시간 기준으로 완료된 스터디 목록 필터링
  const filteredData = data.filter((value) => {
    const endAt = new Date(value.end_at)
    return value.status === 'ENDED' && now > endAt
  })
  // 완료된 스터디 항목에 대한 데이터 -> 추후 데이터가 없을때 항목없음 컴포넌트 렌더링 해야함 + 무한 스크롤

  // 개월수 계산 함수
  function calculateDurationMonths(start: string, end: string) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const yearDiff = endDate.getFullYear() - startDate.getFullYear()
    const monthDiff = endDate.getMonth() - startDate.getMonth()

    return yearDiff * 12 + monthDiff
  }
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
      <div className="mt-6 flex flex-wrap justify-center gap-6 xl:justify-start">
        {filteredData.map((value) => (
          <StudyCompleteCard
            key={value.id}
            thumbnail_img_url={value.profile_img_url}
            name={value.name}
            duration={`${calculateDurationMonths(value.start_at, value.end_at)}개월`}
            end_at={value.end_at.slice(0, 7).split('-').join('년 ')}
            participants={value.current_headcount}
            review={value.reviews.find((val) => val.is_mine)}
            is_leader={value.is_leader}
          />
        ))}
      </div>
    </ReviewModalProvider>
  )
}
export default CompleteStudy
