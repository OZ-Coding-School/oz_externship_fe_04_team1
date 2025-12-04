import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Review, ReviewModalState } from '@/types/review'
// 기본정보 모달 상태를 다루는 context -> 내정보 수정, 휴대폰 번호 수정, 비밀번호 변경, 회원 탈퇴
export type ReviewModalContextType = {
  reviewModalState: ReviewModalState
  setReviewModalState: (value: ReviewModalState) => void
  review: Review | null
  setReview: (value: Review) => void
}
const ReviewModalContext = createContext<ReviewModalContextType | null>(null)

export const ReviewModalProvider = ({ children }: { children: ReactNode }) => {
  const [reviewModalState, setReviewModalState] =
    useState<ReviewModalState>('close')
  // 모달처음에는 close상태
  const [review, setReview] = useState<Review | null>(null)
  return (
    <ReviewModalContext.Provider
      value={{
        reviewModalState,
        setReviewModalState,
        review,
        setReview,
      }}
    >
      {children}
    </ReviewModalContext.Provider>
  )
}

export const useReviewModalContext = () => useContext(ReviewModalContext)
