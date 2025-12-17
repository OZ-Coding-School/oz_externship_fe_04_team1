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
}

type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
interface Recruitment {
  uuid?: string
  title: string
  thumbnail_img_url?: string
  expected_headcount: number
  close_at: string
  end_at: string
  lectures: Lectures[]
  tags: Tags[]
}
// 지원 내역 관련 타입
export type StudyApplicationCardType = {
  id?: number
  status: Status
  recruitment: Recruitment
  created_at: string
}
