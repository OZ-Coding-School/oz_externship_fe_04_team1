import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import type { Review } from '@/types/review'
import { Star } from 'lucide-react'
import { useState } from 'react'
interface CompleteStudyReviewModalProps {
  onCloseModal: () => void
  review?: Review | null
}
function CompleteStudyReviewModal({
  onCloseModal,
  review,
}: CompleteStudyReviewModalProps) {
  // 모달 닫히는 핸들러
  // teatarea value 상태
  const [content, setContent] = useState(review?.reviews?.content || '')
  // 별점 상태
  const [rating, setRating] = useState(
    Number(review?.reviews?.star_rating ?? 0)
  )
  return (
    <>
      {/* 제목부분 */}
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">스터디 리뷰</span>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={onCloseModal}
        />
      </div>
      {/* 리뷰 부분 */}
      {/* 제목 및 기간 파트 */}
      <div className="mt-6 flex flex-col gap-2">
        <span className="text-base font-medium text-gray-900">
          {review?.name}
        </span>
        <span className="text-sm text-gray-600">
          {review?.duration} · {review?.end_at}월 종료
        </span>
        {/* 제목 및 duration close받아오기 */}
      </div>
      {/* 평점 파트 */}
      <div className="mt-6 flex flex-col gap-3">
        <span className="text-sm text-gray-700">평점</span>
        {/* 평점 받아오기 -> 리뷰 없으면 0으로 시작 */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`text-primary-400 h-7 w-5 cursor-pointer ${idx < rating ? 'fill-yellow-400' : ''}`}
              onClick={() => setRating(idx + 1)}
            />
          ))}
        </div>
      </div>
      {/* 리뷰 내용파트 */}
      <div className="mt-6 flex flex-col gap-3">
        <span className="text-sm text-gray-700">리뷰 내용</span>
        <textarea
          placeholder="스터디에 대한 솔직한 후기를 남겨주세요"
          className="h-[128px] resize-none rounded-lg border-2 border-solid border-gray-300 px-3 py-2 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          // 글자수 제한
        />
        <span className="text-xs text-gray-500">{content.length}/500자</span>
      </div>
      {/* 버튼 파트 */}
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onCloseModal} className="w-1/2">
          취소
        </Button>
        <Button
          variant="primary"
          disabled={(review?.reviews?.content ?? '') === content}
          className="w-1/2"
        >
          리뷰 등록
        </Button>
        {/* 등록 누르면 post or patch 연동 */}
      </div>
    </>
  )
}
export default CompleteStudyReviewModal
