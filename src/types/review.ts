export interface Review {
  name: string
  duration: string
  end_at: string
  reviews?: Reviews
}
interface Reviews {
  id: number
  is_mine: boolean
  star_rating: number
  content: string
}
export type ReviewModalState = 'open' | 'close'
