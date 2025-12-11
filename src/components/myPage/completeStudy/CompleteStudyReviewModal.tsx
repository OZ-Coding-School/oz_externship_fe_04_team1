import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import type { Review } from '@/types/review'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { calculateDurationMonths } from '@/utils/calculateMonth'
import { useForm } from 'react-hook-form'
import type { EditReview } from '@/types/review'
import Input from '@/components/common/Input'
import { usePatchReview, usePostReview } from '@/hooks/quries/useReview'
interface CompleteStudyReviewModalProps {
  onCloseModal: () => void
  reviewInformation: Review
}
function CompleteStudyReviewModal({
  onCloseModal,
  reviewInformation,
}: CompleteStudyReviewModalProps) {
  const { mutate: postReview } = usePostReview()
  const { mutate: patchReview } = usePatchReview()
  const myReviewInformation = reviewInformation.reviews?.find(
    (value) => value.is_mine
  )
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      content: myReviewInformation?.content || '',
      star_rating: myReviewInformation?.star_rating ?? 0,
    },
    mode: 'onChange',
  })
  const content = watch('content')
  const onSubmit = (formData: EditReview) => {
    if (myReviewInformation) {
      patchReview({
        group_id: reviewInformation.id,
        review_id: myReviewInformation.id,
        data: formData,
      })
    } else {
      postReview({
        group_id: reviewInformation.id,
        data: formData,
      })
    }
    onCloseModal()
  }
  // 별점 상태
  const [rating, setRating] = useState(
    Number(myReviewInformation?.star_rating ?? 0)
  )
  // myReviewInformation 이거는 내 리뷰에 해당하는것
  // reviewInformation 스터디 목록에 대한 데이터
  // 만약 리뷰가 존재한다면 patch, 존재하지 않다면 post
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {reviewInformation?.name}
        </span>
        <span className="text-sm text-gray-600">
          {calculateDurationMonths(
            reviewInformation.start_at,
            reviewInformation.end_at
          )}
          개월 · {reviewInformation?.end_at.slice(0, 7).split('-').join('년 ')}
          월 종료
        </span>
        {/* 제목 및 duration close받아오기 */}
      </div>
      {/* 평점 파트 */}
      <label htmlFor="star_rating" className="mt-6 flex flex-col gap-3">
        <span className="text-sm text-gray-700">평점</span>
        {/* 평점 받아오기 -> 리뷰 없으면 0으로 시작 */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`text-primary-400 h-7 w-5 cursor-pointer ${idx < rating ? 'fill-yellow-400' : ''}`}
              onClick={() => {
                setRating(idx + 1)
                setValue('star_rating', idx + 1)
              }}
            />
          ))}
        </div>
        <Input
          id="star_rating"
          className="hidden"
          {...register('star_rating')}
        />
      </label>
      {/* 리뷰 내용파트 */}
      <label htmlFor="content" className="mt-6 flex flex-col gap-3">
        <span className="text-sm text-gray-700">리뷰 내용</span>
        <textarea
          id="content"
          placeholder="스터디에 대한 솔직한 후기를 남겨주세요"
          className="h-[128px] resize-none rounded-lg border-2 border-solid border-gray-300 px-3 py-2 text-sm"
          {...register('content', {
            maxLength: {
              value: 500,
              message: '500자 까지 입력 가능합니다',
            },
          })}
        />
        <span className="text-xs text-gray-500">{content.length}/500자</span>
        {errors.content && (
          <span className="text-sm text-red-500">{errors.content.message}</span>
        )}
      </label>
      {/* 버튼 파트 */}
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onCloseModal} className="w-1/2">
          취소
        </Button>
        <Button
          variant="primary"
          disabled={
            (myReviewInformation?.content ?? '') === content &&
            (myReviewInformation?.star_rating ?? 0) === rating
          }
          className="w-1/2"
          type="submit"
        >
          리뷰 등록
        </Button>
      </div>
    </form>
  )
}
export default CompleteStudyReviewModal
