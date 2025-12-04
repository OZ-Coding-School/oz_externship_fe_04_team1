import { useReviewModal } from '@/hooks/useReviewModal'
import CompleteStudyReviewModal from '../completeStudy/CompleteStudyReviewModal'

function ReviewOverLay() {
  const { onCloseModal, reviewModalState, review } = useReviewModal()
  if (reviewModalState === 'close') return null
  return (
    <div
      className="fixed inset-0 z-1 flex h-full w-full items-center justify-center bg-black/50 px-5"
      onClick={onCloseModal}
    >
      {reviewModalState === 'open' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-basic-white w-[448px] rounded-xl p-6"
        >
          <CompleteStudyReviewModal
            onCloseModal={onCloseModal}
            review={review}
          />
        </div>
      )}
    </div>
  )
}
export default ReviewOverLay
