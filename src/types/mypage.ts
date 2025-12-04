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
type Difficulty = 'EASY' | 'NORMAL' | 'HARD'
type Platform = 'INFLEARN' | 'UDEMY'
// 북마크한 강의 관련 타입
export type StudyBookmarkType = {
  id?: number
  title: string
  instructor: string
  total_class_time: number
  original_price?: number
  discounted_price: number
  difficulty: Difficulty
  thumbnail_img_url?: string
  platform: Platform
  url_link?: string
}

// 북마크한 공고 관련 타입
export interface Lectures {
  id: number
  title: string
  instructor: string
}

export interface Tags {
  id: number
  name: string
}
// 북마크한 공고 타입
export type AnnouncementBookMarkType = {
  uuid?: string
  title: string
  thumbnail_img_url: string
  expected_headcount: number
  close_at: string
  views_count: number
  bookmark_count: number
  lecture: Lectures[]
  tags: Tags[]
  // onBookmarkClick?: () => void
  // onViewClick?: () => void
}

// 완료된 스터디 관련 타입
export type StudyCardProps = {
  thumbnail_img_url?: string
  name: string
  is_leader?: boolean
  duration: string
  end_at: string
  participants: number
  review?: Review
}

// 지원 내역 관련 타입
export type StudyApplicationCardProps = {
  title: string
  expected_headcount: number
  thumbnail_img_url?: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
  close_at: string
  lectures: Lectures[]
  tags: Tags[]
  create_at: string
  onClick: () => void
}
//리뷰 관련 타입
export interface Review {
  id: number
  is_mine: boolean
  star_rating: number
  content: string
}
