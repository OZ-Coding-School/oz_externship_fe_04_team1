export interface Review {
  id: number
  name: string
  start_at: string
  end_at: string
  reviews?: Reviews[]
}
interface Reviews {
  id: number
  is_mine: boolean
  star_rating: number
  content: string
}
export type ReviewModalState = 'open' | 'close'

export interface EditReview {
  star_rating: number
  content: string
}
