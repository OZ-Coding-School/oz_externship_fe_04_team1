// 랜딩페이지에서 사용되는 강의 타입
export type Category = {
  id: number
  name: string
}

export type Review = {
  id: number
  rating: number
  content: string
  created_at: string
}

export type Course = {
  id: number
  title: string
  instructor: string
  total_class_time: number
  original_price: number
  discounted_price: number
  difficulty: Difficulty
  thumbnail_img_url?: string
  average_rating: number
  platform: Platform
  url_link: string
  categories: Category[]
  reviews: Review[]
}

export type CourseListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Course[]
}
export type CourseCardProps = {
  course: Course
  onClick?: () => void
}

type Difficulty = 'EASY' | 'NORMAL' | 'HARD'
type Platform = 'INFLEARN' | 'UDEMY'
export type CourseSort =
  | 'latest'
  | 'oldest'
  | 'low_price'
  | 'high_price'
  | 'high_rating'
  | 'low_rating'
