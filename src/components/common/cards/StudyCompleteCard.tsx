import { Star, Calendar, Clock3, Users, SquarePen } from 'lucide-react'
import Button from '../Button'
import type { CompleteStudy } from '@/types/completeStudy'
import { useReviewModal } from '@/hooks/useReviewModal'
import { calculateDurationMonths } from '@/utils/calculateMonth'
import noImage from '@/assets/images/noImage.png'
interface StudyCompleteCardProps {
  studyCompleteCardData: CompleteStudy
}
function StudyCompleteCard({ studyCompleteCardData }: StudyCompleteCardProps) {
  // 내가 작성한 리뷰에 대한 데이터
  const myReviewInformation = studyCompleteCardData.reviews.find(
    (value) => value.is_mine
  )
  const stars = Array.from(
    { length: 5 },
    (_, i) => i < Math.floor(Number(myReviewInformation?.star_rating))
  )
  const { onOpenModal } = useReviewModal()
  return (
    <div className="max-h-[500px] w-[318px] rounded-lg border border-gray-200 sm:w-[384px]">
      {/* thumbnail */}
      <img
        className="h-[179px] w-full rounded-t-lg object-cover sm:h-[216px]"
        src={studyCompleteCardData.profile_img_url || noImage}
        alt={studyCompleteCardData.name}
      />

      {/* content */}
      <div className="p-3 sm:p-5">
        <div className="flex items-center justify-between pb-2 sm:pb-3">
          <h4 className="text-md font-medium md:text-lg">
            {studyCompleteCardData.name}
          </h4>
          {studyCompleteCardData.is_leader && (
            <span className="bg-primary-100 text-primary-800 rounded-full px-2 py-1 text-xs">
              리더
            </span>
          )}
        </div>

        <ul className="flex flex-col justify-center gap-1 pb-4 text-xs text-gray-600 sm:gap-2 sm:text-sm">
          <li className="flex items-center gap-1">
            <Clock3 className="h-4 w-3" /> 기간:{' '}
            {calculateDurationMonths(
              studyCompleteCardData.start_at,
              studyCompleteCardData.end_at
            )}
            개월
          </li>
          <li className="flex items-center gap-1">
            <Calendar className="h-4 w-3" />
            종료:{' '}
            {studyCompleteCardData.end_at.slice(0, 7).split('-').join('년 ')}월
          </li>
          <li className="flex items-center gap-1">
            <Users className="h-4 w-3" />
            참여자: {studyCompleteCardData.current_headcount}명
          </li>
        </ul>
        {/* review */}
        {myReviewInformation ? (
          <>
            <div className="mb-3 flex flex-col gap-2 rounded-lg bg-gray-50 p-4 sm:mb-4">
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  {stars.map((filled, idx) => (
                    <Star
                      key={idx}
                      className={`text-primary-400 h-7 w-5 ${filled ? 'fill-yellow-400' : ''}`}
                    />
                  ))}
                  <span className="text-md ml-2 font-medium text-gray-700">
                    {myReviewInformation?.star_rating}/5
                  </span>
                </div>
                <SquarePen
                  onClick={
                    () => onOpenModal(studyCompleteCardData) // 넘길 데이터
                  }
                  className="hidden h-[17px] w-4 cursor-pointer sm:block"
                />
              </div>
              <p className="line-clamp-2 text-xs text-gray-600 sm:text-sm">
                {myReviewInformation?.content}
              </p>
            </div>
            <Button
              variant="primary"
              className="block w-full p-2 sm:hidden sm:h-[40px]"
              onClick={() => {
                onOpenModal(studyCompleteCardData) // 넘길 데이터
              }}
            >
              리뷰 수정
            </Button>
          </>
        ) : (
          <>
            <div className="bg-primary-50 text-primary-800 mb-3 flex items-center justify-center rounded-lg p-2 text-xs font-normal sm:mb-4 sm:h-[53px] sm:text-sm">
              아직 리뷰를 작성하지 않았습니다
            </div>
            <Button
              onClick={() => {
                onOpenModal(studyCompleteCardData) // 넘길 데이터
              }}
              variant="primary"
              className="w-full p-2 sm:h-[40px]"
            >
              리뷰 작성
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default StudyCompleteCard
