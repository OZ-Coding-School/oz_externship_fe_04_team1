// 랜딩페이지에서 사용되는 강의 타입
export type CourseCardProps = {
  id: number
  title: string
  instructor: string
  thumbnail_img_url?: string
  average_rating: number
  reviewCount: number
  discounted_price: number
  original_price?: number
  onClick?: () => void
}

// 북마크한 강의 관련 타입
export type CourseBookmarkProps = {
  title: string
  instructor: string
  total_class_time: number
  original_price?: number
  discounted_price: number
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
  thumbnail_img_url?: string
  platform: 'INFLEARN' | 'UDEMY'
  isBookmarked: boolean
  onBookmarkClick: () => void
  onViewClick: () => void
}

// 북마크한 공고 관련 타입
export interface Lecture {
  id: number
  title: string
  instructor: string
}

export interface Tag {
  id: number
  name: string
}

export type StudyBookmarkProps = {
  title: string
  thumbnail_img_url?: string
  expected_headcount: number
  close_at: string
  view_count: number
  bookmark_count: number
  lectures: Lecture[]
  tags: Tag[]
  isBookmarked: boolean
  onBookmarkClick: () => void
  onViewClick: () => void
}

// 완료된 스터디 관련 타입
export type StudyCardProps = {
  thumbnail_img_url?: string
  name: string
  is_leader?: boolean
  duration: string
  end_at: string
  participants: number
  average_rating: number
  review?: string
  // status: 'ENDED' -> 외부에서 처리하면 좋을 것 같아서 빼겠습니다
  onReviewClick: () => void
}

// 지원 내역 관련 타입
export type StudyApplicationCardProps = {
  title: string
  expected_headcount: number
  thumbnail_img_url?: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
  close_at: string
  lectures: Lecture[]
  tags: Tag[]
  create_at: string
  onClick: () => void
}
