import { useReviewModalContext } from '@/store/context/reviewModalContext'
import type { Review } from '@/types/review'
export const useReviewModal = () => {
  const reviewModalContext = useReviewModalContext() ?? {
    reviewModalState: 'close',
    setReviewModalState: () => {},
    review: null,
    setReview: () => {},
  }

  const { reviewModalState, setReviewModalState, review, setReview } =
    reviewModalContext
  function onOpenModal(reviews: Review) {
    setReviewModalState('open')
    setReview(reviews)
  }
  const onCloseModal = () => {
    setReviewModalState('close')
  }

  return {
    onOpenModal,
    onCloseModal,
    review,
    setReview,
    reviewModalState,
  }
}
