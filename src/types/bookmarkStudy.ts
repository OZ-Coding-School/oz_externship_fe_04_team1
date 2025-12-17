type Difficulty = 'EASY' | 'NORMAL' | 'HARD'
type Platform = 'INFLEARN' | 'UDEMY'
export interface BookMarkStudy {
  next: string | null
  previous: string | null
  results: Results[]
}
interface Results {
  id: number
  title: string
  instructor: string
  total_class_time: number
  original_price: number
  discounted_price: number
  difficulty: Difficulty
  thumbnail_img_url: string
  platform: Platform
  url_link?: string
}
